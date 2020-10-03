import { SiteConfiguration } from "../@types/sanity";

export const groq = String.raw;

export async function execQuery<T>(query: string): Promise<T> {
  // console.log(
  //   `https://${process.env.SANITY_PROJECT_ID}.apicdn.sanity.io/v1/data/query/${
  //     process.env.SANITY_DATASET_NAME
  //   }?query=${encodeURIComponent(query)}`
  // );

  // console.log(
  //   await fetch(
  //     `https://${
  //       process.env.SANITY_PROJECT_ID
  //     }.apicdn.sanity.io/v1/data/query/${
  //       process.env.SANITY_DATASET_NAME
  //     }?query=${encodeURIComponent(query)}`
  //   )
  // );

  console.log(
    await (
      await fetch(
        `https://${
          process.env.SANITY_PROJECT_ID
        }.apicdn.sanity.io/v1/data/query/${
          process.env.SANITY_DATASET_NAME
        }?query=${encodeURIComponent(query)}`
      )
    ).json()
  );

  return (
    await (
      await fetch(
        `https://${
          process.env.SANITY_PROJECT_ID
        }.apicdn.sanity.io/v1/data/query/${
          process.env.SANITY_DATASET_NAME
        }?query=${encodeURIComponent(query)}`
      )
    ).json()
  ).result;
}

export async function getSiteConfiguration(): Promise<SiteConfiguration> {
  return await execQuery(groq`*[_id == "siteConfiguration"][0]`);
}
