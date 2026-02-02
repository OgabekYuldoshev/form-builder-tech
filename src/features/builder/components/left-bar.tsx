import { Stack, Text } from "@mantine/core";
import { useBuilderStore } from "../hooks/use-builder-store";
import { DraggableNode } from "./draggable-node";

export function LeftBar() {
  const definitions = useBuilderStore((state) => state.definitions);
  const nodesList = Object.values(definitions);

  return (
    <Stack>
      <Text
        color="dimmed"
        fw={600}
        size="sm"
      >
        Nodelar
      </Text>
      <Stack gap={2}>
        {nodesList.map((node) => (
          <DraggableNode
            key={node.type}
            node={node}
          />
        ))}
      </Stack>
    </Stack>
  );
}
