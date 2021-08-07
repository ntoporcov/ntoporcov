import { Box, Container, Heading, Text } from "@chakra-ui/react";
import Storyblok from "../../lib/storyblok";
import { useEffect } from "react";

export default function Home({ stories }) {
  useEffect(() => {
    console.log(stories);
  }, []);

  return (
    <Container maxW={"4xl"}>
      <Heading as={"h1"}>So, About this blog...</Heading>
      <Text>This is a blog</Text>
      <Box></Box>
    </Container>
  );
}

export async function getServerSideProps(context) {
  let { data } = await Storyblok.get("cdn/stories?starts_with=blog/");

  return {
    props: {
      stories: data,
    },
  };
}
