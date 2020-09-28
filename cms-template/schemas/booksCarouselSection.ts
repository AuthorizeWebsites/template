export default {
  name: "booksCarouselSection",
  title: "Books Carousel Section",
  type: "object",
  icon: false,
  fieldsets: [
    {
      name: "advancedSettings",
      title: "Advanced Settings",
      options: { collapsible: true, collapsed: true, columns: 2 },
      description:
        "You probably just want to leave these, but they're here if you need them.",
    },
  ],
  fields: [
    {
      name: "books",
      title: "Books",
      type: "array",
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
      name: "autoPlay",
      title: "Auto Play",
      fieldset: "advancedSettings",
      type: "boolean",
    },
    {
      name: "infiniteLoop",
      title: "Infinite Loop",
      fieldset: "advancedSettings",
      type: "boolean",
    },
    {
      name: "interval",
      title: "Interval",
      fieldset: "advancedSettings",
      type: "number",
      validation: (Rule: any) => [Rule.min(1)],
      description: "This is in milliseconds. So, 1000 = 1 second.",
    },
  ],
  preview: {
    select: {},
    prepare(selection) {
      return {
        title: "Books Carousel",
      };
    },
  },
} as const;
