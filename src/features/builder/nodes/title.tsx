import { Title } from "@mantine/core";
import type { NodeDefinition } from "../types";

export interface TitleNodeProps extends Record<string, unknown> {
  title: string;
}

export const TitleNode: NodeDefinition<TitleNodeProps> = {
  type: "title",
  label: "Title",
  defaultProps: {
    title: "Title"
  },
  propSchema: {
    title: {
      type: "text",
      label: "Title"
    }
  },
  render: (props) => {
    return <Title order={1}>{props.title}</Title>;
  }
};
