import { Select } from "@mantine/core";
import type { NodeDefinition } from "../types";

export interface SelectNodeProps extends Record<string, unknown> {
  label: string;
  value: string;
}

export const SelectNode: NodeDefinition<SelectNodeProps> = {
  type: "select",
  label: "Select",
  defaultProps: {
    label: "Select",
    value: ""
  },
  propSchema: {
    label: {
      type: "text",
      label: "Label"
    },
    value: {
      type: "select",
      label: "Default value",
      options: [
        { value: "a", label: "Option A" },
        { value: "b", label: "Option B" },
        { value: "c", label: "Option C" }
      ]
    }
  },
  render: (props) => {
    return (
      <Select
        label={props.label}
        data={[
          { value: "a", label: "Option A" },
          { value: "b", label: "Option B" },
          { value: "c", label: "Option C" }
        ]}
        value={props.value}
        disabled
      />
    );
  }
};
