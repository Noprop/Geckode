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
  gavinDown,
  gavinLeft,
  gavinRight,
  soccerBall,
  basketBall,
  glassTile,
  goldOreTile,
  grassTile,
  gravelTile,
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
import { EventBus } from '@/phaser/EventBus';
import { addSpriteSync, deleteSpriteSync, updateSpriteSync } from '@/hooks/yjs/useWorkspaceSync';
import { deleteAssetSync, setAssetSync } from '@/hooks/yjs/useAssetSync';
import { setTilemapCellSync, setTilemapDataSync, setTilemapMetaSync } from '@/hooks/yjs/useTilemapSync';
import { deleteTilesetSync, setTilesetPreviewSync, upsertTilesetSync } from '@/hooks/yjs/useTilesetSync';

export const createEmptyTilemapData = (height: number, width: number): (string | null)[][] =>
  Array.from({ length: height }, () => Array.from({ length: width }, () => null));

export const TILE_PX = 16;
export const TILESET_WIDTH = 5;
const DEFAULT_TILESET_ID = 'tileset_1';

/** Prefix for library tile keys to avoid collisions with user assets */
export const LIBRARY_TILE_PREFIX = 'lib:';

/** Strip library prefix for display (e.g. "lib:grass" -> "grass") */
export const getLibraryTileDisplayName = (key: string): string =>
  key.startsWith(LIBRARY_TILE_PREFIX) ? key.slice(LIBRARY_TILE_PREFIX.length) : key;

function replaceSpriteRefsInState(
  obj: unknown,
  oldSpriteId: string,
  newSpriteId: string
): unknown {
  if (typeof obj === 'string' && obj === oldSpriteId) return newSpriteId;
  if (Array.isArray(obj)) return obj.map((item) => replaceSpriteRefsInState(item, oldSpriteId, newSpriteId));
  if (obj && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, replaceSpriteRefsInState(v, oldSpriteId, newSpriteId)])
    );
  }
  return obj;
}

const LIBRARY_TILE_NAMES = [
  'grass', 'dirt', 'stone', 'cobblestone', 'sand',
  'water', 'lava', 'oakPlanks', 'oakLog', 'leaves',
  'brick', 'ironOre', 'goldOre', 'diamondOre', 'coalOre',
  'snow', 'ice', 'gravel', 'tnt', 'bedrock',
  'glass', 'obsidian',
] as const;

const createDefaultLibaryTiles = (): Record<string, string> => ({
  [`${LIBRARY_TILE_PREFIX}grass`]: grassTile,
  [`${LIBRARY_TILE_PREFIX}dirt`]: dirtTile,
  [`${LIBRARY_TILE_PREFIX}stone`]: stoneTile,
  [`${LIBRARY_TILE_PREFIX}cobblestone`]: cobblestoneTile,
  [`${LIBRARY_TILE_PREFIX}sand`]: sandTile,
  [`${LIBRARY_TILE_PREFIX}water`]: waterTile,
  [`${LIBRARY_TILE_PREFIX}lava`]: lavaTile,
  [`${LIBRARY_TILE_PREFIX}oakPlanks`]: oakPlanksTile,
  [`${LIBRARY_TILE_PREFIX}oakLog`]: oakLogTile,
  [`${LIBRARY_TILE_PREFIX}leaves`]: leavesTile,
  [`${LIBRARY_TILE_PREFIX}brick`]: brickTile,
  [`${LIBRARY_TILE_PREFIX}ironOre`]: ironOreTile,
  [`${LIBRARY_TILE_PREFIX}goldOre`]: goldOreTile,
  [`${LIBRARY_TILE_PREFIX}diamondOre`]: diamondOreTile,
  [`${LIBRARY_TILE_PREFIX}coalOre`]: coalOreTile,
  [`${LIBRARY_TILE_PREFIX}snow`]: snowTile,
  [`${LIBRARY_TILE_PREFIX}ice`]: iceTile,
  [`${LIBRARY_TILE_PREFIX}gravel`]: gravelTile,
  [`${LIBRARY_TILE_PREFIX}tnt`]: tntTile,
  [`${LIBRARY_TILE_PREFIX}bedrock`]: bedrockTile,
  [`${LIBRARY_TILE_PREFIX}glass`]: glassTile,
  [`${LIBRARY_TILE_PREFIX}obsidian`]: obsidianTile,
});

const createDefaultTilesetData = (): (string | null)[][] => {
  const defaults: (string | null)[] = [
    ...LIBRARY_TILE_NAMES.map((n) => `${LIBRARY_TILE_PREFIX}${n}`),
    null, null, null,
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
  width: 16,
  data: createEmptyTilemapData(12, 16),
  tilesetId,
  base64: '',
});

const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

const generateTilesetPreviewBase64 = async (
  tileset: Tileset,
  tileTextures: Record<string, string>
): Promise<string> => {
  if (typeof document === 'undefined') return tileset.base64Preview;

  const rows = Math.max(5, tileset.data.length);
  const pixelW = TILESET_WIDTH * TILE_PX;
  const pixelH = rows * TILE_PX;
  const canvas = document.createElement('canvas');
  canvas.width = pixelW;
  canvas.height = pixelH;
  const ctx = canvas.getContext('2d');
  if (!ctx) return tileset.base64Preview;

  const uniqueKeys = [...new Set(tileset.data.flat().filter((cell): cell is string => !!cell))];
  const imageByKey = new Map<string, HTMLImageElement>();
  await Promise.all(
    uniqueKeys.map(async (key) => {
      const src = tileTextures[key];
      if (!src) return;
      try {
        imageByKey.set(key, await loadImage(src));
      } catch {}
    })
  );

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < TILESET_WIDTH; col++) {
      const key = tileset.data[row]?.[col];
      if (!key) continue;
      const img = imageByKey.get(key);
      if (!img) continue;
      ctx.drawImage(img, col * TILE_PX, row * TILE_PX, TILE_PX, TILE_PX);
    }
  }

  return canvas.toDataURL('image/png');
};

const refreshTilesetPreviews = (
  tilesetIds: string[],
  syncAfter: boolean,
  getState: () => GeckodeStore,
  setState: Parameters<StateCreator<GeckodeStore, [], [], SpriteSlice>>[0],
) => {
  if (typeof document === 'undefined' || tilesetIds.length === 0) return;
  const uniqueIds = [...new Set(tilesetIds)];

  void (async () => {
    for (const id of uniqueIds) {
      const stateBefore = getState();
      const tileset = stateBefore.tilesets.find((ts) => ts.id === id);
      if (!tileset) continue;

      const tileTextures = stateBefore.getTilesForRendering();
      const nextPreview = await generateTilesetPreviewBase64(tileset, tileTextures);

      const latestTileset = getState().tilesets.find((ts) => ts.id === id);
      if (!latestTileset || latestTileset.base64Preview === nextPreview) continue;

      setState((s) => ({
        tilesets: s.tilesets.map((ts) => (ts.id === id ? { ...ts, base64Preview: nextPreview } : ts)),
      }));

      if (syncAfter) {
        setTilesetPreviewSync(id, nextPreview);
      }
    }
  })();
};

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

export const convertToLibraryAsset = (asset: AssetType) : LibraryAssetType => "library" + String(asset)[0].toLowerCase() + String(asset).slice(1) as LibraryAssetType;
export const convertToAsset = (asset: LibraryAssetType) : AssetType => String(asset).slice(7).toLowerCase() as AssetType


export const createSpriteSlice: StateCreator<GeckodeStore, [], [], SpriteSlice> = (set, get) => ({
  spriteInstances: [],
  textures: {},
  tiles: {},
  tilesets: [createDefaultTileset()],
  tileCollidables: {},
  animations: {},
  backgrounds: {},

  textureLoadingState: {},

  libaryTextures: {
    gavinDown: gavinDown,
    gavinLeft: gavinLeft,
    gavinRight: gavinRight,
    soccerBall: soccerBall,
    basketBall: basketBall,
  },
  libaryTiles: createDefaultLibaryTiles(),
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
  editingTextureToLoad: null,
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
      editingTextureToLoad: null,
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

  duplicateSpriteInstance: (spriteId: string) => {
    const { spriteInstances, spriteWorkspaces, phaserScene, blocklyWorkspace, selectedSpriteId } = get();
    const index = spriteInstances.findIndex((i) => i.id === spriteId);
    if (index === -1) return;
    const source = spriteInstances[index];

    const instance: SpriteInstance = {
      ...source,
      id: `id_${Date.now()}`,
      name: createUniqueSpriteName(source.name, spriteInstances),
    };

    // Add instance to store first so getSpriteDropdownOptions() includes it when loading blocks
    set({ spriteInstances: [...spriteInstances, instance] });

    const sourceWorkspace =
      spriteId === selectedSpriteId && blocklyWorkspace
        ? blocklyWorkspace
        : spriteWorkspaces[spriteId];

    let newWorkspace = new Blockly.Workspace();
    if (sourceWorkspace) {
      Blockly.Events.disable();
      try {
        const state = Blockly.serialization.workspaces.save(sourceWorkspace);
        const replacedState = replaceSpriteRefsInState(state, source.id, instance.id) as Parameters<
          typeof Blockly.serialization.workspaces.load
        >[0];
        Blockly.serialization.workspaces.load(replacedState, newWorkspace);
      } finally {
        Blockly.Events.enable();
      }
    }

    set({
      spriteWorkspaces: {
        ...get().spriteWorkspaces,
        [instance.id]: newWorkspace,
      },
    });

    if (phaserScene instanceof EditorScene) {
      phaserScene.createSprite(instance);
    }

    addSpriteSync(instance, index);
  },

  saveSprite: ({ spriteName, base64Image, syncAfter = true }) => {
    const { editingSource, editingAssetName, textures, libaryTextures, spriteWorkspaces, phaserScene } = get();
    let textureName: string;

    if (editingSource === 'asset' && editingAssetName) {
      textureName = editingAssetName;
    } else {
      textureName = createUniqueTextureName(spriteName, { ...textures, ...libaryTextures });
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

    const phaserGameRef = get().phaserGame;
    const spawnX = phaserGameRef ? Math.round(phaserGameRef.scale.width / 2) : 128;
    const spawnY = phaserGameRef ? Math.round(phaserGameRef.scale.height / 2) : 96;

    const instance: SpriteInstance = {
      name: createUniqueSpriteName(spriteName, get().spriteInstances),
      textureName,
      id: `id_${Date.now()}`,
      x: spawnX,
      y: spawnY,
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
  getTilesForRendering: () => {
    const { libaryTiles, tiles } = get();
    return { ...libaryTiles, ...tiles };
  },
  setEditingAsset: (name: string | null, type: AssetType, source: EditingSource) =>
    set({ editingSource: source, editingAssetName: name, editingAssetType: type, editingTextureToLoad: null }),
  setEditingTextureToLoad: (name: string | null) => set({ editingTextureToLoad: name }),

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
        phaserScene.updateSpriteTextureAsync(name, base64Image).then(() => {
          get().setTextureLoadState(name, 'loaded');
        }).catch((err) => {
          console.error(`Failed to load texture ${name}:`, err);
          get().setTextureLoadState(name, 'error');
        });
      }
    }

    if (type === 'tiles') {
      const changedTilesetIds = get().tilesets
        .filter((tileset) => tileset.data.some((row) => row?.some((cell) => cell === name)))
        .map((tileset) => tileset.id);

      const { phaserScene } = get();
      if (phaserScene instanceof EditorScene) {
        phaserScene.updateTileTextureAsync(name, base64Image).then(() => {
          EventBus.emit('update-tilemap');
        }).catch((err) => {
          console.error(`Failed to load tile ${name}:`, err);
        });
      }

      refreshTilesetPreviews(changedTilesetIds, syncAfter, get, set);
    }

    if (syncAfter) {
      setAssetSync(name, base64Image, type);
    }
  },
  removeAsset: (name: string, type: Exclude<AssetType, 'tilesets'>, syncAfter: boolean = true) => {
    const { libaryTextures, phaserScene } = get();
    const { [name]: _, ...rest } = get()[type];
    if (type === 'tiles') {
      const { tilesets: currentTilesets, tilemaps: currentTilemaps } = get();
      const changedTilesetIds: string[] = [];
      const changedTilemapIds: string[] = [];

      const nextTilesets = currentTilesets.map((tileset) => {
        let changed = false;
        const nextData = tileset.data.map((row) =>
          row.map((cell) => {
            if (cell === name) {
              changed = true;
              return null;
            }
            return cell;
          })
        );
        if (changed) changedTilesetIds.push(tileset.id);
        return changed ? { ...tileset, data: nextData } : tileset;
      });

      const nextTilemaps = Object.fromEntries(
        Object.entries(currentTilemaps).map(([tilemapId, tilemap]) => {
          let changed = false;
          const nextData = tilemap.data.map((row) =>
            row.map((cell) => {
              if (cell === name) {
                changed = true;
                return null;
              }
              return cell;
            })
          );
          if (changed) changedTilemapIds.push(tilemapId);
          return [tilemapId, changed ? { ...tilemap, data: nextData } : tilemap];
        })
      );

      const { [name]: __, ...remainingTileCollidables } = get().tileCollidables;
      set({
        [type]: rest,
        tilesets: nextTilesets,
        tilemaps: nextTilemaps,
        tileCollidables: remainingTileCollidables,
      });

      if (syncAfter) {
        changedTilesetIds.forEach((id) => {
          const changedTileset = nextTilesets.find((tileset) => tileset.id === id);
          if (changedTileset) upsertTilesetSync(changedTileset);
        });

        changedTilemapIds.forEach((id) => {
          const changedTilemap = nextTilemaps[id];
          if (changedTilemap) setTilemapDataSync(id, changedTilemap);
        });
      }

      refreshTilesetPreviews(changedTilesetIds, syncAfter, get, set);

      if (changedTilemapIds.length > 0) EventBus.emit('update-tilemap');
    } else if (type === 'textures') {
      const { [name]: __, ...remainingTextureLoadingState } = get().textureLoadingState;
      set({ [type]: rest, textureLoadingState: remainingTextureLoadingState });
    } else {
      set({ [type]: rest });
    }

    if (type === 'textures' && name in libaryTextures) {
      const libraryTextureBase64 = libaryTextures[name];
      if (phaserScene instanceof EditorScene && libraryTextureBase64) {
        phaserScene.updateSpriteTextureAsync(name, libraryTextureBase64).then(() => {
          get().setTextureLoadState(name, 'loaded');
        }).catch((err) => {
          console.error(`Failed to restore library texture ${name}:`, err);
          get().setTextureLoadState(name, 'error');
        });
      }
    }

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
      upsertTilesetSync(tileset);
      return;
    }
    set({ tilesets: existing.map((ts, i) => (i === idx ? tileset : ts)) });
    upsertTilesetSync(tileset);
  },
  updateTileset: (id: string, tileset: Tileset) => {
    set({
      tilesets: get().tilesets.map((ts) => (ts.id === id ? tileset : ts)),
    });
    upsertTilesetSync(tileset);
  },
  removeTileset: (id: string) => {
    const existing = get().tilesets;
    if (existing.length <= 1) return;
    const currentTilemaps = get().tilemaps;

    const nextTilesets = existing.filter((ts) => ts.id !== id);
    if (nextTilesets.length === existing.length) return;

    const fallbackTilesetId = nextTilesets[0].id;
    const nextTilemaps = Object.fromEntries(
      Object.entries(currentTilemaps).map(([tilemapId, tilemap]) => [
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

    Object.entries(nextTilemaps).forEach(([tilemapId, tilemap]) => {
      if (currentTilemaps[tilemapId]?.tilesetId !== tilemap.tilesetId) {
        setTilemapMetaSync(tilemapId, { tilesetId: tilemap.tilesetId });
      }
    });

    deleteTilesetSync(id);
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

  /* ── Tilemaps ── */
  setActiveTilemapId: (id: string | null) => set({ activeTilemapId: id }),
  setTilemapTilesetId: (tilemapId: string, tilesetId: string) => {
    const tilemap = get().tilemaps[tilemapId];
    if (!tilemap) return;
    if (!get().tilesets.some((ts) => ts.id === tilesetId)) return;
    const nextTilemap = { ...tilemap, tilesetId };
    set({
      tilemaps: {
        ...get().tilemaps,
        [tilemapId]: nextTilemap,
      },
    });
    setTilemapMetaSync(tilemapId, { tilesetId });
  },
  updateTilemapCell: (tilemapId: string, row: number, col: number, tileKey: string | null) => {
    const tilemap = get().tilemaps[tilemapId];
    if (!tilemap) return;
    const newData = tilemap.data.map((r, ri) =>
      ri === row ? r.map((c, ci) => (ci === col ? tileKey : c)) : r,
    );
    const nextTilemap = { ...tilemap, data: newData };
    set({
      tilemaps: {
        ...get().tilemaps,
        [tilemapId]: nextTilemap,
      },
    });
    setTilemapCellSync(tilemapId, row, col, tileKey);
  },

  setTilemapData: (tilemapId: string, data: (string | null)[][]) => {
    const tilemap = get().tilemaps[tilemapId];
    if (!tilemap) return;
    const nextTilemap = { ...tilemap, data };
    set({
      tilemaps: {
        ...get().tilemaps,
        [tilemapId]: nextTilemap,
      },
    });
    setTilemapDataSync(tilemapId, nextTilemap);
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
    const nextTilemap = { ...tilemap, width: newWidth, height: newHeight, data: newData };
    set({
      tilemaps: {
        ...get().tilemaps,
        [tilemapId]: nextTilemap,
      },
    });
    setTilemapDataSync(tilemapId, nextTilemap);
  },

  clearTilemap: (tilemapId: string) => {
    const tilemap = get().tilemaps[tilemapId];
    if (!tilemap) return;
    const nextTilemap = { ...tilemap, data: createEmptyTilemapData(tilemap.height, tilemap.width) };
    set({
      tilemaps: {
        ...get().tilemaps,
        [tilemapId]: nextTilemap,
      },
    });
    setTilemapDataSync(tilemapId, nextTilemap);
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
          textureName: 'gavinDown',
          name: 'gavin',
          x: 200,
          y: 150,
          visible: true,
          scaleX: 1,
          scaleY: 1,
          direction: 0,
          snapToGrid: true,
        },
      ],
      textures: { gavinDown: gavinDown, gavinLeft: gavinLeft },
      tiles: {},
      tilesets: [createDefaultTileset()],
      tileCollidables: {},
      animations: {},
      backgrounds: {},
      textureLoadingState: {},
      libaryTextures: {
        gavinDown: gavinDown,
        gavinLeft: gavinLeft,
        gavinRight: gavinRight,
        soccerBall: soccerBall,
        basketBall: basketBall,
      },
      libaryTiles: createDefaultLibaryTiles(),
      libaryTilesets: {},
      libaryAnimations: {},
      libaryBackgrounds: {},
      selectedSpriteId: defaultSpriteId,
      editingSource: null,
      editingAssetName: null,
      editingAssetType: null,
      editingTextureToLoad: null,
      spriteModalMode: null,
      spriteModalSaveTargetTextureName: null,
      tilemaps: { tilemap_1: createDefaultTilemap(DEFAULT_TILESET_ID) },
      scenes: [{ id: 'scene_1', name: 'Scene 1', tilemapId: 'tilemap_1' }],
      activeTilemapId: 'tilemap_1',
    });
  },
});
