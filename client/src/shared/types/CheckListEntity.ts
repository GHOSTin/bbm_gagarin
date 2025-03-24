import { ProfTestsEntity } from '@/shared/types/ProfTestsEntity.ts';

export class CheckListEntity {
  'id': string
  'userId': number
  'profTest': ProfTestsEntity
  'profTestId':string
  'wasBenefit': boolean
  'wouldLike'?:string
  'dificultes'?:string
  'ideas'?:string
  'canWorking':boolean
  'rivalry'?:string
  'wishes':boolean
  'downsides'?:string
}