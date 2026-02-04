import { Box, Container } from "@mantine/core";
import { ElementDropZone } from "./element-drop-zone";

export function Playground() {

  return (
    <Container fluid>
      <Box
        w="100%"
        mx="auto"
        maw="800"
        py="lg"
      >
        <ElementDropZone parentId={null}/>
      </Box>
    </Container>
  );
}
