import { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useLoader } from "@react-three/fiber";
import { useQuery } from "@tanstack/react-query";
import {
  FaDribbble,
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaSpotify,
} from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";

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
    }
  );

  return (
    <div className={"flex gap-2 items-center"}>
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

function SocialLinks() {
  return (
    <div
      className={
        "flex text-sm px-3 py-2 justify-between w-full fixed top-0 items-center border-b border-gray-600 z-50 backdrop-blur-xl bg-white/50"
      }
    >
      <SpotifyWidget />

      <div className={"flex gap-2 items-center"}>
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
  );
}

export default SocialLinks;
