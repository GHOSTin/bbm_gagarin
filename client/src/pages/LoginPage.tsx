import React from 'react';
import LoginForm from '@/components/ui/LoginForm/LoginForm.tsx';
import { Container, Grid } from '@mantine/core';

const LoginPage: React.FC = () => {
  return (
    <Container my="md">
      <Grid>
        <Grid.Col span={{ base: 12, xs: 4 }}><LoginForm/></Grid.Col>
      </Grid>
    </Container>
  )
}

export default LoginPage