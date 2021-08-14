import React from "react";
import PropTypes from "prop-types";
import { Box, useColorModeValue } from "@chakra-ui/react";

const NTButton = ({ children }) => {
  const buttonBG = useColorModeValue(
    "rgba(243,243,243,0.77)",
    "rgba(64,64,64,0.77)"
  );

  const buttonBGHover = useColorModeValue(
    "rgba(0,0,0,0.77)",
    "rgba(239,239,239,0.77)"
  );

  const buttonFontColor = useColorModeValue("white", "black");

  return (
    <Box
      as={"button"}
      position={"relative"}
      role={"group"}
      paddingX={7}
      paddingY={3}
      flex
      justifyContent={"center"}
      alignItems={"center"}
      _active={{
        transform: "translateY(2px)",
      }}
      outline={"none"}
      marginX={4}
    >
      <Box
        position={"absolute"}
        bg={buttonBG}
        transform={"scaleX(0.1)skewX(-70deg)"}
        transition={"transform ease-out .25s;border-radius ease-out .2s"}
        backdropFilter={"blur(10px)saturate(130%)"}
        width={"100%"}
        height={"100%"}
        zIndex={-1}
        top={0}
        left={0}
        _groupHover={{
          bg: buttonBGHover,
          transform: "scaleX(1)skewX(-15deg)",
          borderRadius: 0,
        }}
        _groupActive={{
          opacity: 0.8,
        }}
        _groupFocus={{
          bg: buttonBGHover,
          transform: "scaleX(1)skewX(-15deg)",
          borderRadius: 0,
          boxShadow: "0 0 1px 6px rgba(0,0,0,0.2)",
          outline: "none",
        }}
      />
      <Box
        _groupHover={{ color: buttonFontColor }}
        _groupFocus={{ color: buttonFontColor }}
        fontSize={18}
        letterSpacing={1}
      >
        {children}
      </Box>
    </Box>
  );
};

NTButton.propTypes = {
  label: PropTypes.string,
};

export default NTButton;
