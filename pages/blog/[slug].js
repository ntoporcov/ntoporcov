import React, { useEffect } from "react";
// import DynamicComponent from "../components/DynamicComponent";
import Head from "next/head";

import Storyblok, { useStoryblok } from "../../lib/storyblok";
import { Box, Container, Divider, Heading, Text } from "@chakra-ui/react";
import DynamicComponent from "../../components/Blog Parts/DynamicComponent";
import SbEditable from "storyblok-react";
import SocialLinks from "../../components/social/SocialLinks";
import { getSpotifyData } from "../../lib/spotify";

export default function Page({ story, preview, spotifyData }) {
  const enableBridge = true;
  story = useStoryblok(story, enableBridge);

  const { content } = story;

  return (
    <>
      <Head>
        <title>{content.title + " – Nic Toporcov"}</title>
      </Head>

      <SbEditable content={content}>
        <Box>
          <Heading
            as={"h1"}
            fontSize={"4rem"}
            className={"serif"}
            mb={2}
            mt={20}
          >
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
      <Divider mt={20} />
      <SocialLinks spotifyData={spotifyData} />
    </>
  );
}

export async function getServerSideProps(context) {
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
      spotifyData: await getSpotifyData(),
    },
  };
}
