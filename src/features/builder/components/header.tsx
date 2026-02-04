import { Button, Flex, Title } from "@mantine/core";
import { IconFileExport } from "@tabler/icons-react";
import { useBuilderStore } from "../hooks/use-builder-store";
import { notifications } from "@mantine/notifications";

export function Header() {
  const elements = useBuilderStore(state=>state.elements)

  function handleExportSchema() {
    navigator.clipboard.writeText(JSON.stringify(elements))
    notifications.show({
      title: "Schema exported",
      message: "Schema exported to clipboard",
      color: "green",
    })
  }

  return (
    <Flex justify="space-between" align="center" w="100%">
      <Title order={2}>Form Builder</Title>
      <Button leftSection={<IconFileExport size={16} />} onClick={handleExportSchema}>
        Export schema
      </Button>
    </Flex>
  )
}
