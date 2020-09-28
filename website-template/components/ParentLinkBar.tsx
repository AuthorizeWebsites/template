import Link from "next/link";

export function ParentLinkBar({
  statement,
  href,
  as,
}: {
  statement: any;
  href: string;
  as?: string;
}) {
  return (
    <Link href={href} as={as}>
      <a className="block">
        <div className="p-4 text-white bg-gray-900 rounded-md shadow-lg hover:text-gray-300">
          <h1 className="text-lg leading-tight tracking-wider text-center">
            {statement}{" "}
            <svg
              className="inline-block w-4 h-4"
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
          </h1>
        </div>
      </a>
    </Link>
  );
}
