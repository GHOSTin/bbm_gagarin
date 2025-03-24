import React, { useEffect, useState } from 'react';
import { Box, Button, Group, ScrollArea } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { currentUserId } from '@/atoms.ts';
import { notifications } from '@mantine/notifications';
import apiClient from '@/shared/axios.apiClient.ts';
import { CheckListEntity } from '@/shared/types/CheckListEntity.ts';
import { ChecklistsList } from '@/components/checklists';

export const ChecklistsPage: React.FC = () => {
  const navigate = useNavigate()
  const userId = useAtomValue(currentUserId)
  const [checklists, setChecklists] = useState<CheckListEntity[]>([])

  useEffect(() => {
    const fetchChecklistsData = async () => {
      try {
        const response = await apiClient.get(`/checklists/user/${userId}`);
        if(response.status === 200) {
          setChecklists(response.data)
        }
      } catch (error: unknown) {
        notifications.show({
          color: 'red',
          title: 'Error',
          message: `${error}`,
        })
      }
    }
    fetchChecklistsData()
  }, []);


  
  return (
    <ScrollArea>
      <Group mt={10} mb={10}>
        <Button size={'xs'} onClick={()=> navigate('/checklists/new')}>
          <IconPlus />
          Добавить чеклист
        </Button>
      </Group>
      <Box m={20}>
        <ChecklistsList checklists={checklists}/>
      </Box>
    </ScrollArea>
  )
}