import {
  Box,
  Divider,
  Flex,
  HStack,
  Img,
  Link,
  Tag,
  Text,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDribbble,
  faInstagram,
  faLinkedin,
  faSpotify,
} from "@fortawesome/free-brands-svg-icons";

function SocialLink({ link, icon, color }) {
  return (
    <Link href={link} target={"_blank"}>
      <Tag>
        <Box width={4}>
          <FontAwesomeIcon icon={icon} color={color} />
        </Box>
      </Tag>
    </Link>
  );
}

function SocialLinks({ spotifyData }) {
  const lastImageIndex = spotifyData.success
    ? spotifyData.track.album.images.length - 1
    : -1;

  return (
    <>
      <Flex fontSize={3} py={3} justifyContent={"space-between"} width={"100%"}>
        <Flex alignItems={"center"}>
          {() => {
            if (spotifyData.success) {
              return (
                <>
                  <Box width={5}>
                    <FontAwesomeIcon icon={faSpotify} color={"#1db954"} />
                  </Box>
                  <Text fontSize={"sm"} ml={2}>
                    Last played:{" "}
                    <Link
                      href={spotifyData.track.artists[0].external_urls.spotify}
                      target={"_blank"}
                      color={"#1db954"}
                    >
                      {spotifyData.track.artists[0].name}
                    </Link>
                  </Text>
                </>
              );
            }
          }}
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
        </HStack>
      </Flex>
      <Divider mb={10} />
    </>
  );
}

export default SocialLinks;
