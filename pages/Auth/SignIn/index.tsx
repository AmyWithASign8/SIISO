import React, { useContext } from "react";
import {
  Button,
  Center,
  Checkbox,
  Container,
  Input,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import MainLayout from "../../../Components/MainLayout";
import { IconAt, IconCheck, IconError404, IconLock } from "@tabler/icons";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import ThemeContext from "../../../Context/context";
import Link from "next/link";
import { showNotification, updateNotification } from "@mantine/notifications";
import { check, login } from "../../../http/userAPI";
import UserContext from "../../../Context/UserContext";
import AuthContext from "../../../Context/AuthContext";
import RememberMeContext from "../../../Context/RememberMe";
type Inputs = {
  email: string;
  password: string;
};
const SignIn = () => {
  const [rememberMe, setRememberMe] = useContext(RememberMeContext);
  React.useEffect(() => {
    console.log(rememberMe);
  }, [rememberMe]);
  const [userInfo, setUserInfo] = useContext(UserContext);
  const [isAuth, setIsAuth] = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();
  const signin = async (email: string, password: string) => {
    try {
      const response: any = await login(email, password);
      console.log(response);
      setUserInfo([
        response.nickname,
        response.email,
        response.id,
        response.role,
      ]);
      if (rememberMe) {
        localStorage.setItem("nickname", response.nickname);
        localStorage.setItem("email", response.email);
        localStorage.setItem("id", response.id);
        localStorage.setItem("role", response.role);
      }

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
        router.push("/");
        setIsAuth(true);
      }, 1200);
    } catch (e) {
      showNotification({
        icon: <IconError404 />,
        radius: "xl",
        title: "Ошибка",
        message: "Неверный логин или пароль",
      });
    }
  };
  const onSubmit: SubmitHandler<Inputs> = (data) =>
    signin(data.email, data.password);
  console.log(userInfo);
  return (
    <MainLayout>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Center>
            <Text size={40} weight="bold" mt={50} mb={50}>
              Вход в аккаунт
            </Text>
          </Center>
          <Input.Wrapper label="Email" required>
            <TextInput
              error={errors.email && "Некорректный email"}
              icon={<IconAt />}
              placeholder="Your email"
              type="email"
              {...register("email", {
                required: true,
                pattern: /^\S+@\S+$/,
              })}
            />
          </Input.Wrapper>
          <PasswordInput
            icon={<IconLock />}
            error={errors.password && "Некорректный пароль"}
            placeholder="Password"
            label="Password"
            withAsterisk
            {...register("password", {
              required: true,
              minLength: 8,
              pattern: /[^А-Яа-я0-9]/,
            })}
          />
          <Checkbox
            label="Запомнить меня"
            color="teal"
            mt={40}
            size={"md"}
            checked={rememberMe}
            onClick={() =>
              rememberMe ? setRememberMe(false) : setRememberMe(true)
            }
          />
          <Center mt={30}>
            <Button
              variant="gradient"
              gradient={{ from: "teal", to: "lime", deg: 105 }}
              size="lg"
              type="submit"
            >
              Войти
            </Button>
          </Center>
        </form>
      </Container>
      <Center>
        <Text>
          Еще не зарегистрировались?{" "}
          <Text
            component={Link}
            href={"/Auth/SignUp"}
            color={"teal"}
            size={18}
            td={"underline"}
          >
            Зарегистрироваться
          </Text>
        </Text>
      </Center>
    </MainLayout>
  );
};

export default SignIn;
