import "../styles/globals.css";
import { Box, ChakraProvider, Heading, Text } from "@chakra-ui/react";
import Head from "next/head";
import NTButton from "../components/buttons/NTButton";
import Link from "next/link";
import GithubButton from "../components/buttons/GithubButton";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Head>
        <title>Nic Toporcov</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        as={"nav"}
        display={"flex"}
        flexWrap={"nowrap"}
        justifyContent={{ base: "center", md: "space-between" }}
        alignItems={"center"}
        padding={5}
        flexDirection={{ base: "column", md: "row" }}
        position={"sticky"}
        top={0}
        zIndex={100}
        backdropFilter={"blur(10px)saturate(130%)"}
        bgColor={"rgba(255,255,255,0.76)"}
        borderBottom={"solid 1px #e8e8e8"}
      >
        <Heading>Nic Toporcov</Heading>
        <Box display={{ base: "none", md: "unset" }}>
          <Link href={"/"} passHref>
            <a>
              <NTButton>Home</NTButton>
            </a>
          </Link>
          <Link href={"/blog"} passHref>
            <a>
              <NTButton>Blog</NTButton>
            </a>
          </Link>
          {/*<Link href={"/contact"} passHref>*/}
          {/*  <a>*/}
          {/*    <NTButton>Contact</NTButton>*/}
          {/*  </a>*/}
          {/*</Link>*/}
        </Box>
      </Box>

      <main style={{ paddingTop: "3rem" }}>
        <Component {...pageProps} />
      </main>

      <GithubButton />
    </ChakraProvider>
  );
}

export default MyApp;
