import React from "react";
import { Center, Group, Text } from "@mantine/core";
import { Header as MantineHeader } from "@mantine/core";

const HeaderAuth = () => {
  return (
    <MantineHeader height={100}>
      <Center>
        <Group>
          <Text size={50} weight={"bold"}>
            СИСО
          </Text>
        </Group>
      </Center>
    </MantineHeader>
  );
};

export default HeaderAuth;
