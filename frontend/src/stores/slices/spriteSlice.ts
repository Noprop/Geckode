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
import type { AssetType, EditingSource, GeckodeStore, Scene, SpriteSlice, Tilemap } from './types';
import { addSpriteSync, deleteSpriteSync, updateSpriteSync } from '@/hooks/yjs/useWorkspaceSync';
import { deleteAssetSync, setAssetSync } from '@/hooks/yjs/useAssetSync';

export const createEmptyTilemapData = (height: number, width: number): (string | null)[][] =>
  Array.from({ length: height }, () => Array.from({ length: width }, () => null));

const createDefaultTilemap = (): Tilemap => ({
  id: 'tilemap_1',
  name: 'Tilemap 1',
  height: 12,
  width: 16,
  data: createEmptyTilemapData(12, 16),
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
  tilesets: {},
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

  tilemaps: { tilemap_1: createDefaultTilemap() },
  scenes: [{ id: 'scene_1', name: 'Scene 1', tilemapId: 'tilemap_1' }],
  activeTilemapId: 'tilemap_1',

  isSpriteModalOpen: false,
  selectedSpriteId: null,
  editingSource: null,
  editingAssetName: null,
  editingAssetType: null,

  /* ── Modal / Selection ── */
  setIsSpriteModalOpen: (isOpen: boolean) => set({ isSpriteModalOpen: isOpen }),
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
    const { editingSource, editingAssetName, textures, spriteWorkspaces } = get();
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

    if (syncAfter) {
      setAssetSync(name, base64Image, type);
    }
  },
  removeAsset: (name: string, type: AssetType, syncAfter: boolean = true) => {
    const { [name]: _, ...rest } = get()[type];
    set({ [type]: rest });

    if (syncAfter) {
      deleteAssetSync(name, type);
    }
  },

  /* ── Tilemaps ── */
  setActiveTilemapId: (id: string | null) => set({ activeTilemapId: id }),
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
      tiles: {},
      tilesets: {},
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
      tilemaps: { tilemap_1: createDefaultTilemap() },
      scenes: [{ id: 'scene_1', name: 'Scene 1', tilemapId: 'tilemap_1' }],
      activeTilemapId: 'tilemap_1',
    });
  },
});
