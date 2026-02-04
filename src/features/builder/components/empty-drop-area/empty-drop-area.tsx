import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { Box, Flex, Text } from "@mantine/core";
import invariant from "invariant";
import { useEffect, useRef, useState } from "react";
import { generateUUID } from "@/utils/generate-uuid";
import { useBuilderStore } from "../../hooks/use-builder-store";
import type { ElementInstance, StarterDraggableElementData } from "../../types";
import styles from "./empty-drop-area.module.scss";

export function EmptyDropArea() {
  const handleInsert = useBuilderStore((state) => state.handleInsert);
  const [isOver, setIsOver] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    invariant(elementRef.current, "Element ref not found");

    return dropTargetForElements({
      element: elementRef.current,
      canDrop: ({ source }) => source.data.sourceType === "starter",
      onDragEnter: () => setIsOver(true),
      onDragLeave: () => setIsOver(false),
      onDrop: ({ source }) => {
        console.log("Dropped", event);
        const data = source.data as unknown as StarterDraggableElementData;

        const id = generateUUID();
        const newElement: ElementInstance = {
          id,
          type: data.type,
          props: {
            ...data.schema.defaultProps
          },
          parentId: null,
          position: 0
        };

        handleInsert(newElement);

        setIsOver(false);
      }
    });
  }, []);

  return (
    <Box
      ref={elementRef}
      className={styles.wrapper}
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
