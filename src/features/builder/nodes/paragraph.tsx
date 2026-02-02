import { Text } from "@mantine/core";
import type { NodeDefinition } from "../types";

export interface ParagraphNodeProps extends Record<string, unknown> {
  content: string;
}

export const ParagraphNode: NodeDefinition<ParagraphNodeProps> = {
  type: "paragraph",
  label: "Paragraph",
  defaultProps: {
    content: "Paragraph text"
  },
  propSchema: {
    content: {
      type: "text",
      label: "Content"
    }
  },
  render: (props) => {
    return (
      <Text
        size="sm"
        c="dimmed"
      >
        {props.content || ""}
      </Text>
    );
  }
};
