import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Layout } from "../../components/Layout";
import Link from "next/link";
import BlockContent from "@sanity/block-content-to-react";
import { BuyLinksBar } from "../../components/BuyLinksBar";
import { RecommendationsBar } from "../../components/RecommendationsBar";
import { BookSet } from "../../components/BookSet";
import { ParentLinkBar } from "../../components/ParentLinkBar";
import { useRouter } from "next/router";
import { execQuery, getSiteConfiguration, groq } from "../../lib/sanity";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import {
  Book,
  Genre,
  Override,
  Universe,
  Series,
  SiteConfiguration,
} from "../../@types/sanity";

export default function SeriesIdPage({
  siteConfiguration,
  series,
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
            {(!!series.name || !!series.tagline) && (
              <div className="max-w-5xl mx-auto">
                {!!series.name && (
                  <h1 className="text-3xl font-bold leading-tight tracking-wider text-center text-gray-900">
                    {series.name}
                  </h1>
                )}
                {!!series.tagline && (
                  <h2 className="text-lg font-light leading-tight tracking-wider text-center text-gray-600">
                    {series.tagline}
                  </h2>
                )}
              </div>
            )}
            {!!series.genres?.length && (
              <div className="flex justify-center max-w-5xl gap-4 mx-auto">
                {series.genres.map((genre) =>
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
            {!!series.description?.length && (
              <BlockContent
                renderContainerOnSingleChild
                blocks={series.description}
                className="prose max-w-none"
              />
            )}
            {!!series.universes?.length &&
              !!series.name &&
              series.universes.map((universe) =>
                !!series.name && !!universe.name ? (
                  <ParentLinkBar
                    key={universe._id}
                    statement={
                      <>
                        <span className="font-bold">{series.name}</span> is part
                        of{" "}
                        {universe.name.toLowerCase().split(" ")[0] === "the"
                          ? ""
                          : "the"}{" "}
                        <span className="font-bold">{universe.name}</span>{" "}
                        universe.
                      </>
                    }
                    href={"/universe/[id]"}
                    as={`/universe/${universe._id}`}
                  />
                ) : null
              )}
            {!!series.books?.length && (
              <div className="p-4 mx-auto space-y-4 transition-all duration-150 ease-in-out bg-gray-900 rounded-md shadow-lg">
                <BookSet
                  books={
                    series.books.map((book) => ({ ...book, genres: [] })) ?? []
                  }
                />
              </div>
            )}
            {!!series.buyLinks?.length && (
              <BuyLinksBar buyLinks={series.buyLinks} />
            )}
            {!!series.recommendations?.length && (
              <RecommendationsBar recommendations={series.recommendations} />
            )}
          </div>
        </div>
      }
      footer={
        <Footer authorName={siteConfiguration?.authorName ?? "YOUR NAME"} />
      }
    />
  );
}

export const getStaticProps: GetStaticProps<
  {
    siteConfiguration: SiteConfiguration;
    series: Override<
      Series,
      {
        books?: Book[];
        recommendations?: (Book | Series | Universe | Genre)[];
        genres: Genre[];
        universes: Universe[];
      }
    >;
  },
  { id: string }
> = async ({ params }) => {
  console.info("IN SERIES getStaticPaths");

  console.info(
    "query result",
    await execQuery<string[]>(groq`*[_type == "series"]._id`)
  );

  if (params?.id === undefined) throw new Error("Missing id.");

  if ((await execQuery<unknown[]>(groq`*[_id == "${params.id}"]`)).length === 0)
    throw new Error("Invalid id.");

  return {
    props: {
      siteConfiguration: await getSiteConfiguration(),
      series: await execQuery(groq`
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
          recommendations[]->{
            ...,
            cover{
              ...,
              asset->
            }
          },
          "genres": *[_type == "genre" && ^._id in series[]._ref],
          "universes": *[_type == "universe" && ^._id in series[]._ref],
        }
      `),
    },
    revalidate: 1,
  };
};

export const getStaticPaths = async () => {
  console.info("IN SERIES getStaticPaths");

  console.info(
    "query result",
    await execQuery<string[]>(groq`*[_type == "series"]._id`)
  );

  return {
    paths: (
      await execQuery<string[]>(groq`*[_type == "series"]._id`)
    ).map((id: string) => ({ params: { id } })),
    fallback: true,
  };
};
