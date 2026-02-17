import type * as Blockly from "blockly/core";
import type {
  SpriteDefinition,
  SpriteInstance,
} from "@/blockly/spriteRegistry";
import type { PhaserExport } from "@/phaser/PhaserStateManager";
import type EditorScene from "@/phaser/scenes/EditorScene";
import type GameScene from "@/phaser/scenes/GameScene";

// Re-export for consumers
export type { SpriteDefinition, SpriteInstance };

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
  base64: string;
}

export type TilemapTool = 'place' | 'eraser' | 'bucket' | 'line' | 'rectangle' | 'oval' | 'tile-picker';

// ── Sprite Slice ──

export type AssetType = 'textures' | 'tiles' | 'tilesets' | 'animations' | 'backgrounds';
export type EditingSource = 'new' | 'asset' | 'library';

export type TextureLoadState = 'pending' | 'loading' | 'loaded' | 'error';

export interface SpriteState {
  spriteInstances: SpriteInstance[];

  textures: Record<string, string>;
  tiles: Record<string, string>;
  tilesets: Record<string, string>;
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
}

export interface SpriteActions {
  setSelectedSpriteId: (spriteId: string | null) => void;
  setIsSpriteModalOpen: (isOpen: boolean) => void;
  setEditingAsset: (name: string | null, type: AssetType, source: EditingSource) => void;

  /* Sprites */
  setSpriteInstances: (instances: SpriteInstance[]) => void;
  removeSpriteInstance: (spriteId: string, syncAfter?: boolean) => void;
  updateSpriteInstance: (spriteId: string, updates: Partial<SpriteInstance>, syncAfter?: boolean) => void;
  updateInstanceOrder: (spriteIdx: number, newIdx: number) => void;
  saveSprite: (params: { spriteName: string; base64Image: string; syncAfter?: boolean; }) => string;

  /* Assets */
  setAsset: (name: string, base64Image: string, type: AssetType, syncAfter?: boolean) => void;
  removeAsset: (name: string, type: AssetType, syncAfter?: boolean) => void;

  /* Texture Loading */
  setTextureLoadState: (textureName: string, state: TextureLoadState) => void;

  /* Tilemaps */
  updateTilemapCell: (tilemapId: string, row: number, col: number, tileKey: string | null) => void;
  setTilemapData: (tilemapId: string, data: (string | null)[][]) => void;
  resizeTilemap: (tilemapId: string, newWidth: number, newHeight: number) => void;
  setActiveTilemapId: (id: string | null) => void;
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
  phaserState: PhaserExport | null;
  canUndo: boolean;
  canRedo: boolean;
  isConverting: boolean;
  isEditorScene: boolean;

  // Workspace state
  spriteWorkspaces: Record<string, Blockly.Workspace>;
  spriteOutputs: Record<string, WorkspaceOutputType>;
  spriteIdsUpdated: string[];
}

export interface EditorActions {
  // Registration Actions
  setBlocklyWorkspaceRef: (blocklyWorkspace: Blockly.WorkspaceSvg) => void;
  setPhaserScene: (phaserScene: EditorScene | GameScene) => void;
  setPhaserGame: (phaserGame: Phaser.Game) => void;
  setProjectId: (id: number) => void;
  setProjectName: (name: string, syncAfter?: boolean) => void;
  setPhaserState: (phaserState: PhaserExport | null) => void;
  updateUndoRedoState: () => void;

  // Derived helpers
  getCurrentSpriteId: () => string | undefined;

  // Editor Actions
  generateCode: () => void;
  saveProject: (showSnackbar: (msg: string, type: 'success' | 'error') => void) => Promise<void>;
  exportWorkspaceState: () => void;
  undoWorkspace: () => void;
  redoWorkspace: () => void;
  toggleEditor: () => void;
  resetProject: () => void;
  markSpriteAsUpdated: (id: string) => void;
}

export type EditorSlice = EditorState & EditorActions;

// ── Combined Store ──

export type GeckodeStore = SpriteSlice & EditorSlice;
