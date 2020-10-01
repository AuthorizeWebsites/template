import { SiteConfiguration } from "../@types/sanity";

export const groq = String.raw;

export async function execQuery<T>(query: string): Promise<T> {
  return await fetch(
    `https://${process.env.SANITY_PROJECT_ID}.apicdn.sanity.io/v1/data/query/${
      process.env.SANITY_DATASET_NAME
    }?query=${encodeURIComponent(query)}`
  )
    .then((r) => r.json())
    .then((j) => j.result)
    .then((result) => {
      console.info(result);
      return result;
    });

  //   await (

  //     await fetch(
  //       `https://${
  //         process.env.SANITY_PROJECT_ID
  //       }.apicdn.sanity.io/v1/data/query/${
  //         process.env.SANITY_DATASET_NAME
  //       }?query=${encodeURIComponent(query)}`
  //     )
  //   ).json()
  // ).result;
}

export async function getSiteConfiguration(): Promise<SiteConfiguration> {
  return await execQuery(groq`*[_id == "siteConfiguration"][0]`);
}
