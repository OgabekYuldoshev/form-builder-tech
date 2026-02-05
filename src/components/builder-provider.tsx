import { useMemo } from "react";
import { BuilderContext } from "@/context";
import type { BuilderElement, BuilderElementKey } from "@/elements";
import { createBuilderStore } from "@/store";

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
