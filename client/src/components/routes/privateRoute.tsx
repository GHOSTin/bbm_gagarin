import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { jwtState } from '@/atoms.ts';
import React from 'react';

type RouteProps = {
  children?: React.ReactNode;
};

export const PrivateRoute: React.FC<React.PropsWithChildren<RouteProps>> = ({ children}) => {
  const auth = useAtomValue(jwtState);
  const location = useLocation();
  return auth? (
    <>
      {children}
      <Outlet/>
    </>
  ) : (
    <Navigate to={'/login'} replace state={{from: location}}/>
  );
}

