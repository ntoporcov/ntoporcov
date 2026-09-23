export type Point = { x: number; z: number };

export type Room = {
  id: string;
  number: string;
  title: string;
  section: string;
  description: string;
  x: number;
  z: number;
  width: number;
  depth: number;
  items: { title: string; detail: string; href?: string; image?: string }[];
};

export const CELL_SIZE = 4;
/** Cells per chunk, not meters. Cell centers lie on multiples of CELL_SIZE. */
export const CHUNK_SIZE = 12;
export const DEFAULT_SEED = "the-lights-are-still-on";
export const WALL_HEIGHT = 3.6;
export const WALL_THICKNESS = 0.18;
export const PLAYER_RADIUS = 0.3;

export const ROOMS: Room[] = [
  {
    id: "reception",
    number: "100",
    title: "Reception",
    section: "Directory",
    description:
      "Nic Toporcov / Front-End Designer & Developer. A directory of work, tools, and the person behind the pixels.",
    x: 0,
    z: 0,
    width: 12,
    depth: 12,
    items: [
      {
        title: "101 / Projects gallery",
        detail:
          "Ahead, through the right-hand doorway. OpenClient, Vini, iQbit, Coinbase NFT.",
      },
      {
        title: "102 / Employment archive",
        detail: "Right. RF-SMART, Coinbase, Transcor Data Services, Gleanview.",
      },
      {
        title: "103 / Maintenance",
        detail:
          "Left. TypeScript, React, Three.js, native apps, interface systems.",
      },
      {
        title: "104 / Break room",
        detail: "Left, then left. Meet Nic, the pixel guy.",
      },
      {
        title: "105 / Contact & exit",
        detail:
          "Right, then right. Email, GitHub, LinkedIn, and the normal website.",
      },
    ],
  },
  {
    id: "projects",
    number: "101",
    title: "Projects Gallery",
    section: "Projects",
    description:
      "Four shipped projects. Native companions, local services, downloads, and social surfaces.",
    x: 4,
    z: -24,
    width: 20,
    depth: 12,
    items: [
      {
        title: "OpenClient",
        detail:
          "Native iOS / iPad companion for self-hosted OpenCode servers. Browse projects, resume chats, approve permissions, and follow progress with Live Activities and widgets. Built with SwiftUI and UIKit.",
        href: "https://apps.apple.com/us/app/openclient-for-opencode/id6744919498",
        image: "/backrooms/posters/openclient-chat.png",
      },
      {
        title: "Vini",
        detail:
          "A macOS menu bar command center for local dev services. Discovers Homebrew, launchd, and listening ports. Start and stop services at a glance. Pure SwiftUI + AppKit; distributed through Homebrew.",
        href: "https://github.com/ntoporcov/vini",
        image: "/backrooms/posters/vini-app-window.png",
      },
      {
        title: "iQbit",
        detail:
          "An installable PWA for managing qBittorrent downloads on phone or desktop. A custom React web interface that polls the qBittorrent API and manages downloads through HTTP requests. Open source.",
        href: "https://github.com/ntoporcov/iQbit",
        image: "/backrooms/posters/iqbit-devices.png",
      },
      {
        title: "Coinbase NFT",
        detail:
          "NFT marketplace social surfaces: led front-end work on comments and profile pages. Built with React / Next.js, GraphQL, Relay, and Tailwind CSS as part of the Social team.",
        href: "https://nft.coinbase.com",
        image: "/backrooms/posters/cb-nft.png",
      },
    ],
  },
  {
    id: "experience",
    number: "102",
    title: "Employment Archive",
    section: "Experience",
    description: "Work records / design, development, and shipped interfaces.",
    x: 28,
    z: 0,
    width: 12,
    depth: 20,
    items: [
      {
        title: "RF-SMART",
        detail:
          "Senior UI Architect / July 2022 - present. Lead developer and designer for Shipping front-end products; advise other teams on user experience, interfaces, and interactions. Previously React Developer II, 2021 - 2022.",
        image: "/backrooms/posters/rfsmart.png",
      },
      {
        title: "Coinbase",
        detail:
          "Software Engineer / February - July 2022. Social team on Coinbase NFT. Front-end lead for comments and profile pages in the new marketplace experience.",
        image: "/backrooms/posters/coinbase-cover.jpg",
      },
      {
        title: "Transcor Data Services",
        detail:
          "Front-End Designer & Developer / 2019 - 2021. Kiosks, mobile apps, e-ticketing, and admin tools. Hardware SDK integration, build debugging, and new project setup.",
        image: "/backrooms/posters/tds-logo.png",
      },
      {
        title: "Gleanview",
        detail:
          "Front-End Designer & Developer / 2016 - 2019. CRM product screens and interactions, marketing sites, landing pages, and branding guidelines for child apps.",
      },
    ],
  },
  {
    id: "skills",
    number: "103",
    title: "Maintenance",
    section: "Skills",
    description:
      "How I move pixels / tools used to build and maintain interfaces.",
    x: -24,
    z: -8,
    width: 12,
    depth: 12,
    items: [
      {
        title: "TypeScript",
        detail:
          "The default language for serious front-end work. A no-brainer for every project.",
      },
      {
        title: "React",
        detail:
          "Working with React since 2016 and class components. Ticketing portals, kiosks, Coinbase NFT, shipping applications, and personal projects.",
      },
      {
        title: "Three.js",
        detail:
          "Interactive and weird browser experiences. Turning the browser into something you can explore.",
      },
      {
        title: "iOS / macOS",
        detail:
          "SwiftUI, UIKit, AppKit, and React Native. Platform-native polish, from mobile companions to menu bar utilities.",
      },
      {
        title: "Interface Systems",
        detail:
          "Tailwind CSS, Radix, shadcn, Figma, design systems, and UI architecture. Next.js for server rendering and static sites.",
      },
    ],
  },
  {
    id: "about",
    number: "104",
    title: "Break Room",
    section: "About",
    description: "Meet the person behind the pixels.",
    x: -16,
    z: 24,
    width: 20,
    depth: 12,
    items: [
      {
        title: "Nic Toporcov",
        detail:
          "Front-End Designer and Developer. Officially a UI Architect at RF-SMART; spiritually a pixel guy.",
        image: "/backrooms/posters/avatar.jpg",
      },
      {
        title: "Timeline",
        detail:
          "Working as a UI / UX Designer since 2014 and as a Front-End Developer since 2015.",
      },
      {
        title: "Lunic Visuals",
        detail:
          "On Saturdays and Sundays, you might find me shooting a wedding for Lunic Visuals.",
        href: "https://www.lunicvisuals.com",
      },
    ],
  },
  {
    id: "contact",
    number: "105",
    title: "Contact & Exit",
    section: "Contact",
    description:
      "A phone beside the exit. The normal website is still up there somewhere.",
    x: 24,
    z: 28,
    width: 12,
    depth: 12,
    items: [
      {
        title: "Email",
        detail:
          "ntoporcov@me.com / Email me if the lights start buzzing in sync.",
        href: "mailto:ntoporcov@me.com",
      },
      {
        title: "GitHub",
        detail:
          "github.com/ntoporcov / Code, experiments, and open-source apps.",
        href: "https://github.com/ntoporcov",
      },
      {
        title: "LinkedIn",
        detail: "linkedin.com/in/ntoporcov / Professional paper trail.",
        href: "https://www.linkedin.com/in/ntoporcov/",
      },
      {
        title: "Exit to Portfolio",
        detail:
          "The normal website is still up there somewhere. Return to the portfolio at /.",
        href: "/",
      },
    ],
  },
];

export function hashSeed(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++)
    hash = Math.imul(hash ^ value.charCodeAt(i), 16777619);
  return hash >>> 0;
}

export function noise(x: number, z: number, seed: number): number {
  let hash = Math.imul(x, 374761393) ^ Math.imul(z, 668265263) ^ seed;
  hash = Math.imul(hash ^ (hash >>> 13), 1274126177);
  return ((hash ^ (hash >>> 16)) >>> 0) / 4294967296;
}

export function cellAt(value: number): number {
  return Math.floor((value + CELL_SIZE / 2) / CELL_SIZE);
}

export function chunkAt(position: Point): Point {
  return {
    x: Math.floor(cellAt(position.x) / CHUNK_SIZE),
    z: Math.floor(cellAt(position.z) / CHUNK_SIZE),
  };
}

export function roomAt(position: Point): Room | undefined {
  return ROOMS.find(
    (room) =>
      Math.abs(position.x - room.x) < room.width / 2 &&
      Math.abs(position.z - room.z) < room.depth / 2,
  );
}

const REGION_SIZE = 21;
const REGION_HALF = 10;
type Layout = {
  open: Set<string>;
  rooms: Map<string, string>;
  routes: Set<string>;
  widths: Map<string, number>;
};
const layouts = new Map<string, Layout>();

/** Regions share seeded edge portals, not straight global corridor spines.
 * Carving every branch back to a hub guarantees continuity across chunk seams. */
function layoutAt(x: number, z: number, seed: number): Layout {
  const rx = Math.floor((x + REGION_HALF) / REGION_SIZE);
  const rz = Math.floor((z + REGION_HALF) / REGION_SIZE);
  const cacheKey = `${seed}:${rx}:${rz}`;
  const cached = layouts.get(cacheKey);
  if (cached) return cached;
  const layout: Layout = {
    open: new Set(),
    rooms: new Map(),
    routes: new Set(),
    widths: new Map(),
  };
  const ox = rx * REGION_SIZE,
    oz = rz * REGION_SIZE;
  const core = rx === 0 && rz === 0;
  const roll = (salt: number) => noise(rx, rz, seed + salt);
  const key = (cx: number, cz: number) => `${cx + ox},${cz + oz}`;
  const nearExhibit = (cx: number, cz: number) =>
    core &&
    ROOMS.some(
      (room) =>
        Math.abs(cx * CELL_SIZE - room.x) < room.width / 2 + CELL_SIZE &&
        Math.abs(cz * CELL_SIZE - room.z) < room.depth / 2 + CELL_SIZE,
    );
  const add = (
    cx: number,
    cz: number,
    width: number,
    route = false,
    room?: string,
  ) => {
    if (Math.abs(cx) > REGION_HALF || Math.abs(cz) > REGION_HALF) return;
    if (
      !route &&
      !room &&
      (nearExhibit(cx, cz) || Math.abs(cx) > 8 || Math.abs(cz) > 8)
    )
      return;
    const cell = key(cx, cz);
    layout.open.add(cell);
    layout.widths.set(cell, Math.max(layout.widths.get(cell) ?? 0, width));
    if (route) layout.routes.add(cell);
    if (room) layout.rooms.set(cell, room);
  };
  const carveRoom = (
    cx: number,
    cz: number,
    halfX: number,
    halfZ: number,
    id: string,
    notched = false,
  ) => {
    for (let dx = -halfX; dx <= halfX; dx++) {
      for (let dz = -halfZ; dz <= halfZ; dz++) {
        if (notched && dx > 0 && dz < 0) continue;
        if (
          core &&
          !ROOMS.some((room) => room.id === id) &&
          nearExhibit(cx + dx, cz + dz)
        )
          continue;
        add(cx + dx, cz + dz, CELL_SIZE, false, id);
      }
    }
  };
  let branch = 0;
  const carvePath = (points: [number, number][], broad = false) => {
    const width = core
      ? 2 + roll(301 + branch++) * 1.7
      : 1.35 + roll(301 + branch++) * 2.5;
    for (let i = 1; i < points.length; i++) {
      const [ax, az] = points[i - 1],
        [bx, bz] = points[i];
      const length = Math.abs(bx - ax) + Math.abs(bz - az);
      for (let step = 0; step <= length; step++) {
        const cx = ax + Math.sign(bx - ax) * Math.min(step, Math.abs(bx - ax));
        const cz =
          az + Math.sign(bz - az) * Math.max(0, step - Math.abs(bx - ax));
        add(cx, cz, width, true);
        if (broad)
          for (const side of [-1, 1])
            add(
              cx + (az === bz ? 0 : side),
              cz + (az === bz ? side : 0),
              CELL_SIZE,
            );
      }
    }
  };
  const hub: [number, number] = core
    ? [0, 0]
    : [Math.floor(roll(11) * 9) - 4, Math.floor(roll(17) * 9) - 4];
  if (core) {
    for (const room of ROOMS)
      carveRoom(
        room.x / CELL_SIZE,
        room.z / CELL_SIZE,
        (room.width / CELL_SIZE - 1) / 2,
        (room.depth / CELL_SIZE - 1) / 2,
        room.id,
      );
    // Offset exhibit wings leave alcoves and awkward turns instead of a symmetric cross.
    carvePath([
      [0, 0],
      [1, 0],
      [1, -6],
    ]);
    carvePath(
      [
        [0, 0],
        [3, 0],
        [3, -1],
        [5, -1],
        [5, 0],
        [7, 0],
      ],
      true,
    );
    carvePath([
      [0, 0],
      [-3, 0],
      [-3, -2],
      [-6, -2],
    ]);
    carvePath(
      [
        [-6, -2],
        [-6, 2],
        [-4, 2],
        [-4, 6],
      ],
      true,
    );
    carvePath([
      [7, 0],
      [7, 4],
      [9, 4],
      [9, 7],
      [6, 7],
    ]);
    carvePath([
      [-4, 6],
      [0, 6],
      [0, 9],
      [6, 9],
      [6, 7],
    ]);
    carvePath([
      [0, 0],
      [0, 3],
      [-4, 3],
    ]);
    for (const [cx, cz, ax, az] of [
      [-2, -5, -3, -2],
      [3, 4, 0, 3],
      [-8, 2, -6, 2],
    ]) {
      carveRoom(
        cx,
        cz,
        1,
        roll(51 + cx) > 0.5 ? 2 : 1,
        `empty:${cx}:${cz}`,
        true,
      );
      carvePath([
        [ax, az],
        [cx, az],
        [cx, cz],
      ]);
    }
  } else {
    carveRoom(
      ...hub,
      1 + Math.floor(roll(23) * 3),
      1 + Math.floor(roll(29) * 4),
      `empty:${rx}:${rz}:main`,
      roll(31) > 0.4,
    );
    for (let i = 0; i < 3; i++) {
      const cx = Math.floor(roll(41 + i * 7) * 15) - 7;
      const cz = Math.floor(roll(43 + i * 7) * 15) - 7;
      carveRoom(
        cx,
        cz,
        Math.floor(roll(47 + i * 7) * 3),
        1 + Math.floor(roll(49 + i * 7) * 2),
        `empty:${rx}:${rz}:${i}`,
        roll(53 + i * 7) > 0.5,
      );
      carvePath([hub, [cx, hub[1]], [cx, cz]], roll(61 + i) > 0.7);
    }
  }
  const east = Math.floor(noise(rx, rz, seed + 81) * 15) - 7;
  const west = Math.floor(noise(rx - 1, rz, seed + 81) * 15) - 7;
  const south = Math.floor(noise(rx, rz, seed + 89) * 15) - 7;
  const north = Math.floor(noise(rx, rz - 1, seed + 89) * 15) - 7;
  if (core) {
    carvePath([
      [7, 0],
      [9, 0],
      [9, east],
      [10, east],
    ]);
    carvePath([
      [-6, -2],
      [-9, -2],
      [-9, west],
      [-10, west],
    ]);
    carvePath([
      [1, -6],
      [1, -9],
      [north, -9],
      [north, -10],
    ]);
    carvePath([
      [0, 9],
      [south, 9],
      [south, 10],
    ]);
  } else {
    const kneeX = 6 + Math.floor(roll(91) * 3),
      kneeZ = 6 + Math.floor(roll(97) * 3);
    carvePath(
      [hub, [kneeX, hub[1]], [kneeX, east], [10, east]],
      roll(103) > 0.7,
    );
    carvePath([hub, [-kneeX, hub[1]], [-kneeX, west], [-10, west]]);
    carvePath([hub, [hub[0], kneeZ], [south, kneeZ], [south, 10]]);
    carvePath(
      [hub, [hub[0], -kneeZ], [north, -kneeZ], [north, -10]],
      roll(107) > 0.65,
    );
  }
  // Side-room corners can be clipped around exhibits; discard isolated remnants.
  const reachable = new Set([key(...hub)]),
    queue = [hub];
  for (let i = 0; i < queue.length; i++) {
    const [cx, cz] = queue[i];
    for (const [dx, dz] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const cell = key(cx + dx, cz + dz);
      if (layout.open.has(cell) && !reachable.has(cell)) {
        reachable.add(cell);
        queue.push([cx + dx, cz + dz]);
      }
    }
  }
  layout.open = reachable;
  if (layouts.size >= 64) layouts.delete(layouts.keys().next().value!);
  layouts.set(cacheKey, layout);
  return layout;
}

export function isCellOpen(x: number, z: number, seed: number): boolean {
  return layoutAt(x, z, seed).open.has(`${x},${z}`);
}

function cellRoom(x: number, z: number, seed: number): string | undefined {
  return layoutAt(x, z, seed).rooms.get(`${x},${z}`);
}

export type Solid = {
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  depth: number;
  color?: string;
};

/** Render and collision use these exact wall boxes, including doorway jambs. */
const wallCache = new Map<string, Solid[]>();
export function cellWalls(x: number, z: number, seed: number): Solid[] {
  const cacheKey = `${seed}:${x}:${z}`;
  const cached = wallCache.get(cacheKey);
  if (cached) return cached;
  if (!isCellOpen(x, z, seed)) return [];
  const walls: Solid[] = [];
  const room = cellRoom(x, z, seed);
  const layout = layoutAt(x, z, seed);
  const inset = room
    ? 0
    : (CELL_SIZE - (layout.widths.get(`${x},${z}`) ?? CELL_SIZE)) / 2;
  for (const [dx, dz] of [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ]) {
    const neighborOpen = isCellOpen(x + dx, z + dz, seed);
    const neighborRoom = cellRoom(x + dx, z + dz, seed);
    const door =
      neighborOpen &&
      room &&
      neighborRoom !== room &&
      (!neighborRoom || room < neighborRoom);
    if (neighborOpen && !door) continue;
    const wx = x * CELL_SIZE + (dx * CELL_SIZE) / 2;
    const wz = z * CELL_SIZE + (dz * CELL_SIZE) / 2;
    if (!door) {
      walls.push({
        x: wx - (dx * inset) / 2,
        y: WALL_HEIGHT / 2,
        z: wz - (dz * inset) / 2,
        width: dx ? WALL_THICKNESS + inset : CELL_SIZE,
        height: WALL_HEIGHT,
        depth: dx ? CELL_SIZE : WALL_THICKNESS + inset,
      });
    } else {
      const opening = ROOMS.some((exhibit) => exhibit.id === room)
        ? 2.6
        : 1.3 + noise(x + dx, z + dz, seed + 401) * 1.8;
      const jamb = (CELL_SIZE - opening) / 2;
      for (const offset of [-1, 1]) {
        walls.push({
          x: wx + (dz ? (offset * (opening + jamb)) / 2 : 0),
          y: 1.8,
          z: wz + (dx ? (offset * (opening + jamb)) / 2 : 0),
          width: dx ? WALL_THICKNESS : jamb,
          height: WALL_HEIGHT,
          depth: dx ? jamb : WALL_THICKNESS,
        });
      }
      walls.push({
        x: wx,
        y: 3.1,
        z: wz,
        width: dx ? WALL_THICKNESS : opening,
        height: 1,
        depth: dx ? opening : WALL_THICKNESS,
      });
    }
  }
  const exhibit = ROOMS.find((candidate) => candidate.id === room);
  if (
    !layout.routes.has(`${x},${z}`) &&
    room &&
    (!exhibit || z * CELL_SIZE >= exhibit.z) &&
    noise(x, z, seed + 421) > (exhibit ? 0.55 : 0.66)
  ) {
    const alongX = noise(x, z, seed + 431) > 0.5;
    const length = 1.8 + noise(x, z, seed + 433) * (exhibit ? 0.8 : 3.4);
    const offset = noise(x, z, seed + 439) > 0.5 ? 0.95 : -0.95;
    const partition: Solid = {
      x: x * CELL_SIZE + (alongX ? 0 : offset),
      y: WALL_HEIGHT / 2,
      z: z * CELL_SIZE + (alongX ? offset : 0),
      width: alongX ? length : 0.22,
      height: WALL_HEIGHT,
      depth: alongX ? 0.22 : length,
    };
    // Keep exhibit furniture and its approach clear when dressing the room corners.
    const nearFurniture = OBSTACLES.some(
      (solid) =>
        Math.abs(solid.x - partition.x) <
          (solid.width + partition.width) / 2 + 0.8 &&
        Math.abs(solid.z - partition.z) <
          (solid.depth + partition.depth) / 2 + 0.8,
    );
    if (!nearFurniture) walls.push(partition);
    if (!exhibit && !nearFurniture && noise(x, z, seed + 443) > 0.65)
      walls.push({
        x: x * CELL_SIZE + (alongX ? length / 2 : offset + 0.5),
        y: WALL_HEIGHT / 2,
        z: z * CELL_SIZE + (alongX ? offset + 0.5 : length / 2),
        width: alongX ? 0.22 : 1,
        height: WALL_HEIGHT,
        depth: alongX ? 1 : 0.22,
      });
  }
  if (wallCache.size >= 8192) wallCache.delete(wallCache.keys().next().value!);
  wallCache.set(cacheKey, walls);
  return walls;
}

/** Model replacement boundary: replace visual props in Rooms.tsx, retaining these
 * floor footprints (or update both). Coordinates are room-local; centers stay clear. */
export const FURNITURE: Record<string, Solid[]> = {
  reception: [],
  projects: [
    { x: -2.9, y: 0.25, z: 1.4, width: 2.5, height: 0.5, depth: 0.7 },
    { x: 2.9, y: 0.25, z: 1.4, width: 2.5, height: 0.5, depth: 0.7 },
  ],
  experience: [-4.2, -1.4, 1.4, 4.2].map((x) => ({
    x,
    y: 0.65,
    z: -ROOMS.find((room) => room.id === "experience")!.depth / 2 + 0.95,
    width: 1.9,
    height: 1.3,
    depth: 1.1,
  })),
  skills: [-4.2, -2.1, 0, 2.1, 4.2].map((x) => ({
    x,
    y: 0.65,
    z: -5.05,
    width: 1.6,
    height: 1.3,
    depth: 0.9,
  })),
  about: [
    { x: -2.5, y: 0.4, z: 1.5, width: 2.8, height: 0.8, depth: 1.5 },
    { x: -2.5, y: 0.25, z: 3, width: 2.6, height: 0.5, depth: 0.6 },
    { x: -2.5, y: 0.25, z: 0, width: 2.6, height: 0.5, depth: 0.6 },
  ],
  contact: [
    { x: -4.2, y: 1.1, z: -5.15, width: 1.1, height: 2.2, depth: 1.15 },
    { x: 3.4, y: 1.43, z: 5.75, width: 2.12, height: 2.86, depth: 0.5 },
  ],
};

export const OBSTACLES: Solid[] = ROOMS.flatMap((room) =>
  (FURNITURE[room.id] ?? []).map((solid) => ({
    ...solid,
    x: room.x + solid.x,
    z: room.z + solid.z,
  })),
);

export function canStandAt(x: number, z: number, seed: number): boolean {
  if (!Number.isFinite(x) || !Number.isFinite(z)) return false;
  const intersects = (solid: Solid) => {
    if (solid.y - solid.height / 2 > 1.8) return false;
    const dx = Math.max(Math.abs(x - solid.x) - solid.width / 2, 0);
    const dz = Math.max(Math.abs(z - solid.z) - solid.depth / 2, 0);
    return dx * dx + dz * dz < PLAYER_RADIUS * PLAYER_RADIUS;
  };
  if (!isCellOpen(cellAt(x), cellAt(z), seed) || OBSTACLES.some(intersects))
    return false;
  // Adjacent cells own some jambs; test both sides of each cell boundary.
  for (let cx = cellAt(x) - 1; cx <= cellAt(x) + 1; cx++) {
    for (let cz = cellAt(z) - 1; cz <= cellAt(z) + 1; cz++) {
      if (cellWalls(cx, cz, seed).some(intersects)) return false;
    }
  }
  return true;
}
