import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Cylinder,
  OrthographicCamera,
  PerspectiveCamera,
  Sphere,
  Stage,
} from "@react-three/drei";
import { RefObject, useRef, useState } from "react";
import { Group, Mesh } from "three";

export default function Toy() {
  const horizontalRows = 30;
  const verticalRows = 20;

  const [mouseOver, setMouseOver] = useState({ x: 0, y: 0 });

  return (
    <Canvas style={{ height: "100vh", width: "100vw" }}>
      <Stage>
        <PerspectiveCamera
          fov={50}
          makeDefault
          position={[0, 0, 30]}
          rotation={[0, 100, 0]}
        />
        <group
          onPointerEnter={(event) => {
            console.log("event", event.point.x, event.point.y);

            setMouseOver({
              x: event.point.x,
              y: event.point.y,
            });
          }}
        >
          {Array.from({ length: horizontalRows }).map((_, row, rowList) =>
            Array.from({ length: verticalRows }).map((_, col, colList) => (
              <Pin3D
                key={`${row}-${col}`}
                pos={[rowList.length / 2 - row, colList.length / 2 - col, 100]}
                mouse={mouseOver}
              />
            )),
          )}
        </group>
      </Stage>
    </Canvas>
  );
}

function Pin3D({
  pos,
  mouse,
}: {
  pos: [number, number, number];
  mouse: { x: number; y: number };
}) {
  // console.log("mouse", mouse);

  const [isHovered, setIsHovered] = useState(false);
  const groupRef = useRef<Group>();

  useFrame(() => {
    if (groupRef.current) {
      const group = groupRef.current;
      const sphere = group.children[1] as Mesh;
      const cylinder = group.children[0] as Mesh;
      const dist = Math.sqrt(
        Math.pow(mouse.x - group.position.x, 2) +
          Math.pow(mouse.y - group.position.y, 2),
      );

      // raise the pin if the mouse is close
      if (dist < 5) {
        sphere.position.y = 120;
        cylinder.scale.y = 2;
        // sphere.material.color.set("blue");
        // cylinder.material.color.set("blue");
      } else {
        sphere.position.y = 42;
        cylinder.scale.y = 1;
        // sphere.material.color.set("hotpink");
        // cylinder.material.color.set("hotpink");
      }
    }
  });

  return (
    <group
      scale={0.01}
      receiveShadow
      position={[pos[0], pos[1], 0]}
      rotation={[90, 0, 0]}
      ref={groupRef}
    >
      <Cylinder args={[5, 5, 120, 256]} position={[0, 0, 0]}>
        <meshStandardMaterial color={"hotpink"} />
      </Cylinder>
      <Sphere args={[20, 128, 128]} position={[0, 42, 0]}>
        <meshStandardMaterial color={"hotpink"} />
      </Sphere>
    </group>
  );
}
