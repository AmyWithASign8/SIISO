import React, { FC, useContext } from "react";
import { Center, Group, Switch, Text, useMantineTheme } from "@mantine/core";
import { Header as MantineHeader } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons";
import ThemeContext from "../context";

const HeaderAuth = () => {
  // @ts-ignore
  const [theme, setTheme] = useContext(ThemeContext);

  const handleTheme = () => {
    if (theme == "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  };
  const themeMantine = useMantineTheme();
  return (
    <MantineHeader height={100}>
      <Group mt={10} ml={30} mr={30} position={"apart"}>
        <Center>
          <Text size={50} weight={"bold"}>
            СИСО
          </Text>
        </Center>
        <Group position={"right"}>
          <Switch
            color={theme.colorScheme === "dark" ? "gray" : "dark"}
            onClick={handleTheme}
            size="xl"
            onLabel={
              <IconSun
                size={22}
                stroke={2.5}
                color={themeMantine.colors.yellow[4]}
              />
            }
            offLabel={
              <IconMoonStars
                size={22}
                stroke={2.5}
                color={themeMantine.colors.blue[6]}
              />
            }
          />
        </Group>
      </Group>
    </MantineHeader>
  );
};

export default HeaderAuth;
