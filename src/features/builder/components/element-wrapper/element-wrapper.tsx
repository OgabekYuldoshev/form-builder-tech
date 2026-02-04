import { Box } from "@mantine/core";

import styles from "./element-wrapper.module.scss";
import type { ElementInstance } from "../../types";
import { useBuilderStore } from "../../hooks/use-builder-store";

interface ElementWrapperProps {
    children: React.ReactNode;
    element: ElementInstance;
}

export function ElementWrapper({ children, element }: ElementWrapperProps) {
    const handleSelect = useBuilderStore((state) => state.handleSelect);
    const selectedElementId = useBuilderStore((state) => state.selectedElementId);

    return (
        <Box
            data-selected={selectedElementId === element.id}
            className={styles.wrapper}
            onClick={() => handleSelect(element.id)}
        >
            {children}
        </Box>
    );
}
