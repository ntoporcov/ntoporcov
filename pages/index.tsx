import { Skills } from "../components/home/Skills";
import SendGifSection from "../components/home/SendGifSection";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import AboutMe from "../components/home/AboutMe";
import { cn } from "../hooks/tailwind";
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
      <div
        className={
          "relative mx-auto w-full max-w-screen-2xl justify-center px-8 pb-[30vh] md:px-20"
        }
      >
        <section
          id={"fun"}
          className={"flex flex-col items-center justify-center text-center"}
        >
          <h2 className={"mb-6 text-xl font-thin"}>
            You've been scrolling a lot..
          </h2>
          <div>
            <div
              className={
                "relative mb-6 w-full text-4xl font-thin tracking-wide"
              }
            >
              Let's have some fun.
            </div>
          </div>
          <p className={"text-lg font-thin"}>
            There's this toy my daughter absolutely loves to play with, maybe
            you'll like it too...
          </p>
        </section>
        <Suspense fallback={<></>}>
          <div
            className={
              "relative mx-auto mt-20 h-[500px] w-full rounded-lg border border-gray-500 bg-gray-50 md:aspect-square md:h-[70vh]"
            }
          >
            {[0, 1].map((_, i) => (
              <div
                key={i}
                className={cn(
                  "absolute top-0 -z-10 -ml-[3px] -mt-[3px] flex h-[calc(100%+6px)] w-[calc(100%+6px)] items-center justify-center overflow-hidden rounded-lg",
                  i ? "scale-[1.01] opacity-50 blur-2xl" : "",
                )}
              >
                <div
                  className={
                    "bg-rainbow min-h-[300%] min-w-[200%] animate-spin"
                  }
                  style={{
                    animationDuration: "5s",
                  }}
                />
              </div>
            ))}
            <LazyToy />
          </div>
        </Suspense>
        <section id={"experience"}>
          <ExperienceSection />
        </section>
        <section id={"projects"}>
          <Projects />
        </section>
      </div>
    </>
  );
}
