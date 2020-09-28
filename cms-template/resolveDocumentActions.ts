import defaultResolve, {
  DeleteAction,
  UnpublishAction,
  DuplicateAction,
} from "part:@sanity/base/document-actions";

export default function resolveDocumentActions(props: {
  type: string;
  published: any;
  liveEdit: boolean;
  draft: any;
  id: string;
}) {
  return [
    ...defaultResolve(props).filter((Action) => {
      return !(
        [DeleteAction, UnpublishAction, DuplicateAction].includes(Action) &&
        [
          "homePageDocumentId",
          "aboutMePageDocumentId",
          "siteConfigurationDocumentId",
          "newsletterIntegrationDocumentId",
          "affiliateCodesIntegrationDocumentId",
        ].includes(props.id)
      );
    }),
  ];
}
