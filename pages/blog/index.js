import { Box, Container, Flex, Heading, Tag, Text } from "@chakra-ui/react";
import Storyblok from "../../lib/storyblok";
import { useEffect } from "react";
import Link from "next/link";

export const BlogPost = ({ story }) => {
  const { slug, content, tag_list } = story;

  console.log(content);

  return (
    <Link href={`/blog/${slug}`} passHref>
      <a>
        <Box
          mt={10}
          shadow={"0 0 1px 1px rgba(0,0,0,.1)"}
          padding={5}
          _hover={{ shadow: "0 3px 5px 2px rgba(0,0,0,.05)" }}
          transition={"box-shadow ease-out .15s"}
          role={"group"}
        >
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
        </Box>
      </a>
    </Link>
  );
};

export default function Blog({ allEntries }) {
  return (
    <Container maxW={"4xl"}>
      <Heading as={"h1"} mb={2} fontSize={"3rem"}>
        So, about this blog...
      </Heading>
      <Text>
        This is where I write about design, development and anything in between
        that may interest me. I&apos;m planning to write more about the process
        of creating this website, learning new things in development, or UI
        designs I&apos;m excited about.
      </Text>
      {allEntries.stories.map((story, index) => (
        <BlogPost key={index} story={story} />
      ))}
    </Container>
  );
}

export async function getServerSideProps(context) {
  let { data } = await Storyblok.get("cdn/stories", {
    starts_with: "blog/",
  });

  return {
    props: {
      allEntries: data,
      preview: false,
    },
  };
}
