export default {
  name: "genre",
  title: "Genres",
  type: "document",
  icon: false,
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: any) => [Rule.required().min(1).max(100)],
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
      title: "name",
    },
  },
} as const;
