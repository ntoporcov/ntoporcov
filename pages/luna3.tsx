import React, { FormEvent, useEffect, useRef, useState } from "react";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Head from "next/head";
import { Input } from "../components/form/Input";
import { Button } from "../components/form/Button";
import { cn } from "../hooks/tailwind";
import { useRouter } from "next/router";
import { BiLeftArrowCircle } from "react-icons/bi";
import { useBoolean, useCopyToClipboard } from "react-use";

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

const TitleFont = "Chewy";
const tileStyle = {
  fontFamily: "Chewy",
};
const LabelFont = "Finger Paint";
const labelStyle = {
  fontFamily: "Finger Paint",
};
const TextFont = "Mali";
const textStyle = {
  fontFamily: "Mali",
};

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

const peopleQuery = async (value: string, peopleCollectionKey: string) => {
  const docs = await getDocs(
    query(
      collectionGroup(db, peopleCollectionKey),
      or(
        where("name", "==", value.toLowerCase()),
        where("aliases", "array-contains", value.toLowerCase()),
      ),
    ),
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

const getAllGroups = async (
  colKey: string,
  peopleCollectionKey: string,
): Promise<{ group: string; people: InvitedPerson[] }[]> => {
  const docs = await getDocs(collection(db, colKey));

  const result: { group: string; people: InvitedPerson[] }[] = [];

  for (let i = 0; i < docs.docs.length; i++) {
    const list = await getDocs(
      collection(db, docs.docs[i].ref.path + "/" + peopleCollectionKey),
    );

    result.push({
      group: docs.docs[i].data().displayName,
      people: list.docs.map((x) => x.data()) as InvitedPerson[],
    });
  }

  return result;
};

const invitePerson = async ({
  colKey,
  peopleCollectionKey,
  fam,
  name,
  aliases,
}: {
  colKey: string;
  peopleCollectionKey?: string;
  fam: string;
  name: string;
  aliases: string[];
}) => {
  const famDoc = await getDoc(doc(db, `${colKey}/${fam.toLowerCase()}`));

  if (!famDoc.exists()) {
    await setDoc(doc(db, colKey, fam.toLowerCase()), {
      displayName: fam.toLowerCase(),
    });
  }

  await addDoc(
    collection(db, `${colKey}/${fam.toLowerCase()}/${peopleCollectionKey}`),
    {
      name: name.toLowerCase(),
      aliases: aliases.map((x) => x.toLowerCase()),
      confirmed: false,
    },
  );
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

export type LunaProps = {
  title?: string;
  date: string;
  searchPlaceholder?: string;
  peopleCollectionKey?: string;
};

export const Luna = (props: LunaProps) => {
  const [inputVal, setInputVal] = useState("");
  const [error, setError] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);

  const [groupPath, setGroupPath] = useState("");
  const [groupName, setGroupName] = useState("");
  const {
    data: results,
    mutate,
    isLoading: groupsLoading,
    reset,
  } = useMutation(
    ["getGroup"],
    (value: string) => peopleQuery(value, props.peopleCollectionKey),
    {
      onSuccess: (data) => {
        if (data.length === 1) {
          setGroupPath(data[0].groupPath);
          setGroupName(data[0].groupName);
        }
      },
    },
  );

  const { data: groupPeople, refetch: refetchGroupPeople } = useQuery(
    ["getPeople", groupPath],
    async () => groupQuery(groupPath),
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate(inputVal);
  };

  return (
    <div
      className={"flex min-h-[calc(100vh)] flex-col"}
      style={{
        background: "url(/luna/sand.png)",
        backgroundColor: "#f0e6d2",
        backgroundSize: "100% 100px",
        backgroundRepeat: "repeat-y",
        backgroundBlendMode: "multiply",
      }}
    >
      <Head>
        <title>{props.title}</title>
        <meta name="title" content={props.title} />
        <meta
          name="description"
          content="Come celebrate Luna's Birthday with us!"
        />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={props.title} />
        <meta
          property="og:description"
          content="Come celebrate Luna's Birthday with us!"
        />
        <meta property="og:image" content="/luna/preview.png" />

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

      <div
        className={"-mt-10 h-96 w-full pt-5 sm:h-72"}
        style={{
          background: "url(/luna/sky.png) no-repeat center bottom",
          backgroundSize: "cover",
          textShadow:
            "3px 3px 0 rgba(0, 0, 0, 1), -1px -1px 0px rgba(0, 0, 0, 1), 1px -1px 0 rgba(0, 0, 0, 1), -1px 1px 0 rgba(0, 0, 0, 1)",
          ...tileStyle,
        }}
      >
        <h1 className="mb-2 mt-10 text-center text-6xl text-white">
          {props.title}
        </h1>
        <span className={"block w-full text-center text-3xl text-white"}>
          {props.date}
        </span>
      </div>
      <div
        className="z-10 -mt-20 h-40 w-full sm:h-96"
        style={{
          background: "url(/luna/house.png) no-repeat center center",
          backgroundSize: "cover",
        }}
      />
      <div
        className={
          "container mx-auto flex min-h-60 max-w-screen-lg grow flex-col items-center px-10 pb-20"
        }
      >
        <h2 className={"text-2xl text-orange-800"} style={tileStyle}>
          First, let's find your group
        </h2>
        <form
          className="mt-5 flex w-full max-w-96 gap-2 pb-10"
          onSubmit={handleSubmit}
        >
          <Input
            className={"grow backdrop-blur"}
            style={{ fontFamily: TextFont }}
            placeholder={props.searchPlaceholder}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
          <Button variant={"luna"} type={"submit"} className={"w-32"}>
            <span className={groupsLoading ? "animate-spin" : ""}>
              {groupsLoading ? `☀️` : "Search"}
            </span>
          </Button>
        </form>
        {inputVal.toLowerCase() === "invite" && (
          <InviteContainer
            value={inputVal}
            peopleCollectionKey={props.peopleCollectionKey}
          />
        )}
        {(results || [])?.length > 1 && (
          <div className={"flex flex-wrap gap-5"}>
            {results.map((result) => {
              return (
                <div
                  className={"flex flex-col border bg-white/30 p-2"}
                  key={result.name}
                >
                  <span className={"text-xl capitalize"} style={textStyle}>
                    {result.name}
                  </span>
                  <span
                    className={"mb-2 capitalize opacity-50"}
                    style={textStyle}
                  >
                    {result.groupName}
                  </span>
                  <Button variant={"luna"} size={"sm"}>
                    Select
                  </Button>
                </div>
              );
            })}
          </div>
        )}
        {results?.length === 1 && (
          <ConfirmablePeopleContainer
            groupPeople={groupPeople}
            groupName={groupName}
            onBack={() => {
              setGroupPath(null);
              setGroupName(null);
              reset();
            }}
            date={props.date}
          />
        )}
      </div>
      <div
        className="sticky z-10 -mt-10 h-32 w-full"
        style={{
          background: "url(/luna/ocean.png) no-repeat center center",
          // backgroundSize: "contain",
        }}
      />
    </div>
  );
};

const addy = "2409 South Ponte Vedra Blvd, Ponte Vedra Beach - FL 32082";
const ConfirmablePeopleContainer = ({
  groupPeople,
  groupName,
  onBack,
  date,
}: {
  groupPeople: InvitedPerson[];
  groupName?: string;
  onBack: () => void;
  date?: string;
}) => {
  const [state, copy] = useCopyToClipboard();
  const [hasCopied, setHasCopied] = useBoolean(false);

  return (
    <div className={"flex flex-col items-center"}>
      <p
        className={
          "mb-3 flex w-full flex-col items-center rounded border bg-white/20 p-1 px-3 text-center backdrop-blur"
        }
        style={textStyle}
      >
        We rented a little AirBnb at the Beach for Luna's Birthday, and she
        would love to celebrate it with you there!
      </p>
      <div className={"flex w-full flex-wrap gap-3"}>
        <div
          className={
            "flex grow flex-col items-center rounded border bg-white/20 p-1 px-3 text-center backdrop-blur"
          }
          style={textStyle}
        >
          <h2
            className={"grow text-lg capitalize text-orange-600"}
            style={tileStyle}
          >
            Where
          </h2>
          <div className={"flex items-center gap-2"}>
            <a
              className={"text-orange-700 hover:underline"}
              target="_blank"
              href={`https://www.google.com/maps/place/2409+S+Ponte+Vedra+Blvd/@30.0593041,-81.3320452,20z/data=!4m7!3m6!1s0x88e43aad1df56281:0x6234f6fc45d83fc7!4b1!8m2!3d30.059303!4d-81.331682!16s%2Fg%2F11bw4j40rc?entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D`}
              rel="noreferrer"
            >
              📍 {addy}
            </a>
            <Button
              size={"sm"}
              variant={"luna"}
              onClick={() => {
                setHasCopied(true);
                copy(addy);

                setTimeout(() => {
                  setHasCopied(false);
                }, 2000);
              }}
              className="w-16"
            >
              {hasCopied ? "Copied!" : "Copy"}
            </Button>
          </div>
        </div>
        <div
          className={
            "flex grow flex-col items-center rounded border bg-white/20 p-1 px-3 backdrop-blur"
          }
          style={textStyle}
        >
          <h2
            className={"text-lg capitalize text-orange-600"}
            style={tileStyle}
          >
            When
          </h2>
          {date} – 1pm
        </div>
      </div>
      <div
        className={
          "mt-5 flex items-center justify-center gap-2 text-orange-700"
        }
      >
        <button onClick={onBack}>
          <BiLeftArrowCircle size={32} />
        </button>
        <h2 className={"text-4xl capitalize"} style={tileStyle}>
          {groupName}
        </h2>
      </div>
      <span style={textStyle} className={"text-center text-sm"}>
        Tap the umbrella to confirm who is going
      </span>
      <div className={"mt-4 flex flex-wrap justify-center"}>
        {(groupPeople || []).map((person) => (
          <Umbrella key={person.name} {...person} />
        ))}
      </div>
    </div>
  );
};

const Umbrella = ({ name, confirmed, path }: InvitedPerson) => {
  const queryClient = useQueryClient();

  const { mutate: confirmMutate, isLoading: isConfirming } = useMutation(
    ["confirmPerson"],
    confirmPerson,
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(["getPeople"], {
          exact: false,
        });
      },
    },
  );

  return (
    <button
      className={"group flex w-40 flex-col items-center gap-2 p-4"}
      onClick={() =>
        confirmMutate({
          path,
          value: !confirmed,
        })
      }
    >
      <span
        className={cn(
          "relative inline -rotate-3 border-2 border-amber-500 bg-white p-1 px-4 text-xl capitalize shadow-lg transition-all group-hover:rotate-2 group-active:scale-95",
          confirmed && "border-green-300 bg-green-200",
        )}
        style={textStyle}
      >
        {name}
        {isConfirming && (
          <span
            className={"absolute -right-3 -top-3 animate-spin text-amber-500"}
          >
            ☀️
          </span>
        )}
        {!isConfirming && confirmed && (
          <span className={"absolute -right-3 -top-3 text-green-500"}>✅</span>
        )}
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={confirmed ? "/luna/confirmed.png" : "/luna/not-confirmed.png"}
        alt={"Not Confirmed Umbrella"}
        className={"h-auto w-full group-active:scale-95"}
      />
    </button>
  );
};

const InviteContainer = ({
  value: inputVal,
  peopleCollectionKey,
}: {
  value: string;
  peopleCollectionKey: string;
}) => {
  const router = useRouter();
  const colKey = router.pathname.split("/").pop();
  const { data: allGroups, refetch: refetchAllGroups } = useQuery(
    ["getAllGroups", inputVal],
    () => getAllGroups(colKey, peopleCollectionKey),
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
    0,
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
    },
  );

  return (
    <div
      className={
        "mb-5 flex flex-col gap-4 rounded border bg-white/40 p-2 backdrop-blur"
      }
    >
      <div className={"p-2"}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addInvite({
              colKey,
              peopleCollectionKey,
              name: inviteName,
              fam: inviteGroup,
              aliases: inviteAliases,
            });
          }}
          className={"flex flex-wrap gap-2"}
        >
          <Input
            placeholder={"Name"}
            value={inviteName}
            onChange={(ev) => setInviteName(ev.target.value)}
          />
          <Input
            placeholder={"Group"}
            value={inviteGroup}
            onChange={(ev) => setInviteGroup(ev.target.value)}
          />
          <Input
            placeholder={"Aliases (comma separated)"}
            value={inviteAliases.join(",")}
            onChange={(ev) =>
              setInviteAliases(ev.target.value.split(",").map((x) => x.trim()))
            }
          />
          <Button variant={"luna"} className={"w-full"}>
            Invite
          </Button>
        </form>
      </div>
      <div className={"w-full p-4"}>
        <div className={"mb-5 flex gap-4"}>
          <div>
            <strong>Invited</strong>
            <p className={"text-lg"}>{invited}</p>
          </div>
          <div>
            <strong>Confirmed</strong>
            <p className={"text-lg"}>{confirmedAmount}</p>
          </div>
        </div>
        <div className={"space-y-4 divide-y divide-gray-600 capitalize"}>
          {(allGroups || [])
            .filter((x) =>
              inviteGroup.length > 0
                ? x.group.toLowerCase().startsWith(inviteGroup.toLowerCase())
                : true,
            )
            .map((grp) => {
              return (
                <div
                  className={"flex w-full flex-col items-start gap-4 py-2"}
                  key={grp.group}
                >
                  <strong>{grp.group}</strong>
                  <div className={"flex flex-wrap gap-1"}>
                    {grp.people.map((x) => (
                      <span
                        className={cn(
                          "flex items-center rounded-full px-3 py-1 text-sm font-bold leading-none",
                          x.confirmed ? "bg-green-200" : "bg-gray-200",
                        )}
                        key={x.name}
                      >
                        {x.confirmed && "✅"} {x.name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default function Luna3() {
  return (
    <Luna
      date={"June 28, 2025"}
      title={"Luna's Birthday"}
      searchPlaceholder={"Search for family or person name..."}
      peopleCollectionKey={"people"}
    />
  );
}
