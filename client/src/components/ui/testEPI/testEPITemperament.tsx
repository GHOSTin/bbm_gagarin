import { Text, Box } from '@mantine/core';
import temperamentDescriptions from './temperamentDescriptions.json';
import React, { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { temperamentTypeState } from '@/atoms.ts';

// Функция для определения типа темперамента
const determineTemperamentType = (extroversionScore: number, neuroticismScore: number) => {
  if (extroversionScore > 12 && neuroticismScore > 12) {
    return 'choleric';
  } else if (extroversionScore > 12 && neuroticismScore <= 12) {
    return 'sanguine';
  } else if (extroversionScore <= 12 && neuroticismScore <= 12) {
    return 'phlegmatic';
  } else {
    return 'melancholic';
  }
};

export const TestEPITemperament: React.FC<{extroversionScore: number, neuroticismScore: number}> =
  ({ extroversionScore, neuroticismScore }) => {
  const temperamentType = determineTemperamentType(extroversionScore, neuroticismScore);
  const setTemperamentType = useSetAtom(temperamentTypeState)
  const description = temperamentDescriptions[temperamentType].description;
  const name = temperamentDescriptions[temperamentType].name;

  useEffect(()=>{
    setTemperamentType(temperamentType);
  }, [temperamentType])

  return (
    <Box>
      <Text mb={10}>Ваш тип темперамента: <Text c={'blue'} span fw={700}>{name}</Text></Text>
      <Text ta={'justify'}>
        {description}
      </Text>
    </Box>
    );
};