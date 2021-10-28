import React from "react";
import { Heading } from "@chakra-ui/react";

const Heading3 = ({ children }) => {
  return (
    <Heading as={"h3"} mb={10} mt={10} fontSize={'2xl'} opacity={.5} fontWeight={'semibold'}>
      {children}
    </Heading>
  );
};

export default Heading3;