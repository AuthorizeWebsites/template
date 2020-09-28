import React from "react";
import S, { listItem } from "@sanity/base/structure-builder";

export default () =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Configuration")
        .child(
          S.document()
            .schemaType("siteConfiguration")
            .documentId("siteConfiguration")
            .title("Site Configuration")
        )
        .icon(() => (
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
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        )),
      S.divider(),
      S.listItem()
        .title("Home Page")
        .child(
          S.document()
            .schemaType("home")
            .documentId("homePage")
            .title("Home Page")
        )
        .icon(() => (
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        )),
      S.listItem()
        .title("About Page")
        .child(
          S.document()
            .schemaType("about")
            .documentId("aboutPage")
            .title("About Page")
        )
        .icon(() => (
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        )),

      S.divider(),
      ...S.documentTypeListItems()
        .filter(
          (listItem) =>
            !["siteConfiguration", "about", "home"].includes(listItem.getId())
        )
        .map((listItem) => {
          return listItem.title(
            listItem.getTitle().slice(-1) === "s"
              ? listItem.getTitle()
              : listItem.getTitle() + "s"
          );
        }),
    ]);
