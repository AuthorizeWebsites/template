import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Layout } from "../../components/Layout";
import { execQuery, groq } from "../../queries";
import Link from "next/link";
import BlockContent from "@sanity/block-content-to-react";
import { BuyLinksBar } from "../../components/BuyLinksBar";
import { RecommendationsBar } from "../../components/RecommendationsBar";
import { Image } from "../../components/Image";
import { ParentLinkBar } from "../../components/ParentLinkBar";
import { useRouter } from "next/router";

export default function BookIdPage(props: {
  siteConfiguration: any;
  book: any;
}) {
  const router = useRouter();

  if (router.isFallback)
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <p>Loading...</p>
      </div>
    );

  return (
    <Layout
      header={<Header siteConfiguration={props.siteConfiguration} />}
      content={
        <div className="space-y-4">
          <div className="relative flex items-center justify-center px-4 py-12 bg-black sm:py-32">
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-black">
              <img
                src={props.book.cover.asset.metadata.lqip}
                height={props.book.cover.asset.metadata.dimensions.height}
                width={props.book.cover.asset.metadata.dimensions.width}
                className="min-w-full min-h-full opacity-50 filter-blur"
                style={{
                  filter: "brightness(200%) blur(16px)",
                }}
              />
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center space-y-4">
              <div className="w-64 overflow-hidden rounded-md shadow-lg">
                <Image {...props.book.cover.asset} />
              </div>
              {(!!props.book?.name || !!props.book?.tagline) && (
                <div className="max-w-5xl mx-auto">
                  {!!props.book?.title && (
                    <h1 className="text-3xl font-bold leading-tight tracking-wider text-center text-white">
                      {props.book.title}
                    </h1>
                  )}
                  {!!props.book?.tagline && (
                    <h2 className="text-lg font-light leading-tight tracking-wider text-center text-gray-200">
                      {props.book.tagline}
                    </h2>
                  )}
                </div>
              )}
              {!!props.book?.genres?.length && (
                <div className="flex justify-center max-w-5xl gap-4 mx-auto">
                  {props.book.genres.map((genre: any) =>
                    !!genre?.name && !!genre?._id ? (
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
          {(!!props.book?.description ||
            !!props.book?.buyLinks?.length ||
            !!props.book?.recommendations?.length ||
            (!!props.book?.series?.length && !!props.book?.title) ||
            (!!props.book?.universes?.length && !!props.book?.title)) && (
            <div className="px-4">
              <div className="mx-auto space-y-4 max-w-7xl">
                {!!props.book?.description && (
                  <BlockContent
                    renderContainerOnSingleChild
                    blocks={props.book.description}
                    className="prose max-w-none"
                  />
                )}
                {!!props.book?.universes?.length &&
                  !!props.book?.title &&
                  props.book.universes.map((universe: any) =>
                    !!props.book?.title &&
                    !!universe?._id &&
                    !!universe?.name ? (
                      <ParentLinkBar
                        key={universe._id}
                        statement={
                          <>
                            <span className="font-bold">
                              {props.book.title}
                            </span>{" "}
                            is part of{" "}
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
                {!!props.book?.series?.length &&
                  !!props.book?.title &&
                  props.book.series.map((series: any) =>
                    !!props.book?.title && !!series?._id && !!series?.name ? (
                      <ParentLinkBar
                        key={series._id}
                        statement={
                          <>
                            <span className="font-bold">
                              {props.book.title}
                            </span>{" "}
                            is part of{" "}
                            {series.name.toLowerCase().split(" ")[0] === "the"
                              ? ""
                              : "the"}{" "}
                            <span className="font-bold">{series.name}</span>{" "}
                            series.
                          </>
                        }
                        href={"/series/[id]"}
                        as={`/series/${series._id}`}
                      />
                    ) : null
                  )}
                {!!props.book?.buyLinks?.length && (
                  <BuyLinksBar buyLinks={props.book.buyLinks} />
                )}
                {!!props.book?.recommendations?.length && (
                  <RecommendationsBar
                    recommendations={props.book.recommendations}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      }
      footer={<Footer siteConfiguration={props.siteConfiguration} />}
    />
  );
}

export const getStaticProps = async ({ params: { id } }) => {
  return {
    props: {
      siteConfiguration: (
        await execQuery(groq`
          * | [
            _id == "siteConfiguration"
          ] | [
            0
          ]
        `)
      ).result,
      book: (
        await execQuery(groq`
          * | [
            _id == "${id}"
          ] | [
            0
          ] | {
            ...,
            "cover": cover | {
              ...,
              "asset": asset->
            },
            "recommendations": recommendations[]->{
              ...,
              "cover": cover | {
                ...,
                "asset": asset->
              }
            },
            "genres": * | [
              _type == "genre" && ^._id in books[]._ref
            ],
            "universes": * | [
              _type == "universe" && ^._id in books[]._ref
            ],
            "series": * | [
              _type == "series" && ^._id in books[]._ref
            ]
          }
        `)
      ).result,
    },
    revalidate: 1,
  };
};

export const getStaticPaths = async () => {
  return {
    paths: (
      await execQuery(groq`
        * | [
          _type == "book"
        ] . _id
      `)
    ).result.map((_id: string) => ({ params: { id: _id } })),
    fallback: true,
  };
};
