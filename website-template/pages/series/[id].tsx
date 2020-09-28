import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Layout } from "../../components/Layout";
import { execQuery, groq } from "../../queries";
import Link from "next/link";
import BlockContent from "@sanity/block-content-to-react";
import { BuyLinksBar } from "../../components/BuyLinksBar";
import { RecommendationsBar } from "../../components/RecommendationsBar";
import { BookSet } from "../../components/BookSet";
import { ParentLinkBar } from "../../components/ParentLinkBar";
import { useRouter } from "next/router";

export default function SeriesIdPage(props: {
  siteConfiguration: any;
  series: any;
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
        <div className="px-4 pt-8">
          <div className="mx-auto space-y-4 max-w-7xl">
            {(!!props.series?.name || !!props.series?.tagline) && (
              <div className="max-w-5xl mx-auto">
                {!!props.series?.name && (
                  <h1 className="text-3xl font-bold leading-tight tracking-wider text-center text-gray-900">
                    {props.series.name}
                  </h1>
                )}
                {!!props.series?.tagline && (
                  <h2 className="text-lg font-light leading-tight tracking-wider text-center text-gray-600">
                    {props.series.tagline}
                  </h2>
                )}
              </div>
            )}
            {!!props.series?.genres?.length && (
              <div className="flex justify-center max-w-5xl gap-4 mx-auto">
                {props.series.genres.map((genre: any) =>
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
            {!!props.series?.description && (
              <BlockContent
                renderContainerOnSingleChild
                blocks={props.series.description}
                className="prose max-w-none"
              />
            )}
            {!!props.series?.universes?.length &&
              !!props.series?.name &&
              props.series.universes.map((universe: any) =>
                !!props.series?.name && !!universe?._id && !!universe?.name ? (
                  <ParentLinkBar
                    key={universe._id}
                    statement={
                      <>
                        <span className="font-bold">{props.series.name}</span>{" "}
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
            {(!!props.series?.books?.length ||
              !!props.series?.series?.length) && (
              <div className="p-4 mx-auto space-y-4 transition-all duration-150 ease-in-out bg-gray-900 rounded-md shadow-lg">
                <BookSet books={props.series.books} />
              </div>
            )}
            {!!props.series?.buyLinks?.length && (
              <BuyLinksBar buyLinks={props.series.buyLinks} />
            )}
            {!!props.series?.recommendations?.length && (
              <RecommendationsBar
                recommendations={props.series.recommendations}
              />
            )}
          </div>
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
      series: (
        await execQuery(groq`
          * | [
            _id == "${id}"
          ] | [
            0
          ] | {
            ...,
            "books": books[]->{
              ...,
              "cover": cover | {
                ...,
                "asset": asset->
              },
            },
            "recommendations": recommendations[]->{
              ...,
              "cover": cover | {
                ...,
                "asset": asset->
              }
            },
            "genres": * | [
              _type == "genre" && ^._id in series[]._ref
            ],
            "universes": * | [
              _type == "universe" && ^._id in series[]._ref
            ],
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
          _type == "series"
        ] . _id
      `)
    ).result.map((_id: string) => ({ params: { id: _id } })),
    fallback: true,
  };
};
