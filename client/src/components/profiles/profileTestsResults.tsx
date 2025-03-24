import { TestEntity } from '@/shared/types/TestEntity.ts';
import React from 'react';
import { EpiTessResults } from '@/components/profiles/epiTessResults.tsx';

interface ProfileTestResultsProps {
  results: Partial<TestEntity>[]
}

export const ProfileTestsResults: React.FC<ProfileTestResultsProps> = ({results}: ProfileTestResultsProps) => {
  return (
    <EpiTessResults testResult={results.find((el)=>el.type==='epi')?.result}/>
  )
}