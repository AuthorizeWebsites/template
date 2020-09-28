import { useRouter } from "next/router";
import Link from "next/link";
import { Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { execQuery, groq } from "../queries";

const navItems: { text: string; href: string; as?: string }[] = [
  {
    text: "About",
    href: "/about",
  },
  {
    text: "Books",
    href: "/books",
  },
  {
    text: "Contact",
    href: "/contact",
  },
];

function MobileMenu() {
  const router = useRouter();
  const [show, setShow] = useState(false);

  return (
    <div className="block sm:hidden">
      <button
        onClick={() => setShow(true)}
        className="p-px text-gray-600 rounded-md focus:text-gray-800 focus:outline-none"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <Transition
        show={show}
        enter="transform transition-transform duration-500 ease-out"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transform transition-opacity duration-300 ease-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="fixed inset-0 w-screen h-screen"
      >
        <div className="flex flex-col items-center justify-center w-full h-full p-4 space-y-4 bg-white">
          <div className="flex items-center justify-between w-full p-4 bg-gray-200 bg-opacity-75 rounded-md">
            <Link href="/">
              <a
                onClick={() => setShow(false)}
                className="text-4xl font-bold leading-none tracking-wider text-transparent bg-clip-text bg-gradient-to-tr from-teal-500 to-teal-400"
              >
                Authorize
              </a>
            </Link>
            <button
              onClick={() => setShow(false)}
              className="rounded-md bg-gradient-to-tl from-teal-500 to-teal-400 focus:outline-none"
            >
              <svg
                className="w-8 h-8 text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <hr className="w-full opacity-50" />
          <nav className="flex flex-col items-start w-full space-y-2">
            {navItems.map(({ text, href, as }) => (
              <Link href={href} as={as} key={href}>
                <a className="block w-full p-4 bg-gray-200 rounded-md">
                  <span
                    className={`${
                      router?.asPath === (as ?? href)
                        ? "text-transparent bg-clip-text bg-gradient-to-tr from-teal-500 to-teal-400 text-shadow-teal"
                        : "text-gray-600 hover:text-gray-800"
                    } text-lg font-light tracking-wider`}
                  >
                    {text}
                  </span>
                </a>
              </Link>
            ))}
          </nav>
        </div>
      </Transition>
    </div>
  );
}

function SearchBar() {
  const [searchString, setSearchString] = useState("");

  const [mostRecent, setMostRecent] = useState([]);

  const { data, error } = useSWR(
    searchString,
    async (s) => await (await fetch(`/api/search?str=${s}`)).json()
  );

  useEffect(() => {
    setMostRecent(data === undefined ? [] : data);
  }, [data]);

  return (
    <div className="relative flex-1 hidden md:block">
      <input
        className="relative w-full px-3 py-2 text-gray-900 rounded-md shadow-inner focus:bg-gray-100 bg-gray-50 focus:outline-none"
        placeholder="Search"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
      <svg
        className="absolute top-0 w-4 h-full text-gray-500 right-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <div className="absolute inset-x-0 mt-2 space-y-1">
        {mostRecent.map((item) => {
          return (
            <Link
              key={item._id}
              href={`/${item._type}/[id]`}
              as={`/${item._type}/${item._id}`}
            >
              <a
                key={item._id}
                onClick={() => setSearchString("")}
                className="relative block w-full px-3 py-3 font-semibold leading-tight tracking-wider text-gray-900 bg-gray-100 border border-gray-300 rounded-md shadow-2xl hover:z-50 hover:border-teal-400 focus:border-teal-400 hover:bg-gray-900 hover:text-white focus:outline-none focus:bg-gray-900 focus:text-white"
              >
                {item.name}
                {item.title}
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function Header({ siteConfiguration }: { siteConfiguration: any }) {
  const router = useRouter();

  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    window.onscroll = () => {
      setScrollPos(window.pageYOffset);
    };
  }, []);

  return (
    <div
      className={`${
        scrollPos === 0 ? "shadow-none" : "shadow-xl"
      } p-3 bg-white sm:p-6 transition-all ease-in-out duration-1000`}
    >
      <div className="flex items-center justify-between mx-auto space-x-4 max-w-7xl">
        <Link href="/">
          <a
            className={`${
              router?.asPath === "/" ? "text-shadow-teal" : ""
            } text-3xl font-light leading-none tracking-wider text-transparent uppercase transition-all duration-300 ease-in-out hover:text-shadow-teal-lg bg-clip-text bg-gradient-to-tr from-teal-500 to-teal-400`}
          >
            {siteConfiguration.authorName ?? ""}
          </a>
        </Link>
        <SearchBar />
        <div className="hidden sm:block">
          <nav className="flex gap-4">
            {navItems.map(({ text, href, as }) => (
              <Link href={href} as={as} key={href}>
                <a
                  className={`${
                    router?.asPath === (as ?? href)
                      ? "text-transparent bg-clip-text bg-gradient-to-tr from-teal-500 to-teal-400 text-shadow-teal"
                      : "text-gray-600 hover:text-gray-800"
                  } text-lg font-light tracking-wider`}
                >
                  {text}
                </a>
              </Link>
            ))}
          </nav>
        </div>
        <MobileMenu />
      </div>
    </div>
  );
}
