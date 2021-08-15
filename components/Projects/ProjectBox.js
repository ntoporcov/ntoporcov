import React from "react";
import HoverCard from "../../pages/cards/HoverCard";

const ProjectBox = (props) => {
  const { children } = props;
  return (
    <HoverCard borderRadius={10} width={"100%"} {...props}>
      {children}
    </HoverCard>
  );
};

export default ProjectBox;
