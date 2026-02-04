import { IconForms } from "@tabler/icons-react";
import type { ElementSchema } from "../types";
import { Textarea } from "@mantine/core";

export interface TextareaProps {
 label: string;
 placeholder: string;
 rows: number
}

export const TextareaElement: ElementSchema<TextareaProps> = {
  displayName: "Textarea",
  icon: IconForms,
  defaultProps: {
    label: "Textarea",
    placeholder: "Textarea placeholder",
    rows: 4
  },
  propsSchema:{
    label: {
      type: "input",
      placeholder: "Label"
    },
    placeholder: {
      type: "input",
      placeholder: "Placeholder"
    },
    rows: {
      type: "select",
      options: [
        { label: "Rows 1", value: "1" },
        { label: "Rows 2", value: "2" },
        { label: "Rows 3", value: "3" },
        { label: "Rows 4", value: "4" },
        { label: "Rows 5", value: "5" },
        { label: "Rows 6", value: "6" },
        { label: "Rows 7", value: "7" },
        { label: "Rows 8", value: "8" },
      ]
    }
  },
  render({ id, props }) {
    return (
      <Textarea
        id={id}
        label={props.label}
        placeholder={props.placeholder}
        rows={props.rows}
        disabled
      />
    );
  }
};