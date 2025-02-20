import React from 'react';
import { TestEPITemperament } from '@/components/ui/testEPI/testEPITemperament.tsx';
import { Text, Title } from '@mantine/core';
import classes from './testEPI.module.css'

const ResultsDisplay: React.FC<{lieScore: number, extroversionScore: number, neuroticismScore: number}> =
  ({ lieScore, extroversionScore, neuroticismScore }) => {
  return (
    <div>
      <Title order={3} mb={20} mt={20}>Результаты тестирования</Title>
      <Text className={classes.resultScore}>
        <Text component="span" c={lieScore > 5?'red': 'black'} fw={700}>Искренность:</Text> {lieScore}
      </Text>
      <Text className={classes.resultScore}>
        <Text component="span" fw={700}>Экстраверсия/Интроверсия:</Text> {extroversionScore}
      </Text>
      <Text className={classes.resultScore}>
        <Text component="span" fw={700}>Стабильность/Нестабильность (Нейротизм):</Text> {neuroticismScore}
      </Text>
      <TestEPITemperament extroversionScore={extroversionScore} neuroticismScore={neuroticismScore} />
    </div>
  );
};

export default ResultsDisplay;