import React from "react";
import MainLayout from "../../../Components/MainLayout";
import { getAllNews, getUserNews } from "../../../http/newsAPI";
import {
  Card,
  Center,
  Container,
  Group,
  Image,
  SimpleGrid,
  Text,
} from "@mantine/core";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import Link from "next/link";
import { IconArrowRightRhombus } from "@tabler/icons";
import { ImagesOnNews } from "../index";
import { openModal } from "@mantine/modals";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

const MyNews = ({ dataNew }: { dataNew: any }) => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  const viewImage = (imgSrc: string) => {
    openModal({
      title: "Фото",
      children: <Image width={"100%"} src={imgSrc} />,
    });
  };
  return (
    <MainLayout>
      <Group mt={10} ml={30}>
        <Text c={"dimmed"} component={Link} href={"/"}>
          Главная
        </Text>
        <IconArrowRightRhombus />
        <Text color={"teal"}>Мои новости</Text>
      </Group>
      <Container>
        <Center mt={50}>
          <Text size={40}>Ваши новости</Text>
        </Center>
        {dataNew.length === 0 ? (
          <Center>
            <Text>К сожалению вы не выложили ни одной новости</Text>
          </Center>
        ) : (
          dataNew.map((obj: any) => (
            <Card withBorder shadow="sm" radius="md" mt={50}>
              <Card.Section withBorder inheritPadding py="xs">
                <Group position="apart">
                  <Text weight={500} size={"xl"}>
                    {obj.title}
                  </Text>
                  <Text>
                    Дата публикации:
                    {dayjs(obj.createdAt).format("DD MMMM YYYY HH:mm")}
                  </Text>
                </Group>
              </Card.Section>

              <Text mt="sm" color="dimmed" size="lg">
                {obj.description}
              </Text>

              <Card.Section inheritPadding mt="sm" pb="md">
                <SimpleGrid cols={3}>
                  {obj.news_images.map((image: ImagesOnNews) => (
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
                  ))}
                </SimpleGrid>
              </Card.Section>
            </Card>
          ))
        )}
      </Container>
    </MainLayout>
  );
};
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  console.log(ctx);
  const data = await getUserNews(ctx.query.id);
  return { props: { dataNew: data } };
}
export default MyNews;
