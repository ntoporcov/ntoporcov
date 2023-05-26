import {
  Box,
  Button,
  Container,
  Heading,
  Icon,
  Modal,
  ModalContent,
  ModalOverlay,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import NTButton from "./buttons/NTButton";
import Link from "next/link";
import GithubButton from "./buttons/GithubButton";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LightSaber from "./svgs/LightSaber";

const NavLinks = () => {
  return (
    <>
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
      <Link href={"/scripts"} passHref>
        <a>
          <NTButton>Scripts</NTButton>
        </a>
      </Link>
      {/*<Link href={"/resume.pdf"} passHref>*/}
      {/*  <a target={"_blank"}>*/}
      {/*    <NTButton>Resume</NTButton>*/}
      {/*  </a>*/}
      {/*</Link>*/}
      <LightSaber />
    </>
  );
};

function AppFrame({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      setNavModal(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  const [NavModal, setNavModal] = useState(false);
  const modalBgColor = useColorModeValue(
    "rgba(210,210,210,0.89)",
    "rgba(26,26,26,0.94)"
  );

  const navBgColor = useColorModeValue(
    "rgba(255,255,255,0.76)",
    "rgba(11,19,23,0.76)"
  );

  const navBorderBottom = useColorModeValue("#e8e8e8", "#2b2b2b");

  const routesWithNoNav = ["/lunabday", "/luna"];

  console.log(router.route);

  if (routesWithNoNav.some((x) => router.route.includes(x))) {
    return <Component {...pageProps} />;
  }

  return (
    <>
      <Head>
        <title>Nic Toporcov</title>
        <meta name="title" content="Nic Toporcov" />
        <meta
          name="description"
          content="I am a Front-End Designer and Developer. I've been working as a UI/UX Designer since 2014 and as a Front-End Developer since 2015. I am currently working in the transportation industry where my main focus are design and development for Kiosks, Mobile Applications, E-Ticketing Platforms and Admin applications. I also provide assistance in some DevOps functions."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://metatags.io/" />
        <meta property="og:title" content="Nic Toporcov" />
        <meta
          property="og:description"
          content="I am a Front-End Designer and Developer. I've been working as a UI/UX Designer since 2014 and as a Front-End Developer since 2015.I am currently working in the transportation industry where my main focus are design and development for Kiosks, Mobile Applications, E-Ticketing Platforms and Admin applications. I also provide assistance in some DevOps functions."
        />
        <meta property="og:image" content="/webcover.jpg" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://ntoporcov.com" />
        <meta property="twitter:title" content="Nic Toporcov" />
        <meta
          property="twitter:description"
          content="I am a Front-End Designer and Developer. I've been working as a UI/UX Designer since 2014 and as a Front-End Developer since 2015. I am currently working in the transportation industry where my main focus are design and development for Kiosks, Mobile Applications, E-Ticketing Platforms and Admin applications. I also provide assistance in some DevOps functions."
        />
        <meta property="twitter:image" content="/webcover.jpg" />
        <link rel="icon" href="/favicon.ico" />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      </Head>

      <Box
        as={"nav"}
        display={"flex"}
        flexWrap={"nowrap"}
        justifyContent={"space-between"}
        alignItems={"center"}
        padding={5}
        position={"sticky"}
        top={0}
        zIndex={100}
        backdropFilter={"blur(10px)saturate(130%)"}
        bgColor={navBgColor}
        borderBottom={"solid 1px " + navBorderBottom}
      >
        <Link href={"/"} passHref>
          <a>
            <Heading>Nic Toporcov</Heading>
          </a>
        </Link>
        <Box display={{ base: "none", md: "unset" }}>
          <NavLinks />
        </Box>
        <Button
          display={{ base: "unset", md: "none" }}
          variant={"ghost"}
          onClick={() => setNavModal(true)}
        >
          <Icon h={8} w={8} as={HamburgerIcon} />
        </Button>
      </Box>

      <Container as={"main"} maxW={"1024px"} centerContent pb={"30vh"}>
        <Component {...pageProps} />
      </Container>

      <Modal isOpen={NavModal} onClose={() => setNavModal(false)}>
        <ModalOverlay
          backdropFilter={"blur(10px)saturate(130%)"}
          bgColor={modalBgColor}
        />
        <ModalContent bg={"none"} shadow={"none"}>
          <VStack spacing={10} padding={10}>
            <NavLinks />
            <Button
              variant={"outline"}
              width={"80%"}
              position={"fixed"}
              bottom={10}
              onClick={() => setNavModal(false)}
              borderColor={"black"}
            >
              Close
            </Button>
          </VStack>
        </ModalContent>
      </Modal>

      <GithubButton />
    </>
  );
}

export default AppFrame;
