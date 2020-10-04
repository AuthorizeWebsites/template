import { assert } from "console";
import { execQuery, groq } from "./sanity";

export function withSafeIdParam<R, Rest>(
  f: ({ params }: { params: { id: string } & Rest }) => Promise<R>
): ({ params }: { params: { id?: any } & Rest }) => Promise<R> {
  return async ({ params }) => {
    const id = params.id;
    assert(typeof id === "string");
    return await f({ params: { ...params, id } });
  };
}

export function withDefaultRevalidate<P, T>(
  f: ({ params }: { params: T }) => Promise<{ props: P }>
): ({ params }: { params: T }) => Promise<{ props: P; revalidate: 1 }> {
  return async ({ params }) => ({
    props: (await f({ params })).props,
    revalidate: 1,
  });
}

export const getStaticPathsFromIds = (
  type: "book" | "series" | "universe" | "genre" | "post"
) => async () => ({
  paths: (
    await execQuery<string[]>(groq`*[_type == "${type}"]._id`)
  ).map((id: string) => ({ params: { id } })),
  fallback: true,
});
