import { atom } from 'jotai';
import { UserEntity } from '@/shared/models/';

export const jwtState = atom<string|null>(
  localStorage.getItem("accessToken")
    ? localStorage.getItem("accessToken")
    : null
);

export const isAuthenticatedState = atom<boolean>(false)

export const currentUser = atom(
  localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser')!) as UserEntity
  : {} as UserEntity
)
