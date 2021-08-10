import SbEditable from "storyblok-react";
import BlogText from "./BlogText";
import BlogBoxes from "./BlogBoxes";

// resolve Storyblok components to Next.js components
const Components = {
  BlogText,
  BlogBoxes,
};

const DynamicComponent = ({ blok }) => {
  // check if component is defined above
  if (typeof Components[blok.component] !== "undefined") {
    const Component = Components[blok.component];
    // wrap with SbEditable for visual editing
    return (
      <SbEditable content={blok}>
        <Component blok={blok} />
      </SbEditable>
    );
  }

  // fallback if the component doesn't exist
  return (
    <p>
      The component <strong>{blok.component}</strong> has not been created yet.
    </p>
  );
};

export default DynamicComponent;
