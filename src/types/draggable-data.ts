import type { BuilderElementKey, BuilderElementSchema } from "@/elements";

type DraggableElementSchemaData = {
  sourceType: "schema";
  type: BuilderElementKey;
  schema: BuilderElementSchema;
};

export type { DraggableElementSchemaData };
