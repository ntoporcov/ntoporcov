/* eslint-disable react/display-name */

import React, { useEffect } from "react";
import {
  Box,
  Heading,
  Image,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  NODE_PARAGRAPH,
  MARK_LINK,
  render,
  NODE_HEADING,
  NODE_LI,
  NODE_UL,
  NODE_OL,
} from "storyblok-rich-text-react-renderer";
import Link from "next/link";
import { Link as ChakraLink } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function BlogText({ blok }) {
  const linkBackgroundColor = useColorModeValue("black", "white");
  const linkFontColor = useColorModeValue("white", "black");

  return (
    <Box width={"100%"}>
      {render(blok.text, {
        nodeResolvers: {
          [NODE_OL]: (children) => <OrderedList>{children}</OrderedList>,
          [NODE_UL]: (children) => <UnorderedList>{children}</UnorderedList>,
          [NODE_LI]: (children) => <ListItem>{children}</ListItem>,
          [NODE_PARAGRAPH]: (children) => (
            <Text pb={3} lineHeight={1.75} textAlign={"left"} width={"100%"}>
              {children}
            </Text>
          ),
          [NODE_HEADING]: (children, attrs) => (
            <Heading
              as={"h" + attrs.level}
              fontSize={70 / attrs.level}
              mt={5}
              mb={2}
            >
              {children}
            </Heading>
          ),
        },
        markResolvers: {
          [MARK_LINK]: (children, props) => {
            const { href, target, linktype } = props;
            if (linktype === "email") {
              // Email links: add `mailto:` scheme and map to <a>
              return (
                <ChakraLink href={`mailto:${href}`}>{children}</ChakraLink>
              );
            }
            if (href.match(/^(https?:)?\/\//)) {
              // External links: map to <a>
              return (
                <ChakraLink
                  bgColor={linkBackgroundColor}
                  color={linkFontColor}
                  href={href}
                  target={target}
                >
                  {children}
                </ChakraLink>
              );
            }
            // Internal links: map to <Link>
            return (
              <Link href={href}>
                <a>{children}</a>
              </Link>
            );
          },
        },
        blokResolvers: {
          ["BlogImage"]: (attrs) => (
            <Box position={"relative"}>
              <Box
                _after={{
                  transition: "all .3s ease",
                  content: '""',
                  w: "full",
                  h: "full",
                  pos: "absolute",
                  top: 5,
                  left: 0,
                  backgroundImage: `url(${attrs.image.filename})`,
                  filter: "blur(15px)",
                  zIndex: -1,
                  opacity: 0.8,
                }}
              >
                <Image
                  src={attrs.image.filename}
                  borderRadius={8}
                  mt={8}
                  mb={14}
                />
              </Box>
            </Box>
          ),
        },
      })}
    </Box>
  );
}

export default BlogText;
