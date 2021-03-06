import { Transition } from "@headlessui/react";
import Link from "next/link";
import { useContext, useState } from "react";
import { Book, BuyLinks, Override } from "../@types/sanity";
import { ModalContext } from "../contexts/modal";
import { ImageV2 } from "./ImageV2";

// todo : clean up
export function BookView({ _id, cover, title, buyLinks }: Book) {
  // const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full h-full pb-5">
      <div
        className="relative h-full transition-all duration-500 ease-in-out transform group hover:z-20"
        // onMouseEnter={() => setIsHovered(true)}
        // onMouseLeave={() => setIsHovered(false)}
      >
        <Link href="/book/[id]" as={`/book/${_id}`}>
          <a className="relative flex flex-col items-center justify-center h-full overflow-hidden transition-all duration-300 ease-in-out bg-gray-700 rounded-md shadow-lg group">
            {cover?.asset ? (
              <div className="relative w-full h-full p-2 sm:p-4">
                <div className="absolute inset-0 w-full h-full">
                  <div
                    style={{ willChange: "transform, opacity" }}
                    className="w-full h-full transition-all duration-500 ease-in-out transform scale-90 opacity-0 group-hover:scale-110 group-hover:opacity-100"
                  >
                    <div
                      className="w-full h-full bg-blue-200"
                      style={{
                        filter: "blur(2px)",
                      }}
                    >
                      <div className="w-full h-full opacity-50">
                        <ImageV2
                          metadata={cover.asset.metadata}
                          url={cover.asset.url}
                          independentDimension="cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{ willChange: "transform" }}
                  className="transition-all duration-500 ease-in-out transform rounded-md shadow-lg group-hover:scale-95 sm:group-hover:scale-90"
                >
                  <div className="w-full overflow-hidden transition-all duration-300 ease-in-out delay-150 rounded-md shadow-lg">
                    <ImageV2
                      metadata={cover.asset.metadata}
                      url={cover.asset.url}
                      independentDimension="width"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center">{title}</p>
            )}
          </a>
        </Link>
        <div
          style={{ willChange: "transform, opacity" }}
          className="absolute inset-x-0 bottom-0 flex items-center justify-center transition-all duration-500 ease-in-out transform scale-50 translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:scale-100"
        >
          <BuyNowButton buyLinks={buyLinks ?? []} />
        </div>
      </div>
    </div>
  );
}

function BuyNowButton({ buyLinks }: { buyLinks: BuyLinks }) {
  const { updateModal } = useContext(ModalContext);

  return (
    <button
      onClick={() => updateModal(<BuyNowModal buyLinks={buyLinks} />)}
      style={{
        willChange: "transform",
      }}
      className="h-10 px-4 py-2 text-lg font-semibold leading-tight tracking-wider text-white transition-all duration-300 ease-in-out transform rounded-md shadow-lg hover:scale-105 bg-gradient-to-tr from-teal-600 to-teal-400 focus:outline-none hover:bg-teal-500 hover:text-3xl"
    >
      Buy Now
    </button>
  );
}

function BuyNowModal({ buyLinks }: { buyLinks: BuyLinks }) {
  const { updateModal } = useContext(ModalContext);

  return (
    <div className="absolute inset-0 flex items-center justify-center px-2">
      <div className="relative z-50 flex flex-col w-full max-w-md overflow-hidden bg-white divide-y rounded-md shadow-2xl">
        <div className="flex justify-end p-4">
          <button
            onClick={() => updateModal(null)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6"
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
        {buyLinks ? (
          buyLinks.map(({ link, name }) => (
            <a
              href={link}
              target="_blank"
              rel="noopener"
              className="p-4 font-semibold leading-none tracking-wider text-gray-800 bg-white hover:bg-gray-200"
            >
              {name}
            </a>
          ))
        ) : (
          <div className="px-4 py-8">
            <h1 className="max-w-sm mx-auto tracking-wider text-center text-gray-600">
              There are no buy links listed for this book unfortunately. 😢
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
