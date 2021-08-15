import { Divider, Text } from "@chakra-ui/react";
import { SkillsSection } from "../components/home/SkillsSection";
import { HeroSection } from "../components/home/HeroSection";
import { ExperienceSection } from "../components/home/ExperienceSection";
import SocialLinks from "../components/social/SocialLinks";
import SendGifSection from "../components/home/SendGifSection";
import ProjectsSection from "../components/home/ProjectsSection";
import Storyblok from "../lib/storyblok";

export default function Home({ driverApp }) {
  return (
    <>
      <SocialLinks />
      <HeroSection />
      <Divider my={55} />
      <SkillsSection />
      <Divider my={55} />
      <ExperienceSection />
      <Divider my={55} />
      <SendGifSection />
      <Divider my={55} />
      <ProjectsSection driverApp={driverApp} />
      <Divider my={55} />
      <Text pt={15} opacity={0.5}>
        More stuff coming soon...
      </Text>
    </>
  );
}

export async function getStaticProps(context) {
  let driverAppResponse = await Storyblok.get(
    "cdn/stories/blog/tds-scanning-app",
    {
      version: process.env.VERCEL_ENV === "production" ? "published" : "draft",
    }
  );

  return {
    props: {
      driverApp: driverAppResponse.data,
    },
    revalidate: 1,
  };
}
