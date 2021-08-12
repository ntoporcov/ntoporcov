import Link from "next/link";
import HoverCard from "../../pages/cards/HoverCard";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Skeleton,
  Tag,
  Text,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/pro-duotone-svg-icons";
import { faHeart } from "@fortawesome/pro-solid-svg-icons";
import React, { useEffect, useState } from "react";
import axios from "axios";

function StatBadge({
  icon,
  startColor = "gray.500",
  hoverColor,
  value,
  index,
  ready,
}) {
  return (
    <Skeleton isLoaded={ready}>
      <HStack
        spacing={3}
        shadow={"0 0 1px 1px rgba(0,0,0,.1)"}
        pt={1}
        pb={6}
        px={3}
        color={startColor}
        _groupHover={{
          color: hoverColor + ".500",
          transform: "translateY(-3px)",
        }}
        transition={"all ease-out .2s"}
        transitionDelay={(index + 1) * 0.1 + 0.1 + "s"}
      >
        <Box w={4} color={hoverColor + ".300"}>
          <FontAwesomeIcon icon={icon} color={"currentColor"} />
        </Box>
        <Text color={"currentColor"}>{value}</Text>
      </HStack>
    </Skeleton>
  );
}

export const BlogPost = ({ story, stat = { likes: 0, views: 0 }, ready }) => {
  const { slug, content, tag_list } = story;

  return (
    <Link href={`/blog/${slug}`} passHref>
      <a style={{ width: "100%" }}>
        <HoverCard position={"relative"} mt={20} w={"100%"}>
          <Heading
            className={"serif"}
            as={"h2"}
            mb={2}
            opacity={0.7}
            letterSpacing={"initial"}
            _groupHover={{ opacity: 1 }}
            transition={"all ease-out .2s"}
          >
            {content.title}
          </Heading>
          <Box
            position={"absolute"}
            top={-8}
            zIndex={-1}
            right={5}
            bg={"white"}
          >
            <HStack>
              <StatBadge
                icon={faEye}
                hoverColor={"blue"}
                index={0}
                value={stat.views}
                ready={ready}
              />
              <StatBadge
                icon={faHeart}
                hoverColor={"red"}
                index={1}
                value={stat.likes}
                ready={ready}
              />
            </HStack>
          </Box>
          <Text>{content.preview}</Text>
          <Flex
            justify={"space-between"}
            pt={3}
            flexDirection={{ base: "column", md: "row" }}
          >
            <Box>
              {tag_list.map((item, key) => (
                <Tag mr={2} key={key}>
                  {item}
                </Tag>
              ))}
            </Box>
            <Text
              opacity={0.5}
              _groupHover={{ opacity: 0.8 }}
              textAlign={"right"}
            >
              Read More
            </Text>
          </Flex>
        </HoverCard>
      </a>
    </Link>
  );
};
