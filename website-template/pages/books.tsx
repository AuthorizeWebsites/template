import { InferGetStaticPropsType } from "next";
import { useState } from "react";
import { Genre, Book, Series, Universe, Override } from "../@types/sanity";
import { BookSet } from "../components/BookSet";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { HiddenCollectionsBar } from "../components/HiddenCollectionsBar";
import { Layout } from "../components/Layout";
import { SeriesView } from "../components/Series";
import { UniverseView } from "../components/Universe";
import { execQuery, getSiteConfiguration, groq } from "../lib/sanity";

export const calcUniversesToShow = (
  selectedGenreIds: string[],
  universes: Override<
    Universe,
    {
      books?: Override<
        Book,
        {
          genres: Genre[];
        }
      >[];
      series?: Override<
        Series,
        {
          books?: Override<
            Book,
            {
              genres: Genre[];
            }
          >[];
          genres: Genre[];
        }
      >[];
      genres: Genre[];
    }
  >[]
) => {
  return universes.reduce(
    (acc, universe) => {
      const deemphasize = !checkGenres(selectedGenreIds)(universe);

      const seriesToShow = calcSeriesToShow(
        selectedGenreIds,
        universe.series ?? []
      );

      const numHiddenSeries = calcNumHidden(
        universe.series ?? [],
        seriesToShow
      );

      const booksToShow = calcBooksToShow(
        selectedGenreIds,
        universe.books ?? []
      );

      const numHiddenBooks = calcNumHidden(universe.books ?? [], booksToShow);

      return booksToShow.length + seriesToShow.length === 0
        ? acc
        : [
            {
              ...universe,
              deemphasize,
              books: booksToShow,
              numHiddenBooks,
              series: seriesToShow,
              numHiddenSeries,
            },
            ...acc,
          ];
    },
    [] as Override<
      Universe,
      {
        deemphasize: boolean;
        books: Book[];
        numHiddenBooks: number;
        series: Override<
          Series,
          {
            books: Book[];
            numHiddenBooks: number;
          }
        >[];
        numHiddenSeries: number;
      }
    >[]
  );
};

export const calcSeriesToShow = (
  selectedGenreIds: string[],
  series: Override<
    Series,
    {
      books?: Override<
        Book,
        {
          genres: Genre[];
        }
      >[];
      genres: Genre[];
    }
  >[]
) => {
  return series.reduce(
    (acc, series) => {
      const deemphasize = !checkGenres(selectedGenreIds)(series);

      const booksToShow = calcBooksToShow(selectedGenreIds, series.books ?? []);

      const numHiddenBooks = calcNumHidden(series.books ?? [], booksToShow);

      return booksToShow.length === 0
        ? acc
        : [
            { ...series, books: booksToShow, deemphasize, numHiddenBooks },
            ...acc,
          ];
    },
    [] as Override<
      Series,
      {
        books: Book[];
        deemphasize: boolean;
        numHiddenBooks: number;
      }
    >[]
  );
};

export const calcBooksToShow = (
  selectedGenreIds: string[],
  books: Override<
    Book,
    {
      genres: Genre[];
    }
  >[]
) =>
  selectedGenreIds.length > 0
    ? books.filter(checkGenres(selectedGenreIds))
    : books;

export const checkGenres = (selectedGenreIds: string[]) => (thing: {
  genres: Genre[];
}) => {
  return selectedGenreIds.reduce((acc, selectedGenreId) => {
    return acc && thing.genres.some(({ _id }) => _id === selectedGenreId);
  }, true as boolean);
};

export const calcNumHidden = (pre: unknown[], post: unknown[]) =>
  pre.length - post.length;

const BooksPage = function BooksPage({
  siteConfiguration,
  genres,
  universes,
  series,
  books,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [selectedGenreIds, setSelectedGenreIds] = useState([] as string[]);

  const universesToShow = calcUniversesToShow(selectedGenreIds, universes);
  const numHiddenUniverse = calcNumHidden(universes, universesToShow);
  const seriesToShow = calcSeriesToShow(selectedGenreIds, series);
  const numHiddenSeries = calcNumHidden(series, seriesToShow);
  const booksToShow = calcBooksToShow(selectedGenreIds, books);
  const numHiddenBooks = calcNumHidden(books, booksToShow);

  // todo : extract filtering into it's own component
  return (
    <Layout
      header={
        <Header authorName={siteConfiguration.authorName ?? "YOUR NAME"} />
      }
      content={
        <div className="px-4 pt-4">
          <div className="mx-auto space-y-4 max-w-7xl">
            <div className="flex flex-col p-4 space-y-4 rounded-md shadow-lg to-teal-600 bg-gradient-to-tl from-teal-700">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold leading-none tracking-wider text-white">
                  Filter
                </h1>
                <div className="flex space-x-2">
                  {selectedGenreIds.length > 0 && (
                    <button
                      onClick={() => setSelectedGenreIds([])}
                      className="text-white transition-transform duration-300 ease-in-out transform hover:scale-125 focus:outline-none"
                      title="Refresh"
                    >
                      {/* clear filters icon */}
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                {genres
                  ?.filter((genre) => !selectedGenreIds.includes(genre._id))
                  ?.map((genre) => (
                    <button
                      key={genre._id}
                      onClick={() =>
                        setSelectedGenreIds([...selectedGenreIds, genre._id])
                      }
                      className="relative block px-2 py-1 bg-white rounded-md shadow-lg focus:outline-none"
                    >
                      {genre.name}
                      <span
                        onClick={() =>
                          setSelectedGenreIds([...selectedGenreIds, genre._id])
                        }
                        className="absolute top-0 left-0 p-px text-white transform -translate-x-1/2 -translate-y-1/2 bg-green-500 rounded-full shadow-lg hover:scale-110 focus:outline-none"
                      >
                        {/* plus icon */}
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                      </span>
                    </button>
                  ))}
              </div>
            </div>
            {!!genres?.filter((genre) => selectedGenreIds.includes(genre._id))
              ?.length && (
              <div className="flex flex-wrap gap-2">
                {genres &&
                  genres
                    .filter((genre) => selectedGenreIds.includes(genre._id))
                    .map((genre) => (
                      <button
                        key={genre._id}
                        onClick={() =>
                          setSelectedGenreIds(
                            selectedGenreIds.filter((id) => !(id == genre._id))
                          )
                        }
                        className="relative block px-2 py-1 text-white bg-gray-900 rounded-md shadow-lg focus:outline-none"
                      >
                        {genre.name}
                        <span
                          onClick={() =>
                            setSelectedGenreIds(
                              selectedGenreIds.filter(
                                (id) => !(id == genre._id)
                              )
                            )
                          }
                          className="absolute top-0 left-0 p-px text-white transform -translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full shadow-lg hover:scale-110 focus:outline-none"
                        >
                          {/* x icon */}
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </span>
                      </button>
                    ))}
              </div>
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
            {!!selectedGenreIds.length && (
              <button
                onClick={() => setSelectedGenreIds([])}
                className="fixed px-4 py-2 text-white bg-gray-900 rounded-full shadow-lg focus:outline-none hover:bg-cool-gray-700 right-4 bottom-4"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      }
      footer={
        <Footer authorName={siteConfiguration.authorName ?? "YOUR NAME"} />
      }
    />
  );
};

export default BooksPage;

export const getStaticProps = async () => {
  return {
    props: {
      siteConfiguration: await getSiteConfiguration(),
      genres: await execQuery<Genre[]>(groq`*[_type == "genre"]`),
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
          books[]->{
            ...,
            cover{
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
          cover{
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
