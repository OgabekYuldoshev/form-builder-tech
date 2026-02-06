import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { Box, Flex, Text } from "@mantine/core";
import invariant from "invariant";
import { useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/shallow";
import { useBuilderStore } from "@/hooks/use-builder-store";
import type { ElementNode } from "@/types";
import type { DraggableElementSchemaData } from "@/types/draggable-data";
import { generateUUID } from "@/utils/generate-uuid";
import { DraggableElementNode } from "../draggable-element-node";
import classes from "./element-dropzone.module.scss";

interface ElementDropzoneProps {
  parentId: string | null;
}

function ElementDropzone({ parentId }: ElementDropzoneProps) {
  const childIds = useBuilderStore(
    useShallow((state) => getChildIds(state.rootIds, state.containers, parentId))
  );

  if (childIds.length === 0) {
    return <EmptyDropzone parentId={parentId} />;
  }

  return childIds.map((id) => (
    <DraggableElementNode
      key={id}
      elementNodeId={id}
    />
  ));
}

function EmptyDropzone({ parentId }: { parentId: string | null }) {
  const elementRef = useRef<HTMLDivElement>(null);
  const handleInsert = useBuilderStore((state) => state.handleInsert);
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    invariant(elementRef.current, "Element ref not found");

    return dropTargetForElements({
      element: elementRef.current,
      canDrop: ({ source }) => source.data.sourceType === "schema",
      onDragEnter: () => setIsOver(true),
      onDragLeave: () => setIsOver(false),
      onDrop: ({ source }) => {
        console.log("Dropped", event);
        const data = source.data as unknown as DraggableElementSchemaData;

        const id = generateUUID();
        const newElementNode: ElementNode = {
          id,
          type: data.type,
          props: {
            ...data.schema.defaultProps
          },
          parentId,
          position: 0
        };

        handleInsert(newElementNode);

        setIsOver(false);
      }
    });
  }, [parentId]);

  return (
    <Box
      ref={elementRef}
      className={classes.emptyDropzone}
      p="md"
      data-drag-over={isOver}
    >
      <Flex
        align="center"
        justify="center"
        mih="200"
      >
        <Text
          c="dimmed"
          size="sm"
        >
          Drag and drop an element here
        </Text>
      </Flex>
    </Box>
  );
}

function getChildIds(
  rootIds: string[],
  containers: Record<string, string[]>,
  parentId: string | null
): string[] {
  return parentId === null ? rootIds : (containers[parentId] ?? []);
}

export { ElementDropzone };
