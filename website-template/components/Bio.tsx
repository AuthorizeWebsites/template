import BlockContent from "@sanity/block-content-to-react";
import Link from "next/link";

export function Bio({ content }: { content: any[] }) {
  return (
    <div className="flex flex-col p-8 space-y-4 bg-white border border-gray-100 rounded-md shadow-lg">
      <h1 className="text-4xl font-bold leading-none tracking-wider text-gray-900">
        Bio
      </h1>
      <BlockContent
        renderContainerOnSingleChild
        blocks={content}
        className="prose max-w-none"
      />
      <Link href="/about">
        <a className="self-start px-3 py-2 text-lg font-semibold tracking-wider text-white rounded-md shadow-lg hover:from-teal-500 hover:to-teal-600 bg-gradient-to-tr from-teal-400 to-teal-500">
          Read More
        </a>
      </Link>
    </div>
  );
}
