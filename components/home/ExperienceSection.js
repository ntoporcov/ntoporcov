import Heading2 from "../Headings/Heading2";
import { Flex } from "@chakra-ui/react";
import ExperienceCompany from "./ExperienceCompany";

export function ExperienceSection() {
  return (
    <>
      <Heading2>Work Experience</Heading2>
      <Flex direction={"column"} width={"100%"}>
        <ExperienceCompany
          company={"Transcor Data Services"}
          position={"Front-End Designer & Developer"}
          period={"2019 – Now"}
          paragraph={`
          Designing and developing front-end experiences for applications ranging from Kiosks, Mobile Applications, E-Ticketing Platforms, and Admin applications, assist with more DevOps-related tasks like testing and integrating SDKs for new hardware, debugging build issues, investigating new development tools, and setting up projects from scratch.
          `}
        />
        <ExperienceCompany
          company={"Gleanview"}
          position={"Front-End Designer & Developer"}
          period={"2016 – 2019"}
          paragraph={`
          Designed and developed screens and interaction for new features in the CRM app, designed and developed marketing website and landing pages, designed several branding guidelines for child apps.
          `}
        />
        <ExperienceCompany
          company={"Jacksonville Business Journal"}
          position={"Graphic Designer"}
          period={"2015 – 2016"}
          paragraph={`Designed digital ads, designed and developed landing pages for clients.`}
        />
      </Flex>
    </>
  );
}
