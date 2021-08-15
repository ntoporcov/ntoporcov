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

const DriverAppProject = () => {
  return (
    <ProjectBox p={0}>
      <Flex>
        <Image src={"/scanningAppCoverCropped.png"} height={500} width={500} />
        <Flex direction={"column"} justify={"flex-end"} pt={10} pb={5} pr={5}>
          <Box flexGrow={2}>
            <Heading fontSize={26}>TDS Scanning App</Heading>
            <Text pb={3}>
              The TDS Scanning App was a project that I took from basic
              requirements and wireframe, through research, design and all that
              way to development.
            </Text>
            <HStack>
              <Tag>React Native</Tag>
              <Tag>MobX</Tag>
              <Tag>iOS</Tag>
              <Tag>Android</Tag>
              <Tag>Honeywell SDKs</Tag>
            </HStack>
          </Box>
          <Flex justify={"flex-end"}>
            <Button colorScheme={"orange"} variant={"ghost"}>
              Learn More
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </ProjectBox>
  );
};

export default DriverAppProject;
