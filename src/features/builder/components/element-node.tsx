import { Box } from "@mantine/core";
import { memo } from "react";
import invariant from "invariant";
import { useShallow } from "zustand/shallow";
import type { BuilderElementSchemaTypes } from "../elements";
import { useBuilderContext } from "../hooks/use-builder-context";
import { useBuilderStore } from "../hooks/use-builder-store";
import type { ElementSchema } from "../types";
import { ElementDropZone } from "./element-drop-zone";
import { ElementWrapper } from "./element-wrapper";

function isContainerSchema(
  schema: ElementSchema | undefined
): schema is ElementSchema & { allowedChildren: string[] } {
  return (
    schema != null &&
    "allowedChildren" in schema &&
    Array.isArray(schema.allowedChildren) &&
    schema.allowedChildren.length > 0
  );
}

interface ElementNodeProps {
  elementId: string;
}

function ElementNodeComponent({ elementId }: ElementNodeProps) {
  const elementSchemas = useBuilderContext()?.elementSchemas;
  const element = useBuilderStore(
    useShallow((state) => state.elements[elementId])
  );

  if (element == null) return null;

  invariant(
    elementSchemas != null,
    "ElementNode must be used within BuilderContext"
  );

  const schema = elementSchemas[element.type as BuilderElementSchemaTypes];

  invariant(
    schema != null,
    `Unknown element type: ${element.type} (elementId: ${elementId})`
  );

  const isContainer = isContainerSchema(schema);
  const children = isContainer ? (
    <ElementDropZone parentId={elementId} />
  ) : undefined;

  const renderProps = {
    ...element,
    ...(children != null && { children }),
  };

  const component = schema.render(
    renderProps
  );

  return (
    <ElementWrapper elementInstance={element}>
      <Box component="div" style={{ pointerEvents: "none" }}>
        {component}
      </Box>
    </ElementWrapper>
  );
}

ElementNodeComponent.displayName = "ElementNode";

export const ElementNode = memo(ElementNodeComponent);