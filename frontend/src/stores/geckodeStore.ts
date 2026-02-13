import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createEditorSlice } from "./slices/editorSlice";
import { createSpriteSlice } from "./slices/spriteSlice";
import type { GeckodeStore } from "./slices/types";

export type {
  SpriteDefinition,
  SpriteInstance,
} from "@/blockly/spriteRegistry";
// Re-export types for consumers
export type {
  GeckodeStore,
  Scene,
  SpriteAddPayload,
  Tilemap,
  TilemapTool,
} from "./slices/types";

export const useGeckodeStore = create<GeckodeStore>()(
  persist(
    (...a) => ({
      ...createSpriteSlice(...a),
      ...createEditorSlice(...a),
    }),
    {
      name: 'geckode-store',
      partialize: (state) => (
        console.log('partializing state(), workspaces: ', state.spriteWorkspaces),
        console.log('partializing state() instances: ', state.spriteInstances),
        {
        spriteInstances: state.spriteInstances,
        textures: state.textures,
        libaryTextures: state.libaryTextures,
        tiles: state.tiles,
        tilesets: state.tilesets,
        animations: state.animations,
        backgrounds: state.backgrounds,
        libaryTiles: state.libaryTiles,
        libaryTilesets: state.libaryTilesets,
        libaryAnimations: state.libaryAnimations,
        libaryBackgrounds: state.libaryBackgrounds,
        tilemaps: state.tilemaps,
        scenes: state.scenes,
        activeTilemapId: state.activeTilemapId,
        selectedSpriteId: state.selectedSpriteId,
        spriteWorkspaces: state.spriteWorkspaces,
        projectName: state.projectName,
      }),
      merge: (persisted: any, current) => {
        if (persisted?.spriteInstances) {
          for (const inst of persisted.spriteInstances) {
            if (inst.scaleX === undefined || inst.scaleY === undefined) {
              inst.scaleX = 1;
              inst.scaleY = 1;
              delete inst.size;
            }
          }
        }
        return {
          ...current,
          ...(persisted || {}),
        };
      },
    }
  )
);
