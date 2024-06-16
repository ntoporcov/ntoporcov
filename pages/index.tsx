import { Skills } from "../components/home/Skills";
import SendGifSection from "../components/home/SendGifSection";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import AboutMe from "../components/home/AboutMe";
import { ExperienceSection } from "../components/home/ExperienceSection";
import Projects from "../components/home/Projects";

const LazyBlob = dynamic(() => import("../components/home/Blob"));
const LazyToy = dynamic(() => import("../components/home/Toy"));

export default function Home() {
  return (
    <>
      <section id={"about"} className={"min-h-screen"}>
        <Suspense fallback={<></>}>
          <LazyBlob />
        </Suspense>
        <AboutMe />
      </section>
      <section id={"skills"}>
        <Skills />
      </section>
      <section id={"contact"}>
        <SendGifSection />
      </section>
      <section
        id={"fun"}
        className={"flex flex-col items-center justify-center text-center"}
      >
        <h2 className={"mb-6 text-2xl font-thin md:text-xl"}>
          You've been scrolling a lot..
        </h2>
        <div>
          <div
            className={"relative mb-6 w-full text-4xl font-thin tracking-wide"}
          >
            Let's have some fun.
          </div>
        </div>
        <p className={"text-xl font-thin md:text-lg"}>
          There's this toy my daughter absolutely loves to play with, maybe
          you'll like it too...
        </p>
        <Suspense fallback={<></>}>
          <LazyToy />
        </Suspense>
      </section>
      <section
        id={"experience"}
        className={
          "mx-auto w-full max-w-screen-2xl justify-center px-8 md:px-20"
        }
      >
        <ExperienceSection />
      </section>
      <section
        id={"projects"}
        className={
          "mx-auto w-full max-w-screen-2xl justify-center px-8 md:px-20"
        }
      >
        <Projects />
      </section>
      <div className={"h-[40vh]"} />
    </>
  );
}
