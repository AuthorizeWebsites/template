import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Layout } from "../../components/Layout";
import { execQuery, groq } from "../../queries";
import Link from "next/link";
import BlockContent from "@sanity/block-content-to-react";
import { BuyLinksBar } from "../../components/BuyLinksBar";
import { RecommendationsBar } from "../../components/RecommendationsBar";
import { BookSet } from "../../components/BookSet";
import { Series } from "../../components/Series";

export default function UniverseIdPage(props: {
  siteConfiguration: any;
  universe: any;
}) {
  return (
    <Layout
      header={<Header siteConfiguration={props.siteConfiguration} />}
      content={
        <div className="px-4 pt-8">
          <div className="mx-auto space-y-4 max-w-7xl">
            {(!!props.universe?.name || !!props.universe?.tagline) && (
              <div className="max-w-5xl mx-auto">
                {!!props.universe?.name && (
                  <h1 className="text-3xl font-bold leading-tight tracking-wider text-center text-gray-900">
                    {props.universe.name}
                  </h1>
                )}
                {!!props.universe?.tagline && (
                  <h2 className="text-lg font-light leading-tight tracking-wider text-center text-gray-600">
                    {props.universe.tagline}
                  </h2>
                )}
              </div>
            )}
            {!!props.universe?.genres?.length && (
              <div className="flex justify-center max-w-5xl gap-4 mx-auto">
                {props.universe.genres.map((genre: any) =>
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
            {!!props.universe?.description && (
              <BlockContent
                renderContainerOnSingleChild
                blocks={props.universe.description}
                className="prose max-w-none"
              />
            )}
            {(!!props.universe?.books?.length ||
              !!props.universe?.series?.length) && (
              <div className="p-4 mx-auto space-y-4 transition-all duration-150 ease-in-out bg-gray-900 rounded-md shadow-lg">
                {props.universe.series.map((series) => (
                  <Series key={series._id} {...series} />
                ))}
                <BookSet books={props.universe.books} />
              </div>
            )}
            {!!props.universe?.buyLinks?.length && (
              <BuyLinksBar buyLinks={props.universe.buyLinks} />
            )}
            {!!props.universe?.recommendations?.length && (
              <RecommendationsBar
                recommendations={props.universe.recommendations}
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
      universe: (
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
            "series": series[]->{
              ...,
              "books": books[]->{
                ...,
                "cover": cover | {
                  ...,
                  "asset": asset->
                },
              }
            },
            "recommendations": recommendations[]->{
              ...,
              "cover": cover | {
                ...,
                "asset": asset->
              }
            },
            "genres": * | [
              _type == "genre" && ^._id in universes[]._ref
            ]
          }
        `)
      ).result,
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: (
      await execQuery(groq`
        * | [
          _type == "universe"
        ] . _id
      `)
    ).result.map((_id: string) => ({ params: { id: _id } })),
    fallback: false,
  };
};
