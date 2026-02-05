import { createStore, type StoreApi } from "zustand";
import { immer } from "zustand/middleware/immer";
import { loggerMiddleware } from "@/lib/zustand-logger";
import type { ElementNode } from "@/types";

interface BuilderStore {
  nodes: Record<string, ElementNode>;
  rootIds: string[];
  containers: Record<string, string[]>;
  selectedNodeId: string | null;
  handleInsert(): void;
  handleUpdate(): void;
  handleDelete(): void;
  handleMove(): void;
  handleSelectNode(value: string | null): void;
}

type BuilderStoreApi = StoreApi<BuilderStore>;

function createBuilderStore(initialState: Partial<BuilderStore> = {}) {
  return createStore<BuilderStore>()(
    loggerMiddleware(
      immer((set) => ({
        nodes: {},
        rootIds: [],
        containers: {},
        selectedNodeId: null,
        ...initialState,
        handleInsert: () => {},
        handleUpdate: () => {},
        handleDelete: () => {},
        handleMove: () => {},
        handleSelectNode: (value) =>
          set((state) => {
            state.selectedNodeId = value;
          })
      }))
    )
  );
}

export { createBuilderStore, type BuilderStore, type BuilderStoreApi };
