type DocumentNames =
  | "about"
  | "home"
  | "book"
  | "series"
  | "universe"
  | "genre"
  | "siteConfiguration";

export type StringBasicValueType = string;

export type NumberBasicValueType = number;

type BooleanBasicvalueType = boolean;

type DateBasicValueType = string;

type DatetimebasicValueType = string;

type URLBasicValueType = string;

type SlugBasicValueType = string;

type TextBasicValueType = string;

type BasicValueTypes =
  | StringBasicValueType
  | NumberBasicValueType
  | BooleanBasicvalueType
  | DateBasicValueType
  | DatetimebasicValueType
  | URLBasicValueType
  | SlugBasicValueType
  | TextBasicValueType;

export type ObjectType = {
  _id: string;
  _type: string;
};

type DocumentType = {
  _id: string;
  _type: DocumentNames;
};

// todo : complex object types

type ObjectTypes = DocumentType | ObjectType;

type ArrayType = (ObjectTypes | BasicValueTypes | ReferenceType)[];

type ReferenceType = {
  _ref: string;
  _type: string;
};

export type Color = ObjectType & {
  background: StringBasicValueType;
  foreground: StringBasicValueType;
  population: NumberBasicValueType;
  title: StringBasicValueType;
};

export type Image = ObjectType & {
  _type: "customImage";
  asset?: ObjectType & {
    metadata: ObjectType & {
      dimensions: ObjectType & {
        aspectRatio: NumberBasicValueType;
        height: NumberBasicValueType;
        width: NumberBasicValueType;
      };
      lqip: StringBasicValueType;
      palette: ObjectType & {
        darkMuted: Color;
        darkVibrant: Color;
        dominant: Color;
        lightMuted: Color;
        lightVibrant: Color;
        muted: Color;
        vibrant: Color;
      };
    };
    url: StringBasicValueType;
  };
};

export const isImage = (value: ObjectType): value is Image =>
  value._type === "customImage";

export type RichText = ArrayType & any[]; // todo

export const isRichText = (value: ArrayType): value is RichText =>
  Array.isArray(value);

export type About = DocumentType & {
  _type: "about";
  content: RichText;
};

export const isAbout = (value: DocumentType): value is About =>
  value._type === "about";

export type BuyLink = ObjectType & {
  _type: "buyLink";
  name?: StringBasicValueType;
  link?: URLBasicValueType;
};

export const isBuyLink = (value: ObjectType): value is BuyLink =>
  value._type === "buyLink";

export type BuyLinks = BuyLink[];

export const isBuyLinks = (value: ArrayType): value is BuyLinks =>
  Array.isArray(value) &&
  value.reduce((acc: boolean, elem) => {
    return acc && typeof elem === "object" && elem._type === "buyLink";
  }, true);

export type Recommendation = ReferenceType & {
  _type: "recommendation";
};

export const isRecommendation = (
  value: ReferenceType
): value is Recommendation => value._type === "recommendation";

export type Recommendations = (
  | Recommendation
  | Book
  | Series
  | Universe
  | Genre
)[];

export const isRecommendations = (value: ArrayType): value is Recommendations =>
  Array.isArray(value) &&
  value.reduce((acc: boolean, elem) => {
    return (
      acc &&
      typeof elem === "object" &&
      ["book", "series", "universe", "genre"].includes(elem._type)
    );
  }, true);

export type Book = DocumentType & {
  _type: "book";
  cover?: Image;
  title?: StringBasicValueType;
  tagline?: StringBasicValueType;
  description?: RichText;
  buyLinks?: BuyLinks;
  recommendations?: Recommendations;
};

export const isBook = (value: DocumentType): value is Book =>
  value._type === "book";

export type Series = DocumentType & {
  _type: "series";
  name?: StringBasicValueType;
  tagline?: StringBasicValueType;
  description?: RichText;
  books?: ({ _ref: string; _type: "book" } | Book)[];
  buyLinks?: BuyLinks;
  recommendations?: Recommendations;
};

export const isSeries = (value: DocumentType): value is Series =>
  value._type === "series";

export type Universe = DocumentType & {
  _type: "universe";
  name?: StringBasicValueType;
  tagline?: StringBasicValueType;
  description?: RichText;
  books?: ({ _ref: string; _type: "book" } | Book)[];
  series?: ({ _ref: string; _type: "series" } | Series)[];
  buyLinks?: BuyLinks;
  recommendations?: Recommendations;
};

export const isUniverse = (value: DocumentType): value is Universe =>
  value._type === "universe";

export type Genre = DocumentType & {
  _type: "genre";
  name?: StringBasicValueType;
  books?: ({ _ref: string; _type: "book" } | Book)[];
  series?: ({ _ref: string; _type: "series" } | Series)[];
  universes?: ({ _ref: string; _type: "universe" } | Universe)[];
};

export const isGenre = (value: DocumentType): value is Genre =>
  value._type === "genre";

export type Bio = ObjectType & {
  _type: "bio";
  content?: RichText;
};

export const isBio = (value: ObjectType): value is Bio => value._type === "bio";

export type Carousel = ObjectType & {
  _type: "carousel";
  books?: ({ _ref: string; _type: "book" } | Book)[];
};

export const isCarousel = (value: ObjectType): value is Carousel =>
  value._type === "carousel";

export type NewsletterSignUp = ObjectType & {
  _type: "newsletterSignUp";
  primaryText?: StringBasicValueType;
  secondaryText?: StringBasicValueType;
};

export const isNewsletterSignUp = (
  value: ObjectType
): value is NewsletterSignUp => value._type === "newsletterSignUp";

export type Home = DocumentType & {
  _type: "home";
  hero?: ObjectType & {
    _type: "hero";
    show?: BooleanBasicvalueType;
    primaryText?: StringBasicValueType;
    secondaryText?: StringBasicValueType;
    background?: Image;
  };
  components?: (Bio | Carousel | NewsletterSignUp)[];
};

export const isHome = (value: DocumentType): value is Home =>
  value._type === "home";

export type SiteConfiguration = DocumentType & {
  _type: "siteConfiguration";
  authorName?: StringBasicValueType;
  // todo : add social media
};

export const isSiteConfiguration = (
  value: DocumentType
): value is SiteConfiguration => value._type === "siteConfiguration";

export type Override<T1, T2> = Omit<T1, keyof T2> & T2;
