import React, { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { Button, Checkbox, Input, SimpleGrid, TextInput } from '@mantine/core';
import { IMaskInput } from 'react-imask';
import { DateInput, DatesProvider } from '@mantine/dates';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/ru';
import { ProfileEntity } from '@/shared/types/ProfileEntity.ts';
import apiClient from '@/shared/axios.apiClient.ts';
import { UserEntity } from '@/shared/types';
import { ProfileTestsResults } from '@/components/profiles/';

dayjs.extend(customParseFormat);

interface FormValues extends Omit<ProfileEntity, 'id'|'userId'|'groupId'> {email: string}

interface ProfilePageProps {
  editable: boolean,
  user: UserEntity,
  setUser: (value: any) => void
}

const Profile: React.FC<ProfilePageProps> = ({editable, user, setUser}: ProfilePageProps) => {

  const form = useForm<FormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      middleName: '',
      email: '',
      birthday: null,
      phone: '',
      acceptTerms: false
    },
    onSubmitPreventDefault: 'always',
    validate: {
      firstName: (value?: string) => value && value.trim().length < 2,
      lastName: (value?: string) => value && value.trim().length < 2,
      email: (value?: string) => !/^\S+@\S+$/.test(value!),
      acceptTerms: (value?: boolean) => !value?'Требуется согласие':null
    },
  });

  useEffect(()=>{
    const currentProfile = {
      firstName: user.profile?.firstName??'',
      lastName: user.profile?.lastName??'',
      middleName: user.profile?.middleName??'',
      birthday: user.profile?.birthday && new Date(user.profile?.birthday!??null),
      acceptTerms: user.profile?.acceptTerms??false,
      phone: user.profile?.phone??'',
      email: user.email
    };
    form.setValues(currentProfile);
    form.resetDirty(currentProfile);
  }, [user])

  const onSubmit = async (values: FormValues) => {
    const currentProfile = {
      firstName: values.firstName,
      lastName: values.lastName,
      middleName: values.middleName,
      birthday: values.birthday,
      acceptTerms: values.acceptTerms,
      phone: values.phone
    };

    setUser({ ...user, name: `${values.firstName} ${values.lastName}`, profile: {...user.profile, ...currentProfile} });
    const response = await apiClient.patch(`/users/${user.id}`, {name: user.name, profile: currentProfile});
    if(response.status === 200) {
      localStorage.removeItem('profile-form');
    }
  }

  return (
    <>
      <ProfileTestsResults results={user.completedTests} />
      <form onSubmit={form.onSubmit(onSubmit)}>
        <SimpleGrid cols={{ base: 1, sm: 3 }} mt="xl">
          <TextInput
            label="Имя"
            placeholder="Ваше имя"
            name="firstName"
            key={form.key('firstName')}
            {...form.getInputProps('firstName')}
            withAsterisk
            readOnly={!editable}
          />
          <TextInput
            label="Фамилия"
            placeholder="Ваша фамилия"
            name="lastName"
            key={form.key('lastName')}
            {...form.getInputProps('lastName')}
            withAsterisk
            readOnly={!editable}
          />
        </SimpleGrid>
        <SimpleGrid cols={{ base: 1, sm: 3 }} mt="xl">
          <TextInput
            label="Отчество"
            placeholder="Ваше отчество"
            name="middleName"
            key={form.key('middleName')}
            {...form.getInputProps('middleName')}
            readOnly={!editable}
          />
          <TextInput
            label="Email"
            placeholder="Ваш email"
            name="email"
            key={form.key('email')}
            {...form.getInputProps('email')}
            withAsterisk
            readOnly={true}
          />
        </SimpleGrid>
        <SimpleGrid cols={{base: 1, sm: 3}} mt="xl">
          <Input.Wrapper label="Телефон">
            <Input
              component={IMaskInput}
              mask="+7 (000) 000-00-00"
              placeholder="Ваш телефон"
              name="phone"
              key={form.key('phone')}
              {...form.getInputProps('phone')}
              readOnly={!editable}
            />
          </Input.Wrapper>
          <DatesProvider settings={{ locale: 'ru', firstDayOfWeek: 1, consistentWeeks: true, timezone: 'UTC' }}>
            <DateInput
              key={form.key('birthday')}
              {...form.getInputProps('birthday')}
              label="Дата рождения"
              placeholder="Ваша дата рождения"
              valueFormat="DD.MM.YYYY"
              readOnly={!editable}
            />
          </DatesProvider>
        </SimpleGrid>
        <SimpleGrid cols={{base: 1}} mt="xl">
          <Checkbox
            key={form.key('acceptTerms')}
            {...form.getInputProps('acceptTerms', { type: 'checkbox' })}
            label="Я согласен с политикой конфиденциальности и правилами обработки персональных данных"
            disabled={!editable}
          />
        </SimpleGrid>
        <Button disabled={!editable} type={'submit'} mt="xl">Сохранить</Button>
      </form>
    </>
  )
}

export default Profile