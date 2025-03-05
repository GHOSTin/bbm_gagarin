import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { jwtState, userRoleState } from '@/atoms.ts';
import React from 'react';

type RouteProps = {
  children?: React.ReactNode;
  accessRoles?: string[]
};

export const PrivateRoute: React.FC<React.PropsWithChildren<RouteProps>> = ({ children, accessRoles}) => {
  const auth = useAtomValue(jwtState);
  const userRole = useAtomValue(userRoleState);
  const location = useLocation();
  return (auth)? (
    (!accessRoles || accessRoles?.includes(userRole!))? (
      <>
        {children}
        <Outlet/>
      </>
    ) : (
      <Navigate to={'/'} replace/>
    )
  ) : (
    <Navigate to={'/login'} replace state={{from: location}}/>
  );
}

