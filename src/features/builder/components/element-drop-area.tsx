/** biome-ignore-all lint/suspicious/noExplicitAny: off */
import { Box, Flex } from "@mantine/core";
import type { BuilderElementSchemaTypes } from "../elements";
import { useBuilderContext } from "../hooks/use-builder-context";
import { useBuilderStore } from "../hooks/use-builder-store";
import type { ElementInstance } from "../types";
import { ElementWrapper } from "./element-wrapper";

export function ElementDropArea() {
  const { elementSchemas } = useBuilderContext();
  const rootNodes = useBuilderStore((state) => state.rootIds);
  const elements = useBuilderStore((state) => state.elements);

  return (
    <Flex
      direction="column"
      gap="xs"
    >
      {rootNodes.map((elementId) => {
        const elementInstance = elements[elementId];

        if (!elementInstance) {
          return null;
        }

        const elementSchema = elementSchemas[elementInstance.type as BuilderElementSchemaTypes];
        const component = elementSchema.render(elementInstance as unknown as ElementInstance<any>);

        return (
          <ElementWrapper
            key={elementInstance.id}
            elementInstance={elementInstance}
          >
            <Box style={{ pointerEvents: "none" }}>{component}</Box>
          </ElementWrapper>
        );
      })}
    </Flex>
  );
}
