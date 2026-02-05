import { useMemo } from "react";
import type { BuilderElement, BuilderElementKey } from "@/elements";
import { createBuilderStore } from "@/store";
import { BuilderContext } from "@/context/builder-context";

interface BuilderProviderProps {
  elementSchema: Record<BuilderElementKey, BuilderElement>;
  children: React.ReactNode;
}

export function BuilderProvider({ elementSchema, children }: BuilderProviderProps) {
  const store = useMemo(() => createBuilderStore(), []);

  return (
    <BuilderContext.Provider value={{ elementSchema, store }}>{children}</BuilderContext.Provider>
  );
}
