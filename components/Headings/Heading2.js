import React from "react";
import { Heading } from "@chakra-ui/react";

const Heading2 = ({ children }) => {
  return (
    <Heading as={"h2"} mb={10}>
      {children}
    </Heading>
  );
};

export default Heading2;
