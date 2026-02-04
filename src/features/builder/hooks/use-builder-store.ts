import { useStore } from "zustand";
import type { BuilderStore } from "../store";
import { useBuilderContext } from "./use-builder-context";

export function useBuilderStore<S>(selector: (state: BuilderStore) => S): S {
  const { store } = useBuilderContext();
  return useStore(store, selector);
}
