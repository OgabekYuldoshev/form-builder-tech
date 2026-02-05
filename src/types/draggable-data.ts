import type { BuilderElementKey, BuilderElementSchema } from "@/elements";
import type { ElementNode } from ".";

type DraggableElementSchemaData = {
  sourceType: "schema";
  type: BuilderElementKey;
  schema: BuilderElementSchema;
};

type DraggableElementNodeData = {
  sourceType: "node";
  elementNode: ElementNode;
};

export type { DraggableElementSchemaData, DraggableElementNodeData };
