import BlockContent from "@sanity/block-content-to-react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Post, SiteConfiguration } from "../../@types/sanity";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { ImageV2 } from "../../components/ImageV2";
import { Layout } from "../../components/Layout";
import { execQuery, getSiteConfiguration, groq } from "../../lib/sanity";

export default function BlogByIdPage({
  siteConfiguration,
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      header={
        <Header authorName={siteConfiguration.authorName ?? "YOUR NAME"} />
      }
      content={
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
      }
      footer={
        <Footer authorName={siteConfiguration.authorName ?? "YOUR NAME"} />
      }
    />
  );
}

export const getStaticProps: GetStaticProps<
  {
    siteConfiguration: SiteConfiguration;
    post: Post;
  },
  { id: string }
> = async ({ params }) => {
  if (params?.id === undefined) throw new Error("Missing id.");

  if ((await execQuery<unknown[]>(groq`*[_id == "${params.id}"]`)).length === 0)
    throw new Error("Invalid id.");

  return {
    props: {
      siteConfiguration: await getSiteConfiguration(),
      post: await execQuery(
        groq`*[_id == "${params.id}"][0]{ ..., coverImage{ ..., asset->} }`
      ),
    },
    revalidate: 1,
  };
};

export const getStaticPaths = async () => {
  return {
    paths: (
      await execQuery<string[]>(groq`*[_type == "post"]._id`)
    ).map((id: string) => ({ params: { id } })),
    fallback: true,
  };
};
