import { Title } from "@mantine/core";
import type { NodeDefinition } from "../types";

export interface SubtitleNodeProps extends Record<string, unknown> {
  text: string;
}

export const SubtitleNode: NodeDefinition<SubtitleNodeProps> = {
  type: "subtitle",
  label: "Subtitle",
  defaultProps: {
    text: "Subtitle"
  },
  propSchema: {
    text: {
      type: "text",
      label: "Text"
    }
  },
  render: (props) => {
    return <Title order={3}>{props.text}</Title>;
  }
};
