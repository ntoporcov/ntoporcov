import React from "react";
import HoverCard from "../cards/HoverCard";

const ProjectBox = (props) => {
  const { children } = props;
  return (
    <HoverCard borderRadius={10} width={"100%"} {...props} overflow={"hidden"}>
      {children}
    </HoverCard>
  );
};

export default ProjectBox;
