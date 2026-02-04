import { TextInput } from "@mantine/core";
import { IconInputSearch } from "@tabler/icons-react";
import type { ElementSchema } from "../types";

interface InputProps {
  label: string;
  placeholder: string;
}

export const InputElement: ElementSchema<InputProps> = {
  displayName: "Input",
  icon: IconInputSearch,
  defaultProps: {
    label: "Input",
    placeholder: "Input"
  },
  propsSchema: {
    label: {
      type: "input",
      label: "Label"
    },
    placeholder: {
      type: "input",
      label: "Placeholder"
    }
  },
  render({ id, props }) {
    return (
      <TextInput
        id={id}
        label={props.label}
        placeholder={props.placeholder}
        disabled
      />
    );
  }
};
