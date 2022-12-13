import React from "react";
import HeaderAuth from "../../Components/HeaderAuth";
import {
  Card,
  Group,
  Text,
  Image,
  SimpleGrid,
  Container,
  Center,
} from "@mantine/core";
import { IconArrowRightRhombus } from "@tabler/icons";
import Link from "next/link";

const Legends = () => {
  const images = [
    "https://sun9-67.userapi.com/impg/VxOXYKyixKoTqmAk8umgNztO0Xt9ak-7dfLo-Q/Ib-iALbwYNM.jpg?size=803x1080&quality=96&sign=a1bbfa911404c3abec58630b00b8d6f8&type=album",
    "https://sun9-75.userapi.com/impf/c824201/v824201259/a4e4e/BpfxdZGhgUQ.jpg?size=780x1040&quality=96&sign=a0c68b6ad3ae0476d111b88805825e33&type=album",
    "https://sun9-59.userapi.com/impf/c834302/v834302259/a2789/3zdZBtxlxx8.jpg?size=1386x1040&quality=96&sign=0bb29c2f2bc9f48bb1289d37b2a0c360&type=album",
  ];
  return (
    <div>
      <HeaderAuth isAuth={false} />
      <Group mt={10} ml={30}>
        <Text c={"dimmed"} component={Link} href={"/"}>
          Главная
        </Text>
        <IconArrowRightRhombus />
        <Text color={"teal"}>Зал славы</Text>
      </Group>
      <Center mt={50}>
        <Text size={50} weight={"bold"}>
          Зал славы
        </Text>
      </Center>
      <Container mt={50}>
        <Card withBorder shadow="sm" radius="md">
          <Card.Section withBorder inheritPadding py="xs">
            <Group position="apart">
              <Text weight={500} size={"xl"}>
                Генрих Великий
              </Text>
            </Group>
          </Card.Section>

          <Text mt="sm" color="dimmed" size="lg">
            Генрих Великий, погоняло псих, легенда, его боялся даже Павел
            Второй, к сожалению покинул наши ряды, сейчас держит Америку в
            трусах
          </Text>

          <Card.Section inheritPadding mt="sm" pb="md">
            <SimpleGrid cols={3}>
              {images.map((image) => (
                <Image src={image} key={image} radius="sm" />
              ))}
            </SimpleGrid>
          </Card.Section>
        </Card>
      </Container>
    </div>
  );
};

export default Legends;
