import { useContext, useEffect, useState } from "react";
import {
  Carousel,
  Gif,
  SearchBar,
  SearchContext,
  SearchContextManager,
} from "@giphy/react-components";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { sendGif } from "../../utils/axios";
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  Heading,
  Input,
  InputGroup,
  LightMode,
  Spinner,
  Tag,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";

function SearchExperience() {
  const { fetchGifs, searchKey } = useContext(SearchContext);

  const gf = new GiphyFetch(process.env.NEXT_PUBLIC_GIPHY);
  const patienceGifs = (offset) => gf.search("Patience", { offset, limit: 10 });

  const [gifSelected, setGifSelected] = useState(false);
  const [gif, setGif] = useState();
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(null);
  const [sendGifAvailable, setSendGifAvailable] = useState(true);

  const [gifSent, setGifSent] = useLocalStorage("gif-sent", false);

  const updateGif = (gif) => {
    setGif(gif);
    setGifSelected(true);
  };

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const doGifCall = async () => {
    setIsSending(true);

    try {
      await sendGif(gif, name, message);
      setSendSuccess(true);
    } catch (e) {
      setSendSuccess(false);
    }

    setGifSent(Date.now());
    setIsSending(false);
  };

  useEffect(() => {
    if (Date.now() - gifSent < 900000) {
      setSendGifAvailable(false);
    }
  }, []);

  const ActionSection = ({ isSending, sendSuccess, doGifCall, onCancel }) => {
    if (isSending) {
      return <Spinner color={"blue.500"} />;
    } else if (sendSuccess) {
      return <Text>Your GIF is on its way 😄</Text>;
    } else if (sendSuccess === false) {
      return <Text>Something went wrong 😔 I&apos;ll look at it soon.</Text>;
    } else {
      return (
        <ButtonGroup width={"100%"}>
          <Button
            onClick={() => onCancel()}
            variant={"ghost"}
            _hover={{ bg: "rgba(255,255,255,.3)" }}
            width={"50%"}
          >
            Cancel
          </Button>
          <Button
            disabled={name.length === 0}
            onClick={doGifCall}
            width={"50%"}
          >
            Send Gif
          </Button>
        </ButtonGroup>
      );
    }
  };

  if (gifSelected) {
    return (
      <Center color={"blackAlpha.900"} pb={10}>
        <VStack>
          <Heading textAlign={"center"} fontSize={22} color={"blackAlpha.900"}>
            Nice One!
          </Heading>
          <Text mb={6}>
            Now I just need a name to show up on the notification
          </Text>
          <Flex pt={4} direction={{ base: "column", md: "row" }} p={10}>
            <Box mr={6} mb={4} width={{ base: "100%", md: "unset" }}>
              <Gif gif={gif} width={"100%"} height={"auto"} noLink />
            </Box>
            <InputGroup display={"flex"} flexDirection={"column"}>
              <Heading fontSize={14} mb={1}>
                Enter Your Name{" "}
                <Text as={"span"} color={"red.600"}>
                  *
                </Text>
              </Heading>
              <Input
                placeholder={"Michael Scott"}
                bg={"white"}
                _placeholder={{ color: "gray.300" }}
                value={name}
                onChange={(event) => setName(event.target.value)}
                disabled={sendSuccess !== null}
              />
              <Heading fontSize={14} mb={1} mt={3}>
                Optional Message
              </Heading>
              <Textarea
                placeholder={
                  "Sometimes I'll start a sentence, and I don't even know where it's going. I just hope I find it along the way. Like an improv conversation. An improversation."
                }
                bg={"white"}
                _placeholder={{ color: "gray.300" }}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                disabled={sendSuccess !== null}
              />
              <Center mt={4}>
                <ActionSection
                  doGifCall={() => doGifCall()}
                  isSending={isSending}
                  sendSuccess={sendSuccess}
                  onCancel={() => setGifSelected(false)}
                />
              </Center>
            </InputGroup>
          </Flex>
        </VStack>
      </Center>
    );
  } else if (!sendGifAvailable) {
    return (
      <>
        <VStack color={"blackAlpha.900"}>
          <Heading textAlign={"center"} fontSize={22}>
            Only one gif per person every 15 minutes
          </Heading>
          <Text pb={6}>
            Btw, these are the results for <Tag> Patience </Tag>
          </Text>
        </VStack>
        <Carousel
          fetchGifs={patienceGifs}
          gifHeight={200}
          onGifClick={() => window.alert("Patience")}
          noLink
        />
      </>
    );
  } else {
    return (
      <>
        <Heading
          textAlign={"center"}
          fontSize={20}
          mb={2}
          color={"blackAlpha.900"}
        >
          Search for the perfect gif
        </Heading>
        <Flex pb={10} justify={"center"}>
          <Box w={{ base: "85%", md: "50%" }}>
            <SearchBar />
          </Box>
        </Flex>
        <Flex justifyContent={"flex-end"} mb={3}>
          <Image src={"/giphyAttribution.png"} width={200} height={22} />
        </Flex>
        <Carousel
          fetchGifs={fetchGifs}
          gifHeight={200}
          key={searchKey}
          onGifClick={updateGif}
          noLink
        />
      </>
    );
  }
}

function SendGifSection() {
  const [selectorOpen, setSelectorOpen] = useState(false);

  return (
    <>
      <Heading>Send me a gif</Heading>
      <Text maxW={{ base: "80%", md: "50%" }} textAlign={"center"}>
        Hit the button below to select and send a push notification with a gif
        of your choice to my phone
      </Text>
      <Button mt={3} onClick={() => setSelectorOpen(!selectorOpen)}>
        {selectorOpen ? "Close Gif Selector" : "Select GIF"}
      </Button>
      <Box
        w={"100vw"}
        pt={selectorOpen ? 35 : 0}
        bg={"gray.400"}
        my={selectorOpen ? 30 : 0}
        shadow={"inset 0 0 20px 10px rgba(0,0,0,.36)"}
        overflow={"hidden"}
        transition={"all ease-in-out .6s"}
        maxHeight={selectorOpen ? 10000 : 0}
      >
        <LightMode>
          <SearchContextManager apiKey={process.env.NEXT_PUBLIC_GIPHY}>
            <SearchExperience />
          </SearchContextManager>
        </LightMode>
      </Box>
    </>
  );
}

export default SendGifSection;
