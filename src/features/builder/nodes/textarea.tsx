import { Textarea as MantineTextarea } from "@mantine/core";
import type { NodeDefinition } from "../types";

export interface TextareaNodeProps extends Record<string, unknown> {
  label: string;
  placeholder: string;
}

export const TextareaNode: NodeDefinition<TextareaNodeProps> = {
  type: "textarea",
  label: "Textarea",
  defaultProps: {
    label: "Description",
    placeholder: "Enter text..."
  },
  propSchema: {
    label: {
      type: "text",
      label: "Label"
    },
    placeholder: {
      type: "text",
      label: "Placeholder"
    }
  },
  render: (props) => {
    return (
      <MantineTextarea
        label={props.label}
        placeholder={props.placeholder}
        disabled
      />
    );
  }
};
