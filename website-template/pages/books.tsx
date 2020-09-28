import { useContext, useState } from "react";
import { BookProps } from "../components/Book";
import { BookSet } from "../components/BookSet";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Layout } from "../components/Layout";
import { Series, SeriesProps } from "../components/Series";
import { Universe } from "../components/Universe";
import { ModalContext } from "../contexts/modal";
import { execQuery, groq } from "../queries";

const BooksPage = function BooksPage({
  siteConfiguration,
  genres,
  universes,
  series,
  books,
}: {
  siteConfiguration: any;
  genres?: any[];
  universes?: any[];
  series?: SeriesProps[];
  books?: BookProps[];
}) {
  const [selectedGenreIds, setSelectedGenreIds] = useState([]);

  return (
    <Layout
      header={<Header siteConfiguration={siteConfiguration} />}
      content={
        <div className="px-4 pt-8">
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
            {universes &&
              universes.map((universe) => (
                <Universe
                  {...universe}
                  key={universe._id}
                  selectedGenreIds={selectedGenreIds}
                  filter={selectedGenreIds.length > 0}
                />
              ))}
            {series &&
              series.map((series) => (
                <Series
                  {...series}
                  key={series._id}
                  selectedGenreIds={selectedGenreIds}
                  filter={selectedGenreIds.length > 0}
                />
              ))}
            {books && (
              <BookSet
                books={books}
                selectedGenreIds={selectedGenreIds}
                filter={selectedGenreIds.length > 0}
              />
            )}
          </div>
        </div>
      }
      footer={<Footer siteConfiguration={siteConfiguration} />}
    />
  );
};

export default BooksPage;

export const getStaticProps = async () => {
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
      genres: (
        await execQuery(groq`
        * | [
          _type == "genre"
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
