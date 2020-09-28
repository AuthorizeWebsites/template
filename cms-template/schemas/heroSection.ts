export default {
  name: "heroSection",
  title: "Hero Section",
  type: "object",
  hidden: true,
  fields: [
    {
      name: "primaryText",
      title: "Primary Text",
      type: "string",
    },
    {
      name: "secondaryText",
      title: "Secondary Text",
      type: "string",
    },
    {
      name: "background",
      title: "Background",
      type: "imageWithAlt",
      validation: (Rule: any) => [Rule.required()],
    },
  ],
  preview: {
    select: {
      title: "primaryText",
      subtitle: "secondaryText",
      media: "background",
    },
    prepare(selection) {
      return {
        ...selection,
        title: selection.title ?? selection.subtitle,
        subtitle:
          selection.title && selection.subtitle ? selection.subtitle : "",
      };
    },
  },
} as const;
