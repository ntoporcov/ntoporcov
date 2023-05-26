import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Badge,
  Box,
  Button,
  Card,
  Center,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  LightMode,
  Spinner,
  Table,
  Text,
  Tr,
  useBoolean,
  useClipboard,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/pro-regular-svg-icons";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  ValueAnimationTransition,
} from "framer-motion";
import { initializeApp } from "firebase/app";
import {
  query,
  doc,
  collection,
  collectionGroup,
  getFirestore,
  where,
  getDocs,
  or,
  getDoc,
  addDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { firestore } from "firebase-admin";
import DocumentReference = firestore.DocumentReference;
import firebase from "firebase/compat";
import DocumentData = firebase.firestore.DocumentData;

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

export type LunaProps = {};

const TitleFont = "Chewy";
const LabelFont = "Finger Paint";
const TextFont = "Mali";

const mainColor = "#055704";

const firebaseConfig = {
  apiKey: "AIzaSyDa1QPTUNNoXRTVZngwrgbuuq9pURE6x3A",
  authDomain: "ntoporcov.firebaseapp.com",
  databaseURL: "https://ntoporcov-default-rtdb.firebaseio.com",
  projectId: "ntoporcov",
  storageBucket: "ntoporcov.appspot.com",
  messagingSenderId: "1066928713662",
  appId: "1:1066928713662:web:3cfb9834e57d85ac0d53ef",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const peopleQuery = async (value: string) => {
  const docs = await getDocs(
    query(
      collectionGroup(db, "people"),
      or(where("name", "==", value), where("aliases", "array-contains", value))
    )
  );

  return docs.docs.map((x) => {
    return {
      name: x.data().name,
      groupPath: x.ref.parent.path,
      groupName: x.ref.parent.parent.id,
    };
  });
};

type InvitedPerson = {
  name: string;
  confirmed: boolean;
  path: string;
};

const groupQuery = async (groupPath: string) => {
  if (!groupPath) return [];
  const docs = await getDocs(collection(db, groupPath));
  return docs.docs.map((x) => ({
    ...x.data(),
    path: x.ref.path,
  })) as InvitedPerson[];
};

const getAllGroups = async (): Promise<
  { group: string; people: InvitedPerson[] }[]
> => {
  const docs = await getDocs(collection(db, "luna2"));

  const result: { group: string; people: InvitedPerson[] }[] = [];

  for (let i = 0; i < docs.docs.length; i++) {
    const list = await getDocs(
      collection(db, docs.docs[i].ref.path + "/people")
    );

    result.push({
      group: docs.docs[i].data().displayName,
      people: list.docs.map((x) => x.data()) as InvitedPerson[],
    });
  }

  return result;
};

const invitePerson = async ({
  fam,
  name,
  aliases,
}: {
  fam: string;
  name: string;
  aliases: string[];
}) => {
  const famDoc = await getDoc(doc(db, `luna2/${fam.toLowerCase()}`));

  if (!famDoc.exists()) {
    await setDoc(doc(db, "luna2", fam.toLowerCase()), {
      displayName: fam.toLowerCase(),
    });
  }

  await addDoc(collection(db, `luna2/${fam.toLowerCase()}/people`), {
    name: name.toLowerCase(),
    aliases: aliases.map((x) => x.toLowerCase()),
    confirmed: false,
  });
};

const confirmPerson = async ({
  path,
  value,
}: {
  path: string;
  value: boolean;
}) => {
  await updateDoc(doc(db, path), { confirmed: value });
};

const Luna = (props: LunaProps) => {
  const [inputVal, setInputVal] = useState("");
  const [error, setError] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);

  const [groupPath, setGroupPath] = useState("");
  const [groupName, setGroupName] = useState("");
  const {
    data: results,
    mutate,
    isLoading: groupsLoading,
  } = useMutation(["getGroup"], peopleQuery, {
    onSuccess: (data) => {
      if (data.length === 1) {
        setGroupPath(data[0].groupPath);
        setGroupName(data[0].groupName);
      }
    },
  });

  const { data: groupPeople, refetch: refetchGroupPeople } = useQuery(
    ["getPeople", groupPath],
    async () => groupQuery(groupPath)
  );

  const { data: allGroups, refetch: refetchAllGroups } = useQuery(
    ["getAllGroups", inputVal],
    getAllGroups,
    {
      enabled: inputVal === "invite",
    }
  );

  const [inviteName, setInviteName] = useState("");

  const [inviteGroup, setInviteGroup] = useState("");
  const [inviteAliases, setInviteAliases] = useState([]);

  const { mutate: addInvite, isLoading: addLoading } = useMutation(
    ["inviteSomeone"],
    invitePerson,
    {
      onSuccess: () => {
        setInviteName("");
        setInviteAliases([]);
        refetchAllGroups();
      },
    }
  );

  const invited = (allGroups || []).reduce((previousValue, currentValue) => {
    return previousValue + currentValue.people.length;
  }, 0);

  const confirmedAmount = (allGroups || []).reduce(
    (previousValue, currentValue) => {
      return (
        previousValue + currentValue.people.filter((x) => x.confirmed).length
      );
    },
    0
  );

  const handleSubmit = () => {
    mutate(inputVal);
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
      <Box maxW={"100dvw"} overflow={"hidden"} bg={"#c5f0ff"}>
        <Box
          bottom={0}
          position={"fixed"}
          height={"30vh"}
          width={"full"}
          backgroundImage={"url(/trees.png)"}
          backgroundPosition={"right bottom"}
          backgroundSize={"auto 100%"}
          backgroundRepeat={"repeat-x"}
        />
        <Flex
          pt={10}
          h={"100dvh"}
          w={"400dvw"}
          color={"#252525"}
          fontFamily={TextFont}
          transform={groupPath ? "translateX(-200dvw)" : "translateX(0)"}
          transition={"transform ease-in-out .3s"}
        >
          <VStack width={"100dvw"}>
            <Heading
              fontFamily={TitleFont}
              color={mainColor}
              fontSize={"6xl"}
              textAlign={"center"}
            >
              {"Luna's 2nd"}
            </Heading>
            <FormControl
              maxW={300}
              mt={6}
              // hidden={!!data.groupData.length || !!allGuests.guests.length}
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
                <FormLabel fontFamily={LabelFont}>
                  Your First Name or Nickname
                </FormLabel>
                <Input
                  bgColor={"white"}
                  shadow={"xl"}
                  placeholder={"i.e. Nicolas or Nic"}
                  _placeholder={{ color: "gray.400" }}
                  value={inputVal}
                  onChange={(ev) => setInputVal(ev.target.value)}
                />
                <FormErrorMessage textAlign={"center"}>
                  {error}
                </FormErrorMessage>
                <Button
                  fontFamily={LabelFont}
                  w={"100%"}
                  type={"submit"}
                  colorScheme={"green"}
                  mt={5}
                  isLoading={groupsLoading}
                >
                  Find Me
                </Button>
              </form>
            </FormControl>
            {inputVal === "invite" && (
              <VStack gap={10} pt={5}>
                <Card p={5}>
                  <HStack gap={5} flexWrap={"wrap"}>
                    <VStack>
                      <Text>Name</Text>
                      <Input
                        bgColor={"white"}
                        shadow={"xl"}
                        value={inviteName}
                        onChange={(ev) => setInviteName(ev.target.value)}
                      />
                    </VStack>
                    <VStack>
                      <Text>Group</Text>{" "}
                      <Input
                        bgColor={"white"}
                        shadow={"xl"}
                        value={inviteGroup}
                        onChange={(ev) => setInviteGroup(ev.target.value)}
                      />
                    </VStack>
                    <VStack>
                      <Text>Comma-Sep Aliases</Text>
                      <Input
                        bgColor={"white"}
                        shadow={"xl"}
                        value={inviteAliases.join(",")}
                        onChange={(ev) =>
                          setInviteAliases(
                            ev.target.value.split(",").map((x) => x.trim())
                          )
                        }
                      />
                    </VStack>
                    <Button
                      isLoading={addLoading}
                      onClick={() => {
                        addInvite({
                          name: inviteName,
                          fam: inviteGroup,
                          aliases: inviteAliases,
                        });
                      }}
                    >
                      Invite
                    </Button>
                  </HStack>
                </Card>
                <Card w={"full"} p={4}>
                  <HStack mb={5}>
                    <VStack alignItems={"flex-start"} gap={0}>
                      <Heading size={"sm"} mb={0}>
                        Invited
                      </Heading>
                      <Text mt={1} fontSize={"xl"}>
                        {invited}
                      </Text>
                    </VStack>
                    <VStack alignItems={"flex-start"} gap={0}>
                      <Heading size={"sm"} mb={0}>
                        Confirmed
                      </Heading>
                      <Text mt={1} fontSize={"xl"}>
                        {confirmedAmount}
                      </Text>
                    </VStack>
                  </HStack>
                  <VStack alignItems={"flex-start"} gap={4}>
                    {(allGroups || [])
                      .filter((x) =>
                        inviteGroup.length > 0
                          ? x.group
                              .toLowerCase()
                              .startsWith(inviteGroup.toLowerCase())
                          : true
                      )
                      .map((grp) => {
                        return (
                          <VStack
                            alignItems={"flex-start"}
                            key={grp.group}
                            w={"full"}
                          >
                            <Heading size={"md"} textTransform={"capitalize"}>
                              {grp.group}
                            </Heading>
                            <HStack flexWrap={"wrap"}>
                              {grp.people.map((x) => (
                                <Badge
                                  key={x.name}
                                  px={3}
                                  py={2}
                                  colorScheme={x.confirmed ? "green" : "gray"}
                                >
                                  {x.confirmed && "✅"} {x.name}
                                </Badge>
                              ))}
                            </HStack>
                            <Divider />
                          </VStack>
                        );
                      })}
                  </VStack>
                </Card>
              </VStack>
            )}
            <HStack flexWrap={"wrap"} pt={8}>
              {(results || [])?.length > 1 &&
                results.map((result) => {
                  return (
                    <Card key={result.name} p={2}>
                      <Text>{result.groupName}</Text>
                      <Heading size={"md"}>{result.name}</Heading>
                      <Divider my={3} />
                      <Button minW={52}>Select</Button>
                    </Card>
                  );
                })}
            </HStack>
          </VStack>
          <Box minWidth={"100vw"} />
          <VStack minWidth={"100vw"}>
            <HStack>
              <Box
                h={10}
                w={10}
                role={"button"}
                _active={{ opacity: 0.3 }}
                mr={3}
                onClick={() => setGroupPath("")}
              >
                <FontAwesomeIcon
                  icon={faArrowAltCircleLeft}
                  size={"1x"}
                  color={mainColor}
                />
              </Box>
              <Heading
                fontFamily={TitleFont}
                color={mainColor}
                fontSize={"6xl"}
                textAlign={"center"}
                textTransform={"capitalize"}
              >
                {groupName}
              </Heading>
            </HStack>
            <Text fontSize={"lg"} mb={2} textAlign={"center"}>
              Tap the butterflies to confirm who&apos;s <br /> coming from your
              group
            </Text>
            <HStack mb={4} flexWrap={"wrap"}>
              <Card p={3}>
                <Heading size={"sm"}>🗓 June 1st, 2023</Heading>
              </Card>
              <Card p={3}>
                <Heading size={"sm"}>
                  📍 55 Waterline Dr, St. Johns - FL
                </Heading>
              </Card>
            </HStack>
            <Flex
              ref={containerRef}
              // backgroundColor={"red.100"}
              h={"75%"}
              w={"75%"}
              position={"relative"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              {(groupPeople || []).map((person) => (
                <Butterfly
                  key={person.name}
                  confirmed={person.confirmed}
                  name={person.name}
                  path={person.path}
                  onConfirmed={refetchGroupPeople}
                  containerSize={{
                    width: containerRef.current?.getBoundingClientRect().width,
                    height:
                      containerRef.current?.getBoundingClientRect().height,
                  }}
                />
              ))}
            </Flex>
          </VStack>
        </Flex>
      </Box>
    </LightMode>
  );
};

const flyRandRange = 50;

const animationConfig: ValueAnimationTransition = {
  duration: 2,
  type: "tween",
};

const Butterfly = ({
  name,
  containerSize,
  confirmed,
  onConfirmed,
  path,
}: {
  name: string;
  confirmed: boolean;
  path: string;
  containerSize: { width: number; height: number };
  onConfirmed: () => void;
}) => {
  const maxX = containerSize.width / 2;
  const maxY = containerSize.height / 2;

  const y = useMotionValue(0);
  useMotionValueEvent(y, "animationComplete", () => {
    const currY = y.get();

    const maxRandY = currY + flyRandRange > maxY ? maxY - currY : flyRandRange;
    const minRandY =
      currY - flyRandRange < -maxY ? maxY + currY : -flyRandRange;

    const newOffset = getRandomArbitrary(minRandY, maxRandY);

    animate(y, currY + newOffset, animationConfig);
  });

  const x = useMotionValue(0);
  useMotionValueEvent(x, "animationComplete", () => {
    const currX = x.get();

    const maxRandY = currX + flyRandRange > maxX ? maxX - currX : flyRandRange;
    const minRandY =
      currX - flyRandRange < -maxX ? maxX + currX : -flyRandRange;

    const newOffset = getRandomArbitrary(minRandY, maxRandY);

    animate(x, currX + newOffset, animationConfig);
  });

  useEffect(() => {
    animate(y, 0);
    animate(x, 0);
    //   eslint-disable-next-line
  }, []);

  const hueRotate = useMemo(() => getRandomArbitrary(0, 360), []);

  const { mutate: confirmMutate, isLoading: isConfirming } = useMutation(
    ["confirmPerson"],
    confirmPerson,
    {
      onSuccess: onConfirmed,
    }
  );

  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      style={{ x, y, width: 160, height: 160, cursor: "pointer" }}
      onClick={() => {
        confirmMutate({
          path,
          value: !confirmed,
        });
      }}
    >
      <VStack position={"absolute"}>
        <Image
          alt={"butterfly image"}
          style={{
            filter: `hue-rotate(${hueRotate}deg)saturate(${
              confirmed ? 0.4 : 0
            })brightness(2)`,
          }}
          src={"/butterfly.gif"}
          width={200}
          height={200}
        />
        <Badge
          colorScheme={confirmed ? "green" : "gray"}
          py={2}
          px={4}
          rounded={"md"}
          shadow={"md"}
          transform={"translateY(-40px)"}
        >
          {isConfirming && <Spinner size={"xs"} />}
          {confirmed && !isConfirming && "✅"}
          {"  " + name}
        </Badge>
      </VStack>
    </motion.div>
  );
};

export default Luna;
