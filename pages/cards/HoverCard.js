import { Box } from "@chakra-ui/react";
import React from "react";

const HoverCard = (props) => {
  const { children } = props;
  return (
    <Box
      mt={10}
      bg={"white"}
      shadow={"0 0 1px 1px rgba(0,0,0,.1)"}
      padding={5}
      _hover={{ shadow: "0 3px 5px 2px rgba(0,0,0,.05)", ...props._hover }}
      transition={"box-shadow ease-out .15s"}
      role={"group"}
      {...props}
    >
      {children}
    </Box>
  );
};

export default HoverCard;
