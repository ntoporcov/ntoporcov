import React from "react";
import { Box, Flex, Heading, Img, Text } from "@chakra-ui/react";
import Image from "next/image";
import HoverCard from "../../pages/cards/HoverCard";

const ExperienceCompany = ({
  company,
  period,
  position,
  paragraph,
  shadow,
}) => {
  return (
    <HoverCard display={"flex"} flexDirection={"column"} width={"100%"}>
      <Flex direction={"column"}>
        <Heading as={"h3"} fontSize={28} fontWeight={500}>
          {company}
        </Heading>
        <Flex
          direction={{ base: "column-reverse", md: "row" }}
          justify={"space-between"}
        >
          <Text opacity={0.5}>{position}</Text>
          <Text as={"span"}>{period}</Text>
        </Flex>
        <Text my={2}>{paragraph}</Text>
      </Flex>
    </HoverCard>
  );
};

export default ExperienceCompany;