import { Box, Divider, Text } from "@chakra-ui/react";
import Heading2 from "../Headings/Heading2";
import ToolsRow from "./ToolsRow";
import ToolsIcons, { SmallToolsIcons } from "./ToolsIcons";
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
import NextJSLogo from "../svgs/NextJSLogo";
import ChakgraLogo from "../svgs/ChakgraLogo";
import StoryBlokLogo from "../svgs/StoryblokLogo";

export function SkillsSection() {
  return (
    <>
      <Box textAlign={"center"} maxW={{ base: "100%", md: "60%" }}>
        <Heading2>About this website</Heading2>
        <Text textAlign={"center"}>
          Yeah, I know... There&apos;s not a lot here. This website is
          admittedly under construction, but I thought I could make this process
          more interesting.
          <br />
          <br />I decided I&apos;m going to blog the process of building this
          website and probably some other thoughts about development. So, if
          you&apos;re interested, I&apos;m hoping to have more about this
          website&apos;s development, previous projects and work experience in
          here very soon.
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
    </>
  );
}