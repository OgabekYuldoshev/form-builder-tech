import {
  Button,
  Checkbox,
  Group,
  NumberInput,
  Select,
  Stack,
  Text,
  TextInput
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useBuilderStore } from "../hooks/use-builder-store";
import type { PropSchema, SelectOption } from "../types";

function useSelectOptions(schema: PropSchema & { type: "select" }): {
  data: SelectOption[];
  loading: boolean;
  error: string | null;
} {
  const [data, setData] = useState<SelectOption[]>(schema.options ?? []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (schema.options?.length) {
      setData(schema.options);
      setLoading(false);
      setError(null);
      return;
    }
    if (schema.optionsUrl) {
      setLoading(true);
      setError(null);
      fetch(schema.optionsUrl)
        .then((res) => res.json())
        .then((json: SelectOption[]) => {
          setData(Array.isArray(json) ? json : []);
          setLoading(false);
        })
        .catch((err) => {
          setError(err?.message ?? "Failed to load options");
          setLoading(false);
        });
      return;
    }
    if (schema.optionsLoader) {
      setLoading(true);
      setError(null);
      schema
        .optionsLoader()
        .then((opts) => {
          setData(opts ?? []);
          setLoading(false);
        })
        .catch((err) => {
          setError(err?.message ?? "Failed to load options");
          setLoading(false);
        });
      return;
    }
  }, [schema.options, schema.optionsUrl, schema.optionsLoader]);

  return { data, loading, error };
}

function SelectPropField({
  schema,
  value,
  onChange
}: {
  schema: PropSchema & { type: "select" };
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  const { data, loading, error } = useSelectOptions(schema);
  return (
    <Select
      label={schema.label}
      data={data}
      value={typeof value === "string" ? value : null}
      onChange={(v) => onChange(v ?? "")}
      disabled={loading}
      error={error ?? undefined}
    />
  );
}

function PropField({
  schema,
  value,
  onChange
}: {
  schema: PropSchema;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  if (schema.type === "text") {
    return (
      <TextInput
        label={schema.label}
        value={String(value ?? "")}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    );
  }
  if (schema.type === "number") {
    return (
      <NumberInput
        label={schema.label}
        value={typeof value === "number" ? value : undefined}
        onChange={(v) => onChange(v)}
      />
    );
  }
  if (schema.type === "date") {
    return (
      <TextInput
        label={schema.label}
        type="date"
        value={typeof value === "string" ? value : ""}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    );
  }
  if (schema.type === "select") {
    return (
      <SelectPropField
        schema={schema}
        value={value}
        onChange={onChange}
      />
    );
  }
  if (schema.type === "checkbox") {
    return (
      <Checkbox
        label={schema.label}
        checked={value === true}
        onChange={(e) => onChange(e.currentTarget.checked)}
      />
    );
  }
  if (schema.type === "optionsList") {
    const options = Array.isArray(value) ? (value as SelectOption[]) : [];
    return (
      <Stack gap="xs">
        <Text
          size="sm"
          fw={500}
        >
          {schema.label}
        </Text>
        {options.map((opt, i) => (
          <Group
            key={`${schema.label}-${String(opt.value)}-${String(opt.label)}-${i}`}
            gap="xs"
            align="flex-end"
          >
            <TextInput
              placeholder="Value"
              size="xs"
              value={opt.value}
              onChange={(e) => {
                const next = [...options];
                next[i] = { ...next[i], value: e.currentTarget.value };
                onChange(next);
              }}
            />
            <TextInput
              placeholder="Label"
              size="xs"
              value={opt.label}
              onChange={(e) => {
                const next = [...options];
                next[i] = { ...next[i], label: e.currentTarget.value };
                onChange(next);
              }}
            />
            <Button
              size="xs"
              variant="subtle"
              color="red"
              onClick={() => {
                const next = options.filter((_, j) => j !== i);
                onChange(next);
              }}
            >
              ×
            </Button>
          </Group>
        ))}
        <Button
          size="xs"
          variant="light"
          onClick={() => onChange([...options, { value: "", label: "" }])}
        >
          + Option qo‘shish
        </Button>
      </Stack>
    );
  }
  return null;
}

export function RightBar() {
  const selectedId = useBuilderStore((state) => state.selectedId);
  const instances = useBuilderStore((state) => state.instances);
  const definitions = useBuilderStore((state) => state.definitions);
  const updateInstance = useBuilderStore((state) => state.updateInstance);

  const instance = selectedId ? instances.find((i) => i.id === selectedId) : null;
  const def = instance ? definitions[instance.type] : null;

  if (!selectedId || !instance || !def) {
    return (
      <Stack>
        <Text
          color="dimmed"
          size="sm"
        >
          Select a node
        </Text>
      </Stack>
    );
  }

  const propSchema = def.propSchema as Record<string, PropSchema>;

  return (
    <Stack>
      <Text
        color="dimmed"
        fw={600}
        size="sm"
      >
        Properties — {def.label}
      </Text>
      <Stack gap="md">
        {Object.entries(propSchema).map(([key, schema]) => (
          <PropField
            key={key}
            schema={schema}
            value={instance.props[key]}
            onChange={(value) => updateInstance(instance.id, { ...instance.props, [key]: value })}
          />
        ))}
      </Stack>
    </Stack>
  );
}
