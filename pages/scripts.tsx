import React, { useEffect, useMemo, useState } from "react";
import { Heading1 } from "../components/Headings/Heading1";
import {
  Box,
  Button,
  Collapse,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import Heading2 from "../components/Headings/Heading2";
import HoverCard from "../components/cards/HoverCard";
import { CodeBlock, dracula } from "react-code-blocks";
import minify from "string-minify";
import { useBookmarkletString } from "../utils/useBookmarkletString";

const BookmarkletSection = ({
  title,
  fileName,
  description,
}: {
  title: string;
  fileName: string;
  description: string;
}) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: false });

  const apiLessCode = useBookmarkletString("toggleNFTMarketplace");
  const [apiKey, setAPIKey] = useState("");

  const codeText = useMemo(() => {
    return apiLessCode.replace("OS_API_KEY_GOES_HERE", apiKey);
  }, [apiLessCode, apiKey]);

  const minifiedCode = `(function(){${minify(codeText)}})()`;
  const bookmarklet = `javascript:${encodeURI(minifiedCode)}`;

  return (
    <HoverCard
      p={0}
      mt={10}
      w={"full"}
      shadow={useColorModeValue("md", "dark-lg")}
      rounded={"lg"}
    >
      <Box
        width={"full"}
        pt={6}
        px={6}
        bg={"transparent"}
        _hover={{ bg: "transparent" }}
      >
        <VStack textAlign={"center"}>
          <Heading2 mb={0}>NFT Marketplace Toggle</Heading2>
          <Text px={24}>
            If pressed in an NFT or Collection on Coinbase NFT, it will open
            that same NFT or Collection in OpenSea. It will also do the same
            thing the other way around.
          </Text>

          <VStack pt={4}>
            <a href={bookmarklet} title={title}>
              <Button
                size={"md"}
                colorScheme={"blue"}
                cursor={"grab"}
                _focus={{ cursor: "grabbing" }}
              >
                Toggle Marketplace
              </Button>
            </a>
            <Text fontSize={"xs"} opacity={0.5}>
              Drag the button to your bookmark bar
            </Text>
          </VStack>
        </VStack>
      </Box>
      <Button
        width={"full"}
        mt={3}
        py={3}
        borderTop={"1px solid"}
        __css={{ bg: "transparent" }}
        onClick={onToggle}
      >
        {!isOpen ? "Show" : "Hide"} Code
      </Button>
      <Collapse in={isOpen}>
        <Box px={6} pb={6}>
          <CodeBlock text={codeText} theme={dracula} language={"js"} />
        </Box>
      </Collapse>
    </HoverCard>
  );
};

export default function Scripts() {
  return (
    <>
      <Heading1>Some scripts for you and I...</Heading1>
      <BookmarkletSection
        title={"NFT Marketplace Toggle"}
        fileName={""}
        description=""
      />
    </>
  );
}
