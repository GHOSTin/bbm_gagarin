import React from 'react';
import { NavbarSimple } from '@/components/ui/Navbar/Navbar.tsx';
import { useDisclosure } from '@mantine/hooks';
import {
  ActionIcon,
  AppShell,
  Avatar,
  Burger,
  Group,
  Text,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import cx from 'clsx';
import { NavLink, Outlet } from 'react-router-dom';
import { IconMoon, IconSun } from '@tabler/icons-react';
import classes from './navSidebarLayout.module.css';

export const NavSidebarLayout: React.FC<React.PropsWithChildren> = ({children}) => {
  const [ opened, { toggle } ] = useDisclosure();
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
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
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <ActionIcon
              onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
              variant="default"
              size="lg"
              aria-label="Toggle color scheme"
            >
              <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
              <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar><NavbarSimple/></AppShell.Navbar>
      <AppShell.Main>{children} <Outlet/></AppShell.Main>
    </AppShell>
  );
}