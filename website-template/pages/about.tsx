import BlockContent from "@sanity/block-content-to-react";
import {
  withDefaultLayout,
  withDefaultLayoutStaticProps,
} from "../components/Layout";
import { execQuery, groq } from "../lib/sanity";
import { InferGetStaticPropsType } from "next";
import { About } from "../@types/sanity";
import { withDefaultRevalidate } from "../lib/utils";

export default withDefaultLayout(function AboutPage({
  about,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="px-4 pt-8 sm:pt-16">
      <div className="mx-auto prose max-w-7xl">
        <BlockContent blocks={about.content} />
      </div>
    </div>
  );
});

export const getStaticProps = withDefaultLayoutStaticProps(
  withDefaultRevalidate(async () => ({
    props: {
      about: await execQuery<About>(groq`*[_id == "aboutPage"][0]`),
    },
  }))
);
