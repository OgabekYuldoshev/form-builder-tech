import { useMemo } from "react";
import { BuilderContext } from "@/context/builder-context";
import type { BuilderElementKey, BuilderElementSchema } from "@/elements";
import { createBuilderStore } from "@/store";

interface BuilderProviderProps {
  elementSchema: Record<BuilderElementKey, BuilderElementSchema>;
  children: React.ReactNode;
}

export function BuilderProvider({ elementSchema, children }: BuilderProviderProps) {
  const store = useMemo(() => createBuilderStore(), []);

  return (
    <BuilderContext.Provider value={{ elementSchema, store }}>{children}</BuilderContext.Provider>
  );
}
