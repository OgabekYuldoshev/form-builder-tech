import { reorder } from "@atlaskit/pragmatic-drag-and-drop/reorder";
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
  handleMove: (elementId: string, targetPosition: number) => void;
  handleDelete: (elementId: string) => void;
  handleSelect: (elementId: string) => void;
}

const createBuilderStore = (initialData?: Partial<BuilderStore>) => {
  return createStore<BuilderStore>()(
    loggerMiddleware(
      immer((set) => ({
        elements: {},
        rootIds: [],
        groupIds: {},
        selectedElementId: null,
        ...initialData,
        handleInsert: (element) =>
          set((state) => {
            if (element.parentId === null) {
              state.rootIds = [
                ...state.rootIds.slice(0, element.position),
                element.id,
                ...state.rootIds.slice(element.position)
              ];

              state.rootIds.forEach((id, index) => {
                if (state.elements[id]) {
                  state.elements[id].position = index;
                } else {
                  state.elements[id] = element;
                }
              });
            } else {
              if (!state.groupIds[element.parentId]) {
                state.groupIds[element.parentId] = [];
              }
              let groupIds = state.groupIds[element.parentId];
              groupIds = [
                ...groupIds.slice(0, element.position),
                element.id,
                ...groupIds.slice(element.position)
              ];

              groupIds.forEach((id, index) => {
                if (state.elements[id]) {
                  state.elements[id].position = index;
                } else {
                  state.elements[id] = element;
                }
              });
            }
          }),
        handleMove: (elementId, targetPosition) =>
          set((state) => {
            const element = state.elements[elementId];
            if (element.parentId === null) {
              state.rootIds = reorder({
                list: state.rootIds,
                startIndex: element.position,
                finishIndex: targetPosition
              });

              state.rootIds.forEach((id, index) => {
                if (state.elements[id]) {
                  state.elements[id].position = index;
                }
              });
            }
          }),
        handleDelete: (elementId) =>
          set((state) => {
            delete state.elements[elementId];
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
