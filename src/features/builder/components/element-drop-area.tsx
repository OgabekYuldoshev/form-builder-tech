/** biome-ignore-all lint/suspicious/noExplicitAny: off */
import { Box, Flex } from "@mantine/core";
import { useShallow } from "zustand/shallow";
import type { BuilderElementSchemaTypes } from "../elements";
import { useBuilderContext } from "../hooks/use-builder-context";
import { useBuilderStore } from "../hooks/use-builder-store";
import type { ElementInstance } from "../types";
import { ElementWrapper } from "./element-wrapper";

export function ElementDropArea() {
  const { elementSchemas } = useBuilderContext();
  const elements = useBuilderStore(
    useShallow((state) => state.rootIds.map((id) => state.elements[id]).filter(Boolean))
  );

  return (
    <Flex
      direction="column"
      gap="xs"
    >
      {elements.map((element) => {
        const elementSchema = elementSchemas[element.type as BuilderElementSchemaTypes];
        const component = elementSchema.render(element as unknown as ElementInstance<any>);

        return (
          <ElementWrapper
            key={element.id}
            elementInstance={element}
          >
            <Box style={{ pointerEvents: "none" }}>{component}</Box>
          </ElementWrapper>
        );
      })}
    </Flex>
  );
}
