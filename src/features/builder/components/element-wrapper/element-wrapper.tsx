import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import {
  draggable,
  dropTargetForElements,
  type ElementDropTargetEventBasePayload
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import {
  attachClosestEdge,
  type Edge,
  extractClosestEdge
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { DropIndicator } from "@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box";
import { Box } from "@mantine/core";
import invariant from "invariant";
import { useEffect, useRef, useState } from "react";
import { useBuilderStore } from "../../hooks/use-builder-store";
import type { ElementInstance } from "../../types";
import styles from "./element-wrapper.module.scss";

interface ElementWrapperProps {
  children: React.ReactNode;
  elementInstance: ElementInstance;
}

export function ElementWrapper({ children, elementInstance }: ElementWrapperProps) {
  const [closestEdge, setClosestEdge] = useState<Edge | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const handleSelect = useBuilderStore((state) => state.handleSelect);
  const selectedElementId = useBuilderStore((state) => state.selectedElementId);

  useEffect(() => {
    const element = elementRef.current;
    invariant(element, "Element ref not found");
    const userData = {
      ...elementInstance
    };

    function onChange({ source, self }: ElementDropTargetEventBasePayload) {
      const closestEdge = extractClosestEdge(source.data);
    }

    return combine(
      draggable({
        element,
        getInitialData() {
          return userData;
        },
        onDragStart() {
          setIsDragging(true);
        },
        onDrop() {
          setIsDragging(false);
        }
      }),
      dropTargetForElements({
        element,
        getData({ input }) {
          return attachClosestEdge(userData, {
            element,
            input,
            allowedEdges: ["top", "bottom"]
          });
        },
        onDragEnter: onChange,
        onDrag: onChange,
        onDragLeave() {
          setClosestEdge(null);
        },
        onDrop() {
          setClosestEdge(null);
        }
      })
    );
  }, [elementInstance]);

  return (
    <Box
      ref={elementRef}
      data-selected={selectedElementId === elementInstance.id}
      data-dragging={isDragging}
      className={styles.wrapper}
      onClick={() => handleSelect(elementInstance.id)}
    >
      {children}
      {closestEdge && (
        <DropIndicator
          edge={closestEdge}
          gap="1px"
        />
      )}
    </Box>
  );
}
