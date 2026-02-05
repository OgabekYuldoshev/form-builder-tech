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
import { ElementDropzone } from "../element-dropzone";
import classes from "./draggable-element-node.module.scss";

interface DraggableElementNodeProps {
  elementNodeId: string;
}

type DraggableElementData = DraggableElementNodeData | DraggableElementSchemaData;

function DraggableElementNodeComponent({ elementNodeId }: DraggableElementNodeProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const { elementSchema, store } = useBuilderContext();
  const elementNode = useBuilderStore(useShallow((state) => state.nodes[elementNodeId]));
  const selectedNodeId = useBuilderStore((state) => state.selectedNodeId);
  const schema = elementSchema[elementNode?.type as BuilderElementKey];

  const handleInsert = useBuilderStore((state) => state.handleInsert);
  const handleDelete = useBuilderStore((state) => state.handleDelete);
  const handleMove = useBuilderStore((state) => state.handleMove);
  const handleSelectNode = useBuilderStore((state) => state.handleSelectNode);

  const [closestEdge, setClosestEdge] = useState<Edge | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const renderComponent = useCallback(
    (node: ElementNode) => {
      invariant(schema != null, `Unknown element type: ${node.type} (elementId: ${node.id})`);

      let children: React.ReactNode | undefined;

      if ("allowedChildren" in schema && schema.allowedChildren?.length > 0) {
        children = <ElementDropzone parentId={node.id} />;
      }

      return schema.render({
        ...node,
        children
      });
    },
    [schema, elementNode]
  );

  const initialData: DraggableElementNodeData = useMemo(() => {
    return {
      sourceType: "node",
      elementNode
    };
  }, [elementNode]);

  const isRoot = elementNode.parentId == null;
  const allowedEdges: Edge[] = isRoot
    ? ["top", "bottom"]
    : ["top", "bottom", "left", "right"];

  useEffect(() => {
    const element = elementRef.current;
    invariant(element, "Element ref not found");

    function onChange({ source, self, location }: ElementDropTargetEventBasePayload) {
      const element = elementRef.current;
      invariant(element, "Element ref not found");
    
      if (source.element === element) {
        setClosestEdge(null);
        return;
      }
    
      const directTarget = location.current.dropTargets[0];
      if (
        directTarget &&
        directTarget.element !== element &&
        element.contains(directTarget.element)
      ) {
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
        canDrop: ({ source }) => {
          const sourceData = source.data as DraggableElementData;
          const parentId = elementNode.parentId;
          let allowedTypes: string[] | undefined;

          if (parentId != null) {
            const parentNode = store.getState().nodes[parentId];
            const parentSchema = parentNode
              ? elementSchema[parentNode.type as BuilderElementKey]
              : null;
            allowedTypes = parentSchema?.allowedChildren;
          } else {
            allowedTypes = undefined;
          }

          if (allowedTypes != null && allowedTypes.length > 0) {
            if (sourceData.sourceType === "schema") {
              return allowedTypes.includes(sourceData.type);
            }
            if (sourceData.sourceType === "node") {
              return allowedTypes.includes(sourceData.elementNode.type);
            }
          }
          return true;
        },
        getData({ input }) {
          return attachClosestEdge(initialData, {
            element,
            input,
            allowedEdges
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
          const targetNode = targetData.elementNode;
          const state = store.getState();

          const siblingIds =
            targetNode.parentId == null
              ? state.rootIds
              : (state.containers[targetNode.parentId] ?? []);
          const targetIndex = siblingIds.indexOf(targetNode.id);

          if (targetIndex === -1) return;

          const closestEdgeOfTarget = extractClosestEdge(targetData);
          const isBefore =
            closestEdgeOfTarget === "top" || closestEdgeOfTarget === "left";
          const insertIndex = isBefore ? targetIndex : targetIndex + 1;

          if (sourceData.sourceType === "schema") {
            const id = generateUUID();
            const newElement: ElementNode = {
              id,
              type: sourceData.type,
              props: { ...sourceData.schema.defaultProps },
              parentId: targetNode.parentId ?? null,
              position: insertIndex
            };
            handleInsert(newElement);
          }

          if (sourceData.sourceType === "node") {
            handleMove(sourceData.elementNode.id, targetNode.parentId ?? null, insertIndex);
          }
        }
      })
    );
  }, [elementNode, initialData, handleInsert, handleMove, elementSchema, schema]);

  return (
    <Box
      className={classes.wrapper}
      ref={elementRef}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSelectNode(elementNodeId);
      }}
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
