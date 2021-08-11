import { Box, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";

export function HeroSection() {
  return (
    <Box display={"flex"} flexDirection={{ base: "column", md: "row" }}>
      <Box
        marginX={"auto"}
        rounded={1000}
        overflow={"hidden"}
        position={"relative"}
        width={250}
        height={250}
        mb={10}
      >
        <Image src={"/avatar.jpg"} layout={"fill"} />
      </Box>
      <Box
        maxW={{ base: "100%", md: "60%" }}
        pl={{ base: 0, md: 20 }}
        textAlign={{ base: "center", md: "left" }}
      >
        <Heading as={"h1"} mb={4}>
          Hi, I&apos;m Nic
        </Heading>
        <Text>
          I am a Front-End Designer and Developer. I&apos;ve been working as a
          UI/UX Designer since 2014 and as a Front-End Developer since 2015.
          <br />
          <br />I am currently working in the transportation industry where my
          main focus are design and development for Kiosks, Mobile Applications,
          E-Ticketing Platforms and Admin applications. I also provide
          assistance in some DevOps functions.
        </Text>
      </Box>
    </Box>
  );
}
