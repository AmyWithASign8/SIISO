import React, { useContext } from "react";
import MainLayout from "../../../Components/MainLayout";
import { useRouter } from "next/router";
import PostContext from "../../../Context/PostContext";
import { getSelectedPost, getUserNews } from "../../../http/newsAPI";
import {
  ActionIcon,
  Card,
  Group,
  Menu,
  Text,
  Image,
  SimpleGrid,
  Container,
  Center,
  Title,
  Input,
  Divider,
  ScrollArea,
  Paper,
  Blockquote,
  Button,
  TextInput,
} from "@mantine/core";
import {
  IconArrowRightRhombus,
  IconBallpen,
  IconCheck,
  IconDots,
  IconEye,
  IconFileZip,
  IconHeartPlus,
  IconHearts,
  IconTrash,
} from "@tabler/icons";
import { ImagesOnNews } from "../index";
import Link from "next/link";
import UserContext from "../../../Context/UserContext";
import {
  createNewComment,
  getAllComments,
  getOneComment,
} from "../../../http/commentsApi";
import { GetServerSidePropsContext } from "next";
import dayjs from "dayjs";
import { SubmitHandler, useForm } from "react-hook-form";
import { userInfo } from "os";
import { showNotification, updateNotification } from "@mantine/notifications";
type Inputs = {
  comment: string;
};
const PostPage = ({
  dataPost,
  dataComment,
}: {
  dataPost: any;
  dataComment: any;
}) => {
  let allCommentsInThisPost = dataComment;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const [inputComment, setInputComment] = React.useState<string>("");
  const [userInfo, setUserInfo] = useContext(UserContext);
  const [like, setLike] = React.useState<boolean>(false);
  const [postInfo, setPostInfo] = useContext(PostContext);
  const router = useRouter();
  const { id } = router.query;
  React.useEffect(() => {
    console.log("полученный пост", dataPost);
    dataPost.map((obj: any) => {
      setPostInfo({
        title: obj.title,
        description: obj.description,
        createdAt: obj.createdAt,
        userNickname: obj?.user?.nickname,
        userEmail: obj?.user?.email,
        newsImages: obj.news_images === undefined ? [] : obj.news_images,
        postLikes: obj.like_news,
      });
      console.log("ЗАПИСЬ", obj.newsImages);
    });
  }, []);

  if (postInfo.newsImages === undefined)
    return <MainLayout>loading...</MainLayout>;
  const onSubmit: SubmitHandler<Inputs> = (data) =>
    createCommentFunc(data.comment);
  const createCommentFunc = async (comment: string) => {
    const createComment = await createNewComment(id, userInfo[2], comment);
    console.log("СОЗДАННЫЙ КОММЕНТ", createComment);
    const createdComment = await getOneComment(createComment.id);
    console.log("ОДИН КОММ ПОЛУЧЕН", createdComment);
    showNotification({
      id: "load-data",
      loading: true,
      title: "Загрузка...",
      message: "Идет загрузка вашего комментария",
      autoClose: false,
      disallowClose: true,
      radius: "xl",
    });

    setTimeout(() => {
      updateNotification({
        id: "load-data",
        color: "teal",
        title: "Загрузка завершена",
        message: "Ваш комментарий успешно загружен",
        icon: <IconCheck size={16} />,
        autoClose: 2000,
        radius: "xl",
      });
    }, 1000);
    dataComment.unshift(createdComment);
  };
  return (
    <MainLayout>
      <Group mt={10} ml={30}>
        <Text c={"dimmed"} component={Link} href={"/"}>
          Главная
        </Text>
        <IconArrowRightRhombus />
        <Text c={"dimmed"} component={Link} href={"/News"}>
          Новости
        </Text>
        <IconArrowRightRhombus />
        <Text color={"teal"}>{postInfo.title}</Text>
      </Group>
      <Container size={"xl"} mt={60}>
        <Card withBorder shadow="sm" radius="md">
          <Card.Section withBorder inheritPadding py="xs">
            <Group position="apart">
              <Text size={"xl"} weight={500}>
                {postInfo.title}
              </Text>
              <Menu withinPortal position="bottom-end" shadow="sm">
                <Menu.Target>
                  <ActionIcon>
                    <IconDots size={16} />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item icon={<IconFileZip size={14} />}>
                    Download zip
                  </Menu.Item>
                  <Menu.Item icon={<IconEye size={14} />}>
                    Preview all
                  </Menu.Item>
                  <Menu.Item icon={<IconTrash size={14} />} color="red">
                    Delete all
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Card.Section>

          <Text mt="sm" size="lg">
            {postInfo.description}
          </Text>
          <Card.Section inheritPadding mt="sm" pb="md">
            <SimpleGrid
              cols={
                postInfo.newsImages === undefined
                  ? 3
                  : postInfo.newsImages.length >= 3
                  ? 3
                  : postInfo.newsImages.length === 2
                  ? 2
                  : 1
              }
            >
              {postInfo.newsImages.length !== 0 ? (
                postInfo.newsImages.map((image: ImagesOnNews) => (
                  <Center>
                    <Image
                      src={`http://localhost:5000/${image.imageUrl}`}
                      key={image.imageUrl}
                      radius="sm"
                      width={"400px"}
                      height={"400px"}
                    />
                  </Center>
                ))
              ) : (
                <Center>
                  <Text>В данной новости никаких вложений нет</Text>
                </Center>
              )}
            </SimpleGrid>
            {!like ? (
              <IconHeartPlus style={{ cursor: "pointer" }} size={50} />
            ) : (
              <IconHearts style={{ cursor: "pointer" }} size={50} />
            )}
          </Card.Section>
          <Card.Section>
            <Text ml={30} size={"xl"}>
              Здесь вы можете оставить свой комментарий
            </Text>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Group position={"apart"}>
                <TextInput
                  style={{ width: "1000px" }}
                  variant="unstyled"
                  size={"xl"}
                  icon={<IconBallpen />}
                  placeholder={"Напишите свой комментарий"}
                  error={errors.comment && "Некорректный пароль"}
                  {...register("comment", {
                    required: true,
                  })}
                />
                <Button type={"submit"} mr={80} color={"teal"}>
                  Отправить
                </Button>
              </Group>
            </form>
          </Card.Section>
          {dataComment.length < 1 ? (
            <>
              <Divider />
              <Center mt={10}>
                <Text size={"xl"}>
                  К данному посту комментариев нет, напишите первый комментарий!
                </Text>
              </Center>
            </>
          ) : (
            <>
              <Card.Section>
                <Text ml={40} size={"xl"}>
                  Комментарии:
                </Text>
                <Divider my="sm" />
              </Card.Section>
              <Card.Section>
                {dataComment.map(
                  ({
                    id,
                    comment,
                    createdAt,
                    user,
                  }: {
                    id: number;
                    comment: string;
                    createdAt: string;
                    user: {
                      nickname: string;
                    };
                  }) => (
                    <div key={id}>
                      <Group position={"apart"} mr={10}>
                        <Text size={"xl"} color={"teal"} ml={30}>
                          {user.nickname}
                        </Text>
                        <Text size={"md"}>
                          Комментарий создан:{" "}
                          {dayjs(createdAt)
                            .locale("ru")
                            .format("DD MMMM YYYY HH:mm")}
                        </Text>
                      </Group>
                      <Center>
                        <ScrollArea>
                          <Blockquote color="green">
                            <Text size={"xl"}>{comment}</Text>
                          </Blockquote>
                        </ScrollArea>
                      </Center>
                      <Divider my="sm" />
                    </div>
                  )
                )}
              </Card.Section>
            </>
          )}
        </Card>
      </Container>
    </MainLayout>
  );
};
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  console.log("АЙДИ", ctx.query.id);
  const dataPost = await getSelectedPost(ctx.query.id);
  const dataComment = await getAllComments(ctx.query.id);

  return { props: { dataPost, dataComment } };
}

export default PostPage;
