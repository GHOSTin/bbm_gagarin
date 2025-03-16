import React, { useEffect, useState } from 'react';
import { Stepper, Button, Text, UnstyledButton, Checkbox, SimpleGrid } from '@mantine/core';
import { useAtomValue } from 'jotai';
import { currentUser } from '@/atoms.ts';
import { NavLink } from 'react-router-dom';
import { IconArrowUp } from '@tabler/icons-react';
import classes from './homePage.module.css';

const testsLinks = [
  {id: 'epi', name:'Тест EPI', description: 'description', path: '/test-epi' },
  {id: 'holland', name:'Тест Холланда', description: 'description', path: '/test-holland' },
  {id: '3', name:'Тест EPI', description: 'description', path: '/test-epi' },
  {id: '4', name:'Тест EPI', description: 'description', path: '/test-epi' },
]

const HomePage: React.FC = () => {
  const [active, setActive] = useState(0);

  const user = useAtomValue(currentUser);

  useEffect(() => {
    if(user.profile?.acceptTerms) setActive(1)
    if(user.profile?.userId === 2) setActive(2)
  }, []);

  const customDescriptionStep1 =() => {
    return (
      (active >= 1) ? (
          <div>Заполнить профиль</div>
        ):(
          <div>
            <Text>Заполните профиль пользователя</Text>
            <Button component={NavLink} to={'/profile'}>Перейти к профилю</Button>
          </div>
        )
    )
  }

  const customDescriptionStep2 =() => {
    return (
      (active >= 2) ? (
        <div>Пройти тестирования</div>
      ):(
        <div>
          <Text>Пройдите все тесты</Text>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} mt={"sm"}>
            {testsLinks.map((test)=>
              <UnstyledButton
                className={classes.button}
                component={NavLink}
                to={test.path}
              >
                <div className={classes.body}>
                  <Text c="dimmed" size="xs" lh={1} mb={5}>
                    {test.description}
                  </Text>
                  <Text fw={500} size="sm" lh={1}>
                    {test.name}
                  </Text>
                </div>
                <Checkbox
                  checked={Object.values(user.completedTests).map((test)=>test.type).includes(test.id)}
                  tabIndex={-1}
                />
              </UnstyledButton>
            )}
          </SimpleGrid>
        </div>
      )
    )
  }

  const customDescriptionStep3 =() => {
    return (
      (active >= 3) ? (
        <div>Заполнить профиль</div>
      ):(
        <div>
          <Text>Заполните профиль пользователя</Text>
          <Button component={NavLink} to={'/profile'}>Перейти к профилю</Button>
        </div>
      )
    )
  }

  return (
    <Stepper active={active} orientation="vertical">
      {(active >= 0)? (
      <Stepper.Step label="Шаг 1" description={customDescriptionStep1}>
        <Text>Приветствую! Первым шагом стоит заполнить  собственный профиль.</Text>
        <Text>Для этого следует нажать на кнопку расположенную выше.<IconArrowUp/></Text>
      </Stepper.Step>
      ): null}
      {(active >= 1)? (
      <Stepper.Step label="Шаг 2" description={customDescriptionStep2}>
        <Text>Отлично! Профиль заполнен и мы можем перейти к следующему шагу.</Text>
        <Text>Определению психотипа</Text>
        <Text>Для этого нужно пройти 4 тестирования</Text>
        <Text>Пройденные тесты будут отмечатся в <strong>Шаге 2</strong></Text>
      </Stepper.Step>
      ): null}
      {(active >= 2)? (
      <Stepper.Step label="Шаг 3" description={customDescriptionStep3} >
        <Text>С тестами покончено! Наконец-то мы можем приступить к следующему шагу</Text>
        <Text>А именно, прохождению профессиональных проб, соответствующих определенному психотипу.</Text>
        <Text>Но что же не так? Следует дождаться, пока результаты обработаются и назначатся проф.пробы</Text>
      </Stepper.Step>
      ): null}
    </Stepper>
  )
}

export default HomePage;