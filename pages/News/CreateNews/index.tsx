import React from "react";
import HeaderAuth from "../../../Components/HeaderAuth";
import {
  Button,
  Center,
  Container,
  Group,
  Input,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import Link from "next/link";
import {
  IconArrowRightRhombus,
  IconCheck,
  IconNews,
  IconPhoto,
  IconUpload,
  IconWriting,
  IconX,
} from "@tabler/icons";
import { Dropzone, IMAGE_MIME_TYPE, DropzoneProps } from "@mantine/dropzone";
import ThemeContext from "../../../Components/context";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { showNotification, updateNotification } from "@mantine/notifications";

type Inputs = {
  nameNews: string;
};
const CreateNews = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const themeMantine = useMantineTheme();

  const route = useRouter();
  const handleCreatePost = () => {
    showNotification({
      id: "load-data",
      loading: true,
      title: "Загрузка...",
      message: "Идет загрузка вашего поста",
      autoClose: false,
      disallowClose: true,
      radius: "xl",
    });

    setTimeout(() => {
      updateNotification({
        id: "load-data",
        color: "teal",
        title: "Загрузка завершена",
        message: "Ваш пост успешно загружен",
        icon: <IconCheck size={16} />,
        autoClose: 2000,
        radius: "xl",
      });
    }, 1000);
    setTimeout(() => {
      route.push("/News");
    }, 1200);
  };
  const onSubmit: SubmitHandler<Inputs> = (data) => handleCreatePost();

  return (
    <div>
      <HeaderAuth isAuth={false} />
      <Group mt={10} ml={30}>
        <Text c={"dimmed"} component={Link} href={"/"}>
          Главная
        </Text>
        <IconArrowRightRhombus />
        <Text c={"dimmed"} component={Link} href={"/News"}>
          Новости
        </Text>
        <IconArrowRightRhombus />
        <Text color={"teal"}>Создать новость</Text>
      </Group>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <Center>
            <Text weight={"bold"} size={30}>
              Панель создания новости
            </Text>
          </Center>

          <Input.Wrapper label={"Название новости"} required>
            <TextInput
              error={errors.nameNews && "Название не может быть пустым"}
              placeholder={"Укажите название новости"}
              icon={<IconNews />}
              {...register("nameNews", { required: true })}
            />
          </Input.Wrapper>
          <Input.Wrapper label={"Описание новости"} required>
            <TextInput
              placeholder={"Укажите описание новости"}
              icon={<IconWriting />}
            />
          </Input.Wrapper>
          <Input.Wrapper label={"Прикрепление фотографий"}>
            <Dropzone
              onDrop={(files) => console.log("accepted files", files)}
              onReject={(files) => console.log("rejected files", files)}
              maxSize={3 * 1024 ** 2}
              accept={IMAGE_MIME_TYPE}
            >
              <Group
                position="center"
                spacing="xl"
                style={{ minHeight: 220, pointerEvents: "none" }}
              >
                <Dropzone.Accept>
                  <IconUpload
                    size={50}
                    stroke={1.5}
                    color={
                      themeMantine.colors[themeMantine.primaryColor][
                        themeMantine.colorScheme === "dark" ? 4 : 6
                      ]
                    }
                  />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX
                    size={50}
                    stroke={1.5}
                    color={
                      themeMantine.colors.red[
                        themeMantine.colorScheme === "dark" ? 4 : 6
                      ]
                    }
                  />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconPhoto size={50} stroke={1.5} />
                </Dropzone.Idle>

                <div>
                  <Text size="xl" inline>
                    Нажмите сюда или перетащите сюда файлы которые вы хотите
                    прикепить
                  </Text>
                  <Text size="sm" color="dimmed" inline mt={7}>
                    Прикрепляйте сколько угодно файлов, размер каждого файла не
                    должен превышать 5МБ
                  </Text>
                </div>
              </Group>
            </Dropzone>
          </Input.Wrapper>
          <Center mt={20}>
            <Button
              variant="gradient"
              gradient={{ from: "teal", to: "lime", deg: 105 }}
              size="lg"
              type="submit"
            >
              Создать пост
            </Button>
          </Center>
        </Container>
      </form>
    </div>
  );
};

export default CreateNews;
