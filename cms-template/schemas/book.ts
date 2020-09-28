export default {
  name: "book",
  title: "Books",
  type: "document",
  fields: [
    // {
    //   name: "cover",
    //   title: "Cover",
    //   type: "imageWithAlt",
    //   validation: (Rule: any) => [Rule.required()],
    // },
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => [Rule.required()],
    },
    // {
    //   name: "tagline",
    //   title: "Tagline",
    //   type: "string",
    //   validation: (Rule: any) => [
    //     Rule.max(256).warning(
    //       "This is sort of long. Generally taglines are 256 characters or less."
    //     ),
    //   ],
    // },
    // {
    //   name: "authors",
    //   title: "Author(s)",
    //   type: "array",
    //   of: [
    //     {
    //       name: "author",
    //       title: "Author",
    //       type: "reference",
    //       icon: false,
    //       to: [{ type: "author" }],
    //     },
    //   ],
    //   validation: (Rule: any) => [Rule.required().min(1)],
    // },
    // {
    //   name: "genres",
    //   title: "Genre(s)",
    //   type: "array",
    //   of: [
    //     {
    //       name: "genre",
    //       title: "Genre",
    //       type: "reference",
    //       icon: false,
    //       to: [{ type: "genre" }],
    //     },
    //   ],
    // },
    // {
    //   name: "description",
    //   title: "Description",
    //   type: "array",
    //   of: [{ type: "block" }],
    //   validation: (Rule: any) => [
    //     Rule.required().warning(
    //       "Descriptions are key for both visitor enjoyment and SEO. Consider adding a description."
    //     ),
    //     Rule.min(100).warning(
    //       "Descriptions are usually a few hundred words long. Consider adding more to this description."
    //     ),
    //   ],
    // },
    // {
    //   name: "buyLinks",
    //   title: "Buy Links",
    //   type: "buyLinks",
    //   validation: (Rule: any) => [
    //     Rule.required()
    //       .min(1)
    //       .warning(
    //         "Give the people what they want! Buy links are the most important things on a book page. Consider adding some."
    //       ),
    //   ],
    // },
    // {
    //   name: "recommendations",
    //   title: "Recommendations",
    //   type: "recommendations",
    // },
    // {
    //   name: "metadata",
    //   title: "Metadata",
    //   type: "object",
    //   options: {
    //     collapsible: true,
    //     collapsed: true,
    //     columns: 2,
    //   },
    //   description:
    //     "This info will help with search rankings a little but is primarily for visitors who are looking for very specific info about the book.",
    //   fields: [
    //     {
    //       name: "isbn10",
    //       title: "ISBN-10",
    //       type: "string",
    //     },
    //     {
    //       name: "isbn13",
    //       title: "ISBN-13",
    //       type: "number",
    //     },
    //     {
    //       name: "pageCount",
    //       title: "Page Count",
    //       type: "number",
    //     },
    //     {
    //       name: "wordCount",
    //       title: "Word Count",
    //       type: "number",
    //     },
    //     {
    //       name: "publisher",
    //       title: "Publisher",
    //       type: "string",
    //     },
    //     {
    //       name: "publicationDate",
    //       title: "Publication Date",
    //       type: "date",
    //     },
    //   ],
    // },
    // {
    //   name: "seo",
    //   title: "SEO",
    //   type: "seo",
    // },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "tagline",
      media: "cover",
    },
  },
} as const;
