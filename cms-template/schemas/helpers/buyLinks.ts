export default {
  name: "buyLinks",
  title: "Buy Links",
  type: "array",
  of: [
    {
      name: "buyLink",
      title: "Buy Link",
      type: "buyLink",
    },
  ],
} as const;
