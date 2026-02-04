import { Textarea } from "@mantine/core";
import { IconForms } from "@tabler/icons-react";
import type { ElementSchema } from "../types";

export interface EditorProps {
  label: string;
  placeholder: string;
  content: string;
}

export const EditorElement: ElementSchema<EditorProps> = {
  displayName: "Editor",
  icon: IconForms,
  defaultProps: {
    label: "Editor",
    placeholder: "Editor placeholder",
    content: "Editor content"
  },
  propsSchema: {
    label: {
      type: "input",
      label: "Label",
    },
    placeholder: {
      type: "input",
      label: "Placeholder",
    },
    content: {
       type: "input",
       label: "Content",
    }
  },
  render({ id, props }) {
    return (
      <Textarea
        id={id}
        label={props.label}
        placeholder={props.placeholder}
        disabled
      />
    );
  }
};
