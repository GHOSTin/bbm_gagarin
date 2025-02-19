import React from 'react';
import classes from '@/components/ui/Navbar/NavbarSimple.module.css';
import { IconLogout } from '@tabler/icons-react';
import { useSetAtom } from 'jotai';
import { currentUser, isAuthenticatedState, jwtState } from '@/atoms.ts';
import { UserEntity } from '@/shared/models';
import apiClient from '@/shared/axios.apiClient.ts';

export const LogoutButton: React.FC = () => {

  const setJwt = useSetAtom(jwtState);
  const setIsAuth = useSetAtom(isAuthenticatedState);
  const setCurrentUser = useSetAtom(currentUser);

  const handleLogout = async (event: React.MouseEvent) => {
    event.preventDefault();
    try {
      const response = await apiClient.post('auth/logout');
      if (response.status === 200) {
        setJwt(null);
        setCurrentUser({} as UserEntity);
        setIsAuth(false);
        localStorage.removeItem('accessToken')
        localStorage.removeItem('currentUser')
      }
    } catch (error) {
      console.error('Ошибка при выполнении операции:', error);
    }
  }
  return (
    <a href="#" className={classes.link} onClick={handleLogout}>
      <IconLogout className={classes.linkIcon} stroke={1.5} />
      <span>Выйти</span>
    </a>
  )
}