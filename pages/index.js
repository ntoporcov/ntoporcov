import { Container, Divider, Text } from "@chakra-ui/react";
import { SkillsSection } from "../components/home/SkillsSection";
import { HeroSection } from "../components/home/HeroSection";
import { ExperienceSection } from "../components/home/ExperienceSection";
import { getSpotifyData } from "../lib/spotify";
import SocialLinks from "../components/social/SocialLinks";

export default function Home({ spotifyData }) {
  return (
    <>
      <SocialLinks spotifyData={spotifyData} />
      <HeroSection />
      <Divider my={55} />
      <SkillsSection />
      <Divider my={55} />
      <ExperienceSection />
      <Divider my={55} />
      <Text pt={15} opacity={0.5}>
        More stuff coming soon...
      </Text>
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      spotifyData: await getSpotifyData(),
    },
  };
}
