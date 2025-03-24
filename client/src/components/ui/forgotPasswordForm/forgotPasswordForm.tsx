import { Container, Title, Text, Paper, TextInput, Group, Anchor, Center, Box, Button } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import React from 'react';
import classes from './ForgotPassword.module.css';

export const ForgotPasswordForm: React.FC = () => {
  return (
    <Container size={460} my={30}>
      <Title className={classes.title} ta="center">
        Забыли пароль?
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        Введите свой email для получения ссылки на сброс
      </Text>

      <Paper radius="md" mt="xl" component={'form'}>
        <TextInput label="Email" placeholder="Ваш email" required />
        <Group justify="space-between" mt="lg" className={classes.controls}>
          <Anchor c="dimmed" size="sm" className={classes.control} href={'/login'}>
            <Center inline>
              <IconArrowLeft size={12} stroke={1.5} />
              <Box ml={5}>Вернуться на форму входа</Box>
            </Center>
          </Anchor>
          <Button className={classes.control} type={'submit'}>Сбросить пароль</Button>
        </Group>
      </Paper>
    </Container>
  );
}