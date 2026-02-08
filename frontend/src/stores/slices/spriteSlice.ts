import * as Blockly from 'blockly/core';
import type { StateCreator } from 'zustand';
import type { SpriteInstance, SpriteDefinition } from '@/blockly/spriteRegistry';
import EditorScene from '@/phaser/scenes/EditorScene';
import { gavin, heroWalkBack1, heroWalkFront1 } from '../sprites';
import type { GeckodeStore, SpriteSlice } from './types';

/** deduplicate texture name */
export const createUniqueTextureName = (name: string, assetTextures: Record<string, string>): string => {
  if (!(name in assetTextures)) return name;
  if (Number.isNaN(Number(name[name.length - 1]))) return createUniqueTextureName(`${name}2`, assetTextures);
  const lastDigit = Number(name[name.length - 1]);
  return createUniqueTextureName(`${name.slice(0, -1)}${lastDigit + 1}`, assetTextures);
};

/** deduplicate sprite instance name */
export const createUniqueSpriteName = (name: string, instances: { name: string }[]): string => {
  const count = instances.filter((s) => s.name === name).length;
  if (count === 0) return name;
  if (Number.isNaN(Number(name[name.length - 1]))) return createUniqueSpriteName(`${name}2`, instances);
  const lastDigit = Number(name[name.length - 1]);
  return createUniqueSpriteName(`${name.slice(0, -1)}${lastDigit + 1}`, instances);
};

export const createSpriteSlice: StateCreator<GeckodeStore, [], [], SpriteSlice> = (set, get) => ({
  spriteInstances: [
    {
      name: 'gavin',
      id: `id_${Date.now()}`,
      textureName: 'gavin',
      x: 50,
      y: 50,
      visible: true,
      scaleX: 1,
      scaleY: 1,
      direction: 0,
      snapToGrid: true,
    },
  ],
  assetTextures: {
    gavin: gavin,
  },
  libraryTextures: {
    'hero-walk-front': heroWalkFront1,
    'hero-walk-back': heroWalkBack1,
    gavin: gavin,
  },
  isSpriteModalOpen: false,
  selectedSpriteIdx: null,
  editingSource: null,
  editingTextureName: null,

  setIsSpriteModalOpen: (isOpen: boolean) => set({ isSpriteModalOpen: isOpen }),
  setSpriteInstances: (instances: SpriteInstance[]) => set({ spriteInstances: instances }),
  updateInstanceOrder: (spriteIdx: number, newIdx: number) => {
    const currentInstances = get().spriteInstances;
    const updatedInstances = [...currentInstances];
    const [movedInstance] = updatedInstances.splice(spriteIdx, 1);
    updatedInstances.splice(newIdx, 0, movedInstance);
    set({ spriteInstances: updatedInstances });
  },

  addAssetTexture: (textureName: string, base64Image: string) =>
    set({
      assetTextures: { ...get().assetTextures, [textureName]: base64Image },
    }),
  updateAssetTexture: (textureName: string, base64Image: string) =>
    set({
      assetTextures: { ...get().assetTextures, [textureName]: base64Image },
    }),
  removeAssetTexture: (textureName: string) => {
    const { [textureName]: _, ...rest } = get().assetTextures;
    set({ assetTextures: rest });
  },
  removeSpriteInstance: (spriteIdx: number) => {
    set({
      spriteInstances: get().spriteInstances.filter((_, index) => index !== spriteIdx),
    });
  },
  updateSpriteInstance: (spriteIdx: number, updates: Partial<SpriteInstance>) => {
    const { phaserGame, phaserScene } = get();
    if (!phaserGame || !phaserScene) throw new Error('Game is not ready yet.');
    if (!(phaserScene instanceof EditorScene)) throw new Error('Should not be able to update sprite from game scene.');
    phaserScene.updateSprite(get().spriteInstances[spriteIdx].id, updates);

    set((state) => ({
      spriteInstances: state.spriteInstances.map((instance, index) =>
        index === spriteIdx ? { ...instance, ...updates } : instance,
      ),
    }));
  },
  setSelectedSpriteIdx: (newIdx: number) => {
    const { blocklyWorkspace, spriteWorkspaces, spriteInstances, selectedSpriteIdx: prevIdx } = get();

    if (newIdx === prevIdx) return;
    if (!blocklyWorkspace || spriteInstances.length === 0) return;

    if (prevIdx !== null && spriteInstances[prevIdx]) {
      const currentState = Blockly.serialization.workspaces.save(blocklyWorkspace);
      spriteWorkspaces.set(spriteInstances[prevIdx].id, currentState);
    }

    // blocklyWorkspace.clear();
    const state = spriteWorkspaces.get(spriteInstances[newIdx].id);
    if (!state) {
      Blockly.serialization.workspaces.load({}, blocklyWorkspace);
    } else {
      Blockly.serialization.workspaces.load(state, blocklyWorkspace);
    }

    set({ selectedSpriteIdx: newIdx });
    console.log(`sprite ${newIdx} workspace loaded`);
  },
  setEditingSprite: (source: 'new' | 'library' | 'asset', textureName: string | null) => {
    set({ editingSource: source, editingTextureName: textureName });
  },
  clearEditingSprite: () => {
    set({ editingSource: null, editingTextureName: null });
  },
  saveSprite: ({ spriteName, base64Image }) => {
    const { editingSource, editingTextureName, assetTextures } = get();
    let textureName: string;

    if (editingSource === 'asset' && editingTextureName) {
      textureName = editingTextureName;
    } else {
      textureName = createUniqueTextureName(spriteName, assetTextures);
    }

    set({
      assetTextures: { ...get().assetTextures, [textureName]: base64Image },
    });

    const instance: SpriteInstance = {
      name: createUniqueSpriteName(spriteName, get().spriteInstances),
      textureName,
      id: `id_${Date.now()}`,
      x: 0,
      y: 0,
      visible: true,
      scaleX: 1,
      scaleY: 1,
      direction: 0,
      snapToGrid: true,
    };
    set({ spriteInstances: [...get().spriteInstances, instance] });
    return textureName;
  },

  resetSpriteStore: () => {
    const defaultSpriteId = `id_${Date.now()}_${Math.round(Math.random() * 10000)}`;

    set({
      spriteInstances: [
        {
          id: defaultSpriteId,
          textureName: 'hero-walk-front',
          name: 'herowalkfront1',
          x: 200,
          y: 150,
          visible: true,
          scaleX: 1,
          scaleY: 1,
          direction: 0,
          snapToGrid: true,
        },
      ],
      assetTextures: {
        'hero-walk-front': heroWalkFront1,
      },
      libraryTextures: {
        'hero-walk-front': heroWalkFront1,
        'hero-walk-back': heroWalkBack1,
        gavin: gavin,
      },
      selectedSpriteIdx: null,
      editingSource: null,
      editingTextureName: null,
    });
  },
});
