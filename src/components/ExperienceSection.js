import React, { forwardRef } from "react";

const ExperienceCompany = ({ company, period, paragraph }) => {
  return (
    <div className={"text-white max-w-full mb-10"}>
      <div
        className={
          "flex flex-col md:flex-row justify-between w-full border-b border-white border-solid pb-3 items-center"
        }
      >
        <span className={"text-2xl inline-block font-bold"}>{company}</span>
        <span className={"text-md inline-block self"}>{period}</span>
      </div>
      <p
        className={
          "text-white text-lg font-light tracking-loose text-left pt-3"
        }
      >
        {paragraph}
      </p>
    </div>
  );
};

const ExperienceSection = forwardRef((props, ref) => {
  return (
    <div
      className={"w-full md:w-8/12 md:mr-20 min-h-screen p-20 pt-60"}
      ref={ref}
      data-title={props.dataTitle}
    >
      <div className={"flex flex-col justify mb-40 text-white"}>
        <span className={"text-2xl inline-block font-bold"}>
          University of North Florida
        </span>
        <h2 className={"text-xl font-bold"}>B.S. in Communication </h2>
        <span className={"text-sm font-medium"}>Class of 2015</span>
      </div>
      <ExperienceCompany
        company={"Transcor Data Services"}
        period={"2019 – Now"}
        paragraph={`
        As a Front-End Developer and Designer my duties switch between designing and developing front-end 
        experiences for applications ranging from Kiosks, Mobile Applications, E-Ticketing Platforms
        and Admin applications. I also assist with more DevOps related tasks like testing and integrating SDKs for 
        new hardware, debugging build issues, investigating new development tools and setting up projects from scratch.  
        `}
      />
      <ExperienceCompany
        company={"Gleanview"}
        period={"2016 – 2019"}
        paragraph={`
        GleanView is a CRM tool for small and medium businesses. I was in charge of designing new features for the 
        application, managing, designing and improving on the company's branding while also being 
        in charge of development for the marketing website. 
        `}
      />
      <ExperienceCompany
        company={"Jacksonville Business Journal"}
        period={"2015 – 2016"}
        paragraph={`
        JBJ was one of my first jobs after college. I was in charge of the print design for the newspaper, design and
        development for landing pages for events, and design for digital and print advertisements.
        `}
      />
    </div>
  );
});

ExperienceSection.propTypes = {};

export default ExperienceSection;
