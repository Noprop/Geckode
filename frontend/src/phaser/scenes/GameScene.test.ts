import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('phaser', () => {
  const JustDown = vi.fn((key: { __justDown?: boolean }) => {
    const down = Boolean(key.__justDown);
    key.__justDown = false;
    return down;
  });

  const JustUp = vi.fn((key: { __justUp?: boolean }) => {
    const up = Boolean(key.__justUp);
    key.__justUp = false;
    return up;
  });

  class Scene {
    constructor(_key?: string) {}
  }

  return {
    Scene,
    Input: {
      Keyboard: {
        JustDown,
        JustUp,
        KeyCodes: {
          W: 87,
          A: 65,
          S: 83,
          D: 68,
        },
      },
    },
    GameObjects: {
      Sprite: class {},
    },
  };
});

vi.mock('@/phaser/EventBus', () => ({
  EventBus: {
    emit: vi.fn(),
    on: vi.fn(),
    off: vi.fn(),
  },
}));

vi.mock('@/stores/geckodeStore', () => ({
  useGeckodeStore: {
    getState: () => ({
      tiles: {},
      tilemaps: {},
      activeTilemapId: 'tilemap_1',
      tileCollidables: {},
      spriteInstances: [],
    }),
  },
}));

import GameScene from '@/phaser/scenes/GameScene';

type MockSprite = {
  x: number;
  y: number;
  displayWidth: number;
  displayHeight: number;
  getData: (key: string) => unknown;
  setData: (key: string, value: unknown) => void;
};

function createKeyState(isDown = false, justDown = false, justUp = false) {
  return {
    isDown,
    __justDown: justDown,
    __justUp: justUp,
  };
}

function createSprite(options?: {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  data?: Record<string, unknown>;
}): MockSprite {
  const spriteData = { ...(options?.data ?? {}) };

  return {
    x: options?.x ?? 0,
    y: options?.y ?? 0,
    displayWidth: options?.width ?? 10,
    displayHeight: options?.height ?? 10,
    getData(key: string) {
      return spriteData[key];
    },
    setData(key: string, value: unknown) {
      spriteData[key] = value;
    },
  };
}

function setSceneSprites(scene: GameScene, sprites: Array<[string, MockSprite]>) {
  (scene as any).gameSprites = new Map(sprites);
}

describe('GameScene runtime input contracts', () => {
  let scene: GameScene;

  beforeEach(() => {
    scene = new GameScene();
  });

  it('moveWithArrows zeroes X velocity when left and right are both down', () => {
    const sprite = createSprite({ data: { vx: 12, vy: 0 } });
    setSceneSprites(scene, [['hero', sprite]]);

    (scene as any).cursors = {
      left: createKeyState(true),
      right: createKeyState(true),
      up: createKeyState(false),
      down: createKeyState(false),
    };

    (scene as any).moveWithArrows('hero', 6, 0);

    expect(sprite.getData('vx')).toBe(0);
  });

  it('moveWithArrows applies signed velocity for single direction keys', () => {
    const sprite = createSprite({ data: { vx: 0, vy: 0 } });
    setSceneSprites(scene, [['hero', sprite]]);

    (scene as any).cursors = {
      left: createKeyState(true),
      right: createKeyState(false),
      up: createKeyState(false),
      down: createKeyState(true),
    };

    (scene as any).moveWithArrows('hero', 5, 7);

    expect(sprite.getData('vx')).toBe(-5);
    expect(sprite.getData('vy')).toBe(7);
  });

  it('moveWithArrows zeroes velocity on key release', () => {
    const sprite = createSprite({ data: { vx: 5, vy: -4 } });
    setSceneSprites(scene, [['hero', sprite]]);

    (scene as any).cursors = {
      left: createKeyState(false, false, true),
      right: createKeyState(false),
      up: createKeyState(false),
      down: createKeyState(false, false, true),
    };

    (scene as any).moveWithArrows('hero', 5, 4);

    expect(sprite.getData('vx')).toBe(0);
    expect(sprite.getData('vy')).toBe(0);
  });

  it('getJustPressed dedupes same-frame checks', () => {
    const key = createKeyState(false, true, false);

    expect((scene as any).getJustPressed(key)).toBe(true);
    expect((scene as any).getJustPressed(key)).toBe(true);

    (scene as any).justPressedKeys = [];
    expect((scene as any).getJustPressed(key)).toBe(false);
  });

  it('getJustReleased dedupes same-frame checks', () => {
    const key = createKeyState(false, false, true);

    expect((scene as any).getJustReleased(key)).toBe(true);
    expect((scene as any).getJustReleased(key)).toBe(true);

    (scene as any).justReleasedKeys = [];
    expect((scene as any).getJustReleased(key)).toBe(false);
  });

  it('getMovementAngle preserves current movement-angle semantics', () => {
    const stationary = createSprite({ data: { vx: 0, vy: 0 } });
    const movingRight = createSprite({ data: { vx: 1, vy: 0 } });
    const movingUp = createSprite({ data: { vx: 0, vy: -1 } });

    setSceneSprites(scene, [
      ['stationary', stationary],
      ['movingRight', movingRight],
      ['movingUp', movingUp],
    ]);

    expect((scene as any).getMovementAngle('missing')).toBe(0);
    expect((scene as any).getMovementAngle('stationary')).toBe(0);
    expect((scene as any).getMovementAngle('movingRight')).toBe(90);
    expect((scene as any).getMovementAngle('movingUp')).toBe(0);
  });
});

describe('GameScene toWorldY / toLogicalY', () => {
  let scene: GameScene;

  beforeEach(() => {
    scene = new GameScene();
  });

  it('toWorldY negates positive Y to Phaser coordinates', () => {
    expect(scene.toWorldY(100)).toBe(-100);
    expect(scene.toWorldY(0)).toBe(-0);
    expect(scene.toWorldY(-50)).toBe(50);
  });

  it('toLogicalY negates Phaser Y back to logical coordinates', () => {
    expect(scene.toLogicalY(-100)).toBe(100);
    expect(scene.toLogicalY(0)).toBe(-0);
    expect(scene.toLogicalY(50)).toBe(-50);
  });

  it('round-trips correctly', () => {
    for (const y of [0, 42, -300, 0.5]) {
      expect(scene.toLogicalY(scene.toWorldY(y))).toBe(y);
      expect(scene.toWorldY(scene.toLogicalY(y))).toBe(y);
    }
  });
});

describe('GameScene resolveAxisMovement', () => {
  let scene: GameScene;

  beforeEach(() => {
    scene = new GameScene();
    (scene as any).worldBounds = {
      left: 0,
      top: -100,
      right: 100,
      bottom: 0,
    };
    (scene as any).getClosestTileCollisionGap = vi.fn(() => null);
  });

  it('moves non-solid sprites freely without collision checks', () => {
    const sprite = createSprite({
      x: 5,
      data: {
        isSolid: false,
        isStatic: false,
      },
    });

    setSceneSprites(scene, [['s', sprite]]);

    const moved = (scene as any).resolveAxisMovement(sprite, -3, 'x');

    expect(moved).toBe(-3);
    expect(sprite.x).toBe(2);
  });

  it('stops at static blockers and applies bounce', () => {
    const mover = createSprite({
      x: 10,
      data: {
        isSolid: true,
        isStatic: false,
        bounce: 0.5,
        vx: 20,
      },
    });
    const blocker = createSprite({
      x: 22,
      data: {
        isSolid: true,
        isStatic: true,
      },
    });

    setSceneSprites(scene, [
      ['mover', mover],
      ['blocker', blocker],
    ]);

    const moved = (scene as any).resolveAxisMovement(mover, 10, 'x');

    expect(moved).toBeCloseTo(2);
    expect(mover.x).toBeCloseTo(12);
    expect(mover.getData('vx')).toBeCloseTo(-10);
  });

  it('pushes dynamic blockers and imparts velocity', () => {
    const mover = createSprite({
      x: 10,
      data: {
        isSolid: true,
        isStatic: false,
        bounce: 0,
        vx: 20,
      },
    });
    const pushed = createSprite({
      x: 22,
      data: {
        isSolid: true,
        isStatic: false,
        drag: 0.5,
      },
    });

    setSceneSprites(scene, [
      ['mover', mover],
      ['pushed', pushed],
    ]);

    const moved = (scene as any).resolveAxisMovement(mover, 10, 'x');

    expect(moved).toBe(10);
    expect(mover.x).toBe(20);
    expect(pushed.x).toBe(30);
    expect(pushed.getData('vx')).toBe(10);
  });

  it('prefers world-bound blocker when it is the nearest collision', () => {
    const sprite = createSprite({
      x: 10,
      data: {
        isSolid: true,
        isStatic: false,
        collideWorldBounds: true,
        bounce: 0.5,
        vx: 10,
      },
    });

    (scene as any).worldBounds.right = 18;
    (scene as any).getClosestTileCollisionGap = vi.fn(() => 8);

    setSceneSprites(scene, [['sprite', sprite]]);

    const moved = (scene as any).resolveAxisMovement(sprite, 10, 'x');

    expect(moved).toBeCloseTo(3);
    expect(sprite.x).toBeCloseTo(13);
    expect(sprite.getData('vx')).toBeCloseTo(-5);
  });

  it('prefers tilemap blocker when it is the nearest collision', () => {
    const sprite = createSprite({
      x: 10,
      data: {
        isSolid: true,
        isStatic: false,
        collideWorldBounds: true,
        bounce: 0.2,
        vx: 10,
      },
    });

    (scene as any).worldBounds.right = 25;
    (scene as any).getClosestTileCollisionGap = vi.fn(() => 2);

    setSceneSprites(scene, [['sprite', sprite]]);

    const moved = (scene as any).resolveAxisMovement(sprite, 10, 'x');

    expect(moved).toBeCloseTo(2);
    expect(sprite.x).toBeCloseTo(12);
    expect(sprite.getData('vx')).toBeCloseTo(-2);
  });
});

describe('GameScene simultaneous multi-sprite push', () => {
  let scene: GameScene;

  beforeEach(() => {
    scene = new GameScene();
    (scene as any).worldBounds = { left: -200, top: -200, right: 200, bottom: 200 };
    (scene as any).getClosestTileCollisionGap = vi.fn(() => null);
  });

  it('pushes two stacked blocks when player edge touches the second block', () => {
    // 16×16 sprites on a grid. Player aligned with blockA.
    // BlockB sits directly above blockA — touching at the edge.
    // Player bottom = 8, blockB top = -24+8 = ... let me use y positions:
    //   player y=0  → extent [-8, 8]
    //   blockA y=0  → extent [-8, 8]   (full overlap with player)
    //   blockB y=-16 → extent [-24, -8] (touches player at y=-8)
    const player = createSprite({
      x: 0, y: 0, width: 16, height: 16,
      data: { isSolid: true, isStatic: false, bounce: 0, vx: 100 },
    });
    const blockA = createSprite({
      x: 18, y: 0, width: 16, height: 16,
      data: { isSolid: true, isStatic: false, drag: 1 },
    });
    const blockB = createSprite({
      x: 18, y: -16, width: 16, height: 16,
      data: { isSolid: true, isStatic: false, drag: 1 },
    });

    setSceneSprites(scene, [
      ['player', player],
      ['blockA', blockA],
      ['blockB', blockB],
    ]);

    // gap to both blocks: (18-8)-(0+8) = 2, remain = 8
    (scene as any).resolveAxisMovement(player, 10, 'x');

    expect(blockA.x).toBe(26);
    expect(blockB.x).toBe(26);
    expect(player.x).toBe(10);
  });

  it('pushes two stacked blocks when player edge touches the block below', () => {
    // Same layout but blockB is below — touching at y=8
    const player = createSprite({
      x: 0, y: 0, width: 16, height: 16,
      data: { isSolid: true, isStatic: false, bounce: 0, vx: 100 },
    });
    const blockA = createSprite({
      x: 18, y: 0, width: 16, height: 16,
      data: { isSolid: true, isStatic: false, drag: 1 },
    });
    const blockB = createSprite({
      x: 18, y: 16, width: 16, height: 16,
      data: { isSolid: true, isStatic: false, drag: 1 },
    });

    setSceneSprites(scene, [
      ['player', player],
      ['blockA', blockA],
      ['blockB', blockB],
    ]);

    (scene as any).resolveAxisMovement(player, 10, 'x');

    expect(blockA.x).toBe(26);
    expect(blockB.x).toBe(26);
    expect(player.x).toBe(10);
  });

  it('pushes two side-by-side blocks when player edge touches the second block (Y axis)', () => {
    // Player moves downward (+Y in Phaser). Two blocks side by side on X,
    // touching at the edge.
    const player = createSprite({
      x: 0, y: 0, width: 16, height: 16,
      data: { isSolid: true, isStatic: false, bounce: 0, vy: 100 },
    });
    const blockA = createSprite({
      x: 0, y: 18, width: 16, height: 16,
      data: { isSolid: true, isStatic: false, drag: 1 },
    });
    const blockB = createSprite({
      x: 16, y: 18, width: 16, height: 16,
      data: { isSolid: true, isStatic: false, drag: 1 },
    });

    setSceneSprites(scene, [
      ['player', player],
      ['blockA', blockA],
      ['blockB', blockB],
    ]);

    (scene as any).resolveAxisMovement(player, 10, 'y');

    expect(blockA.y).toBe(26);
    expect(blockB.y).toBe(26);
    expect(player.y).toBe(10);
  });

  it('pushes both blocks with overlapping Y (sanity check)', () => {
    const player = createSprite({
      x: 0, y: 0, width: 16, height: 16,
      data: { isSolid: true, isStatic: false, bounce: 0, vx: 100 },
    });
    const blockA = createSprite({
      x: 18, y: -3, width: 16, height: 16,
      data: { isSolid: true, isStatic: false, drag: 1 },
    });
    const blockB = createSprite({
      x: 18, y: 3, width: 16, height: 16,
      data: { isSolid: true, isStatic: false, drag: 1 },
    });

    setSceneSprites(scene, [
      ['player', player],
      ['blockA', blockA],
      ['blockB', blockB],
    ]);

    (scene as any).resolveAxisMovement(player, 10, 'x');

    expect(blockA.x).toBe(26);
    expect(blockB.x).toBe(26);
    expect(player.x).toBe(10);
  });

  it('stops at static block even when pushing a dynamic block simultaneously', () => {
    const player = createSprite({
      x: 0, y: 0, width: 16, height: 16,
      data: { isSolid: true, isStatic: false, bounce: 0.5, vx: 100 },
    });
    const dynamicBlock = createSprite({
      x: 18, y: 0, width: 16, height: 16,
      data: { isSolid: true, isStatic: false, drag: 1 },
    });
    const staticBlock = createSprite({
      x: 18, y: -16, width: 16, height: 16,
      data: { isSolid: true, isStatic: true },
    });

    setSceneSprites(scene, [
      ['player', player],
      ['dynamic', dynamicBlock],
      ['static', staticBlock],
    ]);

    (scene as any).resolveAxisMovement(player, 10, 'x');

    // Static blocker in the set → player stops at contact (gap=2), bounces
    expect(player.x).toBeCloseTo(2);
    expect(dynamicBlock.x).toBe(18);
    expect(staticBlock.x).toBe(18);
    expect(player.getData('vx')).toBeCloseTo(-50);
  });

  it('limits push to the most constrained block', () => {
    // blockedBlock is backed by a wall 4px away. freeBlock is unobstructed.
    // Wall placed at y=-24 so it overlaps blockedBlock but NOT freeBlock.
    const player = createSprite({
      x: 0, y: 0, width: 16, height: 16,
      data: { isSolid: true, isStatic: false, bounce: 0, vx: 100 },
    });
    const freeBlock = createSprite({
      x: 18, y: 0, width: 16, height: 16,
      data: { isSolid: true, isStatic: false, drag: 1 },
    });
    const blockedBlock = createSprite({
      x: 18, y: -16, width: 16, height: 16,
      data: { isSolid: true, isStatic: false, drag: 1, bounce: 0 },
    });
    const wall = createSprite({
      x: 38, y: -24, width: 16, height: 16,
      data: { isSolid: true, isStatic: true },
    });

    setSceneSprites(scene, [
      ['player', player],
      ['free', freeBlock],
      ['blocked', blockedBlock],
      ['wall', wall],
    ]);

    (scene as any).resolveAxisMovement(player, 10, 'x');

    // gap = 2, remain = 8.
    // blockedBlock hits wall at gap 4 → pushed only 4.
    // freeBlock pushed full 8. minPushed = 4.
    expect(player.x).toBeCloseTo(6);
    expect(blockedBlock.x).toBeCloseTo(22);
  });
});
