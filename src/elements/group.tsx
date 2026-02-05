import type { ElementSchema } from "@/types";
import { Box, Paper, Stack, Title } from "@mantine/core";
import { IconFolder } from "@tabler/icons-react";

interface GroupProps {
    title: string;
}

export const GroupElement: ElementSchema<GroupProps> = {
    icon: IconFolder,
    displayName: "Group",
    defaultProps: {
        title: "Group"
    },
    propsSchema: {
        title: { type: "text", label: "Title" }
    },
    allowedChildren: ["title"],
    render: ({ props, children }) => {
        return (
            <Paper withBorder p="md">
                <Stack>
                    <Title order={4}>{props.title}</Title>
                    <Box>
                        {children}
                    </Box>
                </Stack>
            </Paper>
        );
    }
}