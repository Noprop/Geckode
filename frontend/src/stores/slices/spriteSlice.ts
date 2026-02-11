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

export const createEmptyTilemapData = (width: number, height: number): (string | null)[][] =>
  Array.from({ length: height }, () => Array.from({ length: width }, () => null));

const createDefaultTilemap = (): Tilemap => ({
  id: 'tilemap_1',
  name: 'Tilemap 1',
  width: 16,
  height: 16,
  data: createEmptyTilemapData(16, 16),
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
        drag: 0.01,
        gravityY: 1,
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

  addAsset: (name: string, base64Image: string, type: AssetType) => { set({ [type]: { ...get()[type], [name]: base64Image } }); },
  updateAsset: (name: string, base64Image: string, type: AssetType) => { set({ [type]: { ...get()[type], [name]: base64Image } }); },
  removeAsset: (name: string, type: AssetType) => {
    const { [name]: _, ...rest } = get()[type];
    set({ [type]: rest });
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
        [tilemapId]: { ...tilemap, data: createEmptyTilemapData(tilemap.width, tilemap.height) },
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
