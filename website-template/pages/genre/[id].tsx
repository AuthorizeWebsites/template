import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Layout } from "../../components/Layout";
import { BookSet } from "../../components/BookSet";
import { SeriesView } from "../../components/Series";
import { UniverseView } from "../../components/Universe";
import { useRouter } from "next/router";
import { execQuery, getSiteConfiguration, groq } from "../../lib/sanity";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import {
  Book,
  Genre,
  Override,
  Series,
  SiteConfiguration,
  Universe,
} from "../../@types/sanity";
import {
  calcBooksToShow,
  calcNumHidden,
  calcSeriesToShow,
  calcUniversesToShow,
} from "../books";
import { HiddenCollectionsBar } from "../../components/HiddenCollectionsBar";

export default function GenreIdPage({
  siteConfiguration,
  genre,
  universes,
  series,
  books,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback)
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <p>Loading...</p>
      </div>
    );

  const universesToShow = calcUniversesToShow([genre._id], universes);
  const numHiddenUniverse = calcNumHidden(universes, universesToShow);
  const seriesToShow = calcSeriesToShow([genre._id], series);
  const numHiddenSeries = calcNumHidden(series, seriesToShow);
  const booksToShow = calcBooksToShow([genre._id], books);
  const numHiddenBooks = calcNumHidden(books, booksToShow);

  return (
    <Layout
      header={
        <Header authorName={siteConfiguration.authorName ?? "YOUR NAME"} />
      }
      content={
        <div className="px-4 pt-4">
          <div className="mx-auto space-y-4 max-w-7xl">
            {!!genre.name && (
              <h1 className="text-4xl font-semibold leading-tight tracking-wider text-center text-gray-900">
                {genre.name}
              </h1>
            )}
            {universesToShow.map((universe) => (
              <UniverseView
                key={universe._id}
                _id={universe._id}
                name={universe.name ?? "UNIVERSE NAME"}
                deemphasize={universe.deemphasize}
                series={universe.series}
                numHiddenSeries={universe.numHiddenSeries}
                books={universe.books}
                numHiddenBooks={universe.numHiddenBooks}
              />
            ))}
            {numHiddenUniverse > 0 && (
              <HiddenCollectionsBar
                numHidden={numHiddenUniverse}
                singular="universe"
                plural="universes"
              />
            )}
            {seriesToShow.map((series) => (
              <SeriesView
                key={series._id}
                _id={series._id}
                name={series.name ?? "SERIES NAME"}
                books={series.books}
                deemphasize={series.deemphasize}
                numHiddenBooks={series.numHiddenBooks}
              />
            ))}
            {numHiddenSeries > 0 && (
              <HiddenCollectionsBar
                numHidden={numHiddenSeries}
                singular="series"
                plural="series"
              />
            )}
            {!!booksToShow.length && (
              <BookSet books={booksToShow} numHiddenBooks={numHiddenBooks} />
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
    genre: Genre;
    universes: Override<
      Universe,
      {
        books?: Override<Book, { genres: Genre[] }>[];
        series?: Override<
          Series,
          {
            books?: Override<Book, { genres: Genre[] }>[];
            genres: Genre[];
          }
        >[];
        genres: Genre[];
      }
    >[];
    series: Override<
      Series,
      { books?: Override<Book, { genres: Genre[] }>[]; genres: Genre[] }
    >[];
    books: Override<Book, { genres: Genre[] }>[];
  },
  { id: string }
> = async ({ params }) => {
  console.info("IN GENRE getStaticProps");

  console.info(
    "query result",
    await execQuery<string[]>(groq`*[_type == "genre"]._id`)
  );

  if (params?.id === undefined) throw new Error("Missing id.");

  if ((await execQuery<unknown[]>(groq`*[_id == "${params.id}"]`)).length === 0)
    throw new Error("Invalid id.");

  return {
    props: {
      siteConfiguration: await getSiteConfiguration(),
      genre: await execQuery(groq`*[_id == "${params.id}"][0]`),
      universes: await execQuery(groq`
        * [_type == "universe"] 
        | {
          ...,
          books[]->{
            ...,
            cover{
              ...,
              asset->
            },
            "genres": *[_type == "genre" && ^._id in books[]._ref],
          },
          series[]->{
            ...,
            books[]->{
              ...,
              cover{
                ...,
                asset->
              },
              "genres": *[_type == "genre" && ^._id in books[]._ref],   
            },
            "genres": *[_type == "genre" && ^._id in series[]._ref],
          },
          "genres": *[_type == "genre" && ^._id in universes[]._ref],
        }
      `),
      series: await execQuery(groq`
        * [_type == "series"]
        | [count(*[_type == "universe" && ^._id in series[]._ref]) == 0]
        | {
          ...,
          "books": books[]->{
            ...,
            "cover": cover{
              ...,
              asset->
            },
            "genres": *[_type == "genre" && ^._id in books[]._ref],
          },
          "genres": *[_type == "genre" && ^._id in series[]._ref],
        }
      `),
      books: await execQuery(groq`
        * [_type == "book"]
        | [count(*[_type == "universe" && ^._id in books[]._ref]) == 0]
        | [count(*[_type == "series" && ^._id in books[]._ref]) == 0]
        | {
          ...,
          "cover": cover{
            ...,
            asset->
          },
          "genres": *[_type == "genre" && ^._id in books[]._ref],
        }
      `),
    },
    revalidate: 1,
  };
};

export const getStaticPaths = async () => {
  console.info("IN GENRE getStaticPaths");

  console.info(
    "query result",
    await execQuery<string[]>(groq`*[_type == "genre"]._id`)
  );

  try {
    return {
      paths: (
        await execQuery<string[]>(groq`*[_type == "genre"]._id`)
      ).map((id: string) => ({ params: { id } })),
      fallback: true,
    };
  } catch (err) {
    console.error(err);
    return {
      paths: [],
      fallback: true,
    };
  }
};
