import React, { useEffect, useState } from 'react';
import { Box, Button, Select, Switch, Table, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import { ProfTestsEntity } from '@/shared/types/ProfTestsEntity.ts';
import apiClient from '@/shared/axios.apiClient.ts';
import { useAtomValue } from 'jotai';
import { currentUserId } from '@/atoms.ts';

export const ChecklistNewPage: React.FC = () => {
  const [selectData, setSelectData] = useState<{value: string, label: string}[]>([]);
  const userId = useAtomValue(currentUserId);
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      profTestId: null,
      wasBenefit: false,
      wouldLike: '',
      dificultes: '',
      ideas: '',
      canWorking: false,
      rivalry: '',
      wishes: true,
      downsides: ''
    },
    validate: {

    },
    onSubmitPreventDefault: 'always'
  })

  useEffect(() => {
    const fetchAllowProfTests = async() => {
      try{
        const response = await apiClient.get<ProfTestsEntity[]>(`prof-tests/user/${userId}`)
        if(response.status === 200) {
          setSelectData(response.data.map((elem)=>({value: elem.id, label: elem.name })))
        }
      } catch (error: any) {
        notifications.show({
          color: 'red',
          message: `${error.message}`
        })
      }
    }
    fetchAllowProfTests()
  }, []);

  type FormValues = typeof form.values;

  const onSubmit = async (values: FormValues) => {
    try {
      const response = await apiClient.post('checklists/', values);
      if(response?.status === 200 ) {
        navigate('/checklists')
      }
    } catch (error: any) {
      notifications.show({
        color: 'red',
        message: `${error.message}`
      })
    }
  }

  return (
    <Box component={"form"} onSubmit={form.onSubmit(onSubmit)}>
      <Table variant="vertical" layout="fixed" withTableBorder>
        <Table.Tbody>
          <Table.Tr>
            <Table.Th miw={160} w={'40%'}>Выберите профессиональную пробу из доступных</Table.Th>
            <Table.Td>
              <Select
                name={'profTestId'}
                key={form.key('profTestId')}
                data={selectData}
                {...form.getInputProps('profTestId')}
              />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Было ли полезным участие в профпробе?</Table.Th>
            <Table.Td>
              <Switch
                name={'wasBenefit'}
                key={form.key('wasBenefit')}
                {...form.getInputProps('wasBenefit', { type: 'checkbox' })}
              />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Понравилось/не понравилось участвовать в профпробе и что понравилось/не понравилось?</Table.Th>
            <Table.Td>
              <Textarea
                name={'wouldLike'}
                key={form.key('wouldLike')}
                {...form.getInputProps('wouldLike')}
              />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Были ли трудности в прохождении профпробы?</Table.Th>
            <Table.Td>
              <Textarea
                name={'troubles'}
                key={form.key('dificultes')}
                {...form.getInputProps('dificultes')}
              />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Мысли и идеи по поводу дальнейшего выбора профессии</Table.Th>
            <Table.Td>
              <Textarea
                name={'ideas'}
                key={form.key('ideas')}
                {...form.getInputProps('ideas')}
              />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Могу ли я попробовать поработать сейчас?</Table.Th>
            <Table.Td>
              <Switch
                name={'canWorking'}
                key={form.key('canWorking')}
                {...form.getInputProps('canWorking', { type: 'checkbox' })}
              />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Что я буду делать, если конкуренция на рынке окажется слишком высокой?</Table.Th>
            <Table.Td>
              <Textarea
                name={'rivalry'}
                key={form.key('rivalry')}
                {...form.getInputProps('rivalry')}
              />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Соответствует ли эта профессия всем моим пожеланиям?</Table.Th>
            <Table.Td>
              <Switch
                name={'wishes'}
                key={form.key('wishes')}
                {...form.getInputProps('wishes', { type: 'checkbox' })}
              />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Какие минусы есть в этой профессии?</Table.Th>
            <Table.Td>
              <Textarea
                name={'downsides'}
                key={form.key('downsides')}
                {...form.getInputProps('downsides')}
              />
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
      <Button type={'submit'}>Сохранить</Button>
    </Box>
  )
}