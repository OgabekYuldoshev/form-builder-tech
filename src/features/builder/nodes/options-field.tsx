import { Select } from "@mantine/core";
import type { NodeDefinition, SelectOption } from "../types";

const defaultOptions: SelectOption[] = [
  { value: "1", label: "Variant 1" },
  { value: "2", label: "Variant 2" }
];

export interface OptionsFieldNodeProps extends Record<string, unknown> {
  label: string;
  options: SelectOption[];
  defaultValue: string;
}

export const OptionsFieldNode: NodeDefinition<OptionsFieldNodeProps> = {
  type: "options-field",
  label: "Options field",
  defaultProps: {
    label: "Tanlang",
    options: defaultOptions,
    defaultValue: ""
  },
  propSchema: {
    label: {
      type: "text",
      label: "Label"
    },
    options: {
      type: "optionsList",
      label: "Optionlar"
    },
    defaultValue: {
      type: "text",
      label: "Default qiymat"
    }
  },
  render: (props) => {
    const options =
      Array.isArray(props.options) && props.options.length > 0 ? props.options : defaultOptions;
    return (
      <Select
        label={props.label}
        data={options}
        value={props.defaultValue || null}
        disabled
      />
    );
  }
};
