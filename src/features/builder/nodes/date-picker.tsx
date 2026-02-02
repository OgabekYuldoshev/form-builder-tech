import { TextInput } from "@mantine/core";
import type { NodeDefinition } from "../types";

export interface DatePickerNodeProps extends Record<string, unknown> {
  label: string;
  value: string;
}

export const DatePickerNode: NodeDefinition<DatePickerNodeProps> = {
  type: "date-picker",
  label: "Date picker",
  defaultProps: {
    label: "Sana",
    value: ""
  },
  propSchema: {
    label: {
      type: "text",
      label: "Label"
    },
    value: {
      type: "date",
      label: "Default qiymat"
    }
  },
  render: (props) => {
    return (
      <TextInput
        label={props.label}
        type="date"
        value={props.value || ""}
        disabled
      />
    );
  }
};
