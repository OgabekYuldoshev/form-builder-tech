import React from 'react'
import { Paper, SimpleGrid, Title } from '@mantine/core';

interface DroppableGridProps {
    elementId: string;
    cols: number;
    children?: React.ReactNode[];
}

export function DroppableGrid({ elementId, cols, children }: DroppableGridProps) {
    if (!children?.length) {
        return (
            <Paper id={elementId} withBorder p="md">
                <Title order={3}>DroppableGrid</Title>
            </Paper>
        );
    }
    return (
        <SimpleGrid cols={cols}>{children}</SimpleGrid>
    )
}
