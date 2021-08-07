import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ToolsIcons(props) {
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      flexDirection={"column"}
      alignItems={"center"}
      textAlign={"center"}
      width={props.width || 20}
      marginX={8}
      marginBottom={10}
    >
      {props.children ? (
        props.children
      ) : (
        <FontAwesomeIcon icon={props.icon} color={props.color} />
      )}

      <Text color={props.color}>{props.name}</Text>
    </Box>
  );
}

export function SmallToolsIcons(props) {
  return <ToolsIcons width={14} {...props} />;
}

export default ToolsIcons;
