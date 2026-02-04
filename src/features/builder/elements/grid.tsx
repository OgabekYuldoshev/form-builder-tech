import { IconLayout2 } from "@tabler/icons-react";
import type { ElementSchema } from "../types";
import { SimpleGrid } from "@mantine/core";

interface GridElementProps {
    cols: number;
}

export const GridElement: ElementSchema<GridElementProps> = {
  displayName: "Grid",
  icon: IconLayout2,
  defaultProps: {
    cols: 1,
  },
  allowedChildren: ["title", 'editor'],
  propsSchema: {
    cols: {
      type: "number",
      label: "Columns",
    },
  },
  render({ props, children }) {
    return <SimpleGrid cols={props.cols}>{children}</SimpleGrid>;
  },
};