import React from 'react';
import { NavbarSimple } from '@/components/ui/Navbar/Navbar.tsx';
import { useDisclosure } from '@mantine/hooks';
import { AppShell, Avatar, Burger, Group, Text } from '@mantine/core';
import { NavLink, Outlet } from 'react-router-dom';

export const NavSidebarLayout: React.FC<React.PropsWithChildren> = ({children}) => {
  const [ opened, { toggle } ] = useDisclosure()
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header p="sm">
        <Group justify="space-between">
          <NavLink to={'/'} >
          <Group>
            <Avatar
              variant={"outline"}
              radius="xl"
              color="blue"
              style={{border: 'var(--mantine-color-blue-light-color) solid 2px'}}
              src="https://fokgagarin.ru/wp-content/themes/template/img/gag.png"/>
            <Text component="h1">Дневник</Text>
          </Group>
          </NavLink>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
          </Group>
      </AppShell.Header>

      <AppShell.Navbar><NavbarSimple/></AppShell.Navbar>

      <AppShell.Main>{children} <Outlet/></AppShell.Main>
    </AppShell>
  );
}