import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Tileset } from "@/stores/slices/types";

vi.mock("@/phaser/scenes/EditorScene", () => ({
  default: class EditorScene {
    updateSprite = vi.fn();
  },
}));

vi.mock("phaser", () => ({
  Scene: class {},
  Game: class {},
  GameObjects: { Sprite: class {} },
  Physics: { Arcade: { Sprite: class {} }, Matter: { Sprite: class {} } },
}));

import { useGeckodeStore } from "../geckodeStore";

const getState = () => useGeckodeStore.getState();

const createGrid = () =>
  Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => null as string | null));

const createTileset = (id: string, name: string): Tileset => ({
  id,
  name,
  data: createGrid(),
  base64Preview: "",
});

describe("spriteSlice tilemap tileset behavior", () => {
  beforeEach(() => {
    useGeckodeStore.getState().resetSpriteStore();
  });

  it("initializes with a default tileset and tilemap tilesetId", () => {
    const state = getState();
    expect(state.tilesets.length).toBeGreaterThanOrEqual(1);
    expect(state.tilemaps.tilemap_1.tilesetId).toBe(state.tilesets[0].id);
  });

  it("setTilemapTilesetId updates only when target id exists", () => {
    const state = getState();
    state.addTileset(createTileset("tileset_2", "Tileset 2"));

    state.setTilemapTilesetId("tilemap_1", "tileset_2");
    expect(getState().tilemaps.tilemap_1.tilesetId).toBe("tileset_2");

    state.setTilemapTilesetId("tilemap_1", "missing_tileset");
    expect(getState().tilemaps.tilemap_1.tilesetId).toBe("tileset_2");
  });

  it("does not remove the last remaining tileset", () => {
    const state = getState();
    const onlyTilesetId = state.tilesets[0].id;

    state.removeTileset(onlyTilesetId);

    const next = getState();
    expect(next.tilesets).toHaveLength(1);
    expect(next.tilesets[0].id).toBe(onlyTilesetId);
  });

  it("reassigns tilemaps when removing a referenced tileset", () => {
    const state = getState();
    const firstTilesetId = state.tilesets[0].id;

    state.addTileset(createTileset("tileset_2", "Tileset 2"));
    state.setTilemapTilesetId("tilemap_1", "tileset_2");
    expect(getState().tilemaps.tilemap_1.tilesetId).toBe("tileset_2");

    state.removeTileset("tileset_2");

    const next = getState();
    expect(next.tilesets.some((ts) => ts.id === "tileset_2")).toBe(false);
    expect(next.tilemaps.tilemap_1.tilesetId).toBe(firstTilesetId);
  });

  it("removeAsset for tiles clears usage from all tilemaps and tilesets", () => {
    const state = getState();
    state.setAsset("customTile", "data:image/png;base64,abc", "tiles", false);
    state.setTileCollidable("customTile", true);

    useGeckodeStore.setState((s) => ({
      tilesets: s.tilesets.map((tileset, idx) => (
        idx === 0
          ? { ...tileset, data: tileset.data.map((row, r) => row.map((cell, c) => (r === 0 && c === 0 ? "customTile" : cell))) }
          : tileset
      )),
      tilemaps: {
        ...s.tilemaps,
        tilemap_1: {
          ...s.tilemaps.tilemap_1,
          data: s.tilemaps.tilemap_1.data.map((row, r) => row.map((cell, c) => (r === 0 && c === 0 ? "customTile" : cell))),
        },
        tilemap_2: {
          ...s.tilemaps.tilemap_1,
          id: "tilemap_2",
          data: s.tilemaps.tilemap_1.data.map((row, r) => row.map((cell, c) => (r === 1 && c === 1 ? "customTile" : cell))),
        },
      },
    }));

    getState().removeAsset("customTile", "tiles", false);

    const next = getState();
    expect(next.tiles.customTile).toBeUndefined();
    expect(next.tileCollidables.customTile).toBeUndefined();
    expect(next.tilesets.every((tileset) => tileset.data.every((row) => row.every((cell) => cell !== "customTile")))).toBe(true);
    expect(Object.values(next.tilemaps).every((tilemap) => tilemap.data.every((row) => row.every((cell) => cell !== "customTile")))).toBe(true);
  });
});
