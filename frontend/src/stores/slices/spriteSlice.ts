import * as Blockly from 'blockly/core';
import type { StateCreator } from 'zustand';
import type { SpriteInstance } from '@/blockly/spriteRegistry';
import EditorScene from '@/phaser/scenes/EditorScene';
import { dirtTile, gavin, grassTile, heroWalkBack1, heroWalkFront1 } from '../b64_textures';
import type { GeckodeStore, Scene, SpriteSlice, Tilemap } from './types';

/** Create a 2D array of nulls with the given dimensions */
export const createEmptyTilemapData = (width: number, height: number): (string | null)[][] =>
  Array.from({ length: height }, () => Array.from({ length: width }, () => null));

const DEFAULT_TILEMAP_ID = 'tilemap_1';
const DEFAULT_SCENE_ID = 'scene_1';

const createDefaultTilemap = (): Tilemap => ({
  id: DEFAULT_TILEMAP_ID,
  name: 'Tilemap 1',
  width: 16,
  height: 16,
  data: createEmptyTilemapData(16, 16),
});

const createDefaultScene = (): Scene => ({
  id: DEFAULT_SCENE_ID,
  name: 'Scene 1',
  tilemapId: DEFAULT_TILEMAP_ID,
});

/** deduplicate texture name */
export const createUniqueTextureName = (name: string, assetTextures: Record<string, string>): string => {
  if (!(name in assetTextures)) return name;
  if (Number.isNaN(Number(name[name.length - 1]))) return createUniqueTextureName(`${name}2`, assetTextures);
  const lastDigit = Number(name[name.length - 1]);
  return createUniqueTextureName(`${name.slice(0, -1)}${lastDigit + 1}`, assetTextures);
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
  assetTextures: {
    gavin: gavin,
  },
  libraryTextures: {
    'hero-walk-front': heroWalkFront1,
    'hero-walk-back': heroWalkBack1,
    gavin: gavin,
  },
  tileTextures: {
    'grass': grassTile,
    'dirt': dirtTile,
  },
  tilemaps: { [DEFAULT_TILEMAP_ID]: createDefaultTilemap() },
  scenes: [createDefaultScene()],
  activeTilemapId: DEFAULT_TILEMAP_ID,
  isSpriteModalOpen: false,
  selectedSpriteIdx: 0,
  editingSource: null,
  editingTextureName: null,

  setIsSpriteModalOpen: (isOpen: boolean) => set({ isSpriteModalOpen: isOpen }),
  setSpriteInstances: (instances: SpriteInstance[]) => set({ spriteInstances: instances }),
  updateInstanceOrder: (spriteIdx: number, newIdx: number) => {
    const currentInstances = get().spriteInstances;
    const updatedInstances = [...currentInstances];
    const [movedInstance] = updatedInstances.splice(spriteIdx, 1);
    updatedInstances.splice(newIdx, 0, movedInstance);
    set({ spriteInstances: updatedInstances });
  },

  addAssetTexture: (textureName: string, base64Image: string) =>
    set({
      assetTextures: { ...get().assetTextures, [textureName]: base64Image },
    }),
  updateAssetTexture: (textureName: string, base64Image: string) =>
    set({
      assetTextures: { ...get().assetTextures, [textureName]: base64Image },
    }),
  removeAssetTexture: (textureName: string) => {
    const { [textureName]: _, ...rest } = get().assetTextures;
    set({ assetTextures: rest });
  },
  addTileTexture: (textureName: string, base64Image: string) =>
    set({
      tileTextures: { ...get().tileTextures, [textureName]: base64Image },
    }),
  updateTileTexture: (textureName: string, base64Image: string) =>
    set({
      tileTextures: { ...get().tileTextures, [textureName]: base64Image },
    }),
  removeTileTexture: (textureName: string) => {
    const { [textureName]: _, ...rest } = get().tileTextures;
    set({ tileTextures: rest });
  },
  removeSpriteInstance: (spriteIdx: number) => {
    set({
      spriteInstances: get().spriteInstances.filter((_, index) => index !== spriteIdx),
    });
  },
  updateSpriteInstance: (spriteIdx: number, updates: Partial<SpriteInstance>) => {
    const { phaserGame, phaserScene } = get();
    if (!phaserGame || !phaserScene) throw new Error('Game is not ready yet.');
    if (!(phaserScene instanceof EditorScene)) throw new Error('Should not be able to update sprite from game scene.');
    phaserScene.updateSprite(get().spriteInstances[spriteIdx].id, updates);

    set((state) => ({
      spriteInstances: state.spriteInstances.map((instance, index) =>
        index === spriteIdx ? { ...instance, ...updates } : instance,
      ),
    }));
  },
  setSelectedSpriteIdx: (newIdx: number) => {
    const { blocklyWorkspace, spriteWorkspaces, spriteInstances, selectedSpriteIdx: prevIdx } = get();
    if (newIdx === prevIdx) return;
    if (!blocklyWorkspace || spriteInstances.length === 0) return;

    set({ 
      spriteWorkspaces: { 
        ...get().spriteWorkspaces, [spriteInstances[prevIdx].id]: Blockly.serialization.workspaces.save(blocklyWorkspace)
      }
    });

    const state = get().spriteWorkspaces[spriteInstances[newIdx].id];
    if (!state) {
      Blockly.serialization.workspaces.load({}, blocklyWorkspace);
    } else {
      Blockly.serialization.workspaces.load(state, blocklyWorkspace);
    }

    set({ selectedSpriteIdx: newIdx });
    console.log(`sprite ${newIdx} workspace loaded`);
  },
  setEditingSprite: (source: 'new' | 'library' | 'asset', textureName: string | null) => {
    set({ editingSource: source, editingTextureName: textureName });
  },
  clearEditingSprite: () => {
    set({ editingSource: null, editingTextureName: null });
  },
  saveSprite: ({ spriteName, base64Image }) => {
    const { editingSource, editingTextureName, assetTextures } = get();
    let textureName: string;

    if (editingSource === 'asset' && editingTextureName) {
      textureName = editingTextureName;
    } else {
      textureName = createUniqueTextureName(spriteName, assetTextures);
    }
    set({ assetTextures: { ...get().assetTextures, [textureName]: base64Image } });

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

  setActiveTilemapId: (id: string | null) => set({ activeTilemapId: id }),

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

  resetSpriteStore: () => {
    console.log('resetting sprite store');
    set({
      spriteInstances: [
        {
          id: `id_${Date.now()}`,
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
      assetTextures: {
        'hero-walk-front': heroWalkFront1,
      },
      libraryTextures: {
        'hero-walk-front': heroWalkFront1,
        'hero-walk-back': heroWalkBack1,
        gavin: gavin,
      },
      selectedSpriteIdx: 0,
      editingSource: null,
      editingTextureName: null,
      tilemaps: { [DEFAULT_TILEMAP_ID]: createDefaultTilemap() },
      scenes: [createDefaultScene()],
      activeTilemapId: DEFAULT_TILEMAP_ID,
    });
  },
});
