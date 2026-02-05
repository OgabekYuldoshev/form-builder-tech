import type { Icon } from "@tabler/icons-react";
import type { JSX } from "react";
import type { BuilderElementSchemas, BuilderElementSchemaTypes } from "./elements";

type WithAllowedChildren<T> = T & { children?: JSX.Element };

type AnyProps = Record<string, unknown>;

type SelectFieldOption = { value: string; label: string };
type BaseField = {
  label: string;
};

interface InputField extends BaseField {
  type: "input";
  placeholder?: string;
}

interface SelectField extends BaseField {
  type: "select";
  options: SelectFieldOption[];
}

interface TextAreaField extends BaseField {
  type: "textarea";
  placeholder?: string;
}

interface NumberField extends BaseField {
  type: "number";
  placeholder?: string;
}

type PropField<_Value> = InputField | SelectField | TextAreaField | NumberField;

interface ElementInstance<P = AnyProps> {
  id: string;
  type: string;
  props: P;
  parentId: string | null;
  position: number;
}

interface ElementSchema<P = AnyProps> {
  displayName: string;
  icon: Icon;
  defaultProps: P;
  allowedChildren?: string[];
  propsSchema: {
    [K in keyof P]: PropField<P[K]>;
  };
  render: (props: WithAllowedChildren<ElementInstance<P>>) => React.ReactNode;
}

type StarterDraggableElementData = {
  sourceType: "starter";
  type: BuilderElementSchemaTypes;
  schema: BuilderElementSchemas[BuilderElementSchemaTypes];
};

type DraggableElementData = {
  sourceType: "element";
  elementInstance: ElementInstance;
};

export type {
  ElementInstance,
  ElementSchema,
  PropField,
  SelectFieldOption,
  StarterDraggableElementData,
  DraggableElementData,
  WithAllowedChildren
};
