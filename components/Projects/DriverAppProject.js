import React from "react";
import ProjectBox from "./ProjectBox";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

const DriverAppProject = ({ blok }) => {
  const story = blok.story;
  const content = story.content;

  return (
    <ProjectBox p={0}>
      <Flex direction={{ base: "column", md: "row" }}>
        <Flex
          maxW={{ base: "100%", md: "unset" }}
          bg={{ base: "whiteAlpha.900", md: "none" }}
          justify={"center"}
        >
          <Flex alignItems={"flex-end"} maxW={{ base: "50%", md: "unset" }}>
            <Image
              src={"/scanningAppCoverCropped.png"}
              height={500}
              width={500}
            />
          </Flex>
        </Flex>
        <Flex
          direction={"column"}
          justify={"flex-end"}
          pt={10}
          pb={5}
          pr={5}
          pl={{ base: 5, md: 0 }}
        >
          <Box flexGrow={2}>
            <Heading fontSize={26}>{content.title}</Heading>
            <Text pb={3}>{content.preview}</Text>
            <Flex wrap={"wrap"}>
              {story.tag_list.reverse().map((tag, index) => (
                <Tag key={index} ml={2} mb={2}>
                  {" "}
                  {tag}
                </Tag>
              ))}
            </Flex>
          </Box>
          <Flex justify={"flex-end"}>
            <Link href={`/blog/${story.slug}`} passHref>
              <Button colorScheme={"orange"} variant={"ghost"} mt={10}>
                Learn More
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </ProjectBox>
  );
};

export default DriverAppProject;
