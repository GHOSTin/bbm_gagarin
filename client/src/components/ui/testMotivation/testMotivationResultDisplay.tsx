import React from 'react';
import { BarChart } from '@mantine/charts';
import { Group, Text } from '@mantine/core';

type TestMotivationResultDisplayType = {
  scores: {
    prestigeScore: number,
    materialScore: number,
    businessScore: number,
    creativeScore: number
  }
}

export const TestMotivationResultDisplay: React.FC<TestMotivationResultDisplayType> = ({scores}) => {
  const {prestigeScore,materialScore,businessScore,creativeScore} = scores
  return (
    <Group justify={'start'} grow gap={'lg'} mb={20}>
      <BarChart
        h={200}
        maw={400}
        yAxisProps={{width: 80}}
        data={[
          {key: 'Престиж профессии', value: prestigeScore},
          {key: 'Материальное благополучие', value: materialScore},
          {key: 'Деловое отношение', value: businessScore},
          {key: 'Творческое отношение', value: creativeScore},
        ]}
        dataKey={'key'}
        orientation="vertical"
        series={[{label: 'Мотивация',color: 'blue.6', name: 'value'}]}
      />
      <Text component={'div'}>
        0-4 – мотив не выражен <br />
        5-8 – слабая выраженность мотива <br />
        9-14 – умеренная выраженность мотива <br />
        15-19 – выраженность мотива <br />
        20-24 – яркая выраженность мотива
      </Text>
    </Group>
  )
}