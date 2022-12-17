import type { AppProps } from "next/app";
import { ColorScheme, MantineProvider, Notification } from "@mantine/core";
import React from "react";
import ThemeContext from "../Components/Context/context";
import { NotificationsProvider } from "@mantine/notifications";
import { DeepPartial } from "@mantine/styles/lib/theme/types/DeepPartial";
import AuthContext from "../Components/Context/AuthContext";
import UserContext from "../Components/Context/UserContext";

export default function App({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    if (typeof window !== undefined) {
      setTheme(localStorage.getItem("theme") as DeepPartial<ColorScheme>);
    } else setTheme("dark");
  }, []);
  const [theme, setTheme] = React.useState<DeepPartial<ColorScheme>>("dark");
  const [isAuth, setIsAuth] = React.useState<boolean>(false);
  const [userInfo, setUserInfo] = React.useState<[""]>([""]);
  React.useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);
  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      <UserContext.Provider value={[userInfo, setUserInfo]}>
        <AuthContext.Provider value={[isAuth, setIsAuth]}>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{ colorScheme: theme, fontFamily: "Nunito, sans-serif" }}
          >
            <NotificationsProvider>
              <Component {...pageProps} />
            </NotificationsProvider>
          </MantineProvider>
        </AuthContext.Provider>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}
