import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { Box, Text } from "@mantine/core";
import invariant from "invariant";
import { useEffect, useMemo, useRef, useState } from "react";
import type { BuilderElementKey, BuilderElementSchema } from "@/elements";
import type { DraggableElementSchemaData } from "@/types/draggable-data";
import classes from "./draggable-element-schema.module.scss";

interface DraggableElementSchemaProps {
  type: BuilderElementKey;
  schema: BuilderElementSchema;
}
export function DraggableElementSchema({ type, schema }: DraggableElementSchemaProps) {
  const Icon = schema.icon;
  const elementRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const initialData: DraggableElementSchemaData = useMemo(
    () => ({
      sourceType: "schema",
      type,
      schema
    }),
    [type, schema]
  );

  useEffect(() => {
    const element = elementRef.current;

    invariant(element, "elementRef is not defined");

    return draggable({
      element,
      getInitialData: () => initialData,
      onDragStart: () => setIsDragging(true),
      onDrop: () => setIsDragging(false)
    });
  }, [initialData]);

  return (
    <Box
      ref={elementRef}
      className={classes.wrapper}
      data-dragging={isDragging}
      px="sm"
      py="xs"
    >
      <Icon size={20} />
      <Text size="sm">{schema.displayName}</Text>
    </Box>
  );
}
