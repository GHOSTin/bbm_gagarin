import React from 'react';
import { useAtomValue } from 'jotai/index';
import { jwtState } from '@/atoms.ts';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

type RouteProps = {
  children?: React.ReactNode;
};

export const PublicRoute: React.FC<React.PropsWithChildren<RouteProps>> = ({ children }) => {
  const auth = useAtomValue(jwtState);
  const location = useLocation();

  let state = location.state as { from: Location };
  let from = state ? state.from.pathname : '/';

  return !auth ? ( //Check if logged in
    <>
      {children}
      <Outlet />
    </>
  ) : (
    <Navigate to={from} replace />
  );
};