import * as Blockly from 'blockly/core';
import type { StateCreator } from 'zustand';
import type { SpriteInstance } from '@/blockly/spriteRegistry';
import EditorScene from '@/phaser/scenes/EditorScene';
import {
  bedrockTile,
  brickTile,
  coalOreTile,
  cobblestoneTile,
  diamondOreTile,
  dirtTile,
  gavin,
  glassTile,
  goldOreTile,
  grassTile,
  gravelTile,
  heroWalkBack1,
  heroWalkFront1,
  iceTile,
  ironOreTile,
  lavaTile,
  leavesTile,
  oakLogTile,
  oakPlanksTile,
  obsidianTile,
  sandTile,
  snowTile,
  stoneTile,
  tntTile,
  waterTile,
} from '../b64_textures';
import type { AssetType, EditingSource, GeckodeStore, Scene, SpriteSlice, SpriteModalMode, Tilemap, Tileset, LibraryAssetType } from './types';

export const createEmptyTilemapData = (height: number, width: number): (string | null)[][] =>
  Array.from({ length: height }, () => Array.from({ length: width }, () => null));

export const TILE_PX = 16;
export const TILESET_WIDTH = 5;
const DEFAULT_TILESET_ID = 'tileset_1';

const createDefaultTilesetData = (): (string | null)[][] => {
  const defaults: (string | null)[] = [
    'grass', 'dirt', 'stone', 'cobblestone', 'sand',
    'water', 'lava', 'oakPlanks', 'oakLog', 'leaves',
    'brick', 'ironOre', 'goldOre', 'diamondOre', 'coalOre',
    'snow', 'ice', 'gravel', 'tnt', 'bedrock',
    'glass', 'obsidian', null, null, null,
  ];
  const data: (string | null)[][] = [];
  for (let i = 0; i < defaults.length; i += TILESET_WIDTH) {
    data.push(defaults.slice(i, i + TILESET_WIDTH));
  }
  return data;
};

const createDefaultTileset = (): Tileset => ({
  id: DEFAULT_TILESET_ID,
  name: 'Default Tileset',
  data: createDefaultTilesetData(),
  base64Preview: '',
});

const createDefaultTilemap = (tilesetId: string): Tilemap => ({
  id: 'tilemap_1',
  name: 'Tilemap 1',
  height: 12,
  width: 48,
  data: createEmptyTilemapData(12, 48),
  tilesetId,
  base64: '',
});

/** deduplicate texture name */
export const createUniqueTextureName = (name: string, textures: Record<string, string>): string => {
  if (!(name in textures)) return name;
  if (Number.isNaN(Number(name[name.length - 1]))) return createUniqueTextureName(`${name}2`, textures);
  const lastDigit = Number(name[name.length - 1]);
  return createUniqueTextureName(`${name.slice(0, -1)}${lastDigit + 1}`, textures);
};

/** deduplicate sprite instance name */
export const createUniqueSpriteName = (name: string, instances: { name: string }[]): string => {
  const count = instances.filter((s) => s.name === name).length;
  if (count === 0) return name;
  if (Number.isNaN(Number(name[name.length - 1]))) return createUniqueSpriteName(`${name}2`, instances);
  const lastDigit = Number(name[name.length - 1]);
  return createUniqueSpriteName(`${name.slice(0, -1)}${lastDigit + 1}`, instances);
};

export const convertToLibraryAsset = (asset: AssetType) : LibraryAssetType => "library" + String(asset)[0].toLowerCase() + String(asset).slice(1) as LibraryAssetType;
export const convertToAsset = (asset: LibraryAssetType) : AssetType => String(asset).slice(7).toLowerCase() as AssetType


export const createSpriteSlice: StateCreator<GeckodeStore, [], [], SpriteSlice> = (set, get) => ({
  spriteInstances: [
    {
      name: 'gavin',
      id: `id_${Date.now()}`,
      textureName: 'gavin',
      x: 50,
      y: 50,
      visible: true,
      scaleX: 1,
      scaleY: 1,
      direction: 0,
      snapToGrid: true,
      physics: {
        enabled: false,
        anchored: false,
        drag: 0.99,
        gravityY: 300,
        bounce: 0.5,
        collideWorldBounds: true,
      },
    },
  ],

  textures: { gavin: gavin },
  tiles: {
    grass: grassTile,
    dirt: dirtTile,
    stone: stoneTile,
    cobblestone: cobblestoneTile,
    sand: sandTile,
    water: waterTile,
    lava: lavaTile,
    oakPlanks: oakPlanksTile,
    oakLog: oakLogTile,
    leaves: leavesTile,
    brick: brickTile,
    ironOre: ironOreTile,
    goldOre: goldOreTile,
    diamondOre: diamondOreTile,
    coalOre: coalOreTile,
    snow: snowTile,
    ice: iceTile,
    gravel: gravelTile,
    tnt: tntTile,
    bedrock: bedrockTile,
    glass: glassTile,
    obsidian: obsidianTile,
  },
  tilesets: [createDefaultTileset()],
  tileCollidables: {},
  animations: {},
  backgrounds: {},
  assetIds: {},

  libaryTextures: {
    'hero-walk-front': heroWalkFront1,
    'hero-walk-back': heroWalkBack1,
    gavin: gavin,
  },
  libaryTiles: {},
  libaryTilesets: {},
  libaryAnimations: {},
  libaryBackgrounds: {},

  tilemaps: { tilemap_1: createDefaultTilemap(DEFAULT_TILESET_ID) },
  scenes: [{ id: 'scene_1', name: 'Scene 1', tilemapId: 'tilemap_1' }],
  activeTilemapId: 'tilemap_1',

  isSpriteModalOpen: false,
  selectedSpriteId: null,
  editingSource: null,
  editingAssetName: null,
  editingAssetType: null,
  spriteModalMode: null,
  spriteModalSaveTargetTextureName: null,

  /* ── Modal / Selection ── */
  setIsSpriteModalOpen: (isOpen: boolean) => set({ isSpriteModalOpen: isOpen }),
  setSpriteModalContext: (mode: SpriteModalMode, saveTargetTextureName: string | null = null) =>
    set({
      spriteModalMode: mode,
      spriteModalSaveTargetTextureName: saveTargetTextureName,
    }),
  clearSpriteModalContext: () =>
    set({
      spriteModalMode: null,
      spriteModalSaveTargetTextureName: null,
    }),
  setSelectedSpriteId: (newId: string | null) => {
    const { blocklyWorkspace, spriteWorkspaces, selectedSpriteId: prevId } = get();
    if (newId === prevId) return;
    if (!blocklyWorkspace) return;

    // Save current workspace for the previously selected sprite
    if (prevId) {
      set({
        spriteWorkspaces: {
          ...spriteWorkspaces,
          [prevId]: Blockly.serialization.workspaces.save(blocklyWorkspace),
        },
      });
    }

    // Load workspace for the newly selected sprite
    const state = newId && get().spriteWorkspaces[newId];
    if (!state) {
      Blockly.serialization.workspaces.load({}, blocklyWorkspace);
    } else {
      Blockly.serialization.workspaces.load(state, blocklyWorkspace);
    }

    set({ selectedSpriteId: newId });
    console.log(`sprite ${newId} workspace loaded`);
  },
  setSpriteInstances: (instances: SpriteInstance[]) => set({ spriteInstances: instances }),
  removeSpriteInstance: (spriteId: string) => {
    const { spriteInstances, selectedSpriteId, spriteWorkspaces, blocklyWorkspace, phaserScene } = get();
    const remaining = spriteInstances.filter((instance) => instance.id !== spriteId);
    phaserScene!.removeSprite(spriteId);

    if (selectedSpriteId === spriteId && remaining.length > 0) {
      Blockly.serialization.workspaces.load(spriteWorkspaces[spriteInstances[0].id], blocklyWorkspace!);
    }

    set({
      spriteInstances: remaining,
      spriteWorkspaces: {
        ...Object.fromEntries(
          Object.entries(spriteWorkspaces)
            .filter(([id]) => id !== spriteId)
        ),
      },
      selectedSpriteId: selectedSpriteId === spriteId
        ? (remaining[0]?.id ?? null)
        : selectedSpriteId,
    });
  },

  updateSpriteInstance: (spriteId: string, updates: Partial<SpriteInstance>) => {
    const { phaserGame, phaserScene } = get();
    if (!phaserGame || !phaserScene) throw new Error('Game is not ready yet.');
    if (!(phaserScene instanceof EditorScene)) throw new Error('Should not be able to update sprite from game scene.');
    phaserScene.updateSprite(spriteId, updates);

    set((state) => ({
      spriteInstances: state.spriteInstances.map((instance) =>
        instance.id === spriteId ? { ...instance, ...updates } : instance,
      ),
    }));
  },

  updateInstanceOrder: (spriteIdx: number, newIdx: number) => {
    const currentInstances = get().spriteInstances;
    const updatedInstances = [...currentInstances];
    const [movedInstance] = updatedInstances.splice(spriteIdx, 1);
    updatedInstances.splice(newIdx, 0, movedInstance);
    set({ spriteInstances: updatedInstances });
  },

  saveSprite: ({ spriteName, base64Image }) => {
    const { editingSource, editingAssetName, textures } = get();
    let textureName: string;

    if (editingSource === 'asset' && editingAssetName) {
      textureName = editingAssetName;
    } else {
      textureName = createUniqueTextureName(spriteName, textures);
    }
    set({ textures: { ...get().textures, [textureName]: base64Image } });

    const instance: SpriteInstance = {
      name: createUniqueSpriteName(spriteName, get().spriteInstances),
      textureName,
      id: `id_${Date.now()}`,
      x: 0,
      y: 0,
      visible: true,
      scaleX: 1,
      scaleY: 1,
      direction: 0,
      snapToGrid: true,
    };
    set({ spriteInstances: [...get().spriteInstances, instance] });
    return textureName;
  },

  /* ── Assets ── */
  setEditingAsset: (name: string | null, type: AssetType, source: EditingSource) => { set({ editingSource: source, editingAssetName: name, editingAssetType: type }) },

  addAsset: (name: string, base64Image: string, type: AssetType) => {
    if (type === 'tilesets') return;
    const assets = { ...(get() as any)[type], [name]: base64Image };
    set({ [type]: assets } as any);
  },
  updateAsset: (name: string, base64Image: string, type: AssetType) => {
    if (type === 'tilesets') return;
    const assets = { ...(get() as any)[type], [name]: base64Image };
    set({ [type]: assets } as any);
  },
  removeAsset: (name: string, type: AssetType) => {
    if (type === 'tilesets') return;
    const current = { ...(get() as any)[type] };
    delete current[name];
    set({ [type]: current } as any);
  },

  /* ── Tilesets ── */
  addTileset: (tileset: Tileset) => {
    const existing = get().tilesets;
    const idx = existing.findIndex((ts) => ts.id === tileset.id);
    if (idx === -1) {
      set({ tilesets: [...existing, tileset] });
      return;
    }
    set({ tilesets: existing.map((ts, i) => (i === idx ? tileset : ts)) });
  },
  updateTileset: (id: string, tileset: Tileset) => {
    set({
      tilesets: get().tilesets.map((ts) => (ts.id === id ? tileset : ts)),
    });
  },
  removeTileset: (id: string) => {
    const existing = get().tilesets;
    if (existing.length <= 1) return;

    const nextTilesets = existing.filter((ts) => ts.id !== id);
    if (nextTilesets.length === existing.length) return;

    const fallbackTilesetId = nextTilesets[0].id;
    const nextTilemaps = Object.fromEntries(
      Object.entries(get().tilemaps).map(([tilemapId, tilemap]) => [
        tilemapId,
        tilemap.tilesetId === id
          ? { ...tilemap, tilesetId: fallbackTilesetId }
          : tilemap,
      ]),
    );

    set({
      tilesets: nextTilesets,
      tilemaps: nextTilemaps,
    });
  },

  /* ── Tile Collidables ── */
  setTileCollidable: (tileKey: string, collidable: boolean) => {
    set({ tileCollidables: { ...get().tileCollidables, [tileKey]: collidable } });
  },

  addLibraryAsset: (name: string, base64Image: string, type) => { set({ [type]: { ...get()[type], [name]: base64Image } }); },
  updateLibraryAsset: (name: string, base64Image: string, type) => { set({ [type]: { ...get()[type], [name]: base64Image } }); },
  removeLibraryAsset: (name: string, type) => {
    const { [name]: _, ...rest } = get()[type];
    set({ [type]: rest });
  },

  /* Asset Ids */
  addAssetId: (name: string, id: string|number) => {
    set({["assetIds"]: { ...get()["assetIds"], [name] : id }})
  },
  updateAssetId: (oldName: string,  newName: string) => { // assign id to newName and delete the old name record
    const { [oldName]: id, ...rest } = get()["assetIds"];
    set({ ["assetIds"]: {...rest, [newName]: id} });
  },
  removeAssetId: (name: string) => {
    const { [name]: _, ...rest } = get()["assetIds"];
    set({ ["assetIds"]: rest });
  },

  /* ── Tilemaps ── */
  setActiveTilemapId: (id: string | null) => set({ activeTilemapId: id }),
  setTilemapTilesetId: (tilemapId: string, tilesetId: string) => {
    const tilemap = get().tilemaps[tilemapId];
    if (!tilemap) return;
    if (!get().tilesets.some((ts) => ts.id === tilesetId)) return;
    set({
      tilemaps: {
        ...get().tilemaps,
        [tilemapId]: { ...tilemap, tilesetId },
      },
    });
  },
  updateTilemapCell: (tilemapId: string, row: number, col: number, tileKey: string | null) => {
    const tilemap = get().tilemaps[tilemapId];
    if (!tilemap) return;
    const newData = tilemap.data.map((r, ri) =>
      ri === row ? r.map((c, ci) => (ci === col ? tileKey : c)) : r,
    );
    set({
      tilemaps: {
        ...get().tilemaps,
        [tilemapId]: { ...tilemap, data: newData },
      },
    });
  },

  setTilemapData: (tilemapId: string, data: (string | null)[][]) => {
    const tilemap = get().tilemaps[tilemapId];
    if (!tilemap) return;
    set({
      tilemaps: {
        ...get().tilemaps,
        [tilemapId]: { ...tilemap, data },
      },
    });
  },

  resizeTilemap: (tilemapId: string, newWidth: number, newHeight: number) => {
    const tilemap = get().tilemaps[tilemapId];
    if (!tilemap) return;
    const newData: (string | null)[][] = [];
    for (let r = 0; r < newHeight; r++) {
      const row: (string | null)[] = [];
      for (let c = 0; c < newWidth; c++) {
        row.push(r < tilemap.data.length && c < tilemap.data[r].length ? tilemap.data[r][c] : null);
      }
      newData.push(row);
    }
    set({
      tilemaps: {
        ...get().tilemaps,
        [tilemapId]: { ...tilemap, width: newWidth, height: newHeight, data: newData },
      },
    });
  },

  clearTilemap: (tilemapId: string) => {
    const tilemap = get().tilemaps[tilemapId];
    if (!tilemap) return;
    set({
      tilemaps: {
        ...get().tilemaps,
        [tilemapId]: { ...tilemap, data: createEmptyTilemapData(tilemap.height, tilemap.width) },
      },
    });
  },

  setScenes: (scenes: Scene[]) => set({ scenes }),

  /* ── Reset ── */
  resetSpriteStore: () => {
    console.log('resetting sprite store');
    const defaultSpriteId = `id_${Date.now()}`;
    set({
      spriteInstances: [
        {
          id: defaultSpriteId,
          textureName: 'hero-walk-front',
          name: 'herowalkfront1',
          x: 200,
          y: 150,
          visible: true,
          scaleX: 1,
          scaleY: 1,
          direction: 0,
          snapToGrid: true,
        },
      ],
      textures: { 'hero-walk-front': heroWalkFront1 },
      tiles: {
        grass: grassTile,
        dirt: dirtTile,
        stone: stoneTile,
        cobblestone: cobblestoneTile,
        sand: sandTile,
        water: waterTile,
        lava: lavaTile,
        oakPlanks: oakPlanksTile,
        oakLog: oakLogTile,
        leaves: leavesTile,
        brick: brickTile,
        ironOre: ironOreTile,
        goldOre: goldOreTile,
        diamondOre: diamondOreTile,
        coalOre: coalOreTile,
        snow: snowTile,
        ice: iceTile,
        gravel: gravelTile,
        tnt: tntTile,
        bedrock: bedrockTile,
        glass: glassTile,
        obsidian: obsidianTile,
      },
      tilesets: [createDefaultTileset()],
      tileCollidables: {},
      animations: {},
      backgrounds: {},
      libaryTextures: {
        'hero-walk-front': heroWalkFront1,
        'hero-walk-back': heroWalkBack1,
        gavin: gavin,
      },
      libaryTiles: {},
      libaryTilesets: {},
      libaryAnimations: {},
      libaryBackgrounds: {},
      selectedSpriteId: defaultSpriteId,
      editingSource: null,
      editingAssetName: null,
      editingAssetType: null,
      spriteModalMode: null,
      spriteModalSaveTargetTextureName: null,
      tilemaps: { tilemap_1: createDefaultTilemap(DEFAULT_TILESET_ID) },
      scenes: [{ id: 'scene_1', name: 'Scene 1', tilemapId: 'tilemap_1' }],
      activeTilemapId: 'tilemap_1',
    });
  },

  resetAssetsOnly() {
    console.log(`resetting assets`);

    set({
      tiles: {},
      tilesets: [createDefaultTileset()],
      animations: {},
      backgrounds: {},
      libaryTextures: {
        'hero-walk-front': heroWalkFront1,
        'hero-walk-back': heroWalkBack1,
        gavin: gavin,
      },
      libaryTiles: {},
      libaryTilesets: {},
      libaryAnimations: {},
      libaryBackgrounds: {},  
      assetIds: {}
    });
  },
});
