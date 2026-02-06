import { GridElement } from "./grid";
import { GroupElement } from "./group";
import { InputElement } from "./input";
import { TitleElement } from "./title";

export const builderElements = {
  title: TitleElement,
  input: InputElement,
  group: GroupElement,
  grid: GridElement
};

export type BuilderElementKey = keyof typeof builderElements;

export type BuilderElementSchema = (typeof builderElements)[BuilderElementKey];
