import { Divider, Text } from "@chakra-ui/react";
import { SkillsSection } from "../components/home/SkillsSection";
import { HeroSection } from "../components/home/HeroSection";
import { ExperienceSection } from "../components/home/ExperienceSection";
import SocialLinks from "../components/social/SocialLinks";
import SendGifSection from "../components/home/SendGifSection";
import ProjectsSection from "../components/home/ProjectsSection";

export default function Home() {
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
      <ProjectsSection />
      <Divider my={55} />
      <Text pt={15} opacity={0.5}>
        More stuff coming soon...
      </Text>
    </>
  );
}
