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
import { IconTrash } from "@tabler/icons-react";
import invariant from "invariant";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useShallow } from "zustand/shallow";
import type { BuilderElementKey } from "@/elements";
import { useBuilderContext } from "@/hooks/use-builder-context";
import { useBuilderStore } from "@/hooks/use-builder-store";
import type { ElementNode } from "@/types";
import type { DraggableElementNodeData, DraggableElementSchemaData } from "@/types/draggable-data";
import { generateUUID } from "@/utils/generate-uuid";
import classes from "./draggable-element-node.module.scss";

interface DraggableElementNodeProps {
  elementNodeId: string;
}

type DraggableElementData = DraggableElementNodeData | DraggableElementSchemaData;

function DraggableElementNodeComponent({ elementNodeId }: DraggableElementNodeProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const { elementSchema } = useBuilderContext();
  const elementNode = useBuilderStore(useShallow((state) => state.nodes[elementNodeId]));
  const selectedNodeId = useBuilderStore((state) => state.selectedNodeId);

  const handleInsert = useBuilderStore((state) => state.handleInsert);
  const handleDelete = useBuilderStore((state) => state.handleDelete);
  const handleSelectNode = useBuilderStore((state) => state.handleSelectNode);

  const [closestEdge, setClosestEdge] = useState<Edge | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const renderComponent = useCallback(
    (node: ElementNode) => {
      return elementSchema[node.type as BuilderElementKey]?.render(node) ?? null;
    },
    [elementSchema, elementNode]
  );

  const initialData: DraggableElementNodeData = useMemo(() => {
    return {
      sourceType: "node",
      elementNode
    };
  }, [elementNode]);

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

      const closestEdge = extractClosestEdge(self.data);

      setClosestEdge(closestEdge);
    }

    return combine(
      draggable({
        element,
        getInitialData: () => initialData,
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
          return attachClosestEdge(initialData, {
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
          const sourceData = source.data as DraggableElementData;
          const target = location.current.dropTargets[0];

          if (!target) {
            return;
          }
          const targetData = target.data as DraggableElementNodeData;

          if (sourceData.sourceType === "schema") {
            const closestEdgeOfTarget = extractClosestEdge(targetData);

            const id = generateUUID();

            const targetPosition =
              closestEdgeOfTarget === "top"
                ? targetData.elementNode.position
                : targetData.elementNode.position + 1;

            const newElement: ElementNode = {
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

          if (sourceData.sourceType === "node") {
            const closestEdgeOfTarget = extractClosestEdge(targetData);

            const targetPosition =
              closestEdgeOfTarget === "top"
                ? targetData.elementNode.position
                : targetData.elementNode.position + 1;

            //   handleMove(sourceData.elementInstance.id, targetPosition);
          }
        }
      })
    );
  }, [elementNode]);

  return (
    <Box
      className={classes.wrapper}
      ref={elementRef}
      onClick={() => handleSelectNode(elementNodeId)}
      data-dragging={isDragging}
      data-selected={selectedNodeId === elementNodeId}
    >
      <Group
        className={classes.actions}
        data-is-hidden={selectedNodeId !== elementNodeId}
      >
        <ActionIcon
          variant="transparent"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleDelete(elementNodeId);
          }}
        >
          <IconTrash
            size={16}
            color="var(--mantine-color-red-6)"
          />
        </ActionIcon>
      </Group>
      <Box className={classes.content}>{renderComponent(elementNode)}</Box>
      {closestEdge && (
        <DropIndicator
          edge={closestEdge}
          gap="1px"
        />
      )}
    </Box>
  );
}

export const DraggableElementNode = memo(DraggableElementNodeComponent);
