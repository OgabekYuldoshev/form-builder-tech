import { useContext } from "react";
import invariant from 'invariant'

import { BuilderContext } from "../context";

export function useBuilderContext() {
  const ctx = useContext(BuilderContext);

  invariant(ctx, "BuilderContext not found");

  return ctx;
}
