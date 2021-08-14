import React, { useEffect } from "react";
import { Box, Flex, HStack, useColorModeValue } from "@chakra-ui/react";
import BlogText from "./BlogText";
import SbEditable from "storyblok-react";

const BlogBoxes = ({ blok }) => {
  const bgColor = useColorModeValue("gray.50", "blackAlpha.400");

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justify={"space-between"}
      my={5}
    >
      {blok.Boxes.map((box) => (
        <SbEditable content={box} key={box._uid}>
          <Box
            p={5}
            borderRadius={10}
            bg={bgColor}
            boxSizing={"border-box"}
            width={{ base: "100%", md: 100 / blok.Boxes.length - 3 + "%" }}
            mb={{ base: 4, md: 0 }}
          >
            <BlogText blok={box} />
          </Box>
        </SbEditable>
      ))}
    </Flex>
  );
};

export default BlogBoxes;
