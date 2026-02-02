import type { ReactNode } from "react";

export type SelectOption = { value: string; label: string };

export type PropSchemaBase = {
  label: string;
};

export type PropSchemaText = PropSchemaBase & { type: "text" };
export type PropSchemaNumber = PropSchemaBase & { type: "number" };
export type PropSchemaDate = PropSchemaBase & { type: "date" };

export type PropSchemaSelect = PropSchemaBase & {
  type: "select";
  options?: SelectOption[];
  optionsUrl?: string;
  optionsLoader?: () => Promise<SelectOption[]>;
};

export type PropSchemaCheckbox = PropSchemaBase & { type: "checkbox" };

/** Editable list of { value, label } for select/dropdown options in builder */
export type PropSchemaOptionsList = PropSchemaBase & { type: "optionsList" };

export type PropSchema =
  | PropSchemaText
  | PropSchemaNumber
  | PropSchemaDate
  | PropSchemaSelect
  | PropSchemaCheckbox
  | PropSchemaOptionsList;

export type PropSchemas<P extends Record<string, unknown>> = {
  [K in keyof P]: PropSchema;
};

export interface NodeInstance {
  id: string;
  type: string;
  props: Record<string, unknown>;
  /** Parent container instance id; null = root level */
  parentId: string | null;
  /** Order among siblings (same parentId) */
  sortOrder: number;
}

export interface NodeDefinition<P extends Record<string, unknown> = Record<string, unknown>> {
  type: string;
  label: string;
  defaultProps: P;
  propSchema: PropSchemas<P>;
  render: (props: P & { id: string; children?: ReactNode }) => ReactNode;
  /** If set, this node is a container; only these node types can be dropped inside */
  allowList?: string[];
}

/** Any node definition (for provider props). */
export type AnyNodeDefinition = NodeDefinition<Record<string, unknown>>;

export interface FormSchema {
  nodes: NodeInstance[];
}
