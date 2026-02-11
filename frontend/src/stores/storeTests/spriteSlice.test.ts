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
import { createUniqueTextureName } from '../slices/spriteSlice';
import { useGeckodeStore } from "../geckodeStore";

const getState = () => useGeckodeStore.getState();

beforeEach(() => {
  useGeckodeStore.setState({
    spriteInstances: [
      {
        id: 'inst1',
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
    assetTextures: { 'hero-walk-front': 'base64-front' },
    libraryTextures: {
      'hero-walk-front': 'base64-front',
      'hero-walk-back': 'base64-back',
      gavin: 'base64-gavin',
    },
    isSpriteModalOpen: false,
    selectedSpriteId: null,
    editingSource: null,
    editingTextureName: null,
  });
});

describe('createUniqueTextureName', () => {
  it('returns name as-is when no collision exists', () => {
    const assetTextures: Record<string, string> = { foo: 'x' };
    expect(createUniqueTextureName('mySprite', assetTextures)).toBe('mySprite');
  });

  it('appends 2 when name collides', () => {
    const assetTextures: Record<string, string> = { mySprite: 'x' };
    expect(createUniqueTextureName('mySprite', assetTextures)).toBe('mySprite2');
  });

  it('increments trailing digit on collision', () => {
    const assetTextures: Record<string, string> = { mySprite2: 'x' };
    expect(createUniqueTextureName('mySprite2', assetTextures)).toBe('mySprite3');
  });

  it('handles multiple collisions', () => {
    const assetTextures: Record<string, string> = {
      mySprite: 'a',
      mySprite2: 'b',
    };
    expect(createUniqueTextureName('mySprite', assetTextures)).toBe('mySprite3');
  });
});

describe('spriteSlice', () => {
  describe('initialization', () => {
    it('initializes with one default sprite instance', () => {
      expect(getState().spriteInstances).toHaveLength(1);
      expect(getState().spriteInstances[0].textureName).toBe('hero-walk-front');
      expect(getState().spriteInstances[0].x).toBe(200);
      expect(getState().spriteInstances[0].y).toBe(150);
    });
  });

  describe('addSpriteInstance', () => {
    it('creates instance with correct defaults', () => {
      getState().addSpriteInstance({
        textureName: 'test-tex',
        name: 'testSprite',
      });

      const instances = getState().spriteInstances;
      expect(instances).toHaveLength(2);
      const newInstance = instances[1];
      expect(newInstance.id).toMatch(/^id_\d+$/);
      expect(newInstance.textureName).toBe('test-tex');
      expect(newInstance.name).toBe('testSprite');
      expect(newInstance.x).toBe(0);
      expect(newInstance.y).toBe(0);
      expect(newInstance.visible).toBe(true);
      expect(newInstance.scaleX).toBe(1);
      expect(newInstance.scaleY).toBe(1);
      expect(newInstance.direction).toBe(0);
      expect(newInstance.snapToGrid).toBe(true);
    });
  });

  describe('removeSpriteInstance', () => {
    it('removes by index correctly', () => {
      getState().addSpriteInstance({
        textureName: 'tex2',
        name: 'sprite2',
      });
      expect(getState().spriteInstances).toHaveLength(2);

      getState().removeSpriteInstance(getState().spriteInstances[0].id);
      expect(getState().spriteInstances).toHaveLength(1);
      expect(getState().spriteInstances[0].name).toBe('sprite2');
    });
  });

  describe('updateInstanceOrder', () => {
    it('reorders correctly', () => {
      getState().addSpriteInstance({ textureName: 'ta', name: 'a' });
      getState().addSpriteInstance({ textureName: 'tb', name: 'b' });

      getState().updateInstanceOrder(2, 0);
      const names = getState().spriteInstances.map((s) => s.name);
      expect(names).toEqual(['b', 'herowalkfront1', 'a']);
    });
  });

  describe('setSpriteInstances', () => {
    it('replaces all instances', () => {
      getState().setSpriteInstances([
        {
          id: 'x',
          textureName: 'tx',
          name: 'x',
          x: 10,
          y: 20,
          visible: false,
          scaleX: 2,
          scaleY: 2,
          direction: 90,
          snapToGrid: false,
        },
      ]);
      expect(getState().spriteInstances).toHaveLength(1);
      expect(getState().spriteInstances[0].id).toBe('x');
      expect(getState().spriteInstances[0].visible).toBe(false);
    });
  });

  describe('addAssetTexture / removeAssetTexture', () => {
    it('adds and removes asset textures', () => {
      getState().addAssetTexture('newTex', 'data:image/png;base64,...');
      expect(getState().assetTextures['newTex']).toBe('data:image/png;base64,...');

      getState().removeAssetTexture('newTex');
      expect(getState().assetTextures['newTex']).toBeUndefined();
    });
  });

  describe('setSelectedSpriteId / setEditingSprite / clearEditingSprite', () => {
    it('updates selection', () => {
      getState().setSelectedSpriteId('inst1');
      expect(getState().selectedSpriteId).toBe('inst1');
    });

    it('setEditingSprite sets source and texture name', () => {
      getState().setEditingSprite('library', 'hero-walk-back');
      expect(getState().editingSource).toBe('library');
      expect(getState().editingTextureName).toBe('hero-walk-back');
    });

    it('clearEditingSprite clears editing state', () => {
      getState().setEditingSprite('asset', 'myTex');
      getState().clearEditingSprite();
      expect(getState().editingSource).toBeNull();
      expect(getState().editingTextureName).toBeNull();
    });
  });

  describe('setIsSpriteModalOpen', () => {
    it('toggles modal', () => {
      expect(getState().isSpriteModalOpen).toBe(false);
      getState().setIsSpriteModalOpen(true);
      expect(getState().isSpriteModalOpen).toBe(true);
      getState().setIsSpriteModalOpen(false);
      expect(getState().isSpriteModalOpen).toBe(false);
    });
  });

  describe('saveSprite', () => {
    it("from 'new' source creates new asset texture and sprite instance", () => {
      getState().setEditingSprite('new', null);
      const tex = getState().saveSprite({
        spriteName: 'mySprite',
        base64Image: 'data:image/png;base64,abc',
      });

      expect(tex).toBe('mySprite');
      expect(getState().assetTextures['mySprite']).toBe('data:image/png;base64,abc');
      expect(getState().spriteInstances).toHaveLength(2);
      expect(getState().spriteInstances[1].textureName).toBe('mySprite');
      expect(getState().spriteInstances[1].name).toBe('mySprite');
      expect(getState().libraryTextures).toEqual({
        'hero-walk-front': 'base64-front',
        'hero-walk-back': 'base64-back',
        gavin: 'base64-gavin',
      });
    });

    it("from 'library' source creates new asset texture and sprite instance", () => {
      getState().setEditingSprite('library', 'gavin');
      const tex = getState().saveSprite({
        spriteName: 'gavinCopy',
        base64Image: 'data:image/png;base64,xyz',
      });

      expect(tex).toBe('gavinCopy');
      expect(getState().assetTextures['gavinCopy']).toBe('data:image/png;base64,xyz');
      expect(getState().spriteInstances).toHaveLength(2);
      expect(getState().libraryTextures['gavin']).toBe('base64-gavin');
    });

    it("from 'asset' source updates existing texture and adds instance", () => {
      getState().setEditingSprite('asset', 'hero-walk-front');
      const tex = getState().saveSprite({
        spriteName: 'herowalkfront1',
        base64Image: 'data:image/png;base64,updated',
      });

      expect(tex).toBe('hero-walk-front');
      expect(getState().assetTextures['hero-walk-front']).toBe('data:image/png;base64,updated');
      expect(getState().spriteInstances).toHaveLength(2);
      expect(Object.keys(getState().assetTextures)).toHaveLength(1);
    });

    it('deduplicates texture name when saving from library/new', () => {
      getState().addAssetTexture('mySprite', 'existing');
      getState().setEditingSprite('new', null);
      const tex = getState().saveSprite({
        spriteName: 'mySprite',
        base64Image: 'data:image/png;base64,new',
      });

      expect(tex).toBe('mySprite2');
      expect(getState().assetTextures['mySprite']).toBe('existing');
      expect(getState().assetTextures['mySprite2']).toBe('data:image/png;base64,new');
    });
  });

  describe('resetSpriteStore', () => {
    it('restores defaults with default asset texture', () => {
      getState().addSpriteInstance({
        textureName: 'tex',
        name: 'extra',
      });
      getState().addAssetTexture('custom', 'data');
      getState().setSelectedSpriteId('some-id');
      getState().setEditingSprite('asset', 'custom');

      getState().resetSpriteStore();

      expect(getState().spriteInstances).toHaveLength(1);
      expect(getState().spriteInstances[0].textureName).toBe('hero-walk-front');
      expect(getState().assetTextures).toHaveProperty('hero-walk-front');
      expect(Object.keys(getState().assetTextures)).toHaveLength(1);
      expect(getState().libraryTextures).toHaveProperty('hero-walk-front');
      expect(getState().libraryTextures).toHaveProperty('hero-walk-back');
      expect(getState().libraryTextures).toHaveProperty('gavin');
      expect(getState().selectedSpriteId).toBeNull();
      expect(getState().editingSource).toBeNull();
      expect(getState().editingTextureName).toBeNull();
    });
  });
});
