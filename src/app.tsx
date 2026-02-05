import { AppShell } from "@mantine/core";
import { Aside } from "./components/aside";
import { BuilderProvider } from "./components/builder-provider";
import { Header } from "./components/header";
import { Navbar } from "./components/navbar";
import { Playground } from "./components/playground";
import { builderElements } from "./elements";

export function App() {
  return (
    <BuilderProvider elementSchema={builderElements}>
      <AppShell
        header={{ height: 60 }}
        aside={{ width: 300, breakpoint: "sm", collapsed: { mobile: true } }}
        navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: true } }}
        p="md"
      >
        <AppShell.Header>
          <Header />
        </AppShell.Header>
        <AppShell.Navbar>
          <Navbar />
        </AppShell.Navbar>
        <AppShell.Main>
          <Playground />
        </AppShell.Main>
        <AppShell.Aside>
          <Aside />
        </AppShell.Aside>
      </AppShell>
    </BuilderProvider>
  );
}
