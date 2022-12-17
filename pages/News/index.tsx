import React from "react";
import {
  Button,
  Card,
  Center,
  Container,
  Flex,
  Group,
  Image,
  SimpleGrid,
  Text,
  TextInput,
} from "@mantine/core";
import Link from "next/link";
import { IconArrowRightRhombus, IconSearch } from "@tabler/icons";
import MainLayout from "../../Components/MainLayout";
import { getAllNews } from "../../http/newsAPI";

const News = () => {
  const [dataNew, setDataNew] = React.useState([]);

  React.useEffect(() => {
    const dataNews = getAllNews().then((data) => setDataNew(data));
  }, []);
  React.useEffect(() => {
    console.log(dataNew);
  }, [dataNew]);

  return (
    <MainLayout>
      <Group mt={10} ml={30}>
        <Text c={"dimmed"} component={Link} href={"/"}>
          Главная
        </Text>
        <IconArrowRightRhombus />
        <Text color={"teal"}>Новости</Text>
      </Group>
      <Center mt={50}>
        <Text size={50} weight={"bold"}>
          Новости
        </Text>
      </Center>
      <Flex direction={"column"} align={"flex-start"} ml={30}>
        <TextInput placeholder={"Поиск"} icon={<IconSearch />} mb={20} />
        <Button component={Link} href={"/News/CreateNews"} color={"teal"}>
          Создать новость
        </Button>
      </Flex>
      <Container>
        {dataNew.map((obj) => (
          <Card withBorder shadow="sm" radius="md" mt={50}>
            <Card.Section withBorder inheritPadding py="xs">
              <Group position="apart">
                <Text weight={500} size={"xl"}>
                  {
                    //@ts-ignore
                    obj.title
                  }
                </Text>
              </Group>
            </Card.Section>

            <Text mt="sm" color="dimmed" size="lg">
              {
                //@ts-ignore
                obj.description
              }
            </Text>

            <Card.Section inheritPadding mt="sm" pb="md">
              <SimpleGrid cols={3}>
                {/*{images.map((image) => (*/}
                {/*  <Image src={image} key={image} radius="sm" />*/}
                {/*))}*/}
              </SimpleGrid>
            </Card.Section>
          </Card>
        ))}
      </Container>
    </MainLayout>
  );
};

export default News;
