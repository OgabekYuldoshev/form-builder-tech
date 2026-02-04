import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { Box, Flex, Text } from "@mantine/core";
import invariant from "invariant";
import { useEffect, useRef, useState } from "react";
import styles from "./empty-drop-area.module.scss";

export function EmptyDropArea() {
  const [isOver, setIsOver] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    invariant(elementRef.current, "Element ref not found");

    return dropTargetForElements({
      element: elementRef.current,
      onDragEnter: () => setIsOver(true),
      onDragLeave: () => setIsOver(false),
      onDrop: (event) => {
        console.log("Dropped", event);
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
