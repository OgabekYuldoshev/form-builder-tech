import { InputElement } from "./input";
import { TitleElement } from "./title";

export const builderElementSchemas = {
  title: TitleElement,
  input: InputElement
};

export type BuilderElementSchemas = typeof builderElementSchemas;
export type BuilderElementSchemaTypes = keyof BuilderElementSchemas;
