import { Heading } from "@chakra-ui/react";
import React from "react";

export const Heading1 = ({ children }) => {
  return (
    <Heading as={"h1"} mb={10} fontSize={"3rem"} mt={50}>
      {children}
    </Heading>
  );
};
