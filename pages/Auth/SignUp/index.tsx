import React, { useContext } from "react";
import {
  Button,
  Center,
  Container,
  Input,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import MainLayout from "../../../Components/MainLayout";
import {
  IconAt,
  IconCheck,
  IconError404,
  IconLock,
  IconSun,
  IconUser,
} from "@tabler/icons";
import { useRouter } from "next/router";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { registration } from "../../../http/userAPI";
import { showNotification, updateNotification } from "@mantine/notifications";
import AuthContext from "../../../Context/AuthContext";
import UserContext from "../../../Context/UserContext";
import { closeModal, openContextModal, openModal } from "@mantine/modals";

type Inputs = {
  nickname: string;
  email: string;
  password: string;
};
const SignUp = () => {
  // @ts-ignore
  const [userInfo, setUserInfo] = useContext(UserContext);
  // @ts-ignore
  const [isAuth, setIsAuth] = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = (data) =>
    signUp(data.nickname, data.email, data.password);
  const signUp = async (nickname: string, email: string, password: string) => {
    try {
      const response = await registration(nickname, email, password);
      console.log(response);

      showNotification({
        id: "load-data",
        loading: true,
        title: "Сохранение данных...",
        message: "Идет сохранение ваших данных",
        autoClose: false,
        disallowClose: true,
        radius: "xl",
      });

      setTimeout(() => {
        updateNotification({
          id: "load-data",
          color: "teal",
          title: "Авторизация прошла успешно",
          message: "Вы успешно авторизованы",
          icon: <IconCheck size={16} />,
          autoClose: 2000,
          radius: "xl",
        });
      }, 1000);
      setTimeout(() => {
        openModal({
          modalId: "signUpModal",
          centered: true,
          title:
            "Ваш аккаунт зарегестрирован, теперь войдите в систему под своим аккаунтом",
          children: (
            <Button
              color={"teal"}
              fullWidth
              onClick={() =>
                router
                  .push("/Auth/SignIn")
                  .then(() => closeModal("signUpModal"))
              }
              mt="md"
            >
              Войти
            </Button>
          ),
        });
      }, 1200);
    } catch (e) {
      showNotification({
        icon: <IconError404 />,
        radius: "xl",
        title: "Ошибка",
        message: "Что-то пошло не так",
      });
    }
  };
  return (
    <MainLayout>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Center>
            <Text size={40} weight="bold" mt={50} mb={50}>
              Регистрация аккаунта
            </Text>
          </Center>
          <Input.Wrapper label="Имя пользователя" required>
            <TextInput
              error={errors.nickname && "Некорректное имя пользователя"}
              icon={<IconUser />}
              placeholder="Введите имя пользователя"
              {...register("nickname", {
                required: true,
              })}
            />
          </Input.Wrapper>
          <Input.Wrapper label="Email" required>
            <TextInput
              error={errors.email && "Некорректный email"}
              icon={<IconAt />}
              placeholder="Your email"
              {...register("email", {
                required: true,
                pattern: /^\S+@\S+$/,
              })}
            />
          </Input.Wrapper>
          <PasswordInput
            error={errors.password && "Некорректный пароль"}
            icon={<IconLock />}
            placeholder="Password"
            label="Password"
            withAsterisk
            {...register("password", {
              required: true,
              minLength: 8,
              pattern: /[^А-Яа-я0-9]/,
            })}
          />
          <Center mt={50}>
            <Button
              variant="gradient"
              gradient={{ from: "teal", to: "lime", deg: 105 }}
              size="lg"
              type="submit"
            >
              Регистрация
            </Button>
          </Center>
        </form>
      </Container>
      <Center>
        <Text>
          У вас уже есть аккаунт?{" "}
          <Text
            component={Link}
            href={"/Auth/SignIn"}
            color={"teal"}
            size={18}
            td={"underline"}
          >
            Войти
          </Text>
        </Text>
      </Center>
    </MainLayout>
  );
};

export default SignUp;
