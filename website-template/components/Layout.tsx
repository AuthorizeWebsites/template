import { Component, FC, ReactElement } from "react";
import { SiteConfiguration } from "../@types/sanity";
import { getSiteConfiguration } from "../lib/sanity";
import { Fallbackable } from "./Fallbackable";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function Layout({
  header,
  content,
  footer,
}: {
  header: ReactElement;
  content: ReactElement;
  footer: ReactElement;
}) {
  return (
    <div className="relative flex flex-col min-h-full">
      <header className="sticky top-0 z-30">{header}</header>
      <section>{content}</section>
      <div className="flex-1" />
      <footer>{footer}</footer>
    </div>
  );
}

export function withDefaultLayout<P>(
  Page: FC<P>
): FC<{ siteConfiguration: SiteConfiguration } & P> {
  return (props) => {
    return (
      <Fallbackable
        render={() => (
          <Layout
            header={
              <Header
                authorName={props.siteConfiguration.authorName ?? "YOUR NAME"}
              />
            }
            content={<Page {...props} />}
            footer={
              <Footer
                authorName={props.siteConfiguration.authorName ?? "YOUR NAME"}
              />
            }
          />
        )}
      />
    );
  };
}

export function withDefaultLayoutStaticProps<P, T = number>(
  f: (
    _: any
  ) => Promise<{
    props: P;
    revalidate: T;
  }>
): (_: any) => Promise<{ props: P; revalidate: T }> {
  return async (...args) => {
    const { props: initialProps, revalidate } = await f(...args);

    return {
      props: {
        ...initialProps,
        siteConfiguration: await getSiteConfiguration(),
      },
      revalidate,
    };
  };
}
