import { useTexture } from "@react-three/drei";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import {
  CELL_SIZE,
  CHUNK_SIZE,
  FURNITURE,
  ROOMS,
  WALL_HEIGHT,
  cellWalls,
  chunkAt,
  isCellOpen,
  noise,
  type Point,
  type Room,
  type Solid,
} from "./world";

type Vec3 = [number, number, number];
const SURFACES = [
  "/backrooms/textures/wallpaper001c/Wallpaper001C_1K-JPG_Color.jpg",
  "/backrooms/textures/carpet011/Carpet011_1K-JPG_Color.jpg",
  "/backrooms/textures/officeceiling001/OfficeCeiling001_1K-JPG_Color.jpg",
];
const PICTURES = Array.from(
  new Set(
    ROOMS.flatMap((room) =>
      room.items.flatMap((item) => (item.image ? [item.image] : [])),
    ),
  ),
);
const TEXTURES = [...SURFACES, ...PICTURES];

function wallpaperShader(
  shader: Parameters<THREE.MeshStandardMaterial["onBeforeCompile"]>[0],
) {
  const varyings = `
    varying vec3 wallpaperPosition;
    varying vec3 wallpaperNormal;
  `;
  shader.vertexShader = shader.vertexShader
    .replace("#include <common>", `#include <common>\n${varyings}`)
    .replace(
      "#include <begin_vertex>",
      `
      #include <begin_vertex>
      vec4 paperPosition = vec4(transformed, 1.0);
      #ifdef USE_INSTANCING
        paperPosition = instanceMatrix * paperPosition;
      #endif
      wallpaperPosition = (modelMatrix * paperPosition).xyz;
      wallpaperNormal = normal;
    `,
    );
  shader.fragmentShader = shader.fragmentShader
    .replace(
      "#include <common>",
      `
      #include <common>
      ${varyings}
      float paperHash(vec2 p) {
        vec3 q = fract(vec3(p.xyx) * 0.1031);
        q += dot(q, q.yzx + 33.33);
        return fract((q.x + q.y) * q.z);
      }
      float paperNoise(vec2 p) {
        vec2 cell = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(paperHash(cell), paperHash(cell + vec2(1.0, 0.0)), f.x),
          mix(paperHash(cell + vec2(0.0, 1.0)), paperHash(cell + vec2(1.0)), f.x),
          f.y
        );
      }
    `,
    )
    .replace(
      "#include <map_fragment>",
      `
      float horizontal = abs(wallpaperNormal.x) > 0.5 ? wallpaperPosition.z : wallpaperPosition.x;
      float plane = abs(wallpaperNormal.x) > 0.5 ? wallpaperPosition.x : wallpaperPosition.z;
      vec2 paper = vec2(horizontal, wallpaperPosition.y);
      // Match the smaller motif scale in meters, even on thin jambs and long dividers.
      vec2 wallUv = paper * vec2(1.5, 1.388889);
      wallUv.y += paperHash(vec2(floor(wallUv.x), floor(plane * 1.5))) * 0.7;
      if (abs(wallpaperNormal.y) > 0.5) wallUv = wallpaperPosition.xz * 1.5;
      ${THREE.ShaderChunk.map_fragment.replace("vMapUv", "wallUv")}
      vec2 field = paper * vec2(0.18, 0.35) + plane * vec2(0.113, 0.073);
      float mottling = paperNoise(field) * 0.65 + paperNoise(field * 3.1) * 0.35;
      float age = smoothstep(0.48, 0.82, mottling);
      float damp = (1.0 - smoothstep(0.04, 0.7 + paperNoise(field + 9.0) * 0.5, wallpaperPosition.y)) * 0.13;
      float streak = smoothstep(0.67, 0.9, paperNoise(vec2(horizontal * 3.8 + plane, wallpaperPosition.y * 0.65)))
        * smoothstep(0.1, 0.85, paperNoise(field + 15.0)) * 0.1;
      diffuseColor.rgb *= mix(vec3(1.02, 1.01, 0.97), vec3(0.77, 0.74, 0.64), age);
      diffuseColor.rgb *= 1.0 - damp - streak;
    `,
    );
}

/** Instanced architecture is deliberately separate from the replaceable room props. */
function Boxes({
  boxes,
  color,
  map,
  emissive = false,
  wallpaper = false,
}: {
  boxes: Solid[];
  color: string;
  map?: THREE.Texture;
  emissive?: boolean;
  wallpaper?: boolean;
}) {
  const ref = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const matrix = new THREE.Matrix4();
    const tint = new THREE.Color();
    boxes.forEach((box, index) => {
      matrix.makeScale(box.width, box.height, box.depth);
      matrix.setPosition(box.x, box.y, box.z);
      mesh.setMatrixAt(index, matrix);
      mesh.setColorAt(index, tint.set(box.color ?? "#ffffff"));
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [boxes]);
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, boxes.length]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        {...(wallpaper ? { onBeforeCompile: wallpaperShader } : {})}
        color={color}
        map={map}
        roughness={0.94}
        emissive={emissive ? "#fff2c1" : color}
        emissiveIntensity={emissive ? 1.2 : 0.065}
        toneMapped={!emissive}
      />
    </instancedMesh>
  );
}

function Box({
  position,
  size,
  color = "#69634c",
}: {
  position: Vec3;
  size: Vec3;
  color?: string;
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.85} />
    </mesh>
  );
}

/** Physical printed paper, not HTML or a remotely downloaded font. Canvas textures
 * belong to each mounted plaque and are disposed when its room leaves the world. */
function Plaque({
  title,
  detail = "",
  image,
  position,
  width,
  height,
  rotation = 0,
}: {
  title: string;
  detail?: string;
  image?: THREE.Texture;
  position: Vec3;
  width: number;
  height: number;
  rotation?: number;
}) {
  const [texture, setTexture] = useState<THREE.CanvasTexture>();
  useLayoutEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = Math.min(2048, Math.round(width * 360));
    canvas.height = Math.round((canvas.width * height) / width);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    const pad = Math.min(w * 0.065, h * 0.09);
    ctx.fillStyle = "#e6debd";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#27271e";
    ctx.textBaseline = "top";
    let fontSize = !detail && !image ? h * 0.52 : Math.min(w * 0.079, h * 0.12);
    ctx.font = `600 ${fontSize}px Arial, Helvetica, sans-serif`;
    while (ctx.measureText(title).width > w - pad * 2 && fontSize > 12) {
      fontSize -= 1;
      ctx.font = `600 ${fontSize}px Arial, Helvetica, sans-serif`;
    }
    ctx.fillText(title, pad, !detail && !image ? (h - fontSize) / 2 : pad);
    let y = pad + fontSize * 1.45;
    if (detail || image) {
      ctx.fillRect(pad, y, w - pad * 2, 2);
      y += pad * 0.5;
    }
    if (image?.image) {
      const source = image.image as HTMLImageElement;
      const imageHeight = h * 0.34;
      const scale = Math.min(
        (w - pad * 2) / source.width,
        imageHeight / source.height,
      );
      ctx.drawImage(
        source,
        (w - source.width * scale) / 2,
        y,
        source.width * scale,
        source.height * scale,
      );
      y += imageHeight + pad * 0.6;
    }
    if (detail) {
      let bodySize = Math.min(w * 0.048, h * 0.068);
      let lines: string[] = [];
      // Fit the complete copy; explicit newlines keep directories and contact lists scanable.
      do {
        ctx.font = `${bodySize}px Arial, Helvetica, sans-serif`;
        lines = [];
        for (const paragraph of detail.split("\n")) {
          let line = "";
          for (const word of paragraph.split(/\s+/)) {
            const candidate = line ? `${line} ${word}` : word;
            if (line && ctx.measureText(candidate).width > w - pad * 2) {
              lines.push(line);
              line = word;
            } else line = candidate;
          }
          lines.push(line);
        }
        if (lines.length * bodySize * 1.35 <= h - y - pad) break;
        bodySize -= 1;
      } while (bodySize > 12);
      for (const line of lines) {
        ctx.fillText(line, pad, y);
        y += bodySize * 1.35;
      }
    }
    const printed = new THREE.CanvasTexture(canvas);
    printed.colorSpace = THREE.SRGBColorSpace;
    printed.anisotropy = 4;
    setTexture(printed);
    return () => printed.dispose();
  }, [detail, height, image, title, width]);

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <Box
        position={[0, 0, -0.045]}
        size={[width + 0.1, height + 0.1, 0.09]}
        color="#514833"
      />
      <mesh position={[0, 0, 0.006]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial
          map={texture}
          color={texture ? "#ffffff" : "#e6debd"}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function Bench({ solid }: { solid: Solid }) {
  return (
    <group position={[solid.x, 0, solid.z]}>
      <Box
        position={[0, 0.46, 0]}
        size={[solid.width, 0.08, solid.depth]}
        color="#766043"
      />
      {[-1, 1].map((side) => (
        <Box
          key={side}
          position={[side * (solid.width / 2 - 0.22), 0.23, 0]}
          size={[0.12, 0.46, solid.depth * 0.8]}
          color="#45463b"
        />
      ))}
    </group>
  );
}

/** Model replacement boundary: swap only this room-local dressing for future GLBs.
 * Keep wall plaques, doorway clearances, and world.ts FURNITURE footprints intact.
 * No asset may move the player, add a terminal, or change the architecture. */
function RoomContents({
  room,
  images,
}: {
  room: Room;
  images: Record<string, THREE.Texture>;
}) {
  const furniture = FURNITURE[room.id] ?? [];
  const halfWidth = room.width / 2;
  const halfDepth = room.depth / 2;
  return (
    <group position={[room.x, 0, room.z]}>
      <Plaque
        title={`${room.number} / ${room.title.toUpperCase()}`}
        position={[0, 3.26, -halfDepth + 0.22]}
        width={7}
        height={0.42}
      />
      {room.id === "reception" && (
        <>
          <Plaque
            title="NIC TOPORCOV / DIRECTORY"
            detail={
              "Front-End Designer & Developer. Officially a UI Architect.\n\n101   PROJECTS          Ahead, right-hand doorway\n102   EMPLOYMENT     Right\n103   MAINTENANCE    Left\n104   ABOUT                 Left, then left\n105   CONTACT             Right, then right"
            }
            position={[-1.4, 1.86, -halfDepth + 0.22]}
            width={5.7}
            height={2.1}
          />
          <Plaque
            title="THE LIGHTS ARE STILL ON"
            detail={
              "A portfolio you can walk through.\nEvery room contains a different part of the story.\nKeep walking. The corridors continue beyond the directory."
            }
            position={[-halfWidth + 0.22, 1.85, -3.2]}
            rotation={Math.PI / 2}
            width={3.4}
            height={1.6}
          />
        </>
      )}
      {room.id === "projects" && (
        <>
          {room.items.map((item, index) => (
            <Plaque
              key={item.title}
              title={item.title}
              detail={item.detail}
              image={images[item.image]}
              position={[
                index < 2 ? -halfWidth + 0.22 : halfWidth - 0.22,
                1.75,
                index % 2 ? 2.8 : -2.8,
              ]}
              rotation={index < 2 ? Math.PI / 2 : -Math.PI / 2}
              width={2.65}
              height={2.5}
            />
          ))}
          {furniture.map((solid, i) => (
            <Bench solid={solid} key={i} />
          ))}
          <Box
            position={[0, 3.19, 2]}
            size={[0.08, 0.75, 0.08]}
            color="#514e3d"
          />
          <Box
            position={[0, 2.78, 2]}
            size={[0.75, 0.25, 0.55]}
            color="#b1ad98"
          />
          <mesh position={[0, 2.78, 1.69]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.14, 16]} />
            <meshStandardMaterial color="#22251e" roughness={0.3} />
          </mesh>
          <Plaque
            title="SHIPPED WORK / 01 - 04"
            detail="OpenClient  /  Vini  /  iQbit  /  Coinbase NFT"
            position={[-3.3, 2, -halfDepth + 0.22]}
            width={2.4}
            height={0.85}
          />
        </>
      )}
      {room.id === "experience" && (
        <>
          {furniture.map((solid, index) => (
            <group key={index}>
              <Box
                position={[solid.x, solid.y, solid.z]}
                size={[solid.width, solid.height, solid.depth]}
                color="#747460"
              />
              {[0.25, 0.65, 1.05].map((y) => (
                <group key={y}>
                  <Box
                    position={[solid.x, y, solid.z + solid.depth / 2 + 0.02]}
                    size={[1.72, 0.35, 0.045]}
                    color="#8c8b72"
                  />
                  <Box
                    position={[
                      solid.x,
                      y - 0.03,
                      solid.z + solid.depth / 2 + 0.08,
                    ]}
                    size={[0.42, 0.04, 0.07]}
                    color="#3e4037"
                  />
                </group>
              ))}
              <Plaque
                title={room.items[index].title}
                position={[solid.x, 1.13, solid.z + solid.depth / 2 + 0.1]}
                width={1.42}
                height={0.2}
              />
              <Plaque
                title={room.items[index].title}
                detail={room.items[index].detail}
                position={[solid.x, 2.18, -halfDepth + 0.22]}
                width={2.38}
                height={1.58}
              />
            </group>
          ))}
          <Plaque
            title="EARLIER RECORD / 2015 - 2016"
            detail={
              "Jacksonville Business Journal\nGraphic Designer. Digital ads and client landing pages."
            }
            position={[halfWidth - 0.22, 1.85, -2.8]}
            rotation={-Math.PI / 2}
            width={3.2}
            height={1.5}
          />
        </>
      )}
      {room.id === "skills" && (
        <>
          {furniture.map((solid, index) => (
            <group key={index}>
              <Box
                position={[solid.x, 0.72, solid.z]}
                size={[solid.width, 1.44, solid.depth]}
                color={index % 2 ? "#727963" : "#85816a"}
              />
              <Box
                position={[solid.x, 0.87, solid.z + solid.depth / 2 + 0.03]}
                size={[1.36, 0.95, 0.08]}
                color="#b3b09a"
              />
              {[0, 1, 2].map((slot) => (
                <Box
                  key={slot}
                  position={[
                    solid.x,
                    0.51 + slot * 0.12,
                    solid.z + solid.depth / 2 + 0.09,
                  ]}
                  size={[0.95, 0.035, 0.03]}
                  color="#4d5143"
                />
              ))}
              <mesh
                position={[
                  solid.x - 0.3,
                  1.11,
                  solid.z + solid.depth / 2 + 0.11,
                ]}
                rotation={[Math.PI / 2, 0, 0]}
              >
                <cylinderGeometry args={[0.12, 0.12, 0.06, 12]} />
                <meshStandardMaterial color="#42473a" />
              </mesh>
              <Box
                position={[
                  solid.x + 0.3,
                  1.13,
                  solid.z + solid.depth / 2 + 0.12,
                ]}
                size={[0.13, 0.23, 0.05]}
                color="#776047"
              />
              <Plaque
                title={room.items[index].title}
                detail={room.items[index].detail}
                position={[solid.x, 2.22, -halfDepth + 0.22]}
                width={1.92}
                height={1.52}
              />
            </group>
          ))}
          <Box
            position={[-halfWidth + 0.15, 2.65, -2.6]}
            size={[0.12, 0.12, 4.4]}
            color="#807c62"
          />
          <Box
            position={[-halfWidth + 0.15, 1.52, -0.45]}
            size={[0.12, 2.35, 0.12]}
            color="#807c62"
          />
        </>
      )}
      {room.id === "about" && (
        <>
          <Plaque
            title={room.items[0].title}
            detail={room.items[0].detail}
            image={images[room.items[0].image]}
            position={[-3.15, 1.75, -halfDepth + 0.22]}
            width={2.65}
            height={2.5}
          />
          <Plaque
            title="OFF THE CLOCK"
            detail={`${room.items[1].detail}\n\n${room.items[2].detail}\n\nlunicvisuals.com`}
            position={[3.15, 1.9, -halfDepth + 0.22]}
            width={2.7}
            height={2.05}
          />
          <Box
            position={[-2.5, 0.75, 1.5]}
            size={[2.8, 0.1, 1.5]}
            color="#89724c"
          />
          {[-3.6, -1.4].flatMap((x) =>
            [1, 2].map((z) => (
              <Box
                key={`${x}:${z}`}
                position={[x, 0.37, z]}
                size={[0.12, 0.74, 0.12]}
                color="#45463b"
              />
            )),
          )}
          {furniture.slice(1).map((solid, i) => (
            <Bench key={i} solid={solid} />
          ))}
          {[0, 1].map((i) => (
            <mesh key={i} position={[-3.1 + i * 1.15, 0.91, 1.5]}>
              <cylinderGeometry args={[0.09, 0.075, 0.22, 12]} />
              <meshStandardMaterial color="#ded5b6" />
            </mesh>
          ))}
        </>
      )}
      {room.id === "contact" && (
        <>
          <Box
            position={[-4.2, 1.18, -halfDepth + 0.65]}
            size={[1.1, 2.1, 0.75]}
            color="#666957"
          />
          <Box
            position={[-4.2, 1.5, -halfDepth + 1.06]}
            size={[0.84, 1.05, 0.09]}
            color="#b0ad98"
          />
          <Box
            position={[-4.43, 1.59, -halfDepth + 1.22]}
            size={[0.13, 0.5, 0.15]}
            color="#272b24"
          />
          {[1.32, 1.86].map((y) => (
            <Box
              key={y}
              position={[-4.43, y, -halfDepth + 1.26]}
              size={[0.28, 0.15, 0.22]}
              color="#272b24"
            />
          ))}
          {[0, 1, 2].flatMap((col) =>
            [0, 1, 2, 3].map((row) => (
              <Box
                key={`${col}:${row}`}
                position={[
                  -4.15 + col * 0.1,
                  1.7 - row * 0.12,
                  -halfDepth + 1.16,
                ]}
                size={[0.07, 0.075, 0.04]}
                color="#4e5047"
              />
            )),
          )}
          <Plaque
            title="CONTACT"
            position={[-4.2, 2.43, -halfDepth + 0.96]}
            width={1.35}
            height={0.35}
          />
          <Plaque
            title="KEEP IN TOUCH"
            detail={room.items
              .map((item) => `${item.title.toUpperCase()}\n${item.detail}`)
              .join("\n\n")}
            position={[halfWidth - 0.22, 1.85, -2.7]}
            rotation={-Math.PI / 2}
            width={4.4}
            height={2.4}
          />
          <Box
            position={[3.4, 1.43, halfDepth - 0.22]}
            size={[2.12, 2.86, 0.14]}
            color="#564e39"
          />
          <Box
            position={[3.4, 1.37, halfDepth - 0.33]}
            size={[1.9, 2.65, 0.1]}
            color="#7e8068"
          />
          <Box
            position={[3.4, 1.12, halfDepth - 0.43]}
            size={[1.5, 0.09, 0.12]}
            color="#353b32"
          />
          <Plaque
            title="EXIT / PORTFOLIO"
            position={[3.4, 3.08, halfDepth - 0.34]}
            rotation={Math.PI}
            width={2.15}
            height={0.38}
          />
          <Plaque
            title="THE NORMAL WEBSITE"
            detail={
              "Return to the portfolio at /.\nFind the link in this room's details."
            }
            position={[3.4, 1.97, halfDepth - 0.42]}
            rotation={Math.PI}
            width={1.52}
            height={0.72}
          />
        </>
      )}
    </group>
  );
}

export default function World({
  seed,
  position,
  quality,
  onReady,
}: {
  seed: number;
  position: Point;
  quality: "low" | "high";
  onReady: () => void;
}) {
  const loaded = useTexture(TEXTURES);
  const chunk = chunkAt(position);
  const environment = useMemo(() => {
    const floors: Solid[] = [];
    const ceilings: Solid[] = [];
    const walls: Solid[] = [];
    const fixtures: Solid[] = [];
    const housings: Solid[] = [];
    // A complete 3 x 3 neighborhood. Fog ends before the nearest unloaded edge.
    for (
      let x = (chunk.x - 1) * CHUNK_SIZE;
      x < (chunk.x + 2) * CHUNK_SIZE;
      x++
    ) {
      for (
        let z = (chunk.z - 1) * CHUNK_SIZE;
        z < (chunk.z + 2) * CHUNK_SIZE;
        z++
      ) {
        if (!isCellOpen(x, z, seed)) continue;
        const wx = x * CELL_SIZE;
        const wz = z * CELL_SIZE;
        const age = noise(x, z, seed + 101);
        floors.push({
          x: wx,
          y: -0.06,
          z: wz,
          width: CELL_SIZE,
          height: 0.12,
          depth: CELL_SIZE,
          color: age > 0.8 ? "#c5bd94" : "#ffffff",
        });
        ceilings.push({
          x: wx,
          y: WALL_HEIGHT + 0.06,
          z: wz,
          width: CELL_SIZE,
          height: 0.12,
          depth: CELL_SIZE,
        });
        walls.push(...cellWalls(x, z, seed));
        if (noise(x, z, seed + 211) < 0.35) {
          const fixtureX = wx + (noise(x, z, seed + 307) - 0.5) * 1.2;
          const fixtureZ = wz + (noise(x, z, seed + 419) - 0.5) * 1.2;
          const alongX = noise(x, z, seed + 541) < 0.5;
          housings.push({
            x: fixtureX,
            y: 3.49,
            z: fixtureZ,
            width: alongX ? 1.9 : 0.7,
            height: 0.17,
            depth: alongX ? 0.7 : 1.9,
          });
          fixtures.push({
            x: fixtureX,
            y: 3.395,
            z: fixtureZ,
            width: alongX ? 1.65 : 0.46,
            height: 0.025,
            depth: alongX ? 0.46 : 1.65,
            color: age > 0.94 ? "#79745d" : "#ffffff",
          });
        }
      }
    }
    const rooms = ROOMS.filter((room) => {
      const center = chunkAt(room);
      return (
        Math.abs(center.x - chunk.x) <= 1 && Math.abs(center.z - chunk.z) <= 1
      );
    });
    return { floors, ceilings, walls, fixtures, housings, rooms };
  }, [chunk.x, chunk.z, seed]);
  const images = useMemo(
    () =>
      Object.fromEntries(
        PICTURES.map((path, index) => [path, loaded[index + SURFACES.length]]),
      ),
    [loaded],
  );

  useLayoutEffect(() => {
    loaded.forEach((texture, index) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = quality === "high" ? 4 : 1;
      if (index < SURFACES.length) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        // Wallpaper uses world-space UVs in wallpaperShader instead of per-box repeats.
        texture.repeat.set(index === 0 ? 1 : 3, index === 0 ? 1 : 3);
      }
      texture.needsUpdate = true;
    });
  }, [loaded, quality]);

  useEffect(() => {
    // useTexture suspends until every local image is decoded; plaques build in layout effects.
    onReady();
  }, [loaded, onReady]);

  const lights = [...environment.rooms]
    .sort(
      (a, b) =>
        Math.hypot(a.x - position.x, a.z - position.z) -
        Math.hypot(b.x - position.x, b.z - position.z),
    )
    .filter((room) => Math.hypot(room.x - position.x, room.z - position.z) < 32)
    .slice(0, quality === "high" ? 4 : 2);

  return (
    <>
      <fog attach="fog" args={["#777052", 18, 43]} />
      <color attach="background" args={["#777052"]} />
      <Boxes boxes={environment.floors} color="#b4a575" map={loaded[1]} />
      <Boxes boxes={environment.ceilings} color="#d6d0ac" map={loaded[2]} />
      <Boxes
        boxes={environment.walls}
        color="#d7c578"
        map={loaded[0]}
        wallpaper
      />
      <Boxes boxes={environment.housings} color="#7d7965" />
      <Boxes boxes={environment.fixtures} color="#fff1c0" emissive />
      {environment.rooms.map((room) => (
        <RoomContents key={room.id} room={room} images={images} />
      ))}
      {lights.map((room) => (
        <pointLight
          key={room.id}
          position={[room.x, 3.12, room.z]}
          color="#fff0bd"
          intensity={quality === "high" ? 16 : 12}
          distance={13}
          decay={2}
        />
      ))}
    </>
  );
}
