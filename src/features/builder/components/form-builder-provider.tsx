import type React from "react";
import { useMemo } from "react";
import { FormBuilderContext } from "../context";
import { createFormBuilderStore } from "../store";
import type { AnyNodeDefinition } from "../types";

interface FormBuilderProviderProps {
  nodes: AnyNodeDefinition[];
  children: React.ReactNode;
}

export function FormBuilderProvider({ nodes, children }: FormBuilderProviderProps) {
  const definitionsMap = useMemo(() => {
    return nodes.reduce<Record<string, AnyNodeDefinition>>((acc, node) => {
      if (node.type in acc) {
        throw new Error(`Node type ${node.type} already exists`);
      }
      acc[node.type] = node;
      return acc;
    }, {});
  }, [nodes]);

  const store = useMemo(
    () => createFormBuilderStore({ definitions: definitionsMap }),
    [definitionsMap]
  );

  return <FormBuilderContext.Provider value={{ store }}>{children}</FormBuilderContext.Provider>;
}
