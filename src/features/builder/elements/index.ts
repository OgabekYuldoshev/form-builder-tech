import { InputElement } from "./input";
import { TitleElement } from "./title";

export const builderElements = {
  title: TitleElement,
  input: InputElement
};

export type BuilderElements = typeof builderElements;
export type BuilderElementTypes = keyof BuilderElements;
