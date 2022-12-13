import React from "react";
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
import { IconAt, IconLock, IconUser } from "@tabler/icons";
import { useRouter } from "next/router";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  nickname: string;
  email: string;
  password: string;
};
const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();

  const handleSignUp = () => {
    router.push("/");
  };
  const onSubmit: SubmitHandler<Inputs> = (data) => handleSignUp();
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
              pattern: /[^A-Za-z0-9]/,
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
