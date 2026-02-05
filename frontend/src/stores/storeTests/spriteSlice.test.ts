import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock Phaser and EditorScene before importing the store
vi.mock("@/phaser/scenes/EditorScene", () => ({
  default: class EditorScene {
    updateSprite = vi.fn();
  },
}));

vi.mock("phaser", () => ({
  Scene: class {},
  Game: class {},
  Physics: { Arcade: { Sprite: class {} } },
}));

import type { SpriteDefinition } from "@/blockly/spriteRegistry";
import { useGeckodeStore } from "../geckodeStore";

const getState = () => useGeckodeStore.getState();

beforeEach(() => {
  // Reset store to initial state
  useGeckodeStore.setState({
    spriteAssets: [],
    spriteLibrary: [
      { id: "lib1", textureName: "hero-walk-front", name: "herowalkfront1" },
      { id: "lib2", textureName: "hero-walk-back", name: "herowalkback1" },
    ],
    spriteInstances: [
      {
        id: "inst1",
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
      "hero-walk-front": "base64-front",
      "hero-walk-back": "base64-back",
      gavin: "base64-gavin",
    },
    isSpriteModalOpen: false,
    selectedSpriteIdx: null,
    editingSpriteIdx: null,
  });
});

describe("spriteSlice", () => {
  describe("initialization", () => {
    it("initializes with default sprite library", () => {
      expect(getState().spriteLibrary).toHaveLength(2);
      expect(getState().spriteLibrary[0].textureName).toBe("hero-walk-front");
      expect(getState().spriteLibrary[1].textureName).toBe("hero-walk-back");
    });

    it("initializes with one default sprite instance", () => {
      expect(getState().spriteInstances).toHaveLength(1);
      expect(getState().spriteInstances[0].textureName).toBe("hero-walk-front");
      expect(getState().spriteInstances[0].x).toBe(200);
      expect(getState().spriteInstances[0].y).toBe(150);
    });
  });

  describe("addSpriteInstance", () => {
    it("creates instance with correct defaults", () => {
      const sprite: SpriteDefinition = {
        id: "new-sprite",
        textureName: "test-tex",
        name: "testSprite",
      };
      getState().addSpriteInstance(sprite);

      const instances = getState().spriteInstances;
      expect(instances).toHaveLength(2);
      const newInstance = instances[1];
      expect(newInstance.id).toBe("new-sprite");
      expect(newInstance.textureName).toBe("test-tex");
      expect(newInstance.x).toBe(0);
      expect(newInstance.y).toBe(0);
      expect(newInstance.visible).toBe(true);
      expect(newInstance.size).toBe(1);
      expect(newInstance.direction).toBe(0);
      expect(newInstance.snapToGrid).toBe(true);
    });
  });

  describe("removeSpriteInstance", () => {
    it("removes by index correctly", () => {
      // Add a second instance
      getState().addSpriteInstance({
        id: "second",
        textureName: "tex2",
        name: "sprite2",
      });
      expect(getState().spriteInstances).toHaveLength(2);

      getState().removeSpriteInstance(0);
      expect(getState().spriteInstances).toHaveLength(1);
      expect(getState().spriteInstances[0].id).toBe("second");
    });
  });

  describe("updateInstanceOrder", () => {
    it("reorders correctly", () => {
      getState().addSpriteInstance({ id: "a", textureName: "ta", name: "a" });
      getState().addSpriteInstance({ id: "b", textureName: "tb", name: "b" });
      // Instances: [inst1, a, b]

      getState().updateInstanceOrder(2, 0);
      const ids = getState().spriteInstances.map((s) => s.id);
      expect(ids).toEqual(["b", "inst1", "a"]);
    });
  });

  describe("setSpriteInstances", () => {
    it("replaces all instances", () => {
      getState().setSpriteInstances([
        {
          id: "x",
          textureName: "tx",
          name: "x",
          x: 10,
          y: 20,
          visible: false,
          size: 2,
          direction: 90,
          snapToGrid: false,
        },
      ]);
      expect(getState().spriteInstances).toHaveLength(1);
      expect(getState().spriteInstances[0].id).toBe("x");
      expect(getState().spriteInstances[0].visible).toBe(false);
    });
  });

  describe("addAssetTexture / removeAssetTexture", () => {
    it("adds and removes asset textures", () => {
      getState().addAssetTexture("newTex", "data:image/png;base64,...");
      expect(getState().assetTextures["newTex"]).toBe(
        "data:image/png;base64,...",
      );

      getState().removeAssetTexture("newTex");
      expect(getState().assetTextures["newTex"]).toBeUndefined();
    });
  });

  describe("addLibraryTexture / removeLibraryTexture", () => {
    it("adds and removes library textures", () => {
      getState().addLibraryTexture("libTex", "base64-lib");
      expect(getState().libraryTextures["libTex"]).toBe("base64-lib");

      getState().removeLibraryTexture("libTex");
      expect(getState().libraryTextures["libTex"]).toBeUndefined();
    });
  });

  describe("setSelectedSpriteIdx / setEditingSpriteIdx", () => {
    it("updates selection", () => {
      getState().setSelectedSpriteIdx(1);
      expect(getState().selectedSpriteIdx).toBe(1);
    });

    it("updates editing index", () => {
      getState().setEditingSpriteIdx(2);
      expect(getState().editingSpriteIdx).toBe(2);
    });

    it("clears editing index", () => {
      getState().setEditingSpriteIdx(1);
      getState().setEditingSpriteIdx(null);
      expect(getState().editingSpriteIdx).toBeNull();
    });
  });

  describe("setIsSpriteModalOpen", () => {
    it("toggles modal", () => {
      expect(getState().isSpriteModalOpen).toBe(false);
      getState().setIsSpriteModalOpen(true);
      expect(getState().isSpriteModalOpen).toBe(true);
      getState().setIsSpriteModalOpen(false);
      expect(getState().isSpriteModalOpen).toBe(false);
    });
  });

  describe("resetSpriteStore", () => {
    it("restores defaults with new IDs", () => {
      // Mutate state
      getState().addSpriteInstance({
        id: "extra",
        textureName: "tex",
        name: "extra",
      });
      getState().addAssetTexture("custom", "data");
      getState().setSelectedSpriteIdx(1);

      getState().resetSpriteStore();

      expect(getState().spriteInstances).toHaveLength(1);
      expect(getState().spriteInstances[0].textureName).toBe("hero-walk-front");
      expect(getState().spriteLibrary).toHaveLength(2);
      expect(getState().assetTextures).toEqual({});
      expect(getState().libraryTextures).toHaveProperty("hero-walk-front");
      expect(getState().libraryTextures).toHaveProperty("hero-walk-back");
      expect(getState().libraryTextures).toHaveProperty("gavin");
      expect(getState().selectedSpriteIdx).toBeNull();
      expect(getState().editingSpriteIdx).toBeNull();
    });
  });
});
