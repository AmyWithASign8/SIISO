import React, { useContext } from "react";
import {
  Button,
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
  IconPhoto,
  IconUpload,
  IconUser,
  IconX,
} from "@tabler/icons";
import MainLayout from "../../../Components/MainLayout";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { showNotification, updateNotification } from "@mantine/notifications";
import UserContext from "../../../Components/Context/UserContext";
import { updateUser } from "../../../http/userAPI";
type Inputs = {
  nickname: string;
  email: string;
  password: string;
};

const AccountSettings = () => {
  // @ts-ignore
  const [userInfo, setUserInfo] = useContext(UserContext);
  const [inputNickName, setInputNickName] = React.useState<string>(userInfo[0]);
  const route = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const saveChanges = async (nickname: string) => {
    try {
      const response = await updateUser(userInfo[2], nickname);
      console.log(response);
      showNotification({
        id: "load-data",
        loading: true,
        title: "Сохранение изменений...",
        message: "Идет сохранение ваших изменений",
        autoClose: false,
        disallowClose: true,
        radius: "xl",
      });

      setTimeout(() => {
        updateNotification({
          id: "load-data",
          color: "teal",
          title: "Успешно сохранено",
          message: "Ваши изменения успешно сохранены",
          icon: <IconCheck size={16} />,
          autoClose: 2000,
          radius: "xl",
        });
      }, 1000);
      setTimeout(() => {
        route.push("/");
      }, 1200);
    } catch (e) {
      console.log(e);
    }
  };

  const clearChanges = () => {
    setInputNickName(userInfo[0]);
  };
  const themeMantine = useMantineTheme();

  const onSubmit: SubmitHandler<Inputs> = (data) => saveChanges(data.nickname);
  return (
    <MainLayout>
      <Group mt={10} ml={30}>
        <Text c={"dimmed"} component={Link} href={"/"}>
          Главная
        </Text>
        <IconArrowRightRhombus />
        <Text c={"teal"}>Настройки аккаунта</Text>
      </Group>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input.Wrapper label="Ваше имя">
            <TextInput
              error={errors.nickname && "Имя пользователя не может быть пустым"}
              icon={<IconUser />}
              placeholder="Введите новое имя пользователя"
              {...register("nickname", {
                required: true,
              })}
              value={inputNickName}
              onChange={(e) => setInputNickName(e.target.value)}
            />
          </Input.Wrapper>
          <Input.Wrapper label={"Изменение аватара"}>
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
                    Нажмите или перетащите сюда файлы которые вы хотите
                    прикрепить
                  </Text>
                  <Text size="sm" color="dimmed" inline mt={7}>
                    Прикрепляйте сколько угодно файлов, размер каждого файла не
                    должен превышать 5МБ
                  </Text>
                </div>
              </Group>
            </Dropzone>
          </Input.Wrapper>
          <Group position={"center"} mt={50}>
            <Button color={"gray"} component={Link} href={"/"}>
              На главную
            </Button>
            <Button color={"red"} onClick={clearChanges}>
              Сбросить
            </Button>
            <Button color={"teal"} type={"submit"}>
              Сохранить изменения
            </Button>
          </Group>
        </form>
      </Container>
    </MainLayout>
  );
};

export default AccountSettings;
