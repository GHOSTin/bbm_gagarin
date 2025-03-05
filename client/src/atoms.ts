import { atom } from 'jotai';
import { UserEntity } from '@/shared/models/';
import apiClient from '@/shared/axios.apiClient.ts';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { atomWithDefault } from 'jotai/utils';

type temperamentType = 'phlegmatic' | 'choleric' | 'sanguine' | 'melancholic'

export const jwtState = atom<string|null>(
  localStorage.getItem("accessToken")
    ? localStorage.getItem("accessToken")
    : null
);

export const isAuthenticatedState = atom<boolean>(false)

export const currentUser = atomWithDefault<Promise<UserEntity> | UserEntity>(
  async (get) => {
    const userId = get(currentUserId);
    if(userId) {
      try {
        const response = await apiClient.get<UserEntity>(`/users/${get(currentUserId)}`)
        return response.data as UserEntity
      } catch (error) {
        return {} as UserEntity
      }
    }
    return {} as UserEntity
  }
);

//export const currentUser = atom<UserEntity>({} as UserEntity)

export const currentUserId = atom ((get)=>{
  const token = get(jwtState);
  if(!token) return;
  const decoded = jwtDecode<JwtPayload>(token);
  return decoded.sub
});

export const UserEntityIdAtom = atom<string | null>(null)

export const userRoleState = atom<string| Promise<string> | null>(async (get) => (await get(currentUser))?.role??null );

export const temperamentTypeState = atom<temperamentType>('phlegmatic');
