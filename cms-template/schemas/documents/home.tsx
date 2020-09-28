export default {
  name: "home",
  title: "Home Page",
  type: "document",
  fields: [
    {
      name: "hero",
      title: "Hero Section",
      type: "object",
      fields: [
        {
          name: "show",
          title: "Show",
          type: "boolean",
          description: "If you don't want a hero section, turn this off.",
        },
        { name: "primaryText", title: "Primary Text", type: "string" },
        {
          name: "secondaryText",
          title: "Secondary Text",
          type: "string",
        },
        {
          name: "background",
          title: "Background",
          type: "customImage",
        },
      ],
    },
    {
      name: "components",
      title: "Components",
      type: "array",
      of: [
        {
          name: "bio",
          title: "Bio",
          type: "object",
          fields: [
            {
              name: "content",
              title: "Content",
              type: "richText",
            },
          ],
          preview: {
            prepare() {
              return {
                title: "Bio",
              };
            },
          },
        },
        {
          name: "carousel",
          title: "Book Carousel",
          type: "object",
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
                  to: [
                    {
                      name: "book",
                      title: "Book",
                      type: "book",
                    },
                  ],
                },
              ],
            },
          ],
          preview: {
            prepare() {
              return {
                title: "Book Carousel",
              };
            },
          },
        },
        {
          name: "newsletterSignUp",
          title: "Newsletter Sign-up",
          type: "object",
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
          ],
          preview: {
            prepare() {
              return {
                title: "Newsletter Sign-up",
              };
            },
          },
        },
      ],
    },
  ],
} as const;
