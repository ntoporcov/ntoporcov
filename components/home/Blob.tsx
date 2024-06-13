import { MeshDistortMaterial, Sphere, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

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
