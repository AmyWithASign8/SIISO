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
import { getAllNews, getUserNews } from "../../http/newsAPI";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import "dayjs/locale/ru";
import { openModal } from "@mantine/modals";
import { GetServerSidePropsContext } from "next";

export interface ImagesOnNews {
  imageUrl: string;
}
interface objNewsInterface {
  obj: any;
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

  const viewImage = (imgSrc: string) => {
    openModal({
      title: "Фото",
      children: <Image src={imgSrc}></Image>,
    });
  };
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
        {dataNew.map<any>((obj) => (
          <>
            <Text mt={50}>
              Автор:{" "}
              {obj.user === null ? "Аккаунт был удален" : obj.user.nickname}
            </Text>
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
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            viewImage(`http://localhost:5000/${image.imageUrl}`)
                          }
                          src={`http://localhost:5000/${image.imageUrl}`}
                          width={"250px"}
                          height={"250px"}
                          key={image.imageUrl}
                          radius="sm"
                        />
                      ))
                    : obj.news_images.map((image: ImagesOnNews) => (
                        <Image
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            viewImage(`http://localhost:5000/${image.imageUrl}`)
                          }
                          src={`http://localhost:5000/${image.imageUrl}`}
                          key={image.imageUrl}
                          radius="sm"
                        />
                      ))}
                </SimpleGrid>
              </Card.Section>
              <Button
                component={Link}
                href={`/News/PostPage/${obj.id}`}
                fullWidth
                color={"teal"}
              >
                Подробнее
              </Button>
            </Card>
          </>
        ))}
      </Container>
    </MainLayout>
  );
};
export default News;
