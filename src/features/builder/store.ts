import { createStore } from "zustand";
import { immer } from "zustand/middleware/immer";
import { loggerMiddleware } from "../../lib/zustand-logger";
import type { ElementInstance } from "./types";

interface BuilderStore {
  rootIds: string[];
  groupIds: Record<string, string[]>;
  elements: Record<string, ElementInstance>;
  selectedElementId: string | null;
  handleInsert: (element: ElementInstance, targetPosition?: number) => void;
  handleSelect: (elementId: string) => void;
}

const createBuilderStore = () => {
  return createStore<BuilderStore>()(
    loggerMiddleware(
      immer((set) => ({
        elements: {},
        rootIds: [],
        groupIds: {},
        selectedElementId: null,
        handleInsert: (element) =>
          set((state) => {
            if (element.parentId === null) {
              state.rootIds = [...state.rootIds.slice(0, element.position), element.id, ...state.rootIds.slice(element.position)];

              state.rootIds.forEach((id, index) => {
                if (state.elements[id]) {
                  state.elements[id].position = index;
                } else {
                  state.elements[id] = element
                }
              });

            } else {
              if (!state.groupIds[element.parentId]) {
                state.groupIds[element.parentId] = [];
              }
              let groupIds = state.groupIds[element.parentId]
              groupIds = [...groupIds.slice(0, element.position), element.id, ...groupIds.slice(element.position)];
              
              groupIds.forEach((id, index) => {
                if (state.elements[id]) {
                  state.elements[id].position = index;
                } else {
                  state.elements[id] = element
                }
              });
            }
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
