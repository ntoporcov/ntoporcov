import React, { forwardRef } from "react";
import LinkedInIcon from "./svgs/linkedin";
import EmailLink from "./svgs/email";

const AboutSection = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className={"w-full md:w-7/12 md:mr-20 min-h-screen p-20 pt-60"}
      data-title={props.dataTitle}
    >
      <p className={"text-white text-lg text-left"}>
        I am a{" "}
        <span className={"bg-white text-black text-bold"}>
          Front-End Designer and Developer
        </span>
        . I've been working as a UI/UX Designer since 2014 and as a Front-End
        Developer since 2015.
        <br />
        <br />
        I have worked in the publishing industry, in the SASS industry (CRM) and
        I am currently working in the transportation industry where my main
        focus are design and development for Kiosks, Mobile Applications,
        E-Ticketing Platforms and Admin applications. I also provide assistance
        in some DevOps functions.
        <br />
        <br />I currently work extensively with React, React Native and VueJS.
      </p>
      <div className={"flex flex-row pt-10 space-x-2"}>
        <LinkedInIcon />
        <EmailLink />
      </div>
    </div>
  );
});

export default AboutSection;
