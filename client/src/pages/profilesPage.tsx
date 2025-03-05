import React, { useEffect, useState } from 'react';
import { ActionIcon, Avatar, Checkbox, Group, ScrollArea, Skeleton, Table, Text } from '@mantine/core';
import apiClient from '@/shared/axios.apiClient.ts';
import cx from 'clsx';
import classes from './profilesPage.module.css'
import { UserEntity } from '@/shared/models';
import { IconUser } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export const ProfilesPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selection, setSelection] = useState<string[]>([]);
  const [profilesList, setProfilesList] = useState<UserEntity[]>([])
  const toggleRow = (id: string) =>
    setSelection((current) => {
      return current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    });
  const toggleAll = () =>
    setSelection((current) => (current.length === profilesList.length ? [] : profilesList.map((item) => `${item.id}`)));

  useEffect(() => {
    const fetchData = async () =>{
      setLoading(true);
      try {
        const {data: response} = await apiClient.get('/users');
        setProfilesList(response);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const editProfile = (id: number | string) => {
    navigate(`/profiles/${id}`);
  }

  const rows = profilesList.map((item) => {
    const selected = selection.includes(`${item.id}`);
    return (
      <Table.Tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
        <Table.Td>
          <Checkbox checked={selection.includes(`${item.id}`)} onChange={() => toggleRow(`${item.id}`)} />
        </Table.Td>
        <Table.Td>
          <Group gap="sm">
            <Avatar size={26} src={item.name} radius={26} />
            <Text size="sm" fw={500}>
              {item.name}
            </Text>
          </Group>
        </Table.Td>
        <Table.Td>{item.email}</Table.Td>
        <Table.Td>{item.profile?.phone}</Table.Td>
        <Table.Td>
          <ActionIcon variant={'outline'} onClick={()=> editProfile(item.id)}>
            <IconUser style={{ width: '70%', height: '70%' }} stroke={1.5}/>
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <>
      <Skeleton visible={loading}>
      <ScrollArea>
        <Table miw={800} verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th w={40}>
                <Checkbox
                  onChange={toggleAll}
                  checked={selection.length === profilesList.length}
                  indeterminate={selection.length > 0 && selection.length !== profilesList.length}
                />
              </Table.Th>
              <Table.Th>ФИО</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Телефон</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
      </Skeleton>
    </>
  );
}