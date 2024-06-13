import { Skills } from "../components/home/Skills";
import SendGifSection from "../components/home/SendGifSection";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import AboutMe from "../components/home/AboutMe";
import { cn } from "../hooks/tailwind";

const LazyBlob = dynamic(() => import("../components/home/Blob"));
const LazyToy = dynamic(() => import("../components/home/Toy"));

export default function Home() {
  return (
    <>
      <div className={"min-h-screen"}>
        <Suspense fallback={<></>}>
          <LazyBlob />
        </Suspense>
        <AboutMe />
      </div>
      <Skills />
      <SendGifSection />
      <div className={"relative w-full px-[5vw] pb-[30vh] md:px-[10vw]"}>
        <div className={"flex flex-col justify-center text-center"}>
          <h2 className={"mb-6 text-4xl font-thin"}>
            You've been scrolling a lot..
            <br />
            Let's have some fun.
          </h2>
          <p className={"text-lg font-normal"}>
            There's this toy my daughter absolutely loves to play with, maybe
            you'll like it too...
          </p>
        </div>
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
                    "bg-rainbow min-h-[200%] min-w-[200%] animate-spin"
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
      </div>
    </>
  );
}
