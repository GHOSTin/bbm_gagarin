import React from 'react';
import classes from './publicLayout.module.css';
import { Paper } from '@mantine/core';
import { Outlet } from 'react-router-dom';

export const PublicLayout: React.FC<React.PropsWithChildren> = ({children}) => {

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Outlet />
      {children}
      </Paper>
    </div>
  )
}
