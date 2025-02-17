import React from 'react';
import Login from '@/components/LoginForm/Login.tsx';
import { Container, Grid } from '@mantine/core';

const LoginPage: React.FC = () => {
  return (
    <Container my="md">
      <Grid>
        <Grid.Col span={{ base: 12, xs: 4 }}><Login/></Grid.Col>
      </Grid>
    </Container>
  )
}

export default LoginPage