import { ReactElement, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaSpotify,
} from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";
import { useWindowSize } from "react-use";
import { cn } from "../../hooks/tailwind";
import GroundReflection from "../display/GroundReflection";

function SocialLink({
  link,
  icon,
  color,
}: {
  link: string;
  icon: ReactElement;
  color: string;
}) {
  return (
    <Link
      href={link}
      passHref
      target={"_blank"}
      className={"flex items-center justify-center"}
    >
      <button
        className={"text-lg"}
        style={{
          color,
        }}
      >
        {icon}
      </button>
    </Link>
  );
}

type SpotifyResponse = {
  playing: boolean;
  track: {
    artists: {
      external_urls: {
        spotify: string;
      };
      name: string;
    }[];
  };
};

function SpotifyWidget() {
  const { data: spotifyData, isLoading } = useQuery(
    ["spotify", "lastPlayed"],
    async () => {
      const res = await axios.get<SpotifyResponse>("/api/spotify/lastPlayed");

      return res.data;
    },
    {
      placeholderData: {
        playing: false,
        track: {
          artists: [
            {
              external_urls: {
                spotify:
                  "https://open.spotify.com/artist/6l3HvQ5sa6mXTsMTB19rO5",
              },
              name: "J. Cole",
            },
          ],
        },
      },
    },
  );

  return (
    <div className={"flex items-center gap-2"}>
      <FaSpotify color={"#1db954"} />
      {!isLoading && (
        <>
          {spotifyData.playing ? "Now Listening" : "Last played:"}
          {spotifyData.playing && (
            <div className={"w-4 pt-1"}>
              <FaPlay color={"#1db954"} />
            </div>
          )}
          <span className={"text-sm text-[#1db954] hover:underline"}>
            <Link
              passHref
              href={spotifyData.track.artists[0].external_urls.spotify || ""}
              target={"_blank"}
            >
              {spotifyData.track.artists[0].name}
            </Link>
          </span>
        </>
      )}
    </div>
  );
}

const sectionIds = [
  "about",
  "skills",
  "contact",
  "fun",
  "experience",
  "projects",
];

const calculatePosition = () => {
  const sections = document.querySelectorAll("section");

  const sectionPositions = Array.from(sections).map((section) => {
    return {
      id: section.id,
      top: section.getBoundingClientRect().top,
    };
  });

  const closest = sectionPositions.reduce((prev, curr) => {
    return Math.abs(curr.top) < Math.abs(prev.top) ? curr : prev;
  });

  return closest.id;
};

function SocialLinks() {
  const refs = useRef<Record<string, HTMLSpanElement>>({});

  const windowSize = useWindowSize();
  const [closestId, setClosestId] = useState<string>();

  const styles = useMemo(() => {
    const padding = 10;

    switch (closestId) {
      case "about":
        return {
          indicator: {
            style: {
              left: refs.current?.about?.offsetLeft - padding / 2,
              width: refs.current?.about?.offsetWidth + padding,
            },
            className: "shadow-blue-300 shadow-2xl",
          },
        };
      case "skills":
        return {
          indicator: {
            style: {
              left: refs.current?.skills?.offsetLeft - padding / 2,
              width: refs.current?.skills?.offsetWidth + padding,
            },
          },
        };
      case "contact":
        return {
          indicator: {
            style: {
              left: refs.current?.contact?.offsetLeft - padding / 2,
              width: refs.current?.contact?.offsetWidth + padding,
            },
          },
        };
      case "fun":
        return {
          indicator: {
            style: {
              left: refs.current?.fun?.offsetLeft - padding / 2,
              width: refs.current?.fun?.offsetWidth + padding,
            },
            className: "bg-rainbow",
          },
          button: {
            className: "bg-rainbow text-transparent bg-clip:text font-black",
            style: {
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            },
          },
        };
      case "experience":
        return {
          indicator: {
            style: {
              left: refs.current?.experience?.offsetLeft - padding / 2,
              width: refs.current?.experience?.offsetWidth + padding,
            },
          },
        };
      case "projects":
        return {
          indicator: {
            style: {
              left: refs.current?.projects?.offsetLeft - padding / 2,
              width: refs.current?.projects?.offsetWidth + padding,
            },
          },
        };
    }
    return {};
    //   eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closestId, windowSize]);

  useEffect(() => {
    const onScroll = () => {
      setClosestId(calculatePosition());
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className={"fixed top-0 z-50 w-full bg-white/50 backdrop-blur-xl"}>
      <div
        className={
          "flex w-full items-center justify-between border-b border-gray-100 px-3 py-2 text-sm"
        }
      >
        <SpotifyWidget />

        <div className={"flex items-center gap-2"}>
          <SocialLink
            link={"https://github.com/ntoporcov"}
            icon={<FaGithub />}
            color={"var(--text)"}
          />
          <SocialLink
            link={"https://instagram.com/ntoporcov"}
            icon={<FaInstagram />}
            color={"#c13584"}
          />
          <SocialLink
            link={"https://www.linkedin.com/in/ntoporcov/"}
            icon={<FaLinkedin />}
            color={"#0077b5"}
          />
          <SocialLink
            link={"mailto:ntoporcov@me.com"}
            icon={<FaEnvelope />}
            color={"#e0542c"}
          />
        </div>
      </div>
      <div
        className={
          "hidden w-full items-center justify-center gap-20 border-b border-gray-300 bg-background/20 pb-2 pt-1 uppercase transition-all hover:py-3 lg:flex"
        }
      >
        {sectionIds.map((text) => (
          <button
            key={text}
            ref={(element) => {
              refs.current[text] = element;
              if (
                Object.values(refs.current).length === sectionIds.length &&
                !closestId
              ) {
                setClosestId("about");
              }
            }}
            className={cn(
              "group relative rounded px-2 py-1 text-sm font-medium uppercase tracking-wide transition-[padding]",
              closestId === text && "text-blue-500",
              closestId === text && styles.button?.className,
              text === "fun" ? "hover:bg-rainbow" : "hover:bg-blue-200/50",
            )}
            style={closestId === text ? styles.button?.style : undefined}
            onClick={() => {
              document.getElementById(text)?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            <span>{text}</span>
          </button>
        ))}
        <span
          className={cn(
            "absolute bottom-0 h-0.5 rounded-full bg-blue-500 transition-[left,width] duration-300",
            styles.indicator?.className,
          )}
          style={styles.indicator?.style}
        >
          <GroundReflection
            className={cn(
              "top-8 z-10 h-6",
              closestId === "fun" ? "bg-rainbow" : "bg-blue-400",
            )}
          />
        </span>
      </div>
    </div>
  );
}

export default SocialLinks;
