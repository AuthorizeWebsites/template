import React from "react";

export default {
  name: "universe",
  title: "Universe",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "tagline",
      title: "Tagline",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "richText",
    },
    {
      name: "books",
      title: "Stand-alone Books",
      type: "array",
      of: [
        {
          name: "book",
          title: "Book",
          type: "reference",
          to: [{ type: "book" }],
        },
      ],
    },
    {
      name: "series",
      title: "Series",
      type: "array",
      of: [
        {
          name: "series",
          title: "Series",
          type: "reference",
          to: [{ type: "series" }],
        },
      ],
    },
    {
      name: "buyLinks",
      title: "Buy Links",
      type: "buyLinks",
    },
    {
      name: "recommendations",
      title: "Recommendations",
      type: "recommendations",
    },
  ],
  icon: () => (
    <svg
      style={{
        color: "rgb(38, 47, 61)",
        height: "1em",
        width: "1em",
      }}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
      />
    </svg>
  ),
} as const;
