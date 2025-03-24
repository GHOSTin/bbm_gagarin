import React from 'react';
import { CheckListEntity } from '@/shared/types/CheckListEntity.ts';
import classes from './checklistsList.module.css';
import { Accordion, Table } from '@mantine/core';

type ChecklistsListProps = {
  checklists: CheckListEntity[]
}

export const ChecklistsList: React.FC<ChecklistsListProps> = ({checklists}) => {

  const items = checklists?.map((item)=>(
    <Accordion.Item key={item.id} value={item.profTest?.name}>
      <Accordion.Control>{item.profTest?.name.toUpperCase()}</Accordion.Control>
      <Accordion.Panel>
        <Table variant="vertical" layout="fixed" withTableBorder>
          <Table.Tbody>
            <Table.Tr>
              <Table.Th miw={160} w={'40%'}>Было ли полезным участие в профпробе?</Table.Th>
              <Table.Td>{item.wasBenefit?'Да':"Нет"}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Понравилось/не понравилось участвовать в профпробе и что понравилось/не понравилось?</Table.Th>
              <Table.Td>{item.wouldLike}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Были ли трудности в прохождении профпробы?</Table.Th>
              <Table.Td>{item.dificultes}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Мысли и идеи по поводу дальнейшего выбора профессии</Table.Th>
              <Table.Td>{item.ideas}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Могу ли я попробовать поработать сейчас?</Table.Th>
              <Table.Td>{item.canWorking?'Да':"Нет"}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Что я буду делать, если конкуренция на рынке окажется слишком высокой?</Table.Th>
              <Table.Td>{item.rivalry}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Соответствует ли эта профессия всем моим пожеланиям?</Table.Th>
              <Table.Td>{item.wishes?'Да':"Нет"}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Какие минусы есть в этой профессии?</Table.Th>
              <Table.Td>{item.downsides}</Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Accordion.Panel>
    </Accordion.Item>
  ))

  return (
    <Accordion classNames={classes}>
      {items}
    </Accordion>
  )
}