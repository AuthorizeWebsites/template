export default {
  name: "seo",
  title: "SEO",
  type: "object",
  options: {
    collapsible: true,
    collapsed: true,
  },
  description:
    "Visitors won't see these things, but adding them will improve your site's search rankings.",
  fields: [
    {
      name: "tags",
      title: "Tag(s)",
      type: "array",
      options: { layout: "tags" },
      of: [{ type: "string" }],
      description: "Individual keywords or phrases associated with this pages.",
      validation: (Rule: any) => [
        Rule.required()
          .min(5)
          .warning(
            "At least 5 tags is generally a good minimum. Consider adding more."
          ),
      ],
    },
    {
      name: "metaDescription",
      title: "Description",
      type: "text",
      validation: (Rule: any) => [
        Rule.required()
          .min(100)
          .warning(
            "SEO descriptions should generally be at least 100 characters long. Consider adding more."
          ),
      ],
      description:
        "A brief description of this page. Try describing it like you're talking to a 5 year old (search engines can be pretty dense).",
    },
  ],
} as const;
