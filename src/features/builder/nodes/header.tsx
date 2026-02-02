import { Box } from "@mantine/core";
import type { NodeDefinition } from "../types";

export interface HeaderNodeProps extends Record<string, unknown> {
  label: string;
}

export const HeaderNode: NodeDefinition<HeaderNodeProps> = {
  type: "header",
  label: "Header",
  defaultProps: {
    label: "Header"
  },
  propSchema: {
    label: {
      type: "text",
      label: "Label"
    }
  },
  allowList: ["title", "subtitle"],
  render: (props) => {
    return (
      <Box
        component="header"
        style={{ border: "1px solid var(--mantine-color-blue-3)", borderRadius: 8, padding: 12 }}
      >
        {props.children}
      </Box>
    );
  }
};
