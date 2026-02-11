import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock heavy dependencies
vi.mock("blockly/core", () => ({
  default: {},
  serialization: {
    workspaces: { save: vi.fn(() => ({})), load: vi.fn() },
    workspaceComments: {},
  },
}));

vi.mock("blockly/javascript", () => ({
  javascriptGenerator: {
    workspaceToCode: vi.fn(() => ""),
    updateHandlers: [],
    startHandlers: [],
  },
}));

vi.mock("@/phaser/PhaserStateManager", () => ({
  createPhaserState: vi.fn(() => ({})),
}));

vi.mock("@/phaser/scenes/EditorScene", () => ({
  default: class EditorScene {
    updateSprite = vi.fn();
    removeSprites = vi.fn();
  },
}));

vi.mock("@/phaser/scenes/GameScene", () => ({
  default: class GameScene {},
}));

vi.mock("@/phaser/sceneKeys", () => ({
  EDITOR_SCENE_KEY: "EditorScene",
  GAME_SCENE_KEY: "GameScene",
}));

vi.mock("@/lib/api/handlers/projects", () => ({
  default: vi.fn(() => ({
    update: vi.fn(),
  })),
}));

vi.mock("@/blockly/workspaces/starter", () => ({
  default: { blocks: {} },
}));

vi.mock("phaser", () => ({
  Scene: class {},
  Game: class {},
  Physics: { Arcade: { Sprite: class {} } },
}));

import { useGeckodeStore } from "../geckodeStore";

const getState = () => useGeckodeStore.getState();

beforeEach(() => {
  useGeckodeStore.setState({
    blocklyWorkspace: null,
    phaserScene: null,
    phaserGame: null,
    projectId: null,
    projectName: "",
    phaserState: null,
    canUndo: false,
    canRedo: false,
    isConverting: false,
    isEditorScene: true,
    convertTimeoutId: null,
    spriteWorkspaces: new Map(),
    spriteOutputs: new Map(),
  });
});

describe("editorSlice", () => {
  describe("initialization", () => {
    it("initializes with null workspace/scene", () => {
      expect(getState().blocklyWorkspace).toBeNull();
      expect(getState().phaserScene).toBeNull();
      expect(getState().phaserGame).toBeNull();
    });

    it("initializes with empty project state", () => {
      expect(getState().projectId).toBeNull();
      expect(getState().projectName).toBe("");
      expect(getState().phaserState).toBeNull();
    });
  });

  describe("getCurrentSpriteId", () => {
    it("returns undefined when no sprites exist", () => {
      useGeckodeStore.setState({ spriteInstances: [], selectedSpriteIdx: null });
      expect(getState().getCurrentSpriteId()).toBeUndefined();
    });

    it("returns the id of the selected sprite", () => {
      useGeckodeStore.setState({
        spriteInstances: [
          { id: "sprite_1", textureName: "t1", name: "s1", x: 0, y: 0, visible: true, scaleX: 1, scaleY: 1, direction: 0, snapToGrid: false },
          { id: "sprite_2", textureName: "t2", name: "s2", x: 0, y: 0, visible: true, scaleX: 1, scaleY: 1, direction: 0, snapToGrid: false },
        ],
        selectedSpriteIdx: 1,
      });
      expect(getState().getCurrentSpriteId()).toBe("sprite_2");
    });

    it("returns undefined when selectedSpriteIdx is null", () => {
      useGeckodeStore.setState({
        spriteInstances: [
          { id: "sprite_1", textureName: "t1", name: "s1", x: 0, y: 0, visible: true, scaleX: 1, scaleY: 1, direction: 0, snapToGrid: false },
        ],
        selectedSpriteIdx: null,
      });
      expect(getState().getCurrentSpriteId()).toBeUndefined();
    });
  });

  describe("setProjectName", () => {
    it("updates projectName", () => {
      getState().setProjectName("My Game");
      expect(getState().projectName).toBe("My Game");
    });
  });

  describe("setProjectId", () => {
    it("updates projectId", () => {
      getState().setProjectId(42);
      expect(getState().projectId).toBe(42);
    });
  });

  describe("setPhaserState", () => {
    it("updates phaserState", () => {
      const state = { scene: { key: "test" } };
      getState().setPhaserState(state);
      expect(getState().phaserState).toEqual(state);
    });

    it("clears phaserState", () => {
      getState().setPhaserState({ scene: {} });
      getState().setPhaserState(null);
      expect(getState().phaserState).toBeNull();
    });
  });

  describe("cancelScheduledConvert", () => {
    it("clears convertTimeoutId from store state", () => {
      // Simulate having a timeout
      const timeoutId = setTimeout(() => {}, 1000);
      useGeckodeStore.setState({ convertTimeoutId: timeoutId });

      getState().cancelScheduledConvert();
      expect(getState().convertTimeoutId).toBeNull();
      clearTimeout(timeoutId);
    });
  });
});
