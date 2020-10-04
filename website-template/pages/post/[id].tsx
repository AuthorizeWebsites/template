import BlockContent from "@sanity/block-content-to-react";
import { InferGetStaticPropsType } from "next";
import { Post } from "../../@types/sanity";
import { ImageV2 } from "../../components/ImageV2";
import {
  withDefaultLayout,
  withDefaultLayoutStaticProps,
} from "../../components/Layout";
import { execQuery, groq } from "../../lib/sanity";
import {
  getStaticPathsFromIds,
  withDefaultRevalidate,
  withSafeIdParam,
} from "../../lib/utils";

export default withDefaultLayout(function PostByIdPage({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="px-4 pt-4">
      <div className="mx-auto space-y-8 max-w-7xl">
        <div className="space-y-2">
          {!!post.title && (
            <h1 className="text-4xl font-bold leading-tight tracking-wider text-center text-gray-900">
              {post.title}
            </h1>
          )}
          {!!post.publicationDate && (
            <p className="leading-none tracking-wider text-center text-gray-900">
              {new Date(post.publicationDate).toLocaleDateString()}
            </p>
          )}
        </div>
        {!!post.coverImage?.asset && (
          <div className="overflow-hidden rounded-lg shadow-2xl">
            <ImageV2
              metadata={post.coverImage?.asset?.metadata}
              url={post.coverImage?.asset?.url}
              independentDimension="width"
            />
          </div>
        )}
        {!!post.body && (
          <BlockContent blocks={post.body} className="prose max-w-none" />
        )}
      </div>
    </div>
  );
});

export const getStaticProps = withDefaultLayoutStaticProps(
  withSafeIdParam(
    withDefaultRevalidate(async ({ params: { id } }) => ({
      props: {
        post: await execQuery<Post>(
          groq`*[_id == "${id}"][0]{ ..., coverImage{ ..., asset->} }`
        ),
      },
    }))
  )
);

export const getStaticPaths = getStaticPathsFromIds("post");
