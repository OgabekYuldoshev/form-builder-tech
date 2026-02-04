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
import { ActionIcon, Box, Group } from "@mantine/core";
import invariant from "invariant";
import { useEffect, useMemo, useRef, useState } from "react";
import { generateUUID } from "@/utils/generate-uuid";
import { useBuilderStore } from "../../hooks/use-builder-store";
import type {
  DraggableElementData,
  ElementInstance,
  StarterDraggableElementData
} from "../../types";
import styles from "./element-wrapper.module.scss";
import { IconTrash } from "@tabler/icons-react";

interface ElementWrapperProps {
  children: React.ReactNode;
  elementInstance: ElementInstance;
}

export function ElementWrapper({ children, elementInstance }: ElementWrapperProps) {
  const handleDelete = useBuilderStore((state) => state.handleDelete);
  const handleInsert = useBuilderStore((state) => state.handleInsert);
  const handleMove = useBuilderStore((state) => state.handleMove);
  const [closestEdge, setClosestEdge] = useState<Edge | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const handleSelect = useBuilderStore((state) => state.handleSelect);
  const selectedElementId = useBuilderStore((state) => state.selectedElementId);

  const initalData: DraggableElementData = useMemo(
    () => ({
      sourceType: "element",
      elementInstance
    }),
    [elementInstance]
  );

  useEffect(() => {
    const element = elementRef.current;
    invariant(element, "Element ref not found");

    function onChange({ source, self }: ElementDropTargetEventBasePayload) {
      const element = elementRef.current;
      invariant(element, "Element ref not found");

      if (source.element === element) {
        setClosestEdge(null);
        return;
      }

      const sourceData = source.data as DraggableElementData | StarterDraggableElementData;
      let _index = 0;

      if ("index" in sourceData && typeof sourceData.index === "number") {
        _index = sourceData.index;
      }

      const closestEdge = extractClosestEdge(self.data);

      setClosestEdge(closestEdge);
    }

    return combine(
      draggable({
        element,
        getInitialData() {
          return initalData;
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
          return attachClosestEdge(initalData, {
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
        onDrop({ source, location }) {
          setClosestEdge(null);
          const sourceData = source.data as DraggableElementData | StarterDraggableElementData;
          const target = location.current.dropTargets[0];

          if (!target) {
            return;
          }
          const targetData = target.data as DraggableElementData;

          if (sourceData.sourceType === "starter") {
            const closestEdgeOfTarget = extractClosestEdge(targetData);

            const id = generateUUID();

            const targetPosition =
              closestEdgeOfTarget === "top"
                ? targetData.elementInstance.position
                : targetData.elementInstance.position + 1;

            const newElement: ElementInstance = {
              id,
              type: sourceData.type,
              props: {
                ...sourceData.schema.defaultProps
              },
              parentId: null,
              position: targetPosition
            };

            handleInsert(newElement);
          }

          if (sourceData.sourceType === "element") {
            const closestEdgeOfTarget = extractClosestEdge(targetData);

            const targetPosition =
              closestEdgeOfTarget === "top"
                ? targetData.elementInstance.position
                : targetData.elementInstance.position + 1;

            handleMove(sourceData.elementInstance.id, targetPosition);
          }
        }
      })
    );
  }, [initalData]);

  return (
    <Box
      ref={elementRef}
      data-selected={selectedElementId === elementInstance.id}
      data-dragging={isDragging}
      className={styles.wrapper}
      onClick={() => handleSelect(elementInstance.id)}
    >
      <Group className={styles.actions} data-is-hidden={selectedElementId !== elementInstance.id}>
        <ActionIcon variant="transparent" onClick={(e) => {
          e.preventDefault()
          e.stopPropagation();
          handleDelete(elementInstance.id);
        }}>
          <IconTrash size={16} color="var(--mantine-color-red-6)" />
        </ActionIcon>
      </Group>
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
