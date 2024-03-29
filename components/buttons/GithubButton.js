import { Box, Link, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "next/router";

const GithubButton = () => {
  const { route } = useRouter();
  const githubAddress = () => {
    switch (route) {
      case "/":
        return "/index.js";
      case "/blog":
        return "/blog/index.js";
      default:
        return route + ".js";
    }
  };

  return (
    <Link
      href={
        "https://github.com/ntoporcov/ntoporcov/tree/master/pages" +
        githubAddress()
      }
      target={"_blank"}
      rel="noreferrer"
      display={{ base: "none", md: "block" }}
    >
      <Box
        position={"fixed"}
        width={"auto"}
        role={"group"}
        bottom={5}
        right={5}
        fontSize={25}
      >
        <Box
          position={"absolute"}
          right={0}
          bottom={0}
          bgColor={"black"}
          height={16}
          width={16}
          p={1}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          rounded={100}
        >
          <FontAwesomeIcon icon={faGithub} color={"#fff"} size={"lg"} />
        </Box>
        <Box
          zIndex={-1}
          rounded={100}
          position={"absolute"}
          right={0}
          bottom={0}
          bgColor={"black"}
          height={16}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          paddingLeft={3}
          paddingRight={16}
          overflow={"hidden"}
          transition={"all ease-out .2s"}
          transformOrigin={"85% center"}
          transform={"scaleX(0)scaleY(0.98)"}
          _groupHover={{ transform: "scaleX(1)" }}
        >
          <Text color={"white"} whiteSpace={"nowrap"} fontSize={16}>
            View Page in Github
          </Text>
        </Box>
      </Box>
    </Link>
  );
};

export default GithubButton;
