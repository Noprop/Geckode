import type { SpriteDefinition, SpriteInstance } from '@/blockly/spriteRegistry';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useEditorStore } from './editorStore';
import EditorScene from '@/phaser/scenes/EditorScene';
import { heroWalkFront1, heroWalkBack1, gavin } from './sprites';

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

interface State {
  spriteLibrary: SpriteDefinition[];
  spriteInstances: SpriteInstance[];
  spriteTextures: Record<string, string>;

  isSpriteModalOpen: boolean;
  selectedSpriteId: string | null;
  selectedSprite: SpriteInstance | null;

  // Library sprite editing state
  editingLibrarySpriteIdx: number | null;
}

interface Actions {
  setSpriteInstances: (instances: SpriteInstance[]) => void;
  addSpriteToGame: (payload: SpriteAddPayload) => Promise<boolean>;
  removeSpriteFromGame: (spriteId: string) => void;
  updateSprite: (spriteId: string, updates: Partial<SpriteInstance>) => void;
  setIsSpriteModalOpen: (isOpen: boolean) => void;
  setSelectedSpriteId: (spriteId: string) => void;
  setSelectedSprite: (sprite: SpriteInstance) => void;
  addStoreTexture: (textureName: string, base64Image: string) => void;
  updateStoreTexture: (textureName: string, base64Image: string) => void;
  addToSpriteLibrary: (sprite: SpriteDefinition) => void;
  removeFromSpriteLibrary: (spriteId: string) => void;

  // Library sprite editing
  setEditingLibrarySprite: (spriteIdx: number | null) => void;

  // Reset action
  resetSpriteStore: () => void;
}

export const useSpriteStore = create<State & Actions>()(
  persist(
    (set, get) => ({
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
          name: 'herowalkfront1',
          id: 'id_' + Date.now().toString(),
          textureName: 'hero-walk-front',
          x: 200,
          y: 150,
          visible: true,
          size: 1,
          direction: 0,
          snapToGrid: true,
        },
      ],
      spriteTextures: {
        'hero-walk-front': heroWalkFront1,
        'hero-walk-back': heroWalkBack1,
        gavin: gavin,
      },
      selectedSpriteId: null,
      selectedSprite: null,
      isSpriteModalOpen: false,
      editingLibrarySpriteIdx: null,

      setIsSpriteModalOpen: (isOpen: boolean) => set({ isSpriteModalOpen: isOpen }),
      setSelectedSpriteId: (spriteId: string) => set({ selectedSpriteId: spriteId }),
      setSelectedSprite: (sprite: SpriteInstance) => set({ selectedSprite: sprite }),

      setSpriteInstances: (instances: SpriteInstance[]) => set({ spriteInstances: instances }),
      addSpriteToGame: async (payload: SpriteAddPayload) => {
        const { phaserScene } = useEditorStore.getState();
        const { spriteInstances, spriteTextures } = get();

        if (!(phaserScene instanceof EditorScene)) {
          console.error('[editorStore] addSpriteToGame() - Phaser scene is not an EditorScene.');
          return false;
        }

        // if (!phaserScene.textures.exists(payload.textureName)) {
        //   const img = new window.Image();
        //   img.src = payload.base64Image;
        //   phaserScene.textures.addImage(payload.textureName, img);
        // }

        const safeBase = payload.textureName.replace(/[^\w]/g, '') || 'sprite';
        const duplicateCount = spriteInstances.filter((instance) => instance.name === payload.textureName).length;
        const name = `${safeBase}${duplicateCount + 1}`;
        const spriteId = `id_${Date.now()}}`;
        phaserScene.createSprite(spriteId, payload.x ?? 0, payload.y ?? 0, payload.textureName);

        const newSprite: SpriteInstance = {
          id: spriteId,
          textureName: payload.textureName,
          name: name,
          x: 0,
          y: 0,
          visible: true,
          size: 1,
          direction: 0,
          snapToGrid: true,
        };

        set({ spriteInstances: [...spriteInstances, newSprite], selectedSpriteId: spriteId, selectedSprite: newSprite });
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
        set((state) => {
          const updatedInstances = state.spriteInstances.map((instance) =>
            instance.id === spriteId ? { ...instance, ...updates } : instance
          );
          const updatedSelectedSprite =
            state.selectedSpriteId === spriteId && state.selectedSprite
              ? { ...state.selectedSprite, ...updates }
              : state.selectedSprite;
          return {
            spriteInstances: updatedInstances,
            selectedSprite: updatedSelectedSprite,
          };
        });
      },
      addStoreTexture: (textureName: string, base64Image: string) => {
        get().updateStoreTexture(textureName, base64Image);
      },
      updateStoreTexture: (textureName: string, base64Image: string) => {
        set({ spriteTextures: { ...get().spriteTextures, [textureName]: base64Image } });
      },

      addToSpriteLibrary: (sprite: SpriteDefinition) => {
        set((state) => ({
          spriteLibrary: [...state.spriteLibrary, sprite],
        }));
      },

      removeFromSpriteLibrary: (spriteId: string) => {
        set((state) => ({
          spriteLibrary: state.spriteLibrary.filter((sprite) => sprite.id !== spriteId),
        }));
      },

      setEditingLibrarySprite: (spriteIdx: number | null) => set({ editingLibrarySpriteIdx: spriteIdx }),

      resetSpriteStore: () => {
        const defaultSpriteId = `id_${Date.now()}_${Math.round(Math.random() * 10000)}`;

        set({
          spriteLibrary: [
            {
              id: `id_${Date.now()}_${Math.round(Math.random() * 10000)}`,
              textureName: 'hero-walk-front',
              name: 'herowalkfront1',
            },
            {
              id: `id_${Date.now()}_${Math.round(Math.random() * 10000)}`,
              textureName: 'hero-walk-back',
              name: 'herowalkback1',
            },
          ],
          spriteInstances: [
            {
              id: defaultSpriteId,
              textureName: 'hero-walk-front',
              name: 'herowalkfront1',
              x: 200,
              y: 150,
              visible: true,
              size: 1,
              direction: 0,
              snapToGrid: true,
            },
          ],
          spriteTextures: {
            'hero-walk-front': heroWalkFront1,
            'hero-walk-back': heroWalkBack1,
          },
          selectedSpriteId: null,
          selectedSprite: null,
          editingLibrarySpriteIdx: null,
        });
      },
    }),
    {
      name: 'geckode-sprites',
      partialize: (state) => ({
        spriteInstances: state.spriteInstances,
        spriteLibrary: state.spriteLibrary,
        spriteTextures: state.spriteTextures,
      }),
      merge: (persisted: any, current) => ({
        ...current,
        ...(persisted || {}),
        spriteTextures: persisted?.spriteTextures ? new Map(persisted.spriteTextures) : current.spriteTextures,
      }),
    }
  )
);
