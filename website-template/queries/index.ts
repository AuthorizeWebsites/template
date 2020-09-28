export const groq = String.raw;

export const execQuery = async (query: string) => {
  return await (
    await fetch(
      `https://${
        process.env.SANITY_PROJECT_ID
      }.apicdn.sanity.io/v1/data/query/development?query=${encodeURIComponent(
        query
      )}`
    )
  ).json();
};
