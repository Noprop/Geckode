import { create } from 'zustand';
import { Game } from 'phaser';
import MainMenu from '@/phaser/scenes/MainMenu';
import { BlocklyEditorHandle } from '@/components/BlocklyEditor';
import { SpriteInstance } from '@/components/SpriteBox';
import { PhaserExport, createPhaserState } from '@/phaser/PhaserStateManager';
import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import projectsApi from '@/lib/api/handlers/projects';

export type PhaserRefValue = {
  readonly game: Game;
  readonly scene: MainMenu;
} | null;

interface EditorState {
  // Refs
  phaserRef: PhaserRefValue;
  blocklyRef: BlocklyEditorHandle | null;

  // State
  projectId: number | null;
  projectName: string;
  spriteInstances: SpriteInstance[];
  phaserState: PhaserExport | null;
  canUndo: boolean;
  canRedo: boolean;

  // Registration Actions
  setPhaserRef: (ref: PhaserRefValue) => void;
  setBlocklyRef: (ref: BlocklyEditorHandle | null) => void;
  setProjectId: (id: number | null) => void;
  setProjectName: (name: string) => void;
  setSpriteInstances: (
    instances: SpriteInstance[] | ((prev: SpriteInstance[]) => SpriteInstance[])
  ) => void;
  setPhaserState: (state: PhaserExport | null) => void;
  updateUndoRedoState: () => void;

  // Editor Actions
  changeScene: () => void;
  generateCode: () => void;
  saveProject: (
    showSnackbar: (msg: string, type: 'success' | 'error') => void
  ) => Promise<void>;
  exportWorkspaceState: () => void;
  undoWorkspace: () => void;
  redoWorkspace: () => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  phaserRef: null,
  blocklyRef: null,
  projectId: null,
  projectName: '',
  spriteInstances: [],
  phaserState: null,
  canUndo: false,
  canRedo: false,

  setPhaserRef: (phaserRef) => set({ phaserRef }),
  setBlocklyRef: (blocklyRef) => set({ blocklyRef }),
  setProjectId: (projectId) => set({ projectId }),
  setProjectName: (projectName) => set({ projectName }),
  setSpriteInstances: (update) =>
    set((state) => ({
      spriteInstances:
        typeof update === 'function' ? update(state.spriteInstances) : update,
    })),
  setPhaserState: (phaserState) => set({ phaserState }),
  updateUndoRedoState: () => {
    const { blocklyRef } = get();
    const workspace = blocklyRef?.getWorkspace() as Blockly.WorkspaceSvg | null;
    if (!workspace) {
      set({ canUndo: false, canRedo: false });
      return;
    }
    // Access Blockly's internal undo stacks
    const undoStack =
      (workspace as unknown as { undoStack_: unknown[] }).undoStack_ || [];
    const redoStack =
      (workspace as unknown as { redoStack_: unknown[] }).redoStack_ || [];
    set({
      canUndo: undoStack.length > 0,
      canRedo: redoStack.length > 0,
    });
  },

  changeScene: () => {
    const { phaserRef } = get();
    phaserRef?.scene?.changeScene?.();
  },

  generateCode: () => {
    const { blocklyRef, phaserRef } = get();
    const workspace = blocklyRef?.getWorkspace();
    if (!phaserRef || !workspace) return;

    const code = javascriptGenerator.workspaceToCode(
      workspace as Blockly.Workspace
    );
    console.log('generate code()');
    phaserRef.scene?.runScript(code);
  },

  saveProject: async (showSnackbar) => {
    const { projectId, projectName, blocklyRef, phaserRef, spriteInstances } =
      get();
    if (!projectId) {
      console.log('No project id associated, returning.');
      return;
    }

    const workspace = blocklyRef?.getWorkspace();
    if (!workspace) return;

    const workspaceState = Blockly.serialization.workspaces.save(workspace);
    const phaserState = createPhaserState(phaserRef!);

    try {
      await projectsApi(projectId).update({
        name: projectName,
        blocks: workspaceState,
        game_state: phaserState,
        sprites: spriteInstances,
      });
      showSnackbar('Project saved successfully!', 'success');
    } catch (err) {
      showSnackbar('Project could not be saved. Please try again.', 'error');
    }
  },

  exportWorkspaceState: () => {
    const { blocklyRef } = get();
    const workspace = blocklyRef?.getWorkspace();
    if (!workspace) return;

    const workspaceState = Blockly.serialization.workspaces.save(workspace);
    console.log('Current workspace state', workspaceState);
    console.log('Workspace JSON', JSON.stringify(workspaceState, null, 2));
  },

  undoWorkspace: () => {
    const { blocklyRef, updateUndoRedoState } = get();
    blocklyRef?.getWorkspace()?.undo(false);
    // Update state after a small delay to let Blockly process the undo
    setTimeout(updateUndoRedoState, 10);
  },

  redoWorkspace: () => {
    const { blocklyRef, updateUndoRedoState } = get();
    blocklyRef?.getWorkspace()?.undo(true);
    // Update state after a small delay to let Blockly process the redo
    setTimeout(updateUndoRedoState, 10);
  },
}));

