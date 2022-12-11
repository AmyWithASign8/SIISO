import React from "react";
import { Center, Group, Switch, Text, useMantineTheme } from "@mantine/core";
import { Header as MantineHeader } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons";

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
