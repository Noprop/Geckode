import type { SpriteDefinition, SpriteInstance } from '@/blockly/spriteRegistry';
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
  spriteLibrary: SpriteDefinition[];
  spriteInstances: SpriteInstance[];
  spriteTextures: Map<string, { url: string; hasLoaded: boolean }>;

  isSpriteModalOpen: boolean;
  selectedSpriteId: string | null;
  selectedSprite: SpriteInstance | null;
}
interface Actions {
  setSpriteInstances: (update: SpriteInstance[] | ((state: SpriteInstance[]) => SpriteInstance[])) => void;
  addSpriteToGame: (payload: SpriteAddPayload) => Promise<boolean>;
  removeSpriteFromGame: (spriteId: string) => void;
  updateSprite: (spriteId: string, updates: Partial<SpriteInstance>) => void;
  setIsSpriteModalOpen: (isOpen: boolean) => void;
  setSelectedSpriteId: (spriteId: string) => void;
  setSelectedSprite: (sprite: SpriteInstance) => void;
}

export const useSpriteStore = create<State & Actions>((set, get) => ({
  spriteLibrary: [
    {
      id: 'id_' + Date.now().toString() + '_' + Math.round(Math.random() * 10000),
      textureName: 'hero-walk-front',
      name: 'herowalkfront1',
    },
    {
      id: 'id_' + Date.now().toString() + '_' + Math.round(Math.random() * 10000),
      textureName: 'hero-walk-back',
      name: 'herowalkback1',
    },
  ],
  // TODO: handle default sprite instances for a default project
  spriteInstances: [
    {
      id: 'id_' + Date.now().toString() + '_' + Math.round(Math.random() * 10000),
      textureName: 'hero-walk-front',
      name: 'herowalkfront1',
      instanceId: 'id_' + Date.now().toString() + '_' + Math.round(Math.random() * 10000),
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
  setSelectedSprite: (sprite: SpriteInstance) => set({ selectedSprite: sprite }),

  setSpriteInstances: (update) =>
    set((state) => ({
      spriteInstances: typeof update === 'function' ? update(state.spriteInstances) : update,
    })),
  addSpriteToGame: async (payload: SpriteAddPayload, position?: { x: number; y: number }) => {
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

    set((state) => ({
      spriteInstances: [
        ...spriteInstances,
        {
          id: spriteId,
          instanceId: spriteId,
          textureName: payload.textureName,
          name: name,
          x: worldX,
          y: worldY,
        },
      ],
      selectedSpriteId: spriteId,
      selectedSprite: {
        id: spriteId,
        instanceId: spriteId,
        textureName: payload.textureName,
        name: name,
        x: worldX,
        y: worldY,
      },
    }));

    return true;
  },

  removeSpriteFromGame: (spriteId: string) => {
    const { phaserGame, phaserScene } = useEditorStore.getState();
    if (!phaserGame || !phaserScene) throw new Error('Game is not ready yet.');
    if (!(phaserScene instanceof EditorScene)) throw new Error('Should not be able to remove sprite from game scene.');
  
    phaserScene.removeSprite(spriteId);
    const currentInstances = get().spriteInstances;
    
    if (currentInstances.length === 1) {
      set({ selectedSpriteId: null, selectedSprite: null, spriteInstances: [] });
    } else {
      let curSpriteIdx = currentInstances.findIndex((instance) => instance.id === spriteId);
      if (curSpriteIdx === currentInstances.length - 1) curSpriteIdx--;
      const filteredInstances = currentInstances.filter((instance) => instance.id !== spriteId);

      set({
        spriteInstances: filteredInstances,
        selectedSpriteId: filteredInstances[curSpriteIdx].id,
        selectedSprite: filteredInstances[curSpriteIdx],
      });
    }
  },

  updateSprite: (spriteId: string, updates: Partial<SpriteInstance>) => {
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
