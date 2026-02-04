import { Stack, Text, Textarea, TextInput } from "@mantine/core";
import { useBuilderStore } from "../hooks/use-builder-store";
import { useBuilderContext } from "../hooks/use-builder-context";
import type { BuilderElementSchemaTypes } from "../elements";
import { useMemo } from "react";
import { useForm } from "@mantine/form";

interface ElementFormProps {
    elementId: string;
}

export function ElementForm({ elementId }: ElementFormProps) {
    const { elementSchemas } = useBuilderContext();
    const updateProperty = useBuilderStore((state) => state.handleUpdateProperty);
    const element = useBuilderStore((state) => state.elements[elementId]);
    const elementSchema = useMemo(() => elementSchemas[element.type as BuilderElementSchemaTypes], [element]);

    const form = useForm({
        mode: 'controlled',
        initialValues: {
            ...element.props
        },
        onValuesChange: (values) => {
            console.log(values);
        }
    })

    const renderFields = useMemo(() => {
        return Object.entries(elementSchema.propsSchema).map(([key, value]) => {
            switch (value.type) {
                case 'input':
                    return <TextInput key={key} label={value.label} {...form.getInputProps(key)} />
                case 'textarea':
                    return <Textarea key={key} label={value.label} {...form.getInputProps(key)} />
                default:
                    return null
            }
        })
    }, [elementSchema])



    return (
        <Stack>
            <Text size="sm" color="dimmed">Element Form - {elementSchema.displayName}</Text>
{renderFields}
        </Stack>
    )
}
