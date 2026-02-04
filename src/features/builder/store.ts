import { createStore } from "zustand";
import { immer } from "zustand/middleware/immer";
import { loggerMiddleware } from "../../lib/zustand-logger";
import type { ElementInstance } from "./types";

interface BuilderStore {
  state: Record<string, ElementInstance>;
  insert: (element: ElementInstance) => void;
}

const createBuilderStore = () => {
  return createStore<BuilderStore>()(
    loggerMiddleware(
      immer((set) => ({
        state: {},
        insert: (element) =>
          set((state) => {
            state.state[element.id] = element;
          })
      }))
    )
  );
};

export { type BuilderStore, createBuilderStore };
