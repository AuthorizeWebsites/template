export default {
  name: "recommendations",
  title: "Recommendations",
  type: "array",
  of: [
    {
      name: "recommendation",
      title: "Recommendation",
      type: "recommendation",
    },
  ],
} as const;
