import { InferGetStaticPropsType } from "next";
import { About } from "../../@types/sanity";
import { BioView } from "../../components/BioView.gen";
import { execQuery, groq } from "../../lib/sanity";

export default function BioTest({
  about,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <BioView content={about.content} />
    </>
  ); //;
}

export const getStaticProps = async () => {
  return {
    props: {
      about: await execQuery<About>(groq`*[_id == "aboutPage"][0]`),
    },
  };
};
