import { GradientCard } from "../display/GradientCard";
import { ReactNode, useEffect, useRef } from "react";
import { cn } from "../../hooks/tailwind";
import { FaGitAlt, FaReact, FaSwift, FaVuejs } from "react-icons/fa6";
import { FaFigma } from "react-icons/fa";
import { ThreeJsIcon } from "../svg/threeJs";
import NextJSLogo from "../svg/NextJSLogo";
import {
  SiChakraui,
  SiRadixui,
  SiShadcnui,
  SiTailwindcss,
  SiTestinglibrary,
  SiTypescript,
  SiVite,
} from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import { BiLogoFirebase } from "react-icons/bi";
import { IoIosAppstore } from "react-icons/io";
import { useBoolean, useWindowScroll } from "react-use";
import { Lamp } from "../display/Lamp";
import { useBreakpointValue } from "../../hooks/useBreakpointValue";
import { SegmentedControl } from "../form/SegmentedControl";

export const Skills = () => {
  const [onlyMainOnes, setOnlyMainOnes] = useBoolean(true);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const shouldShowSecondaries = isMobile ? !onlyMainOnes : true;

  return (
    <div className={"relative"}>
      <Lamp />
      <div className={"z-10 mx-auto w-full max-w-screen-2xl"}>
        <h2
          className={
            "mt-16 text-center text-5xl font-thin tracking-wide md:text-7xl"
          }
        >
          How I Move Pixels
        </h2>
        <div
          className={"mt-2 flex flex-col items-center gap-2 px-5 text-center"}
        >
          <span className={"text-center text-2xl tracking-wide md:text-xl"}>
            Some tools and skills that come to mind.
          </span>
          <span className={"opacity-50"}>
            More may be available upon request
          </span>
        </div>

        <div className={"sticky top-10 z-20 flex justify-center md:hidden"}>
          <SegmentedControl
            value={String(onlyMainOnes)}
            className={"mt-5 bg-white/20 backdrop-blur"}
            options={[
              {
                value: String(true),
                label: "Main Stuff",
              },
              {
                value: String(false),
                label: "Show All",
              },
            ]}
            itemClassName={() => "uppercase tracking-wider active:scale-95"}
            indicatorClassName={"bg-white/20 backdrop-blur"}
            onChange={(val) => setOnlyMainOnes(val === "true")}
          />
        </div>

        <div
          className={
            "grid w-full grid-cols-2 gap-2 p-10 pb-16 md:grid-cols-8 lg:grid-cols-12"
          }
        >
          <GradientBentoBox
            title={"Typescript"}
            description={
              <span>
                Honestly, I just feel dirty when writing code in plain
                Javascript nowadays. <br />
                <br /> Typescript is a no-brainer for every project of mine now.
              </span>
            }
            icon={<SiTypescript size={60} color={"#3178C6"} />}
            className={"col-span-2 md:col-span-4 lg:col-span-4 lg:row-span-2"}
          />
          {shouldShowSecondaries && (
            <GradientBentoBox
              title={"Figma"}
              description={
                "Haven't been designing as much as I used to, but I still love Figma."
              }
              icon={<FaFigma className={"text-pink-400"} size={40} />}
              className={"md:col-span-2 lg:col-span-4"}
            />
          )}
          {shouldShowSecondaries && (
            <GradientBentoBox
              title={"NextJS"}
              description={
                "My go-to for server-side rendering and static sites."
              }
              icon={<NextJSLogo className={"text-xl"} />}
              className={"md:col-span-2 lg:col-span-4"}
            />
          )}
          <GradientBentoBox
            title={"React"}
            description={
              <span>
                I've been working with React since 2016 and class components.
                <br />
                <br />I worked on a few personal projects to learn it, and from
                there I've used it in Bus Ticketing Portals, Headless CMS
                Websites, Kiosk Applications, Coinbase NFT, a Shipping
                Application and most other projects I've been involved in...
              </span>
            }
            icon={<FaReact className={"text-blue-500"} size={100} />}
            className={"col-span-2 md:col-span-5 md:row-span-2 lg:col-span-4"}
          />
          <GradientBentoBox
            title={"Three.js"}
            description={
              "Created a couple experiences including a dynamic packing instructor, a couple 3D animations (including that hero up there)"
            }
            icon={<ThreeJsIcon className={"text-4xl text-orange-500"} />}
            className={"col-span-2 md:col-span-3 lg:col-span-4"}
          />
          {shouldShowSecondaries && (
            <>
              <GradientBentoBox
                title={"SwiftUI"}
                description={"Been learning it, especially for VR."}
                icon={<FaSwift className={"text-orange-500"} size={40} />}
                className={"md:col-span-3 lg:col-span-2"}
              />
              <GradientBentoBox
                title={"Git"}
                description={"If it's not in Git, it doesn't exist."}
                icon={<FaGitAlt className={"text-gray-800"} size={40} />}
                className={"md:col-span-3 lg:col-span-2"}
              />
              <GradientBentoBox
                title={"Vue"}
                description={
                  "I've used Vue for some projects on a previous job. Only the Options API though, Composition was just getting started at the time. Options API seemed neat though, very organized..."
                }
                icon={<FaVuejs color={"#42b883"} size={60} />}
                className={"col-span-2 md:col-span-5 lg:col-span-4"}
              />

              <GradientBentoBox
                title={"Firebase"}
                description={
                  'My "Backend" of choice. I think I"ve used most of the services by now, but definitely a lot of auth, firestore, rtdb and storage.'
                }
                icon={
                  <BiLogoFirebase className={"text-yellow-500"} size={60} />
                }
                className={"md:col-span-4 lg:col-span-4"}
              />

              <GradientBentoBox
                title={"C#"}
                description={
                  "I've written a few lines of C#. Honestly that's about it, but it wasn't all that scary for a pixel pusher..."
                }
                icon={<TbBrandCSharp className={"text-purple-400"} size={60} />}
                className={"md:col-span-2"}
              />
              <GradientBentoBox
                title={"Testing"}
                description={"Yes, yes I'll write tests..."}
                icon={<SiTestinglibrary className={"text-red-400"} size={60} />}
                className={"md:col-span-2"}
              />
              <GradientBentoBox
                title={"Vite"}
                description={
                  "Go-to when SSR isn't needed. Especially for Enterprise software where it's all locked behind an initial login."
                }
                icon={<SiVite className={"text-purple-500"} size={60} />}
                className={"md:col-span-4"}
              />
            </>
          )}
          <GradientBentoBox
            title={"Tailwind CSS"}
            description={
              "Big fan of Tailwind. If you already know css and feel like UI frameworks sometimes just get in the way, Tailwind is for you."
            }
            icon={<SiTailwindcss color={"#06B6D4"} size={60} />}
            className={"col-span-2 md:col-span-4 md:row-span-2"}
          />
          {shouldShowSecondaries && (
            <>
              <GradientBentoBox
                title={"Chakra UI"}
                description={
                  "Great to get something that looks good out the ground extremely quickly."
                }
                icon={<SiChakraui color={"#319795"} size={60} />}
                className={"md:col-span-4"}
              />
              <GradientBentoBox
                title={"iOS Apps"}
                description={
                  "Worked on (and published) some iOS Apps, a bunch with React Native, one with SwiftUI."
                }
                icon={<IoIosAppstore className={"text-blue-500"} size={60} />}
                className={"md:col-span-4 lg:row-span-2"}
              />
            </>
          )}
          <GradientBentoBox
            title={"Radix UI"}
            description={
              "Great for more complex UI components, also a lot of help with accessibility."
            }
            icon={<SiRadixui className={"text-gray-800"} size={60} />}
            className={"md:col-span-2"}
          />
          <GradientBentoBox
            title={"Shadcn UI"}
            description={
              "Another great starting point for components and design systems."
            }
            icon={<SiShadcnui className={"text-gray-800"} size={60} />}
            className={"md:col-span-2"}
          />
        </div>
      </div>
    </div>
  );
};

const GradientBentoBox = ({
  title,
  description,
  icon,
  className,
  contentClassName,
}: {
  title: string;
  description: ReactNode;
  icon: ReactNode;
  className: string;
  contentClassName?: string;
}) => {
  const [isPastMiddle, toggle] = useBoolean(false);

  const parentDiv = useRef<HTMLDivElement>(null);

  const scroll = useWindowScroll();

  useEffect(() => {
    if (isPastMiddle) return;

    if (parentDiv.current) {
      const { top } = parentDiv.current.getBoundingClientRect();

      if (top < window.innerHeight * 0.7) {
        toggle(true);
      }
    }
  }, [isPastMiddle, scroll.y, toggle]);

  return (
    <div className={cn(className, "relative min-h-32")} ref={parentDiv}>
      <GradientCard
        parentClassName={cn(
          "flex group flex gap-2 p-0.5 rounded md:absolute min-h-full hover:md:h-48 hover:md:scale-105 z-0 hover:z-10",
          className,
        )}
        contentClassName={cn(
          "flex p-5 gap-3 flex items-center flex-col rounded md:justify-center",
          "justify-center",
          contentClassName,
        )}
      >
        {icon}
        <div
          className={cn(
            "-mt-2 transition-all duration-500 ease-in-out group-hover:mt-0 group-hover:opacity-100 md:mt-0 md:h-0 md:opacity-0 md:duration-200 md:group-hover:h-full",
            "mt-2 h-full opacity-100 md:h-0 md:opacity-0",
          )}
        >
          <h3 className={cn("text-center text-xl font-medium")}>{title}</h3>
          <p className={"pt-2 text-center text-sm"}>{description}</p>
        </div>
      </GradientCard>
    </div>
  );
};
