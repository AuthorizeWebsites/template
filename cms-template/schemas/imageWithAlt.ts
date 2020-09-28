export default {
  name: "imageWithAlt",
  title: "Image With Alt",
  type: "image",
  fields: [
    {
      name: "alt",
      title: "Alternative Text",
      type: "string",
      description:
        "This is what screen readers and search engine spiders will read. It's a very good practice to add this for both accessibility and SEO reasons.",
      options: {
        isHighlighted: true,
      },
    },
  ],
  description:
    "Anything you upload will automatically be optomized. So, don't worry about compressing the image manually.",
} as const;
