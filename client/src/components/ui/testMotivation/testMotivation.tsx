import React, { useState } from 'react';
import classes from '@/components/ui/testEPI/testEPI.module.css';
import {
  Box,
  Card,
  Title,
  Text,
  Slider,
  List,
  ListItem,
  ThemeIcon,
  useMantineTheme,
  Button,
  Stack, Group,
} from '@mantine/core';
import { useAtom } from 'jotai/index';
import { currentUser } from '@/atoms.ts';
import { useNavigate } from 'react-router-dom';
import { IconCircleCheck } from '@tabler/icons-react';
import {questions, prestigeScale, materialScale, businessScale, creativeScale} from './questions.json';
import { BarChart } from '@mantine/charts';
import apiClient from '@/shared/axios.apiClient.ts';

const marks = [
  { value: 0, label: '0' },
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
];

export const TestMotivation: React.FC = () => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [user, setUser] = useAtom(currentUser);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [value, setValue] = useState(0);
  const [prestigeScore, setPrestigeScore] = useState(0);
  const [materialScore, setMaterialScore] = useState(0);
  const [businessScore, setBusinessScore] = useState(0);
  const [creativeScore, setCreativeScore] = useState(0);

  const handleNextQuestion = () => {
    if(prestigeScale.includes(currentQuestionIndex)) { setPrestigeScore((score)=>score + value)}
    if(materialScale.includes(currentQuestionIndex)) { setMaterialScore((score)=>score + value)}
    if(businessScale.includes(currentQuestionIndex)) { setBusinessScore((score)=>score + value)}
    if(creativeScale.includes(currentQuestionIndex)) { setCreativeScore((score)=>score + value)}
    setValue(0);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try{
      const response = await apiClient.post('tests/', {
        type: 'motivation',
        result: {
          data: [
            {type: 'prestige', score: prestigeScore},
            {type: 'material', score: materialScore},
            {type: 'business', score: businessScore},
            {type: 'creative', score: creativeScore},
          ]
        },
        isComplete: true
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
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Card withBorder radius="md" p="xl" className={classes.card}>
      <Box component={'form'} onSubmit={handleSubmit}>
        <Title order={3} mb={20}>Мотивы выбора профессии</Title>
        {currentQuestion && (
          <Stack>
            <Text>
              Оцените, насколько эти мотивы значимы для вас, поставив в бланке ответов рядом с номером соответствующего
              утверждения:
            </Text>
            <List
              spacing={'xs'}
              icon={
                <ThemeIcon color={theme.colors.violet[4]} size={16} radius="xl">
                  <IconCircleCheck size={14} />
                </ThemeIcon>
              }
            >
              <ListItem>3 балла, если мотив очень значим для вас;</ListItem>
              <ListItem>2 балла - если мотив, скорее, значим, чем нет;</ListItem>
              <ListItem>1 балл – если мотив, скорее, не значим, чем значим;</ListItem>
              <ListItem>0 баллов – если мотив не имеет значения.</ListItem>
            </List>
            <Text fw={500}>При выборе профессии я буду учитывать…</Text>
            <Text mb={10}>{currentQuestion.question}</Text>
            <Slider
              value={value}
              onChangeEnd={setValue}
              min={0}
              max={3}
              step={1}
              marks={marks}
            />
            <Button
              onClick={handleNextQuestion}
              variant={'outline'}
              radius="md"
              mt={20}
            >
              Далее
            </Button>
          </Stack>
        )}
        {currentQuestionIndex === questions.length && (
          <>
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
            <Button type="submit">Завершить опрос</Button>
          </>
        )}
      </Box>
    </Card>
  )
}