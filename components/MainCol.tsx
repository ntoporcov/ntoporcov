import { Container } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

const MainCol = (props: PropsWithChildren<{}>) => {
  return (
    <Container as={"main"} maxW={"1400px"} centerContent pb={"30vh"} px={2}>
      {props.children}
    </Container>
  );
};

export default MainCol;
