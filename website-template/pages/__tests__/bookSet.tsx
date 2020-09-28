import React from "react";
import { BookProps } from "../../components/Book";
import { BookSet } from "../../components/BookSet";
import { execQuery, groq } from "../../queries";

export default function BookSetPage(props: { result: BookProps[] }) {
  return (
    <div className="p-4 mx-auto my-32 bg-gray-800 max-w-7xl">
      <BookSet books={props.result} />
    </div>
  );
}

export const getStaticProps = async () => {
  return {
    props: await execQuery(groq`
        * | [
            _type == "book"
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
