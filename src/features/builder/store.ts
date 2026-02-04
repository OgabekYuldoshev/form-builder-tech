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
        handleInsert: (element, targetPosition) =>
          set((state) => {
              if(element.parentId === null){
                state.rootIds.push(element.id);
              }else {
                if(!state.groupIds[element.parentId]){
                  state.groupIds[element.parentId] = [];
                }
                state.groupIds[element.parentId].push(element.id);
              } 
              state.elements[element.id] = element;
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
