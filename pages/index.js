import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import NTButton from "../components/buttons/NTButton";
import { Box, Container, Heading, Img, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane } from "@fortawesome/pro-solid-svg-icons";
import {
  faFontAwesome,
  faFontAwesomeAlt,
  faFontAwesomeFlag,
  faGithub,
  faReact,
} from "@fortawesome/free-brands-svg-icons";
import avatar from "../public/avatar.jpg";
import ChakgraLogo from "../components/misc/ChakgraLogo";

function ToolsIcons(props) {
  return (
    <Box width={20} display={"flex"} flexDirection={"column"}>
      <FontAwesomeIcon icon={props.icon} size={"sm"} color={props.color} />
      <Text color={props.color}>{props.name}</Text>
    </Box>
  );
}

export default function Home() {
  return (
    <Container maxW={"2xl"} centerContent>
      <Box
        rounded={1000}
        overflow={"hidden"}
        position={"relative"}
        width={250}
        height={250}
        mb={10}
      >
        <Image src={"/avatar.jpg"} layout={"fill"} />
      </Box>
      <Heading as={"h1"} pb={5}>
        Hi, I'm Nic
      </Heading>
      <Text textAlign={"center"}>
        Yeah, I know there's not a lot here. This website is admittedly under
        construction, but I thought I could make this process more interesting.
        So instead of one day having what I would call a finished portfolio, I
        decided I'm going to blog the process of building this website and
        probably some other thoughts about development.
      </Text>
      <Text fontSize={20} fontWeight={500} mt={10}>
        This website is being built with:
      </Text>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        fontSize={16}
        width={"100%"}
        textAlign={"center"}
        color={"#6f6f6f"}
      >
        <ToolsIcons icon={faReact} name={"React"} color={"lightblue"} />
        <ToolsIcons
          icon={faFontAwesomeFlag}
          name={"FontAwesome"}
          color={"lightblue"}
        />
        <Box width={20} display={"flex"} flexDirection={"column"}>
          <ChakgraLogo />
          <Text color={"#7BCBD4"}>ChakraUI</Text>
        </Box>
      </Box>
    </Container>
  );
}
