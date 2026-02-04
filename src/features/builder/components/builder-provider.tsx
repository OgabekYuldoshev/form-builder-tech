import { useMemo } from "react";
import { BuilderContext } from "../context";
import type { BuilderElements } from "../elements";
import { createBuilderStore } from "../store";

interface BuilderProviderProps {
  children: React.ReactNode;
  elements: BuilderElements;
}
export function BuilderProvider({ children, elements }: BuilderProviderProps) {
  const store = useMemo(() => createBuilderStore(), []);

  const contextValue = useMemo(
    () => ({
      elements,
      store
    }),
    [elements, store]
  );

  return <BuilderContext.Provider value={contextValue}>{children}</BuilderContext.Provider>;
}
