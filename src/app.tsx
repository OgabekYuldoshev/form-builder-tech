import { AppShell, Group, Text } from '@mantine/core';

export function App() {

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'md', collapsed: { mobile: true } }}
      aside={{ width: 300, breakpoint: 'md', collapsed: { mobile: true } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          Header
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">Navbar</AppShell.Navbar>
      <AppShell.Main>
        <Text>This is the main section, your app content here.</Text>
        <Text>AppShell example with all elements: Navbar, Header, Aside, Footer.</Text>
        <Text>All elements except AppShell.Main have fixed position.</Text>
        <Text>Aside is hidden on on md breakpoint and cannot be opened when it is collapsed</Text>
      </AppShell.Main>
      <AppShell.Aside p="md">Aside</AppShell.Aside>
    </AppShell>
  );
}