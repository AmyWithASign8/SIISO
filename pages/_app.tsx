import type { AppProps } from "next/app";
import { ColorScheme, MantineProvider, Notification } from "@mantine/core";
import React from "react";
import ThemeContext from "../Context/context";
import {
  NotificationsProvider,
  showNotification,
  updateNotification,
} from "@mantine/notifications";
import { DeepPartial } from "@mantine/styles/lib/theme/types/DeepPartial";
import AuthContext from "../Context/AuthContext";
import UserContext from "../Context/UserContext";
import { useRouter } from "next/router";
import { check, getOneUser, login } from "../http/userAPI";
import { IconCheck, IconError404 } from "@tabler/icons";
import RememberMeContext from "../Context/RememberMe";
import { ModalsProvider } from "@mantine/modals";
import PostContext from "../Context/PostContext";

export default function App({ Component, pageProps }: AppProps) {
  const [rememberMe, setRememberMe] = React.useState<boolean>(false);
  const router = useRouter();
  React.useEffect(() => {
    if (typeof window !== undefined) {
      setTheme(localStorage.getItem("theme") as DeepPartial<ColorScheme>);
    } else setTheme("dark");
  }, []);
  const [theme, setTheme] = React.useState<DeepPartial<ColorScheme>>("dark");
  const [isAuth, setIsAuth] = React.useState<boolean>(false);
  const [userInfo, setUserInfo] = React.useState<[""]>([""]);
  const [postInfo, setPostInfo] = React.useState<{}>({});
  const userRemember = async (id: number) => {
    try {
      const response = await getOneUser(id);
      // @ts-ignore
      setUserInfo([response.nickname, response.email, response.id]);
      console.log(response);
    } catch (e) {}
  };
  React.useEffect(() => {
    if (rememberMe) {
      check().then((data) => {
        setIsAuth(true);
        // @ts-ignore
        userRemember(data.id);
      });
    }

    if (!isAuth) {
      router.push("/Auth/SignUp");
    }
  }, []);

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      <UserContext.Provider value={[userInfo, setUserInfo]}>
        <AuthContext.Provider value={[isAuth, setIsAuth]}>
          <RememberMeContext.Provider value={[rememberMe, setRememberMe]}>
            <PostContext.Provider value={[postInfo, setPostInfo]}>
              <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{ colorScheme: theme, fontFamily: "Nunito, sans-serif" }}
              >
                <NotificationsProvider>
                  <ModalsProvider
                    labels={{
                      confirm: "Submit",
                      cancel: "Cancel",
                    }}
                  >
                    <Component {...pageProps} />
                  </ModalsProvider>
                </NotificationsProvider>
              </MantineProvider>
            </PostContext.Provider>
          </RememberMeContext.Provider>
        </AuthContext.Provider>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}
