import { execQuery, groq } from "../queries";
import BlockContent from "@sanity/block-content-to-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Layout } from "../components/Layout";

export default function AboutPage(props: {
  siteConfiguration: any;
  about: any;
}) {
  return (
    <Layout
      header={<Header siteConfiguration={props.siteConfiguration} />}
      content={
        <div className="px-4 pt-8 sm:pt-16">
          <div className="mx-auto prose max-w-7xl">
            <BlockContent blocks={props.about?.content} />
          </div>
        </div>
      }
      footer={<Footer siteConfiguration={props.siteConfiguration} />}
    />
  );
}

export const getStaticProps = async () => {
  return {
    props: {
      siteConfiguration: (
        await execQuery(groq`
          * | [
            _id == "siteConfiguration"
          ] | [
            0
          ]
        `)
      ).result,
      about: (
        await execQuery(groq`
          * | [
            _id == "aboutPage"
          ] | [
            0
          ]
        `)
      ).result,
    },
  };
};
