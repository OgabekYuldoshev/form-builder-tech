import invariant from "invariant";
import { useContext } from "react";
import { BuilderContext } from "@/context/builder-context";

export function useBuilderContext() {
  const context = useContext(BuilderContext);

  invariant(context, "useBuilderContext must be used within a BuilderProvider");

  return context;
}
