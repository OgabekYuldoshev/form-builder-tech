import { createStore, type StoreApi } from "zustand";
import { immer } from "zustand/middleware/immer";
import { loggerMiddleware } from "@/lib/zustand-logger";
import type { ElementNode } from "@/types";

interface BuilderStore {
  nodes: Record<string, ElementNode>;
  rootIds: string[];
  containers: Record<string, string[]>;
  selectedNodeId: string | null;
  handleInsert(elementNode: ElementNode): void;
  handleUpdate(): void;
  handleDelete(elementNodeId: string): void;
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
        handleInsert: (elementNode) =>
          set((state) => {
            if (elementNode.parentId === null) {
              state.rootIds = [
                ...state.rootIds.slice(0, elementNode.position),
                elementNode.id,
                ...state.rootIds.slice(elementNode.position)
              ];

              state.rootIds.forEach((id, index) => {
                if (state.nodes[id]) {
                  state.nodes[id].position = index;
                } else {
                  state.nodes[id] = elementNode;
                }
              });
            } else {
              if (!state.containers[elementNode.parentId]) {
                state.containers[elementNode.parentId] = [];
              }

              state.containers[elementNode.parentId] = [
                ...state.containers[elementNode.parentId].slice(0, elementNode.position),
                elementNode.id,
                ...state.containers[elementNode.parentId].slice(elementNode.position)
              ];

              state.containers[elementNode.parentId].forEach((id, index) => {
                if (state.nodes[id]) {
                  state.nodes[id].position = index;
                } else {
                  state.nodes[id] = elementNode;
                }
              });
            }
          }),
        handleUpdate: () => {},
        handleDelete: (elementNodeId) => {
          set((state) => {
            if (state.selectedNodeId === elementNodeId) {
              state.selectedNodeId = null;
            }

            if (state.rootIds.includes(elementNodeId)) {
              state.rootIds = state.rootIds.filter((id) => id !== elementNodeId);
            }

            delete state.nodes[elementNodeId];
          });
        },
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
