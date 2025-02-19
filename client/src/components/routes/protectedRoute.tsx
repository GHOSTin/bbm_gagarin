import React from 'react';
import { Navigate, Outlet, RouteProps, useLocation } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { jwtState, userRoleState } from '@/atoms.ts';

interface ProtectedRouteProps {
  allowedRoles: ("ADMIN" | "MODERATOR" | "USER")[]; // set the user-roles
}

const ProtectedRoute: React.FC<ProtectedRouteProps & RouteProps> = ({
                                                         allowedRoles, }) => {
  const isAuthenticated = useAtomValue(jwtState);
  const userRole = useAtomValue(userRoleState);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{from: location}}  />
  } else if (!allowedRoles.includes(userRole as "ADMIN" | "MODERATOR" | "USER")) {
    return <Navigate to='/' replace />
  }
  return <Outlet/>;
};

export default ProtectedRoute;