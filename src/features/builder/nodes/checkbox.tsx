import { Checkbox } from "@mantine/core";
import type { NodeDefinition } from "../types";

export interface CheckboxNodeProps extends Record<string, unknown> {
  label: string;
  checked: boolean;
}

export const CheckboxNode: NodeDefinition<CheckboxNodeProps> = {
  type: "checkbox",
  label: "Checkbox",
  defaultProps: {
    label: "Accept terms",
    checked: false
  },
  propSchema: {
    label: {
      type: "text",
      label: "Label"
    },
    checked: {
      type: "checkbox",
      label: "Checked by default"
    }
  },
  render: (props) => {
    return (
      <Checkbox
        label={props.label}
        checked={props.checked}
        disabled
      />
    );
  }
};
