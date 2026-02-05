import { Title, type TitleOrder } from "@mantine/core";
import { IconHeading } from "@tabler/icons-react";
import type { ElementSchema } from "@/types";

interface TitleProps {
  text: string;
  order: TitleOrder;
}

export const TitleElement: ElementSchema<TitleProps> = {
  icon: IconHeading,
  displayName: "Title",
  defaultProps: {
    text: "This is a title",
    order: 1
  },
  propsSchema: {
    text: {
      type: "text",
      label: "Text"
    },
    order: {
      type: "select",
      label: "Order",
      options: [
        { label: "H1", value: "1" },
        { label: "H2", value: "2" },
        { label: "H3", value: "3" },
        { label: "H4", value: "4" },
        { label: "H5", value: "5" },
        { label: "H6", value: "6" }
      ]
    }
  },
  render: ({ props }) => <Title order={props.order}>{props.text}</Title>
};
