import React from "react";

function toPlainText(blocks = []) {
  return blocks
    .map((block) => {
      if (block._type !== "block" || !block.children) {
        return "";
      }
      return block.children.map((child) => child.text).join("");
    })
    .join("\n\n");
}

export default {
  name: "bioSection",
  title: "Bio Section",
  type: "object",
  icon: false,
  fields: [
    {
      name: "header",
      title: "Header",
      type: "string",
      validation: (Rule: any) => [
        Rule.required().warning(
          <>
            You don't <strong>need</strong> a header, but the section is
            designed to show one, and it will look better if you add one.
          </>
        ),
      ],
    },
    {
      name: "blurb",
      title: "Blurb",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule: any) => [
        Rule.required().error(
          <>
            What's the point of a biography section if it doesn't have a bio!?
          </>
        ),
      ],
    },
    {
      name: "showReadMoreButton",
      title: 'Show the "Read More" button?',
      type: "boolean",
      description:
        'When on, a "Read More" button, linking to your About Me page, will be shown at the bottom of the section.',
      validation: (Rule: any) => [Rule.required()],
    },
  ],
  preview: {
    select: {
      title: "header",
      subtitle: "blurb",
    },
    prepare(selection) {
      if (selection.subtitle === undefined) return selection;
      return {
        ...selection,
        subtitle: toPlainText(selection.subtitle),
      };
    },
  },
} as const;
