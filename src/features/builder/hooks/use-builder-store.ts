import { useStore } from "zustand";
import type { FormBuilderStore } from "../store";
import { useBuilderContext } from "./use-builder-context";

export function useBuilderStore<T>(selector: (state: FormBuilderStore) => T) {
  const { store } = useBuilderContext();

  return useStore(store, (state) => selector(state as FormBuilderStore));
}
