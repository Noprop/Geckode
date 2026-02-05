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

beforeEach(() => {
  localStorage.clear();
});

describe("persistence", () => {
  describe("partialize", () => {
    it("includes spriteInstances, textures, workspaces, projectName", async () => {
      const { useGeckodeStore } = await import("../geckodeStore");

      useGeckodeStore.setState({
        spriteInstances: [
          {
            id: "s1",
            textureName: "tex",
            name: "sprite1",
            x: 0,
            y: 0,
            visible: true,
            size: 1,
            direction: 0,
            snapToGrid: true,
          },
        ],
        assetTextures: { tex: "base64" },
        libraryTextures: { lib: "base64lib" },
        selectedSpriteIdx: 1,
        spriteWorkspaces: new Map([["sid", { blocks: {} } as any]]),
        projectName: "TestProject",
      });

      // The persist middleware serializes partialize output to localStorage
      // We can check the persisted data from localStorage
      // Wait a tick for persist to write
      await new Promise((resolve) => setTimeout(resolve, 50));

      const stored = localStorage.getItem("geckode-store");
      expect(stored).not.toBeNull();

      const parsed = JSON.parse(stored!);
      const state = parsed.state;

      expect(state.spriteInstances).toBeDefined();
      expect(state.assetTextures).toBeDefined();
      expect(state.libraryTextures).toBeDefined();
      expect(state.selectedSpriteIdx).toBe(1);
      expect(state.projectName).toBe("TestProject");
      expect(state.spriteWorkspaces).toBeDefined();
    });

    it("excludes ephemeral state", async () => {
      const { useGeckodeStore } = await import("../geckodeStore");

      useGeckodeStore.setState({
        blocklyWorkspace: {} as any,
        phaserScene: {} as any,
        phaserGame: {} as any,
        canUndo: true,
        canRedo: true,
        isConverting: true,
      });

      await new Promise((resolve) => setTimeout(resolve, 50));

      const stored = localStorage.getItem("geckode-store");
      const parsed = JSON.parse(stored!);
      const state = parsed.state;

      // These ephemeral values should NOT be persisted
      expect(state.blocklyWorkspace).toBeUndefined();
      expect(state.phaserScene).toBeUndefined();
      expect(state.phaserGame).toBeUndefined();
      expect(state.canUndo).toBeUndefined();
      expect(state.canRedo).toBeUndefined();
      expect(state.isConverting).toBeUndefined();
    });
  });

  describe("merge", () => {
    it("restores spriteWorkspaces as Map from serialized entries", async () => {
      const entries = [
        ["sprite1", { blocks: { languageVersion: 0 } }],
        ["sprite2", { blocks: { languageVersion: 0 } }],
      ];

      localStorage.setItem(
        "geckode-store",
        JSON.stringify({
          state: {
            spriteWorkspaces: entries,
            projectName: "Restored",
          },
          version: 0,
        }),
      );

      // Re-import to trigger hydration with the persisted data
      vi.resetModules();
      const { useGeckodeStore: freshStore } = await import("../geckodeStore");

      // Wait for hydration
      await new Promise((resolve) => setTimeout(resolve, 100));

      const state = freshStore.getState();
      expect(state.spriteWorkspaces).toBeInstanceOf(Map);
      expect(state.spriteWorkspaces.size).toBe(2);
      expect(state.spriteWorkspaces.has("sprite1")).toBe(true);
      expect(state.spriteWorkspaces.has("sprite2")).toBe(true);
      expect(state.projectName).toBe("Restored");
    });
  });

  describe("migration", () => {
    it("reads old localStorage keys and merges into new key", async () => {
      localStorage.setItem(
        "geckode-sprites",
        JSON.stringify({
          state: {
            spriteInstances: [{ id: "old1", name: "oldSprite" }],
            assetTextures: { old: "oldBase64" },
          },
          version: 0,
        }),
      );

      localStorage.setItem(
        "geckode-workspaces",
        JSON.stringify({
          state: {
            spriteWorkspaces: [["ws1", { blocks: {} }]],
            projectName: "OldProject",
          },
          version: 0,
        }),
      );

      // Re-import to trigger migration
      vi.resetModules();
      const { useGeckodeStore: freshStore } = await import("../geckodeStore");

      await new Promise((resolve) => setTimeout(resolve, 50));

      const stored = localStorage.getItem("geckode-store");
      expect(stored).not.toBeNull();

      const parsed = JSON.parse(stored!);
      expect(parsed.state.spriteInstances).toBeDefined();
      expect(parsed.state.projectName).toBe("OldProject");
    });

    it("is a no-op when new key already exists", async () => {
      localStorage.setItem(
        "geckode-store",
        JSON.stringify({
          state: { projectName: "ExistingProject" },
          version: 0,
        }),
      );

      localStorage.setItem(
        "geckode-sprites",
        JSON.stringify({
          state: { projectName: "OldProject" },
          version: 0,
        }),
      );

      vi.resetModules();
      await import("../geckodeStore");

      const stored = JSON.parse(localStorage.getItem("geckode-store")!);
      expect(stored.state.projectName).toBe("ExistingProject");
    });

    it("deletes old keys after migration", async () => {
      localStorage.setItem(
        "geckode-sprites",
        JSON.stringify({ state: {}, version: 0 }),
      );
      localStorage.setItem(
        "geckode-workspaces",
        JSON.stringify({ state: {}, version: 0 }),
      );

      vi.resetModules();
      await import("../geckodeStore");

      expect(localStorage.getItem("geckode-sprites")).toBeNull();
      expect(localStorage.getItem("geckode-workspaces")).toBeNull();
    });
  });
});
