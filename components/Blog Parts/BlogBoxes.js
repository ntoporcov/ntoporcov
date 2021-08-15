import React, { useEffect } from "react";
import { Box, Flex, HStack, useColorModeValue } from "@chakra-ui/react";
import BlogText from "./BlogText";
import SbEditable from "storyblok-react";

const BlogBoxes = ({ blok }) => {
  const bgColor = useColorModeValue("gray.50", "gray.700");

  return (
    <Flex
      direction={{ base: "column", md: blok.Direction }}
      justify={"space-between"}
      my={5}
      width={"100%"}
    >
      {blok.Boxes.map((box) => (
        <SbEditable content={box} key={box._uid}>
          <Box
            px={5}
            borderRadius={10}
            bg={bgColor}
            boxSizing={"border-box"}
            width={{
              base: "100%",
              md:
                blok.Direction === "column"
                  ? "100%"
                  : 100 / blok.Boxes.length - 3 + "%",
            }}
            mb={4}
          >
            <BlogText blok={box} />
          </Box>
        </SbEditable>
      ))}
    </Flex>
  );
};

export default BlogBoxes;
