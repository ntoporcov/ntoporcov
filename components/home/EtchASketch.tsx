import { Canvas, ThreeEvent, useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, RoundedBox } from "@react-three/drei";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ElementRef } from "react";
import {
  CanvasTexture,
  DoubleSide,
  LinearFilter,
  NearestFilter,
  Plane,
  Raycaster,
  SRGBColorSpace,
  Vector2,
  Vector3,
} from "three";
import { Button } from "../form/Button";
import { cn } from "../../hooks/tailwind";

const SCREEN_WIDTH = 192;
const SCREEN_HEIGHT = 108;
const SCREEN_WORLD_WIDTH = 7.2;
const SCREEN_WORLD_HEIGHT = 4.05;
const ERASER_WORLD_MIN = -3.25;
const ERASER_WORLD_MAX = 3.25;
const SCREEN_BACKGROUND = "#c9c4aa";
const DRAW_COLOR = "rgba(48, 48, 43, 0.42)";

function initializeScreen(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = SCREEN_BACKGROUND;
  ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
}

function EtchASketchScene({
  drawMode,
  onDraw,
  onDrawEnd,
  onErase,
  texture,
  isFullScreen,
}: {
  drawMode: boolean;
  onDraw: (x: number, y: number) => void;
  onDrawEnd: () => void;
  onErase: (x: number) => void;
  texture: CanvasTexture | null;
  isFullScreen: boolean;
}) {
  const { camera, gl } = useThree();
  const controlsRef = useRef<ElementRef<typeof OrbitControls>>(null);
  const eraseDraggingRef = useRef(false);
  const drawingDraggingRef = useRef(false);
  const [knobX, setKnobX] = useState(ERASER_WORLD_MIN);
  const raycaster = useMemo(() => new Raycaster(), []);
  const pointer = useMemo(() => new Vector2(), []);
  const erasePlane = useMemo(() => new Plane(new Vector3(0, 0, 1), -0.18), []);
  const eraseIntersection = useMemo(() => new Vector3(), []);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.enabled =
        !drawMode && !eraseDraggingRef.current && !drawingDraggingRef.current;
    }
  }, [drawMode]);

  const setErasing = useCallback(
    (enabled: boolean) => {
      eraseDraggingRef.current = enabled;
      if (controlsRef.current) {
        controlsRef.current.enabled =
          !drawMode && !enabled && !drawingDraggingRef.current;
      }
    },
    [drawMode],
  );

  const setDrawingDrag = useCallback(
    (enabled: boolean) => {
      drawingDraggingRef.current = enabled;
      if (controlsRef.current) {
        controlsRef.current.enabled =
          !drawMode && !eraseDraggingRef.current && !enabled;
      }
      if (!enabled) {
        onDrawEnd();
      }
    },
    [drawMode, onDrawEnd],
  );

  const updateEraserFromWorldX = useCallback(
    (worldX: number) => {
      const x = Math.max(
        ERASER_WORLD_MIN,
        Math.min(ERASER_WORLD_MAX, worldX),
      );
      setKnobX(x);
      const t = (x - ERASER_WORLD_MIN) / (ERASER_WORLD_MAX - ERASER_WORLD_MIN);
      onErase(t);
    },
    [onErase],
  );

  const updateEraserFromPointer = useCallback(
    (clientX: number, clientY: number) => {
      const rect = gl.domElement.getBoundingClientRect();
      pointer.set(
        ((clientX - rect.left) / rect.width) * 2 - 1,
        -(((clientY - rect.top) / rect.height) * 2 - 1),
      );
      raycaster.setFromCamera(pointer, camera);
      if (!raycaster.ray.intersectPlane(erasePlane, eraseIntersection)) return;
      updateEraserFromWorldX(eraseIntersection.x);
    },
    [camera, eraseIntersection, erasePlane, gl.domElement, pointer, raycaster, updateEraserFromWorldX],
  );

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (!eraseDraggingRef.current) return;
      updateEraserFromPointer(event.clientX, event.clientY);
    };
    const handlePointerEnd = () => {
      if (eraseDraggingRef.current) {
        document.body.style.cursor = "auto";
        setErasing(false);
      }
      if (drawingDraggingRef.current) {
        document.body.style.cursor = "auto";
        setDrawingDrag(false);
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerEnd);
    window.addEventListener("pointercancel", handlePointerEnd);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerEnd);
      window.removeEventListener("pointercancel", handlePointerEnd);
    };
  }, [setDrawingDrag, setErasing, updateEraserFromPointer]);

  const handleEraseStart = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      event.stopPropagation();
      (
        event.target as unknown as {
          setPointerCapture: (pointerId: number) => void;
        }
      ).setPointerCapture(event.pointerId);
      document.body.style.cursor = "ew-resize";
      setErasing(true);
      updateEraserFromWorldX(event.point.x);
    },
    [setErasing, updateEraserFromWorldX],
  );

  const handleEraseEnd = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      event.stopPropagation();
      (
        event.target as unknown as {
          releasePointerCapture: (pointerId: number) => void;
        }
      ).releasePointerCapture(event.pointerId);
      document.body.style.cursor = "auto";
      setErasing(false);
    },
    [setErasing],
  );

  const cameraDistance = isFullScreen ? 11.25 : 10.25;

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[2, 4, 6]} intensity={1.2} />
      <directionalLight position={[-5, -2, 3]} intensity={0.35} color="#ffd6a5" />
      <PerspectiveCamera
        fov={38}
        makeDefault
        position={[0, 0.35, cameraDistance]}
      />
      <OrbitControls
        ref={controlsRef}
        enabled={!drawMode}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI - 0.2}
        rotateSpeed={0.55}
      />

      {/* Main red body */}
      <RoundedBox
        args={[8.55, 5.65, 0.34]}
        radius={0.22}
        smoothness={8}
        position={[0, 0, -0.16]}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color="#d91f28"
          roughness={0.48}
          clearcoat={0.8}
          reflectivity={0.4}
        />
      </RoundedBox>

      {/* Screen inset */}
      <RoundedBox
        args={[7.5, 4.35, 0.1]}
        radius={0.08}
        smoothness={4}
        position={[0, 0.45, 0.02]}
        receiveShadow
      >
        <meshPhysicalMaterial color="#9f1720" roughness={0.55} />
      </RoundedBox>

      {/* Drawing surface */}
      <mesh
        position={[0, 0.45, 0.09]}
        onPointerDown={(event) => {
          if (drawMode || !event.uv || eraseDraggingRef.current) return;
          event.stopPropagation();
          document.body.style.cursor = "crosshair";
          setDrawingDrag(true);
          onDraw(event.uv.x, event.uv.y);
        }}
        onPointerMove={(event) => {
          if (
            (!drawMode && !drawingDraggingRef.current) ||
            !event.uv ||
            eraseDraggingRef.current
          ) {
            return;
          }
          event.stopPropagation();
          onDraw(event.uv.x, event.uv.y);
        }}
        onPointerUp={() => {
          if (!drawingDraggingRef.current) return;
          setDrawingDrag(false);
          document.body.style.cursor = "auto";
        }}
        onPointerCancel={() => {
          if (!drawingDraggingRef.current) return;
          setDrawingDrag(false);
          document.body.style.cursor = "auto";
        }}
        onPointerOver={() => {
          if (drawMode) document.body.style.cursor = "crosshair";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
          onDrawEnd();
        }}
      >
        <planeGeometry args={[SCREEN_WORLD_WIDTH, SCREEN_WORLD_HEIGHT]} />
        <meshBasicMaterial
          map={texture ?? undefined}
          color={texture ? "#ffffff" : SCREEN_BACKGROUND}
          side={DoubleSide}
        />
      </mesh>

      {/* Erase slider track */}
      <RoundedBox
        args={[6.85, 0.2, 0.12]}
        radius={0.09}
        smoothness={6}
        position={[0, -2.25, 0.08]}
        onPointerDown={handleEraseStart}
        onPointerUp={handleEraseEnd}
        onPointerCancel={handleEraseEnd}
        onPointerOver={() => {
          document.body.style.cursor = "ew-resize";
        }}
        onPointerOut={() => {
          if (!eraseDraggingRef.current) document.body.style.cursor = "auto";
        }}
      >
        <meshPhysicalMaterial color="#7f1017" roughness={0.45} />
      </RoundedBox>

      {/* Eraser knob */}
      <RoundedBox
        args={[0.58, 0.42, 0.24]}
        radius={0.12}
        smoothness={8}
        position={[knobX, -2.25, 0.24]}
        castShadow
        receiveShadow
        onPointerDown={handleEraseStart}
        onPointerUp={handleEraseEnd}
        onPointerCancel={handleEraseEnd}
        onPointerOver={() => {
          document.body.style.cursor = "ew-resize";
        }}
        onPointerOut={() => {
          if (!eraseDraggingRef.current) document.body.style.cursor = "auto";
        }}
      >
        <meshPhysicalMaterial
          color="#f5f1e7"
          roughness={0.32}
          clearcoat={0.7}
          reflectivity={0.35}
        />
      </RoundedBox>
    </>
  );
}

export default function EtchASketch({ isFullScreen }: { isFullScreen: boolean }) {
  const [drawMode, setDrawMode] = useState(true);
  const [texture, setTexture] = useState<CanvasTexture | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const textureRef = useRef<CanvasTexture | null>(null);
  const previousDrawPointRef = useRef<{ x: number; y: number } | null>(null);
  const previousEraseXRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    initializeScreen(ctx);

    const nextTexture = new CanvasTexture(canvas);
    nextTexture.colorSpace = SRGBColorSpace;
    nextTexture.magFilter = NearestFilter;
    nextTexture.minFilter = LinearFilter;
    nextTexture.needsUpdate = true;
    canvasRef.current = canvas;
    textureRef.current = nextTexture;
    setTexture(nextTexture);
  }, []);

  const drawStamp = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.fillStyle = DRAW_COLOR;
    ctx.fillRect(Math.round(x) - 1, Math.round(y) - 1, 3, 3);
    ctx.fillRect(Math.round(x), Math.round(y), 1, 1);
  }, []);

  const handleDraw = useCallback(
    (u: number, v: number) => {
      const canvas = canvasRef.current;
      const currentTexture = textureRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx || !currentTexture) return;

      const x = u * (SCREEN_WIDTH - 1);
      const y = (1 - v) * (SCREEN_HEIGHT - 1);
      const previous = previousDrawPointRef.current;
      if (!previous) {
        drawStamp(ctx, x, y);
      } else {
        const dx = x - previous.x;
        const dy = y - previous.y;
        const steps = Math.max(1, Math.ceil(Math.hypot(dx, dy) / 1.4));
        for (let i = 1; i <= steps; i++) {
          const t = i / steps;
          drawStamp(ctx, previous.x + dx * t, previous.y + dy * t);
        }
      }
      previousDrawPointRef.current = { x, y };
      currentTexture.needsUpdate = true;
    },
    [drawStamp],
  );

  const handleDrawEnd = useCallback(() => {
    previousDrawPointRef.current = null;
  }, []);

  const handleErase = useCallback((t: number) => {
    const canvas = canvasRef.current;
    const currentTexture = textureRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !currentTexture) return;

    const x = Math.round(t * (SCREEN_WIDTH - 1));
    const previous = previousEraseXRef.current ?? x;
    const start = Math.min(previous, x) - 3;
    const width = Math.abs(x - previous) + 7;
    ctx.fillStyle = SCREEN_BACKGROUND;
    ctx.fillRect(start, 0, width, SCREEN_HEIGHT);
    previousEraseXRef.current = x;
    currentTexture.needsUpdate = true;
  }, []);

  return (
    <>
      <div className="absolute left-3 top-3 z-20 flex gap-2">
        <Button
          size={"sm"}
          variant={drawMode ? "rainbow" : "outline"}
          className={cn(
            "text-xs shadow-md",
            drawMode && "shadow-pink-500/50",
          )}
          onClick={() => {
            previousDrawPointRef.current = null;
            setDrawMode((prev) => !prev);
          }}
        >
          {drawMode ? "Drawing" : "Draw"}
        </Button>
      </div>
      <Canvas className={"z-10"} shadows>
        <EtchASketchScene
          drawMode={drawMode}
          onDraw={handleDraw}
          onDrawEnd={handleDrawEnd}
          onErase={handleErase}
          texture={texture}
          isFullScreen={isFullScreen}
        />
      </Canvas>
    </>
  );
}
