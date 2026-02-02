import { Box } from "@mantine/core";
import type { NodeDefinition } from "../types";

const ALL_NODE_TYPES = [
  "title",
  "subtitle",
  "paragraph",
  "info-block",
  "input",
  "textarea",
  "date-picker",
  "options-field",
  "select",
  "checkbox",
  "group",
  "header"
];

export interface GroupNodeProps extends Record<string, unknown> {
  label: string;
}

export const GroupNode: NodeDefinition<GroupNodeProps> = {
  type: "group",
  label: "Group",
  defaultProps: {
    label: "Group"
  },
  propSchema: {
    label: {
      type: "text",
      label: "Label"
    }
  },
  allowList: ALL_NODE_TYPES,
  render: (props) => {
    return (
      <Box
        component="div"
        style={{
          border: "1px dashed var(--mantine-color-default-border)",
          borderRadius: 8,
          padding: 12
        }}
      >
        {props.children}
      </Box>
    );
  }
};
