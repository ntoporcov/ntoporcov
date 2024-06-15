import { useContext, useMemo, useState } from "react";
import {
  Carousel,
  Gif,
  SearchBar,
  SearchContext,
  SearchContextManager,
} from "@giphy/react-components";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { sendGif } from "../../utils/axios";
import Image from "next/image";
import { useLocalStorage } from "react-use";
import { IGif } from "@giphy/js-types";
import { useMutation } from "@tanstack/react-query";
import { cn } from "../../hooks/tailwind";
import { Input } from "../form/Input";
import { Textarea } from "../form/Textarea";
import { Button } from "../form/Button";
import GroundReflection from "../display/GroundReflection";

const gf = new GiphyFetch(process.env.NEXT_PUBLIC_GIPHY);
const patienceGifs = (offset: number) =>
  gf.search("Patience", { offset, limit: 10 });

const ActionSection = ({
  isSending,
  sendSuccess,
  doGifCall,
  onCancel,
  sendError,
}: {
  isSending: boolean;
  sendSuccess: boolean | null;
  sendError: boolean | null;
  doGifCall: () => void;
  onCancel: () => void;
}) => {
  if (isSending) {
    return <span>Sending your GIF 🚀</span>;
  } else if (sendSuccess) {
    return <span>Your GIF is on its way 😄</span>;
  } else if (sendError) {
    return <span>Something went wrong 😔 I&apos;ll look at it soon.</span>;
  } else {
    return (
      <div className={"flex flex-col-reverse gap-3 md:flex-row md:gap-1"}>
        <Button variant={"cancel"} onClick={onCancel} size={"lg"}>
          Cancel
        </Button>
        <Button
          variant={"outline"}
          className={"flex-grow"}
          onClick={doGifCall}
          size={"lg"}
        >
          Send Gif
        </Button>
      </div>
    );
  }
};

function GifExperience() {
  const { fetchGifs, searchKey } = useContext(SearchContext);

  const [gif, setGif] = useState<IGif | undefined>();

  const [gifSent, setGifSent] = useLocalStorage("gif-sent", -1);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const {
    mutate: submitGif,
    isLoading: isSending,
    isSuccess: sent,
    isError: sendError,
  } = useMutation(
    ["sendGif", gif, name, message],
    () => sendGif(gif, name, message),
    {
      onSuccess: () => {
        setGifSent(Date.now());
      },
    },
  );

  const gifAvailable = useMemo(() => {
    if (gifSent === -1) return true;

    return Date.now() - gifSent < 900000;
  }, [gifSent]);

  if (gif) {
    return (
      <div className={"flex w-full flex-col items-center justify-center"}>
        <span className={"mb-5 text-center font-medium text-gray-700"}>
          You can identify yourself with a name and a message. Both optional...
          🤷‍♂️
        </span>
        <div
          className={
            "flex w-full flex-col items-center justify-center gap-6 md:flex-row md:items-start"
          }
        >
          <Gif gif={gif} width={300} noLink hideAttribution />
          <div className={"flex w-full max-w-96 flex-col gap-2"}>
            <Input
              placeholder={"Michael Scott"}
              value={name}
              onChange={(event) => setName(event.target.value)}
              disabled={isSending}
            />
            <Textarea
              placeholder={
                "Sometimes I'll start a sentence, and I don't even know where it's going. I just hope I find it along the way. Like an improv conversation. An improversation."
              }
              rows={7}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              disabled={isSending}
            />
            <ActionSection
              doGifCall={submitGif}
              isSending={isSending}
              sendSuccess={sent}
              onCancel={() => setGif(undefined)}
              sendError={sendError}
            />
          </div>
        </div>
      </div>
    );
  } else if (!gifAvailable) {
    return (
      <>
        <div className={"flex flex-col"}>
          <h4 className={"text-center text-sm"}>
            Only one gif per person every 15 minutes
          </h4>
          <span className={"pb-6"}>
            Btw, these are the results for{" "}
            <span className={"font-bold underline"}> Patience </span>
          </span>
        </div>
        <Carousel
          fetchGifs={patienceGifs}
          gifHeight={200}
          onGifClick={() => window.alert("Patience")}
          noLink
          hideAttribution
        />
      </>
    );
  } else {
    return (
      <div className={"flex flex-col items-center justify-center gap-10"}>
        <div className={"relative mx-auto w-10/12"}>
          <SearchBar
            className={"mx-auto w-full max-w-80"}
            placeholder={"Be nice..."}
          />
        </div>
        <div className={"w-[140vw] overflow-x-auto"}>
          <Carousel
            className={"pl-[260px]"}
            fetchGifs={fetchGifs}
            gifHeight={200}
            key={searchKey}
            onGifClick={setGif}
            noLink
            hideAttribution
          />
        </div>
      </div>
    );
  }
}

function SendGifSection() {
  const [selectorOpen, setSelectorOpen] = useState(false);

  return (
    <div className={"mb-[30vh] flex flex-col items-center px-4"}>
      <h4 className={"mb-2 text-center text-6xl font-thin"}>Send me a GIF</h4>
      <span className={"text-center text-xl md:text-base"}>
        Emails are boring. Let's do this instead.
      </span>
      <div className={"group relative"}>
        <Button
          variant={"default"}
          onClick={() => setSelectorOpen(!selectorOpen)}
          className={"my-4"}
          size={"lg"}
        >
          {selectorOpen ? "Close Gif Selector" : "Select GIF"}
        </Button>
        <GroundReflection
          className={"bg-blue-200/40 duration-200 group-hover:bg-blue-400/50"}
        />
      </div>
      <SearchContextManager apiKey={process.env.NEXT_PUBLIC_GIPHY}>
        <div
          className={cn(
            "flex h-0 w-[calc(100vw-50px)] items-center justify-center overflow-hidden rounded-lg outline-1 outline-gray-200 transition-all",
            selectorOpen ? "h-auto p-10 outline" : "h-0",
          )}
        >
          <GifExperience />
        </div>
      </SearchContextManager>
      {selectorOpen && (
        <Image
          alt={"Giphy Attribution"}
          src={"/giphyAttribution.png"}
          className={"mt-4 self-end invert"}
          width={150}
          height={10}
        />
      )}
    </div>
  );
}

export default SendGifSection;
