# Behind the Wallpaper

`/backrooms` is a spatial version of the portfolio, not a website rendered on a terminal.

- `world.ts`: room content, seeded layout, enclosure boundaries, furniture footprints, collision.
- `Rooms.tsx`: instanced architecture, printed canvas-texture plaques, room-local primitive props.
- `BackroomsGame.tsx`: movement, input, session restore, audio, pause menu and optional room transcripts.
- `../home/BackroomsSlit.tsx`: scroll-revealed entry at the skills/contact junction.

## Layout

Reception is at `(0, 0)`. Projects are north at `(4, -24)`; experience east at `(28, 0)`; skills northwest at `(-24, -8)`; about southwest at `(-16, 24)`; contact southeast at `(24, 28)`. Exhibit rooms have different proportions, joined by offset passages and empty side rooms rather than a symmetric cross.

Beyond the exhibits, seeded regions carve differently sized and notched rooms around jittered hubs. Dogleg corridors meet neighboring regions at shared offset portals. Passage widths vary, and freestanding wall stubs interrupt rooms without blocking their connecting routes. Regions and collision geometry are bounded caches; generation never depends on visitation order. Floor cells are only a rendering/collision substrate, not a repeating room template.

Changing the seed changes the surrounding geometry, not the portfolio room locations. Session storage retains seed, position and viewing direction; invalid positions return to reception.

WASD/arrows walk, Shift runs, mouse looks, Escape pauses, and E opens the current room's transcript and links. Touch uses a left joystick and drag-to-look. Desktop drag-to-look is available if pointer capture is unavailable. Sound is opt-in. No camera bob, flashing lights or forced camera movement.

## Replacing Props

Replace room-local meshes in `RoomContents` with models. Coordinates are meters, floor Y is 0, ceiling Y is 3.6, and eye height is 1.65. Keep printed plaques legible and door openings clear. Update `FURNITURE` in `world.ts` when model footprints change; those boxes are the walking collision boundaries. CRT/desk assets from the terminal prototype are not required.

Portfolio copy currently lives in `ROOMS`; keep it aligned with the main site when editing either.

## Checks

With Node 22.6+:

```sh
node --experimental-strip-types --test components/backrooms/world.test.mjs
./node_modules/.bin/tsc --noEmit --incremental false
npm run build
```

Tests cover determinism, seed variation, walking reachability across multiple seeds, walls/doorways/furniture, and chunk/room lookup.
