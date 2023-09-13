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
} from "@chakra-ui/react";
import { DirectionalLight, DirectionalLightHelper } from "three";

const Blob = () => {
  const textColor = useColorModeValue("black", "white");
  const outlineWidth = useBreakpointValue({ base: "1px", md: "2px" });

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
        Hi there, I&apos;m Nic Toporcov
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
        Hi there, I&apos;m Nic Toporcov
      </Heading>
    </Flex>
  );
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
  const blobScale = useBreakpointValue({
    base: 0.5,
    sm: 0.6,
    md: 1,
    lg: 1.1,
    xl: 1.2,
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
        position={[0, 0.5, 0]}
        rotation={[1, 0.8, 0]}
        speed={3}
      >
        <Sphere position={[0, 0, 0]} args={[1, 64, 64]} castShadow={false}>
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
      <OrbitControls makeDefault enableZoom={false} />
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
