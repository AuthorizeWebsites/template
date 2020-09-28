import React from "react";

export default {
  name: "buyLink",
  title: "Buy Link",
  type: "object",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "link",
      title: "Link",
      type: "url",
    },
  ],
  icon: (props) => {
    return (
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
          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
        />
      </svg>
    );
  },
  preview: {
    select: {
      title: "name",
      subtitle: "link",
    },
  },
} as const;
