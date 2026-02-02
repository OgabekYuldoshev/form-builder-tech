import { TextInput } from "@mantine/core";
import type { NodeDefinition } from "../types";

export interface InputNodeProps extends Record<string, unknown> {
  label: string;
}

export const InputNode: NodeDefinition<InputNodeProps> = {
  type: "input",
  label: "Input",
  defaultProps: {
    label: "Input"
  },
  propSchema: {
    label: {
      type: "text",
      label: "Label"
    }
  },
  render: (props) => {
    return (
      <TextInput
        label={props.label}
        disabled
      />
    );
  }
};
