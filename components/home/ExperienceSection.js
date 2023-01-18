import Heading2 from "../Headings/Heading2";
import { Box, Flex, VStack } from "@chakra-ui/react";
import ExperienceCompany from "./ExperienceCompany";
import Heading3 from "../Headings/Heading3";
import Image from "next/image";
import React from "react";

export function ExperienceSection() {
  return (
    <>
      <Heading2>Work Experience</Heading2>
      <Flex direction={"column"} width={"100%"}>
        <Heading3>Currently at...</Heading3>
          <VStack flexDir={"column-reverse"}>
              <ExperienceCompany
                  cover={"/rfsmart.png"}
                  company={"RF-SMART"}
                  position={"Senior React Specialist"}
                  period={"February – July 2022"}
                  paragraph={`Came back to continue what I started with the shipping application 🚀🚀🚀🚀`}
              />
              <Box w={"100%"} h={"auto"} position={"relative"}>
                  <Image
                      width={"100%"}
                      height={37}
                      src={"/rfsmart.png"}
                      layout={"responsive"}
                  />
              </Box>
          </VStack>
      </Flex>
      <Flex direction={"column"} width={"100%"}>
        <Heading3>Previous Experience</Heading3>
          <VStack flexDir={"column-reverse"}>
              <ExperienceCompany
                  cover={"/coinbase-cover.jpg"}
                  company={"Coinbase"}
                  position={"Software Engineer"}
                  period={"February – July 2022"}
                  paragraph={`Developed Coinbase's new NFT Marketplace experience. I was in the Social team, in charge of the more... well,
                   social aspects of the platform. I was the FE developer leading the entire comments and profile pages of the app. 
                   Unfortunately, I was part of the first wave of 2022 layoffs.`}
              />
              <Box w={"100%"} h={"auto"} position={"relative"}>
                  <Image
                      width={"100%"}
                      height={37}
                      src={"/coinbase-cover.jpg"}
                      layout={"responsive"}
                  />
              </Box>
          </VStack>
        <ExperienceCompany
          company={"RF-SMART"}
          position={"React Developer II"}
          period={"2021 – 2022"}
          paragraph={`
            Designed and developed a brand new React application for the warehouse and shipping industry. The application was used by warehouse workers and guided them through the process of shipping items to customers.
            `}
        />
        <ExperienceCompany
          company={"Transcor Data Services"}
          position={"Front-End Designer & Developer"}
          period={"2019 – 2021"}
          paragraph={`
          Designed and developed front-end experiences for applications ranging from Kiosks, Mobile Applications, E-Ticketing Platforms, and Admin applications, also assisted with more DevOps-related tasks like testing and integrating SDKs for new hardware, debugging build issues, investigating new development tools, and set up new projects from scratch.
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
