import React, { useEffect, useState } from 'react';
import { Stepper, Button, Text, UnstyledButton, Checkbox, SimpleGrid, List, ThemeIcon } from '@mantine/core';
import { useAtomValue } from 'jotai';
import { currentUser } from '@/atoms.ts';
import { NavLink } from 'react-router-dom';
import { IconArrowUp, IconCircleCheck } from '@tabler/icons-react';
import classes from './homePage.module.css';

const hollandTestData = {id: 'holland', name:'Тест Холланда', description: 'Тип личности', path: '/test-holland' };

const testsLinks = [
  {id: 'epi', name:'Тест EPI', description: 'Тип темперамента', path: '/test-epi' },
  {id: 'motivation', name:'Тест Гриншпуна', description: 'Тип мотивации', path: '/test-motivation' },
  {id: 'profession', name:'Тест Профессиональная готовность', description: 'Тип профессии', path: '/test-profession' },
]

const HomePage: React.FC = () => {
  const [active, setActive] = useState(0);

  const user = useAtomValue(currentUser);

  const completedTests = Object.values(user.completedTests).map((test)=>test.type);

  useEffect(() => {
    if(user.profile?.acceptTerms) setActive(1)
    if(user.completedTests.filter((test)=>test.type==='holland').length > 0) setActive(2)
    if(user.completedTests.length >= 4) setActive(3)
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
        <div>Пройти тестирование на определение типа личности</div>
      ) : (
        <div>
          <Text>Пройдите все тесты</Text>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} mt={'sm'}>
              <UnstyledButton
                className={classes.button}
                component={NavLink}
                to={completedTests.includes(hollandTestData.id) ? '' : hollandTestData.path}
                key={hollandTestData.id}
              >
                <div className={classes.body}>
                  <Text c="dimmed" size="xs" lh={1} mb={5}>
                    {hollandTestData.description}
                  </Text>
                  <Text fw={500} size="sm" lh={1}>
                    {hollandTestData.name}
                  </Text>
                </div>
                <Checkbox
                  defaultChecked={completedTests.includes(hollandTestData.id)}
                  tabIndex={-1}
                />
              </UnstyledButton>,
          </SimpleGrid>
        </div>
      )
    )
  }

  const customDescriptionStep3 = () => {
    return (
      (active >= 3) ? (
        <div>Дождаться назначения профессиональных проб</div>
      ) : (
        <div>
          <Text>Пройдите все тесты</Text>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} mt={'sm'}>
            {testsLinks.map((test) =>
              <UnstyledButton
                className={classes.button}
                component={NavLink}
                to={completedTests.includes(test.id) ? '' : test.path}
                key={test.id}
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
                  defaultChecked={completedTests.includes(test.id)}
                  tabIndex={-1}
                />
              </UnstyledButton>
            )}
          </SimpleGrid>
        </div>
      )
    )
  }

  const customDescriptionStep4 = () => {
    return (
      <List
        spacing="xs"
        size="sm"
        center
        icon={
          <ThemeIcon color="blue" size={24} radius="xl">
            <IconCircleCheck size={16} />
          </ThemeIcon>
        }
      >
        {user.ProfTests.map((profTest)=> (
          <List.Item key={profTest.id}>{profTest.name}</List.Item>
        ))}
      </List>
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
        <Text>Определению типа личности</Text>
        <Text>Для этого нужно пройти тест Холланда</Text>
      </Stepper.Step>
      ): null}
      {(active >= 2)? (
        <Stepper.Step label="Шаг 3" description={customDescriptionStep3} >
          <Text>Подготовительные этапы пройдены! Наконец-то мы можем приступить к следующему шагу</Text>
          <Text>А именно, прохождению профессиональных проб, соответствующих определенному психотипу.</Text>
          <Text>Следует дождаться, пока результаты обработаются и назначатся проф.пробы</Text>
          <Text>А пока пройдем еще несколько тестов, для более точного определения личности.</Text>
          <Text>Кстати все результаты тестирования можно посмотреть в собственном профиле.</Text>
        </Stepper.Step>
      ): null}
      {(active >= 2)? (
      <Stepper.Step label="Шаг 4" description={customDescriptionStep4}>
        <Text>Все назначенные профпробы можно посмотреть в меню "Мои чеклисты"</Text>
      </Stepper.Step>
      ): null }
    </Stepper>
  )
}

export default HomePage;