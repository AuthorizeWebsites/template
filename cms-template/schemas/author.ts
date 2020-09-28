export default {
  name: "author",
  title: "Authors",
  type: "document",
  icon: false,
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: any) => [Rule.required()],
    },
    {
      name: "linkToAboutMe",
      title: "Link to About Me page?",
      type: "boolean",
      validation: (Rule: any) => [Rule.required()],
      description:
        "If this is you, the owner of this site, you should turn this on so people can click on your name and get brought to your About Me page. You probably want to turn this off for others though.",
    },
  ],
  preview: {
    select: {
      title: "name",
    },
  },
} as const;
