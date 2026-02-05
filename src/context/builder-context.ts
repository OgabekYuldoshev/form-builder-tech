import { createContext } from "react";
import type { BuilderElement, BuilderElementKey } from "@/elements";
import type { BuilderStoreApi } from "@/store";

interface BuilderContextType {
  elementSchema: Record<BuilderElementKey, BuilderElement>;
  store: BuilderStoreApi;
}

const BuilderContext = createContext<BuilderContextType | null>(null);

export { BuilderContext, type BuilderContextType };
