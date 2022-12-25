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
import { GetServerSidePropsContext } from "next";
import { getUserNews } from "../http/newsAPI";

export default function App({ Component, pageProps }: AppProps) {
  const [rememberMe, setRememberMe] = React.useState<boolean>(false);
  const router = useRouter();
  React.useEffect(() => {
    if (typeof window !== undefined) {
      setTheme(localStorage.getItem("theme") as DeepPartial<ColorScheme>);
    } else setTheme("dark");
  }, []);
  let userLocalStorageInfo;
  if (typeof window !== "undefined") {
    userLocalStorageInfo = [
      localStorage.getItem("nickname"),
      localStorage.getItem("email"),
      localStorage.getItem("id"),
      localStorage.getItem("role"),
    ];
  }

  const [theme, setTheme] = React.useState<DeepPartial<ColorScheme>>("dark");
  const [isAuth, setIsAuth] = React.useState<boolean>(false);
  // @ts-ignore
  const [userInfo, setUserInfo] = React.useState<any>(userLocalStorageInfo);
  const [postInfo, setPostInfo] = React.useState<{}>({});
  React.useEffect(() => {
    if (
      userInfo[0] !== null &&
      userInfo[1] !== null &&
      userInfo[2] !== null &&
      userInfo[3] !== null
    ) {
      setIsAuth(true);

      console.log("Инфа о пользователе", userInfo);
      if (
        (isAuth && router.pathname === "/Auth/SignIn") ||
        (isAuth && router.pathname === "/Auth/SignUp")
      ) {
        router.push("/");
      }
    }
  }, [isAuth, router.pathname]);
  React.useEffect(() => {
    if (!isAuth) {
      router.push("/Auth/SignIn");
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

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const data = await check();
  console.log("asfaggag");
  return { props: { dataNew: data } };
}
