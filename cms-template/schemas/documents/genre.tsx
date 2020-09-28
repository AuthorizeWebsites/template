import React from "react";

export default {
  name: "genre",
  title: "Genre",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
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
      name: "universes",
      title: "Universes",
      type: "array",
      of: [
        {
          name: "universe",
          title: "Universe",
          type: "reference",
          to: [{ type: "universe" }],
        },
      ],
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
        d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
      />
    </svg>
  ),
} as const;
