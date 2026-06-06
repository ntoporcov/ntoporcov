import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Cylinder,
  OrbitControls,
  PerspectiveCamera,
  Plane,
  Sphere,
} from "@react-three/drei";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DirectionalLight, Group, Mesh, Vector3 } from "three";
import { interpolate } from "framer-motion";
import { useBreakpointValue } from "../../hooks/useBreakpointValue";
import ToyContainer from "./ToyContainer";
import { useBoolean } from "react-use";
import { Button } from "../form/Button";
import { cn } from "../../hooks/tailwind";

function lerp(start: number, end: number, alpha: number): number {
  return start * (1 - alpha) + end * alpha;
}

function Scene({
  isFullScreen,
  drawMode,
  drawnPins,
  onDraw,
}: {
  isFullScreen: boolean;
  drawMode: boolean;
  drawnPins: Set<string>;
  onDraw: (pinKey: string) => void;
}) {
  const horizontalRows = useBreakpointValue<number>({
    base: isFullScreen ? window.innerWidth / 20 : 15,
    md: 35,
  });
  const verticalRows = useBreakpointValue<number>({
    base: isFullScreen ? window.innerHeight / 25 : 20,
    md: 35,
  });
  const maxDistance = useBreakpointValue<number>({ base: 3, md: 5 });
  const drawRadius = useBreakpointValue<number>({ base: 1.5, md: 2 });

  const isMobile = useBreakpointValue<boolean>({ base: true, md: false });

  const three = useThree();

  const mousePos = useRef<Vector3>(null);
  const isPointerOver = useRef(false);
  const isDrawing = useRef(false);

  // Hoist interpolation functions out of the per-frame loop
  const interpolators = useMemo(
    () => ({
      sphereElevation: interpolate([0, maxDistance], [800, 40]),
      cylinderScale: interpolate([0, maxDistance], [7, 1]),
      cylinderZ: interpolate([0, maxDistance], [400, 1]),
    }),
    [maxDistance],
  );

  // Build a map of pin keys to their positions for draw hit-testing
  const pinPositions = useMemo(() => {
    const positions: { key: string; x: number; y: number }[] = [];
    for (let row = 0; row < horizontalRows; row++) {
      for (let col = 0; col < verticalRows; col++) {
        const x = horizontalRows / 2 - row + (col % 2 === 0 ? 0.5 : 0);
        const y = verticalRows / 2 - col;
        positions.push({ key: `${row}-${col}`, x, y });
      }
    }
    return positions;
  }, [horizontalRows, verticalRows]);

  const handleDrawAt = useCallback(
    (point: Vector3) => {
      if (!drawMode || !isDrawing.current) return;
      // Find all pins within draw radius and mark them
      for (const pin of pinPositions) {
        const dist = Math.sqrt(
          Math.pow(point.x - pin.x, 2) + Math.pow(point.y - pin.y, 2),
        );
        if (dist < drawRadius) {
          onDraw(pin.key);
        }
      }
    },
    [drawMode, pinPositions, drawRadius, onDraw],
  );

  useFrame(() => {
    const bigGroup = three.scene.getObjectByName("bigGroup");
    if (!bigGroup) return;

    bigGroup.children.forEach((pin) => {
      const sphere = pin.children[1] as Mesh;
      const cylinder = pin.children[0] as Mesh;

      if (!sphere || !cylinder) return;

      // Check if this pin is permanently drawn
      const isPinDrawn = drawnPins.has(pin.name);

      if (isPinDrawn) {
        // Drawn pins stay raised
        sphere.position.z = lerp(sphere.position.z, 800, 0.15);
        cylinder.scale.y = lerp(cylinder.scale.y, 7, 0.15);
        cylinder.position.z = lerp(cylinder.position.z, 400, 0.15);
        return;
      }

      // When pointer is outside, smoothly decay back to resting state
      if (!mousePos.current || !isPointerOver.current) {
        sphere.position.z = lerp(sphere.position.z, 40, 0.05);
        cylinder.scale.y = lerp(cylinder.scale.y, 1, 0.05);
        cylinder.position.z = lerp(cylinder.position.z, 1, 0.05);
        return;
      }

      const dist = Math.sqrt(
        Math.pow(mousePos.current.x - pin.position.x, 2) +
          Math.pow(mousePos.current.y - pin.position.y, 2),
      );

      sphere.position.z = lerp(
        sphere.position.z,
        interpolators.sphereElevation(dist),
        0.2,
      );
      cylinder.scale.y = lerp(
        cylinder.scale.y,
        interpolators.cylinderScale(dist),
        0.2,
      );
      cylinder.position.z = lerp(
        cylinder.position.z,
        interpolators.cylinderZ(dist),
        0.2,
      );
    });
  });

  const dirLight = useRef<DirectionalLight>(null);
  const dirLight2 = useRef<DirectionalLight>(null);
  const dirLight3 = useRef<DirectionalLight>(null);
  const dirLight4 = useRef<DirectionalLight>(null);

  return (
    <group>
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
      <ambientLight intensity={0.4} castShadow />
      <PerspectiveCamera
        fov={35}
        makeDefault
        position={[0, 0, isFullScreen ? 70 : isMobile ? 30 : 50]}
      />
      <group
        rotation={[-Math.PI / 4, 0, 0]}
        name={"bigGroup"}
      >
        {/* Invisible plane to capture pointer events across the entire grid area */}
        <Plane
          args={[horizontalRows + 2, verticalRows + 2]}
          position={[0, 0, -0.1]}
          onPointerDown={(event) => {
            if (drawMode) {
              isDrawing.current = true;
              const bigGroup = three.scene.getObjectByName("bigGroup");
              if (bigGroup) {
                const localPoint = bigGroup.worldToLocal(event.point.clone());
                mousePos.current = localPoint;
                handleDrawAt(localPoint);
              }
            }
          }}
          onPointerUp={() => {
            isDrawing.current = false;
          }}
          onPointerMove={(event) => {
            const bigGroup = three.scene.getObjectByName("bigGroup");
            if (bigGroup) {
              const localPoint = bigGroup.worldToLocal(event.point.clone());
              mousePos.current = localPoint;
              if (drawMode && isDrawing.current) {
                handleDrawAt(localPoint);
              }
            }
            isPointerOver.current = true;
          }}
          onPointerOut={() => {
            isPointerOver.current = false;
            isDrawing.current = false;
          }}
        >
          <meshBasicMaterial transparent opacity={0} />
        </Plane>
        {!isMobile && !drawMode && <OrbitControls enableZoom={false} />}
        {Array.from({ length: horizontalRows }).map((_, row, rowList) =>
          Array.from({ length: verticalRows }).map((_, col, colList) => (
            <Pin3D
              key={`${row}-${col}`}
              name={`${row}-${col}`}
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
    </group>
  );
}

function Pin3D({
  pos,
  gridCoord,
  name,
}: {
  pos: [number, number, number];
  gridCoord: { row: number; col: number };
  name: string;
}) {
  const resolution = useBreakpointValue<number>({ base: 10, md: 16 });

  const groupRef = useRef<Group>(null);

  const three = useThree();

  useEffect(() => {
    three.scene.getObjectByName("bigGroup")?.add(groupRef.current);
  }, [three.scene]);

  const distance = Math.sqrt(
    Math.pow(gridCoord.row, 2) + Math.pow(gridCoord.col, 2),
  );

  const angle = Math.atan2(gridCoord.row, gridCoord.col);
  const hue = (angle * (180 / Math.PI) + 180 + distance * 10) % 360;

  return (
    <group
      scale={0.01}
      receiveShadow
      position={[pos[0], pos[1], 0]}
      rotation={[0, 0, 0]}
      ref={groupRef}
      name={name}
    >
      <Cylinder
        args={[5, 5, 120, resolution]}
        position={[0, 0, -35]}
        rotation={[1.55, 0, 0]}
      >
        <meshPhysicalMaterial
          clearcoat={1}
          reflectivity={0.5}
          color={`hsl(${hue}, 100%, 50%)`}
        />
      </Cylinder>
      <Sphere args={[30, resolution, resolution]} position={[0, 0, 0]}>
        <meshPhysicalMaterial
          clearcoat={1}
          reflectivity={0.5}
          color={`hsl(${hue}, 100%, 50%)`}
        />
      </Sphere>
    </group>
  );
}

export default function Toy() {
  const [fullScreen, setFullScreen] = useBoolean(false);
  const [drawMode, setDrawMode] = useState(false);
  const [drawnPins, setDrawnPins] = useState<Set<string>>(new Set());

  const handleDraw = useCallback((pinKey: string) => {
    setDrawnPins((prev) => {
      if (prev.has(pinKey)) return prev;
      const next = new Set(prev);
      next.add(pinKey);
      return next;
    });
  }, []);

  const handleClear = useCallback(() => {
    setDrawnPins(new Set());
  }, []);

  return (
    <ToyContainer isFullScreen={fullScreen} onFullScreenChange={setFullScreen}>
      <div className="absolute left-3 top-3 z-20 flex gap-2">
        <Button
          size={"sm"}
          variant={drawMode ? "rainbow" : "outline"}
          className={cn(
            "text-xs shadow-md",
            drawMode && "shadow-pink-500/50",
          )}
          onClick={() => setDrawMode(!drawMode)}
        >
          {drawMode ? "Drawing" : "Draw"}
        </Button>
        {drawnPins.size > 0 && (
          <Button
            size={"sm"}
            variant={"outline"}
            className="text-xs shadow-md"
            onClick={handleClear}
          >
            Clear
          </Button>
        )}
      </div>
      <Canvas className={"z-10"}>
        <Scene
          isFullScreen={fullScreen}
          drawMode={drawMode}
          drawnPins={drawnPins}
          onDraw={handleDraw}
        />
      </Canvas>
    </ToyContainer>
  );
}
