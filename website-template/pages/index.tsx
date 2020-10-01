import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Layout } from "../components/Layout";
import { BookCarousel } from "../components/BookCarousel";
import { BioView } from "../components/Bio";
import { NewsletterSignUp as NewsletterSignUpComp } from "../components/NewsletterSignUp";
import { execQuery, getSiteConfiguration, groq } from "../lib/sanity";
import { InferGetStaticPropsType } from "next";
import {
  Home,
  Bio,
  isBio,
  Carousel,
  isCarousel,
  NewsletterSignUp,
  isNewsletterSignUp,
  Book,
  Override,
} from "../@types/sanity";
import { ImageV2 } from "../components/ImageV2";

export default function IndexPage({
  siteConfiguration,
  homePage,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      header={
        <Header authorName={siteConfiguration.authorName ?? "YOUR NAME"} />
      }
      content={
        <div>
          {homePage.hero?.show && (
            <div className="relative flex items-center justify-center px-4 py-64 overflow-hidden bg-black">
              {!!homePage.hero.background?.asset && (
                <div className="absolute inset-0 flex items-center justify-center opacity-50">
                  <ImageV2
                    metadata={homePage.hero.background.asset.metadata}
                    url={homePage.hero.background.asset.url}
                    independentDimension="cover"
                  />
                </div>
              )}
              <div className="relative z-10 flex flex-col items-center justify-center max-w-7xl">
                {!!homePage.hero.primaryText && (
                  <h1 className="text-4xl font-bold leading-tight tracking-wider text-white">
                    {homePage.hero.primaryText}
                  </h1>
                )}
                {!!homePage.hero.secondaryText && (
                  <h2 className="text-2xl font-light leading-tight tracking-widest text-gray-300">
                    {homePage.hero.secondaryText}
                  </h2>
                )}
              </div>
            </div>
          )}
          <div className="px-4 pt-8">
            <div className="mx-auto space-y-8 max-w-7xl">
              {homePage.components?.map((component, index) => {
                if (isBio(component))
                  return (
                    <BioView key={index} content={component.content ?? []} />
                  );

                if (isNewsletterSignUp(component))
                  return (
                    <NewsletterSignUpComp
                      key={index}
                      primaryText={component.primaryText}
                      secondaryText={component.secondaryText}
                    />
                  );

                if (isCarousel(component))
                  return (
                    <BookCarousel key={index} books={component.books ?? []} />
                  );
              })}
            </div>
          </div>
        </div>
      }
      footer={
        <Footer authorName={siteConfiguration.authorName ?? "YOUR NAME"} />
      }
    />
  );
}

export const getStaticProps = async () => {
  return {
    props: {
      siteConfiguration: await getSiteConfiguration(),
      homePage: await execQuery<
        Override<
          Home,
          {
            components?: (
              | Bio
              | Override<Carousel, { books?: Book[] }>
              | NewsletterSignUp
            )[];
          }
        >
      >(groq`
        *[_id == "homePage"][0]{
          ...,
          hero{
            ...,
            background{
              ...,
              asset->
            }
          },
          components[]{
            ...,
            books[]->{
              ...,
              cover{
                ...,
                asset->
              }
            }
          }
        }
      `),
    },
    revalidate: 1,
  };
};
