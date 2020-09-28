import React from "react";

export default {
  name: "aboutMePage",
  title: "About Me Page",
  type: "document",
  fields: [
    {
      name: "headshot",
      title: "Headshot",
      type: "imageWithAlt",
    },
    {
      name: "header",
      title: "Header",
      type: "string",
    },
    {
      name: "blurb",
      title: "Blurb",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule: any) => [
        Rule.required().warning(
          <>
            You <em>probably</em> want something here.
          </>
        ),
      ],
    },
  ],
} as const;
