import { createStore } from "zustand";
import { immer } from "zustand/middleware/immer";
import { loggerMiddleware } from "../../lib/zustand-logger";
import type { ElementInstance } from "./types";

interface BuilderStore {
  state: Record<string, ElementInstance>;
}

const createBuilderStore = () => {
  return createStore<BuilderStore>()(
    loggerMiddleware(
      immer(() => ({
        state: {}
      }))
    )
  );
};

export { type BuilderStore, createBuilderStore };
