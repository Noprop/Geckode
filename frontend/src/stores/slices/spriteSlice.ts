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
import type { AssetType, EditingSource, GeckodeStore, Scene, SpriteSlice, SpriteModalMode, Tilemap, Tileset } from './types';
import { addSpriteSync, deleteSpriteSync, updateSpriteSync } from '@/hooks/yjs/useWorkspaceSync';
import { deleteAssetSync, setAssetSync } from '@/hooks/yjs/useAssetSync';

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
  console.log('creating unique texture name: ', name, textures);
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

export const createSpriteSlice: StateCreator<GeckodeStore, [], [], SpriteSlice> = (set, get) => ({
  spriteInstances: [],
  textures: {},
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

  textureLoadingState: {},

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
    const { selectedSpriteId: prevId } = get();
    if (newId === prevId) return;

    set({ selectedSpriteId: newId });
    console.log(`sprite ${newId} workspace loaded`);
  },
  setSpriteInstances: (instances: SpriteInstance[]) => set({ spriteInstances: instances }),
  removeSpriteInstance: (spriteId: string, syncAfter: boolean = true) => {
    const { spriteInstances, spriteWorkspaces, phaserScene } = get();
    const remaining = spriteInstances.filter((instance) => instance.id !== spriteId);

    if (phaserScene instanceof EditorScene) phaserScene.removeSprite(spriteId);

    spriteWorkspaces[spriteId]?.dispose();

    set((s) => ({
      spriteInstances: remaining,
      spriteWorkspaces: {
        ...Object.fromEntries(
          Object.entries(spriteWorkspaces)
            .filter(([id]) => id !== spriteId)
        ),
      },
      spriteOutputs: {
        ...Object.fromEntries(
          Object.entries(s.spriteOutputs)
            .filter(([id]) => id !== spriteId)
        ),
      },
      selectedSpriteId: s.selectedSpriteId === spriteId
        ? (remaining[0]?.id ?? null)
        : s.selectedSpriteId,
    }));

    if (syncAfter) {
      deleteSpriteSync(spriteId);
    }
  },

  updateSpriteInstance: (spriteId: string, updates: Partial<SpriteInstance>, syncAfter: boolean = true) => {
    const { phaserGame, phaserScene } = get();
    if (!phaserGame || !phaserScene) throw new Error('Game is not ready yet.');
    if (phaserScene instanceof EditorScene) {
      phaserScene.updateSprite(spriteId, updates);
    }

    set((state) => ({
      spriteInstances: state.spriteInstances.map((instance) =>
        instance.id === spriteId ? { ...instance, ...updates } : instance,
      ),
    }));

    if (syncAfter) {
      updateSpriteSync(spriteId, updates);
    }
  },

  updateInstanceOrder: (spriteIdx: number, newIdx: number) => {
    const currentInstances = get().spriteInstances;
    const updatedInstances = [...currentInstances];
    const [movedInstance] = updatedInstances.splice(spriteIdx, 1);
    updatedInstances.splice(newIdx, 0, movedInstance);
    set({ spriteInstances: updatedInstances });
  },

  saveSprite: ({ spriteName, base64Image, syncAfter = true }) => {
    const { editingSource, editingAssetName, textures, spriteWorkspaces, phaserScene } = get();
    let textureName: string;

    if (editingSource === 'asset' && editingAssetName) {
      textureName = editingAssetName;
    } else {
      textureName = createUniqueTextureName(spriteName, textures);
    }
    set({ 
      textures: { ...get().textures, [textureName]: base64Image },
      textureLoadingState: { ...get().textureLoadingState, [textureName]: 'pending' },
    });

    // Only load texture immediately if in EditorScene
    // GameScene will pick up changes when user switches back
    if (phaserScene instanceof EditorScene) {
      phaserScene.loadSpriteTextureAsync(textureName, base64Image).then(() => {
        get().setTextureLoadState(textureName, 'loaded');
      }).catch((err) => {
        console.error(`Failed to load texture ${textureName}:`, err);
        get().setTextureLoadState(textureName, 'error');
      });
    }

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

    set({
      spriteInstances: [...get().spriteInstances, instance],
      spriteWorkspaces: {
        ...spriteWorkspaces,
        [instance.id]: new Blockly.Workspace(),
      },
    });

    if (syncAfter) {
      addSpriteSync(instance);
    }
    return textureName;
  },

  /* ── Assets ── */
  setEditingAsset: (name: string | null, type: AssetType, source: EditingSource) => { set({ editingSource: source, editingAssetName: name, editingAssetType: type }) },

  setAsset: (name: string, base64Image: string, type: AssetType, syncAfter: boolean = true) => {
    set({ [type]: { ...get()[type], [name]: base64Image } });

    // If it's a texture, mark it as pending and load it only in EditorScene
    if (type === 'textures') {
      set((s) => ({
        textureLoadingState: { ...s.textureLoadingState, [name]: 'pending' },
      }));

      const { phaserScene } = get();
      // Only load texture immediately if in EditorScene
      // GameScene will pick up changes when user switches back
      if (phaserScene instanceof EditorScene) {
        phaserScene.loadSpriteTextureAsync(name, base64Image).then(() => {
          get().setTextureLoadState(name, 'loaded');
        }).catch((err) => {
          console.error(`Failed to load texture ${name}:`, err);
          get().setTextureLoadState(name, 'error');
        });
      }
    }

    if (syncAfter) {
      setAssetSync(name, base64Image, type);
    }
  },
  removeAsset: (name: string, type: Exclude<AssetType, 'tilesets'>, syncAfter: boolean = true) => {
    const { [name]: _, ...rest } = get()[type];
    set({ [type]: rest });

    if (syncAfter) {
      deleteAssetSync(name, type);
    }
  },

  /* ── Texture Loading ── */
  setTextureLoadState: (textureName: string, state) => {
    set((s) => ({
      textureLoadingState: {
        ...s.textureLoadingState,
        [textureName]: state,
      },
    }));
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
      textureLoadingState: {},
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
});
