import { Box, Container } from "@mantine/core";
import { useShallow } from "zustand/shallow";
import { useBuilderStore } from "../hooks/use-builder-store";
import { ElementDropArea } from "./element-drop-area";
import { EmptyDropArea } from "./empty-drop-area/empty-drop-area";

export function Playground() {
  const stateLength = useBuilderStore(useShallow((state) => Object.values(state.state).length));

  return (
    <Container fluid>
      <Box
        w="100%"
        mx="auto"
        maw="800"
        py="lg"
      >
        {stateLength === 0 ? <EmptyDropArea /> : <ElementDropArea />}
      </Box>
    </Container>
  );
}
