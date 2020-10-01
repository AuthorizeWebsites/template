import { Book, Genre, Override } from "../@types/sanity";
import { BookView } from "./Book";

export function BookSet({
  books = [],
  numHiddenBooks = 0,
}: {
  books: Override<Book, { genres?: Genre[] }>[];
  numHiddenBooks?: number;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {books.map((book) => (
        <BookView {...book} key={book._id} />
      ))}
      {numHiddenBooks > 0 && (
        <div className="flex sm:pb-5">
          <div className="relative flex flex-col items-center justify-center px-4 py-4 bg-gray-700 rounded-md shadow-lg sm:py-8">
            <p className="relative items-center justify-center hidden text-6xl font-bold leading-none text-teal-400 transform scale-150 sm:flex">
              {numHiddenBooks}
            </p>
            <p className="text-base font-light tracking-wider text-center text-gray-200 opacity-100 sm:text-lg sm:pt-8">
              {numHiddenBooks} {numHiddenBooks > 1 ? "books were" : "book was"}{" "}
              hidden based on your filter criteria.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
