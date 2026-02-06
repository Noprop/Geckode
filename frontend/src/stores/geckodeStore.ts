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
} from "./slices/types";

/**
 * Migrate old localStorage keys (`geckode-sprites`, `geckode-workspaces`)
 * into the new unified `geckode-store` key, then delete the old keys.
 */
function migrateOldStorage() {
  if (typeof window === "undefined") return;

  const NEW_KEY = "geckode-store";

  // Skip if new key already has data
  if (localStorage.getItem(NEW_KEY)) return;

  const oldSprites = localStorage.getItem("geckode-sprites");
  const oldWorkspaces = localStorage.getItem("geckode-workspaces");

  if (!oldSprites && !oldWorkspaces) return;

  try {
    const spritesData = oldSprites ? JSON.parse(oldSprites) : {};
    const workspacesData = oldWorkspaces ? JSON.parse(oldWorkspaces) : {};

    const mergedState = {
      ...(spritesData.state || {}),
      ...(workspacesData.state || {}),
    };

    localStorage.setItem(
      NEW_KEY,
      JSON.stringify({
        state: mergedState,
        version: 0,
      }),
    );

    // Clean up old keys
    localStorage.removeItem("geckode-sprites");
    localStorage.removeItem("geckode-workspaces");
  } catch (e) {
    console.warn("[geckodeStore] Failed to migrate old storage:", e);
  }
}

// Run migration on module load (client-side only)
migrateOldStorage();

export const useGeckodeStore = create<GeckodeStore>()(
  persist(
    (...a) => ({
      ...createSpriteSlice(...a),
      ...createEditorSlice(...a),
    }),
    {
      name: 'geckode-store',
      partialize: (state) => ({
        spriteInstances: state.spriteInstances,
        assetTextures: state.assetTextures,
        libraryTextures: state.libraryTextures,
        selectedSpriteIdx: state.selectedSpriteIdx,
        spriteWorkspaces: [...state.spriteWorkspaces.entries()],
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
          spriteWorkspaces: persisted?.spriteWorkspaces
            ? new Map(persisted.spriteWorkspaces)
            : current.spriteWorkspaces,
        };
      },
    }
  )
);
