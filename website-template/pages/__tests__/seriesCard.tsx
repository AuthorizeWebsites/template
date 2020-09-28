import { BookProps } from "../../components/Book";
import { Series } from "../../components/Series";
import { execQuery, groq } from "../../queries";

interface SeriesCardPageProps {
  result: {
    _id: string;
    name: string;
    books: BookProps[];
  };
}

export default function SeriesCardPage(props: SeriesCardPageProps) {
  return (
    <div className="max-w-6xl px-4 pt-64 pb-64 mx-auto">
      <Series
        _id={props.result._id}
        name={props.result.name}
        books={props.result.books}
      />
      <div className="h-screen" />
    </div>
  );
}

export const getStaticProps = async () => {
  return {
    props: await execQuery(groq`
        * | [
            _type == "series"
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
            }
        }
    `),
  };
};
