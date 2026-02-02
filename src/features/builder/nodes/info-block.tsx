import { Alert, Text } from "@mantine/core";
import type { NodeDefinition } from "../types";

export interface InfoBlockNodeProps extends Record<string, unknown> {
  title: string;
  content: string;
}

export const InfoBlockNode: NodeDefinition<InfoBlockNodeProps> = {
  type: "info-block",
  label: "Info block",
  defaultProps: {
    title: "Info",
    content: "Add your information text here."
  },
  propSchema: {
    title: {
      type: "text",
      label: "Title"
    },
    content: {
      type: "text",
      label: "Content"
    }
  },
  render: (props) => {
    return (
      <Alert
        title={props.title || "Info"}
        variant="light"
      >
        <Text size="sm">{props.content || ""}</Text>
      </Alert>
    );
  }
};
