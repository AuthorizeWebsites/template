import { NextApiRequest, NextApiResponse } from "next";
import { execQuery, groq } from "../../lib/sanity";

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.json(
    await execQuery<any>(groq`
        * | [
            _type in ["book", "series", "universe", "genre", "post"]
        ] | [
            [name, title, tagline] match [${(req.query.str as string)
              ?.split(" ")
              ?.map((term: string) => `"*${term}*"`)
              ?.join(", ")}]
        ] | [
            0 .. 7
        ]
    `)
  );
}
