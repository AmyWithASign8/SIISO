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
import { IconAt } from "@tabler/icons";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";

const SignUp = () => {
  const form = useForm({
    initialValues: { nickname: "", email: "", password: "" },

    // functions will be used to validate values at corresponding key
    validate: {
      nickname: (value) =>
        /[А-Яа-яЁё]/.test(value)
          ? "Должны быть только латинские буквы"
          : value.length <= 0
          ? "Имя пользователя не может быть пустым"
          : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Некорректный email"),
      password: (value) =>
        value.length < 8
          ? "Длина пароля дожна быть не менее 8 символов"
          : /[А-Яа-яЁё]/.test(value)
          ? "В пароле должны быть только латинские буквы"
          : null,
    },
  });
  const router = useRouter();

  const handleSignUp = () => {
    router.push("/");
  };
  return (
    <MainLayout>
      <Container>
        <form onSubmit={form.onSubmit(handleSignUp)}>
          <Center>
            <Text size={40} weight="bold" mt={50} mb={50}>
              Регистрация аккаунта
            </Text>
          </Center>
          <Input.Wrapper label="Имя пользователя" required>
            <TextInput
              icon={<IconAt />}
              placeholder="Введите имя пользователя"
              {...form.getInputProps("nickname")}
            />
          </Input.Wrapper>
          <Input.Wrapper label="Email" required>
            <TextInput
              icon={<IconAt />}
              placeholder="Your email"
              {...form.getInputProps("email")}
            />
          </Input.Wrapper>
          <PasswordInput
            placeholder="Password"
            label="Password"
            withAsterisk
            {...form.getInputProps("password")}
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
    </MainLayout>
  );
};

export default SignUp;
