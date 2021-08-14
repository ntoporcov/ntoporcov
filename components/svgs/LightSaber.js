import React, { useEffect } from "react";
import { Box, Button, useColorMode, useColorModeValue } from "@chakra-ui/react";

const LightSaber = () => {
  const { toggleColorMode } = useColorMode();
  const hiltColor = useColorModeValue("#bbbbbb", "#5e5e5e");
  const laserColor = useColorModeValue("#00de00", "#cd0000");
  const buttonFocus = useColorModeValue(
    "rgba(0,222,0,0.83)",
    "rgba(205,0,0,0.77)"
  );

  return (
    <Button
      variant={"ghost"}
      onClick={toggleColorMode}
      _hover={{ bg: "none" }}
      _focus={{
        shadow: "0 0 1px 3px " + buttonFocus,
      }}
      px={0}
    >
      <Box w={8} transform={"rotate(-45deg)"}>
        <svg id="lightsaber" viewBox="0 0 512 512">
          <path
            style={{ fill: hiltColor }}
            id={"hilt"}
            d="M9.4,412.1c-12.5,12.5-12.5,32.8,0,45.2l45.2,45.2c12.5,12.5,32.8,12.5,45.2,0l79.1-79.1L88.5,333L9.4,412.1z M105.5,327.3
    l79.2,79.2l22.6-22.6l-79.3-79.3L105.5,327.3z M195.1,236.8c-3.1-3.1-8.1-3.1-11.2,0l-10.5,11.3c-3.1,3.1-3.1,8.1,0,11.2l79.2,79.2
    c3.1,3.1,8.1,3.1,11.2,0l11.4-11.4c3.1-3.1,3.1-8.1,0-11.2L195.1,236.8z M139.5,293.4l79.1,79.1l22.6-22.6l-79.1-79.1L139.5,293.4z"
          />
          <path
            id={"laser"}
            style={{ fill: laserColor }}
            d="M504.1,7c-9.1-9.1-23.9-9.4-33.2-0.6l-245.2,226l53.1,53.1L503.8,39.4C514.4,30.9,514.1,16.1,504.1,7z"
          />
        </svg>
      </Box>
    </Button>
  );
};

export default LightSaber;
