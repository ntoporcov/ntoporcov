import { Box, Container, Flex, Heading, Tag, Text } from "@chakra-ui/react";
import Storyblok from "../../lib/storyblok";
import React from "react";
import Link from "next/link";
import HoverCard from "../cards/HoverCard";

export const BlogPost = ({ story }) => {
  const { slug, content, tag_list } = story;

  return (
    <Link href={`/blog/${slug}`} passHref>
      <a>
        <HoverCard>
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

export default function Blog({ allEntries }) {
  return (
    <>
      <Heading as={"h1"} mb={10} fontSize={"3rem"} mt={50}>
        So, about this blog...
      </Heading>
      <Text textAlign={"center"}>
        This is where I write about design, development and anything in between
        that may interest me. I&apos;m planning to write more about the process
        of creating this website, learning new things in development, or UI
        designs I&apos;m excited about.
      </Text>
      {allEntries.stories.map((story, index) => (
        <BlogPost key={index} story={story} />
      ))}
    </>
  );
}

export async function getStaticProps(context) {
  let { data } = await Storyblok.get("cdn/stories", {
    starts_with: "blog/",
    version: process.env.VERCEL_ENV === "production" ? "published" : "draft",
  });

  return {
    props: {
      allEntries: data,
      preview: false,
    },
    revalidate: 1,
  };
}
