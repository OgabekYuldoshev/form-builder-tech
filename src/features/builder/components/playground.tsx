import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import {
  draggable,
  dropTargetForElements
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { Box, Paper, Stack, Text } from "@mantine/core";
import { useEffect, useMemo, useRef } from "react";
import { useBuilderStore } from "../hooks/use-builder-store";
import type { NodeInstance } from "../types";

function getChildrenFromInstances(
  instances: NodeInstance[],
  parentId: string | null
): NodeInstance[] {
  return instances.filter((i) => i.parentId === parentId).sort((a, b) => a.sortOrder - b.sortOrder);
}

const PALETTE_TYPE_ATTR = "data-node-type";
const INSTANCE_ID_ATTR = "data-instance-id";
const INSTANCE_INDEX_ATTR = "data-instance-index";
const PARENT_ID_ATTR = "data-parent-id";

function canDropInContainer(
  definitions: Record<string, { allowList?: string[] }>,
  instances: { id: string; type: string }[],
  containerId: string | null,
  nodeType: string
): boolean {
  if (containerId === null) return true;
  const container = instances.find((i) => i.id === containerId);
  if (!container) return true;
  const def = definitions[container.type];
  if (!def?.allowList) return false;
  return def.allowList.includes(nodeType);
}

function CanvasNode({
  instance,
  parentId,
  indexInParent
}: {
  instance: NodeInstance;
  parentId: string | null;
  indexInParent: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const definitions = useBuilderStore((state) => state.definitions);
  const selectedId = useBuilderStore((state) => state.selectedId);
  const setSelectedId = useBuilderStore((state) => state.setSelectedId);
  const addInstance = useBuilderStore((state) => state.addInstance);
  const reorderInParent = useBuilderStore((state) => state.reorderInParent);
  const moveInstance = useBuilderStore((state) => state.moveInstance);
  const isSelected = selectedId === instance.id;

  const def = definitions[instance.type];
  const instances = useBuilderStore((state) => state.instances);
  const isContainer = Boolean(def?.allowList?.length);

  const content = def
    ? def.render({
        ...instance.props,
        id: instance.id,
        children: isContainer ? <ContainerSlot parentId={instance.id} /> : undefined
      } as Parameters<typeof def.render>[0])
    : null;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return combine(
      draggable({
        element: el
      }),
      dropTargetForElements({
        element: el,
        getData: () => ({ indexInParent, parentId }),
        canDrop: ({ source }) => {
          const el = source.element as HTMLElement;
          const nodeType = el.getAttribute?.(PALETTE_TYPE_ATTR);
          const instanceId = el.getAttribute?.(INSTANCE_ID_ATTR);
          const allowed =
            nodeType !== null
              ? canDropInContainer(definitions, instances, parentId, nodeType)
              : true;
          return Boolean(nodeType || instanceId) && allowed;
        },
        onDrop: ({ source }) => {
          const el = source.element as HTMLElement;
          const nodeType = el.getAttribute?.(PALETTE_TYPE_ATTR);
          const instanceId = el.getAttribute?.(INSTANCE_ID_ATTR);
          const fromIndexStr = el.getAttribute?.(INSTANCE_INDEX_ATTR);
          const fromParentId = el.getAttribute?.(PARENT_ID_ATTR);
          if (nodeType && canDropInContainer(definitions, instances, parentId, nodeType)) {
            addInstance(nodeType, { parentId, position: indexInParent });
          } else if (instanceId != null && fromIndexStr != null) {
            const fromIndex = Number.parseInt(fromIndexStr, 10);
            const sameParent = fromParentId === (parentId === null ? "null" : parentId);
            if (sameParent) {
              if (!Number.isNaN(fromIndex) && fromIndex !== indexInParent) {
                const toIndex = fromIndex < indexInParent ? indexInParent - 1 : indexInParent;
                reorderInParent(parentId, fromIndex, toIndex);
              }
            } else {
              moveInstance(instanceId, parentId, indexInParent);
            }
          }
        }
      })
    );
  }, [
    instance.id,
    indexInParent,
    parentId,
    addInstance,
    reorderInParent,
    moveInstance,
    definitions,
    instances
  ]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.setAttribute(INSTANCE_ID_ATTR, instance.id);
    el.setAttribute(INSTANCE_INDEX_ATTR, String(indexInParent));
    el.setAttribute(PARENT_ID_ATTR, parentId ?? "null");
    return () => {
      el.removeAttribute(INSTANCE_ID_ATTR);
      el.removeAttribute(INSTANCE_INDEX_ATTR);
      el.removeAttribute(PARENT_ID_ATTR);
    };
  }, [instance.id, indexInParent, parentId]);

  return (
    <Paper
      ref={ref}
      withBorder
      p="md"
      style={{
        cursor: "grab",
        borderColor: isSelected ? "var(--mantine-color-blue-6)" : undefined,
        borderWidth: isSelected ? 2 : 1
      }}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedId(instance.id);
      }}
    >
      {content}
    </Paper>
  );
}

function ContainerSlot({ parentId }: { parentId: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const instances = useBuilderStore((state) => state.instances);
  const definitions = useBuilderStore((state) => state.definitions);
  const addInstance = useBuilderStore((state) => state.addInstance);
  const moveInstance = useBuilderStore((state) => state.moveInstance);
  const children = useMemo(
    () => getChildrenFromInstances(instances, parentId),
    [instances, parentId]
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return dropTargetForElements({
      element: el,
      canDrop: ({ source }) => {
        const el = source.element as HTMLElement;
        const nodeType = el.getAttribute?.(PALETTE_TYPE_ATTR);
        const instanceId = el.getAttribute?.(INSTANCE_ID_ATTR);
        if (nodeType) return canDropInContainer(definitions, instances, parentId, nodeType);
        return Boolean(instanceId);
      },
      onDrop: ({ source }) => {
        const el = source.element as HTMLElement;
        const nodeType = el.getAttribute?.(PALETTE_TYPE_ATTR);
        const instanceId = el.getAttribute?.(INSTANCE_ID_ATTR);
        const fromParentId = el.getAttribute?.(PARENT_ID_ATTR);
        if (nodeType && canDropInContainer(definitions, instances, parentId, nodeType)) {
          addInstance(nodeType, { parentId, position: children.length });
        } else if (instanceId != null && fromParentId !== parentId) {
          moveInstance(instanceId, parentId, children.length);
        }
      }
    });
  }, [parentId, children.length, definitions, instances, addInstance, moveInstance]);

  return (
    <Stack gap="md">
      {children.map((child, i) => (
        <CanvasNode
          key={child.id}
          instance={child}
          parentId={parentId}
          indexInParent={i}
        />
      ))}
      <Box
        ref={ref}
        style={{
          minHeight: 32,
          border: "1px dashed var(--mantine-color-default-border)",
          borderRadius: 4,
          padding: 8
        }}
      >
        <Text
          size="xs"
          c="dimmed"
        >
          Drop here
        </Text>
      </Box>
    </Stack>
  );
}

export function Playground() {
  const ref = useRef<HTMLDivElement | null>(null);
  const instances = useBuilderStore((state) => state.instances);
  const definitions = useBuilderStore((state) => state.definitions);
  const addInstance = useBuilderStore((state) => state.addInstance);
  const moveInstance = useBuilderStore((state) => state.moveInstance);
  const setSelectedId = useBuilderStore((state) => state.setSelectedId);

  const rootChildren = useMemo(() => getChildrenFromInstances(instances, null), [instances]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return dropTargetForElements({
      element: el,
      onDrop: ({ source }) => {
        const el = source.element as HTMLElement;
        const nodeType = el.getAttribute?.(PALETTE_TYPE_ATTR);
        const instanceId = el.getAttribute?.(INSTANCE_ID_ATTR);
        const fromParentId = el.getAttribute?.(PARENT_ID_ATTR);
        if (nodeType && definitions[nodeType]) {
          addInstance(nodeType, { parentId: null, position: rootChildren.length });
        } else if (instanceId != null && fromParentId !== "null") {
          moveInstance(instanceId, null, rootChildren.length);
        }
      }
    });
  }, [definitions, addInstance, moveInstance, rootChildren.length]);

  return (
    <Box
      ref={ref}
      onClick={() => setSelectedId(null)}
      style={{
        minHeight: 400,
        border: "2px dashed var(--mantine-color-default-border)",
        borderRadius: "var(--mantine-radius-md)",
        padding: 16
      }}
    >
      <Stack gap="md">
        {rootChildren.length === 0 ? (
          <Text
            c="dimmed"
            ta="center"
            py="xl"
          >
            Drag nodes here
          </Text>
        ) : (
          rootChildren.map((instance, i) => (
            <CanvasNode
              key={instance.id}
              instance={instance}
              parentId={null}
              indexInParent={i}
            />
          ))
        )}
      </Stack>
    </Box>
  );
}
