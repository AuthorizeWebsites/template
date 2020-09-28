import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Layout } from "../../components/Layout";
import { execQuery, groq } from "../../queries";
import { BookSet } from "../../components/BookSet";
import { Series } from "../../components/Series";
import { Universe } from "../../components/Universe";
import { useRouter } from "next/router";

export default function GenreIdPage(props: {
  siteConfiguration: any;
  universes: any[];
  series: any[];
  books: any[];
  genre: { _id: string; name: string };
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
            {props.genre?.name && (
              <h1 className="text-4xl font-semibold leading-tight tracking-wider text-center text-gray-900">
                {props.genre.name}
              </h1>
            )}
            {props.universes &&
              props.universes.map((universe) => (
                <Universe
                  {...universe}
                  key={universe._id}
                  selectedGenreIds={[props.genre._id]}
                  filter={[props.genre._id].length > 0}
                />
              ))}
            {props.series &&
              props.series.map((series) => (
                <Series
                  {...series}
                  key={series._id}
                  selectedGenreIds={[props.genre._id]}
                  filter={[props.genre._id].length > 0}
                />
              ))}
            {props.books && (
              <BookSet
                books={props.books}
                selectedGenreIds={[props.genre._id]}
                filter={[props.genre._id].length > 0}
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
      genre: (
        await execQuery(groq`
          * | [
            _id == "${id}"
          ] | [
            0
          ]
        `)
      ).result,
      universes: (
        await execQuery(groq`
          * | [
            _type == "universe"
          ] | {
            ...,
            "books": books[]->{
              ...,
              "cover": cover | {
                ...,
                asset->
              },
              "genres": * | [
                _type == "genre" && ^._id in books[]._ref
              ],   
            },
            "series": series[]->{
              ...,
              "books": books[]->{
                ...,
                "cover": cover | {
                  ...,
                  asset->
                },
                "genres": * | [
                _type == "genre" && ^._id in books[]._ref
              ],   
              },
              "genres": * | [
                _type == "genre" && ^._id in series[]._ref
              ],
            },
            "genres": * | [
              _type == "genre" && ^._id in universes[]._ref
            ],
          }
        `)
      ).result,
      series: (
        await execQuery(groq`
          * | [
            _type == "series"
          ] | [
            count(
              * | [
                _type == "universe" && ^._id in series[]._ref
              ]
            ) == 0
          ] | {
            ...,
            "books": books[]->{
              ...,
              "cover": cover | {
                ...,
                asset->
              },
              "genres": * | [
                _type == "genre" && ^._id in books[]._ref
              ],   
            },
            "genres": * | [
              _type == "genre" && ^._id in series[]._ref
            ],
          }
        `)
      ).result,
      books: (
        await execQuery(groq`
          * | [
            _type == "book"
          ] | [
            count(
              * | [
                _type == "universe" && ^._id in books[]._ref
              ]
            ) == 0
          ] | [
            count(
              * | [
                _type == "series" && ^._id in books[]._ref
              ]
            ) == 0
          ] | {
            ...,
            "cover": cover | {
              ...,
              asset->
            },
            "genres": * | [
              _type == "genre" && ^._id in books[]._ref
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
          _type == "genre"
        ] . _id
      `)
    ).result.map((_id: string) => ({ params: { id: _id } })),
    fallback: true,
  };
};
