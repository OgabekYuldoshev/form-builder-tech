import { useMemo } from "react";
import { BuilderContext } from "../context";
import type { BuilderElementSchemas } from "../elements";
import { createBuilderStore } from "../store";

interface BuilderProviderProps {
  children: React.ReactNode;
  elementSchemas: BuilderElementSchemas;
}
export function BuilderProvider({ children, elementSchemas }: BuilderProviderProps) {
  const store = useMemo(() => createBuilderStore(), []);

  const contextValue = useMemo(
    () => ({
      elementSchemas,
      store
    }),
    [elementSchemas, store]
  );

  return <BuilderContext.Provider value={contextValue}>{children}</BuilderContext.Provider>;
}
