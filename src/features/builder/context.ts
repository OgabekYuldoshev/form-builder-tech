import { createContext } from "react";
import type { StoreApi } from "zustand";
import type { BuilderElementSchemas } from "./elements";
import type { BuilderStore } from "./store";

interface BuilderContextType {
  elementSchemas: BuilderElementSchemas;
  store: StoreApi<BuilderStore>;
}

export const BuilderContext = createContext<BuilderContextType | null>(null);
