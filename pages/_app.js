import "../styles/globals.css";
import { Box, ChakraProvider, Heading, Text } from "@chakra-ui/react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
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
        justifyContent={"space-between"}
        padding={5}
      >
        <Heading>Nic Toporcov</Heading>
        <Box>
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
          <Link href={"/contact"} passHref>
            <a>
              <NTButton>Contact</NTButton>
            </a>
          </Link>
        </Box>
      </Box>

      <main className={styles.main}>
        <Component {...pageProps} />
      </main>

      <GithubButton />
    </ChakraProvider>
  );
}

export default MyApp;
