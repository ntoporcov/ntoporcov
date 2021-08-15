import React from "react";
import { VStack } from "@chakra-ui/react";
import Heading2 from "../Headings/Heading2";
import ProjectBox from "../Projects/ProjectBox";
import DriverAppProject from "../Projects/DriverAppProject";

const ProjectsSection = () => {
  return (
    <VStack width={"100%"}>
      <Heading2>Some of My Projects</Heading2>
      <DriverAppProject />
    </VStack>
  );
};

export default ProjectsSection;
