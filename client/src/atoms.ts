import { atom } from 'jotai';
import { UserEntity } from '@/shared/models/';

type temperamentType = 'phlegmatic' | 'choleric' | 'sanguine' | 'melancholic'

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

export const userRoleState = atom<string | null>(( get) => get(currentUser)?.role??null);

export const temperamentTypeState = atom<temperamentType>('phlegmatic');
