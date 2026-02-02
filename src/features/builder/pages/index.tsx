import { AppShell, Button, Group, Text } from "@mantine/core";
import { useState } from "react";
import { FormBuilderProvider } from "../components/form-builder-provider";
import { LeftBar } from "../components/left-bar";
import { Playground } from "../components/playground";
import { RightBar } from "../components/right-bar";
import { useBuilderStore } from "../hooks/use-builder-store";
import {
  CheckboxNode,
  DatePickerNode,
  GroupNode,
  HeaderNode,
  InfoBlockNode,
  InputNode,
  OptionsFieldNode,
  ParagraphNode,
  SelectNode,
  SubtitleNode,
  TextareaNode,
  TitleNode
} from "../nodes";
import type { AnyNodeDefinition, FormSchema } from "../types";

const builderNodes = [
  TitleNode,
  SubtitleNode,
  ParagraphNode,
  InfoBlockNode,
  GroupNode,
  HeaderNode,
  InputNode,
  TextareaNode,
  DatePickerNode,
  OptionsFieldNode,
  SelectNode,
  CheckboxNode
] as unknown as AnyNodeDefinition[];
const COPIED_MESSAGE_MS = 2000;

function ExportSchemaButton() {
  const instances = useBuilderStore((state) => state.instances);
  const [copied, setCopied] = useState(false);

  const handleExport = () => {
    const schema: FormSchema = { nodes: instances };
    const json = JSON.stringify(schema, null, 2);
    void navigator.clipboard.writeText(json).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), COPIED_MESSAGE_MS);
    });
  };

  return (
    <Button
      variant="light"
      size="xs"
      onClick={handleExport}
    >
      {copied ? "Copied!" : "Export schema"}
    </Button>
  );
}

export function IndexPage() {
  return (
    <FormBuilderProvider nodes={builderNodes}>
      <AppShell
        header={{ height: 60 }}
        navbar={{ width: 280, breakpoint: "md", collapsed: { mobile: true } }}
        aside={{ width: 280, breakpoint: "md", collapsed: { mobile: true } }}
        padding="md"
      >
        <AppShell.Header>
          <Group
            h="100%"
            px="md"
            justify="space-between"
          >
            <Text fw={600}>Form Builder</Text>
            <ExportSchemaButton />
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          <LeftBar />
        </AppShell.Navbar>
        <AppShell.Main>
          <Playground />
        </AppShell.Main>
        <AppShell.Aside p="md">
          <RightBar />
        </AppShell.Aside>
      </AppShell>
    </FormBuilderProvider>
  );
}
