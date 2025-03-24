import { UserEntity } from '@/shared/types/UserEntity.ts';

export class ProfTestsEntity {
  'id': string;
  'name': string;
  'active': boolean;
  'users'?: Array<Partial<UserEntity>>;
}