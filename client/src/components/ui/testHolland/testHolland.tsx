import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import { Text, Radio, Button, Stack, Card, Box } from '@mantine/core';
import questionPairs from './questions.json'; // Обновленный формат данных
import scales from './scales.json';
import { TestHollandResultDisplay } from '@/components/ui/testHolland/testHollandResultDisplay.tsx';
import classes from '@/components/ui/testEPI/testEPI.module.css';
import { useNavigate } from 'react-router-dom';
import apiClient from '@/shared/axios.apiClient.ts';
import { currentUser } from '@/atoms.ts';
import { useAtom } from 'jotai';

type ScalesType = {
  [key: string] : Array<[number, string]>
};

export const TestHolland: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [mainScale, setMainScale] = useState<string>('');
  const [results, setResults] = useState<{ [key: string]: number }>({});
  const [user, setUser] = useAtom(currentUser);
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {checkValues: [] as string[]},
    onSubmitPreventDefault: 'always',
  });
  const navigate = useNavigate();

  const handleNextQuestion = () => {
    if(form.getValues().checkValues[currentQuestion]) {
      setCurrentQuestion(currentQuestion + 1);
    }
    if (currentQuestion >= questionPairs.length - 1) {
      const results: { [key: string]: number } = {
        scale1: 0,
        scale2: 0,
        scale3: 0,
        scale4: 0,
        scale5: 0,
        scale6: 0,
      };

      Object.entries<Array<[number, string]>>(scales as unknown as ScalesType).forEach(([scaleName, scalePairs ]) => {
        const scalePairsSet = new Set<[number, string]>(scalePairs);
        scalePairsSet.forEach(([questionIndex, value]) => {
          const selectedValue: string = form.getValues().checkValues[questionIndex-1]
          if (selectedValue === value) {
            results[scaleName]++;
          }
        });
      });

      console.log('Results:', results);
      const maxScale = Object.entries(results).sort(([,a], [,b])=>b-a)[0][0]
      setMainScale(maxScale);
      setResults(results)
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await apiClient.post('tests/', {
        type: 'holland',
        result: {scale: mainScale, results: results},
        isComplete: true
      });
      if(response?.status === 200 ) {
        const testResults = user.completedTests;
        testResults.push(response.data);
        setUser({...user, completedTests: testResults})
        navigate('/')
      }
    } catch {
      navigate('/')
    }
  }

  return (
    <Card withBorder radius="md" p="xl" className={classes.card}>
      <Text size="lg" fw={700}>
        Тест на определение профессионального типа личности
      </Text>
      <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
        {currentQuestion < questionPairs.length && (
          <div className="question">
            <Text>Вопрос {currentQuestion + 1}: Выберите одну профессию, которой вы бы отдали предпочтение</Text>
            <Stack key={`questionGroup${currentQuestion}`}>
            <Radio
              label={questionPairs[currentQuestion].left}
              value={'left'}
              name={`question${currentQuestion + 1}`}
              {...form.getInputProps(`checkValues.${currentQuestion}`)}
              key={form.key(`checkValuesLeft`)}
            />
            <Radio
              label={questionPairs[currentQuestion].right}
              value={'right'}
              name={`question${currentQuestion + 1}`}
              {...form.getInputProps(`checkValues.${currentQuestion}`)}
              key={form.key(`checkValuesRight`)}
            />
            </Stack>
            <Button onClick={handleNextQuestion} variant="filled" mt={10}>Следующий вопрос</Button>
          </div>
        )}
        {currentQuestion === questionPairs.length && (
          <>
            <Button type="submit" variant="filled" mt={10}>Завершить опрос</Button>
            <TestHollandResultDisplay scale={mainScale} />
          </>
        )}
      </Box>
    </Card>
  );
}