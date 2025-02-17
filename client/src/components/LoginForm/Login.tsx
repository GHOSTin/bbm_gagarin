import React, { useState } from 'react';
import { AxiosResponse } from 'axios';
import { useSetAtom } from 'jotai';
import { jwtState, isAuthenticatedState } from '@/atoms.ts';
import { useForm } from '@mantine/form';
import apiClient from '@/shared/axios.apiClient.ts';
import {
  Anchor,
  Button,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import classes from './LoginPage.module.css';

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
      const response: AxiosResponse = await apiClient.post('/auth/login', {
        email: data.username,
        password: data.password,
      });

      if (response.status === 200) {
        setJwt(response.data.accessToken);
        localStorage.setItem('accessToken', response.data.accessToken);
        setIsAuthenticated(true);
      } else {
        setLoading(false)
      }
    } catch (error) {
      console.error('Ошибка при авторизации:', error);
      setLoading(false)
    }
  };

  //const onSubmit = handleSubmit((data) => console.log(data))

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome back to Mantine!
        </Title>
        <form onSubmit={form.onSubmit(handleSubmit)} className={'login_form_root'}>
          <TextInput
            label="Email address"
            placeholder="hello@gmail.com"
            size="md"
            key={form.key('username')}
            {...form.getInputProps('username')}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            key={form.key('password')}
            {...form.getInputProps('password')}
          />
          <Button fullWidth mt="xl" size="md" type="submit" loading={loading} loaderProps={{ type: 'dots' }}>
            Login
          </Button>
        </form>
          <Text ta="center" mt="md">
            <Anchor component="button" size="sm" onClick={(event) => event.preventDefault()}>
              Forgot password?
            </Anchor>
          </Text>
      </Paper>
    </div>
);
};

export default LoginForm;