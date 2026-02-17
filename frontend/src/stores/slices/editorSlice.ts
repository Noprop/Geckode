import * as Blockly from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";
import type { StateCreator } from "zustand";
import starterWorkspace from "@/blockly/workspaces/starter";
import projectsApi from "@/lib/api/handlers/projects";
import { createPhaserState } from "@/phaser/PhaserStateManager";
import { EDITOR_SCENE_KEY, GAME_SCENE_KEY } from "@/phaser/sceneKeys";
import EditorScene from "@/phaser/scenes/EditorScene";
import type { EditorSlice, GeckodeStore } from "./types";
import { projectNameSync } from "@/hooks/yjs/useProjectNameSync";

const DEBOUNCE_MS = 400;

export const createEditorSlice: StateCreator<
  GeckodeStore,
  [],
  [],
  EditorSlice
> = (set, get) => ({
  // Phaser/Blockly state
  blocklyWorkspace: null,
  phaserScene: null,
  phaserGame: null,

  // Project state
  projectId: null,
  projectName: "",
  phaserState: null,
  canUndo: false,
  canRedo: false,
  isConverting: false,
  isEditorScene: true,

  // Workspace state
  spriteWorkspaces: {},
  spriteOutputs: {},
  spriteIdsUpdated: [],

  getCurrentSpriteId: () => {
    return get().selectedSpriteId ?? undefined;
  },

  setBlocklyWorkspaceRef: (blocklyWorkspace) => set({ blocklyWorkspace }),
  setPhaserScene: (phaserScene) => set({ phaserScene }),
  setPhaserGame: (phaserGame) => set({ phaserGame }),
  setProjectId: (projectId) => set({ projectId }),
  setProjectName: (projectName, syncAfter = true) => {
    set({ projectName });

    if (syncAfter) {
      projectNameSync(projectName);
    }
  },
  setPhaserState: (phaserState) => set({ phaserState }),

  updateUndoRedoState: () => {
    const { blocklyWorkspace } = get();
    if (!blocklyWorkspace) return;

    const undoStack =
      (blocklyWorkspace as unknown as { undoStack_: unknown[] }).undoStack_ ||
      [];
    const redoStack =
      (blocklyWorkspace as unknown as { redoStack_: unknown[] }).redoStack_ ||
      [];
    set({
      canUndo: undoStack.length > 0,
      canRedo: redoStack.length > 0,
    });
  },

  generateCode: () => {
    set((s) => ({
      spriteOutputs: {
        ...s.spriteOutputs,
        ...Object.fromEntries(s.spriteIdsUpdated.map((id) => {
          const code = javascriptGenerator.workspaceToCode(
            id === s.selectedSpriteId ? s.blocklyWorkspace! : s.spriteWorkspaces[id]
          );
          return [
            id,
            {
              code: code,
              updateHandlers: (javascriptGenerator as any).updateHandlers ?? [],
              startHandlers: (javascriptGenerator as any).startHandlers ?? [],
            },
          ];
        })),
      },
      spriteIdsUpdated: [],
    }));
  },

  saveProject: async (showSnackbar) => {
    const {
      projectId,
      projectName,
      blocklyWorkspace,
      phaserScene,
      spriteInstances,
    } = get();
    if (!projectId) {
      console.error(
        "[editorStore] saveProject() - No project id associated, returning.",
      );
      return;
    }
    if (!blocklyWorkspace || !phaserScene) return;

    const workspaceState =
      Blockly.serialization.workspaces.save(blocklyWorkspace);
    const phaserState = createPhaserState(phaserScene);

    try {
      await projectsApi(projectId).update({
        name: projectName,
        blocks: workspaceState,
        game_state: phaserState,
        sprites: spriteInstances,
      });
      showSnackbar("Project saved successfully!", "success");
    } catch (err) {
      showSnackbar("Project could not be saved. Please try again.", "error");
    }
  },

  exportWorkspaceState: () => {
    const { blocklyWorkspace } = get();
    if (!blocklyWorkspace) return;

    const workspaceState =
      Blockly.serialization.workspaces.save(blocklyWorkspace);

    console.log("Current workspace state", workspaceState);
    console.log("Workspace JSON", JSON.stringify(workspaceState, null, 2));
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
    setTimeout(updateUndoRedoState, 10);
  },

  toggleEditor: () => {
    const { isEditorScene, phaserScene, spriteInstances, spriteOutputs } =
      get();
    if (!phaserScene)
      throw new Error("toggleEditor() - Phaser scene is not set.");

    if (isEditorScene) {
      const outputs = spriteInstances.map((s) => spriteOutputs[s.id]);
      const allUpdateHandlers = outputs
        .flatMap((o) => o?.updateHandlers)
        .filter(Boolean);
      const allStartHandlers = outputs
        .flatMap((o) => o?.startHandlers)
        .filter(Boolean);
      const updateBody = allUpdateHandlers
        .map((h) => `  ${h?.functionName}('${h?.spriteId}');`)
        .join("\n");
      const startBody = allStartHandlers
        .map((h) => `  ${h?.functionName}('${h?.spriteId}');`)
        .join("\n");

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

      const code = [...outputs.map((o) => o?.code), startCode, updateCode].join(
        "\n\n",
      );

      console.log("[toggleEditor] code: ", code);
      const { textures } = get();

      phaserScene?.scene.start(GAME_SCENE_KEY, {
        spriteInstances,
        textures,
        code,
      });

      set({ isEditorScene: false });
      (document.getElementById("game-container") as HTMLElement).focus();
    } else {
      console.log(
        "starting editor scene with sprites: ",
        get().spriteInstances,
      );
      phaserScene?.scene.start(EDITOR_SCENE_KEY);
      set({ isEditorScene: true });
    }
  },

  resetProject: () => {
    const { blocklyWorkspace, phaserScene, resetSpriteStore } = get();

    // Reset sprite store first to get new sprite IDs
    resetSpriteStore();

    // Get the new default sprite instance after reset
    const { spriteInstances } = get();
    const defaultSprite = spriteInstances[0];

    // Clear and reset Blockly workspace
    if (blocklyWorkspace) {
      blocklyWorkspace.clear();
      Blockly.serialization.workspaces.load(starterWorkspace, blocklyWorkspace);
    }

    // Reset Phaser scene sprites if in editor mode
    if (phaserScene instanceof EditorScene) {
      phaserScene.removeSprites();
    }

    // Clear workspace maps and set the new sprite ID
    set({
      spriteWorkspaces: {},
      spriteOutputs: {},
      selectedSpriteId: get().spriteInstances[0]?.id ?? null,
      canUndo: false,
      canRedo: false,
    });

    console.log("[editorStore] Project reset to default state");
  },

  markSpriteAsUpdated: (id: string) => {
    set((s) => ({
      spriteIdsUpdated: Array.from(new Set([...s.spriteIdsUpdated, id])),
    }));
  },
});
