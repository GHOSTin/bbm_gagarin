import React from 'react';
import { RadarChart } from '@mantine/charts';
import { Text, SimpleGrid } from '@mantine/core';
import {description} from '@/components/ui/testEPI';

type EpiDescriptionType = {
  [key: string]: {
    name: string,
    description: string
  }
}

type EpiTestResultsProps = {
  testResult: {
    temperamentType: string,
    data: Array<{ type: string, score: string, axis?: string }>
  }
}

const axisName = ['Искренность','Экстраверсия','Стабильность'];

export const EpiTessResults: React.FC<EpiTestResultsProps> = (props) => {
  const {temperamentType, data} = props.testResult;
  //Добавление названия оси по-русски
  data.forEach((value, index)=> value['axis'] = axisName[index]);
  const desc = description as unknown as EpiDescriptionType;
  return (
    <SimpleGrid cols={{ base: 1, sm: 3 }} mt="xl">
      <div>
        <Text ta={'center'}>{desc[temperamentType].name}</Text>
        <RadarChart
          h={250}
          data={data}
          dataKey={'type'}
          series={[{name: 'score', color: 'blue.4', opacity: 0.2}]}
          withPolarGrid
          withPolarAngleAxis
          withPolarRadiusAxis
          polarGridProps={{gridType: 'circle'}}
          polarAngleAxisProps={{dataKey: 'axis'}}
        />
      </div>
    </SimpleGrid>
  )
}