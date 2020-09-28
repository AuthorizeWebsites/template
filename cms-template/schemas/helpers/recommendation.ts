export default {
  name: "recommendation",
  title: "Recommendation",
  type: "reference",
  to: [
    {
      name: "book",
      title: "Book",
      type: "book",
    },
    {
      name: "series",
      title: "Series",
      type: "series",
    },
    {
      name: "universe",
      title: "Universe",
      type: "universe",
    },
    {
      name: "genre",
      title: "Genre",
      type: "genre",
    },
  ],
} as const;
