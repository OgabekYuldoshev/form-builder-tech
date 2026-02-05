// element-drop-zone/element-drop-zone.tsx
import { Flex } from "@mantine/core";
import { memo } from "react";
import { useShallow } from "zustand/shallow";
import { useBuilderStore } from "../hooks/use-builder-store";
import { ElementNode } from "./element-node";
import { EmptyDropArea } from "./empty-drop-area";

interface ElementDropZoneProps {
  parentId: string | null;
}

function ElementDropZoneComponent({ parentId }: ElementDropZoneProps) {
  const childIds = useBuilderStore(
    useShallow((state) => getChildIds(state.rootIds, state.groupIds, parentId))
  );

  if (childIds.length === 0) {
    return <EmptyDropArea parentId={parentId} />;
  }

  return (
    <Flex
      direction="column"
      gap="xs"
      component="ul"
      style={{ listStyle: "none", margin: 0, padding: 0 }}
    >
      {childIds.map((childId) => (
        <ElementNode
          key={childId}
          elementId={childId}
        />
      ))}
    </Flex>
  );
}

function getChildIds(
  rootIds: string[],
  groupIds: Record<string, string[]>,
  parentId: string | null
): string[] {
  return parentId === null ? rootIds : (groupIds[parentId] ?? []);
}

export const ElementDropZone = memo(ElementDropZoneComponent);
