import React, { useEffect } from "react";
// import DynamicComponent from "../components/DynamicComponent";
import Head from "next/head";

import Storyblok, { useStoryblok } from "../../lib/storyblok";
import { Box, Container, Divider, Heading, Text } from "@chakra-ui/react";
import DynamicComponent from "../../components/Blog Parts/DynamicComponent";
import SbEditable from "storyblok-react";
import SocialLinks from "../../components/social/SocialLinks";
import { getSpotifyData } from "../../lib/spotify";
import axios from "axios";

export default function Page({ story, preview, slug }) {
  const enableBridge = true;
  story = useStoryblok(story, enableBridge);

  const { content } = story;

  const [postStats, setPostStats] = useState({});

  useEffect(() => {
    // if (process.env.VERCEL_ENV === "production") {
    axios
      .post("/api/blog/increaseStat", { slug, stat: "views" })
      .then(({ data }) => setPostStats(data));
    // }
  }, []);

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
      <SocialLinks />
    </>
  );
}

export async function getStaticProps(context) {
  const { params, preview } = context;

  let slug = params.slug;

  let sbParams = {
    version: process.env.VERCEL_ENV === "production" ? "published" : "draft",
  };

  if (preview) {
    sbParams.version = "draft";
    sbParams.cv = Date.now();
  }

  let { data } = await Storyblok.get(`cdn/stories/blog/${slug}`, sbParams);

  return {
    props: {
      slug,
      story: data ? data.story : null,
      preview: preview || false,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  let { data } = await Storyblok.get("cdn/stories", {
    starts_with: "blog/",
    version: process.env.VERCEL_ENV === "production" ? "published" : "draft",
  });

  const paths = data.stories.map((story) => ({ params: { slug: story.slug } }));

  return {
    paths: paths,
    fallback: false,
  };
}
