import Image from "next/image";
import { cn } from "../../hooks/tailwind";
import { useState } from "react";
import { useInterval } from "react-use";

const AboutMe = () => {
  const message = useMessageCounter();

  const textClassName =
    "text-6xl md:text-8xl font-black absolute text-center px-10";

  return (
    <div
      className={
        "-mt-[80vh] flex h-screen w-screen flex-col items-center justify-center gap-10"
      }
    >
      <div
        className={
          "relative mb-[10vh] flex w-screen items-center justify-center"
        }
      >
        <span
          className={textClassName}
          style={{
            WebkitTextStroke: "rgb(var(--gray-950)) 2px",
            WebkitTextFillColor: "transparent",
            fontFamily: "sans-serif",
          }}
        >
          {message}
        </span>
        <span
          className={cn(textClassName, "-z-10")}
          style={{
            fontFamily: "sans-serif",
          }}
        >
          {message}
        </span>
      </div>

      <div
        className={
          "relative z-20 mx-auto mt-20 flex max-w-5xl flex-col items-center gap-20 rounded-lg border border-gray-300 bg-white/20 px-20 py-12 text-lg shadow-lg backdrop-blur-lg md:flex-row md:text-base"
        }
      >
        <div
          className={
            "relative flex min-h-48 min-w-48 items-center justify-center overflow-hidden rounded-full"
          }
        >
          <Image
            alt={"picture of me smiling"}
            src={"/avatar.jpg"}
            layout={"fill"}
          />
        </div>
        <div className={"mt-4 flex flex-col gap-2 md:mt-0"}>
          <p>
            I am a Front-End Designer and Developer. I&apos;ve been working as a
            UI/UX Designer since 2014 and as a Front-End Developer since 2015.
            <br />
            <br />I am currently thrilled to be working at{" "}
            <a
              className={
                "bg-[#d90043] px-1 font-bold text-[#fff] hover:underline"
              }
              href={
                "https://www.rfsmart.com/netsuite/solutions/netsuite-shipping"
              }
              target={"_blank"}
              rel="noreferrer"
            >
              RF-SMART Shipping
            </a>{" "}
            – and if it happens to be a Saturday or Sunday, I might be shooting
            a wedding for{" "}
            <a
              className={
                "bg-[#79603d] px-1 font-bold text-[#fff] hover:underline"
              }
              href={"https://www.lunicvisuals.com"}
              target={"_blank"}
              rel="noreferrer"
            >
              Lunic Visuals
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

const message = "Hi there, I'm Nic Toporcov";

const useMessageCounter = () => {
  const [currMessage, setCurrMessage] = useState("");
  const [randomInterval, setRandomInterval] = useState(0);

  useInterval(
    () => {
      setCurrMessage(
        message
          .split("")
          .slice(0, currMessage.length + 1)
          .join(""),
      );
      setRandomInterval(Math.random() * 200 + 50);
    },
    currMessage.length === message.length ? null : randomInterval,
  );

  return currMessage;
};

export default AboutMe;
