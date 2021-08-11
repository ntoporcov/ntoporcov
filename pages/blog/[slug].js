import React, { useEffect } from "react";
// import DynamicComponent from "../components/DynamicComponent";
import Head from "next/head";

import Storyblok, { useStoryblok } from "../../lib/storyblok";
import { Box, Container, Divider, Heading, Text } from "@chakra-ui/react";
import DynamicComponent from "../../components/Blog Parts/DynamicComponent";
import SbEditable from "storyblok-react";

export default function Page({ story, preview }) {
  const enableBridge = true;
  story = useStoryblok(story, enableBridge);

  useEffect(() => {
    console.log(story);
  }, []);

  const { content } = story;

  return (
    <Container maxW={"4xl"} pb={"30vh"}>
      <Head>
        <title>{content.title + " – Nic Toporcov"}</title>
      </Head>

      <SbEditable content={content}>
        <Box>
          <Heading as={"h1"} fontSize={"4rem"} className={"serif"} mb={2}>
            {content.title}
          </Heading>

          <Text
            textTransform={"uppercase"}
            fontSize={26}
            fontWeight={200}
            letterSpacing={2}
            mb={5}
          >
            {content.intro}
          </Text>
        </Box>
      </SbEditable>

      <Divider my={10} />

      {content.body.map((component, index) => (
        <DynamicComponent blok={component} key={index} />
      ))}
    </Container>
  );
}

export async function getStaticProps(context) {
  const { params, preview } = context;

  let slug = params.slug;

  let sbParams = {
    version: process.env.NODE_ENV === "development" ? "draft" : "published",
  };

  if (preview) {
    sbParams.version = "draft";
    sbParams.cv = Date.now();
  }

  let { data } = await Storyblok.get(`cdn/stories/blog/${slug}`, sbParams);

  return {
    props: {
      story: data ? data.story : null,
      preview: preview || false,
    },
    revalidate: 5,
  };
}

export async function getStaticPaths() {
  let { data } = await Storyblok.get("cdn/stories", {
    starts_with: "blog/",
  });

  const paths = data.stories.map((story) => ({ params: { slug: story.slug } }));

  return {
    paths: paths,
    fallback: false,
  };
}
