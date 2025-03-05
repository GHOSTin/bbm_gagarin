import { IconChevronRight } from '@tabler/icons-react';
import { Avatar, Group, Text, UnstyledButton } from '@mantine/core';
import classes from './UserButton.module.css';
import { useAtomValue } from 'jotai';
import { currentUser } from '@/atoms.ts';

export function UserButton() {
  const userProfile = useAtomValue(currentUser)
  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
          radius="xl"
        />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {(userProfile?.profile && `${userProfile?.profile?.firstName} ${userProfile?.profile?.lastName}`) || userProfile?.name}
          </Text>

          <Text c="dimmed" size="xs">
            {userProfile?.email}
          </Text>
        </div>

        <IconChevronRight size={14} stroke={1.5} />
      </Group>
    </UnstyledButton>
  );
}