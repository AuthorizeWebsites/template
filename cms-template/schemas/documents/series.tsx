import React from "react";

export default {
  name: "series",
  title: "Series",
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
      title: "Books",
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
        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
      />
    </svg>
  ),
} as const;
