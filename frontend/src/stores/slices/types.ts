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
}

// ── Sprite Slice ──

export type EditingSource = 'new' | 'library' | 'asset';

export interface SpriteState {
  spriteInstances: SpriteInstance[];
  assetTextures: Record<string, string>;
  libraryTextures: Record<string, string>;

  isSpriteModalOpen: boolean;
  selectedSpriteIdx: number | null;
  editingSource: EditingSource | null;
  editingTextureName: string | null;
}

export interface SpriteActions {
  setSpriteInstances: (instances: SpriteInstance[]) => void;
  setIsSpriteModalOpen: (isOpen: boolean) => void;
  updateInstanceOrder: (spriteIdx: number, newIdx: number) => void;

  addAssetTexture: (textureName: string, base64Image: string) => void;
  updateAssetTexture: (textureName: string, base64Image: string) => void;
  removeAssetTexture: (textureName: string) => void;

  removeSpriteInstance: (spriteIdx: number) => void;
  updateSpriteInstance: (spriteIdx: number, updates: Partial<SpriteInstance>) => void;

  setSelectedSpriteIdx: (spriteIdx: number) => void;
  setEditingSprite: (source: EditingSource, textureName: string | null) => void;
  clearEditingSprite: () => void;
  saveSprite: (params: { spriteName: string; base64Image: string }) => string;

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
  convertTimeoutId: ReturnType<typeof setTimeout> | null;

  // Workspace state
  spriteWorkspaces: Map<string, Blockly.serialization.workspaceComments.State>;
  spriteOutputs: Map<string, WorkspaceOutputType>;
}

export interface EditorActions {
  // Registration Actions
  setBlocklyWorkspace: (blocklyWorkspace: Blockly.WorkspaceSvg) => void;
  setPhaserScene: (phaserScene: EditorScene | GameScene) => void;
  setPhaserGame: (phaserGame: Phaser.Game) => void;
  setProjectId: (id: number) => void;
  setProjectName: (name: string) => void;
  setPhaserState: (phaserState: PhaserExport | null) => void;
  updateUndoRedoState: () => void;

  // Derived helpers
  getCurrentSpriteId: () => string | undefined;

  // Editor Actions
  generateCode: () => void;
  scheduleConvert: () => void;
  cancelScheduledConvert: () => void;
  saveProject: (showSnackbar: (msg: string, type: 'success' | 'error') => void) => Promise<void>;
  exportWorkspaceState: () => void;
  undoWorkspace: () => void;
  redoWorkspace: () => void;
  toggleEditor: () => void;
  resetProject: () => void;
}

export type EditorSlice = EditorState & EditorActions;

// ── Combined Store ──

export type GeckodeStore = SpriteSlice & EditorSlice;
