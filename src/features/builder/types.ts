import type { Icon } from "@tabler/icons-react";
import type { BuilderElementSchemas, BuilderElementSchemaTypes } from "./elements";

type AnyProps = Record<string, unknown>;

type SelectFieldOption = { value: string; label: string };

type InputField = {
  type: "input";
  placeholder: string;
};

type SelectField = {
  type: "select";
  options: SelectFieldOption[];
};

type TextAreaField = {
  type: "textarea";
  placeholder: string;
};

type NumberField = {
  type: "number";
  placeholder: string;
};

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
  propsSchema: {
    [K in keyof P]: PropField<P[K]>;
  };
  render: (props: ElementInstance<P>) => React.ReactNode;
}

type StarterDraggableElementData = {
  sourceType: "starter";
  type: BuilderElementSchemaTypes
  schema: BuilderElementSchemas[BuilderElementSchemaTypes]
}

type DraggableElementData = {
  sourceType: "element";
  elementInstance: ElementInstance;
};

export type { ElementInstance, ElementSchema, PropField, SelectFieldOption, StarterDraggableElementData, DraggableElementData };
