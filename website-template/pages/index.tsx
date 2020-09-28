import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Image } from "../components/Image";
import { Layout } from "../components/Layout";
import { execQuery, groq } from "../queries";
import { BookCarousel } from "../components/BookCarousel";
import { Bio } from "../components/Bio";
import { NewsletterSignUp } from "../components/NewsletterSignUp";

export default function IndexPage({ siteConfiguration, homePage }: any) {
  return (
    <Layout
      header={<Header siteConfiguration={siteConfiguration} />}
      content={
        <div>
          {homePage.hero.show && (
            <div className="relative flex items-center justify-center px-4 py-64 overflow-hidden bg-black">
              {homePage.hero?.background?.asset && (
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden transform scale-105 opacity-50 absoute">
                  <Image
                    {...homePage.hero.background.asset}
                    breakPointScalar={0.25}
                    cover
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
              {homePage.components.map((component) => {
                switch (component._type) {
                  case "carousel":
                    return (
                      <BookCarousel
                        key={component._id}
                        books={component.books}
                      />
                    );
                  case "bio":
                    return (
                      <Bio key={component._id} content={component.content} />
                    );
                  case "newsletterSignUp":
                    return (
                      <NewsletterSignUp
                        key={component._id}
                        primaryText={component.primaryText}
                        secondaryText={component.secondaryText}
                      />
                    );
                }
              })}
            </div>
          </div>
        </div>
      }
      footer={<Footer siteConfiguration={siteConfiguration} />}
    />
  );
}

export const getStaticProps = async () => {
  return {
    props: {
      siteConfiguration: (
        await execQuery(groq`
          * | [
            _id == "siteConfiguration"
          ] | [
            0
          ]
        `)
      ).result,
      homePage: (
        await execQuery(groq`
          * | [
            _id == "homePage"
          ] | [
            0
          ] | {
            ...,
            "hero": hero{
              ...,
              "background": background{
                ...,
                asset->
              }
            },
            "components": components[]{
              ...,
              "books": books[]->{
                ...,
                "cover": cover{
                  ...,
                  asset->
                }
              }
            }
          }
        `)
      ).result,
    },
  };
};
