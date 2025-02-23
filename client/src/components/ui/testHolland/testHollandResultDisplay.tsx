import React from 'react';
import { Text, Title } from '@mantine/core';
import scaleDescriptions from './scalesDescription.json';
import classes from '@/components/ui/testHolland/testHolland.module.css';

type ScalesDescriptionType = {
  [key in 'scale1' | 'scale2' | 'scale3' | 'scale4' | 'scale5' | 'scale6' as string]: {
    name: string;
    description: string;
  };
};

export const TestHollandResultDisplay: React.FC<{scale: string}> = ({scale}) => {
  const data = scaleDescriptions as unknown as ScalesDescriptionType;
  return (
    <>
      <Title order={3} mb={20} mt={20}>Результаты тестирования</Title>
      <Text className={classes.resultScore}>
        <Text component="span" fw={700}>Тип личности:</Text> {data[scale].name}
      </Text>
      <Text className={classes.resultScore} ta={'justify'}>
        {data[scale].description}
      </Text>
    </>
  );
}
