import * as Blockly from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";
import type { StateCreator } from "zustand";
import { starterWorkspace } from "@/blockly/workspaces/starter";
import projectsApi from "@/lib/api/handlers/projects";
import { createPhaserState } from "@/phaser/PhaserStateManager";
import { EDITOR_SCENE_KEY, GAME_SCENE_KEY } from "@/phaser/sceneKeys";
import EditorScene from "@/phaser/scenes/EditorScene";
import type { EditorSlice, GeckodeStore, WorkspaceOutputType } from "./types";
import { projectNameSync } from "@/hooks/yjs/useProjectNameSync";
import { getYDoc } from "@/hooks/yjs/useWorkspaceSync";
import * as Y from "yjs";

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

  // Other
  persistence: null,

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
    console.log('generating code for sprites:', get().spriteIdsUpdated);
    const state = get();
    const originalSelectedSpriteId = state.selectedSpriteId;
    
    set((s) => {
      const outputs: Record<string, WorkspaceOutputType> = {};
      
      for (const id of s.spriteIdsUpdated) {
        // Temporarily set selectedSpriteId to the sprite being processed
        // so that event blocks can correctly identify their sprite ID
        s.selectedSpriteId = id;
        
        // Clear handlers before generating code for this sprite
        (javascriptGenerator as any).updateHandlers = [];
        (javascriptGenerator as any).startHandlers = [];
        (javascriptGenerator as any).keyPressHandlers = [];
        
        // Use the original selectedSpriteId to determine which workspace to use
        const workspace = id === originalSelectedSpriteId ? s.blocklyWorkspace! : s.spriteWorkspaces[id];
        const code = javascriptGenerator.workspaceToCode(workspace);
        
        outputs[id] = {
          code,
          updateHandlers: (javascriptGenerator as any).updateHandlers ?? [],
          startHandlers: (javascriptGenerator as any).startHandlers ?? [],
          keyPressHandlers: (javascriptGenerator as any).keyPressHandlers ?? [],
        };
      }
      
      // Restore original selectedSpriteId
      s.selectedSpriteId = originalSelectedSpriteId;
      
      return {
        spriteOutputs: {
          ...s.spriteOutputs,
          ...outputs,
        },
        spriteIdsUpdated: [],
      };
    });
  },

  saveProject: (showSnackbar) => {
    const {
      projectId,
      projectName,
    } = get();
    if (!projectId) {
      console.error(
        "[editorStore] saveProject() - No project id associated, returning.",
      );
      return;
    }

    const doc = getYDoc();
    if (!doc) return;

    projectsApi(projectId).update({
      name: projectName,
      yjs_blob: Buffer.from(Y.encodeStateAsUpdate(doc)).toString("base64"),
    }).then((res) => {
      showSnackbar("Project saved successfully!", "success");
    }).catch((err) => {
      showSnackbar("Project could not be saved. Please try again.", "error");
    });
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
    const { isEditorScene, phaserScene, spriteInstances, generateCode } = get();
    if (!phaserScene)
      throw new Error("toggleEditor() - Phaser scene is not set.");

    if (isEditorScene) {
      generateCode();
      const { spriteOutputs } = get();
      const outputs = spriteInstances.map((s) => spriteOutputs[s.id]);
      const allUpdateHandlers = outputs
        .flatMap((o) => o?.updateHandlers)
        .filter(Boolean);
      const allStartHandlers = outputs
        .flatMap((o) => o?.startHandlers)
        .filter(Boolean);
      const allKeyPressHandlers = outputs
        .flatMap((o) => o?.keyPressHandlers)
        .filter(Boolean);
      const updateBody = allUpdateHandlers
        .map((h) => `  for (const __id of scene.getSpriteAndClones('${h?.spriteId}')) ${h?.functionName}(__id);`)
        .join("\n");
      const startBody = allStartHandlers
        .map((h) => `  for (const __id of scene.getSpriteAndClones('${h?.spriteId}')) ${h?.functionName}(__id);`)
        .join("\n");
      const keyPressBody = allKeyPressHandlers
        .map((h) => {
          const keyObj = `scene.cursors.${h?.key}`;
          
          let condition: string;
          if (h?.eventType === 'just_pressed') {
            condition = `scene.getJustPressed(${keyObj})`;
          } else if (h?.eventType === 'released') {
            condition = `scene.getJustReleased(${keyObj})`;
          } else {
            // 'pressed' - continuously held down
            condition = `${keyObj}.isDown`;
          }
          
          return `  if (${condition}) {
    for (const __id of scene.getSpriteAndClones('${h?.spriteId}')) ${h?.functionName}(__id);
  }`;
        })
        .join("\n");

      const updateCode = `
        scene.updateHook = () => {
          ${updateBody}
        };
      `;
      const startCode = `
        scene.startHook = () => {
          ${startBody}
        };
      `;
      const keyPressCode = `
        scene.keyPressHook = () => {
          ${keyPressBody}
        };
      `;

      const code = [...outputs.map((o) => o?.code), startCode, updateCode, keyPressCode].join(
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

    // Clear and reset Blockly workspace
    if (blocklyWorkspace) {
      Blockly.Events.disable();
      blocklyWorkspace.clear();
      Blockly.Events.enable();
    }

    // Reset Phaser scene sprites if in editor mode
    if (phaserScene instanceof EditorScene) {
      phaserScene.removeSprites();
    }

    // Clear workspace maps and set the new sprite ID
    set({
      spriteWorkspaces: {},
      spriteOutputs: {},
      selectedSpriteId: null,
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
