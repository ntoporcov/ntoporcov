import {
  Box,
  Divider,
  Flex,
  HStack,
  Icon,
  Link as ChakraLink,
  Skeleton,
  Tag,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDribbble,
  faInstagram,
  faLinkedin,
  faSpotify,
} from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { faPlay } from "@fortawesome/pro-duotone-svg-icons";
import { faEnvelope } from "@fortawesome/pro-solid-svg-icons";

function SocialLink({ link, icon, color, label }) {
  const bg = useColorModeValue("gray.100", "gray.800");

  return (
    <ChakraLink href={link} target={"_blank"} cursor={'pointer'}>
      <Tag bg={bg}>
        <Box width={4}>
          <FontAwesomeIcon icon={icon} color={color} />
        </Box>
      </Tag>
    </ChakraLink>
  );
}

function SpotifyWidget() {
  const [finished, setFinished] = useState(false);
  const [spotifyData, setSpotifyData] = useState({
    track: {
      artists: [
        {
          external_urls:
            "https://open.spotify.com/artist/6l3HvQ5sa6mXTsMTB19rO5",
          name: "J. Cole",
        },
      ],
    },
  });

  useEffect(() => {
    axios
      .get("/api/spotify/lastPlayed")
      .then(({ data }) => {
        setSpotifyData(data);
        setFinished(true);
      })
      .catch((error) => {
        console.log(error);
        setFinished(true);
      });
  }, []);

  return (
    <>
      <Box width={5}>
        <FontAwesomeIcon icon={faSpotify} color={"#1db954"} />
      </Box>
      <Skeleton
        isLoaded={finished}
        startColor={"#63d28b"}
        endColor={"#80bd96"}
        ml={2}
      >
        <HStack>
          <Text fontSize={"sm"}>
            {spotifyData.playing ? "Now Listening" : "Last played:"}
          </Text>
          {spotifyData.playing && (
            <Box w={2} pt={0.5}>
              <FontAwesomeIcon icon={faPlay} color={"#1db954"} />
            </Box>
          )}
          <Text fontSize={"sm"}>
            <ChakraLink
              href={spotifyData.track.artists[0].external_urls.spotify || ""}
              target={"_blank"}
              color={"#1db954"}
            >
              {spotifyData.track.artists[0].name}
            </ChakraLink>
          </Text>
        </HStack>
      </Skeleton>
    </>
  );
}

function SocialLinks() {
  return (
    <>
      <Flex
        fontSize={3}
        py={3}
        justifyContent={"space-between"}
        width={"100%"}
        wrap={"wrap"}
      >
        <Flex alignItems={"center"}>
          <SpotifyWidget />
        </Flex>
        <HStack>
          <SocialLink
            link={"https://instagram.com/ntoporcov"}
            icon={faInstagram}
            color={"#c13584"}
          />
          <SocialLink
            link={"https://dribbble.com/ntoporcov"}
            icon={faDribbble}
            color={"#ea4c89"}
          />
          <SocialLink
            link={"https://www.linkedin.com/in/ntoporcov/"}
            icon={faLinkedin}
            color={"#0077b5"}
          />
          <SocialLink
            link={"mailto:ntoporcov@me.com"}
            icon={faEnvelope}
            color={"#e0542c"}
          />
        </HStack>
      </Flex>
      <Divider mb={10} />
    </>
  );
}

export default SocialLinks;
