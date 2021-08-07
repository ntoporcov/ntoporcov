import Image from "next/image";
import { Box, Container, Heading, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAndroid,
  faAppStoreIos,
  faDocker,
  faFortAwesomeAlt,
  faGit,
  faGithub,
  faInvision,
  faNodeJs,
  faPhp,
  faReact,
  faSass,
  faVuejs,
} from "@fortawesome/free-brands-svg-icons";
import ChakgraLogo from "../components/svgs/ChakgraLogo";
import StoryBlokLogo from "../components/svgs/StoryblokLogo";
import NextJSLogo from "../components/svgs/NextJSLogo";

function ToolsIcons(props) {
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      flexDirection={"column"}
      alignItems={"center"}
      textAlign={"center"}
      width={props.width || 20}
      marginX={8}
      marginBottom={10}
    >
      {props.children ? (
        props.children
      ) : (
        <FontAwesomeIcon icon={props.icon} color={props.color} />
      )}

      <Text color={props.color}>{props.name}</Text>
    </Box>
  );
}

function SmallToolsIcons(props) {
  return <ToolsIcons width={14} {...props} />;
}

function ToolsRow(props) {
  const { children } = props;
  return (
    <Box
      display={"flex"}
      flexWrap={"wrap"}
      justifyContent={"center"}
      fontSize={16}
      width={"100%"}
      textAlign={"center"}
      color={"#6f6f6f"}
      {...props}
    >
      {children}
    </Box>
  );
}

export default function Home() {
  return (
    <Container maxW={"4xl"} centerContent>
      <Box
        display={"flex"}
        flexDirection={{ base: "column", md: "row" }}
        borderBottom={"1px solid #ababab"}
      >
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
          pb={10}
          pl={{ base: 0, md: 20 }}
          textAlign={{ base: "center", md: "left" }}
        >
          <Heading as={"h1"} pb={5}>
            Hi, I&apos;m Nic
          </Heading>
          <Text>
            I am a Front-End Designer and Developer. I&apos;ve been working as a
            UI/UX Designer since 2014 and as a Front-End Developer since 2015.
            <br />
            <br />I am currently working in the transportation industry where my
            main focus are design and development for Kiosks, Mobile
            Applications, E-Ticketing Platforms and Admin applications. I also
            provide assistance in some DevOps functions.
          </Text>
        </Box>
      </Box>
      <Box textAlign={"center"} maxW={{ base: "100%", md: "60%" }} mt={10}>
        <Heading as={"h2"} mb={10}>
          About this website
        </Heading>
        <Text textAlign={"center"}>
          Yeah, I know... There&apos;s not a lot here. This website is
          admittedly under construction, but I thought I could make this process
          more interesting.
          <br />
          <br />I decided I&apos;m going to blog the process of building this
          website and probably some other thoughts about development. So, if
          you&apos;re interested, I&apos;m hoping to have more about this
          website&apos;s development, previous projects and work experience in
          here very soon. 😄
        </Text>
      </Box>
      <Text fontSize={20} fontWeight={500} my={10} textAlign={"center"}>
        Some of the stuff I&apos;m using or planning to use on this website:
      </Text>
      <ToolsRow>
        <ToolsIcons icon={faReact} name={"React"} color={"#61dafb"} />
        <ToolsIcons name={"NextJS"} color={"#535353"}>
          <NextJSLogo />
        </ToolsIcons>
        <ToolsIcons name={"ChakraUI"} color={"#7BCBD4"}>
          <ChakgraLogo />
        </ToolsIcons>
        <ToolsIcons name={"StoryBlok"} color={"#0AB3AF"}>
          <StoryBlokLogo />
        </ToolsIcons>
        <ToolsIcons
          icon={faFortAwesomeAlt}
          name={"FontAwesome"}
          color={"orange"}
        />
        <ToolsIcons icon={faGithub} name={"GitHub"} color={"#2b2b2b"} />
      </ToolsRow>
      <Text fontSize={18} fontWeight={500} my={10} textAlign={"center"}>
        Some other stuff that I have worked with:
      </Text>
      <ToolsRow maxW={"80%"}>
        <SmallToolsIcons icon={faVuejs} name={"VueJS"} color={"#4fc08d"} />
        <SmallToolsIcons icon={faNodeJs} name={"Node"} color={"#215732"} />
        <SmallToolsIcons icon={faSass} name={"Sass"} color={"#cc6699"} />
        <SmallToolsIcons icon={faAndroid} name={"Android"} color={"#3ddc84"} />
        <SmallToolsIcons icon={faAppStoreIos} name={"iOS"} color={"#5fc9f8"} />
        <SmallToolsIcons icon={faGit} name={"Git"} color={"#c9510c"} />
        <SmallToolsIcons icon={faDocker} name={"Docker"} color={"#0db7ed"} />
        <SmallToolsIcons icon={faPhp} name={"PHP"} color={"#8892be"} />
        <SmallToolsIcons
          icon={faInvision}
          name={"InVision"}
          color={"#ff3366"}
        />
      </ToolsRow>
    </Container>
  );
}

// export async function getStaticProps(context) {
//   let slug = "index";
//   let params = {
//     version: process.env.NODE_ENV === "development" ? "draft" : "published",
//   };
//
//   // checks if Next.js is in preview mode
//   if (context.preview) {
//     // loads the draft version
//     params.version = "draft";
//     // appends the cache version to get the latest content
//     params.cv = Date.now();
//   }
//
//   // loads the story from the Storyblok API
//   let { data } = await Storyblok.get(`cdn/stories/${slug}`, params);
//
//   // return the story from Storyblok and whether preview mode is active
//   return {
//     props: {
//       story: data ? data.story : false,
//       preview: context.preview || false,
//     },
//   };
// }
