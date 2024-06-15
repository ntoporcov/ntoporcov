import Image from "next/image";
import { cn } from "../../hooks/tailwind";

const message = "Hi there, I'm Nic Toporcov";

const textClassName =
  "text-6xl md:text-8xl font-black absolute text-center px-10";

const AboutMe = () => {
  return (
    <div
      className={
        "-mt-[60vh] flex h-screen w-full flex-col items-center justify-center gap-10 px-5 md:-mt-[80vh]"
      }
    >
      <div
        className={"relative mb-[10vh] flex w-full items-center justify-center"}
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
          "relative z-20 mx-auto mb-20 mt-20 flex max-w-5xl flex-col items-center gap-10 rounded-lg border border-gray-300 bg-white/20 px-7 py-12 text-lg shadow-lg backdrop-blur-lg md:flex-row md:gap-20 md:px-20 md:text-base"
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
            I am a Front-End Designer and Developer. Officially, I'm a UI
            Architect at{" "}
            <a
              className={
                "inline-block bg-[#d90043] px-1 font-bold text-[#fff] hover:underline"
              }
              href={
                "https://www.rfsmart.com/netsuite/solutions/netsuite-shipping"
              }
              target={"_blank"}
              rel="noreferrer"
            >
              RF-SMART
            </a>
            , but I prefer the term "Pixel guy".
            <br />
            <br /> I&apos;ve been working as a UI/UX Designer since 2014 and as
            a Front-End Developer since 2015. And if it happens to be a Saturday
            or Sunday, I might be shooting a wedding for{" "}
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

export default AboutMe;
