import { Button, Container, Image, SimpleGrid, Text, Title } from '@mantine/core';
import image from './image.svg';
import classes from './NotFound.module.css';

export function NotFound() {
  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <Image src={image} className={classes.mobileImage} />
        <div>
          <Title className={classes.title}>Упс...Что-то пошло не по плану</Title>
          <Text c="dimmed" size="lg">
            Страница которую вы пытаетесь открыть не найдена
          </Text>
          <Button variant="outline" size="md" mt="xl" className={classes.control} component={'a'} href={'/'}>
            Вернуться на главную
          </Button>
        </div>
        <Image src={image} className={classes.desktopImage} />
      </SimpleGrid>
    </Container>
  );
}