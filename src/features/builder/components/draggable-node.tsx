import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { Paper, Text } from "@mantine/core";
import { useEffect, useRef } from "react";
import type { NodeDefinition } from "../types";

export interface DraggableNodeProps {
  node: NodeDefinition;
}

export function DraggableNode({ node }: DraggableNodeProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return draggable({
      element: el,
      dragHandle: el
    });
  }, [node.type]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.setAttribute("data-node-type", node.type);
    return () => el.removeAttribute("data-node-type");
  }, [node.type]);

  return (
    <Paper
      ref={ref}
      withBorder
      p="xs"
      style={{ cursor: "grab" }}
    >
      <Text size="sm">{node.label}</Text>
    </Paper>
  );
}
