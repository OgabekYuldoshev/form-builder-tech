import { useMemo } from "react";
import { BuilderContext } from "../context";
import type { BuilderElementSchemas } from "../elements";
import { createBuilderStore } from "../store";
import type { ElementInstance } from "../types";

interface BuilderProviderProps {
  children: React.ReactNode;
  elementSchemas: BuilderElementSchemas;
  defaultData?: Record<string, ElementInstance>;
}
export function BuilderProvider({
  children,
  elementSchemas,
  defaultData = {}
}: BuilderProviderProps) {
  const store = useMemo(() => {
    const rootIds = Object.values(defaultData)
      .filter((element) => element.parentId === null)
      .sort((a, b) => a.position - b.position)
      .map((element) => element.id);

    return createBuilderStore({
      rootIds,
      elements: defaultData
    });
  }, [defaultData]);

  const contextValue = useMemo(
    () => ({
      elementSchemas,
      store
    }),
    [elementSchemas, store]
  );

  return <BuilderContext.Provider value={contextValue}>{children}</BuilderContext.Provider>;
}
