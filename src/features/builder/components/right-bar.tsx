import { Stack, Text } from "@mantine/core";
import { useBuilderStore } from "../hooks/use-builder-store";
import { ElementForm } from "./element-form";

export function RightBar() {
  const selectedElementId = useBuilderStore((state) => state.selectedElementId);

  if (!selectedElementId) {
    return (
      <Stack
        h="100%"
        justify="center"
        align="center"
      >
        <Text
          size="sm"
          color="dimmed"
        >
          No element selected
        </Text>
      </Stack>
    );
  }

  return (
    <Stack>
      <ElementForm elementId={selectedElementId} />
    </Stack>
  );
}
