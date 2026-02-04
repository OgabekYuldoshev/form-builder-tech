import { IconForms } from "@tabler/icons-react";
import { Editor } from "@/components/editor";
import type { ElementSchema } from "../types";

export interface EditorElementProps {
  label: string;
  placeholder: string;
  content: string;
}

export const EditorElement: ElementSchema<EditorElementProps> = {
  displayName: "Editor",
  icon: IconForms,
  defaultProps: {
    label: "Editor",
    placeholder: "Editor placeholder",
    content: "",
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
      type: "textarea",
      label: "Content",
    }
  },
  render({ id, props }) {
    return (
      <Editor
        id={id}
        label={props.label}
        placeholder={props.placeholder}
        value={props.content}
        disabled
      />
    );
  },
};
