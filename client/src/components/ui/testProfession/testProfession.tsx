import React, { useState } from 'react';
import { Box, Card, Title, Text, Stack, Button, Group } from '@mantine/core';
import classes from '@/components/ui/testEPI/testEPI.module.css';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai/index';
import { currentUser } from '@/atoms.ts';
import { questions } from './questions.json';
import {independence, awareness, emotion, planning, decisionMaking} from './scales.json';
import apiClient from '@/shared/axios.apiClient.ts';
import { TestProfessionResultDisplay } from '@/components/ui/testProfession/testProfessionResultDisplay.tsx';

export const TestProfession: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const navigate = useNavigate();
  const [user, setUser] = useAtom(currentUser);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [results, setResults] = useState<{type: string, value: number, axis?: string}[]>([]);

  const handleAnswerChange = (agree: boolean) => {
    const prevAnswers = answers;
    prevAnswers.push(agree);
    setAnswers(prevAnswers);
    setCurrentQuestionIndex((prev)=>prev+1);
    if(currentQuestionIndex >= questions.length - 1) {
      const results: { [key: string]: number } = {
        independence: 0,
        awareness: 0,
        emotion: 0,
        planning: 0,
        decisionMaking: 0
      };
      const independenceScale = new Map(independence.map(obj => [`${obj.key}:${obj.value}`, obj]));
      const awarenessScale = new Map(awareness.map(obj => [`${obj.key}:${obj.value}`, obj]));
      const emotionScale = new Map(emotion.map(obj => [`${obj.key}:${obj.value}`, obj]));
      const planningScale = new Map(planning.map(obj => [`${obj.key}:${obj.value}`, obj]));
      const decisionMakingScale = new Map(decisionMaking.map(obj => [`${obj.key}:${obj.value}`, obj]));
      answers.forEach((answer, index)=> {
        const checkedValue: string = `${index+1}:${answer}`;
        switch (true) {
          case independenceScale.has(checkedValue):
            results['independence'] += 1;
            break;
          case awarenessScale.has(checkedValue):
            results['awareness'] += 1;
            break;
          case emotionScale.has(checkedValue):
            results['emotion'] += 1;
            break;
          case planningScale.has(checkedValue):
            results['planning'] += 1;
            break;
          case decisionMakingScale.has(checkedValue):
            results['decisionMaking'] += 1;
            break;
          default:
            break;
        }
      });
      console.log('Results:', results);
      const res = Object.entries(results)
        .map(([key,value])=> {return {type: key, value: value}})
      setResults(res);
    }
  }


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await apiClient.post('/tests', {
        type: 'profession',
        isComplete: true,
        result: {
          data: results
        }
      })
      if (response?.status === 200) {
        const testResults = user.completedTests;
        testResults.push(response.data);
        setUser({...user, completedTests: testResults})
        navigate('/')
      }
    } catch {
      navigate('/')
    }
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Card withBorder radius="md" p="xl" className={classes.card}>
      <Box component={'form'} onSubmit={handleSubmit}>
        <Title order={3} mb={20}>Профессиональная готовность</Title>
        {currentQuestion && (
          <Stack>
            <Text fw={500}>Согласны ли вы с утверждением?</Text>
            <Text>{currentQuestion.question}</Text>
            <Group>
              <Button
                onClick={() => handleAnswerChange(true)}
                variant={'outline'}
                radius="md" style={{ flex: 1 }}
              >
                Согласен
              </Button>
              <Button
                onClick={() => handleAnswerChange(false)}
                variant={'outline'}
                radius="md" style={{ flex: 1 }}
              >
                Несогласен
              </Button>
            </Group>
          </Stack>
        )}
        {currentQuestionIndex === questions.length && (
          <>
            <TestProfessionResultDisplay results={results}/>
            <Button type="submit">Завершить опрос</Button>
          </>
        )}
      </Box>
    </Card>
  )
}