import type { ElementSchema } from "@/types";
import { SimpleGrid } from "@mantine/core";
import { IconGrid3x3 } from "@tabler/icons-react";

type GridProps = {
  columns: number;
};

export const GridElement: ElementSchema<GridProps> = {
  icon: IconGrid3x3,
  displayName: "Grid",
  defaultProps: {
    columns: 3,
  },
  propsSchema: {
    columns: { type: "number", label: "Columns" },
  },
  allowedChildren: ["title", 'input', "group"],
  render: ({ props, children }) => {
    return (
      <SimpleGrid cols={props.columns}>
        {children}
      </SimpleGrid>
    );
  },
};