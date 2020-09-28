import T from "@sanity/base/initial-value-template-builder";

export default [
  ...T.defaults(),
  T.template({
    id: "authorBaseValueTemplateId",
    title: "Default Author",
    schemaType: "author",
    value: {
      linkToAboutMe: false,
    },
  }),
];
