export default {
  name: "richText",
  title: "Rich Text",
  type: "array",
  of: [
    {
      name: "block",
      title: "Block",
      type: "block",
    },
  ],
} as const;
