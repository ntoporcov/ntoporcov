import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { DirectionalLight } from "three";
import { useBreakpointValue } from "../../hooks/useBreakpointValue";

const Blob = () => {
  return (
    <div
      className={
        "pointer-events-none sticky top-0 flex h-screen w-full items-center justify-center"
      }
    >
      <Canvas gl={{ logarithmicDepthBuffer: true }} shadows="soft">
        <Scene />
      </Canvas>
    </div>
  );
};

const Scene = () => {
  const blobColor = "dodgerblue";
  const resolution = useBreakpointValue<number>({ base: 128, md: 512 });

  const dirLight = useRef<DirectionalLight>(null);
  const dirLight2 = useRef<DirectionalLight>(null);
  const dirLight3 = useRef<DirectionalLight>(null);
  const dirLight4 = useRef<DirectionalLight>(null);

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
      <Sphere
        scale={3}
        position={[0, -3, 0]}
        args={[1, resolution, resolution]}
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
    </>
  );
};

export default Blob;
