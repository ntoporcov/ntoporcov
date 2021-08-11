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
          position={"Senior Front End Engineer/Designer"}
          period={"2019 – Now"}
          paragraph={`
          As a Front-End Developer and Designer my duties switch between designing and developing front-end 
          experiences for applications ranging from Kiosks, Mobile Applications, E-Ticketing Platforms
          and Admin applications. I also assist with more DevOps related tasks like testing and integrating SDKs for 
          new hardware, debugging build issues, investigating new development tools and setting up projects from scratch.  
          `}
        />
        <ExperienceCompany
          company={"Gleanview"}
          position={"Front End Designer & Developer"}
          period={"2016 – 2019"}
          paragraph={`
          GleanView is a CRM tool for small and medium businesses. I was in charge of designing new features for the 
          application, managing, designing and improving on the company's branding while also being 
          in charge of development for the marketing website. 
          `}
        />
        <ExperienceCompany
          company={"Jacksonville Business Journal"}
          position={"Graphic Designer"}
          period={"2015 – 2016"}
          paragraph={`
          JBJ was one of my first jobs after college. I was in charge of the print design for the newspaper, design and
          development for landing pages for events, and design for digital and print advertisements.
          `}
        />
      </Flex>
    </>
  );
}
