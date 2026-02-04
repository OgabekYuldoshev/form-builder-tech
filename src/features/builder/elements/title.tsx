import { Title } from "@mantine/core";
import { IconHeading } from "@tabler/icons-react";
import type { ElementSchema } from "../types";

interface TitleProps {
  content: string;
}

export const TitleElement: ElementSchema<TitleProps> = {
  displayName: "Title",
  icon: IconHeading,
  defaultProps: {
    content: "Title"
  },
  propsSchema: {
    content: {
      type: "input",
      placeholder: "Title"
    }
  },
  render({ id, props }) {
    return (
      <Title
        id={id}
        order={1}
      >
        {props.content}
      </Title>
    );
  }
};
