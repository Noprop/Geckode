import type { StateCreator } from "zustand";
import type { SpriteInstance, SpriteDefinition } from "@/blockly/spriteRegistry";
import EditorScene from "@/phaser/scenes/EditorScene";
import { gavin, heroWalkBack1, heroWalkFront1 } from "../sprites";
import type { GeckodeStore, SpriteSlice } from "./types";

export const createSpriteSlice: StateCreator<
  GeckodeStore,
  [],
  [],
  SpriteSlice
> = (set, get) => ({
  spriteAssets: [],
  spriteLibrary: [
    {
      id: `id_${Date.now()}`,
      textureName: "hero-walk-front",
      name: "herowalkfront1",
    },
    {
      id: `id_${Date.now()}`,
      textureName: "hero-walk-back",
      name: "herowalkback1",
    },
  ],
  spriteInstances: [
    {
      name: "herowalkfront1",
      id: `id_${Date.now()}`,
      textureName: "hero-walk-front",
      x: 200,
      y: 150,
      visible: true,
      size: 1,
      direction: 0,
      snapToGrid: true,
    },
  ],
  assetTextures: {},
  libraryTextures: {
    "hero-walk-front": heroWalkFront1,
    "hero-walk-back": heroWalkBack1,
    gavin: gavin,
  },
  isSpriteModalOpen: false,
  selectedSpriteIdx: null,
  editingSpriteIdx: null,

  setIsSpriteModalOpen: (isOpen: boolean) => set({ isSpriteModalOpen: isOpen }),
  setSpriteInstances: (instances: SpriteInstance[]) =>
    set({ spriteInstances: instances }),
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

  addLibraryTexture: (textureName: string, base64Image: string) =>
    set({
      libraryTextures: { ...get().libraryTextures, [textureName]: base64Image },
    }),
  updateLibraryTexture: (textureName: string, base64Image: string) =>
    set({
      libraryTextures: { ...get().libraryTextures, [textureName]: base64Image },
    }),
  removeLibraryTexture: (textureName: string) => {
    const { [textureName]: _, ...rest } = get().libraryTextures;
    set({ libraryTextures: rest });
  },

  addSpriteInstance: (sprite: Omit<SpriteDefinition, 'id'>) => {
    const instance: SpriteInstance = {
      ...sprite,
      id: `id_${Date.now()}`,
      x: 0,
      y: 0,
      visible: true,
      size: 1,
      direction: 0,
      snapToGrid: true,
    };
    set({ spriteInstances: [...get().spriteInstances, instance] });
  },
  removeSpriteInstance: (spriteIdx: number) => {
    set({
      spriteInstances: get().spriteInstances.filter(
        (_, index) => index !== spriteIdx,
      ),
    });
  },
  updateSpriteInstance: (
    spriteIdx: number,
    updates: Partial<SpriteInstance>,
  ) => {
    const { phaserGame, phaserScene } = get();
    if (!phaserGame || !phaserScene) throw new Error("Game is not ready yet.");
    if (!(phaserScene instanceof EditorScene))
      throw new Error("Should not be able to update sprite from game scene.");
    phaserScene.updateSprite(get().spriteInstances[spriteIdx].id, updates);

    set((state) => ({
      spriteInstances: state.spriteInstances.map((instance, index) =>
        index === spriteIdx ? { ...instance, ...updates } : instance,
      ),
    }));
  },
  setSelectedSpriteIdx: (spriteIdx: number) => {
    set({ selectedSpriteIdx: spriteIdx });
  },
  setEditingSpriteIdx: (spriteIdx: number | null) => {
    set({ editingSpriteIdx: spriteIdx });
  },

  resetSpriteStore: () => {
    const defaultSpriteId = `id_${Date.now()}_${Math.round(Math.random() * 10000)}`;

    set({
      spriteLibrary: [
        {
          id: `id_${Date.now()}_${Math.round(Math.random() * 10000)}`,
          textureName: "hero-walk-front",
          name: "herowalkfront1",
        },
        {
          id: `id_${Date.now()}_${Math.round(Math.random() * 10000)}`,
          textureName: "hero-walk-back",
          name: "herowalkback1",
        },
      ],
      spriteInstances: [
        {
          id: defaultSpriteId,
          textureName: "hero-walk-front",
          name: "herowalkfront1",
          x: 200,
          y: 150,
          visible: true,
          size: 1,
          direction: 0,
          snapToGrid: true,
        },
      ],
      assetTextures: {},
      libraryTextures: {
        "hero-walk-front": heroWalkFront1,
        "hero-walk-back": heroWalkBack1,
        gavin: gavin,
      },
      selectedSpriteIdx: null,
      editingSpriteIdx: null,
    });
  },
});
