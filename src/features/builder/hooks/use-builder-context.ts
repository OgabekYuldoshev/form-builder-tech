import { useContext } from "react";
import { FormBuilderContext } from "../context";

export function useBuilderContext() {
  const context = useContext(FormBuilderContext);

  if (!context) {
    throw new Error("useBuilderContext must be used within a FormBuilderProvider");
  }
  return context;
}
