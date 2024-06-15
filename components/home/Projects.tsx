import React, { ReactNode } from "react";
import Image from "next/image";
import { Button } from "../form/Button";
import { cn } from "../../hooks/tailwind";
import { FaGithub, FaReact } from "react-icons/fa6";
import NextJSLogo from "../svg/NextJSLogo";
import { SiFirebase, SiTailwindcss } from "react-icons/si";
import {
  TbBrandReactNative,
  TbBrandSwift,
  TbDeviceVisionPro,
} from "react-icons/tb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../display/Accordion";

export type ProjectsProps = {};

const Projects = (props: ProjectsProps) => {
  return (
    <div className={"mx-auto max-w-screen-lg"}>
      <h2 className={"mb-20 mt-60 text-center text-4xl font-thin"}>
        Some Projects
      </h2>

      <div className={"flex flex-col gap-10"}>
        <ProjectCard
          title={"iQbit"}
          link={"https://github.com/ntoporcov/iQbit"}
          faq={[
            {
              question: "What is this?",
              answer:
                "A front-end for managing p2p downloads. Torrents, if you're familiar. It talks to an API provided by qBittorrent.",
            },
            {
              question: "Oh Torrenting is still a thing?",
              answer: "Very much so!",
            },
            {
              question: "Is it a native app?",
              answer:
                "It's a PWA, so it can be installed on your phone or desktop.",
            },
            {
              question: "How does it work?",
              answer:
                "It's basically a custom web interface for a torrenting application. It polls the application to get data for all torrents and talks to it through HTTP Requests",
            },
          ]}
          image={"/iqbit-devices.png"}
          tags={[
            {
              tag: "React",
              className: "bg-blue-300 text-blue-900",
              icon: <FaReact />,
            },
            {
              tag: "Open Source",
              className: "bg-gray-200 text-black",
              icon: <FaGithub />,
            },
          ]}
        />

        <ProjectCard
          title={"Coinbase NFT"}
          image={"/cb-nft.png"}
          faq={[
            {
              question: "What is this?",
              answer:
                "It was Coinbase's attempt at an NFT marketplace. I was part of the Social team. One of the biggest features I lead were comments and profiles.",
            },
            {
              question: "Weren't we all gonna make it?",
              answer: "That's what I had heard...",
            },
            {
              question: "What was the architecture?",
              answer:
                "It was a React (NextJS) app, with a GraphQL backend. We used Relay for the GraphQL client and TailwindCSS for styling.",
            },
            {
              question: "What was working there like?",
              answer:
                "It was a great experience. I learned a lot about working in a large corporation and also got to work with some really talented devs, some of which had come from the React team at meta.",
            },
          ]}
          link={"https://nft.coinbase.com"}
          tags={[
            {
              tag: "React",
              className: "bg-blue-300 text-blue-900",
              icon: <FaReact />,
            },
            {
              tag: "NextJS",
              className: "bg-gray-50 text-black",
              icon: <NextJSLogo className={"h-3 w-10"} />,
            },
            {
              tag: "TailwindCSS",
              className: "bg-[#06B6D4] text-black",
              icon: <SiTailwindcss />,
            },
          ]}
        />

        <ProjectCard
          title={"Captivate AI"}
          image={"/captivate-ai.png"}
          link={"https://apps.apple.com/us/app/captivate-ai/id1661393555"}
          faq={[
            {
              question: "What is this?",
              answer:
                "A mobile app for creating captions for photos. The user describes the photo and the AI generates a caption for it.",
            },
            {
              question: "ah.. so, OpenAI?",
              answer:
                "Yup! haha it was a fun project. I was responsible for the entire app. I designed it and developed it.",
            },
            {
              question: "What was the tech stack?",
              answer:
                "It was a React Native app, with Firebase lambda functions for the backend and Firestore for the database. The AI is whatever is the latest gpt model at the time.",
            },
            {
              question: "Who's paying for this shenanigan?",
              answer:
                "The app has IAPs for credits. Every caption costs some amount of credit based on an estimate of how many tokens are usually generated.",
            },
          ]}
          tags={[
            {
              tag: "React Native",
              className: "bg-cyan-600 text-black",
              icon: <TbBrandReactNative />,
            },
            {
              tag: "Firebase",
              className: "bg-yellow-300 text-black",
              icon: <SiFirebase />,
            },
          ]}
        />

        <ProjectCard
          title={"HackReport"}
          image={"/hackreport.webp"}
          link={"https://apps.apple.com/us/app/hacker-report/id6478190636"}
          faq={[
            {
              question: "What is this?",
              answer:
                "This was the first client for the popular Hacker News forum. It was a SwiftUI app for iOS and macOS.",
            },
            {
              question: "Why?",
              answer:
                "I wanted to learn SwiftUI and found out Hacker News had a free API. Vision Pro had just come out and I wanted to play with it, so I went ahead and made a client for it.",
            },
            {
              question: "What did you think of Swift and SwiftUI?",
              answer:
                "It was a great learning experience. Swift is pretty cool and SwiftUI didn't seem that far off from React in a lot of ways. Working with things like Animation using Apple's APIs is wonderful. XCode on the other hand suuuuucks for writing code (compared to JetBrains stuff at least)",
            },
          ]}
          tags={[
            {
              tag: "SwiftUI",
              className: "bg-orange-400 text-black",
              icon: <TbBrandSwift />,
            },
            {
              tag: "VR / Vision Pro",
              className: "bg-blue-500 text-black",
              icon: <TbDeviceVisionPro />,
            },
          ]}
        />

        <ProjectCard
          title={"Wireflow"}
          image={"/wrflw.png"}
          link={"https://wrflw.com"}
          faq={[
            {
              question: "What is this?",
              answer:
                "A tool for creating low fidelity wireframes from pre-selected screen layouts. I made it as part of RF-SMART's Hackfest in 2024. It was targeted to Project Managers, and attempting to give them more tools to think through the user journey of a feature in any given enterprise application. From configuration to execution.",
            },
            {
              question: "What was the tech stack?",
              answer:
                "It was a React app, with a very light Firebase backend. The app was designed to be used on a tablet or desktop, and had a lot of drag and drop functionality.",
            },
            {
              question: "What was the biggest challenge?",
              answer:
                "The biggest challenge was the whole drag and drop and diagramming. I ended up using react-flow and it worked very well.",
            },
            {
              question: "What was the reception?",
              answer:
                "It was well received by the judges and the PMs at RF-SMART. We ended up winning the best designed project of that year.",
            },
            {
              question: "What's with the look?",
              answer:
                "Given the raw nature of low fidelity wireframes, I chose to play with Neobrutalism. I think it worked well for the tool.",
            },
          ]}
          tags={[
            {
              tag: "React",
              className: "bg-blue-300 text-blue-900",
              icon: <FaReact />,
            },
          ]}
        />

        <ProjectCard
          title={"TDS Driver App"}
          image={"/scanningAppCoverCropped.png"}
          faq={[
            {
              question: "What is this?",
              answer:
                "A driver app for a bus drivers. TDS provides software services to bus companies. This app was responsible for guiding drivers to their next stop, and providing information about the passengers on board, as well as selling tickets and scanning passengers onto the bus",
            },
            {
              question: "What did I do?",
              answer:
                "I was responsible for the entire app. I was the primary designer for the app, and also developed the app.",
            },
            {
              question: "What were the challenges?",
              answer:
                "The app had a lot of native functionality, like navigation and camera scanning. It also had to work offline which required some pretty intricate caching capability. On the UI/UX side, once the user had started a route, they had to be locked on a completely separate navigation stack.",
            },
          ]}
          tags={[
            {
              tag: "React Native",
              className: "bg-cyan-600 text-black",
              icon: <TbBrandReactNative />,
            },
          ]}
        />
      </div>
    </div>
  );
};

const ProjectCard = ({
  title,
  image,
  faq = [],
  tags,
  className,
  link,
}: {
  title: string;
  image: string;
  faq?: {
    question: string;
    answer: string;
  }[];
  tags: {
    tag: string;
    className: string;
    icon: ReactNode;
  }[];
  link?: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex w-full flex-col gap-2 rounded-lg bg-transparent pt-2 shadow-lg outline outline-1 outline-gray-300 lg:flex-row lg:gap-8 lg:pt-4",
        className,
      )}
    >
      <div
        className={
          "flex min-w-full flex-grow items-end lg:min-w-96 lg:max-w-96"
        }
      >
        <Image
          src={image}
          width={500}
          height={0}
          alt={"project image"}
          className={
            "mb-2 h-auto w-full border-b border-gray-300 object-cover object-bottom lg:mb-0 lg:w-auto lg:border-0 lg:object-right-bottom"
          }
        />
      </div>

      <div className={"flex flex-grow flex-col gap-2 lg:pl-2"}>
        <h4 className={"pb-1 pl-5 pr-4 text-4xl font-bold lg:pl-0"}>{title}</h4>
        <div className={"mb-5 flex flex-wrap gap-2 pl-5 pr-4 lg:pl-0"}>
          {tags.map((tag) => (
            <span
              key={tag.tag}
              className={cn(
                "flex items-center gap-3 rounded-full p-4 py-2 text-sm",
                tag.className,
              )}
            >
              <span className={"text-xl"}>{tag.icon}</span>
              <span>{tag.tag}</span>
            </span>
          ))}
        </div>
        {
          <Accordion type="single" collapsible>
            {faq?.map((item) => (
              <AccordionItem key={item.question} value={item.question}>
                <AccordionTrigger className={"pr-4"}>
                  <h5 className={"px-2 pl-5 text-xl font-bold lg:pl-2"}>
                    {item.question}
                  </h5>
                </AccordionTrigger>
                <AccordionContent
                  className={"pl-5 pr-10 lg:pl-2"}
                  defaultChecked
                >
                  <p>{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        }

        {link && (
          <>
            <div className={"flex-grow"} />
            <a
              className={"mr-4 self-end justify-self-end pb-4 pr-4"}
              href={link}
              target={"_blank"}
              rel={"noreferrer"}
            >
              <Button variant={"outline"}>Check it out</Button>
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default Projects;
