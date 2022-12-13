import React, { useContext } from "react";
import {
  Button,
  Center,
  Container,
  Input,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import MainLayout from "../../../Components/MainLayout";
import { IconAt, IconLock } from "@tabler/icons";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import ThemeContext from "../../../Components/context";
import Link from "next/link";

type Inputs = {
  email: string;
  password: string;
};
const SignIn = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();
  const handleSignIn = () => {
    router.push("/");
  };
  const onSubmit: SubmitHandler<Inputs> = (data) => handleSignIn();

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
