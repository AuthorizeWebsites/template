export default {
  name: "recommendations",
  title: "Recommendations",
  type: "array",
  of: [
    {
      type: "reference",
      to: [
        { type: "book" },
        { type: "series" },
        { type: "universe" },
        { type: "genre" },
      ],
    },
  ],
  description:
    "Add books, series, universes, or series that you think vistors should checkout based on having viewed this page.",
} as const;
