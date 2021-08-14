import "../styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as ga from "../lib/ga";
import AppFrame from "../components/_frame";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handlePageView = (url) => {
      ga.pageview(url);
    };

    router.events.on("routeChangeComplete", handlePageView);

    return () => {
      router.events.off("routeChangeComplete", handlePageView);
    };
  }, [router.events]);

  const config = {
    initialColorMode: "light",
    useSystemColorMode: true,
  };

  const theme = extendTheme({ config });

  return (
    <ChakraProvider theme={theme}>
      <AppFrame Component={Component} pageProps={pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
