import BlockContent from "@sanity/block-content-to-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Layout } from "../components/Layout";
import { execQuery, getSiteConfiguration, groq } from "../lib/sanity";
import { InferGetStaticPropsType } from "next";
import { About } from "../@types/sanity";

export default function AboutPage({
  siteConfiguration,
  about,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      header={
        <Header authorName={siteConfiguration.authorName ?? "YOUR NAME"} />
      }
      content={
        <div className="px-4 pt-8 sm:pt-16">
          <div className="mx-auto prose max-w-7xl">
            <BlockContent blocks={about.content} />
          </div>
        </div>
      }
      footer={
        <Footer authorName={siteConfiguration.authorName ?? "YOUR NAME"} />
      }
    />
  );
}

export const getStaticProps = async () => {
  return {
    props: {
      siteConfiguration: await getSiteConfiguration(),
      about: await execQuery<About>(groq`*[_id == "aboutPage"][0]`),
    },
    revalidate: 1,
  };
};
