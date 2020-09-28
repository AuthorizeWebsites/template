export default {
  name: "newsletterSignupSection",
  title: "Newsletter Signup Section",
  type: "object",
  icon: false,
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
      name: "buttonText",
      title: "Button Text",
      type: "string",
      validation: (Rule: any) => [Rule.required()],
    },
  ],
  preview: {
    select: {
      title: "primaryText",
      subtitle: "secondaryText",
    },
  },
} as const;

// todo : document previews
