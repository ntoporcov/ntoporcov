import React from "react";
import PropTypes from "prop-types";
import { Box } from "@chakra-ui/react";

const NTButton = ({ children }) => {
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
        bg={"#f3f3f3"}
        transform={"scaleX(0.1)skewX(-70deg)"}
        transition={"transform ease-out .25s;border-radius ease-out .2s"}
        width={"100%"}
        height={"100%"}
        zIndex={-1}
        top={0}
        left={0}
        _groupHover={{
          bg: "black",
          transform: "scaleX(1)skewX(-15deg)",
          borderRadius: 0,
        }}
        _groupActive={{
          opacity: 0.8,
        }}
        _groupFocus={{
          bg: "black",
          transform: "scaleX(1)skewX(-15deg)",
          borderRadius: 0,
          boxShadow: "0 0 1px 6px rgba(0,0,0,0.2)",
          outline: "none",
        }}
      />
      <Box
        _groupHover={{ color: "white" }}
        _groupFocus={{ color: "white" }}
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
