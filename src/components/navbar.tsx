import { Stack, Text } from "@mantine/core";
import type { BuilderElementKey } from "@/elements";
import { useBuilderContext } from "@/hooks/use-builder-context";
import { DraggableElementSchema } from "./draggable-element-schema";

export function Navbar() {
  const { elementSchema } = useBuilderContext();

  return (
    <Stack p="md">
      <Stack gap="xs">
        <Text
          size="sm"
          c="dimmed"
        >
          Elements
        </Text>
        <Stack gap="xs">
          {Object.entries(elementSchema).map(([key, schema]) => (
            <DraggableElementSchema
              key={key}
              type={key as BuilderElementKey}
              schema={schema}
            />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}
