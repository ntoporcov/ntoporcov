import { Heading, Text } from "@chakra-ui/react";
import Storyblok from "../../lib/storyblok";
import React, { useEffect, useState } from "react";
import { BlogPost } from "../../components/feed/BlogPost";
import { getAllStats } from "../../utils/axios";

export default function Blog({ allEntries }) {
  const [allStats, setAllStats] = useState({});

  useEffect(() => {
    getAllStats().then(({ data }) => {
      setAllStats(data);
    });
  }, []);

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
        <BlogPost
          key={index}
          story={story}
          stat={allStats[story.slug]}
          ready={Object.keys(allStats).length >= 1}
        />
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
