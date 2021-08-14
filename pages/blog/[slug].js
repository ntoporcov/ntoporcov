import React, { useEffect, useState } from "react";
// import DynamicComponent from "../components/DynamicComponent";
import Head from "next/head";

import Storyblok, { useStoryblok } from "../../lib/storyblok";
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import DynamicComponent from "../../components/Blog Parts/DynamicComponent";
import SbEditable from "storyblok-react";
import SocialLinks from "../../components/social/SocialLinks";
import { getSpotifyData } from "../../lib/spotify";
import axios from "axios";
import { faEye } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/pro-solid-svg-icons";
import { getPostStats, increaseStat } from "../../utils/axios";
import { useLocalStorage } from "../../hooks/useLocalStorage";

function StatItem({ icon, color, stat, label, clickable, onClick, ready }) {
  const StatLabel = () => {
    return (
      <HStack color={color + ".300"}>
        <Box w={5}>
          <FontAwesomeIcon icon={icon} color={"currentColor"} />
        </Box>
        <HStack>
          <Skeleton isLoaded={ready}>{stat}</Skeleton>
          <Text>{" " + label}</Text>
        </HStack>
      </HStack>
    );
  };

  if (!clickable) {
    return <StatLabel />;
  } else {
    return (
      <Button
        variant={clickable ? "outline" : "ghost"}
        colorScheme={color}
        onClick={onClick}
      >
        <StatLabel />
      </Button>
    );
  }
}

export default function Page({ story, preview, slug }) {
  const enableBridge = true;
  story = useStoryblok(story, enableBridge);

  const { content } = story;

  const [postStats, setPostStats] = useState({});
  const [statsReady, setStatsReady] = useState(false);

  const [liked, setLiked] = useLocalStorage(`${slug}-liked`, false);
  const [viewed, setViewed] = useLocalStorage(`${slug}-viewed`, false);

  useEffect(() => {
    if (!viewed) {
      addToStat("views");
      setViewed(true);
    } else {
      getStats(slug);
    }
  }, []);

  const addToStat = (stat) => {
    increaseStat({ slug, stat }).then(({ data }) => {
      setPostStats(data);
      setStatsReady(true);
    });
  };

  const getStats = (slug) => {
    getPostStats(slug).then(({ data }) => {
      setPostStats(data);
      setStatsReady(true);
    });
  };

  const likePost = () => {
    if (!liked) {
      addToStat("likes");
      setLiked(true);
    }
  };

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

      <Divider mt={10} />

      <Flex w={"100%"} py={2} justifyContent={"flex-end"}>
        <HStack spacing={5}>
          <StatItem
            color={"blue"}
            icon={faEye}
            stat={postStats.views}
            label={"Views"}
            ready={statsReady}
          />
          <StatItem
            color={"red"}
            icon={faHeart}
            stat={postStats.likes}
            label={"Likes" + (liked ? " (You included ✌🏼 )" : "")}
            clickable={!liked}
            onClick={likePost}
            ready={statsReady}
          />
        </HStack>
      </Flex>

      <Divider mb={10} />

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
