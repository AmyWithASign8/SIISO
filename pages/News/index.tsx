import React from "react";
import HeaderAuth from "../../Components/HeaderAuth";
import { Button, Center, Group, Text } from "@mantine/core";
import Link from "next/link";
import { IconArrowRightRhombus } from "@tabler/icons";

const News = () => {
  return (
    <div>
      <HeaderAuth isAuth={false} />
      <Group mt={10} ml={30}>
        <Text c={"dimmed"} component={Link} href={"/"}>
          Главная
        </Text>
        <IconArrowRightRhombus />
        <Text color={"teal"}>Новости</Text>
      </Group>
      <Center mt={50}>
        <Text size={50} weight={"bold"}>
          Новости
        </Text>
      </Center>
      <Button component={Link} href={"/News/CreateNews"} color={"teal"}>
        Создать новость
      </Button>
    </div>
  );
};

export default News;
