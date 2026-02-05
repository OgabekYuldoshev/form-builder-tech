import { TextInput } from "@mantine/core";
import { IconInputSearch } from "@tabler/icons-react";
import type { ElementSchema } from "@/types";

interface InputElementProps {
  label: string;
  placeholder: string;
}

export const InputElement: ElementSchema<InputElementProps> = {
  icon: IconInputSearch,
  displayName: "Input",
  defaultProps: {
    label: "Input",
    placeholder: "Input"
  },
  propsSchema: {
    label: {
      type: "text",
      label: "Label"
    },
    placeholder: {
      type: "text",
      label: "Placeholder"
    }
  },
  render: ({ id, props }) => (
    <TextInput
      key={id}
      label={props.label}
      placeholder={props.placeholder}
      disabled
    />
  )
};
