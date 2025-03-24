import { TestEntity } from '@/shared/types/TestEntity.ts';
import React from 'react';
import { EpiTessResults } from '@/components/profiles/epiTessResults.tsx';
import { TestHollandResultDisplay } from '@/components/ui/testHolland/testHollandResultDisplay.tsx';
import { TestMotivationResultDisplay } from '@/components/ui/testMotivation/testMotivationResultDisplay.tsx';
import { TestProfessionResultDisplay } from '@/components/ui/testProfession/testProfessionResultDisplay.tsx';
import { Accordion } from '@mantine/core';

interface ProfileTestResultsProps {
  results: Partial<TestEntity>[]
}

export const ProfileTestsResults: React.FC<ProfileTestResultsProps> = ({results}: ProfileTestResultsProps) => {
  return (
    <Accordion my={10}>
      <Accordion.Item key={'epi'} value={'epi'}>
        <Accordion.Control>Результаты тестирования Тип темперамента</Accordion.Control>
        <Accordion.Panel>
          {results.some((test)=> test.type==='epi')? (
            <EpiTessResults testResult={results.find((el)=>el.type==='epi')?.result}/>
          ) : null}
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key={'holland'} value={'holland'}>
        <Accordion.Control>Результаты тестирования Тип личности</Accordion.Control>
        <Accordion.Panel>
      {results.some((test)=> test.type==='holland')? (
        <TestHollandResultDisplay scale={results.find((el)=>el.type==='holland')?.result.scale} />
      ) : null}
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key={'motivation'} value={'motivation'}>
        <Accordion.Control>Результаты тестирования Тип мотивации</Accordion.Control>
        <Accordion.Panel>
      {results.some((test)=> test.type==='motivation')? (
        <TestMotivationResultDisplay scores={results.find((el)=>el.type==='motivation')?.result.data.reduce((acc: {[key: string]: number}, elem: {type: string, score: number})=> {acc[`${elem.type}Score`] = elem.score; return acc}, {})}/>
      ) : null}
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key={'profession'} value={'profession'}>
        <Accordion.Control>Результаты тестирования Тип профессии</Accordion.Control>
        <Accordion.Panel>
      {results.some((test)=> test.type==='profession')? (
        <TestProfessionResultDisplay results={results.find((el)=>el.type==='profession')?.result.data} />
      ) : null}
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  )
}