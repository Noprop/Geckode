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
import type { SpriteDragPayload } from '@/components/SpriteModal/SpriteModal';
import { PhaserRef } from '@/components/ProjectView';
// import type { WorkspaceOutputType } from '@/blockly/javascriptGenerator';

// Auto-convert debounce configuration
let convertTimeoutId: ReturnType<typeof setTimeout> | null = null;
const DEBOUNCE_MS = 400;

interface State {
  // Refs
  phaserRef: PhaserRef | null;
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
  // @ts-expect-error TODO: fix this
  spriteOutputs: Map<string, WorkspaceOutputType>;
  spriteId: string;
  updateId: number;
  startId: number;
}

interface Actions {
  // Registration Actions
  setPhaserRef: (ref: PhaserRef | null) => void;
  setBlocklyRef: (ref: BlocklyEditorHandle | null) => void;
  setProjectId: (id: number | null) => void;
  setProjectName: (name: string) => void;
  setSpriteInstances: (update: SpriteInstance[] | ((state: SpriteInstance[]) => SpriteInstance[])) => void;
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
  togglePause: () => void;

  // Sprite Actions
  addSpriteToGame: (payload: SpriteDragPayload, position?: { x: number; y: number }) => Promise<boolean>;
  removeSpriteFromGame: (spriteId: string) => Promise<boolean>;
  updateSprite: (spriteId: string, updates: Partial<SpriteInstance>) => Promise<boolean>;
}

export const useEditorStore = create<State & Actions>((set, get) => ({
  phaserRef: null,
  blocklyRef: null,
  projectId: null,
  projectName: '',
  spriteInstances: [
    // TODO handle default sprite instances for a default project
    {
      id: 'id_' + Date.now().toString() + '_' + Math.round(Math.random() * 10000),
      tid: '1',
      name: 'herowalkfront1',
      x: 200,
      y: 150,
    },
  ],
  textures: new Map<string, { name: string; file: string }>([
    ['1', { name: 'hero-walk-front', file: '/heroWalkFront1.bmp' }],
  ]),
  phaserState: null,
  canUndo: false,
  canRedo: false,
  isConverting: false,
  isPaused: true,
  spriteWorkspaces: new Map(),
  spriteOutputs: new Map(),
  spriteId: '',
  updateId: 0,
  startId: 0,

  setPhaserRef: (phaserRef) => set({ phaserRef }),
  setBlocklyRef: (blocklyRef) => set({ blocklyRef }),
  setProjectId: (projectId) => set({ projectId }),
  setProjectName: (projectName) => set({ projectName }),
  setSpriteInstances: (update) =>
    set((state) => ({
      spriteInstances: typeof update === 'function' ? update(state.spriteInstances) : update,
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
    const undoStack = (workspace as unknown as { undoStack_: unknown[] }).undoStack_ || [];
    const redoStack = (workspace as unknown as { redoStack_: unknown[] }).redoStack_ || [];
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

    const code = javascriptGenerator.workspaceToCode(workspace as Blockly.Workspace);
    // @ts-expect-error TODO: fix this
    const output: WorkspaceOutputType = {
      code: code,
      updateHandlers: (javascriptGenerator as any).updateHandlers ?? [],
      startHandlers: (javascriptGenerator as any).startHandlers ?? [],
    };

    spriteOutputs.set(spriteId, output);
    console.log('[editorStore] generateCode()\n', code);
    // save workspace state (should be moved later)
    const { spriteWorkspaces } = get();
    const state = Blockly.serialization.workspaces.save(workspace);

    spriteWorkspaces.set(spriteId, state);
  },

  scheduleConvert: () => {
    // Show loader immediately when changes are detected
    set({ isConverting: true });

    // Clear any existing debounce timer
    if (convertTimeoutId) clearTimeout(convertTimeoutId);

    const attemptConvert = () => {
      const { phaserRef, blocklyRef, generateCode } = get();

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
    const { projectId, projectName, blocklyRef, phaserRef, spriteInstances } = get();
    if (!projectId) {
      console.error('[editorStore] saveProject() - No project id associated, returning.');
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

      const outputs = spriteInstances.map((s) => spriteOutputs.get(s.id));

      console.log('outputs', outputs);

      const allUpdateHandlers = outputs.flatMap((o) => o?.updateHandlers);
      const allStartHandlers = outputs.flatMap((o) => o?.startHandlers);

      const updateBody = allUpdateHandlers.map((h) => `  ${h?.functionName}('${h?.spriteId}');`).join('\n');

      const startBody = allStartHandlers.map((h) => `  ${h?.functionName}('${h?.spriteId}');`).join('\n');

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

      const code = [...outputs.map((o) => o?.code), startCode, updateCode].join('\n\n');

      console.log('final code:\n' + code);

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

  addSpriteToGame: async (payload: SpriteDragPayload, position?: { x: number; y: number }) => {
    console.log('[editorStore] addSpriteToGame() called', payload, position);
    const { phaserRef, blocklyRef, spriteInstances } = get();
    const game = phaserRef?.game;
    const scene = phaserRef?.scene;
    const workspace = blocklyRef?.getWorkspace() as Blockly.WorkspaceSvg | null;

    if (!game || !scene || !workspace) {
      // showSnackbar('Game is not ready yet. Try again in a moment.', 'error');
      console.error('[editorStore] addSpriteToGame() - Game is not ready yet. Try again in a moment.');
      return false;
    }

    const ensureTexture = async () => {
      if (scene.textures.exists(payload.texture)) return;
      if (!payload.dataUrl) {
        throw new Error('Missing texture data for sprite payload.');
      }

      const dataUrl = payload.dataUrl;
      const isDataUrl = dataUrl.startsWith('data:');
      if (isDataUrl) {
        const textureReady = new Promise<void>((resolve, reject) => {
          const img = new window.Image();
          img.onload = () => {
            try {
              scene.textures.addImage(payload.texture, img);
              resolve();
            } catch (err) {
              reject(err);
            }
          };
          img.onerror = () => reject(new Error('Failed to load base64 texture data.'));
          img.src = dataUrl;
        });
        await textureReady;
        return;
      }

      await new Promise<void>((resolve, reject) => {
        const handleComplete = () => {
          scene.load.off('loaderror', handleError);
          resolve();
        };
        const handleError = () => {
          scene.load.off('complete', handleComplete);
          reject(new Error('Failed to load texture from URL.'));
        };
        scene.load.once('complete', handleComplete);
        scene.load.once('loaderror', handleError);
        console.log('loading image', payload.texture, dataUrl);
        scene.load.image(payload.texture, dataUrl);
        scene.load.start();
      });
    };

    try {
      await ensureTexture();
    } catch (error) {
      console.warn('Could not load sprite texture.', error);
      // showSnackbar('Could not load that sprite image. Please try again.', 'error');
      console.error('[editorStore] addSpriteToGame() - Could not load that sprite image. Please try again.');
      return false;
    }

    if (!scene.textures.exists(payload.texture)) {
      // showSnackbar('Upload a sprite image before adding it to the game.', 'error');
      console.error('[editorStore] addSpriteToGame() - Upload a sprite image before adding it to the game.');
      return false;
    }

    const width = game.scale?.width || game.canvas?.width;
    const height = game.scale?.height || game.canvas?.height;
    if (!width || !height) {
      // showSnackbar('Could not determine game size. Try again.', 'error');
      console.error('[editorStore] addSpriteToGame() - Could not determine game size. Try again.');
      return false;
    }

    const worldX = position?.x ?? Math.round(width / 2);
    const worldY = position?.y ?? Math.round(height / 2);

    const safeBase = payload.texture.replace(/[^\w]/g, '') || 'sprite';
    const duplicateCount = spriteInstances.filter((instance) => instance.name === payload.texture).length;
    const name = `${safeBase}${duplicateCount + 1}`;
    const spriteId = `id_${Date.now()}_${Math.round(Math.random() * 1e4)}`;

    (scene as EditorScene).createSprite(payload.texture, worldX, worldY, spriteId);

    // const newBlock = workspace.newBlock('createSprite');
    // newBlock.setFieldValue(variableName, 'NAME');
    // newBlock.setFieldValue(payload.texture, 'TEXTURE');
    // newBlock.setFieldValue(String(worldX), 'X');
    // newBlock.setFieldValue(String(worldY), 'Y');
    // newBlock.initSvg();
    // newBlock.render();
    // attachBlockToOnStart(workspace, newBlock);

    set(() => ({
      spriteInstances: [
        ...spriteInstances,
        {
          id: spriteId,
          tid: payload.texture,
          name: name,
          x: worldX,
          y: worldY,
        },
      ],
    }));

    return true;
  },

  removeSpriteFromGame: async (spriteId: string) => {
    const { phaserRef, blocklyRef, spriteInstances } = get();
    const game = phaserRef?.game;
    const scene = phaserRef?.scene;
    const workspace = blocklyRef?.getWorkspace() as Blockly.WorkspaceSvg | null;

    if (!game || !scene || !workspace) {
      // showSnackbar('Game is not ready yet. Try again in a moment.', 'error');
      console.error('[editorStore] removeSpriteFromGame() - Game is not ready yet. Try again in a moment.');
      return false;
    }

    (scene as EditorScene).removeSprite(spriteId);

    set(() => ({
      spriteInstances: spriteInstances.filter((instance) => instance.id !== spriteId),
    }));

    return true;
  },

  updateSprite: async (spriteId: string, updates: Partial<SpriteInstance>) => {
    const { phaserRef, blocklyRef, spriteInstances } = get();
    const game = phaserRef?.game;
    const scene = phaserRef?.scene;
    const workspace = blocklyRef?.getWorkspace() as Blockly.WorkspaceSvg | null;

    if (!game || !scene || !workspace) {
      // showSnackbar('Game is not ready yet. Try again in a moment.', 'error');
      console.error('[editorStore] updateSprite() - Game is not ready yet. Try again in a moment.');
      return false;
    }

    (scene as EditorScene).updateSprite(spriteId, updates);

    set(() => ({
      spriteInstances: spriteInstances.map((instance) =>
        instance.id === spriteId ? { ...instance, ...updates } : instance
      ),
    }));

    return true;
  },
}));
