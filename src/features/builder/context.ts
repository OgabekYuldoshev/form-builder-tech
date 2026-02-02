import { createContext } from "react";
import type { StoreApi } from "zustand";
import type { FormBuilderStore } from "./store";

interface FormBuilderContextProps {
  store: StoreApi<FormBuilderStore>;
}

const FormBuilderContext = createContext<FormBuilderContextProps | null>(null);

export { FormBuilderContext, type FormBuilderContextProps };
