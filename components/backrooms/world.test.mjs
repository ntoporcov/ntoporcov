import assert from "node:assert/strict";
import test from "node:test";
import {
  canStandAt,
  CELL_SIZE,
  cellAt,
  cellWalls,
  CHUNK_SIZE,
  chunkAt,
  DEFAULT_SEED,
  FURNITURE,
  hashSeed,
  isCellOpen,
  noise,
  PLAYER_RADIUS,
  ROOMS,
  roomAt,
  WALL_THICKNESS,
} from "./world.ts";

const REGION_SIZE = 21;
const REGION_HALF = (REGION_SIZE - 1) / 2;
const DIRECTIONS = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];
const SEEDS = [
  DEFAULT_SEED,
  "another-floor",
  "",
  "1234",
  ...Array.from({ length: 8 }, (_, i) => `irregular-${i}`),
];

// Sample endpoints and the entire edge at intervals smaller than the player
// diameter: open neighboring cells alone do not imply a walkable connection.
function canWalk(from, to, seed) {
  const steps = Math.ceil(Math.hypot(to[0] - from[0], to[1] - from[1]) / 0.25);
  for (let i = 0; i <= steps; i++) {
    const t = steps ? i / steps : 0;
    if (
      !canStandAt(
        from[0] + (to[0] - from[0]) * t,
        from[1] + (to[1] - from[1]) * t,
        seed,
      )
    )
      return false;
  }
  return true;
}

function regionPortals(rx, rz, seed) {
  const ox = rx * REGION_SIZE,
    oz = rz * REGION_SIZE;
  return DIRECTIONS.map(([dx, dz]) => {
    const offset =
      Math.floor(
        noise(
          rx - (dx < 0 ? 1 : 0),
          rz - (dz < 0 ? 1 : 0),
          seed + (dx ? 81 : 89),
        ) * 15,
      ) - 7;
    return {
      dx,
      dz,
      offset,
      inside: [
        ox + (dx ? dx * REGION_HALF : offset),
        oz + (dz ? dz * REGION_HALF : offset),
      ],
    };
  });
}

function walkRegion(rx, rz, start, seed) {
  assert.ok(
    canStandAt(start[0] * CELL_SIZE, start[1] * CELL_SIZE, seed),
    `region ${rx},${rz}: blocked start ${start}`,
  );
  const visited = new Set([start.join(",")]);
  const queue = [start];
  for (let index = 0; index < queue.length; index++) {
    const [x, z] = queue[index];
    for (const [dx, dz] of DIRECTIONS) {
      const nx = x + dx,
        nz = z + dz;
      const key = `${nx},${nz}`;
      if (
        Math.abs(nx - rx * REGION_SIZE) > REGION_HALF ||
        Math.abs(nz - rz * REGION_SIZE) > REGION_HALF ||
        visited.has(key)
      )
        continue;
      if (
        !canWalk(
          [x * CELL_SIZE, z * CELL_SIZE],
          [nx * CELL_SIZE, nz * CELL_SIZE],
          seed,
        )
      )
        continue;
      visited.add(key);
      queue.push([nx, nz]);
    }
  }
  return visited;
}

test("rooms and all offset portals connect on foot across signed region seams", async (t) => {
  for (const name of SEEDS)
    await t.test(JSON.stringify(name), () => {
      const seed = hashSeed(name);
      for (let rx = -1; rx <= 1; rx++)
        for (let rz = -1; rz <= 1; rz++) {
          const portals = regionPortals(rx, rz, seed);
          const reception = ROOMS.find((room) => room.id === "reception");
          const core = rx === 0 && rz === 0;
          const start = core
            ? [reception.x / CELL_SIZE, reception.z / CELL_SIZE]
            : portals[0].inside;
          const visited = walkRegion(rx, rz, start, seed);
          if (core)
            for (const room of ROOMS) {
              assert.ok(
                visited.has(`${room.x / CELL_SIZE},${room.z / CELL_SIZE}`),
                `room ${room.id} at ${room.x},${room.z}`,
              );
            }
          for (const { dx, dz, offset, inside } of portals) {
            const label = `region ${rx},${rz}, side ${dx},${dz}, portal ${inside}`;
            assert.ok(
              visited.has(inside.join(",")),
              `${label}: unreachable on foot`,
            );
            const outside = [inside[0] + dx, inside[1] + dz];
            const neighbor = regionPortals(rx + dx, rz + dz, seed).find(
              (portal) => portal.dx === -dx && portal.dz === -dz,
            );
            assert.deepEqual(
              neighbor.inside,
              outside,
              `${label}: mismatched neighbor portal`,
            );
            assert.ok(
              canWalk(
                inside.map((value) => value * CELL_SIZE),
                outside.map((value) => value * CELL_SIZE),
                seed,
              ),
              `${label}: blocked crossing`,
            );
            // Check the whole seam, not just the expected opening. This catches
            // negative-coordinate rounding and accidental straight-axis exits.
            for (let along = -REGION_HALF; along <= REGION_HALF; along++) {
              const x = rx * REGION_SIZE + (dx ? dx * REGION_HALF : along);
              const z = rz * REGION_SIZE + (dz ? dz * REGION_HALF : along);
              const expected = along === offset;
              assert.equal(
                isCellOpen(x, z, seed),
                expected,
                `${label}: inner seam ${along}`,
              );
              assert.equal(
                isCellOpen(x + dx, z + dz, seed),
                expected,
                `${label}: outer seam ${along}`,
              );
              assert.equal(
                canStandAt(
                  (x + dx / 2) * CELL_SIZE,
                  (z + dz / 2) * CELL_SIZE,
                  seed,
                ),
                expected,
                `${label}: seam collision ${along}`,
              );
            }
          }
        }
    });
});

test("generation is independent of traversal order, seed interleaving and cache eviction", async () => {
  // Separate module instances provide genuinely cold caches in both orders.
  const forward = await import("./world.ts?forward");
  const reverse = await import("./world.ts?reverse");
  const seeds = [hashSeed(DEFAULT_SEED), hashSeed("another-floor")];
  const cells = Array.from({ length: (REGION_SIZE * 3) ** 2 }, (_, i) => [
    (i % (REGION_SIZE * 3)) - REGION_SIZE - REGION_HALF,
    Math.floor(i / (REGION_SIZE * 3)) - REGION_SIZE - REGION_HALF,
  ]);
  const sample = (world, x, z, seed) =>
    structuredClone({
      open: world.isCellOpen(x, z, seed),
      walls: world.cellWalls(x, z, seed),
      standing: [
        [0, 0],
        [0.95, 0],
        [0, 0.95],
        [CELL_SIZE / 2, 0],
      ].map(([dx, dz]) =>
        world.canStandAt(x * CELL_SIZE + dx, z * CELL_SIZE + dz, seed),
      ),
    });
  const expected = seeds.map((seed) =>
    cells.map(([x, z]) => sample(forward, x, z, seed)),
  );
  assert.notDeepEqual(
    expected[0],
    expected[1],
    "seeds should change surrounding geometry",
  );
  for (let i = cells.length - 1; i >= 0; i--)
    for (let s = seeds.length - 1; s >= 0; s--) {
      assert.deepEqual(
        sample(reverse, ...cells[i], seeds[s]),
        expected[s][i],
        `cold reverse traversal: seed ${seeds[s]}, cell ${cells[i]}`,
      );
    }
  // Exceed both current cache capacities (64 layouts and 8192 wall entries).
  let entries = 0,
    regions = 0;
  while (regions < 70 || entries <= 8192) {
    assert.ok(regions < 200, "cache churn must encounter enough open cells");
    const ox = (++regions + 3) * REGION_SIZE;
    for (let x = -REGION_HALF; x <= REGION_HALF; x++) {
      for (let z = -REGION_HALF; z <= REGION_HALF; z++) {
        if (forward.isCellOpen(ox + x, z, seeds[0])) {
          forward.cellWalls(ox + x, z, seeds[0]);
          entries++;
        }
      }
    }
  }
  for (let i = cells.length - 1; i >= 0; i--)
    for (let s = 0; s < seeds.length; s++) {
      assert.deepEqual(
        sample(forward, ...cells[i], seeds[s]),
        expected[s][i],
        `after eviction: seed ${seeds[s]}, cell ${cells[i]}`,
      );
    }
});

test("room-relative furniture and doorway jambs collide, while door centers stay clear", () => {
  const seed = hashSeed(DEFAULT_SEED);
  for (const room of ROOMS) {
    assert.equal(canStandAt(room.x, room.z, seed), true, `${room.id}: center`);
    for (const solid of FURNITURE[room.id]) {
      assert.equal(
        canStandAt(room.x + solid.x, room.z + solid.z, seed),
        false,
        `${room.id}: furniture at ${solid.x},${solid.z}`,
      );
    }
    let doors = 0;
    for (
      let x = room.x - room.width / 2 + CELL_SIZE / 2;
      x < room.x + room.width / 2;
      x += CELL_SIZE
    ) {
      for (
        let z = room.z - room.depth / 2 + CELL_SIZE / 2;
        z < room.z + room.depth / 2;
        z += CELL_SIZE
      ) {
        const walls = cellWalls(x / CELL_SIZE, z / CELL_SIZE, seed);
        for (const lintel of walls.filter(
          (wall) => wall.y - wall.height / 2 > 1.8,
        )) {
          doors++;
          const alongX = lintel.depth === WALL_THICKNESS;
          const opening = alongX ? lintel.width : lintel.depth;
          assert.equal(
            canStandAt(lintel.x, lintel.z, seed),
            true,
            `${room.id}: doorway center`,
          );
          for (const sign of [-1, 1]) {
            const offset = sign * (opening / 2 - PLAYER_RADIUS / 2);
            assert.equal(
              canStandAt(
                lintel.x + (alongX ? offset : 0),
                lintel.z + (alongX ? 0 : offset),
                seed,
              ),
              false,
              `${room.id}: jamb clearance`,
            );
          }
        }
      }
    }
    assert.ok(doors > 0, `${room.id}: expected a doorway`);
  }
  assert.equal(canStandAt(NaN, 0, seed), false);
  assert.equal(canStandAt(0, Infinity, seed), false);
});

test("irregular walls provide variable corridor clearance and solid overhanging partitions", () => {
  const seed = hashSeed(DEFAULT_SEED);
  const widths = new Set();
  let thinCorridors = 0,
    partitions = 0,
    overhangs = 0;
  for (let x = -31; x <= 31; x++)
    for (let z = -31; z <= 31; z++) {
      const walls = cellWalls(x, z, seed);
      const cx = x * CELL_SIZE,
        cz = z * CELL_SIZE;
      for (const alongX of [true, false]) {
        const sides = walls.filter(
          (wall) =>
            wall.height > 1 &&
            (alongX
              ? wall.depth === CELL_SIZE && wall.width > WALL_THICKNESS
              : wall.width === CELL_SIZE && wall.depth > WALL_THICKNESS),
        );
        const low = sides.find((wall) => (alongX ? wall.x < cx : wall.z < cz));
        const high = sides.find((wall) => (alongX ? wall.x > cx : wall.z > cz));
        if (!low || !high) continue;
        const min = alongX ? low.x + low.width / 2 : low.z + low.depth / 2;
        const max = alongX ? high.x - high.width / 2 : high.z - high.depth / 2;
        const width = max - min;
        widths.add(width.toFixed(3));
        if (width >= CELL_SIZE / 2) continue;
        thinCorridors++;
        assert.ok(
          width > PLAYER_RADIUS * 2,
          `corridor ${x},${z}: player cannot fit`,
        );
        const at = (value) =>
          canStandAt(alongX ? value : cx, alongX ? cz : value, seed);
        assert.equal(
          at((min + max) / 2),
          true,
          `corridor ${x},${z}: blocked center`,
        );
        for (const [edge, sign] of [
          [min, 1],
          [max, -1],
        ]) {
          assert.equal(
            at(edge + sign * (PLAYER_RADIUS + 0.02)),
            true,
            `corridor ${x},${z}: inside clearance`,
          );
          assert.equal(
            at(edge + sign * (PLAYER_RADIUS - 0.02)),
            false,
            `corridor ${x},${z}: wall collision`,
          );
        }
      }
      for (const wall of walls.filter(
        (wall) => wall.width === 0.22 || wall.depth === 0.22,
      )) {
        partitions++;
        assert.equal(
          canStandAt(wall.x, wall.z, seed),
          false,
          `partition ${x},${z}`,
        );
        const alongX = wall.depth === 0.22;
        const length = alongX ? wall.width : wall.depth;
        for (const sign of [-1, 1]) {
          const px = wall.x + (alongX ? sign * (length / 2 - 0.02) : 0);
          const pz = wall.z + (alongX ? 0 : sign * (length / 2 - 0.02));
          if (cellAt(px) === x && cellAt(pz) === z) continue;
          if (!isCellOpen(cellAt(px), cellAt(pz), seed)) continue;
          overhangs++;
          assert.equal(
            canStandAt(px, pz, seed),
            false,
            `partition owned by ${x},${z} extends into ${cellAt(px)},${cellAt(pz)}`,
          );
        }
      }
    }
  assert.ok(widths.size > 1, "corridor widths should vary");
  assert.ok(thinCorridors > 0, "expected narrow but passable corridors");
  assert.ok(partitions > 0, "expected internal room partitions");
  assert.ok(
    overhangs > 0,
    "expected partitions extending into open neighboring cells",
  );
});

test("room lookup and chunks agree across positive and negative coordinates", () => {
  for (const room of ROOMS) assert.equal(roomAt(room)?.id, room.id);
  const reception = ROOMS.find((room) => room.id === "reception");
  assert.equal(
    roomAt({ x: reception.x + reception.width / 2, z: reception.z }),
    undefined,
  );
  assert.deepEqual(chunkAt({ x: 0, z: 0 }), { x: 0, z: 0 });
  assert.deepEqual(chunkAt({ x: -CELL_SIZE, z: -CELL_SIZE }), { x: -1, z: -1 });
  for (const chunk of [-2, -1, 0, 1, 2]) {
    const boundary = chunk * CHUNK_SIZE * CELL_SIZE - CELL_SIZE / 2;
    assert.deepEqual(chunkAt({ x: boundary - 0.01, z: boundary - 0.01 }), {
      x: chunk - 1,
      z: chunk - 1,
    });
    assert.deepEqual(chunkAt({ x: boundary, z: boundary }), {
      x: chunk,
      z: chunk,
    });
  }
});
