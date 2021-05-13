import React, { forwardRef } from "react";
import driverAppVideo from "../assets/driverapp.mp4";
import iosImage1 from "../assets/streamuttios1.png";
import iosImage2 from "../assets/streamuttios2.png";

const Project = (props) => {
  return (
    <div className={"flex flex-col items-start w-full pb-40"}>
      <h3
        className={
          "text-2xl font-bold border-b border-white border-solid w-full text-left pb-3"
        }
      >
        {props.title}
      </h3>
      <div className={"flex flex-col md:flex-row w-full pt-3"}>
        <p
          className={
            "text-lg text-left font-light md:w-1/2 whitespace-pre-wrap pr-3"
          }
        >
          {props.paragraph}
        </p>
        {props.imageComponent}
      </div>
    </div>
  );
};

const ProjectsSection = forwardRef((props, ref) => {
  return (
    <div
      className={"w-full md:w-8/12 md:mr-20 min-h-screen p-20 pt-60 text-white"}
      ref={ref}
      data-title={props.dataTitle}
    >
      <Project
        title={"Streamutt"}
        paragraph={`Streamutt was a personal project I created to improve my skills with React and React Native.
        
It's a simple web app and an iOS and Android apps that show the user where to stream tv shows and movies. 
        `}
        imageComponent={
          <div className={"w-1/2 flex flex-row justify-between"}>
            <img
              className={"md:w-1/2 h-auto"}
              src={iosImage1}
              alt={"Streamutt 1"}
            />
            <img
              className={"md:w-1/2 h-auto"}
              src={iosImage2}
              alt={"Streamutt 2"}
            />
          </div>
        }
      />
      <Project
        title={"TDS Driver App"}
        paragraph={`This redesigned Driver App was a big project that I took from initial concept and wireframe to final design and through development.

The design process concluded with splitting the app into three separate stacks of screens that funnel the user through boarding while leaving the least amount of decisions up to the user.
          
The development process included native integration with Honeywell devices, OCR Scanning, saving and transferring photos taken from the device to the server among other features. The app was done entirely in React Native.
        `}
        imageComponent={
          <div className={"md:w-1/2"}>
            <video
              className={"aspect-w-1"}
              src={driverAppVideo}
              autoPlay
              muted
              style={{ translateZ: "-100px" }}
              loop
            />
          </div>
        }
      />
    </div>
  );
});

ProjectsSection.propTypes = {};

export default ProjectsSection;
