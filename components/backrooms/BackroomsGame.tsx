import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Link from "next/link";
import React, { Component, Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import World from "./Rooms";
import {
  canStandAt,
  DEFAULT_SEED,
  hashSeed,
  roomAt,
  ROOMS,
  type Point,
} from "./world";
import styles from "./BackroomsGame.module.css";

type Visit = Point & { seed: string; yaw: number; pitch: number };
type Input = { x: number; z: number; lookX: number; lookY: number };
const STORAGE_KEY = "backrooms:room-visit";
const entrance: Visit = { x: 0, z: 2, yaw: 0, pitch: 0, seed: DEFAULT_SEED };

function restoreVisit(): Visit {
  try {
    const visit = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "null");
    if (
      visit &&
      typeof visit.seed === "string" &&
      visit.seed.length <= 80 &&
      [visit.x, visit.z, visit.yaw, visit.pitch].every(Number.isFinite) &&
      Math.abs(visit.x) < 100000 &&
      Math.abs(visit.z) < 100000 &&
      canStandAt(visit.x, visit.z, hashSeed(visit.seed))
    )
      return visit;
  } catch {
    /* Storage is optional in private browsing. */
  }
  return entrance;
}

class SceneBoundary extends Component<
  { children: React.ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    if (this.state.failed)
      return (
        <div className={styles.failure} role="alert">
          The room could not be rendered. Try reloading, or{" "}
          <Link href="/">return to the website</Link>.
        </div>
      );
    return this.props.children;
  }
}

function Player({
  active,
  input,
  spawn,
  resetId,
  seed,
  onPosition,
}: {
  active: boolean;
  input: React.RefObject<Input>;
  spawn: React.RefObject<Visit>;
  resetId: number;
  seed: number;
  onPosition: (visit: Omit<Visit, "seed">) => void;
}) {
  const { camera, gl, scene } = useThree();
  const light = useRef<THREE.PointLight | null>(null);
  const keys = useRef(new Set<string>());
  const elapsed = useRef(0);
  const angles = useRef({ yaw: 0, pitch: 0 });

  useEffect(() => {
    const point = spawn.current;
    camera.position.set(point.x, 1.65, point.z);
    angles.current = { yaw: point.yaw, pitch: point.pitch };
    camera.rotation.set(point.pitch, point.yaw, 0, "YXZ");
  }, [camera, resetId, spawn]);

  useEffect(() => {
    const lamp = new THREE.PointLight("#fff0c7", 2, 13, 1.5);
    light.current = lamp;
    scene.add(lamp);
    return () => {
      scene.remove(lamp);
      lamp.dispose();
      light.current = null;
    };
  }, [scene]);

  useEffect(() => {
    const clear = () => {
      keys.current.clear();
      input.current.x =
        input.current.z =
        input.current.lookX =
        input.current.lookY =
          0;
    };
    clear();
    const down = (event: KeyboardEvent) => {
      if (!active || event.metaKey || event.ctrlKey || event.altKey) return;
      if (
        [
          "KeyW",
          "KeyA",
          "KeyS",
          "KeyD",
          "ArrowUp",
          "ArrowDown",
          "ArrowLeft",
          "ArrowRight",
          "ShiftLeft",
          "ShiftRight",
        ].includes(event.code)
      ) {
        event.preventDefault();
        keys.current.add(event.code);
      }
    };
    const up = (event: KeyboardEvent) => keys.current.delete(event.code);
    const move = (event: MouseEvent) => {
      if (!active || document.pointerLockElement !== gl.domElement) return;
      input.current.lookX += event.movementX;
      input.current.lookY += event.movementY;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", clear);
    document.addEventListener("mousemove", move);
    return () => {
      clear();
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", clear);
      document.removeEventListener("mousemove", move);
    };
  }, [active, gl, input]);

  useFrame((_, delta) => {
    light.current?.position.copy(camera.position);
    if (!active) return;
    const dt = Math.min(delta, 0.05);
    const control = input.current;
    angles.current.yaw -= control.lookX * 0.0024;
    angles.current.pitch = THREE.MathUtils.clamp(
      angles.current.pitch - control.lookY * 0.0024,
      -1.35,
      1.35,
    );
    control.lookX = control.lookY = 0;
    const yaw = angles.current.yaw;
    camera.rotation.set(angles.current.pitch, yaw, 0, "YXZ");
    const held = (key: string) => (keys.current.has(key) ? 1 : 0);
    let x =
      control.x +
      held("KeyD") +
      held("ArrowRight") -
      held("KeyA") -
      held("ArrowLeft");
    let z =
      control.z +
      held("KeyS") +
      held("ArrowDown") -
      held("KeyW") -
      held("ArrowUp");
    const length = Math.max(1, Math.hypot(x, z));
    const speed = (held("ShiftLeft") || held("ShiftRight") ? 5 : 3) * dt;
    x = (x / length) * speed;
    z = (z / length) * speed;
    const dx = x * Math.cos(yaw) + z * Math.sin(yaw);
    const dz = z * Math.cos(yaw) - x * Math.sin(yaw);
    // Small substeps keep thin walls solid even after a long or stalled frame.
    const steps = Math.max(1, Math.ceil(Math.hypot(dx, dz) / 0.1));
    for (let i = 0; i < steps; i++) {
      if (canStandAt(camera.position.x + dx / steps, camera.position.z, seed))
        camera.position.x += dx / steps;
      if (canStandAt(camera.position.x, camera.position.z + dz / steps, seed))
        camera.position.z += dz / steps;
    }
    elapsed.current += dt;
    if (elapsed.current > 0.2) {
      elapsed.current = 0;
      onPosition({
        x: camera.position.x,
        z: camera.position.z,
        ...angles.current,
      });
    }
  });
  return null;
}

function useHum(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    const context = new AudioContext();
    const gain = context.createGain();
    gain.gain.value = 0.018;
    gain.connect(context.destination);
    const hum = context.createOscillator();
    hum.frequency.value = 60;
    hum.connect(gain);
    hum.start();
    void context.resume().catch(() => {});
    return () => {
      hum.stop();
      void context.close().catch(() => {});
    };
  }, [enabled]);
}

export default function BackroomsGame() {
  const [initial] = useState(restoreVisit);
  const [position, setPosition] = useState<Visit>(initial);
  const [seed, setSeed] = useState(initial.seed);
  const [seedInput, setSeedInput] = useState(initial.seed);
  const [panel, setPanel] = useState<"welcome" | "pause" | "room" | null>(
    "welcome",
  );
  const [ready, setReady] = useState(false);
  const [sceneFailed, setSceneFailed] = useState(false);
  const [canRender, setCanRender] = useState(false);
  const [touch, setTouch] = useState(false);
  const [dragMode, setDragMode] = useState(false);
  const [sound, setSound] = useState(false);
  const [quality, setQuality] = useState<"low" | "high">("high");
  const [resetId, setResetId] = useState(0);
  const [error, setError] = useState("");
  const [visited, setVisited] = useState<string[]>([]);
  const spawn = useRef(initial);
  const input = useRef<Input>({ x: 0, z: 0, lookX: 0, lookY: 0 });
  const dialog = useRef<HTMLDialogElement>(null);
  const resuming = useRef(false);
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const look = useRef<{ id: number; x: number; y: number } | null>(null);
  const stick = useRef<number | null>(null);
  const [stickPosition, setStickPosition] = useState({ x: 0, y: 0 });
  const active = panel === null;
  const room = roomAt(position);
  const numericSeed = hashSeed(seed);
  useHum(sound && active);

  useEffect(() => {
    // Renderer creation is asynchronous in Fiber, outside React's error boundary.
    // Check support first so an unavailable GPU cannot leave a permanent loader.
    const probe = document.createElement("canvas");
    try {
      const context = probe.getContext("webgl2");
      if (!context) throw new Error("WebGL unavailable");
      context.getExtension("WEBGL_lose_context")?.loseContext();
      setCanRender(true);
    } catch {
      setSceneFailed(true);
      setError(
        "This experience needs WebGL. Enable hardware acceleration and reload, or browse the website using the link above.",
      );
    }
  }, []);

  useEffect(() => {
    const media = matchMedia("(pointer: coarse)");
    const update = () => {
      setTouch(media.matches);
      if (media.matches) setQuality("low");
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (panel) {
      document.exitPointerLock?.();
      if (!dialog.current?.open) dialog.current?.showModal();
      input.current = { x: 0, z: 0, lookX: 0, lookY: 0 };
      look.current = null;
      stick.current = null;
      setStickPosition({ x: 0, y: 0 });
    } else dialog.current?.close();
  }, [panel]);

  useEffect(() => {
    if (room && room.id !== "reception")
      setVisited((previous) =>
        previous.includes(room.id) ? previous : [...previous, room.id],
      );
  }, [room]);

  useEffect(() => {
    const unlock = () => {
      if (document.pointerLockElement === canvas.current) {
        resuming.current = false;
        setError("");
        setPanel(null);
      } else setPanel((current) => current ?? "pause");
    };
    const lockError = () => {
      resuming.current = false;
      setError(
        "Mouse capture is unavailable. Enable drag to look below, then try again.",
      );
      setPanel((current) => current ?? "pause");
      if (!dialog.current?.open) dialog.current?.showModal();
    };
    const keyboard = (event: KeyboardEvent) => {
      if (!active || event.repeat) return;
      if (event.code === "Escape" || (event.code === "KeyE" && room)) {
        event.preventDefault();
        setPanel(event.code === "KeyE" ? "room" : "pause");
      }
    };
    const pause = () => setPanel((current) => current ?? "pause");
    const visibility = () => {
      if (document.hidden) pause();
    };
    document.addEventListener("pointerlockchange", unlock);
    document.addEventListener("pointerlockerror", lockError);
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("keydown", keyboard);
    window.addEventListener("blur", pause);
    return () => {
      document.removeEventListener("pointerlockchange", unlock);
      document.removeEventListener("pointerlockerror", lockError);
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("keydown", keyboard);
      window.removeEventListener("blur", pause);
    };
  }, [active, room]);

  useEffect(
    () => () => {
      if (document.pointerLockElement === canvas.current)
        document.exitPointerLock?.();
    },
    [],
  );

  const enter = async () => {
    if (!ready || resuming.current) return;
    resuming.current = true;
    setError("");
    // A modal makes the canvas inert; release it before requesting pointer lock.
    dialog.current?.close();
    if (!touch && !dragMode && canvas.current?.requestPointerLock) {
      try {
        await canvas.current.requestPointerLock();
      } catch {
        resuming.current = false;
        setError(
          "Mouse capture is unavailable. Enable drag to look below, then try again.",
        );
        dialog.current?.showModal();
        return;
      }
      // Older browsers signal completion only through pointerlockchange.
      if (document.pointerLockElement !== canvas.current) return;
    }
    resuming.current = false;
    setPanel(null);
  };

  const reset = (nextSeed: string) => {
    const next = { ...entrance, seed: nextSeed };
    spawn.current = next;
    setSeed(nextSeed);
    setSeedInput(nextSeed);
    setPosition(next);
    setVisited([]);
    setResetId((id) => id + 1);
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  };

  const updatePosition = (next: Omit<Visit, "seed">) => {
    const visit = { ...next, seed };
    setPosition(visit);
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(visit));
    } catch {}
  };

  const moveStick = (event: React.PointerEvent<HTMLDivElement>) => {
    if (stick.current !== event.pointerId) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left - bounds.width / 2) / 38;
    const y = (event.clientY - bounds.top - bounds.height / 2) / 38;
    const length = Math.max(1, Math.hypot(x, y));
    input.current.x = x / length;
    input.current.z = y / length;
    setStickPosition({ x: (x / length) * 30, y: (y / length) * 30 });
  };
  const stopStick = (event: React.PointerEvent<HTMLDivElement>) => {
    if (stick.current !== event.pointerId) return;
    stick.current = null;
    input.current.x = input.current.z = 0;
    setStickPosition({ x: 0, y: 0 });
  };

  return (
    <main
      className={styles.game}
      aria-label="The Backrooms, an explorable portfolio"
    >
      <SceneBoundary
        onFailure={() => {
          setReady(false);
          setSceneFailed(true);
          setError(
            "The rooms could not be loaded. Reload to try again, or use the website link above.",
          );
          setPanel((current) => current ?? "pause");
        }}
      >
        {canRender && (
          <Canvas
            camera={{
              fov: 68,
              near: 0.08,
              far: 80,
              position: [initial.x, 1.65, initial.z],
            }}
            dpr={quality === "low" ? 1 : [1, 1.5]}
            gl={{ antialias: true, powerPreference: "high-performance" }}
            onCreated={({ gl }) => {
              canvas.current = gl.domElement;
            }}
            aria-label="First-person view of the Backrooms. Room transcripts are available in the pause menu."
          >
            <color attach="background" args={["#29271a"]} />
            <fog attach="fog" args={["#29271a", 16, 48]} />
            <ambientLight intensity={0.9} color="#e3d6a9" />
            <hemisphereLight args={["#fff4cd", "#63583c", 1.1]} />
            <Suspense fallback={null}>
              <World
                seed={numericSeed}
                position={position}
                quality={quality}
                onReady={() => setReady(true)}
              />
              <Player
                active={active}
                input={input}
                spawn={spawn}
                resetId={resetId}
                seed={numericSeed}
                onPosition={updatePosition}
              />
            </Suspense>
          </Canvas>
        )}
      </SceneBoundary>
      <div className={styles.vignette} />
      {active && (
        <>
          {(touch || dragMode || !canvas.current?.requestPointerLock) && (
            <div
              className={styles.lookSurface}
              aria-label="Drag to look around"
              onPointerDown={(event) => {
                if (look.current) return;
                event.currentTarget.setPointerCapture(event.pointerId);
                look.current = {
                  id: event.pointerId,
                  x: event.clientX,
                  y: event.clientY,
                };
              }}
              onPointerMove={(event) => {
                if (look.current?.id !== event.pointerId) return;
                input.current.lookX += event.clientX - look.current.x;
                input.current.lookY += event.clientY - look.current.y;
                look.current = {
                  id: event.pointerId,
                  x: event.clientX,
                  y: event.clientY,
                };
              }}
              onPointerUp={(event) => {
                if (look.current?.id === event.pointerId) look.current = null;
              }}
              onPointerCancel={(event) => {
                if (look.current?.id === event.pointerId) look.current = null;
              }}
              onLostPointerCapture={(event) => {
                if (look.current?.id === event.pointerId) look.current = null;
              }}
            />
          )}
          <header className={styles.hud}>
            <span>NT / Lower level</span>
            <button type="button" onClick={() => setPanel("pause")}>
              Pause <span aria-hidden="true">II</span>
            </button>
          </header>
          {!touch && <span className={styles.reticle} aria-hidden="true" />}
          <footer className={styles.location}>
            <div>
              <span className={styles.eyebrow}>
                {room?.number ?? "Unassigned"}
              </span>
              <p>{room?.title ?? "Somewhere between rooms"}</p>
            </div>
            {room && (
              <button type="button" onClick={() => setPanel("room")}>
                {touch ? "Room notes" : "E / Room notes & links"}
              </button>
            )}
          </footer>
          {touch && (
            <div className={styles.touchControls}>
              <div
                className={styles.joystick}
                role="group"
                aria-label="Drag to walk"
                onPointerDown={(event) => {
                  if (stick.current !== null) return;
                  stick.current = event.pointerId;
                  event.currentTarget.setPointerCapture(event.pointerId);
                  moveStick(event);
                }}
                onPointerMove={moveStick}
                onPointerUp={stopStick}
                onPointerCancel={stopStick}
                onLostPointerCapture={stopStick}
              >
                <span
                  style={{
                    transform: `translate(${stickPosition.x}px, ${stickPosition.y}px)`,
                  }}
                />
              </div>
              <span className={styles.lookHint}>Drag to look</span>
            </div>
          )}
        </>
      )}
      <dialog
        ref={dialog}
        className={styles.menu}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            event.stopPropagation();
          }
        }}
        onCancel={(event) => {
          event.preventDefault();
        }}
        onClose={() => {
          // Browsers can force-close a dialog despite cancel.preventDefault().
          // Never leave a paused game without its menu; explicit resume owns closing it.
          if (
            panel &&
            !resuming.current &&
            document.pointerLockElement !== canvas.current
          ) {
            dialog.current?.showModal();
          }
        }}
        aria-labelledby="backrooms-title"
      >
        <div className={styles.menuTop}>
          <Link href="/">Back to the website</Link>
          <span>NT / 00</span>
        </div>
        <div className={styles.menuBody}>
          <p className={styles.eyebrow}>
            {panel === "room"
              ? `${room?.number} / ${room?.section}`
              : "An alternative way through"}
          </p>
          <h1 id="backrooms-title">
            {panel === "room" ? (
              room?.title
            ) : panel === "welcome" ? (
              <>
                Behind the
                <br />
                wallpaper.
              </>
            ) : (
              "Still here."
            )}
          </h1>
          <p className={styles.intro}>
            {panel === "room"
              ? room?.description
              : panel === "welcome"
                ? "The same portfolio, a different place. Wander through the work, the experience, and a few rooms that lead nowhere in particular."
                : "The corridors can wait. Pick up where you left off, or find your way back to the entrance."}
          </p>
          {panel === "room" ? (
            <div className={styles.notes}>
              {room?.items.map((item) => (
                <article key={item.title}>
                  <h2>{item.title}</h2>
                  <p>{item.detail}</p>
                  {item.href && (
                    <a
                      href={item.href}
                      target={
                        item.href.startsWith("https:") ? "_blank" : undefined
                      }
                      rel={
                        item.href.startsWith("https:")
                          ? "noreferrer"
                          : undefined
                      }
                    >
                      {item.href === "/"
                        ? "Return to the website"
                        : "Open link"}{" "}
                      <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.instructions}>
              <div>
                <span>{touch ? "Left thumb" : "W A S D"}</span>
                <p>Walk</p>
              </div>
              <div>
                <span>{touch ? "Drag" : "Mouse"}</span>
                <p>Look around</p>
              </div>
              <div>
                <span>{touch ? "Pause" : "Esc"}</span>
                <p>Take a break</p>
              </div>
            </div>
          )}
          {error && (
            <p role="alert" className={styles.error}>
              {error}
            </p>
          )}
          <button
            autoFocus
            type="button"
            className={styles.enter}
            onClick={enter}
            disabled={!ready}
          >
            {sceneFailed
              ? "Room unavailable"
              : !ready
                ? "Turning on the lights..."
                : panel === "welcome"
                  ? "Step inside"
                  : "Keep walking"}
            <span aria-hidden="true">→</span>
          </button>
          {panel !== "room" && (
            <details className={styles.settings}>
              <summary>Comfort & world settings</summary>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={sound}
                  onChange={(event) => setSound(event.target.checked)}
                />{" "}
                Fluorescent hum
              </label>
              {!touch && (
                <label className={styles.toggle}>
                  <input
                    type="checkbox"
                    checked={dragMode}
                    onChange={(event) => setDragMode(event.target.checked)}
                  />{" "}
                  Drag to look instead of capturing the mouse
                </label>
              )}
              <label className={styles.field}>
                Rendering
                <select
                  value={quality}
                  onChange={(event) =>
                    setQuality(event.target.value as "low" | "high")
                  }
                >
                  <option value="high">Full detail</option>
                  <option value="low">Lighter rendering</option>
                </select>
              </label>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  reset(seedInput.trim() || DEFAULT_SEED);
                }}
              >
                <label className={styles.field}>
                  World seed
                  <input
                    maxLength={80}
                    value={seedInput}
                    onChange={(event) => setSeedInput(event.target.value)}
                  />
                </label>
                <p>The rooms stay put. The corridors beyond them change.</p>
                <button type="submit" className={styles.textButton}>
                  Rebuild & return to entrance
                </button>
              </form>
              <button
                type="button"
                className={styles.textButton}
                onClick={() => reset(seed)}
              >
                Return to entrance
              </button>
            </details>
          )}
        </div>
        <div className={styles.menuBottom}>
          <span>Take your time. Nothing is chasing you.</span>
          <span>
            {visited.length} / {ROOMS.length - 1} rooms found
          </span>
        </div>
      </dialog>
    </main>
  );
}
