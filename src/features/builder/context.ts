import { createContext } from "react";
import type { StoreApi } from "zustand";
import type { BuilderElements } from "./elements";
import type { BuilderStore } from "./store";

interface BuilderContextType {
  elements: BuilderElements;
  store: StoreApi<BuilderStore>;
}

export const BuilderContext = createContext<BuilderContextType | null>(null);
