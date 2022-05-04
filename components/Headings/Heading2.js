import React from "react";
import { Heading } from "@chakra-ui/react";

const Heading2 = ({ children, ...props }) => {
  return (
    <Heading as={"h2"} mb={10} {...props}>
      {children}
    </Heading>
  );
};

export default Heading2;
