import { useContext, useEffect, useRef, useState } from "react";
import {
  MeshDistortMaterial,
  Sphere,
  Stage,
  OrbitControls,
  CubeCamera,
  RandomizedLight,
  GizmoViewport,
  GizmoViewcube,
  Grid,
  Float,
  GizmoHelper,
  Bounds,
  useHelper,
  Sparkles,
  Backdrop,
  MeshReflectorMaterial,
  MeshRefractionMaterial,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
  Box,
  Flex,
  Heading,
  useBreakpointValue,
  useColorModeValue,
  useInterval,
} from "@chakra-ui/react";
import { DirectionalLight, DirectionalLightHelper } from "three";
import { motion } from "framer-motion";

const Blob = () => {
  const textColor = useColorModeValue("black", "white");
  const outlineWidth = useBreakpointValue({ base: "1px", md: "2px" });

  const message = useMessageCounter();

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      h={"90vh"}
      w={"full"}
      pointerEvents={"none"}
      cursor={"grab"}
      _active={{ cursor: "grabbing" }}
    >
      <Canvas gl={{ logarithmicDepthBuffer: true }} shadows="soft">
        <Scene />
      </Canvas>

      <Heading
        px={5}
        mb={48}
        textAlign={"center"}
        position={"absolute"}
        fontSize={{ base: "7xl", md: "8xl" }}
        sx={{
          "&": {
            "-webkit-text-stroke": `${textColor} ${outlineWidth}`,
            "-webkit-text-fill-color": "transparent",
          },
        }}
        fontFamily={"sans-serif"}
      >
        {message}
      </Heading>
      <Heading
        px={5}
        textAlign={"center"}
        mb={48}
        position={"absolute"}
        fontSize={{ base: "7xl", md: "8xl" }}
        fontFamily={"sans-serif"}
        zIndex={-1}
        color={textColor}
      >
        {message}
      </Heading>
    </Flex>
  );
};

const message = "Hi there, I'm Nic Toporcov";

const useMessageCounter = () => {
  const [currMessage, setCurrMessage] = useState("");
  const [randomInterval, setRandomInterval] = useState(0);

  useInterval(
    () => {
      setCurrMessage(
        message
          .split("")
          .slice(0, currMessage.length + 1)
          .join("")
      );
      setRandomInterval(Math.random() * 200 + 50);
    },
    currMessage.length === message.length ? null : randomInterval
  );

  return currMessage;
};

const Scene = () => {
  const dirLight = useRef<DirectionalLight>(null);
  const dirLight2 = useRef<DirectionalLight>(null);
  const dirLight3 = useRef<DirectionalLight>(null);
  const dirLight4 = useRef<DirectionalLight>(null);

  // useHelper(dirLight, DirectionalLightHelper, 1, "red");
  // useHelper(dirLight2, DirectionalLightHelper, 1, "blue");
  // useHelper(dirLight3, DirectionalLightHelper, 1, "green");
  // useHelper(dirLight4, DirectionalLightHelper, 1, "pink");

  const blobColor = useColorModeValue("springgreen", "red");
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const blobScale = useBreakpointValue({
    base: 1,
    md: 1.4,
    lg: 1.8,
  });

  return (
    <>
      <directionalLight position={[-3, 10, 0]} intensity={0.9} ref={dirLight} />
      <directionalLight
        ref={dirLight2}
        position={[0, -2, 0]}
        intensity={0.3}
        args={[1, 1]}
        color={"red"}
      />
      <directionalLight
        ref={dirLight3}
        position={[5, 3, 0]}
        intensity={0.3}
        args={[1, 1]}
        color={"blue"}
      />
      <directionalLight
        ref={dirLight4}
        position={[0, 2, 10]}
        intensity={0.8}
        args={[1, 1]}
        color={"white"}
      />
      <ambientLight intensity={0.4} />
      <Float
        scale={blobScale}
        position={[0, 0, 0]}
        rotation={[1, 0.8, 0]}
        speed={3}
      >
        <Sphere position={[0, 0, 0]} args={[1, 512, 512]} castShadow={false}>
          <MeshDistortMaterial
            speed={1}
            reflectivity={5}
            color={blobColor}
            distort={1}
            metalness={1}
            emissive={blobColor}
            emissiveIntensity={0.3}
          />
        </Sphere>
      </Float>
      {isDesktop && <OrbitControls makeDefault enableZoom={false} />}
      {/*<GizmoViewport />*/}
      {/*<GizmoViewcube />*/}
      {/*<Grid*/}
      {/*  scale={10}*/}
      {/*  position={[0, -1, 0]}*/}
      {/*  cellColor="red"*/}
      {/*  sectionColor="green"*/}
      {/*/>*/}
      <GizmoHelper />
    </>
  );
};

export default Blob;
