import type { Sprite } from '@/blockly/spriteRegistry';
import { create } from 'zustand';
import { useEditorStore } from './editorStore';
import EditorScene from '@/phaser/scenes/EditorScene';

export interface SpriteAddPayload {
  name: string;
  textureName: string;
  textureUrl: string;
  x?: number;
  y?: number;
}

interface State {
  spriteInstances: Sprite[];
  spriteTextures: Map<string, string>;
}
interface Actions {
  setSpriteInstances: (update: Sprite[] | ((state: Sprite[]) => Sprite[])) => void;
  addSpriteToGame: (payload: SpriteAddPayload) => Promise<boolean>;
  removeSpriteFromGame: (spriteId: string) => Promise<boolean>;
  updateSprite: (spriteId: string, updates: Partial<Sprite>) => Promise<boolean>;
}

export const useSpriteStore = create<State & Actions>((set, get) => ({
  // TODO: handle default sprite instances for a default project
  spriteInstances: [
    {
      id: 'id_' + Date.now().toString() + '_' + Math.round(Math.random() * 10000),
      textureName: 'hero-walk-front',
      name: 'herowalkfront1',
      x: 200,
      y: 150,
    },
  ],
  spriteTextures: new Map<string, string>([['hero-walk-front', '/heroWalkFront1.bmp']]),
  
  setSpriteInstances: (update) =>
    set((state) => ({
      spriteInstances: typeof update === 'function' ? update(state.spriteInstances) : update,
    })),
  addSpriteToGame: async (payload: SpriteAddPayload, position?: { x: number; y: number }) => {
    console.log('[editorStore] addSpriteToGame() called', payload, position);
    const { phaserRef, blocklyWorkspace } = useEditorStore.getState();
    const { spriteInstances, spriteTextures } = get();

    const game = phaserRef?.game;
    const scene = phaserRef?.scene;
    if (!game || !scene || !blocklyWorkspace) {
      // showSnackbar('Game is not ready yet. Try again in a moment.', 'error');
      console.error('[editorStore] addSpriteToGame() - Game is not ready yet. Try again in a moment.');
      return false;
    }

    const ensureTexture = async () => {
      if (scene.textures.exists(payload.textureName)) return true;

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
    const { phaserRef, blocklyWorkspace } = useEditorStore.getState();
    const { spriteInstances } = useSpriteStore.getState();
    const game = phaserRef?.game;
    const scene = phaserRef?.scene;
    if (!game || !scene || !blocklyWorkspace) throw new Error('Game is not ready yet.');

    (scene as EditorScene).removeSprite(spriteId);

    set(() => ({
      spriteInstances: spriteInstances.filter((instance) => instance.id !== spriteId),
    }));

    return true;
  },

  updateSprite: async (spriteId: string, updates: Partial<Sprite>) => {
    const { phaserRef, blocklyWorkspace } = useEditorStore.getState();
    const { spriteInstances } = useSpriteStore.getState();
    const game = phaserRef?.game;
    const scene = phaserRef?.scene;
    if (!game || !scene || !blocklyWorkspace) throw new Error('Game is not ready yet.');

    (scene as EditorScene).updateSprite(spriteId, updates);

    set(() => ({
      spriteInstances: spriteInstances.map((instance) =>
        instance.id === spriteId ? { ...instance, ...updates } : instance
      ),
    }));

    return true;
  },
}));