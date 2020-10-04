import {
  withDefaultLayout,
  withDefaultLayoutStaticProps,
} from "../../components/Layout";
import { BookSet } from "../../components/BookSet";
import { SeriesView } from "../../components/Series";
import { UniverseView } from "../../components/Universe";
import { execQuery, groq } from "../../lib/sanity";
import { InferGetStaticPropsType } from "next";
import { Book, Genre, Override, Series, Universe } from "../../@types/sanity";
import {
  calcBooksToShow,
  calcNumHidden,
  calcSeriesToShow,
  calcUniversesToShow,
} from "../books";
import { HiddenCollectionsBar } from "../../components/HiddenCollectionsBar";
import {
  getStaticPathsFromIds,
  withDefaultRevalidate,
  withSafeIdParam,
} from "../../lib/utils";

export default withDefaultLayout(function GenreIdPage({
  genre,
  universes,
  series,
  books,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const universesToShow = calcUniversesToShow([genre._id], universes);
  const numHiddenUniverse = calcNumHidden(universes, universesToShow);
  const seriesToShow = calcSeriesToShow([genre._id], series);
  const numHiddenSeries = calcNumHidden(series, seriesToShow);
  const booksToShow = calcBooksToShow([genre._id], books);
  const numHiddenBooks = calcNumHidden(books, booksToShow);

  return (
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
  );
});

export const getStaticProps = withDefaultLayoutStaticProps(
  withSafeIdParam(
    withDefaultRevalidate(async ({ params: { id } }) => {
      return {
        props: {
          genre: await execQuery<Genre>(groq`*[_id == "${id}"][0]`),
          universes: await execQuery<
            Override<
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
            >[]
          >(groq`
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
          series: await execQuery<
            Override<
              Series,
              {
                books?: Override<Book, { genres: Genre[] }>[];
                genres: Genre[];
              }
            >[]
          >(groq`
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
          books: await execQuery<Override<Book, { genres: Genre[] }>[]>(groq`
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
      };
    })
  )
);

export const getStaticPaths = getStaticPathsFromIds("genre");
