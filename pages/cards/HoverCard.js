import { Box, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const HoverCard = (props) => {
  const { children } = props;

  const borderShadow = useColorModeValue("rgba(0,0,0,0.1)", "rgba(255,0,0,00)");
  const borderShadowHover = useColorModeValue(
    "rgba(0,0,0,0.05)",
    "rgba(255,0,0,0.3)"
  );

  const backgroundColor = useColorModeValue(
    "rgba(255,255,255)",
    "rgb(35,35,35)"
  );

  return (
    <Box
      mt={10}
      bg={backgroundColor}
      shadow={"0 0 1px 1px " + borderShadow}
      padding={5}
      _hover={{ shadow: "0 3px 5px 2px " + borderShadowHover, ...props._hover }}
      transition={"box-shadow ease-out .15s"}
      role={"group"}
      {...props}
    >
      {children}
    </Box>
  );
};

export default HoverCard;
