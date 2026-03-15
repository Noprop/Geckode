import type * as Blockly from "blockly/core";
import type {
  SpriteDefinition,
  SpriteInstance,
  SpriteType,
} from "@/blockly/spriteRegistry";
import type { PhaserExport } from "@/phaser/PhaserStateManager";
import type { Client } from "@/lib/types/yjs/awareness";
import type EditorScene from "@/phaser/scenes/EditorScene";
import type GameScene from "@/phaser/scenes/GameScene";
import { IndexeddbPersistence } from "y-indexeddb";
import { ProjectPermissions } from "@/lib/types/api/projects";

// Re-export for consumers
export type { SpriteDefinition, SpriteInstance, SpriteType };

export interface SpriteAddPayload {
  name: string;
  textureName: string;
  base64Image: string;
  x?: number;
  y?: number;
}

export interface Scene {
  id: string;
  name: string;
  tilemapId: string;
}

export interface Tilemap {
  id: string;
  name: string;
  width: number;
  height: number;
  data: (string | null)[][];
  tilesetId: string;
  base64: string;
}

export interface Tileset {
  id: string;
  name: string;
  data: (string | null)[][];  // 5xN grid of tile keys (fixed width of 5)
  base64Preview: string;
}

export type TilemapTool = 'place' | 'eraser' | 'bucket' | 'line' | 'rectangle' | 'oval' | 'tile-picker' | 'collidable';

// ── Sprite Slice ──

export type AssetType = 'textures' | 'tiles' | 'tilesets' | 'animations' | 'backgrounds';
export type LibraryAssetType = 'libaryTextures' | 'libaryTiles' | 'libaryTilesets' | 'libaryAnimations' | 'libaryBackgrounds';
export type EditingSource = 'new' | 'asset' | 'library';
export type SpriteModalMode = 'phaser_add' | 'phaser_edit' | 'asset_manager';

export type TextureLoadState = 'pending' | 'loading' | 'loaded' | 'error';

export interface SpriteState {
  spriteInstances: SpriteInstance[];
  spriteTypes: SpriteType[];

  textures: Record<string, string>;
  tiles: Record<string, string>;
  tilesets: Tileset[];
  tileCollidables: Record<string, boolean>;
  animations: Record<string, string>;
  backgrounds: Record<string, string>;

  // Track texture loading state for Phaser
  textureLoadingState: Record<string, TextureLoadState>;

  libaryTextures: Record<string, string>;
  libaryTiles: Record<string, string>;
  libaryTilesets: Record<string, string>;
  libaryAnimations: Record<string, string>;
  libaryBackgrounds: Record<string, string>;


  tilemaps: Record<string, Tilemap>;
  scenes: Scene[];
  activeTilemapId: string | null;

  isSpriteModalOpen: boolean;
  selectedSpriteId: string | null;

  editingSource: EditingSource | null;
  editingAssetName: string | null;
  editingAssetType: AssetType | null;
  /** When set, load this texture into the canvas but keep save target as editingAssetName (used when picking from library while editing an asset) */
  editingTextureToLoad: string | null;
  spriteModalMode: SpriteModalMode | null;
  spriteModalSaveTargetTextureName: string | null;
}

export interface SpriteActions {
  setSelectedSpriteId: (spriteId: string | null) => void;
  setIsSpriteModalOpen: (isOpen: boolean) => void;
  setEditingAsset: (name: string | null, type: AssetType, source: EditingSource) => void;
  setEditingTextureToLoad: (name: string | null) => void;
  setSpriteModalContext: (mode: SpriteModalMode, saveTargetTextureName?: string | null) => void;
  clearSpriteModalContext: () => void;

  /* Sprite types */
  addSpriteType: (name: string) => string;
  removeSpriteType: (id: string) => void;
  renameSpriteType: (id: string, name: string) => void;

  /* Sprites */
  setSpriteInstances: (instances: SpriteInstance[]) => void;
  removeSpriteInstance: (spriteId: string, syncAfter?: boolean) => void;
  duplicateSpriteInstance: (spriteId: string) => void;
  updateSpriteInstance: (spriteId: string, updates: Partial<SpriteInstance>, syncAfter?: boolean) => void;
  updateInstanceOrder: (spriteIdx: number, newIdx: number) => void;
  saveSprite: (params: { spriteName: string; base64Image: string; syncAfter?: boolean; }) => string;

  /* Assets */
  getTilesForRendering: () => Record<string, string>;
  setAsset: (name: string, base64Image: string, type: AssetType, syncAfter?: boolean) => void;
  removeAsset: (name: string, type: Exclude<AssetType, 'tilesets'>, syncAfter?: boolean) => void;

  /* Texture Loading */
  setTextureLoadState: (textureName: string, state: TextureLoadState) => void;

  addLibraryAsset: (name: string, base64Image: string, type: LibraryAssetType) => void;
  updateLibraryAsset: (name: string, base64Image: string, type: LibraryAssetType) => void;
  removeLibraryAsset: (name: string, type: LibraryAssetType) => void;

  /* Tilesets */
  addTileset: (tileset: Tileset) => void;
  updateTileset: (id: string, tileset: Tileset) => void;
  removeTileset: (id: string) => void;

  /* Tile collidables */
  setTileCollidable: (tileKey: string, collidable: boolean, syncAfter?: boolean) => void;

  /* Tilemaps */
  updateTilemapCell: (tilemapId: string, row: number, col: number, tileKey: string | null) => void;
  setTilemapData: (tilemapId: string, data: (string | null)[][]) => void;
  resizeTilemap: (tilemapId: string, newWidth: number, newHeight: number) => void;
  setActiveTilemapId: (id: string | null) => void;
  setTilemapTilesetId: (tilemapId: string, tilesetId: string) => void;
  clearTilemap: (tilemapId: string) => void;
  setScenes: (scenes: Scene[]) => void;

  resetSpriteStore: () => void;
}

export type SpriteSlice = SpriteState & SpriteActions;

// ── Editor Slice ──

export interface HandlerRef {
  functionName: string;
  spriteId: string;
}

export interface WorkspaceOutputType {
  keyPressHandlers?: Array<{
    spriteId: string;
    functionName: string;
    key: 'left' | 'right' | 'up' | 'down' | 'space';
    eventType: 'just_pressed' | 'pressed' | 'released';
  }>;
  code: string;
  updateHandlers: HandlerRef[];
  startHandlers: HandlerRef[];
}

export interface EditorState {
  // Phaser/Blockly state
  blocklyWorkspace: Blockly.WorkspaceSvg | null;
  phaserScene: EditorScene | GameScene | null;
  phaserGame: Phaser.Game | null;

  // Project state
  projectId: number | null;
  projectName: string;
  projectPermission: ProjectPermissions | "owner";
  canEditProject: boolean;
  phaserState: PhaserExport | null;
  canUndo: boolean;
  canRedo: boolean;
  isConverting: boolean;
  isEditorScene: boolean;

  // Workspace state
  spriteWorkspaces: Record<string, Blockly.Workspace>;
  spriteOutputs: Record<string, WorkspaceOutputType>;
  spriteIdsUpdated: string[];

  // Other
  persistence: IndexeddbPersistence | null;
  clients: Client[];
}

export interface EditorActions {
  // Registration Actions
  setBlocklyWorkspaceRef: (blocklyWorkspace: Blockly.WorkspaceSvg) => void;
  setPhaserScene: (phaserScene: EditorScene | GameScene) => void;
  setPhaserGame: (phaserGame: Phaser.Game) => void;
  setProjectId: (id: number | null) => void;
  setProjectName: (name: string, syncAfter?: boolean) => void;
  setProjectPermission: (permission: ProjectPermissions | "owner") => void;
  setCanEditProject: (canEditProject: boolean) => void;
  setPhaserState: (phaserState: PhaserExport | null) => void;
  updateUndoRedoState: () => void;

  // Derived helpers
  getCurrentSpriteId: () => string | undefined;

  // Editor Actions
  generateCode: () => void;
  saveProject: (showSnackbar: (msg: string, type: 'success' | 'error') => void) => void;
  exportWorkspaceState: () => void;
  undoWorkspace: () => void;
  redoWorkspace: () => void;
  zoomWorkspaceIn: () => void;
  zoomWorkspaceOut: () => void;
  toggleEditor: () => void;
  markSpriteAsUpdated: (id: string) => void;

  // Yjs
  enablePersistence: (documentName: string) => void;
  disablePersistence: (documentName: string) => void;
  setClients: (clients: Client[]) => void;
}

export type EditorSlice = EditorState & EditorActions;

// ── Combined Store ──

export type GeckodeStore = SpriteSlice & EditorSlice;
