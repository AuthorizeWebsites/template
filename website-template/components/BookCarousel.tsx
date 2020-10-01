import { Transition } from "@headlessui/react";
import BlockContent from "@sanity/block-content-to-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Book, Carousel, Override } from "../@types/sanity";
import { ImageV2 } from "./ImageV2";

function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef(null);

  useEffect(() => {
    (savedCallback as any).current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      (savedCallback as any).current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export function BookCarousel({
  books,
}: Override<Pick<Carousel, "books">, { books: Book[] }>) {
  const [showingIndex, setShowingIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useInterval(() => {
    if (!isHovered) setShowingIndex((prev) => (prev + 1) % books.length);
  }, 3500);

  return (
    <div
      className="relative flex p-4 overflow-hidden bg-gray-900 rounded-md shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {books.map((book, index) => (
        <Transition
          key={book._id}
          show={showingIndex === index}
          enter="transform transition-all ease-in-out duration-1000"
          enterFrom="-translate-x-full"
          enterTo="translate-x-none"
          leave="transform transition-all ease-in-out duration-1000"
          leaveFrom="translate-x-none"
          leaveTo="translate-x-full"
          className="absolute inset-0 px-4 pt-4 pb-6"
        >
          <Link href="/book/[id]" as={`/book/${book._id}`}>
            <a className="flex items-center justify-center w-full h-full gap-4 p-4 bg-white rounded-md shadow-lg focus:outline-none focus:opacity-75">
              {!!book.cover?.asset && (
                <div className="relative overflow-hidden rounded-md shadow-lg w-72">
                  <ImageV2
                    metadata={book.cover.asset.metadata}
                    url={book.cover.asset.url}
                    independentDimension="width"
                  />
                </div>
              )}
              <div className="flex-col self-stretch flex-1 hidden sm:flex">
                <h1 className="text-3xl font-bold leading-tight tracking-wider">
                  {book.title}
                </h1>
                <div className="relative flex-1 ">
                  <div className="absolute inset-0 overflow-y-auto">
                    <BlockContent
                      renderContainerOnSingleChild
                      blocks={book.description}
                      className="prose max-w-none"
                    />
                    <div className="h-16" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none bg-gradient-to-t from-white to-transparent" />
                </div>
              </div>
            </a>
          </Link>
        </Transition>
      ))}
      {books.map((book) => (
        <div
          key={book._id + "dummy"}
          className="px-4 pt-4 pb-6 opacity-0 pointer-events-none"
        >
          {!!book.cover?.asset && (
            <div className="relative overflow-hidden rounded-md shadow-lg w-72">
              <ImageV2
                metadata={book.cover.asset.metadata}
                url={book.cover.asset.url}
                independentDimension="width"
              />
            </div>
          )}
        </div>
      ))}
      <div className="absolute inset-x-0 bottom-0 flex justify-center p-2 space-x-2">
        {books.map((_, index) => (
          <button
            key={index}
            onClick={() => setShowingIndex(index)}
            className={`${
              showingIndex === index ? "bg-teal-400" : "bg-white"
            } w-2 h-2 rounded-full focus:outline-none border border-transparent focus:border-teal-400 transform hover:scale-125`}
          />
        ))}
      </div>
    </div>
  );
}
