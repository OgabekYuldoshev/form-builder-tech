import { Box } from "@mantine/core";

import styles from "./element-wrapper.module.scss";
import type { ElementInstance } from "../../types";
import { useBuilderStore } from "../../hooks/use-builder-store";
import { useEffect, useRef, useState } from "react";
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import {combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import invariant from "invariant";


interface ElementWrapperProps {
    children: React.ReactNode;
    element: ElementInstance;
}

export function ElementWrapper({ children, element }: ElementWrapperProps) {
    const [isDragging, setIsDragging] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);
    const handleSelect = useBuilderStore((state) => state.handleSelect);
    const selectedElementId = useBuilderStore((state) => state.selectedElementId);

    useEffect(() => {
        invariant(elementRef.current, "Element ref not found");

        return combine(
            draggable({
                element: elementRef.current,
                onDragStart(){
                    setIsDragging(true);
                },
                onDrop(){
                    setIsDragging(false);
                }
            }),
            dropTargetForElements({
                element: elementRef.current,
                onDrop(event){
                    console.log(event)
                }
            })
        )
    }, []);



    return (
        <Box
            ref={elementRef}
            data-selected={selectedElementId === element.id}
            data-dragging={isDragging}
            className={styles.wrapper}
            onClick={() => handleSelect(element.id)}
        >
            {children}
        </Box>
    );
}
