import type { Icon } from "@tabler/icons-react";

type WithChildren<T> = T & { children?: React.ReactNode };

interface AnyProps {
  [key: string]: string | number | boolean | null | undefined | AnyProps;
}

interface BaseField {
  label: string;
}

interface TextField extends BaseField {
  type: "text";
  placeholder?: string;
  validation?: (value: string) => boolean;
}

type SelectFieldOption = {
  label: string;
  value: string;
};

interface SelectField extends BaseField {
  type: "select";
  options: SelectFieldOption[];
  validation?: (value: string) => boolean;
}

interface NumberField extends BaseField {
  type: "number";
  placeholder?: string;
  validation?: (value: number) => boolean;
}

interface TextAreaField extends BaseField {
  type: "textarea";
  placeholder?: string;
  validation?: (value: string) => boolean;
}

type ElementPropField<_Value> = TextField | SelectField | NumberField | TextAreaField;

interface ElementNode<P = AnyProps> {
  id: string;
  type: string;
  props: P;
  parentId: string | null;
  position: number;
}

interface ElementSchema<P = AnyProps> {
  icon: Icon;
  displayName: string;
  defaultProps: P;
  propsSchema: {
    [Key in keyof P]: ElementPropField<P[Key]>;
  };
  render: (props: WithChildren<ElementNode<P>>) => React.ReactNode;
}

export type { ElementSchema, ElementNode, ElementPropField, SelectFieldOption };
