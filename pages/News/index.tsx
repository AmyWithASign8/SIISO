import React from "react";
import { Button, Center, Flex, Group, Text, TextInput } from "@mantine/core";
import Link from "next/link";
import { IconArrowRightRhombus, IconSearch } from "@tabler/icons";
import MainLayout from "../../Components/MainLayout";

const News = () => {
  return (
    <MainLayout>
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
      <Flex direction={"column"} align={"flex-start"} ml={30}>
        <TextInput placeholder={"Поиск"} icon={<IconSearch />} mb={20} />
        <Button component={Link} href={"/News/CreateNews"} color={"teal"}>
          Создать новость
        </Button>
      </Flex>
    </MainLayout>
  );
};

export default News;
