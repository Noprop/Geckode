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
  spriteLibrary: Sprite[];
  spriteInstances: Sprite[];
  spriteTextures: Map<string, { url: string; hasLoaded: boolean }>;

  isSpriteModalOpen: boolean;
  selectedSpriteId: string | null;
  selectedSprite: Sprite | null;
}
interface Actions {
  setSpriteInstances: (update: Sprite[] | ((state: Sprite[]) => Sprite[])) => void;
  addSpriteToGame: (payload: SpriteAddPayload) => Promise<boolean>;
  removeSpriteFromGame: (spriteId: string) => void;
  updateSprite: (spriteId: string, updates: Partial<Sprite>) => void;
  setIsSpriteModalOpen: (isOpen: boolean) => void;
  setSelectedSpriteId: (spriteId: string) => void;
  setSelectedSprite: (sprite: Sprite) => void;
}

export const useSpriteStore = create<State & Actions>((set, get) => ({
  spriteLibrary: [
    {
      id: 'id_' + Date.now().toString() + '_' + Math.round(Math.random() * 10000),
      textureName: 'hero-walk-front',
      name: 'herowalkfront1',
      x: 200,
      y: 150,
    },
    {
      id: 'id_' + Date.now().toString() + '_' + Math.round(Math.random() * 10000),
      textureName: 'hero-walk-back',
      name: 'herowalkback1',
      x: 200,
      y: 150,
    },
  ],
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
  spriteTextures: new Map<string, { url: string; hasLoaded: boolean }>([
    ['hero-walk-front', { url: '/heroWalkFront1.png', hasLoaded: false }],
    ['hero-walk-back', { url: '/heroWalkBack1.png', hasLoaded: false }],
  ]),
  selectedSpriteId: null,
  selectedSprite: null,
  isSpriteModalOpen: false,

  setIsSpriteModalOpen: (isOpen: boolean) => set({ isSpriteModalOpen: isOpen }),
  setSelectedSpriteId: (spriteId: string) => set({ selectedSpriteId: spriteId }),
  setSelectedSprite: (sprite: Sprite) => set({ selectedSprite: sprite }),

  setSpriteInstances: (update) =>
    set((state) => ({
      spriteInstances: typeof update === 'function' ? update(state.spriteInstances) : update,
    })),
  addSpriteToGame: async (payload: SpriteAddPayload, position?: { x: number; y: number }) => {
    console.log('[editorStore] addSpriteToGame() called', payload, position);
    const { phaserGame, phaserScene, blocklyWorkspace } = useEditorStore.getState();
    const { spriteInstances, spriteTextures } = get();

    if (!phaserGame || !phaserScene || !blocklyWorkspace) {
      // showSnackbar('Game is not ready yet. Try again in a moment.', 'error');
      console.error('[editorStore] addSpriteToGame() - Game is not ready yet. Try again in a moment.');
      return false;
    }
    if (!(phaserScene instanceof EditorScene)) {
      console.error('[editorStore] addSpriteToGame() - Phaser scene is not an EditorScene.');
      return false;
    }

    const ensureTexture = async () => {
      if (phaserScene.textures.exists(payload.textureName)) return true;

      const texture = spriteTextures.get(payload.textureName);
      if (!texture) return false;
      const { url, hasLoaded } = texture;

      if (hasLoaded) {
        const textureReady = new Promise<void>((resolve, reject) => {
          const img = new window.Image();
          img.onload = () => {
            try {
              phaserScene.textures.addImage(payload.textureName, img);
              resolve();
            } catch (err) {
              reject(err);
            }
          };
          img.onerror = () => reject(new Error('Failed to load base64 texture data.'));
          img.src = url;
        });
        await textureReady;
        return true;
      }

      await new Promise<void>((resolve, reject) => {
        const handleComplete = () => {
          phaserScene.load.off('loaderror', handleError);
          resolve();
        };
        const handleError = () => {
          phaserScene.load.off('complete', handleComplete);
          reject(new Error('Failed to load texture from URL.'));
        };
        phaserScene.load.once('complete', handleComplete);
        phaserScene.load.once('loaderror', handleError);
        console.log('loading image', payload.textureName, url);
        phaserScene.load.image(payload.textureName, url);
        phaserScene.load.start();
      });
      return false;
    };

    try {
      await ensureTexture();
    } catch (error) {
      console.warn('Could not load sprite texture.', error);
      // showSnackbar('Could not load that sprite image. Please try again.', 'error');
      console.error('[editorStore] addSpriteToGame() - Could not load that sprite image. Please try again.');
      return false;
    }

    if (!phaserScene.textures.exists(payload.textureName)) {
      // showSnackbar('Upload a sprite image before adding it to the game.', 'error');
      console.error('[editorStore] addSpriteToGame() - Upload a sprite image before adding it to the game.');
      return false;
    }

    const width = phaserGame.scale?.width || phaserGame.canvas?.width;
    const height = phaserGame.scale?.height || phaserGame.canvas?.height;
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
    phaserScene.createSprite(payload.textureName, worldX, worldY, spriteId);

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

  removeSpriteFromGame: (spriteId: string) => {
    const { phaserGame, phaserScene } = useEditorStore.getState();
    if (!phaserGame || !phaserScene) throw new Error('Game is not ready yet.');
    if (!(phaserScene instanceof EditorScene)) throw new Error('Should not be able to remove sprite from game scene.');

    phaserScene.removeSprite(spriteId);
    set((state) => ({
      spriteInstances: state.spriteInstances.filter((instance) => instance.id !== spriteId),
    }));
  },

  updateSprite: (spriteId: string, updates: Partial<Sprite>) => {
    const { phaserGame, phaserScene } = useEditorStore.getState();
    if (!phaserGame || !phaserScene) throw new Error('Game is not ready yet.');
    if (!(phaserScene instanceof EditorScene)) throw new Error('Should not be able to update sprite from game scene.');

    phaserScene.updateSprite(spriteId, updates);
    set((state) => ({
      spriteInstances: state.spriteInstances.map((instance) =>
        instance.id === spriteId ? { ...instance, ...updates } : instance
      ),
    }));
  },
}));
