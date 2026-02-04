/** biome-ignore-all lint/suspicious/noExplicitAny: off */
import { Flex } from "@mantine/core";
import { useMemo } from "react";
import type { BuilderElementTypes } from "../elements";
import { useBuilderContext } from "../hooks/use-builder-context";
import { useBuilderStore } from "../hooks/use-builder-store";
import type { ElementInstance } from "../types";
import { ElementWrapper } from "./element-wrapper";

export function ElementDropArea() {
  const { elements } = useBuilderContext();
  const state = useBuilderStore((state) => state.state);

  const items = useMemo(() => {
    return Object.values(state)
      .filter((element) => element.parentId === null)
      .sort((a, b) => a.position - b.position);
  }, [state]);

  return (
    <Flex direction="column">
      {items.map((e) => {
        const element = elements[e.type as BuilderElementTypes];
        const component = element.render(e as ElementInstance<any>);
        return (
          <ElementWrapper
            key={e.id}
            elementInstance={e}
          >
            {component}
          </ElementWrapper>
        );
      })}
    </Flex>
  );
}
