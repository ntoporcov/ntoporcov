import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  InputGroup,
  LightMode,
  Link,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
  useInterval,
} from "@chakra-ui/react";
import { getAllGuests, getGuestsByName, updateGuest } from "../utils/axios";
import Head from "next/head";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faQuestionCircle,
  faTimes,
} from "@fortawesome/pro-light-svg-icons";
import { faCheck } from "@fortawesome/pro-regular-svg-icons";

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

export type LunaProps = {};

const TitleFont = "Chewy";
const LabelFont = "Finger Paint";
const TextFont = "Mali";

const MainColor = "#d98fe3";

const Mountain = ({
  color,
  index,
  zIndex,
}: {
  color: string;
  index: number;
  zIndex: number;
}) => {
  const { width, height, offset } = useMemo(() => {
    return {
      height: getRandomArbitrary(60, 100),
      width: getRandomArbitrary(50, 80),
      offset: getRandomArbitrary(15, 50),
    };
  }, [index]);

  return (
    <Box
      bgColor={color}
      width={width + "%"}
      height={height + "%"}
      zIndex={zIndex}
      mx={-offset}
      roundedTop={9999}
      transition={"all ease-out .2s"}
    />
  );
};

const Mountains = ({ index }: { index: number }) => {
  return (
    <Flex
      position={"fixed"}
      bottom={0}
      justifyContent={"center"}
      alignItems={"flex-end"}
      width={"100%"}
      height={{ base: "40vh", lg: "50vh" }}
    >
      <Mountain color={"#ea9980"} index={index} zIndex={2} />
      <Mountain color={"#b67777"} index={index} zIndex={1} />
      <Mountain color={"#724f4f"} index={index} zIndex={3} />
      <Mountain color={"#f5d1e7"} index={index} zIndex={2} />
      <Mountain color={"#a6654b"} index={index} zIndex={3} />
      <Mountain color={"#c4a480"} index={index} zIndex={2} />
    </Flex>
  );
};

type guestGroup = {
  label: string;
  invited: string[];
  accepted: string[];
  denied: string[];
};

const emptyData = {
  accepted: [],
  denied: [],
  group: {
    label: "",
    invited: [],
    accepted: [],
    denied: [],
  },
};

const Luna = (props: LunaProps) => {
  const [inputVal, setInputVal] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState<{
    accepted: string[];
    denied: string[];
    group: guestGroup;
  }>(emptyData);
  const [allGuests, setAllGuests] = useState<{
    guests: guestGroup[];
    accepted: string[];
    denied: string[];
  }>({
    guests: [],
    accepted: [],
    denied: [],
  });

  const [illIndex, setIllIndex] = useState(0);

  const totalInvited = allGuests.guests.reduce(
    (prev, curr) => prev + curr.invited.length,
    0
  );

  const findGroup = async () => {
    try {
      const res = await getGuestsByName(inputVal);

      if (res.data.success) {
        setData(res.data);
      } else {
        setError("Could not find you 😢");
      }
    } catch (e) {
      setError("Could not find you :/");
    }
  };

  const getGuestData = async () => {
    try {
      const res = await getAllGuests();

      setAllGuests(res.data);
    } catch (e) {
      setError("shit");
    }
  };

  const handleSubmit = async () => {
    if (inputVal === "lunatoporcov") {
      await getGuestData();
    } else {
      await findGroup();
    }
    setIllIndex((curr) => curr + 1);
  };

  return (
    <LightMode>
      <Head>
        <link
          href={`https://fonts.googleapis.com/css2?family=${TitleFont}&display=swap`}
          rel="stylesheet"
        />
        <link
          href={`https://fonts.googleapis.com/css2?family=${LabelFont}&display=swap`}
          rel="stylesheet"
        />
        <link
          href={`https://fonts.googleapis.com/css2?family=${TextFont}&display=swap`}
          rel="stylesheet"
        />
      </Head>

      <Flex
        pt={10}
        px={3}
        bg={"beige"}
        flexDirection={"column"}
        minH={"100vh"}
        alignItems={"center"}
        color={"#252525"}
        fontFamily={TextFont}
      >
        <Heading
          fontFamily={TitleFont}
          color={"#b67777"}
          fontSize={"6xl"}
          textAlign={"center"}
        >
          {"Luna's 1st Rager"}
        </Heading>
        <FormControl
          maxW={300}
          mt={6}
          hidden={!!data.group.label || !!allGuests.guests.length}
          isInvalid={!!error}
          zIndex={100}
        >
          <form
            method={"post"}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormLabel fontFamily={LabelFont}>Enter First Name</FormLabel>
            <Input
              bgColor={"white"}
              shadow={"xl"}
              placeholder={"First name only"}
              _placeholder={{ color: "gray.400" }}
              value={inputVal}
              onChange={(ev) => setInputVal(ev.target.value)}
            />
            <FormErrorMessage textAlign={"center"}>{error}</FormErrorMessage>
            <Button
              fontFamily={LabelFont}
              w={"100%"}
              type={"submit"}
              colorScheme={"pink"}
              mt={5}
              onClick={handleSubmit}
              disabled={inputVal.length === 0}
            >
              Find Me
            </Button>
          </form>
        </FormControl>
        <Flex
          zIndex={100}
          hidden={!data.group.label}
          mt={5}
          mx={1}
          flexDirection={{ base: "column", lg: "row" }}
          mb={{ base: "50vh", lg: "30vh" }}
        >
          <Flex flexDirection={"column"} alignItems="center">
            <Flex alignItems={"center"} mb={3} justifyContent={"center"}>
              <Box
                h={10}
                w={10}
                role={"button"}
                _active={{ opacity: 0.3 }}
                mr={3}
                onClick={() => setData(emptyData)}
              >
                <FontAwesomeIcon icon={faArrowAltCircleLeft} size={"1x"} />
              </Box>
              <Heading fontFamily={LabelFont} textAlign={"center"}>
                {data.group.label}
              </Heading>
            </Flex>
            <Flex
              gridGap={3}
              flexWrap={"wrap"}
              justifyContent={"center"}
              mt={5}
            >
              {data.group.invited.map((name) => {
                const going = data.accepted?.includes(name);
                const notGoing = data.denied?.includes(name);

                return (
                  <Box
                    key={name}
                    bg={"white"}
                    p={4}
                    fontSize={"lg"}
                    display={"flex"}
                    alignItems={"center"}
                    flexDirection={"column"}
                    transform={`rotate(${getRandomArbitrary(-2, 2)}deg)`}
                    shadow={"md"}
                    _hover={{ shadow: "lg" }}
                    width={{ base: "100%", sm: "auto" }}
                    flexGrow={2}
                  >
                    <Text fontSize={24} mb={4} fontFamily={LabelFont}>
                      {name}
                    </Text>
                    <Flex flexWrap={"wrap"}>
                      <Button
                        colorScheme={"green"}
                        mx={1}
                        variant={going ? undefined : "outline"}
                        disabled={going}
                        onClick={() => {
                          setData((curr) => ({
                            ...curr,
                            accepted: [...curr.accepted, name],
                            denied: curr.accepted.filter(
                              (item) => item !== name
                            ),
                          }));
                          setIllIndex((curr) => curr + 1);
                          updateGuest(name, true, data.group.label).then(
                            (res) => setData(res.data)
                          );
                        }}
                      >
                        Going
                      </Button>
                      <Button
                        colorScheme={"red"}
                        mx={1}
                        variant={notGoing ? undefined : "outline"}
                        disabled={notGoing}
                        onClick={() => {
                          setData((curr) => ({
                            ...curr,
                            denied: [...curr.denied, name],
                            accepted: curr.accepted.filter(
                              (item) => item !== name
                            ),
                          }));
                          setIllIndex((curr) => curr + 1);
                          updateGuest(name, false, data.group.label).then(
                            (res) => setData(res.data)
                          );
                        }}
                      >
                        Not going
                      </Button>
                    </Flex>
                  </Box>
                );
              })}
            </Flex>
          </Flex>
          <Box
            minWidth={100}
            maxWidth={{ base: "100%", lg: 400, xl: 500 }}
            mt={10}
            pl={{ base: 0, lg: 10 }}
          >
            <Flex
              flexDirection={"column"}
              bgColor={"white"}
              p={5}
              alignItems={"center"}
              transform={`rotate(${getRandomArbitrary(-2, 2)}deg)`}
            >
              <Heading fontSize={20} fontFamily={LabelFont}>
                June 25, 2022 – 2 PM
              </Heading>
              <Text>Open Bar 2 PM - 6 PM</Text>
              <Flex justifyContent={"center"} flexWrap={"wrap"}>
                <Link
                  mx={2}
                  download="Luna's Birthday"
                  href={
                    "data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0AURL:https%3A%2F%2Fcalendar.agney.dev%2F%0ADTSTART:20220526T181408Z%0ADTEND:20220526T181408Z%0ASUMMARY:Luna's%201st%20Birthday%20%F0%9F%8E%89%0ALOCATION:100%20Beachwalk%20Club%20Dr%2C%20St%20Johns%2C%20FL%2032259%0AEND:VEVENT%0AEND:VCALENDAR%0A"
                  }
                >
                  <Button mt={3} width={"100%"}>
                    Add to iCal
                  </Button>
                </Link>
                <Link
                  mx={2}
                  href={
                    "https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20220526T181408Z%2F20220526T181408Z&details=&location=100%20Beachwalk%20Club%20Dr%2C%20St%20Johns%2C%20FL%2032259&text=Luna%27s%201st%20Birthday%20%F0%9F%8E%89&trp=false"
                  }
                >
                  <Button mt={3} width={"100%"}>
                    Add to Google Calendar
                  </Button>
                </Link>
              </Flex>
            </Flex>
            <Flex
              flexDirection={"column"}
              bgColor={"white"}
              shadow={"lg"}
              p={5}
              mt={5}
              textAlign={"center"}
              transform={`rotate(${getRandomArbitrary(-2, 2)}deg)`}
            >
              <Box rounded={10} overflow={"hidden"} mb={5}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={"blue lagoon with building"}
                  src={
                    "https://cdn-fjohc.nitrocdn.com/LLRzinFjacLmmsdeFxHWcRmOaXZwMWRV/assets/static/optimized/rev-cc38d79/wp-content/uploads/2020/05/private-event-club.jpg"
                  }
                />
              </Box>
              <Heading fontSize={"2xl"} fontFamily={LabelFont}>
                Beachwalk Clubhouse
              </Heading>
              <Text>100 Beachwalk Club Dr, St Johns, FL 32259</Text>
              <Link
                href={"https://goo.gl/maps/ishexvkcjNHr6vUU6"}
                target={"_blank"}
              >
                <Button mt={5}>Open on Google Maps</Button>
              </Link>
            </Flex>
          </Box>
        </Flex>
        <Flex
          bgColor={"white"}
          w={"80%"}
          p={10}
          shadow={"md"}
          flexDirection={"column"}
          mt={10}
          hidden={!allGuests.guests.length}
          zIndex={80}
          mb={"30vh"}
        >
          <Flex>
            <Flex flexDirection={"column"} flexGrow={1}>
              <Heading>{allGuests.accepted.length}</Heading>
              <Text>Accepted</Text>
            </Flex>
            <Flex flexDirection={"column"} flexGrow={1}>
              <Heading>{allGuests.denied.length - 1}</Heading>
              <Text>Denied</Text>
            </Flex>
            <Flex flexDirection={"column"} flexGrow={1}>
              <Heading>{totalInvited}</Heading>
              <Text>Total Invited</Text>
            </Flex>
            <Button
              onClick={() =>
                setAllGuests({ guests: [], accepted: [], denied: [] })
              }
            >
              Go Back
            </Button>
          </Flex>
          <Table mt={10}>
            <Thead fontFamily={LabelFont}>
              <Td>Name</Td>
              <Td>Choice</Td>
            </Thead>
            <Tbody>
              {allGuests.guests.map((group) =>
                group.invited.map((name) => {
                  const going = allGuests.accepted.includes(name);
                  const notGoing = allGuests.denied.includes(name);

                  return (
                    <Tr key={name}>
                      <Td>{name}</Td>
                      <Td width={8}>
                        {going ? (
                          <FontAwesomeIcon
                            icon={faCheck}
                            size={"xs"}
                            color={"green"}
                          />
                        ) : notGoing ? (
                          <FontAwesomeIcon
                            icon={faTimes}
                            size={"xs"}
                            color={"red"}
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faQuestionCircle}
                            size={"xs"}
                            color={"rgba(0,0,0,.2)"}
                          />
                        )}
                      </Td>
                    </Tr>
                  );
                })
              )}
            </Tbody>
          </Table>
        </Flex>
      </Flex>
      <Mountains index={illIndex} />
      <BottomLuna index={illIndex} />
    </LightMode>
  );
};

const LunaImages = [
  {
    path: "/luna1.png",
    width: 340,
    height: 350,
    glance: 200,
    looking: 110,
    hidden: 500,
  },
  {
    path: "/luna2.png",
    width: 300,
    height: 310,
    glance: 170,
    looking: 80,
    hidden: 500,
  },
  {
    path: "/luna3.png",
    width: 310,
    height: 330,
    glance: 175,
    looking: 60,
    hidden: 500,
  },
  {
    path: "/luna4.png",
    width: 290,
    height: 330,
    glance: 170,
    looking: 60,
    hidden: 500,
  },
];

const BottomLuna = ({ index }: { index: number }) => {
  const [lunaIndex, setLunaIndex] = useState(0);
  const currentImage = LunaImages[lunaIndex];

  const controls = useAnimation();
  const [xPos, setXPos] = useState(0);

  const animation = useMemo(
    () => ({
      y: [
        currentImage.hidden,
        currentImage.glance,
        currentImage.glance,
        currentImage.looking,
        currentImage.looking,
        currentImage.hidden,
      ],
    }),
    [currentImage.glance, currentImage.hidden, currentImage.looking]
  );

  useEffect(() => {
    controls.start(animation);
  }, [animation, controls]);

  return (
    <Flex width={"100%"} justifyContent={"center"}>
      <Box
        justifyContent={"center"}
        width={390}
        height={"auto"}
        zIndex={120}
        position={"fixed"}
        bottom={0}
        style={{
          transform: `translateX(${xPos}vw)translateY(500px)`,
        }}
      >
        <motion.div
          style={{ marginTop: -830 }}
          animate={controls}
          transition={{
            times: [0.3, 1, 1, 0.3, 1],
            duration: 10,
          }}
          onAnimationComplete={() => {
            const newX = getRandomArbitrary(-40, 40);
            setXPos(newX);
            setLunaIndex((curr) =>
              curr === LunaImages.length - 1 ? 0 : curr + 1
            );
            controls.start(animation);
          }}
        >
          <Image
            src={currentImage.path}
            width={currentImage.width}
            height={currentImage.height}
            layout={"fixed"}
          />
        </motion.div>
      </Box>
    </Flex>
  );
};

export default Luna;
