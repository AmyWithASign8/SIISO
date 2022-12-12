import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import React from "react";
import ThemeContext from "../Components/context";

export default function App({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    if (typeof window !== undefined) {
      setTheme(localStorage.getItem("theme"));
    } else setTheme("dark");
  }, []);
  const [theme, setTheme] = React.useState<string | null>("");
  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: theme, fontFamily: "Nunito, sans-serif" }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </ThemeContext.Provider>
  );
}
