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
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import "dayjs/locale/ru";

export interface ImagesOnNews {
  imageUrl: string;
}

const News = () => {
  useSearchParams();
  const [dataNew, setDataNew] = React.useState<any[]>([]);

  React.useEffect(() => {
    const dataNews = getAllNews().then((data) => setDataNew(data));
    console.log(dataNews);
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
          <>
            <Text mt={50}>Пользователь: {obj.user.nickname}</Text>
            <Card withBorder shadow="sm" radius="md" mt={10}>
              <Card.Section withBorder inheritPadding py="xs">
                <Group position="apart">
                  <Text weight={500} size={"xl"}>
                    {obj.title}
                  </Text>

                  <Text>
                    Дата публикации:
                    {dayjs(obj.createdAt)
                      .locale("ru")
                      .format("DD MMMM YYYY HH:mm")}
                  </Text>
                </Group>
              </Card.Section>

              <Text mt="sm" color="dimmed" size="lg">
                {obj.description}
              </Text>

              <Card.Section inheritPadding mt="sm" pb="md">
                <SimpleGrid cols={3}>
                  {obj.news_images.length > 1
                    ? obj.news_images.map((image: ImagesOnNews) => (
                        <Image
                          src={`http://localhost:5000/${image.imageUrl}`}
                          width={"250px"}
                          height={"250px"}
                          key={image.imageUrl}
                          radius="sm"
                        />
                      ))
                    : obj.news_images.map((image: ImagesOnNews) => (
                        <Image
                          src={`http://localhost:5000/${image.imageUrl}`}
                          key={image.imageUrl}
                          radius="sm"
                        />
                      ))}
                </SimpleGrid>
              </Card.Section>
            </Card>
          </>
        ))}
      </Container>
    </MainLayout>
  );
};

export default News;
