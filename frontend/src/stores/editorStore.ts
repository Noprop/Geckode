import { create } from 'zustand';
import { BlocklyEditorHandle } from '@/components/BlocklyEditor';
import type { Sprite } from '@/blockly/spriteRegistry';
import { PhaserExport, createPhaserState } from '@/phaser/PhaserStateManager';
import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import projectsApi from '@/lib/api/handlers/projects';
import EditorScene from '@/phaser/scenes/EditorScene';
import { PhaserRef } from '@/components/ProjectView';
import { useSpriteStore } from './spriteStore';

// Auto-convert debounce configuration
let convertTimeoutId: ReturnType<typeof setTimeout> | null = null;
const DEBOUNCE_MS = 400;

interface HandlerRef {
  functionName: string;
  spriteId: string;
}
interface WorkspaceOutputType {
  code: string;
  updateHandlers: HandlerRef[];
  startHandlers: HandlerRef[];
}

interface State {
  // Refs
  phaserRef: PhaserRef | null;
  blocklyInstance: BlocklyEditorHandle | null;
  blocklyWorkspace: Blockly.WorkspaceSvg | null;

  // State
  projectId: number | null;
  projectName: string;
  phaserState: PhaserExport | null;
  canUndo: boolean;
  canRedo: boolean;
  isConverting: boolean;
  isEditorScene: boolean;

  // Workspace state
  spriteId: string;
  spriteWorkspaces: Map<string, Blockly.serialization.workspaceComments.State>;
  spriteOutputs: Map<string, WorkspaceOutputType>;
}

interface Actions {
  // Registration Actions
  setPhaserRef: (phaserRef: PhaserRef) => void;
  setBlocklyInstance: (blocklyInstance: BlocklyEditorHandle) => void;
  setBlocklyWorkspace: (blocklyWorkspace: Blockly.WorkspaceSvg) => void;
  setProjectId: (id: number) => void;
  setProjectName: (name: string) => void;
  setPhaserState: (phaserState: PhaserExport | null) => void;
  updateUndoRedoState: () => void;

  // Editor Actions
  changeScene: () => void;
  generateCode: () => void;
  scheduleConvert: () => void;
  cancelScheduledConvert: () => void;
  saveProject: (showSnackbar: (msg: string, type: 'success' | 'error') => void) => Promise<void>;
  exportWorkspaceState: () => void;
  undoWorkspace: () => void;
  redoWorkspace: () => void;
  loadWorkspace: (id: string) => void;
  toggleGame: () => void;
}

export const useEditorStore = create<State & Actions>((set, get) => ({
  phaserRef: null,
  blocklyInstance: null,
  blocklyWorkspace: null,

  // Project state
  projectId: null,
  projectName: '',
  phaserState: null,
  canUndo: false,
  canRedo: false,
  isConverting: false,
  isEditorScene: true,

  // Workspace state
  spriteId: '',
  spriteWorkspaces: new Map(),
  spriteOutputs: new Map(),

  setPhaserRef: (phaserRef) => set({ phaserRef }),
  setBlocklyInstance: (blocklyInstance) => set({ blocklyInstance }),
  setBlocklyWorkspace: (blocklyWorkspace) => set({ blocklyWorkspace }),
  setProjectId: (projectId) => set({ projectId }),
  setProjectName: (projectName) => set({ projectName }),
  setPhaserState: (phaserState) => set({ phaserState }),
  updateUndoRedoState: () => {
    const { blocklyWorkspace } = get();
    if (!blocklyWorkspace) return;

    // Access Blockly's internal undo stacks
    const undoStack = (blocklyWorkspace as unknown as { undoStack_: unknown[] }).undoStack_ || [];
    const redoStack = (blocklyWorkspace as unknown as { redoStack_: unknown[] }).redoStack_ || [];
    set({
      canUndo: undoStack.length > 0,
      canRedo: redoStack.length > 0,
    });
  },

  changeScene: () => {
    const { phaserRef } = get();
    (phaserRef?.scene as EditorScene).changeScene();
  },

  generateCode: () => {
    const { blocklyWorkspace, phaserRef, spriteWorkspaces, spriteOutputs, spriteId } = get();
    if (!phaserRef || !blocklyWorkspace) return;

    const code = javascriptGenerator.workspaceToCode(blocklyWorkspace);
    const output: WorkspaceOutputType = {
      code: code,
      updateHandlers: (javascriptGenerator as any).updateHandlers ?? [],
      startHandlers: (javascriptGenerator as any).startHandlers ?? [],
    };

    spriteOutputs.set(spriteId, output);
    console.log('generateCode spriteId: ', spriteId);
    console.log('generateCode spriteOutputs: ', JSON.stringify(spriteOutputs, null, 2));
    console.log('generateCode workspace code: \n', code);

    // save workspace state (should be moved later)
    const state = Blockly.serialization.workspaces.save(blocklyWorkspace);
    spriteWorkspaces.set(spriteId, state);
  },

  scheduleConvert: () => {
    // Show loader immediately when changes are detected
    set({ isConverting: true });

    // Clear any existing debounce timer
    if (convertTimeoutId) clearTimeout(convertTimeoutId);

    const attemptConvert = () => {
      const { phaserRef, blocklyWorkspace, generateCode } = get();

      if (!phaserRef?.scene || !blocklyWorkspace) {
        // Retry after a short delay if not ready yet
        convertTimeoutId = setTimeout(attemptConvert, 100);
        return;
      }

      // Execute code and hide loader immediately after
      generateCode();
      set({ isConverting: false });
      convertTimeoutId = null;
    };

    // Initial debounce: wait for user to stop making changes
    convertTimeoutId = setTimeout(attemptConvert, DEBOUNCE_MS);
  },

  cancelScheduledConvert: () => {
    if (convertTimeoutId) {
      clearTimeout(convertTimeoutId);
      convertTimeoutId = null;
    }
  },

  saveProject: async (showSnackbar) => {
    const { projectId, projectName, blocklyWorkspace, phaserRef } = get();
    const { spriteInstances } = useSpriteStore.getState();
    if (!projectId) {
      console.error('[editorStore] saveProject() - No project id associated, returning.');
      return;
    }
    if (!blocklyWorkspace || !phaserRef) return;

    const workspaceState = Blockly.serialization.workspaces.save(blocklyWorkspace);
    const phaserState = createPhaserState(phaserRef);

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
    const { blocklyWorkspace } = get();
    if (!blocklyWorkspace) return;

    const workspaceState = Blockly.serialization.workspaces.save(blocklyWorkspace);

    console.log('Current workspace state', workspaceState);
    console.log('Workspace JSON', JSON.stringify(workspaceState, null, 2));
  },

  undoWorkspace: () => {
    const { blocklyWorkspace, updateUndoRedoState } = get();
    if (!blocklyWorkspace) return;
    blocklyWorkspace.undo(false);
    setTimeout(updateUndoRedoState, 10);
  },

  redoWorkspace: () => {
    const { blocklyWorkspace, updateUndoRedoState } = get();
    if (!blocklyWorkspace) return;
    blocklyWorkspace.undo(true);
    // Update state after a small delay to let Blockly process the redo
    setTimeout(updateUndoRedoState, 10);
  },

  loadWorkspace: (spriteId) => {
    if (spriteId === get().spriteId) return;
    const { blocklyWorkspace, spriteWorkspaces } = get();
    set({ spriteId: spriteId });

    if (!blocklyWorkspace) return;
    blocklyWorkspace.clear();

    const state = spriteWorkspaces.get(spriteId);
    if (!state) return;

    Blockly.serialization.workspaces.load(state, blocklyWorkspace);
    console.log(`sprite ${spriteId} workspace loaded`);
  },

  toggleGame: () => {
    const { isEditorScene, phaserRef } = get();
    set({ isEditorScene: !isEditorScene });

    if (!phaserRef) {
      console.error('[editorStore] toggleGame() - Phaser ref is not set.');
      return;
    }

    if (isEditorScene) {
      const { spriteInstances } = useSpriteStore.getState();
      const { spriteOutputs } = get();
      const outputs = spriteInstances.map((s) => spriteOutputs.get(s.id));
      const allUpdateHandlers = outputs.flatMap((o) => o?.updateHandlers).filter(Boolean);
      const allStartHandlers = outputs.flatMap((o) => o?.startHandlers).filter(Boolean);
      const updateBody = allUpdateHandlers.map((h) => `  ${h?.functionName}('${h?.spriteId}');`).join('\n');
      const startBody = allStartHandlers.map((h) => `  ${h?.functionName}('${h?.spriteId}');`).join('\n');

      const updateCode = `
        scene.update = () => {
          ${updateBody}
        };
      `;
      const startCode = `
        scene.startHook = () => {
          ${startBody}
        };
      `;

      const code = [...outputs.map((o) => o?.code), startCode, updateCode].join('\n\n');
      const { spriteTextures } = useSpriteStore.getState();

      // this calls GameScene.create()
      phaserRef.scene.scene.start('GameScene', {
        spriteInstances,
        spriteTextures,
        code,
      });
    } else {
      phaserRef?.scene?.scene.start('EditorScene');
    }
  },
}));
