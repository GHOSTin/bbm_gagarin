import React, { useState } from 'react';
import { Box, Button, Card, Group, Stack, Text, Title } from '@mantine/core';
import classes from './testEPI.module.css';
import {questions, lieSchema, extroversionSchema, neuroticismSchema} from './questions.json';
import TestEpiResultDisplay from '@/components/ui/testEPI/testEpiResultDisplay.tsx';
import apiClient from '@/shared/axios.apiClient.ts';
import { useAtomValue } from 'jotai';
import { currentUser, temperamentTypeState } from '@/atoms.ts';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';

export const TestEPI: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [extroversionScore, setExtroversionScore] = useState(0);
  const [neuroticismScore, setNeuroticismScore] = useState(0);
  const [lieScore, setLieScore] = useState(0);
  const temperamentType = useAtomValue(temperamentTypeState);
  const [user, setUser] = useAtom(currentUser);
  const navigate = useNavigate();

  const handleAnswerChange = (answer: boolean) => {
    let index = currentQuestionIndex + 1
    if (answer) {
      if (lieSchema.yes.includes(index)) { setLieScore((prev) => prev + 1) }
      if (extroversionSchema.yes.includes(index)) { setExtroversionScore((prev) => prev + 1); }
      if (neuroticismSchema.yes.includes(index)) { setNeuroticismScore((prev) => prev + 1); }
    } else {
      if (lieSchema.no.includes(index)) { setLieScore((prev) => prev + 1) }
      if (extroversionSchema.no.includes(index)) { setExtroversionScore((prev) => prev + 1); }
      if (neuroticismSchema.no.includes(index)) { setNeuroticismScore((prev) => prev + 1); }
    }
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await apiClient.post('/tests', {
        type: 'epi',
        isComplete: true,
        result: {
          temperamentType,
          data: [
            {type: 'lie', score: lieScore},
            {type: 'extroversion', score: extroversionScore},
            {type: 'neuroticism', score: neuroticismScore}
          ]
        }
      });

      if (response?.status === 200) {
        const testResults = user.completedTests;
        testResults.push(response.data);
        setUser({...user, completedTests: testResults})
        navigate('/')
      }
    } catch {
      navigate('/')
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Card withBorder radius="md" p="xl" className={classes.card}>
    <Box component="form" onSubmit={handleSubmit}>
      <Title order={3} mb={20}>Личностный опросник Айзенка</Title>

      {currentQuestion && (
        <Stack>
          <Text>{currentQuestion.question}</Text>
          <Group>
            <Button
              onClick={() => handleAnswerChange(true)}
              variant={'outline'}
              radius="md" style={{ flex: 1 }}
            >
              Да
            </Button>
            <Button
              onClick={() => handleAnswerChange(false)}
              variant={'outline'}
              radius="md" style={{ flex: 1 }}
            >
              Нет
            </Button>
          </Group>
        </Stack>
      )}

      {currentQuestionIndex === questions.length && (
        <>
          <Button type="submit">Завершить опрос</Button>
          <TestEpiResultDisplay lieScore={lieScore} extroversionScore={extroversionScore} neuroticismScore={neuroticismScore}/>
        </>
      )}
    </Box>
    </Card>
  );
};