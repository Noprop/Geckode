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
import { PhaserRef } from '@/components/ProjectView';
// import type { WorkspaceOutputType } from '@/blockly/javascriptGenerator';

// Auto-convert debounce configuration
let convertTimeoutId: ReturnType<typeof setTimeout> | null = null;
const DEBOUNCE_MS = 400;

interface State {
  // Refs
  phaserRef: PhaserRef | null;
  blocklyInstance: BlocklyEditorHandle | null;
  blocklyWorkspace: Blockly.WorkspaceSvg | null;

  // State
  projectId: number | null;
  projectName: string;
  spriteInstances: SpriteInstance[];
  spriteTextures: Map<string, string>;
  phaserState: PhaserExport | null;
  canUndo: boolean;
  canRedo: boolean;
  isConverting: boolean;
  isEditorScene: boolean;
  spriteWorkspaces: Map<string, Blockly.serialization.workspaceComments.State>;
  // @ts-expect-error TODO: fix this
  spriteOutputs: Map<string, WorkspaceOutputType>;
  spriteId: string;
  updateId: number;
  startId: number;
}

interface Actions {
  // Registration Actions
  setPhaserRef: (phaserRef: PhaserRef) => void;
  setBlocklyInstance: (blocklyInstance: BlocklyEditorHandle) => void;
  setBlocklyWorkspace: (blocklyWorkspace: Blockly.WorkspaceSvg) => void;
  setProjectId: (id: number) => void;
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
  toggleGame: () => void;

  // Sprite Actions
  addSpriteToGame: (payload: SpriteAddPayload) => Promise<boolean>;
  removeSpriteFromGame: (spriteId: string) => Promise<boolean>;
  updateSprite: (spriteId: string, updates: Partial<SpriteInstance>) => Promise<boolean>;
}

export interface SpriteAddPayload {
  name: string;
  textureName: string;
  textureUrl: string;
  x?: number;
  y?: number;
}

export const useEditorStore = create<State & Actions>((set, get) => ({
  phaserRef: null,
  blocklyInstance: null,
  blocklyWorkspace: null,
  projectId: null,
  projectName: '',
  spriteInstances: [
    // TODO handle default sprite instances for a default project
    {
      id: 'id_' + Date.now().toString() + '_' + Math.round(Math.random() * 10000),
      textureName: 'hero-walk-front',
      name: 'herowalkfront1',
      x: 200,
      y: 150,
    },
  ],
  spriteTextures: new Map<string, string>([['hero-walk-front', '/heroWalkFront1.bmp']]),
  phaserState: null,
  canUndo: false,
  canRedo: false,
  isConverting: false,
  isEditorScene: true,
  spriteWorkspaces: new Map(),
  spriteOutputs: new Map(),
  spriteId: '',
  updateId: 0,
  startId: 0,

  setPhaserRef: (phaserRef) => set({ phaserRef }),
  setBlocklyInstance: (blocklyInstance) => set({ blocklyInstance }),
  setBlocklyWorkspace: (blocklyWorkspace) => set({ blocklyWorkspace }),
  setProjectId: (projectId) => set({ projectId }),
  setProjectName: (projectName) => set({ projectName }),
  setSpriteInstances: (update) =>
    set((state) => ({
      spriteInstances: typeof update === 'function' ? update(state.spriteInstances) : update,
    })),
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
    const { blocklyWorkspace, phaserRef, spriteOutputs, spriteId } = get();
    if (!phaserRef || !blocklyWorkspace) return;

    const code = javascriptGenerator.workspaceToCode(blocklyWorkspace);
    // @ts-expect-error TODO: fix this
    const output: WorkspaceOutputType = {
      code: code,
      updateHandlers: (javascriptGenerator as any).updateHandlers ?? [],
      startHandlers: (javascriptGenerator as any).startHandlers ?? [],
    };

    spriteOutputs.set(spriteId, output);
    console.log('generateCode spriteOutputs: ', spriteOutputs);
    console.log('generateCode spriteId: ', spriteId);

    // save workspace state (should be moved later)
    const { spriteWorkspaces } = get();
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
    const { projectId, projectName, blocklyWorkspace, phaserRef, spriteInstances } = get();
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
    console.log('[editorStore] loadWorkspace called', spriteId);
    const { spriteWorkspaces, blocklyWorkspace } = get();
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
      const { spriteInstances, spriteOutputs } = get();
      const outputs = spriteInstances.map((s) => spriteOutputs.get(s.id));
      console.log('toggle game outputs: ', outputs);
      console.log('toggle game outputs: ', spriteOutputs);
      // const outputs = spriteInstances.map((s) => spriteOutputs.get(s.id)).filter(Boolean);
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
        scene.startHook = () => {
          ${startBody}
        };
      `;

      const code = [...outputs.map((o) => o?.code), startCode, updateCode].join('\n\n');
      const { spriteTextures } = get();

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

  addSpriteToGame: async (payload: SpriteAddPayload, position?: { x: number; y: number }) => {
    console.log('[editorStore] addSpriteToGame() called', payload, position);
    const { phaserRef, blocklyWorkspace, spriteInstances, spriteTextures } = get();
    const game = phaserRef?.game;
    const scene = phaserRef?.scene;
    if (!game || !scene || !blocklyWorkspace) {
      // showSnackbar('Game is not ready yet. Try again in a moment.', 'error');
      console.error('[editorStore] addSpriteToGame() - Game is not ready yet. Try again in a moment.');
      return false;
    }

    const ensureTexture = async () => {
      console.log('ensureTexture', payload);
      if (scene.textures.exists(payload.textureName)) return;
      if (!spriteTextures.get(payload.textureName)) {
        throw new Error('Missing texture data for sprite payload.');
      }

      const dataUrl = spriteTextures.get(payload.textureName);
      const isDataUrl = dataUrl?.startsWith('data:');
      if (isDataUrl) {
        const textureReady = new Promise<void>((resolve, reject) => {
          const img = new window.Image();
          img.onload = () => {
            try {
              scene.textures.addImage(payload.textureName, img);
              resolve();
            } catch (err) {
              reject(err);
            }
          };
          img.onerror = () => reject(new Error('Failed to load base64 texture data.'));
          img.src = dataUrl || '';
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
        console.log('loading image', payload.textureName, dataUrl);
        scene.load.image(payload.textureName, dataUrl);
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

    if (!scene.textures.exists(payload.textureName)) {
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

    const safeBase = payload.textureName.replace(/[^\w]/g, '') || 'sprite';
    const duplicateCount = spriteInstances.filter((instance) => instance.name === payload.textureName).length;
    const name = `${safeBase}${duplicateCount + 1}`;
    const spriteId = `id_${Date.now()}_${Math.round(Math.random() * 1e4)}`;

    (scene as EditorScene).createSprite(payload.textureName, worldX, worldY, spriteId);

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
          textureName: payload.textureName,
          name: name,
          x: worldX,
          y: worldY,
        },
      ],
    }));

    return true;
  },

  removeSpriteFromGame: async (spriteId: string) => {
    const { phaserRef, blocklyWorkspace, spriteInstances } = get();
    const game = phaserRef?.game;
    const scene = phaserRef?.scene;
    if (!game || !scene || !blocklyWorkspace) {
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
    const { phaserRef, blocklyWorkspace, spriteInstances } = get();
    const game = phaserRef?.game;
    const scene = phaserRef?.scene;
    if (!game || !scene || !blocklyWorkspace) {
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
