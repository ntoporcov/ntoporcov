import "./App.css";
import { useState, useRef, useEffect } from "react";
import ParticleCanvas from "./components/particles/ParticleCanvas";
import { useWindowScroll, useWindowSize } from "react-use";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import ProjectsSection from "./components/ProjectsSection";

function App() {
  const [title, setTitle] = useState("Hi, I'm Nic");
  const heroRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);

  const scrollPosition = useWindowScroll().y;
  const windowSize = useWindowSize();

  useEffect(() => {
    const refs = [heroRef.current, experienceRef.current, projectsRef.current];

    for (let ref of refs) {
      const scrollTrigger = ref.offsetTop;

      if (ref && scrollPosition >= scrollTrigger - windowSize.height / 3) {
        setTitle(ref.attributes["data-title"].value);
      }
    }
  }, [scrollPosition, windowSize]);

  const scrollToElement = (ref) => {
    const coord = ref.current.offsetTop;
    console.log(coord);
    window.scrollTo({ behavior: "smooth", top: coord });
  };

  return (
    <div className="App min-h-screen overflow-hidden flex-col flex-wrap justify-end">
      <ParticleCanvas title={title} />
      <div className={"flex-col flex w-screen items-end z-30"}>
        <AboutSection ref={heroRef} dataTitle={"Hi, I'm Nic"} />
        <ExperienceSection ref={experienceRef} dataTitle={"Experience"} />
        <ProjectsSection ref={projectsRef} dataTitle={"Projects"} />
      </div>
      <nav
        className={
          "fixed left-0 text-white w-30 h-60 top-0 invisible md:visible"
        }
        style={{ marginTop: "55vh" }}
      >
        <div className={""}>
          <h1
            className={"text-white font-bold text-2xl pl-4 pb-4"}
            style={{ fontSize: "1.8rem" }}
          >
            Nicolas Toporcov
          </h1>
        </div>
        <button onClick={() => scrollToElement(heroRef)}>About</button>
        <button onClick={() => scrollToElement(experienceRef)}>
          Experience
        </button>
        <button onClick={() => scrollToElement(projectsRef)}>Projects</button>
      </nav>
    </div>
  );
}

export default App;
