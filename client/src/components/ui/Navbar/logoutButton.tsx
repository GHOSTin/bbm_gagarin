import React from 'react';
import classes from '@/components/ui/Navbar/NavbarSimple.module.css';
import { IconLogout } from '@tabler/icons-react';
import { useSetAtom } from 'jotai';
import { isAuthenticatedState, jwtState } from '@/atoms.ts';
import { logoutUserFn } from '@/shared/axios.apiClient.ts';
import globalRouter from '@/shared/globalRouter.ts';

export const LogoutButton: React.FC = () => {

  const setJwt = useSetAtom(jwtState);
  const setIsAuth = useSetAtom(isAuthenticatedState);

  const handleLogout = async (event: React.MouseEvent) => {
    event.preventDefault();
    try {
      const response = await logoutUserFn();
      if (response.status === 200) {
        setJwt(null);
        setIsAuth(false);
        globalRouter.navigate && globalRouter.navigate('/login', {replace: true})
      }
    } catch (error) {
      console.error('Ошибка при выполнении операции:', error);
    }
  }
  return (
    <a href="/logout" className={classes.link} onClick={handleLogout}>
      <IconLogout className={classes.linkIcon} stroke={1.5} />
      <span>Выйти</span>
    </a>
  )
}