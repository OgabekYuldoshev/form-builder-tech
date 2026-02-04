import { EditorElement } from "./editor";
import { InputElement } from "./input";
import { TextareaElement } from "./textarea";
import { TitleElement } from "./title";

export const builderElementSchemas = {
  title: TitleElement,
  input: InputElement,
  textarea: TextareaElement,
  editor: EditorElement
};

export type BuilderElementSchemas = typeof builderElementSchemas;
export type BuilderElementSchemaTypes = keyof BuilderElementSchemas;
