import { useState } from "react";
import { MeshDistortMaterial, Sphere, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useInterval } from "react-use";
import { cn } from "../../hooks/tailwind";

const Blob = () => {
  const message = useMessageCounter();

  const textClassName =
    "text-6xl md:text-8xl font-black absolute text-center px-10";

  return (
    <div
      className={
        "pointer-events-none flex h-screen w-full items-center justify-center"
      }
    >
      <Canvas gl={{ logarithmicDepthBuffer: true }} shadows="soft">
        <Scene />
      </Canvas>

      <span
        className={textClassName}
        style={{
          WebkitTextStroke: "rgb(var(--gray-950)) 2px",
          WebkitTextFillColor: "transparent",
          fontFamily: "sans-serif",
        }}
      >
        {message}
      </span>
      <span
        className={cn(textClassName, "-z-10")}
        style={{
          fontFamily: "sans-serif",
        }}
      >
        {message}
      </span>
    </div>
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
          .join(""),
      );
      setRandomInterval(Math.random() * 200 + 50);
    },
    currMessage.length === message.length ? null : randomInterval,
  );

  return currMessage;
};

const Scene = () => {
  const blobColor = "darkcyan";

  return (
    <Stage
      adjustCamera={false}
      shadows={{
        offset: -7,
        type: "contact",
      }}
    >
      <Sphere
        scale={3}
        position={[0, 0, 0]}
        args={[1, 512, 512]}
        castShadow={false}
      >
        <MeshDistortMaterial
          reflectivity={1}
          color={blobColor}
          distort={1}
          metalness={1.2}
          emissive={"pink"}
          emissiveIntensity={0.01}
        />
      </Sphere>
    </Stage>
  );
};

export default Blob;
