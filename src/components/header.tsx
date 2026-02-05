import { Button, Flex, Group, Title } from "@mantine/core";

export function Header() {
  return (
    <Flex
      justify="space-between"
      align="center"
      px="md"
      h="100%"
    >
      <Title order={2}>Form Builder</Title>
      <Group>
        <Button>Export JSON Schema</Button>
      </Group>
    </Flex>
  );
}
