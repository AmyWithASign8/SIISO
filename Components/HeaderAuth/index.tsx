import React, { FC, useContext } from "react";
import {
  Button,
  Center,
  Group,
  Menu,
  Switch,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { Header as MantineHeader } from "@mantine/core";
import {
  IconArticle,
  IconCheck,
  IconInbox,
  IconLogout,
  IconMoonStars,
  IconNews,
  IconSettings,
  IconSun,
  IconTrash,
  IconUserCircle,
} from "@tabler/icons";
import ThemeContext from "../Context/context";
import Link from "next/link";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import AuthContext from "../Context/AuthContext";
import UserContext from "../Context/UserContext";

const HeaderAuth = () => {
  // @ts-ignore
  const [isAuth, setIsAuth] = useContext(AuthContext);
  // @ts-ignore
  const [theme, setTheme] = useContext(ThemeContext);
  const [checkSwitch, setCheckSwitch] = React.useState<boolean | undefined>(
    undefined
  );
  const router = useRouter();

  React.useEffect(() => {
    if (typeof window !== undefined) {
      if (localStorage.getItem("checkedSwitch") === "true") {
        setCheckSwitch(true);
      }
    } else setCheckSwitch(false);
  }, []);
  const handleTheme = () => {
    if (theme == "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
      showNotification({
        icon: <IconMoonStars />,
        radius: "xl",
        title: "Переключение темы...",
        message: "Установлена темная тема",
      });
      setCheckSwitch(false);
      localStorage.setItem("checkedSwitch", "false");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
      showNotification({
        icon: <IconSun />,
        radius: "xl",
        title: "Переключение темы...",
        message: "Установлена светлая тема",
      });
      setCheckSwitch(true);
      localStorage.setItem("checkedSwitch", "true");
    }
  };
  const themeMantine = useMantineTheme();
  // @ts-ignore
  const [userInfo, setUserInfo] = useContext(UserContext);
  const logout = () => {
    localStorage.removeItem("token");
    showNotification({
      id: "load-data",
      loading: true,
      title: "Выход из аккаунта...",
      message: "Идет завершение сессии",
      autoClose: false,
      disallowClose: true,
      radius: "xl",
    });

    setTimeout(() => {
      updateNotification({
        id: "load-data",
        color: "teal",
        title: "Успешно",
        message: "Вы успешно вышли из аккаунта",
        icon: <IconCheck size={16} />,
        autoClose: 2000,
        radius: "xl",
      });
    }, 1000);
    setTimeout(() => {
      router.push("/Auth/SignIn");
      setIsAuth(false);
      setUserInfo([""]);
    }, 1200);
  };
  return (
    <MantineHeader height={100}>
      <Group mt={10} ml={30} mr={30} position={"apart"}>
        <Center>
          <Text size={50} weight={"bold"}>
            СИСО
          </Text>
        </Center>
        <Group position={"right"}>
          {isAuth && (
            <>
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Button
                    leftIcon={<IconUserCircle />}
                    color={"teal"}
                    mt={15}
                    size={"md"}
                  >
                    {userInfo[0]}
                  </Button>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>Действия с аккаунтом</Menu.Label>
                  <Menu.Item
                    component={Link}
                    href={"/Account/AccountSettings"}
                    icon={<IconSettings size={14} />}
                  >
                    Настроить аккаунт
                  </Menu.Item>
                  <Menu.Item
                    color="red"
                    icon={<IconLogout size={14} />}
                    onClick={logout}
                  >
                    Выйти из аккаунта
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Button
                    color={"teal"}
                    size={"md"}
                    mt={15}
                    leftIcon={<IconInbox />}
                  >
                    Новости
                  </Button>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>Выберите тип новостей</Menu.Label>
                  <Menu.Item
                    component={Link}
                    href={`/News/MyNews/${userInfo[2]}`}
                    icon={<IconArticle size={14} />}
                  >
                    Мои новости
                  </Menu.Item>
                  <Menu.Item
                    icon={<IconNews size={14} />}
                    component={Link}
                    href={"/News"}
                  >
                    Все новости
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
              <Button
                component={Link}
                href={"/Legends"}
                color={"teal"}
                size={"md"}
                mt={15}
              >
                Зал славы
              </Button>
            </>
          )}
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
            checked={checkSwitch}
          />
        </Group>
      </Group>
    </MantineHeader>
  );
};

export default HeaderAuth;
