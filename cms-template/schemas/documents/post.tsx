export default {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "coverImage",
      title: "Cover Image",
      type: "customImage",
    },
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "publicationDate",
      title: "Publication Date",
      type: "date",
    },
    {
      name: "body",
      title: "Body",
      type: "richText",
    },
  ],
} as const;
