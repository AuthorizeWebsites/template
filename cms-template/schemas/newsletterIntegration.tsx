import React, { RefObject } from "react";
import { setIfMissing } from "part:@sanity/form-builder/patch-event";
import { FormBuilderInput } from "part:@sanity/form-builder";
import { withDocument } from "part:@sanity/form-builder";

class CustomObjectInput extends React.PureComponent {
  firstFieldInput: RefObject<HTMLElement> = React.createRef();

  handleFieldChange = (field, fieldPatchEvent) => {
    const { onChange, type } = this.props as any;

    onChange(
      fieldPatchEvent
        .prefixAll(field.name)
        .prepend(setIfMissing({ _type: type.name }))
    );
  };

  focus() {
    this.firstFieldInput.current.focus();
  }

  render() {
    const { document, type, value, level, focusPath, onFocus, onBlur } = this
      .props as any;
    const { platform } = document;

    return (
      <>
        {type.fields
          .filter((field) => field.name === platform)
          .map((field, i) => (
            <FormBuilderInput
              level={level + 1}
              ref={i === 0 ? this.firstFieldInput : null}
              key={field.name}
              type={field.type}
              value={value && value[field.name]}
              onChange={(patchEvent) =>
                this.handleFieldChange(field, patchEvent)
              }
              path={[field.name]}
              focusPath={focusPath}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          ))}
      </>
    );
  }
}

const ConditionalInput = withDocument(CustomObjectInput);

export default {
  name: "newsletterIntegration",
  title: "Newsletter Integration",
  type: "document",
  fields: [
    {
      name: "platform",
      title: "Platform",
      type: "string",
      options: {
        list: [{ title: "Mailchimp", value: "mailchimp" }],
      },
    },
    {
      name: "config",
      title: "Config",
      type: "object",
      inputComponent: ConditionalInput,
      fields: [
        {
          name: "mailchimp",
          title: "Configuration",
          type: "object",
          fields: [
            {
              name: "apiKey",
              title: "API Key",
              type: "string",
              description: (
                <>
                  You can find direction on how to get your API key{" "}
                  <a
                    href="https://mailchimp.com/help/about-api-keys/"
                    target="_blank"
                    rel="noopener"
                  >
                    here
                  </a>
                  .
                </>
              ),
              validation: (Rule: any) => [
                Rule.required()
                  .min(1)
                  .max(256)
                  .error("All the config fields are required."),
              ],
            },
            {
              name: "audienceId",
              title: "Audience ID",
              type: "string",
              description: (
                <>
                  You can find direction on how to get your audience ID{" "}
                  <a
                    href="https://mailchimp.com/help/find-audience-id/"
                    target="_blank"
                    rel="noopener"
                  >
                    here
                  </a>
                  .
                </>
              ),
              validation: (Rule: any) => [
                Rule.required()
                  .min(1)
                  .max(256)
                  .error("All the config fields are required."),
              ],
            },
          ],
          validation: (Rule: any) => [
            Rule.required().error("All the config fields are required."),
          ],
        },
      ],
    },
  ],
} as const;
