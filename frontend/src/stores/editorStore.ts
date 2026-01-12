import { create } from 'zustand';
import { Game } from 'phaser';
import { BlocklyEditorHandle } from '@/components/BlocklyEditor';
import type { SpriteInstance } from '@/blockly/spriteRegistry';
import { PhaserExport, createPhaserState } from '@/phaser/PhaserStateManager';
import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import projectsApi from '@/lib/api/handlers/projects';
import { EventBus } from '@/phaser/EventBus';
import EditorScene from '@/phaser/scenes/EditorScene';

// Auto-convert debounce configuration
let convertTimeoutId: ReturnType<typeof setTimeout> | null = null;
const DEBOUNCE_MS = 400;

export type PhaserRefValue = {
  readonly game: Game;
  readonly scene: Phaser.Scene;
} | null;

export type WorkspaceOutput = {
  code: string;
  updateHandlers: {
    spriteId: string;
    functionName: string;
  }[];
  startHandlers: {
    spriteId: string;
    functionName: string;
  }[];
};

interface EditorState {
  // Refs
  phaserRef: PhaserRefValue;
  blocklyRef: BlocklyEditorHandle | null;

  // State
  projectId: number | null;
  projectName: string;
  spriteInstances: SpriteInstance[];
  textures: Map<string, { name: string; file: string }>;
  phaserState: PhaserExport | null;
  canUndo: boolean;
  canRedo: boolean;
  isConverting: boolean;
  isPaused: boolean;
  spriteWorkspaces: Map<string, Blockly.serialization.workspaceComments.State>;
  spriteOutputs: Map<string, WorkspaceOutput>;
  spriteId: string;
  updateId: number;
  startId: number;

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
  scheduleConvert: () => void;
  cancelScheduledConvert: () => void;
  saveProject: (
    showSnackbar: (msg: string, type: 'success' | 'error') => void
  ) => Promise<void>;
  exportWorkspaceState: () => void;
  undoWorkspace: () => void;
  redoWorkspace: () => void;
  loadWorkspace: (id: string) => void;
  togglePause: () => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  phaserRef: null,
  blocklyRef: null,
  projectId: null,
  projectName: '',
  spriteInstances: [
    {
      id:
        'id_' + Date.now().toString() + '_' + Math.round(Math.random() * 10000),
      tid: '1',
      name: 'herowalkfront1',
      x: 200,
      y: 150,
    },
  ],
  textures: new Map<string, { name: string; file: string }>([
    [
      '1',
      {
        name: 'hero-walk-front',
        file: '/heroWalkFront1.bmp',
      },
    ],
  ]),
  phaserState: null,
  canUndo: false,
  canRedo: false,
  isConverting: false,
  isPaused: true,
  spriteWorkspaces: new Map(),
  spriteOutputs: new Map(),
  spriteId:
    'id_' + Date.now().toString() + '_' + Math.round(Math.random() * 10000),
  updateId: 0,
  startId: 0,

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
    (phaserRef?.scene as EditorScene).changeScene();
  },

  generateCode: () => {
    const { blocklyRef, phaserRef, spriteOutputs, spriteId } = get();
    const workspace = blocklyRef?.getWorkspace();
    if (!phaserRef || !workspace) return;

    const code = javascriptGenerator.workspaceToCode(
      workspace as Blockly.Workspace
    );

    const output = {
      code: code,
      updateHandlers: (javascriptGenerator as any).updateHandlers ?? [],
      startHandlers: (javascriptGenerator as any).startHandlers ?? [],
    };

    spriteOutputs.set(spriteId, output)

    console.log(spriteOutputs);

    console.log('generate code()\n', code);
    // phaserRef.scene?.runScript(code);

    const { spriteInstances } = get();
    console.log(spriteInstances);

    // save workspace (should be moved later)
    const { spriteWorkspaces } = get();
    const state = Blockly.serialization.workspaces.save(workspace);

    spriteWorkspaces.set(spriteId, state);
  },

  scheduleConvert: () => {
    console.log('scheduleConvert()');
    // Show loader immediately when changes are detected
    set({ isConverting: true });

    // Clear any existing debounce timer
    if (convertTimeoutId) clearTimeout(convertTimeoutId);

    const attemptConvert = () => {
      const { phaserRef, blocklyRef, generateCode } = get();
      console.log(!phaserRef?.scene, !blocklyRef?.getWorkspace());

      if (!phaserRef?.scene || !blocklyRef?.getWorkspace()) {
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

  loadWorkspace: (spriteId) => {
    if (spriteId === get().spriteId) return;
    console.log('[editorStore] loadWorkspace called', spriteId);
    const { spriteWorkspaces, blocklyRef } = get();
    set({ spriteId: spriteId });

    const workspace = blocklyRef?.getWorkspace();
    if (!workspace) return;
    workspace.clear();

    const state = spriteWorkspaces.get(spriteId);
    if (!state) return;

    Blockly.serialization.workspaces.load(state, workspace);

    console.log(`sprite ${spriteId} workspace loaded`);
  },

  togglePause: () => {
    const { isPaused, phaserRef, blocklyRef } = get();
    const newPaused = !isPaused;
    set({ isPaused: newPaused });

    if (!newPaused) {
      // PLAY: Switch to GameScene

      const { spriteInstances, spriteOutputs } = get();

      const outputs = spriteInstances.map(s => spriteOutputs.get(s.id));

      console.log("outputs", outputs)
      
      const allUpdateHandlers = outputs.flatMap(o => o?.updateHandlers);
      const allStartHandlers = outputs.flatMap(o => o?.startHandlers);

      const updateBody = allUpdateHandlers
        .map(h => `  ${h?.functionName}('${h?.spriteId}');`)
        .join('\n');

      const startBody = allStartHandlers
        .map(h => `  ${h?.functionName}('${h?.spriteId}');`)
        .join('\n');

      const updateCode = `
        scene.update = () => {
        ${updateBody}
        };
        `;

      const startCode = `
        scene.start = () => {
        ${startBody}
        };
        `;

      const code = [
        ...outputs.map(o => o?.code),
        startCode,
        updateCode
      ].join('\n\n');

      console.log("final code:\n" + code);
      

      const { textures } = get();

      // Pass data to GameScene
      phaserRef?.scene?.scene.start('GameScene', {
        spriteInstances,
        textures,
        code,
      });
    } else {
      // STOP: Switch back to EditorScene
      phaserRef?.scene?.scene.start('EditorScene');
    }

    // const { isPaused, phaserRef } = get();
    // const newPaused = !isPaused;
    // console.log('[editorStore] togglePause:', newPaused);
    // set({ isPaused: newPaused });

    // // Emit event for Phaser to show/hide editor grid
    // console.log('[editorStore] emitting editor-pause-changed:', newPaused);
    // EventBus.emit('editor-pause-changed', newPaused);

    // setTimeout(() => {
    //   if (phaserRef?.game) {
    //     phaserRef.game.isPaused = newPaused;
    //   }
    // }, 1000);
    // get().scheduleConvert();
  },
}));

