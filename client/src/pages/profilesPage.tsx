import React, { useEffect, useState } from 'react';
import {
  ActionIcon,
  Avatar, Badge, Box, Button,
  Checkbox, Container,
  Group,
  ScrollArea,
  Skeleton,
  Table,
  Text,
  TextInput,
} from '@mantine/core';
import apiClient from '@/shared/axios.apiClient.ts';
import cx from 'clsx';
import classes from './profilesPage.module.css'
import { UserEntity } from '../shared/types';
import { IconPlus, IconSearch, IconUser } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useDisclosure, useListState } from '@mantine/hooks';
import * as scales from '@/components/ui/testHolland/scalesDescription.json';

const roleColors: Record<string, string> = {
  user: 'green',
  moderator: 'cyan',
  admin: 'pink',
};

type scalesDescripteionType = keyof typeof scales

export const ProfilesPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [selection, setSelection] = useState<string[]>([]);
  const [profilesList, setProfilesList] = useState<UserEntity[]>([]);
  const [search, setSearch] = useState('');
  const [asideOpened, {toggle: toggleAside}] = useDisclosure();
  const [values, handlers] = useListState<{id: string, name: string, checked: boolean}>([]);

  const toggleRow = (id: string) =>
    setSelection((current) => {
      return current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    });
  const toggleAll = () =>
    setSelection((current) => (current.length === profilesList.length ? [] : profilesList.map((item) => `${item.id}`)));

  useEffect(() => {
    const fetchProfilesData = async () =>{
      setLoading(true);
      try {
        const {data: response} = await apiClient.get('/users');
        setProfilesList(response);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
    fetchProfilesData();
  }, []);

  useEffect(() => {
    const fetchProfTestsData = async () => {
      setLoading(true);
      try {
        const {data: response} = await apiClient.get('/prof-tests');
        handlers.setState(response);
      } catch (error) {
        console.log(error)
      }
      setLoading(false);
    }
    asideOpened?fetchProfTestsData():null
  }, [asideOpened]);

  const editProfile = (id: number | string) => {
    navigate(`/profiles/${id}`);
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
  };

  const handleApplyProfTests = async (event: React.FormEvent) => {
    event.preventDefault();
    const profTestsId = values.filter((value)=>value.checked).map((value)=>value.id);
    const usersId = selection.map((value)=> parseInt(value));
    console.log(profTestsId)
    try {
      const response = await apiClient.patch('/prof-tests/users', {usersId, profTestsId});
      if(response.status === 200) {
        handlers.setState(values.map((elem)=>({...elem, checked: false})))
      }
    } catch (e) {
      console.log(e)
    }
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
        {!asideOpened ? (
          <>
            <Table.Td>{item.email}</Table.Td>
            <Table.Td>{item.profile?.phone}</Table.Td>
            <Table.Td w={120}>
              <Badge color = {roleColors[item.role.toLowerCase()]} fullWidth variant="light">
               {item.role}
              </Badge>
            </Table.Td>
          </>
        ): (
        <Table.Td>
          {scales[item.completedTests?.filter((test)=>test.type === 'holland')[0]?.result.scale as scalesDescripteionType]?.name??''}
        </Table.Td>
        )}
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
          <Group mt={10} mb={10}>
            <Button size={'xs'}>
              <IconPlus />
              Добавить профиль
            </Button>
            <Button size={'xs'} onClick={toggleAside}>
              Назначить профпробы
            </Button>
          </Group>
          <TextInput
            placeholder="Поиск"
            mb="md"
            leftSection={<IconSearch size={16} stroke={1.5} />}
            value={search}
            onChange={handleSearchChange}
          />
          <Container fluid display={'flex'}>
            <Box w={asideOpened?'calc(100% - 400px )':'100%'}>
          <Table verticalSpacing="sm" >
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
                {!asideOpened ? (
                <>
                <Table.Th>Email</Table.Th>
                <Table.Th>Телефон</Table.Th>
                <Table.Th>Роль</Table.Th>
                </> ) : (
                <Table.Th>Тип личности</Table.Th>
                )}
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
            </Box>
            {asideOpened? (
          <Box w={400} component={'form'} onSubmit={handleApplyProfTests}>
            {values && values?.map((item, index)=>
              <Checkbox
                mt="xs"
                ml={33}
                label={item.name}
                key={item.id}
                checked={item.checked??false}
                onChange={(event) => handlers.setItemProp(index, 'checked', event.currentTarget.checked)}
              />
            )}
            <Button type={'submit'} m={10}>Назначить</Button>
          </Box>) : null }
          </Container>
        </ScrollArea>
      </Skeleton>
    </>
  );
}