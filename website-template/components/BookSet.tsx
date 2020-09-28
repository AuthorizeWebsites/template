import { Book, BookProps } from "./Book";

export function BookSet({
  books,
  selectedGenreIds,
  filter,
}: {
  books: BookProps[];
  selectedGenreIds?: string[];
  filter?: boolean;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {books.map((book) => (
        <Book
          {...book}
          key={book._id}
          notSelected={
            filter &&
            !selectedGenreIds?.reduce((acc, id) => {
              return acc && book.genres?.some((genre) => genre._id === id);
            }, true)
          }
        />
      ))}
    </div>
  );
}
