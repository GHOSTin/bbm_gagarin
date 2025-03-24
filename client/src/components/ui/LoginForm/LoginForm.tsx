import React, { useState } from 'react';
import { useSetAtom } from 'jotai';
import { jwtState, isAuthenticatedState } from '@/atoms.ts';
import { useForm } from '@mantine/form';
import { loginUserFn } from '@/shared/axios.apiClient.ts';
import {
  Anchor,
  Button,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import classes from './LoginForm.module.css';
import { notifications } from '@mantine/notifications';

interface ILoginFormProps {}

interface ILoginFormState {
  username: string;
  password: string;
}

const LoginForm: React.FC<ILoginFormProps> = () => {

  const setJwt = useSetAtom(jwtState);
  const setIsAuthenticated = useSetAtom(isAuthenticatedState);

  const form = useForm<ILoginFormState>({
    mode: 'uncontrolled',
    initialValues: {
      username: '',
      password: ''
    },
    validate: {
      username: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    }
  })

  const [loading , setLoading] = useState(false)

  const handleSubmit = async (data: ILoginFormState)=> {
    try {
      setLoading(true);
      const response = await loginUserFn(data);
      if (response) {
        setJwt(response.accessToken);
        localStorage.setItem('accessToken', response.accessToken);
        setIsAuthenticated(true);
      } else {
        setLoading(false)
      }
    } catch (error: any) {
      notifications.show({
        color: 'red',
        autoClose: true,
        message: error.response?.data?.message
      })
      setLoading(false)
    }
  };

  //const onSubmit = handleSubmit((data) => console.log(data))

  return (
    <>
      <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
        Добро пожаловать!
      </Title>
      <form onSubmit={form.onSubmit(handleSubmit)} className={'login_form_root'}>
        <TextInput
          label="Логин"
          placeholder="hello@gmail.com"
          size="md"
          key={form.key('username')}
          {...form.getInputProps('username')}
        />
        <PasswordInput
          label="Пароль"
          placeholder="Ваш пароль"
          mt="md"
          size="md"
          key={form.key('password')}
          {...form.getInputProps('password')}
        />
        <Button fullWidth mt="xl" size="md" type="submit" loading={loading} loaderProps={{ type: 'dots' }}>
          Войти
        </Button>
      </form>
      <Text ta="center" mt="md">
        <Anchor c="dimmed" size="md" href={'/signup'}>
          Зарегистрироваться
        </Anchor>
      </Text>
      <Text ta="center" mt="md">
        <Anchor c="dimmed" size="sm" href={'/forgot-password'}>
          Забыли пароль?
        </Anchor>
      </Text>
    </>
)};

export default LoginForm;