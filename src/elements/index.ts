import { TitleElement } from "./title";

export const builderElements = {
  title: TitleElement
};

export type BuilderElementKey = keyof typeof builderElements;

export type BuilderElement = (typeof builderElements)[BuilderElementKey];
