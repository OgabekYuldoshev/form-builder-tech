import { createStore } from "zustand";
import { immer } from "zustand/middleware/immer";
import { loggerMiddleware } from "../../lib/zustand-logger";
import type { ElementInstance } from "./types";

interface BuilderStore {
  nodes: Record<string, ElementInstance>;
}

const createBuilderStore = () => {
  return createStore<BuilderStore>()(
    loggerMiddleware(
      immer(() => ({
        nodes: {}
      }))
    )
  );
};

export { type BuilderStore, createBuilderStore };
