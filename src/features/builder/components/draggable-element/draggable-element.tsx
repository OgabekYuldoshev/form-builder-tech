import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { Box, Flex, Text } from "@mantine/core";
import invariant from "invariant";
import { useEffect, useMemo, useRef, useState } from "react";
import type { BuilderElementSchemas, BuilderElementSchemaTypes } from "../../elements";
import type { StarterDraggableElementData } from "../../types";
import styles from "./draggable-element.module.scss";

interface DraggableElementProps {
  type: BuilderElementSchemaTypes;
  schema: BuilderElementSchemas[BuilderElementSchemaTypes];
}
export function DraggableElement({ type, schema }: DraggableElementProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const Icon = schema.icon;

  const initialData: StarterDraggableElementData = useMemo(
    () => ({
      sourceType: "starter",
      type,
      schema
    }),
    [type, schema]
  );

  useEffect(() => {
    invariant(elementRef.current, "Element ref not found");

    return draggable({
      element: elementRef.current,
      onDragStart: () => setIsDragging(true),
      onDrop: () => setIsDragging(false),
      getInitialData: () => initialData
    });
  }, [initialData]);

  return (
    <Box
      ref={elementRef}
      className={styles.wrapper}
      data-dragging={isDragging}
    >
      <Flex
        align="center"
        gap="xs"
      >
        <Icon size={20} />
        <Text size="sm">{schema.displayName}</Text>
      </Flex>
    </Box>
  );
}
