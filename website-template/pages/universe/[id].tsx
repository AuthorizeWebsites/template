import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Layout } from "../../components/Layout";
import Link from "next/link";
import BlockContent from "@sanity/block-content-to-react";
import { BuyLinksBar } from "../../components/BuyLinksBar";
import { RecommendationsBar } from "../../components/RecommendationsBar";
import { BookSet } from "../../components/BookSet";
import { SeriesView } from "../../components/Series";
import { useRouter } from "next/router";
import { execQuery, getSiteConfiguration, groq } from "../../lib/sanity";
import {
  Book,
  Genre,
  Override,
  Series,
  SiteConfiguration,
  Universe,
} from "../../@types/sanity";
import { GetStaticProps, InferGetStaticPropsType } from "next";

export default function UniverseIdPage({
  siteConfiguration,
  universe,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback)
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <p>Loading...</p>
      </div>
    );

  return (
    <Layout
      header={
        <Header authorName={siteConfiguration.authorName ?? "YOUR NAME"} />
      }
      content={
        <div className="px-4 pt-8">
          <div className="mx-auto space-y-4 max-w-7xl">
            {(!!universe.name || !!universe.tagline) && (
              <div className="max-w-5xl mx-auto">
                {!!universe.name && (
                  <h1 className="text-3xl font-bold leading-tight tracking-wider text-center text-gray-900">
                    {universe.name}
                  </h1>
                )}
                {!!universe.tagline && (
                  <h2 className="text-lg font-light leading-tight tracking-wider text-center text-gray-600">
                    {universe.tagline}
                  </h2>
                )}
              </div>
            )}
            {!!universe.genres?.length && (
              <div className="flex justify-center max-w-5xl gap-4 mx-auto">
                {universe.genres.map((genre: any) =>
                  !!genre?.name && !!genre?._id ? (
                    <Link
                      key={genre._id}
                      href="/genre/[id]"
                      as={`/genre/${genre._id}`}
                    >
                      <a className="block p-2 leading-none tracking-wider text-white transition-transform duration-300 ease-in-out transform bg-gray-900 rounded-md shadow-lg hover:scale-110">
                        {genre.name}
                      </a>
                    </Link>
                  ) : null
                )}
              </div>
            )}
            {!!universe.description?.length && (
              <BlockContent
                renderContainerOnSingleChild
                blocks={universe.description}
                className="prose max-w-none"
              />
            )}
            {(!!universe.books?.length || !!universe.series?.length) && (
              <div className="p-4 mx-auto space-y-4 transition-all duration-150 ease-in-out bg-gray-900 rounded-md shadow-lg">
                {universe.series?.map((series) => (
                  <SeriesView
                    key={series._id}
                    _id={series._id}
                    name={series.name ?? "SERIES NAME"}
                    books={series.books ?? []}
                  />
                ))}
                <BookSet
                  books={
                    universe.books?.map((book) => ({ ...book, genres: [] })) ??
                    []
                  }
                />
              </div>
            )}
            {!!universe.buyLinks?.length && (
              <BuyLinksBar buyLinks={universe.buyLinks} />
            )}
            {!!universe.recommendations?.length && (
              <RecommendationsBar recommendations={universe.recommendations} />
            )}
          </div>
        </div>
      }
      footer={
        <Footer authorName={siteConfiguration.authorName ?? "YOUR NAME"} />
      }
    />
  );
}

export const getStaticProps: GetStaticProps<
  {
    siteConfiguration: SiteConfiguration;
    universe: Override<
      Universe,
      {
        books?: Book[];
        series?: Override<
          Series,
          {
            books?: Book[];
          }
        >[];
        recommendations?: (Book | Series | Universe | Genre)[];
        genres: Genre[];
      }
    >;
  },
  { id: string }
> = async ({ params }) => {
  if (params?.id === undefined) throw new Error("Missing id.");

  if ((await execQuery<unknown[]>(groq`*[_id == "${params.id}"]`)).length === 0)
    throw new Error("Invalid id.");

  return {
    props: {
      siteConfiguration: await getSiteConfiguration(),
      universe: await execQuery(groq`
        * [_id == "${params.id}"]
        | [0]
        | {
          ...,
          books[]->{
            ...,
            cover{
              ...,
              asset->
            },
          },
          series[]->{
            ...,
            books[]->{
              ...,
              cover{
                ...,
                asset->
              },
            }
          },
          recommendations[]->{
            ...,
            cover{
              ...,
              asset->
            }
          },
          "genres": *[_type == "genre" && ^._id in universes[]._ref]
        }
      `),
    },
    revalidate: 1,
  };
};

export const getStaticPaths = async () => {
  return {
    paths: (
      await execQuery<string[]>(groq`*[_type == "universe"]._id`)
    ).map((_id: string) => ({ params: { id: _id } })),
    fallback: true,
  };
};
