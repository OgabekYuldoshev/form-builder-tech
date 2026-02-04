import { Box, Flex, Text } from "@mantine/core";
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import type { BuilderElements, BuilderElementTypes } from "../../elements";
import styles from "./draggable-element.module.scss";
import { useEffect, useRef, useState } from "react";
import invariant from "invariant";

interface DraggableElementProps {
    type: BuilderElementTypes;
    schema: BuilderElements[BuilderElementTypes];
}
export function DraggableElement({ type, schema }: DraggableElementProps) {
    const elementRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const Icon = schema.icon;

    useEffect(() => {
        invariant(elementRef.current, "Element ref not found");

        return draggable({
            element: elementRef.current,
            onDragStart: () => setIsDragging(true),
            onDrop: () => setIsDragging(false),
        })
    }, [type])

    return (
        <Box ref={elementRef} className={styles.wrapper} data-dragging={isDragging}>
            <Flex
                align="center"
                gap="xs"
            >
                <Icon size={20} />
                <Text size="sm">{schema.displayName}</Text>
            </Flex>
        </Box>
    );
}
