import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

import book from "./documents/book";
import series from "./documents/series";
import universe from "./documents/universe";
import genre from "./documents/genre";
import recommendation from "./helpers/recommendation";
import buyLinks from "./helpers/buyLinks";
import richText from "./helpers/richText";
import customImage from "./helpers/customImage";
import buyLink from "./helpers/buyLink";
import recommendations from "./helpers/recommendations";
import siteConfiguration from "./documents/siteConfiguration";
import about from "./documents/about";
import home from "./documents/home";

export const localTypes = [
  //author,
  book,
  series,
  universe,
  genre,
  //
  richText,
  customImage,
  buyLinks,
  buyLink,
  recommendations,
  recommendation,
  siteConfiguration,
  about,
  home,
  //recommendation,
  //seo,
  //buyLinks,
  //imageWithAlt,
  // aboutMePage,
  // homePage,
  // heroSection,
  // bioSection,
  // booksCarouselSection,
  // newsletterSignupSection,
  // siteConfiguration,
  // newsletterIntegration,
  // affiliateCodesIntegration,
] as const;

type TypeTuple2TypeNameTuple<TupleT> = {
  [IndexT in keyof TupleT]: TupleT[IndexT] extends {
    name:
      | "book"
      | "series"
      | "universe"
      | "genre"
      | "richText"
      | "customImage"
      | "buyLinks"
      | "buyLink"
      | "recommendations"
      | "recommendation"
      | "siteConfiguration"
      | "about"
      | "home";
  }
    ? TupleT[IndexT]["name"]
    : never;
};

type LocalTypeName = TypeTuple2TypeNameTuple<typeof localTypes>[number];

type BuiltInTypeName =
  | "array"
  | "block"
  | "boolean"
  | "date"
  | "datetime"
  | "document"
  | "file"
  | "geopoint"
  | "image"
  | "number"
  | "object"
  | "reference"
  | "slug"
  | "string"
  | "span"
  | "text"
  | "url";

export type SchemaType = LocalTypeName | BuiltInTypeName;

type BackSubstitution<TupleT> = {
  [IndexT in keyof TupleT]: TupleT[IndexT] & {
    name: LocalTypeName;
    type: BuiltInTypeName;
  };
};

const _: BackSubstitution<typeof localTypes> = localTypes;

export default createSchema({
  name: "default",
  types: schemaTypes.concat(localTypes),
});
