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

const gf = new GiphyFetch(process.env.NEXT_PUBLIC_GIPHY);
const patienceGifs = (offset: number) =>
  gf.search("Patience", { offset, limit: 10 });

// const ActionSection = ({ isSending, sendSuccess, doGifCall, onCancel }) => {
//   if (isSending) {
//     return <span>Sending your GIF 🚀</span>;
//   } else if (sendSuccess) {
//     return <span>Your GIF is on its way 😄</span>;
//   } else if (sendSuccess === false) {
//     return <span>Something went wrong 😔 I&apos;ll look at it soon.</span>;
//   } else {
//     return <button onClick={doGifCall}>Send Gif</button>;
//   }
// };

function GifExperience() {
  const { fetchGifs, searchKey } = useContext(SearchContext);

  const [gif, setGif] = useState<IGif | undefined>();

  const [gifSent, setGifSent] = useLocalStorage("gif-sent", -1);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const { mutate: submitGif, isLoading: isSending } = useMutation(
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
      <div className={"flex flex-col items-center justify-center"}>
        <h4>Nice One!</h4>
        <span className={"mb-5"}>
          Now I just need a name to show up on the notification
        </span>
        <div className={"flex flex-col gap-6 p-3 pt-4 md:flex-row"}>
          <Gif
            gif={gif}
            className={"h-auto w-full"}
            width={40}
            height={60}
            noLink
          />
          {/*<InputGroup display={"flex"} flexDirection={"column"}>*/}
          {/*  <Heading fontSize={14} mb={1}>*/}
          {/*    Enter Your Name{" "}*/}
          {/*    <Text as={"span"} color={"red.600"}>*/}
          {/*      **/}
          {/*    </Text>*/}
          {/*  </Heading>*/}
          {/*  <Input*/}
          {/*    placeholder={"Michael Scott"}*/}
          {/*    bg={"white"}*/}
          {/*    _placeholder={{ color: "gray.300" }}*/}
          {/*    value={name}*/}
          {/*    onChange={(event) => setName(event.target.value)}*/}
          {/*    disabled={sendSuccess !== null}*/}
          {/*  />*/}
          {/*  <Heading fontSize={14} mb={1} mt={3}>*/}
          {/*    Optional Message*/}
          {/*  </Heading>*/}
          {/*  <Textarea*/}
          {/*    placeholder={*/}
          {/*      "Sometimes I'll start a sentence, and I don't even know where it's going. I just hope I find it along the way. Like an improv conversation. An improversation."*/}
          {/*    }*/}
          {/*    bg={"white"}*/}
          {/*    _placeholder={{ color: "gray.300" }}*/}
          {/*    value={message}*/}
          {/*    onChange={(event) => setMessage(event.target.value)}*/}
          {/*    disabled={sendSuccess !== null}*/}
          {/*  />*/}
          {/*  <Center mt={4}>*/}
          {/*    <ActionSection*/}
          {/*      doGifCall={() => doGifCall()}*/}
          {/*      isSending={isSending}*/}
          {/*      sendSuccess={sendSuccess}*/}
          {/*      onCancel={() => setGifSelected(false)}*/}
          {/*    />*/}
          {/*  </Center>*/}
          {/*</InputGroup>*/}
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
        {/*<Carousel*/}
        {/*  fetchGifs={patienceGifs}*/}
        {/*  gifHeight={200}*/}
        {/*  onGifClick={() => window.alert("Patience")}*/}
        {/*  noLink*/}
        {/*/>*/}
      </>
    );
  } else {
    return (
      <>
        <SearchBar className={"w-96"} placeholder={"Be nice..."} />
        <Carousel
          fetchGifs={fetchGifs}
          gifHeight={200}
          key={searchKey}
          onGifClick={setGif}
          noLink
        />
      </>
    );
  }
}

function SendGifSection() {
  const [selectorOpen, setSelectorOpen] = useState(false);

  return (
    <div className={"flex flex-col items-center px-4"}>
      <h4 className={"mb-2 text-center text-6xl font-thin"}>Send me a GIF</h4>
      <span className={"text-center"}>
        Emails are boring. Send me a gif and I'll get back to you... eventually
      </span>
      <button
        className={"my-5 rounded-md bg-gray-200 p-1 px-4 hover:bg-gray-300"}
        onClick={() => setSelectorOpen(!selectorOpen)}
      >
        {selectorOpen ? "Close Gif Selector" : "Select GIF"}
      </button>
      <div
        className={cn(
          "flex h-0 w-full items-center justify-center overflow-hidden rounded-lg outline-1 outline-gray-200 transition-all",
          selectorOpen ? "h-[300px] overflow-x-auto outline" : "h-0",
        )}
      >
        <SearchContextManager apiKey={process.env.NEXT_PUBLIC_GIPHY}>
          <GifExperience />
        </SearchContextManager>
      </div>
      {selectorOpen && (
        <Image
          alt={"Giphy Attribution"}
          src={"/giphyAttribution.png"}
          className={"mt-4 h-auto self-end invert"}
          width={200}
          height={10}
        />
      )}
    </div>
  );
}

export default SendGifSection;
