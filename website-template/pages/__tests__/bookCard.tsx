import { Book, BookProps } from "../../components/Book";
import { execQuery, groq } from "../../queries";

export default function BookCardTestPage(props: { result: BookProps }) {
  return (
    <div className="w-64 pt-40 mx-auto">
      <Book {...props.result} />
    </div>
  );
}

export const getStaticProps = async () => {
  return {
    props: await execQuery(groq`
        * | [
            _type == "book"
        ] | [
            0
        ] | {
            ...,
            "cover": cover | {
                ...,
                asset->
            }
        }
    `),
  };
};
