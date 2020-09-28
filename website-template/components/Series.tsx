import Link from "next/link";
import { BookProps } from "./Book";
import { BookSet } from "./BookSet";

export interface SeriesProps {
  name: string;
  _id: string;
  books: BookProps[];
  genres?: { _id: string; name: string }[];
  selectedGenreIds?: string[];
  filter?: boolean;
}

export function Series({
  name,
  _id,
  books,
  genres,
  selectedGenreIds,
  filter,
}: SeriesProps) {
  return (
    <div className="flex-1 p-4 space-y-4 transition-all duration-150 ease-in-out bg-gray-800 rounded-md shadow-lg">
      <div
        className={`${
          filter &&
          !selectedGenreIds.reduce((acc, id) => {
            return acc && genres?.some((genre) => genre._id === id);
          }, true)
            ? "opacity-25 pointer-events-none"
            : "opacity-100"
        } flex items-center justify-between w-full`}
      >
        <Link href="/series/[id]" as={`/series/${_id}`}>
          <a className="pr-2 text-xl font-semibold leading-none tracking-wider text-white group sm:text-2xl hover:text-gray-300">
            {name}{" "}
            <svg
              className="inline-block w-4 h-4 text-white group-hover:text-gray-300"
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
          </a>
        </Link>
        <span className="inline-block px-2 py-2 text-base font-semibold leading-none tracking-wider text-white rounded-md shadow-lg bg-gradient-to-tr from-teal-600 to-teal-500 sm:text-lg font-base">
          series
        </span>
      </div>
      <hr className="opacity-25" />
      <BookSet
        books={books}
        filter={filter}
        selectedGenreIds={selectedGenreIds}
      />
    </div>
  );
}
