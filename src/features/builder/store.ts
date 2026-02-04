import { createStore } from "zustand";
import { immer } from "zustand/middleware/immer";
import { loggerMiddleware } from "../../lib/zustand-logger";
import type { ElementInstance } from "./types";

interface BuilderStore {
  state: Record<string, ElementInstance>;
  selectedElementId: string | null;
  handleInsert: (element: ElementInstance) => void;
  handleSelect: (elementId: string) => void;
}

const createBuilderStore = () => {
  return createStore<BuilderStore>()(
    loggerMiddleware(
      immer((set) => ({
        state: {},
        selectedElementId: null,
        handleInsert: (element) =>
          set((state) => {
            state.state[element.id] = element;
          }),
        handleSelect: (elementId) =>
          set((state) => {
            state.selectedElementId = elementId;
          })
      }))
    )
  );
};

export { type BuilderStore, createBuilderStore };
