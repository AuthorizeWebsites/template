import {
  withDefaultLayout,
  withDefaultLayoutStaticProps,
} from "../../components/Layout";
import Link from "next/link";
import BlockContent from "@sanity/block-content-to-react";
import { BuyLinksBar } from "../../components/BuyLinksBar";
import { RecommendationsBar } from "../../components/RecommendationsBar";
import { BookSet } from "../../components/BookSet";
import { SeriesView } from "../../components/Series";
import { execQuery, groq } from "../../lib/sanity";
import { Book, Genre, Override, Series, Universe } from "../../@types/sanity";
import { InferGetStaticPropsType } from "next";
import {
  getStaticPathsFromIds,
  withDefaultRevalidate,
  withSafeIdParam,
} from "../../lib/utils";

export default withDefaultLayout(function UniverseIdPage({
  universe,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
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
                universe.books?.map((book) => ({ ...book, genres: [] })) ?? []
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
  );
});

export const getStaticProps = withDefaultLayoutStaticProps(
  withSafeIdParam(
    withDefaultRevalidate(async ({ params: { id } }) => {
      return {
        props: {
          universe: await execQuery<
            Override<
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
            >
          >(groq`
            * [_id == "${id}"]
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
      };
    })
  )
);

export const getStaticPaths = getStaticPathsFromIds("universe");
