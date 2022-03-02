import { Box, Circle, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import { Link as ChakraLink } from "@chakra-ui/react";
import React from "react";

export function HeroSection() {
  return (
    <Box display={"flex"} flexDirection={{ base: "column", md: "row" }}>
      <Box position={"relative"} width={250} height={250} marginX={"auto"}>
        <Circle
          rounded={1000}
          overflow={"hidden"}
          position={"relative"}
          width={250}
          height={250}
          shadow={"xl"}
        >
          <Image src={"/avatar.jpg"} layout={"fill"} />
        </Circle>
        <Circle
          background={"#1652f0"}
          h={20}
          w={20}
          shadow={"xl"}
          position={"absolute"}
          bottom={0}
          right={0}
        >
          <Image src={"/coinbase-icon2.svg"} layout={"fill"} />
        </Circle>
      </Box>
      <Box
        maxW={{ base: "100%", md: "60%" }}
        pl={{ base: 0, md: 20 }}
        textAlign={{ base: "center", md: "left" }}
      >
        <Heading as={"h1"} mb={4} mt={{ base: 10, md: 0 }}>
          Hi, I&apos;m Nic
        </Heading>
        <Text>
          I am a Front-End Designer and Developer. I&apos;ve been working as a
          UI/UX Designer since 2014 and as a Front-End Developer since 2015.
          <br />
          <br />I am currently thrilled to be working at{" "}
          <ChakraLink
            px={1}
            fontWeight={"bold"}
            bgColor={"#1652f0"}
            color={"white"}
            href={"https://www.coinbase.com/nft/announce"}
            target={"_blank"}
          >
            Coinbase NFT
          </ChakraLink>{" "}
          – and if it happens to be a Saturday or Sunday, I might be shooting a
          wedding for{" "}
          <ChakraLink
            px={1}
            fontWeight={"bold"}
            bgColor={"#79603d"}
            color={"white"}
            href={"https://www.lunicvisuals.com"}
            target={"_blank"}
          >
            Lunic Visuals
          </ChakraLink>
        </Text>
      </Box>
    </Box>
  );
}
