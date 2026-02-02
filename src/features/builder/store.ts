import { createStore } from "zustand";
import { immer } from "zustand/middleware/immer";
import { loggerMiddleware } from "../../lib/zustand-logger";
import type { NodeDefinition, NodeInstance } from "./types";

function normalizeSortOrders(instances: NodeInstance[], parentId: string | null): void {
  const siblings = instances
    .filter((i) => i.parentId === parentId)
    .sort((a, b) => a.sortOrder - b.sortOrder);
  for (let i = 0; i < siblings.length; i++) {
    siblings[i].sortOrder = i;
  }
}

interface FormBuilderStore {
  definitions: Record<string, NodeDefinition>;
  instances: NodeInstance[];
  selectedId: string | null;
  addInstance: (type: string, options?: { parentId?: string | null; position?: number }) => void;
  updateInstance: (id: string, props: Record<string, unknown>) => void;
  removeInstance: (id: string) => void;
  reorderInParent: (parentId: string | null, fromIndex: number, toIndex: number) => void;
  moveInstance: (instanceId: string, targetParentId: string | null, targetIndex: number) => void;
  setSelectedId: (id: string | null) => void;
  getChildren: (parentId: string | null) => NodeInstance[];
}

function createFormBuilderStore(initialStore?: Partial<Pick<FormBuilderStore, "definitions">>) {
  return createStore<FormBuilderStore>()(
    loggerMiddleware(
      immer((set, get) => ({
        definitions: initialStore?.definitions ?? {},
        instances: [],
        selectedId: null,

        getChildren: (parentId: string | null) => {
          const state = get();
          return state.instances
            .filter((i) => i.parentId === parentId)
            .sort((a, b) => a.sortOrder - b.sortOrder);
        },

        addInstance: (type: string, options?: { parentId?: string | null; position?: number }) =>
          set((state) => {
            const def = state.definitions[type];
            if (!def) return;
            const parentId = options?.parentId ?? null;
            const siblings = state.instances
              .filter((i) => i.parentId === parentId)
              .sort((a, b) => a.sortOrder - b.sortOrder);
            const position = options?.position ?? siblings.length;
            const safePosition = Math.max(0, Math.min(position, siblings.length));
            const id = crypto.randomUUID();
            const props = { ...def.defaultProps } as Record<string, unknown>;
            const instance: NodeInstance = { id, type, props, parentId, sortOrder: safePosition };
            state.instances.push(instance);
            for (const s of siblings) {
              if (s.sortOrder >= safePosition) s.sortOrder += 1;
            }
            normalizeSortOrders(state.instances, parentId);
          }),

        updateInstance: (id: string, props: Record<string, unknown>) =>
          set((state) => {
            const idx = state.instances.findIndex((i) => i.id === id);
            if (idx !== -1) {
              state.instances[idx].props = { ...state.instances[idx].props, ...props };
            }
          }),

        removeInstance: (id: string) =>
          set((state) => {
            const instance = state.instances.find((i) => i.id === id);
            if (!instance) return;
            const siblings = state.instances.filter((i) => i.parentId === instance.parentId);
            const maxOrder = siblings.length ? Math.max(...siblings.map((i) => i.sortOrder)) : -1;
            let nextOrder = maxOrder + 1;
            for (const c of state.instances.filter((i) => i.parentId === id)) {
              c.parentId = instance.parentId;
              c.sortOrder = nextOrder++;
            }
            const idx = state.instances.findIndex((i) => i.id === id);
            if (idx !== -1) state.instances.splice(idx, 1);
            if (state.selectedId === id) state.selectedId = null;
            normalizeSortOrders(state.instances, instance.parentId);
          }),

        reorderInParent: (parentId: string | null, fromIndex: number, toIndex: number) =>
          set((state) => {
            const siblings = state.instances
              .filter((i) => i.parentId === parentId)
              .sort((a, b) => a.sortOrder - b.sortOrder);
            if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0 || toIndex >= siblings.length)
              return;
            const [removed] = siblings.splice(fromIndex, 1);
            if (!removed) return;
            siblings.splice(toIndex, 0, removed);
            for (let i = 0; i < siblings.length; i++) {
              siblings[i].sortOrder = i;
            }
          }),

        moveInstance: (instanceId: string, targetParentId: string | null, targetIndex: number) =>
          set((state) => {
            const instance = state.instances.find((i) => i.id === instanceId);
            if (!instance) return;
            const targetContainer = state.instances.find((i) => i.id === targetParentId);
            const targetDef =
              targetParentId && targetContainer
                ? state.definitions[targetContainer.type]
                : undefined;
            if (targetDef?.allowList && !targetDef.allowList.includes(instance.type)) return;
            const oldParentId = instance.parentId;
            instance.parentId = targetParentId;
            const targetSiblings = state.instances
              .filter((i) => i.parentId === targetParentId && i.id !== instanceId)
              .sort((a, b) => a.sortOrder - b.sortOrder);
            const safeIndex = Math.max(0, Math.min(targetIndex, targetSiblings.length));
            instance.sortOrder = safeIndex;
            for (const s of targetSiblings) {
              if (s.sortOrder >= safeIndex) s.sortOrder += 1;
            }
            normalizeSortOrders(state.instances, targetParentId);
            normalizeSortOrders(state.instances, oldParentId);
          }),

        setSelectedId: (id: string | null) =>
          set((state) => {
            state.selectedId = id;
          })
      }))
    )
  );
}

export { createFormBuilderStore, type FormBuilderStore };
