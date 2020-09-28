import { Transition } from "@headlessui/react";
import Link from "next/link";
import { useContext, useState } from "react";
import { ModalContext } from "../contexts/modal";
import { Image, ImageProps } from "./Image";

export interface BookProps {
  notSelected: boolean;
  genres?: { _id: string; name: string }[];
  // _createdAt: string;
  _id?: string;
  // _rev: string;
  // _type: string;
  // _updatedAt: string;
  buyLinks?: BuyLink[];
  cover?: {
    alt?: string;
    asset: ImageProps;
  };
  // description?: any[];
  // tagline?: string;
  title?: string;
}

export function Book(props: BookProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`${
        props.notSelected ? "opacity-25 pointer-events-none" : "opacity-100"
      } relative h-full transition-all duration-300 ease-in-out transform sm:pb-5 group hover:z-20`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href="/book/[id]" as={`/book/${props._id}`}>
        <a className="relative flex flex-col items-center justify-center h-full overflow-hidden transition-all duration-300 ease-in-out bg-gray-700 rounded-md shadow-lg group">
          <div className="relative w-full h-full p-2 transition-all duration-1000 ease-in-out sm:p-4 group-hover:bg-teal-100">
            <div
              className="absolute inset-0 transition-opacity duration-1000 ease-in-out transform scale-110 opacity-0 group-hover:opacity-50"
              style={{
                filter: "blur(3px) brightness(200%)",
                willChange: "transform",
              }}
            >
              <div className="h-full max-h-full overflow-hidden opacity-75">
                <Image
                  alt={props.cover?.alt}
                  lqipText={props.title}
                  {...props.cover?.asset}
                />
              </div>
            </div>
            <div
              style={{ willChange: "transform" }}
              className="transition-all duration-300 ease-in-out delay-150 transform rounded-md shadow-lg group-hover:scale-95 sm:group-hover:scale-90"
            >
              <div className="w-full overflow-hidden transition-all duration-300 ease-in-out delay-150 rounded-md shadow-lg">
                <Image
                  alt={props.cover?.alt}
                  lqipText={props.title}
                  {...props.cover?.asset}
                />
              </div>
            </div>
          </div>
        </a>
      </Link>
      <Transition
        show={hovered}
        enter="delay-200 transition-all ease-out duration-150 transform"
        enterFrom="h-0 opacity-0"
        enterTo="h-10 opacity-100"
        leave="transition-all ease-in duration-150"
        leaveFrom="h-10 opacity-100"
        leaveTo="h-0 opacity-0"
        className="absolute bottom-0 z-20 items-end justify-center hidden w-full sm:flex"
      >
        <BuyNowButton buyLinks={props.buyLinks} />
      </Transition>
    </div>
  );
}

interface BuyLink {
  _key?: string;
  _type?: string;
  link?: string;
  name?: string;
}

interface BuyNowButtonProps {
  buyLinks: BuyLink[];
}

function BuyNowButton({ buyLinks }: BuyNowButtonProps) {
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

function BuyNowModal({ buyLinks }: BuyNowButtonProps) {
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
