import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ElementRef } from "react";
import { FaVolumeHigh, FaVolumeXmark } from "react-icons/fa6";
import {
  BoxGeometry,
  CanvasTexture,
  Color,
  DoubleSide,
  Float32BufferAttribute,
  Mesh,
  MeshPhysicalMaterial,
  Path,
  Shape,
  ShapeGeometry,
  SRGBColorSpace,
} from "three";
import { Button } from "../form/Button";
import { useBreakpointValue } from "../../hooks/useBreakpointValue";

const GRID_SIZE = 8;
const BUBBLE_SPACING = 1.1;
const BUBBLE_RADIUS = 0.45;
const PLATE_PADDING = 0.6;

// Toy body geometry. The base plate is intentionally thin; a ridge wraps the
// perimeter, protruding above the top (hiding the plate/rainbow seam) and
// below the bottom (so the toy reads as a framed tray from underneath too).
const PLATE_THICKNESS = 0.02;
const PLATE_TOP_Y = -0.02;
const PLATE_BOTTOM_Y = PLATE_TOP_Y - PLATE_THICKNESS;
const PLATE_CENTER_Y = PLATE_TOP_Y - PLATE_THICKNESS / 2;
// How far the ridge sticks out past each face of the plate.
const RIDGE_PROTRUSION = 0.05;
const RIDGE_WIDTH = 0.14;
// Ridge spans the full plate thickness plus a protrusion on each side.
const RIDGE_HEIGHT = PLATE_THICKNESS + RIDGE_PROTRUSION * 2;
const RIDGE_CENTER_Y = PLATE_CENTER_Y;

const POP_SOUND_PATHS = [
  "/sounds/pop-1.m4a",
  "/sounds/pop-2.m4a",
  "/sounds/pop-3.m4a",
];

function lerp(start: number, end: number, alpha: number): number {
  return start * (1 - alpha) + end * alpha;
}

function Bubble({
  position,
  color,
  popped,
  onPressStart,
  onDragEnter,
}: {
  position: [number, number, number];
  color: string;
  popped: boolean;
  onPressStart: () => void;
  onDragEnter: () => void;
}) {
  const meshRef = useRef<Mesh>(null);
  const matRef = useRef<MeshPhysicalMaterial>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (!meshRef.current) return;
    // Pop: invert the dome by mirroring it across the surface plane (scale.y).
    // The flat rim stays put at y=0 while the dome flips from pointing up
    // (+y) to pointing down (-y) through the hole, snapping inside-out like a
    // real pop-it bubble. Hover bulges the dome taller + adds an emissive glow.
    const hoverStretch = hovered ? 1.18 : 1;
    const target = (popped ? -1 : 1) * hoverStretch;
    meshRef.current.scale.y = lerp(meshRef.current.scale.y, target, 0.22);
    if (matRef.current) {
      matRef.current.emissiveIntensity = lerp(
        matRef.current.emissiveIntensity,
        hovered ? 0.35 : 0,
        0.2,
      );
    }
  });

  return (
    <group position={position}>
      {/* Visual dome. Animated (mirror-scaled on pop), so we don't rely on it
          for hit-testing - raycasting against the inverted geometry is
          unreliable from the underside. */}
      <mesh ref={meshRef} castShadow receiveShadow raycast={() => null}>
        {/* Hemisphere: top half of a sphere */}
        <sphereGeometry
          args={[BUBBLE_RADIUS, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2]}
        />
        <meshPhysicalMaterial
          ref={matRef}
          color={color}
          emissive={color}
          emissiveIntensity={0}
          clearcoat={1}
          clearcoatRoughness={0.1}
          reflectivity={0.6}
          roughness={0.25}
          metalness={0.05}
          side={DoubleSide}
        />
      </mesh>

      {/* Invisible static collider (full sphere) that captures all pointer
          events. Because it never moves or inverts, taps/drags work the same
          from the top and the popped underside. It pokes through the hole on
          both faces so either side is reachable. */}
      <mesh
        onPointerDown={(e) => {
          e.stopPropagation();
          onPressStart();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
          // Fires on every hover; the parent only pops if a drag is in progress.
          onDragEnter();
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <sphereGeometry args={[BUBBLE_RADIUS, 16, 12]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}

function PopItScene({
  poppedBubbles,
  onPress,
  onDragOver,
  isFullScreen,
}: {
  poppedBubbles: Set<string>;
  onPress: (key: string) => void;
  onDragOver: (key: string) => void;
  isFullScreen: boolean;
}) {
  const isMobile = useBreakpointValue<boolean>({ base: true, md: false });

  const controlsRef = useRef<ElementRef<typeof OrbitControls>>(null);
  // True while a press that started ON a bubble is held - during this, dragging
  // pops bubbles instead of rotating the scene.
  const draggingPopRef = useRef(false);

  // End the pop-drag and re-enable scene rotation on pointer release anywhere.
  useEffect(() => {
    const end = () => {
      if (!draggingPopRef.current) return;
      draggingPopRef.current = false;
      if (controlsRef.current) controlsRef.current.enabled = true;
    };
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
    return () => {
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
    };
  }, []);

  const handleBubblePress = useCallback(
    (key: string) => {
      // Pressing a bubble starts a pop-drag and disables rotation for this
      // gesture. Disabling synchronously here prevents OrbitControls from
      // starting a rotate on the same pointerdown.
      draggingPopRef.current = true;
      if (controlsRef.current) controlsRef.current.enabled = false;
      onPress(key);
    },
    [onPress],
  );

  const handleBubbleEnter = useCallback(
    (key: string) => {
      if (!draggingPopRef.current) return;
      onDragOver(key);
    },
    [onDragOver],
  );

  const plateSize = GRID_SIZE * BUBBLE_SPACING + PLATE_PADDING * 2;

  const bubbles = useMemo(() => {
    const items: {
      key: string;
      position: [number, number, number];
      color: string;
    }[] = [];
    const offset = ((GRID_SIZE - 1) * BUBBLE_SPACING) / 2;
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        const x = col * BUBBLE_SPACING - offset;
        const z = row * BUBBLE_SPACING - offset;
        // Diagonal-based hue gives a nice rainbow gradient across the grid
        const hue = ((row + col) / (GRID_SIZE * 2 - 2)) * 320;
        items.push({
          key: `${row}-${col}`,
          position: [x, 0, z],
          color: `hsl(${hue}, 90%, 60%)`,
        });
      }
    }
    return items;
  }, []);

  const cameraDistance = isFullScreen ? 16 : isMobile ? 14 : 12;

  // Holes through the plate / rainbow surface so a popped bubble can travel
  // to the other side and remain visible. Slightly larger than the bubble
  // radius so the hemisphere geometry has clearance during its rotation
  // animation without intersecting the hole edge.
  const holeRadius = BUBBLE_RADIUS + 0.02;
  const innerSize = plateSize - 2 * RIDGE_WIDTH + 0.04;

  // Square outline + circular hole per bubble. Used by both the plate
  // (extruded) and rainbow surface (flat).
  const buildShapeWithHoles = (outerSize: number) => {
    const shape = new Shape();
    const half = outerSize / 2;
    shape.moveTo(-half, -half);
    shape.lineTo(half, -half);
    shape.lineTo(half, half);
    shape.lineTo(-half, half);
    shape.closePath();

    for (const bubble of bubbles) {
      const hole = new Path();
      // Mesh is rotated -PI/2 around X, so shape Y maps to world -Z.
      hole.absarc(
        bubble.position[0],
        -bubble.position[2],
        holeRadius,
        0,
        Math.PI * 2,
        true,
      );
      shape.holes.push(hole);
    }
    return shape;
  };

  const plateShape = useMemo(
    () => buildShapeWithHoles(plateSize),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [plateSize, bubbles, holeRadius],
  );

  // Rainbow surface geometry. ShapeGeometry assigns UVs from raw vertex
  // coordinates (e.g. -4..4), which makes a mapped texture tile/clip wrong.
  // Rebuild the UVs normalized to 0..1 across the shape's bounding box so the
  // gradient maps cleanly corner-to-corner.
  const rainbowGeometry = useMemo(() => {
    const shape = buildShapeWithHoles(innerSize);
    const geo = new ShapeGeometry(shape);
    geo.computeBoundingBox();
    const bb = geo.boundingBox!;
    const sizeX = bb.max.x - bb.min.x;
    const sizeY = bb.max.y - bb.min.y;
    const pos = geo.attributes.position;
    const uv = geo.attributes.uv;
    for (let i = 0; i < pos.count; i++) {
      uv.setXY(
        i,
        (pos.getX(i) - bb.min.x) / sizeX,
        (pos.getY(i) - bb.min.y) / sizeY,
      );
    }
    uv.needsUpdate = true;
    return geo;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [innerSize, bubbles, holeRadius]);

  // Ridge frame geometries with per-vertex rainbow colors. Each vertex is
  // colored from its world (x,z) using the same diagonal hue mapping as the
  // surface, so the ridge gradient continuously matches the surface beneath it.
  const ridgeGeometries = useMemo(() => {
    const half = plateSize / 2;
    const innerLen = plateSize - 2 * RIDGE_WIDTH;
    const pieces: {
      args: [number, number, number];
      position: [number, number, number];
    }[] = [
      // Front (+Z)
      {
        args: [plateSize, RIDGE_HEIGHT, RIDGE_WIDTH],
        position: [0, RIDGE_CENTER_Y, half - RIDGE_WIDTH / 2],
      },
      // Back (-Z)
      {
        args: [plateSize, RIDGE_HEIGHT, RIDGE_WIDTH],
        position: [0, RIDGE_CENTER_Y, -half + RIDGE_WIDTH / 2],
      },
      // Left (-X)
      {
        args: [RIDGE_WIDTH, RIDGE_HEIGHT, innerLen],
        position: [-half + RIDGE_WIDTH / 2, RIDGE_CENTER_Y, 0],
      },
      // Right (+X)
      {
        args: [RIDGE_WIDTH, RIDGE_HEIGHT, innerLen],
        position: [half - RIDGE_WIDTH / 2, RIDGE_CENTER_Y, 0],
      },
    ];

    const color = new Color();
    return pieces.map((piece) => {
      const geo = new BoxGeometry(...piece.args);
      const pos = geo.attributes.position;
      const colors = new Float32Array(pos.count * 3);
      for (let i = 0; i < pos.count; i++) {
        // local -> world (boxes aren't rotated, so just add the center)
        const x = pos.getX(i) + piece.position[0];
        const z = pos.getZ(i) + piece.position[2];
        // Same diagonal mapping as the surface texture: t = (x - z)/(2*size)+0.5
        let t = (x - z) / (2 * innerSize) + 0.5;
        t = Math.max(0, Math.min(1, t));
        color.set(`hsl(${t * 320}, 90%, 60%)`);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }
      geo.setAttribute("color", new Float32BufferAttribute(colors, 3));
      return { geo, position: piece.position };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plateSize, innerSize]);

  // Linear diagonal rainbow gradient. Applied to the rainbow shape on top of
  // the plate. Using a 2D Shape (not a Box) gives us predictable UV mapping
  // for the gradient.
  const plateTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const SIZE = 512;
    const canvas = document.createElement("canvas");
    canvas.width = SIZE;
    canvas.height = SIZE;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const grad = ctx.createLinearGradient(0, 0, SIZE, SIZE);
    // Hue stops mirror the bubbles' palette (0..320, 90% sat, 60% lightness)
    const STOPS = 12;
    for (let i = 0; i <= STOPS; i++) {
      const t = i / STOPS;
      const hue = t * 320;
      grad.addColorStop(t, `hsl(${hue}, 90%, 60%)`);
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, SIZE, SIZE);

    const tex = new CanvasTexture(canvas);
    tex.colorSpace = SRGBColorSpace;
    tex.needsUpdate = true;
    return tex;
  }, []);

  return (
    <>
      {/* Dramatic, mostly side-on key light so the convex (unpopped) domes
          stay bright while the concave (popped) dents fall into shadow.
          Ambient is intentionally low so the inverted surfaces read as dark.
          shadow bias/normalBias avoid acne on the curved bubble surfaces. */}
      <directionalLight
        position={[6, 7, 3]}
        intensity={1.3}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0004}
        shadow-normalBias={0.04}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
      />
      <directionalLight
        position={[-6, 2, -2]}
        intensity={0.25}
        color={"#a0c4ff"}
      />
      <directionalLight position={[0, 1, 7]} intensity={0.2} color={"#ffd6a5"} />
      {/* Underside lights mirror the top: a dramatic side-on/raking key so the
          domes protruding through (popped, when viewed from below) catch
          highlights and cast shadows, plus a dim fill. Kept low/grazing so the
          flat (unpopped) holes stay dark and the popped domes stand out. */}
      <directionalLight
        position={[6, -7, 3]}
        intensity={1.3}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0004}
        shadow-normalBias={0.04}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
      />
      <directionalLight
        position={[-6, -2, -2]}
        intensity={0.25}
        color={"#a0c4ff"}
      />
      <ambientLight intensity={0.18} />

      <PerspectiveCamera
        fov={40}
        makeDefault
        position={[cameraDistance * 0.3, cameraDistance * 0.7, cameraDistance]}
      />
      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
        rotateSpeed={0.7}
      />

      {/* Base plate body. Built from an extruded Shape with a circular hole
          punched through at every bubble position so the bubble can rotate
          all the way through to the other side and remain visible. */}
      <mesh
        position={[0, PLATE_BOTTOM_Y, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        castShadow
        receiveShadow
      >
        <extrudeGeometry
          args={[
            plateShape,
            { depth: PLATE_THICKNESS, bevelEnabled: false, curveSegments: 24 },
          ]}
        />
        <meshPhysicalMaterial
          color={"#ffffff"}
          roughness={0.45}
          clearcoat={0.4}
          reflectivity={0.3}
        />
      </mesh>

      {/* Rainbow gradient surface on top of the plate. Same hole pattern as
          the plate, sized to tuck under the ridge frame. DoubleSide so that
          looking up through a hole from below also shows the rainbow color. */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, PLATE_TOP_Y + 0.002, 0]}
        receiveShadow
        geometry={rainbowGeometry}
      >
        <meshPhysicalMaterial
          map={plateTexture ?? undefined}
          color={"#ffffff"}
          roughness={0.45}
          clearcoat={0.4}
          reflectivity={0.3}
          side={DoubleSide}
        />
      </mesh>

      {/* Matching rainbow surface on the bottom of the plate so the toy looks
          finished when rotated underneath. Reuses the same holed geometry. */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, PLATE_BOTTOM_Y - 0.002, 0]}
        receiveShadow
        geometry={rainbowGeometry}
      >
        <meshPhysicalMaterial
          map={plateTexture ?? undefined}
          color={"#ffffff"}
          roughness={0.45}
          clearcoat={0.4}
          reflectivity={0.3}
          side={DoubleSide}
        />
      </mesh>

      {/* Ridge frame: 4 pieces wrapping the perimeter. They span the full
          plate thickness and protrude past both the top (hiding the
          plate/rainbow seam) and the bottom (so the toy looks framed from
          underneath too). Per-vertex colors continue the surface gradient. */}
      {ridgeGeometries.map((ridge, i) => (
        <mesh
          key={i}
          geometry={ridge.geo}
          position={ridge.position}
          castShadow
          receiveShadow
        >
          <meshPhysicalMaterial
            vertexColors
            roughness={0.45}
            clearcoat={0.4}
            reflectivity={0.3}
          />
        </mesh>
      ))}

      {/* Bubbles */}
      {bubbles.map((bubble) => (
        <Bubble
          key={bubble.key}
          position={bubble.position}
          color={bubble.color}
          popped={poppedBubbles.has(bubble.key)}
          onPressStart={() => handleBubblePress(bubble.key)}
          onDragEnter={() => handleBubbleEnter(bubble.key)}
        />
      ))}
    </>
  );
}

export default function PopIt({ isFullScreen }: { isFullScreen: boolean }) {
  const [poppedBubbles, setPoppedBubbles] = useState<Set<string>>(new Set());
  // Ref mirror of poppedBubbles so handlers can read current state without
  // re-creating callbacks and without stale closures during a drag.
  const poppedRef = useRef<Set<string>>(new Set());
  const [soundOn, setSoundOn] = useState(true);
  const soundOnRef = useRef(true);
  const audioPoolsRef = useRef<HTMLAudioElement[][]>([]);

  // Preload audio pools - several copies per sound so rapid pops can overlap
  useEffect(() => {
    if (typeof window === "undefined") return;
    const POOL_SIZE = 6;
    audioPoolsRef.current = POP_SOUND_PATHS.map((path) => {
      const pool: HTMLAudioElement[] = [];
      for (let i = 0; i < POOL_SIZE; i++) {
        const audio = new Audio(path);
        audio.preload = "auto";
        audio.volume = 0.7;
        pool.push(audio);
      }
      return pool;
    });
  }, []);

  const playPopSound = useCallback(() => {
    if (!soundOnRef.current) return;
    const pools = audioPoolsRef.current;
    if (!pools.length) return;
    const pool = pools[Math.floor(Math.random() * pools.length)];
    // Find an idle audio element in the pool, or just reuse the first one
    const audio = pool.find((a) => a.paused || a.ended) ?? pool[0];
    try {
      audio.currentTime = 0;
      const playPromise = audio.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          // Autoplay rejected (e.g. before user interaction) - safe to ignore
        });
      }
    } catch {
      // Some browsers throw synchronously if play is blocked
    }
  }, []);

  // Tap a bubble: toggle it (pop if up, restore if popped).
  const handlePress = useCallback(
    (key: string) => {
      const next = new Set(poppedRef.current);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      poppedRef.current = next;
      setPoppedBubbles(next);
      playPopSound();
    },
    [playPopSound],
  );

  // Drag across bubbles: force-pop (only fires sound when something changes).
  const handleDragOver = useCallback(
    (key: string) => {
      if (poppedRef.current.has(key)) return;
      const next = new Set(poppedRef.current);
      next.add(key);
      poppedRef.current = next;
      setPoppedBubbles(next);
      playPopSound();
    },
    [playPopSound],
  );

  const toggleSound = useCallback(() => {
    setSoundOn((prev) => {
      soundOnRef.current = !prev;
      return !prev;
    });
  }, []);

  return (
    <>
      <div className="absolute left-3 top-3 z-20 flex gap-2">
        <Button
          size={"sm"}
          variant={"outline"}
          className="flex items-center gap-2 text-xs shadow-md"
          onClick={toggleSound}
          aria-label={soundOn ? "Mute pop sounds" : "Unmute pop sounds"}
        >
          {soundOn ? <FaVolumeHigh /> : <FaVolumeXmark />}
          <span>{soundOn ? "Sound on" : "Muted"}</span>
        </Button>
      </div>
      <Canvas className={"z-10"} shadows>
        <PopItScene
          poppedBubbles={poppedBubbles}
          onPress={handlePress}
          onDragOver={handleDragOver}
          isFullScreen={isFullScreen}
        />
      </Canvas>
    </>
  );
}
