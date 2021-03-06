import {
  withDefaultLayout,
  withDefaultLayoutStaticProps,
} from "../../components/Layout";
import Link from "next/link";
import BlockContent from "@sanity/block-content-to-react";
import { BuyLinksBar } from "../../components/BuyLinksBar";
import { RecommendationsBar } from "../../components/RecommendationsBar";
import { ParentLinkBar } from "../../components/ParentLinkBar";
import { execQuery, groq } from "../../lib/sanity";
import { InferGetStaticPropsType } from "next";
import { Book, Genre, Override, Series, Universe } from "../../@types/sanity";
import { ImageV2 } from "../../components/ImageV2";
import {
  getStaticPathsFromIds,
  withDefaultRevalidate,
  withSafeIdParam,
} from "../../lib/utils";

export default withDefaultLayout(function BookIdPage({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // todo : componentize
  return (
    <div className="space-y-4">
      <div className="relative flex items-center justify-center px-4 py-12 bg-black sm:py-32">
        {!!book.cover?.asset && (
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-black">
            <div
              className="absolute inset-0 transform scale-110 opacity-50"
              style={{ filter: "blur(32px)" }}
            >
              <ImageV2
                metadata={book.cover.asset.metadata}
                url={book.cover.asset.url}
                independentDimension="cover"
              />
            </div>
          </div>
        )}
        <div className="relative z-10 flex flex-col items-center justify-center space-y-4">
          {!!book.cover?.asset && (
            <div className="w-64 overflow-hidden rounded-md shadow-lg">
              <ImageV2
                metadata={book.cover.asset.metadata}
                url={book.cover.asset.url}
                independentDimension="width"
              />
            </div>
          )}
          {(!!book.title || !!book.tagline) && (
            <div className="max-w-5xl mx-auto">
              {!!book.title && (
                <h1 className="text-3xl font-bold leading-tight tracking-wider text-center text-white">
                  {book.title}
                </h1>
              )}
              {!!book.tagline && (
                <h2 className="text-lg font-light leading-tight tracking-wider text-center text-gray-200">
                  {book.tagline}
                </h2>
              )}
            </div>
          )}
          {!!book.genres.length && (
            <div className="flex justify-center max-w-5xl gap-4 mx-auto">
              {book.genres.map((genre: any) =>
                !!genre.name ? (
                  <Link
                    key={genre._id}
                    href="/genre/[id]"
                    as={`/genre/${genre._id}`}
                  >
                    <a className="block p-2 leading-none tracking-wider text-gray-900 transition-transform duration-300 ease-in-out transform bg-white rounded-md shadow-lg hover:scale-110">
                      {genre.name}
                    </a>
                  </Link>
                ) : null
              )}
            </div>
          )}
        </div>
      </div>
      {(!!book.description?.length ||
        !!book.buyLinks?.length ||
        !!book.recommendations?.length ||
        (!!book.series?.length && !!book.title) ||
        (!!book.universes?.length && !!book.title)) && (
        <div className="px-4">
          <div className="mx-auto space-y-4 max-w-7xl">
            {!!book.description && (
              <BlockContent
                renderContainerOnSingleChild
                blocks={book.description}
                className="prose max-w-none"
              />
            )}
            {!!book.universes.length &&
              !!book.title &&
              book.universes.map((universe: any) =>
                !!book.title && !!universe.name ? (
                  <ParentLinkBar
                    key={universe._id}
                    statement={
                      <>
                        <span className="font-bold">{book.title}</span> is part
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
            {!!book.series.length &&
              !!book.title &&
              book.series.map((series: any) =>
                !!book.title && !!series.name ? (
                  <ParentLinkBar
                    key={series._id}
                    statement={
                      <>
                        <span className="font-bold">{book.title}</span> is part
                        of{" "}
                        {series.name.toLowerCase().split(" ")[0] === "the"
                          ? ""
                          : "the"}{" "}
                        <span className="font-bold">{series.name}</span> series.
                      </>
                    }
                    href={"/series/[id]"}
                    as={`/series/${series._id}`}
                  />
                ) : null
              )}
            {!!book.buyLinks?.length && (
              <BuyLinksBar buyLinks={book.buyLinks} />
            )}
            {!!book.recommendations?.length && (
              <RecommendationsBar recommendations={book.recommendations} />
            )}
          </div>
        </div>
      )}
    </div>
  );
});

export const getStaticProps = withDefaultLayoutStaticProps(
  withSafeIdParam(
    withDefaultRevalidate(async ({ params: { id } }) => {
      return {
        props: {
          book: await execQuery<
            Override<
              Book,
              {
                recommendations?: (Book | Series | Universe | Genre)[];
                genres: Genre[];
                universes: Universe[];
                series: Series[];
              }
            >
          >(groq`
            * [_id == "${id}"]
            | [0]
            | {
              ...,
              cover{
                ...,
                asset->
              },
              recommendations[]->{
                ...,
                cover{
                  ...,
                  asset->
                }
              },
              "genres": *[_type == "genre" && ^._id in books[]._ref],
              "universes": *[_type == "universe" && ^._id in books[]._ref],
              "series": *[_type == "series" && ^._id in books[]._ref]
            }
          `),
        },
      };
    })
  )
);

export const getStaticPaths = getStaticPathsFromIds("book");
