import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  LoadingOverlay,
  Paper,
  PasswordInput,
  Title,
} from '@mantine/core';
import classes from '@/components/ui/forgotPasswordForm/ForgotPassword.module.css';
import { hasLength, matches, matchesField, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import apiClient from '@/shared/axios.apiClient.ts';
import globalRouter from '@/shared/globalRouter.ts';

export const ResetPasswordForm: React.FC = () => {
  const [query] = useSearchParams();
  const [visibleLoader, setVisibleLoader] = useState<boolean>(false);
  const form = useForm({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validate: {
      password: hasLength({min: 6}, `Длина должна быть более 6 символов`) || matches(/^[0-9]/, 'Должен содержать хотя бы одну цифру'),
      confirmPassword: matchesField('password', 'Пароли не совпадают')
    },
    onSubmitPreventDefault: 'always'
  });

  const handleSubmit = async (values: typeof form.values) => {
    setVisibleLoader(true);
    try{
      const response = await apiClient.post('/auth/reset-password', {
        token: query.get('token'),
        password: values.password
      });
      if(response.status === 200) {
        notifications.show({
          color: 'blue',
          message: 'Пароль успешно изменен'
        })
        setVisibleLoader(false);
        globalRouter.navigate && globalRouter.navigate('/login', {replace: true})
      }
    } catch (error: any) {
      if(error.name === "AxiosError") error = error.response.data
      notifications.show({
        color: 'red',
        message: `${error.message}`
      })
    }
  }

  return (
    <Container size={460} my={30}>
      <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
        Создание нового пароля
      </Title>
      <Box pos={'relative'}>
        <LoadingOverlay visible={visibleLoader} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
        <Paper component={'form'} onSubmit={form.onSubmit(handleSubmit)}>
          <PasswordInput
            mt={"md"}
            key={form.key('password')}
            {...form.getInputProps('password')}
            placeholder="Новый пароль"
            label="Новый пароль"
            required
          />
          <PasswordInput
            mt={"md"}
            key={form.key('confirmPassword')}
            {...form.getInputProps('confirmPassword')}
            placeholder="Повторите пароль"
            label="Повторите пароль"
            required
          />
          <Button fullWidth size="md" my={"xl"} type={'submit'}>Обновить пароль</Button>
        </Paper>
      </Box>
    </Container>
  )
}