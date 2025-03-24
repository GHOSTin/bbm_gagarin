import React, { useState } from 'react';
import { Box, Button, Container, LoadingOverlay, Paper, PasswordInput, TextInput, Title } from '@mantine/core';
import classes from '@/components/ui/forgotPasswordForm/ForgotPassword.module.css';
import { hasLength, isEmail, isNotEmpty, matches, matchesField, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import apiClient from '@/shared/axios.apiClient.ts';
import globalRouter from '@/shared/globalRouter.ts';

export const SignUpForm:React.FC = () => {
  const [visibleLoader, setVisibleLoader] = useState<boolean>(false);
  const form = useForm({
    initialValues: {
      password: '',
      confirmPassword: '',
      firstname: '',
      lastname: '',
      email: ''
    },
    validate: {
      password: hasLength({min: 6}, `Длина должна быть более 6 символов`) || matches(/^[0-9]/, 'Должен содержать хотя бы одну цифру'),
      confirmPassword: matchesField('password', 'Пароли не совпадают'),
      email: isEmail('Введенное значение не является email'),
      firstname: isNotEmpty('Поле не может быть пустым'),
      lastname: isNotEmpty('Поле не может быть пустым'),
    },
    onSubmitPreventDefault: 'always'
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      setVisibleLoader(true);
      const response = await apiClient.post('/auth/signup', {
        email: values.email,
        password: values.password,
        name: `${values.firstname} ${values.lastname}`,
      });
      if(response.status === 200) {
        globalRouter.navigate && globalRouter.navigate('/login', {replace: true});
      }
    } catch (error: any) {
      notifications.show({
        color: 'red',
        message: error.response.data.message
      })
    }
    setVisibleLoader(false)
  }

  return (
    <Container size={460} my={30}>
      <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
        Создание нового пользователя
      </Title>
      <Box pos={'relative'}>
        <LoadingOverlay visible={visibleLoader} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
        <Paper component={'form'} onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            key={form.key('firstname')}
            {...form.getInputProps('firstname')}
            mt={"md"}
            placeholder="Иван"
            label="Имя"
            required
          />
          <TextInput
            key={form.key('lastname')}
            {...form.getInputProps('lastname')}
            mt={"md"}
            placeholder="Иванов"
            label="Фамилия"
            required
          />
          <TextInput
            key={form.key('email')}
            {...form.getInputProps('email')}
            mt={"md"}
            placeholder="ivan.ivanov@yandex.ru"
            label="Email"
            required
          />
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
          <Button fullWidth size="md" my={"xl"} type={'submit'}>Создать пользователя</Button>
        </Paper>
      </Box>
    </Container>
  )
}