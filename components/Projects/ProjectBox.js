import React from "react";
import HoverCard from "../../pages/cards/HoverCard";

const ProjectBox = (props) => {
  const { children } = props;
  return (
    <HoverCard borderRadius={10} width={"100%"} {...props} overflow={"hidden"}>
      {children}
    </HoverCard>
  );
};

export default ProjectBox;
