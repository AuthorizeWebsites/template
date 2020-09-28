export default {
  name: "buyLinks",
  title: "Buy Links",
  type: "array",
  of: [
    {
      name: "buyLink",
      title: "Buy Link",
      type: "object",
      icon: false,
      fields: [
        {
          name: "platform",
          title: "Platform",
          type: "string",
          validation: (Rule: any) => [Rule.required()],
        },
        {
          name: "link",
          title: "Link",
          type: "url",
          validation: (Rule: any) => [Rule.required()],
        },
      ],
      preview: {
        select: {
          title: "platform",
          subtitle: "link",
        },
      },
    },
  ],
} as const;
