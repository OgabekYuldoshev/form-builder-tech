import { Stack, Text } from "@mantine/core";
import { useMemo } from "react";
import type { BuilderElementTypes } from "../elements";
import { useBuilderContext } from "../hooks/use-builder-context";
import { DraggableElement } from "./draggable-element/draggable-element";

export function LeftBar() {
  const { elements } = useBuilderContext();
  const items = useMemo(() => Object.entries(elements), [elements]);

  return (
    <Stack>
      <Text
        fw={700}
        size="sm"
        c="dimmed"
      >
        Elementlar
      </Text>
      <Stack gap="xs">
        {items.map(([type, schema]) => (
          <DraggableElement
            key={type}
            type={type as BuilderElementTypes}
            schema={schema}
          />
        ))}
      </Stack>
    </Stack>
  );
}
