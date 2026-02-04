import { NumberInput, Select, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { useMemo } from "react";
import type { BuilderElementSchemaTypes } from "../elements";
import { useBuilderContext } from "../hooks/use-builder-context";
import { useBuilderStore } from "../hooks/use-builder-store";

interface ElementFormProps {
  elementId: string;
}

export function ElementForm({ elementId }: ElementFormProps) {
  const { elementSchemas } = useBuilderContext();
  const handleUpdateProperty = useBuilderStore((state) => state.handleUpdateProperty);
  const element = useBuilderStore((state) => state.elements[elementId]);
  const elementSchema = useMemo(
    () => elementSchemas[element.type as BuilderElementSchemaTypes],
    [element]
  );

  const renderFields = useMemo(() => {
    return Object.entries(elementSchema.propsSchema).map(([key, value]) => {
      switch (value.type) {
        case "input":
          return (
            <TextInput
              key={key}
              label={value.label}
              defaultValue={(element.props[key] as string) || ""}
              onChange={(event) => handleUpdateProperty(elementId, { [key]: event.target.value })}
            />
          );
        case "textarea":
          return (
            <Textarea
              key={key}
              label={value.label}
              defaultValue={(element.props[key] as string) || ""}
              onChange={(event) => handleUpdateProperty(elementId, { [key]: event?.target.value })}
            />
          );
        case "select":
          return (
            <Select
              key={key}
              label={value.label}
              defaultValue={(String(element.props[key]) as string) || ""}
              data={value.options}
              onChange={(value) => handleUpdateProperty(elementId, { [key]: value })}
            />
          );
        case "number":
          return (
            <NumberInput
              key={key}
              label={value.label}
              defaultValue={(element.props[key] as number) || 0}
              onChange={(value) => handleUpdateProperty(elementId, { [key]: +value })}
            />
          );
        default:
          return null;
      }
    });
  }, [elementSchema]);

  return (
    <Stack>
      <Text
        size="sm"
        color="dimmed"
      >
        Element Form - {elementSchema.displayName}
      </Text>
      {renderFields}
    </Stack>
  );
}
