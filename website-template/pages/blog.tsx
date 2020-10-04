import BlockContent from "@sanity/block-content-to-react";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { Post } from "../@types/sanity";
import { ImageV2 } from "../components/ImageV2";
import {
  withDefaultLayout,
  withDefaultLayoutStaticProps,
} from "../components/Layout";
import { execQuery, groq } from "../lib/sanity";
import { withDefaultRevalidate } from "../lib/utils";

export default withDefaultLayout(function BlogIndexPage({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="px-4 pt-4">
      <div className="mx-auto space-y-8 max-w-7xl">
        {!!posts.length && (
          <Link href="/post/[id]" as={`/post/${posts[0]._id}`}>
            <a>
              <div className="relative p-4 space-y-4 transition-shadow duration-500 ease-in-out bg-white border border-gray-100 rounded-lg shadow-lg hover:shadow-2xl">
                <h1 className="text-3xl font-bold leading-tight tracking-wider text-gray-900">
                  {posts[0].title}
                </h1>
                {!!posts[0].coverImage?.asset && (
                  <div className="w-full overflow-hidden rounded-lg shadow-2xl">
                    <ImageV2
                      metadata={posts[0].coverImage?.asset?.metadata}
                      url={posts[0].coverImage?.asset?.url}
                      independentDimension="width"
                    />
                  </div>
                )}
                {!!posts[0]?.body && (
                  <div className="relative overflow-hidden max-h-96">
                    <BlockContent
                      blocks={posts[0].body}
                      className="prose max-w-none"
                    />
                    <div className="absolute inset-x-0 bottom-0 pointer-events-none h-96 bg-gradient-to-t from-white to-transparent" />
                  </div>
                )}
                <div className="absolute flex items-center justify-center inset-x-4 bottom-16">
                  <button className="p-4 text-lg font-semibold leading-none tracking-wider text-white rounded-md shadow-lg focus:outline-none hover:from-teal-500 hover:to-teal-600 bg-gradient-to-tr from-teal-400 to-teal-500">
                    Read More
                  </button>
                </div>
              </div>
            </a>
          </Link>
        )}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold leading-none tracking-wider text-gray-900">
            Recent Posts
          </h1>
          <hr className="opacity-50" />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <Link href="/post/[id]" as={`/post/${post._id}`}>
                <a className="h-full">
                  <div className="flex flex-col h-full overflow-hidden transition-shadow duration-500 ease-in-out border border-gray-100 rounded-lg shadow-lg group hover:shadow-2xl">
                    {post.coverImage?.asset && (
                      <div className="flex-1 h-64 overflow-hidden">
                        <div className="w-full h-full transition-transform duration-1000 ease-in-out transform group-hover:scale-105">
                          <ImageV2
                            metadata={post.coverImage.asset.metadata}
                            url={post.coverImage.asset.url}
                            independentDimension="cover"
                          />
                        </div>
                      </div>
                    )}
                    <div className="p-4 space-y-2 bg-gray-50">
                      {!!post.title && (
                        <h1 className="text-3xl font-bold leading-tight tracking-wider text-gray-900">
                          {post.title}
                        </h1>
                      )}
                      {!!post.publicationDate && (
                        <p className="text-sm leading-none tracking-wider text-gray-900">
                          {new Date(post.publicationDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export const getStaticProps = withDefaultLayoutStaticProps(
  withDefaultRevalidate(async () => ({
    props: {
      posts: await execQuery<Post[]>(
        groq`*[_type == "post"]| order(publicationDate desc) | { ..., coverImage{ ..., asset->} }`
      ),
    },
  }))
);
