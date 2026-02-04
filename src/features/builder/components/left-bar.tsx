import { Stack, Text } from "@mantine/core";
import { useMemo } from "react";
import type { BuilderElementSchemaTypes } from "../elements";
import { useBuilderContext } from "../hooks/use-builder-context";
import { DraggableElement } from "./draggable-element/draggable-element";

export function LeftBar() {
  const { elementSchemas } = useBuilderContext();
  const items = useMemo(() => Object.entries(elementSchemas), [elementSchemas]);

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
            type={type as BuilderElementSchemaTypes}
            schema={schema}
          />
        ))}
      </Stack>
    </Stack>
  );
}
