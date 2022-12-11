import React from "react";
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
import { IconAt } from "@tabler/icons";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";

const SignIn = () => {
  const form = useForm({
    initialValues: { email: "", password: "" },

    // functions will be used to validate values at corresponding key
    validate: {
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

  const handleSignIn = () => {
    router.push("/");
  };
  return (
    <MainLayout>
      <Container>
        <form onSubmit={form.onSubmit(handleSignIn)}>
          <Center>
            <Text size={40} weight="bold" mt={50} mb={50}>
              Вход в аккаунт
            </Text>
          </Center>
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

export default SignIn;
