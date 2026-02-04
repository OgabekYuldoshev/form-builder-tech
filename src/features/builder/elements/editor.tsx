import { IconForms } from "@tabler/icons-react";
import { Editor } from "@/components/editor";
import type { ElementSchema } from "../types";

export interface EditorElementProps {
  label: string;
  placeholder: string;
  content: string;
  /** Select dan "true" | "false" keladi */
  disabled: boolean | string;
}

export const EditorElement: ElementSchema<EditorElementProps> = {
  displayName: "Editor",
  icon: IconForms,
  defaultProps: {
    label: "Editor",
    placeholder: "Editor placeholder",
    content: "",
    disabled: "false",
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
    },
    disabled: {
      type: "select",
      label: "Disabled",
      options: [
        { value: "false", label: "Yo'q" },
        { value: "true", label: "Ha" },
      ],
    },
  },
  render({ id, props }) {
    const disabled =
      props.disabled === true || props.disabled === "true";
    return (
      <Editor
        id={id}
        label={props.label}
        placeholder={props.placeholder}
        value={props.content}
        disabled={disabled}
      />
    );
  },
};
