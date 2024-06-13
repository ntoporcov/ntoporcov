import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Cylinder,
  OrbitControls,
  PerspectiveCamera,
  Sphere,
  Stage,
} from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Group, Mesh, Vector3 } from "three";
import { interpolate } from "framer-motion";

function lerp(start: number, end: number, alpha: number): number {
  return start * (1 - alpha) + end * alpha;
}

function Scene() {
  const horizontalRows = 30;
  const verticalRows = 20;

  const three = useThree();

  const mousePos = useRef<Vector3>(null);

  useFrame(({ clock }) => {
    three.scene.getObjectByName("bigGroup").children.forEach((pin) => {
      if (!mousePos.current) return;

      const sphere = pin.children[1] as Mesh;
      const cylinder = pin.children[0] as Mesh;

      const dist = Math.sqrt(
        Math.pow(mousePos.current.x - pin.position.x, 2) +
          Math.pow(mousePos.current.y - pin.position.y, 2),
      );

      const makeSphereElevation = interpolate([0, 5], [800, 40]);
      const makeCylinderScale = interpolate([0, 5], [7, 1]);
      const makeCylinderZ = interpolate([0, 5], [400, 1]);

      sphere.position.z = lerp(
        sphere.position.z,
        makeSphereElevation(dist),
        0.2,
      );
      cylinder.scale.y = lerp(cylinder.scale.y, makeCylinderScale(dist), 0.2);
      cylinder.position.z = lerp(cylinder.position.z, makeCylinderZ(dist), 0.2);
    });
  });

  return (
    <group>
      <Stage adjustCamera={false}>
        <PerspectiveCamera fov={35} makeDefault position={[0, 0, 50]} />
        <group
          rotation={[-Math.PI / 4, 0, 0]}
          name={"bigGroup"}
          onPointerOver={(event) => {
            mousePos.current = event.point;
          }}
        >
          <OrbitControls enableZoom={false} />
          {Array.from({ length: horizontalRows }).map((_, row, rowList) =>
            Array.from({ length: verticalRows }).map((_, col, colList) => (
              <Pin3D
                key={`${row}-${col}`}
                pos={[
                  rowList.length / 2 - row + (col % 2 === 0 ? 0.5 : 0),
                  colList.length / 2 - col,
                  0,
                ]}
                gridCoord={{ row, col }}
              />
            )),
          )}
        </group>
      </Stage>
    </group>
  );
}

function Pin3D({
  pos,
  gridCoord,
}: {
  pos: [number, number, number];
  gridCoord: { row: number; col: number };
}) {
  const groupRef = useRef<Group>();

  const three = useThree();

  useEffect(() => {
    three.scene.getObjectByName("bigGroup")?.add(groupRef.current);
  }, [three.scene]);

  // Calculate the distance from the center of the grid to the pin position
  const distance = Math.sqrt(
    Math.pow(gridCoord.row, 2) + Math.pow(gridCoord.col, 2),
  );

  // Calculate the angle of the vector from the center of the grid to the pin position
  const angle = Math.atan2(gridCoord.row, gridCoord.col);

  // Use the distance and the angle to calculate the hue
  const hue = (angle * (180 / Math.PI) + 180 + distance * 10) % 360;

  return (
    <group
      scale={0.01}
      receiveShadow
      position={[pos[0], pos[1], 0]}
      rotation={[0, 0, 0]}
      ref={groupRef}
    >
      <Cylinder
        args={[5, 5, 120, 256]}
        position={[0, 0, -35]}
        rotation={[1.55, 0, 0]}
      >
        <meshStandardMaterial color={`hsl(${hue}, 100%, 50%)`} />
      </Cylinder>
      <Sphere args={[30, 128, 128]} position={[0, 0, 0]}>
        <meshStandardMaterial color={`hsl(${hue}, 100%, 50%)`} />
      </Sphere>
    </group>
  );
}

export default function Toy() {
  return (
    <Canvas className={"z-10"}>
      <Scene />
    </Canvas>
  );
}
