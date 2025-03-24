import {
  Container,
  Title,
  Text,
  Paper,
  TextInput,
  Group,
  Anchor,
  Center,
  Box,
  Button,
  LoadingOverlay,
} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import React, { useState } from 'react';
import classes from './ForgotPassword.module.css';
import { useForm } from '@mantine/form';
import apiClient from '@/shared/axios.apiClient';
import globalRouter from '@/shared/globalRouter.ts';

export const ForgotPasswordForm: React.FC = () => {
  const [visibleLoader, setVisibleLoader] = useState<boolean>(false);
  const form = useForm({
    initialValues: {
      email: ''
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Не правильный email')
    },
    onSubmitPreventDefault: 'always'
  });

  const handleSubmit = async (values: typeof form.values) => {
    setVisibleLoader(true)
    try {
      const response = await apiClient.post('/auth/forgot-password', values)
      if(response.status === 201) {
        setVisibleLoader(false)
        globalRouter.navigate && globalRouter.navigate('/login', {replace: true})
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <Container size={460} my={30}>
      <Title className={classes.title} ta="center">
        Забыли пароль?
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        Введите свой email для получения ссылки на сброс
      </Text>
      <Box pos={'relative'}>
        <LoadingOverlay visible={visibleLoader} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
      <Paper radius="md" mt="xl" component={'form'} onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Email"
          placeholder="Ваш email"
          required
          key={form.key('email')}
          {...form.getInputProps('email')}
        />
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
      </Box>
    </Container>
  );
}