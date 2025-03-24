import React from 'react';
import { RadarChart } from '@mantine/charts';
import { Group, Text } from '@mantine/core';

type TestProfessionResultDisplayType = {
  results: {type: string, value: number, axis?: string}[]
}

const axisName: {[key: string]: string} = {
  awareness: 'Информированность',
  decisionMaking: 'Принятие решений',
  emotion: 'Эмоциональное отношение',
  independence: 'Автономность',
  planning: 'Планирование',
};

export const TestProfessionResultDisplay: React.FC<TestProfessionResultDisplayType> = ({results}) => {
  results.forEach((elem:{type: string, value: number, axis?: string})=> {
    return elem['axis'] = axisName[elem.type];
  })
  return (
    <Group justify={'start'} grow gap={'lg'} mb={20}>
      <RadarChart
        h={200}
        data={results}
        dataKey={'type'}
        series={[{name: 'value', color: 'green.6'}]}
        withPolarGrid
        withPolarAngleAxis
        polarGridProps={{gridType: 'circle'}}
        polarAngleAxisProps={{dataKey: 'axis'}}
      />
      <Text component={'div'}>
        {results.map((elem)=> (
          <Text>{elem.axis} - {elem.value}</Text>
        ))}
      </Text>
    </Group>
  )
}