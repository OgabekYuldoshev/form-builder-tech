import { EditorElement } from "./editor";
import { GridElement } from "./grid";
import { InputElement } from "./input";
import { TextareaElement } from "./textarea";
import { TitleElement } from "./title";

export const builderElementSchemas = {
  title: TitleElement,
  input: InputElement,
  textarea: TextareaElement,
  editor: EditorElement,
  grid: GridElement
};

export type BuilderElementSchemas = typeof builderElementSchemas;
export type BuilderElementSchemaTypes = keyof BuilderElementSchemas;
