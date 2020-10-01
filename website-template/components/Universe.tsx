import Link from "next/link";
import { useContext } from "react";
import { Book, Series, Universe } from "../@types/sanity";
import { ModalContext } from "../contexts/modal";
import { BookSet } from "./BookSet";
import { HiddenCollectionsBar } from "./HiddenCollectionsBar";
import { SeriesView } from "./Series";

export function UniverseView({
  _id,
  name,
  deemphasize = false,
  series,
  numHiddenSeries = 0,
  books,
  numHiddenBooks = 0,
}: Pick<Universe, "_id"> & {
  name: string;
  deemphasize?: boolean;
  series: (Pick<Series, "_id" | "name"> & {
    deemphasize?: boolean;
    books: Book[];
    numHiddenBooks?: number;
  })[];
  numHiddenSeries?: number;
  books: Book[];
  numHiddenBooks?: number;
}) {
  const { updateModal } = useContext(ModalContext);

  return (
    <div className="p-4 space-y-4 transition-all duration-150 ease-in-out bg-gray-900 rounded-md shadow-lg">
      <div className="flex items-center justify-between w-full">
        <span className="relative inline-flex items-center">
          <Link href="/universe/[id]" as={`/universe/${_id}`}>
            <a
              className={`${
                deemphasize ? "opacity-25 pointer-events-none" : "opacity-100"
              } pr-2 text-2xl font-semibold leading-none tracking-wider text-white group hover:text-gray-300 sm:text-3xl`}
            >
              {name}{" "}
              {!deemphasize && (
                <svg
                  className="inline-block w-5 h-5 text-white group-hover:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
              )}
            </a>
          </Link>
          {deemphasize && (
            <button onClick={() => updateModal(<HiddenUniverseInfoModal />)}>
              <svg
                className="absolute top-0 right-0 w-4 h-4 text-gray-400 transform hover:text-white translate-x-1/3 -translate-y-1/3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          )}
        </span>
        <span
          className={`${
            deemphasize ? "opacity-25" : "opacity-100"
          } inline-block px-2 py-2 text-base font-semibold leading-none tracking-wider text-white rounded-md shadow-lg bg-gradient-to-tr from-teal-600 to-teal-500 sm:text-lg font-base`}
        >
          universe
        </span>
      </div>
      <hr className="opacity-25" />
      {series?.map((series) => (
        <SeriesView
          key={series._id}
          _id={series._id}
          name={series.name ?? "SERIES NAME"}
          deemphasize={series.deemphasize}
          books={series.books}
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
      {!!books.length && (
        <BookSet books={books} numHiddenBooks={numHiddenBooks} />
      )}
    </div>
  );
}

function HiddenUniverseInfoModal() {
  const { updateModal } = useContext(ModalContext);

  return (
    <div className="absolute inset-0 flex items-center justify-center px-2">
      <div className="relative z-50 flex flex-col w-full max-w-md overflow-hidden bg-white border border-gray-200 divide-y divide-gray-200 rounded-md shadow-2xl">
        <div className="flex justify-end p-4">
          <button
            onClick={() => {
              updateModal(null);
            }}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6 text-gray-900 hover:text-gray-700"
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
          </button>
        </div>
        <h1 className="p-4 font-light tracking-wider text-gray-900">
          This universe does not meet your filter criteria, but one or more of
          its constituent books and/or series does.
        </h1>
      </div>
    </div>
  );
}
