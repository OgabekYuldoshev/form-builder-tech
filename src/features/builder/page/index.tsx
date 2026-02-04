import { AppShell, Group } from "@mantine/core";
import { BuilderProvider } from "../components/builder-provider";
import { LeftBar } from "../components/left-bar";
import { Playground } from "../components/playground";
import { RightBar } from "../components/right-bar";
import { builderElementSchemas } from "../elements";

const defaultData = {
  "a7fd7bdc-fd11-41db-ae3c-7995b71bd7bd": {
    id: "a7fd7bdc-fd11-41db-ae3c-7995b71bd7bd",
    type: "title",
    props: {
      content: "Title"
    },
    parentId: null,
    position: 1
  },
  "83def81d-f032-4b5c-b5b5-3187077ccd8b": {
    id: "83def81d-f032-4b5c-b5b5-3187077ccd8b",
    type: "input",
    props: {
      label: "Input",
      placeholder: "Input"
    },
    parentId: null,
    position: 2
  },
  "2495bb7c-cc03-4744-a940-52e7c0b81d93": {
    id: "2495bb7c-cc03-4744-a940-52e7c0b81d93",
    type: "textarea",
    props: {
      label: "Textarea",
      placeholder: "Textarea placeholder",
      rows: 4
    },
    parentId: null,
    position: 0
  }
};

export function IndexPage() {
  return (
    <BuilderProvider
      elementSchemas={builderElementSchemas}
      defaultData={defaultData}
    >
      <AppShell
        header={{ height: 60 }}
        navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: true } }}
        aside={{ width: 300, breakpoint: "sm", collapsed: { mobile: true } }}
        padding="md"
      >
        <AppShell.Header>
          <Group
            h="100%"
            px="md"
          >
            Header
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
    </BuilderProvider>
  );
}
