import { BookProps } from "../../components/Book";
import { SeriesProps } from "../../components/Series";
import { Universe } from "../../components/Universe";
import { execQuery, groq } from "../../queries";

interface UniverseCardPageProps {
  result: {
    _id: string;
    name: string;
    books?: BookProps[];
    series?: SeriesProps[];
  };
}

export default function universeCardPage(props: UniverseCardPageProps) {
  return (
    <div className="px-4 pt-64 pb-64 mx-auto max-w-7xl">
      <Universe {...props.result} />
      <div className="h-screen" />
    </div>
  );
}

export const getStaticProps = async () => {
  return {
    props: await execQuery(groq`
        * | [
            _type == "universe"
        ] | [
            0
        ] | {
            ...,
            "books": books[]->{
                ...,
                "cover": cover | {
                    ...,
                    asset->
                }   
            },
            "series": series[]->{
                ...,
                "books": books[]->{
                    ...,
                    "cover": cover | {
                        ...,
                        asset->
                    }   
                },
            }
        }
    `),
  };
};
