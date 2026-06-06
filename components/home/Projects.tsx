import React, { ReactNode, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../form/Button";
import { cn } from "../../hooks/tailwind";
import { FaAppStoreIos, FaGithub, FaReact } from "react-icons/fa6";
import NextJSLogo from "../svg/NextJSLogo";
import { SiFirebase, SiHomebrew, SiTailwindcss } from "react-icons/si";
import {
  TbBrandReactNative,
  TbBrandSwift,
  TbDeviceDesktop,
  TbDeviceVisionPro,
} from "react-icons/tb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../display/Accordion";
import VibeMeter from "../display/VibeMeter";
import FadeInUp from "../display/FadeInUp";

const Projects = () => {
  return (
    <div className={"mx-auto max-w-screen-lg"}>
      <FadeInUp>
        <h2 className={"mb-20 mt-60 text-center text-4xl font-thin"}>
          Some Projects
        </h2>
      </FadeInUp>

      <div className={"flex flex-col gap-10"}>
        <FadeInUp>
          <FeaturedProjectCard
          title={"OpenClient"}
          vibeLevel={0.6}
          link={"https://apps.apple.com/us/app/openclient-for-opencode/id6744919498"}
          images={[
            "/openclient-recent-servers.png",
            "/openclient-new-session.png",
            "/openclient-sessions.png",
            "/openclient-chat.png",
            "/openclient-live-activity.png",
            "/openclient-widgets.png",
          ]}
          faq={[
            {
              question: "What is this?",
              answer:
                "A native iOS and iPad companion app for self-hosted OpenCode servers. It lets you keep your AI coding sessions in your pocket — browse projects, resume chats, answer permission prompts, and track live progress from anywhere.",
            },
            {
              question: "So you can code from your phone?",
              answer:
                "Kind of! You're not writing code directly — you're steering the AI agent. Send messages, approve file edits, answer questions, all from the couch. It's like being a project manager for a very fast intern. Something that was cool is that I was talking to the app to build parts of the app itself.",
            },
            {
              question: "What's different about it?",
              answer:
                "It leans hard into deep iOS integration — Live Activities for session status on the lock screen, widgets for quick access to recent sessions, and actionable notifications for permissions and questions. The UX is very HIG-focused rather than trying to port a web app to mobile. Everything feels like it belongs on the platform.",
            },
            {
              question: "What did you learn from building it?",
              answer:
                "A lot more SwiftUI — got to play with Liquid Glass a good bit. But mostly I found and explored escape paths to plain old UIKit for performance, especially on high-churn surfaces like SSE-driven chat views. SwiftUI's diffing gets expensive when messages are streaming in at 60+ updates per second, so knowing when to drop down a layer made a big difference.",
            },
          ]}
          tags={[
            {
              tag: "SwiftUI",
              className: "bg-orange-100 text-orange-700",
              icon: <TbBrandSwift />,
            },
            {
              tag: "iOS & iPadOS",
              className: "bg-blue-100 text-blue-700",
              icon: <FaAppStoreIos />,
            },
          ]}
        />
        </FadeInUp>

        <FadeInUp>
        <FeaturedProjectCard
          title={"Vini"}
          vibeLevel={1}
          link={"https://github.com/ntoporcov/vini"}
          images={[
            "/vini-app-window.png",
            "/vini-menu.png",
            "/vini-pinned-group.png",
          ]}
          faq={[
            {
              question: "What is this?",
              answer:
                "A macOS menu bar app that acts as a command center for your local dev services — databases, servers, agents, background jobs. Think of it as the JetBrains Services panel, but for everything on your machine.",
            },
            {
              question: "Why not just use the terminal?",
              answer:
                "You absolutely can. But when you have Postgres, Redis, three dev servers, a background worker, and Nginx all running, it's nice to see them at a glance, start/stop with one click, and not have 8 terminal tabs open. Vini discovers services from Homebrew, launchd, and listening ports automatically.",
            },
            {
              question: "Full vibes?",
              answer:
                "Completely. This one was an experiment in how far you can take vibe coding with a well-scoped idea. Turns out, pretty far — especially for a menu bar app where the architecture is simple and the UI surface is small. OpenCode did most of the heavy lifting.",
            },
            {
              question: "Why 'Vini'?",
              answer:
                "This was started in 2026 right before the World Cup, so I could only think about soccer. The app runs stuff — and one of the most famous runners in the world is Vinícius Jr.",
            },
            {
              question: "What's the stack?",
              answer:
                "Pure SwiftUI + AppKit for the menu bar integration. No external dependencies. It shells out to brew, launchctl, and lsof under the hood to discover and manage services. Distributed via Homebrew cask, not the App Store.",
            },
          ]}
          tags={[
            {
              tag: "SwiftUI",
              className: "bg-orange-100 text-orange-700",
              icon: <TbBrandSwift />,
            },
            {
              tag: "macOS",
              className: "bg-gray-100 text-gray-700",
              icon: <TbDeviceDesktop />,
            },
            {
              tag: "Homebrew",
              className: "bg-amber-100 text-amber-700",
              icon: <SiHomebrew />,
            },
          ]}
        />
        </FadeInUp>

        <FadeInUp>
        <ProjectCard
          title={"iQbit"}
          link={"https://github.com/ntoporcov/iQbit"}
          vibeLevel={0.25}
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
              className: "bg-blue-100 text-blue-700",
              icon: <FaReact />,
            },
            {
              tag: "Open Source",
              className: "bg-gray-100 text-gray-700",
              icon: <FaGithub />,
            },
          ]}
        />
        </FadeInUp>

        <FadeInUp>
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
              className: "bg-blue-100 text-blue-700",
              icon: <FaReact />,
            },
            {
              tag: "NextJS",
              className: "bg-gray-100 text-gray-700",
              icon: <NextJSLogo className={"h-3 w-10"} />,
            },
            {
              tag: "TailwindCSS",
              className: "bg-cyan-100 text-cyan-700",
              icon: <SiTailwindcss />,
            },
          ]}
        />
        </FadeInUp>

        <FadeInUp>
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
              className: "bg-cyan-100 text-cyan-700",
              icon: <TbBrandReactNative />,
            },
            {
              tag: "Firebase",
              className: "bg-amber-100 text-amber-700",
              icon: <SiFirebase />,
            },
          ]}
        />
        </FadeInUp>

        <FadeInUp>
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
              className: "bg-orange-100 text-orange-700",
              icon: <TbBrandSwift />,
            },
            {
              tag: "VR / Vision Pro",
              className: "bg-indigo-100 text-indigo-700",
              icon: <TbDeviceVisionPro />,
            },
          ]}
        />
        </FadeInUp>

        <FadeInUp>
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
              className: "bg-blue-100 text-blue-700",
              icon: <FaReact />,
            },
          ]}
        />
        </FadeInUp>

        <FadeInUp>
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
              className: "bg-cyan-100 text-cyan-700",
              icon: <TbBrandReactNative />,
            },
          ]}
        />
        </FadeInUp>
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
  vibeLevel = 0,
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
  vibeLevel?: number;
}) => {
  return (
    <div
      className={cn(
        "relative flex w-full flex-col gap-2 rounded-lg bg-transparent pt-2 shadow-lg outline outline-1 outline-gray-300 md:flex-row md:gap-8 md:pt-4",
        className,
      )}
    >
      <div
        className={
          "flex min-w-full flex-grow items-end md:min-w-72 md:max-w-72 lg:min-w-96 lg:max-w-96"
        }
      >
        <Image
          src={image}
          width={500}
          height={0}
          alt={"project image"}
          className={
            "sticky bottom-0 mb-2 h-auto w-full border-b border-gray-300 object-cover object-bottom md:mb-0 md:w-auto md:border-0 md:object-right-bottom"
          }
        />
      </div>

      <div className={"flex flex-grow flex-col gap-2 md:pl-2"}>
        <div className={"flex items-center justify-between gap-4 pl-5 pr-4 md:pl-0"}>
          <h4 className={"pb-1 text-4xl font-bold"}>{title}</h4>
          <VibeMeter value={vibeLevel} />
        </div>
        <div className={"mb-5 flex flex-wrap gap-2 pl-5 pr-4 md:pl-0"}>
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
                  <h5
                    className={
                      "px-2 pl-5 text-left text-lg font-bold md:pl-2 md:text-xl"
                    }
                  >
                    {item.question}
                  </h5>
                </AccordionTrigger>
                <AccordionContent
                  className={"pl-5 pr-10 text-lg md:pl-2"}
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

const FeaturedProjectCard = ({
  title,
  images,
  faq = [],
  tags,
  link,
  vibeLevel = 0,
}: {
  title: string;
  images: string[];
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
  vibeLevel?: number;
}) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % images.length : null,
    );
  }, [images.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : null,
    );
  }, [images.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  return (
    <>
      <div className="relative flex w-full flex-col gap-4 rounded-lg bg-transparent p-4 shadow-lg outline outline-1 outline-gray-300 md:p-6">
        {/* Title + Vibe Meter row */}
        <div className="flex items-center justify-between gap-4">
          <h4 className="text-4xl font-bold">{title}</h4>
          <VibeMeter value={vibeLevel} />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag.tag}
              className={cn(
                "flex items-center gap-3 rounded-full p-4 py-2 text-sm",
                tag.className,
              )}
            >
              <span className="text-xl">{tag.icon}</span>
              <span>{tag.tag}</span>
            </span>
          ))}
        </div>

        {/* Screenshots row - horizontally scrollable */}
        <div className="-mx-4 md:-mx-6">
          <div className="flex gap-3 overflow-x-auto px-4 py-3 md:px-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {images.map((src, i) => (
              <motion.div
                key={i}
                layoutId={`${title}-screenshot-${i}`}
                className="flex-shrink-0 cursor-pointer"
                onClick={() => setLightboxIndex(i)}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src={src}
                  width={500}
                  height={0}
                  alt={`${title} screenshot ${i + 1}`}
                  className="h-[300px] w-auto rounded-xl shadow-md md:h-[400px]"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <Accordion type="single" collapsible>
          {faq?.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger className="pr-4">
                <h5 className="px-2 text-left text-lg font-bold md:text-xl">
                  {item.question}
                </h5>
              </AccordionTrigger>
              <AccordionContent className="pl-2 pr-10 text-lg" defaultChecked>
                <p>{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Link */}
        {link && (
          <a
            className="self-end pr-2"
            href={link}
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="outline">Check it out</Button>
          </a>
        )}
      </div>

      {/* Lightbox overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeLightbox}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Close button */}
            <button
              className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-2xl text-white transition-colors hover:bg-white/20"
              onClick={closeLightbox}
            >
              &times;
            </button>

            {/* Prev arrow */}
            {images.length > 1 && (
              <button
                className="absolute left-4 z-10 rounded-full bg-white/10 p-3 text-2xl text-white transition-colors hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
              >
                &#8249;
              </button>
            )}

            {/* Animated image */}
            <motion.div
              key={lightboxIndex}
              layoutId={`${title}-screenshot-${lightboxIndex}`}
              className="relative z-10"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[lightboxIndex]}
                width={800}
                height={0}
                alt={`${title} screenshot ${lightboxIndex + 1}`}
                className="max-h-[85vh] w-auto max-w-[90vw] rounded-2xl object-contain shadow-2xl"
              />
            </motion.div>

            {/* Next arrow */}
            {images.length > 1 && (
              <button
                className="absolute right-4 z-10 rounded-full bg-white/10 p-3 text-2xl text-white transition-colors hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
              >
                &#8250;
              </button>
            )}

            {/* Dot indicators */}
            <div className="absolute bottom-6 z-10 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  className={cn(
                    "h-2 w-2 rounded-full transition-all",
                    i === lightboxIndex
                      ? "scale-125 bg-white"
                      : "bg-white/40 hover:bg-white/70",
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(i);
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Projects;
