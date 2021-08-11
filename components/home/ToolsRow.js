import { Box } from "@chakra-ui/react";

function ToolsRow(props) {
  const { children } = props;
  return (
    <Box
      display={"flex"}
      flexWrap={"wrap"}
      justifyContent={"center"}
      fontSize={16}
      width={"100%"}
      textAlign={"center"}
      color={"#6f6f6f"}
      {...props}
    >
      {children}
    </Box>
  );
}

export default ToolsRow;
