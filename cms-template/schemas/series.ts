export default {
  name: "series",
  title: "Series",
  type: "document",
  fields: [
    {
      name: "splashArt",
      title: "Splash Art",
      type: "imageWithAlt",
      description:
        "This will be used when rendering this series as a thumbnail. For instance, when it is included as a recommendation.",
    },
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: any) => [Rule.required()],
    },
    {
      name: "tagline",
      title: "Tagline",
      type: "string",
      validation: (Rule: any) => [
        Rule.max(256).warning(
          "This is sort of long. Generally taglines are 256 characters or less."
        ),
      ],
    },
    {
      name: "genres",
      title: "Genre(s)",
      type: "array",
      description:
        "We don't infer series genres from the genres of constituent books. You've got to explicitly add genres to series.",
      of: [
        {
          name: "genre",
          title: "Genre",
          type: "reference",
          icon: false,
          to: [{ type: "genre" }],
        },
      ],
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule: any) => [
        Rule.required().warning(
          "Descriptions are key for both visitor enjoyment and SEO. Consider adding a description."
        ),
        Rule.min(100).warning(
          "Descriptions are usually a few hundred words long. Consider adding more to this description."
        ),
      ],
    },
    {
      name: "books",
      title: "Books",
      type: "array",
      options: { layout: "grid" },
      of: [
        {
          name: "book",
          title: "Book",
          type: "reference",
          to: [{ type: "book" }],
        },
      ],
      validation: (Rule: any) => [Rule.required().min(1)],
    },
    {
      name: "buyLinks",
      title: "Buy Links",
      type: "buyLinks",
    },
    {
      name: "recommendations",
      title: "Recommendations",
      type: "recommendations",
    },
    { name: "seo", title: "SEO", type: "seo" },
  ],
  preview: {
    select: {
      media: "splashArt",
      title: "name",
      subtitle: "tagline",
    },
  },
} as const;
