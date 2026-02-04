import { AppShell, Group } from "@mantine/core";
import { BuilderProvider } from "../components/builder-provider";
import { LeftBar } from "../components/left-bar";
import { Playground } from "../components/playground";
import { RightBar } from "../components/right-bar";
import { builderElementSchemas } from "../elements";

export function IndexPage() {
  return (
    <BuilderProvider elementSchemas={builderElementSchemas}>
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
