export default {
  name: "affiliateCodesIntegration",
  title: "Affiliate Codes Integration",
  type: "document",
  fields: [
    {
      name: "affiliateCodes",
      title: "Affiliate Links",
      type: "array",
      of: [
        {
          name: "affiliateCode",
          title: "Affiliate Code",
          type: "object",
          icon: false,
          fields: [
            {
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [{ title: "Amazon", value: "amazon" }],
              },
              validation: (Rule: any) => [
                Rule.required().custom((platform: string, context: any) => {
                  if (platform === undefined) return true;

                  return context.document.affiliateCodes.filter(
                    (affiliateCode) => affiliateCode.platform === platform
                  ).length <= 1
                    ? true
                    : `You can only have one code for each platform. This platform has more than one code associated with it.`;
                }),
              ],
            },
            {
              name: "code",
              title: "Code",
              type: "string",
              validation: (Rule: any) => [Rule.required().min(1).max(100)],
            },
          ],
          preview: {
            select: { title: "platform", subtitle: "code" },
          },
        },
      ],
    },
  ],
} as const;
