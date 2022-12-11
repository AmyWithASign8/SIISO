import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ fontFamily: "Nunito, sans-serif", colorScheme: "dark" }}
    >
      <Component {...pageProps} />
    </MantineProvider>
  );
}
