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

  it('moves sprites without collidesWithWalls freely without collision checks', () => {
    const sprite = createSprite({
      x: 5,
      data: {
        collidesWithWalls: false,
        pushable: true,
      },
    });

    setSceneSprites(scene, [['s', sprite]]);

    const moved = (scene as any).resolveAxisMovement(sprite, -3, 'x');

    expect(moved).toBe(-3);
    expect(sprite.x).toBe(2);
  });

  it('stops at non-pushable blockers and applies bounce', () => {
    const mover = createSprite({
      x: 10,
      data: {
        collidesWithWalls: true,
        pushesObjects: true,
        isSolid: true,
        pushable: true,
        bounce: 0.5,
        vx: 20,
      },
    });
    const blocker = createSprite({
      x: 22,
      data: {
        isSolid: true,
        pushable: false,
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
        collidesWithWalls: true,
        pushesObjects: true,
        isSolid: true,
        pushable: true,
        bounce: 0,
        vx: 20,
      },
    });
    const pushed = createSprite({
      x: 22,
      data: {
        isSolid: true,
        pushable: true,
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
        collidesWithWalls: true,
        pushesObjects: true,
        isSolid: true,
        pushable: true,
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
        collidesWithWalls: true,
        pushesObjects: true,
        isSolid: true,
        pushable: true,
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

  it('skips edge-touching block above (strict overlap excludes zero-width contact)', () => {
    // blockB y=-16 → extent [-24, -8], player extent [-8, 8].
    // They share only the line y=-8 — strict overlap excludes this.
    // Only blockA (full overlap) is pushed.
    const player = createSprite({
      x: 0, y: 0, width: 16, height: 16,
      data: { collidesWithWalls: true, pushesObjects: true, isSolid: true, pushable: true, bounce: 0, vx: 100 },
    });
    const blockA = createSprite({
      x: 18, y: 0, width: 16, height: 16,
      data: { isSolid: true, pushable: true, drag: 1 },
    });
    const blockB = createSprite({
      x: 18, y: -16, width: 16, height: 16,
      data: { isSolid: true, pushable: true, drag: 1 },
    });

    setSceneSprites(scene, [
      ['player', player],
      ['blockA', blockA],
      ['blockB', blockB],
    ]);

    (scene as any).resolveAxisMovement(player, 10, 'x');

    expect(blockA.x).toBe(26);
    expect(blockB.x).toBe(18); // not pushed — edge-touching only
    expect(player.x).toBe(10);
  });

  it('skips edge-touching block below (strict overlap excludes zero-width contact)', () => {
    // blockB y=16 → extent [8, 24], player extent [-8, 8].
    // They share only the line y=8 — strict overlap excludes this.
    const player = createSprite({
      x: 0, y: 0, width: 16, height: 16,
      data: { collidesWithWalls: true, pushesObjects: true, isSolid: true, pushable: true, bounce: 0, vx: 100 },
    });
    const blockA = createSprite({
      x: 18, y: 0, width: 16, height: 16,
      data: { isSolid: true, pushable: true, drag: 1 },
    });
    const blockB = createSprite({
      x: 18, y: 16, width: 16, height: 16,
      data: { isSolid: true, pushable: true, drag: 1 },
    });

    setSceneSprites(scene, [
      ['player', player],
      ['blockA', blockA],
      ['blockB', blockB],
    ]);

    (scene as any).resolveAxisMovement(player, 10, 'x');

    expect(blockA.x).toBe(26);
    expect(blockB.x).toBe(18); // not pushed — edge-touching only
    expect(player.x).toBe(10);
  });

  it('skips edge-touching side-by-side block on Y axis (strict overlap)', () => {
    // blockB x=16 → extent [8, 24], player extent [-8, 8].
    // They share only the line x=8 — strict overlap excludes this.
    const player = createSprite({
      x: 0, y: 0, width: 16, height: 16,
      data: { collidesWithWalls: true, pushesObjects: true, isSolid: true, pushable: true, bounce: 0, vy: 100 },
    });
    const blockA = createSprite({
      x: 0, y: 18, width: 16, height: 16,
      data: { isSolid: true, pushable: true, drag: 1 },
    });
    const blockB = createSprite({
      x: 16, y: 18, width: 16, height: 16,
      data: { isSolid: true, pushable: true, drag: 1 },
    });

    setSceneSprites(scene, [
      ['player', player],
      ['blockA', blockA],
      ['blockB', blockB],
    ]);

    (scene as any).resolveAxisMovement(player, 10, 'y');

    expect(blockA.y).toBe(26);
    expect(blockB.y).toBe(18); // not pushed — edge-touching only
    expect(player.y).toBe(10);
  });

  it('pushes both blocks with overlapping Y (sanity check)', () => {
    const player = createSprite({
      x: 0, y: 0, width: 16, height: 16,
      data: { collidesWithWalls: true, pushesObjects: true, isSolid: true, pushable: true, bounce: 0, vx: 100 },
    });
    const blockA = createSprite({
      x: 18, y: -3, width: 16, height: 16,
      data: { isSolid: true, pushable: true, drag: 1 },
    });
    const blockB = createSprite({
      x: 18, y: 3, width: 16, height: 16,
      data: { isSolid: true, pushable: true, drag: 1 },
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

  it('ignores edge-touching static block, pushes dynamic block freely', () => {
    // staticBlock y=-16 shares only the line y=-8 with player — strict overlap skips it.
    const player = createSprite({
      x: 0, y: 0, width: 16, height: 16,
      data: { collidesWithWalls: true, pushesObjects: true, isSolid: true, pushable: true, bounce: 0.5, vx: 100 },
    });
    const dynamicBlock = createSprite({
      x: 18, y: 0, width: 16, height: 16,
      data: { isSolid: true, pushable: true, drag: 1 },
    });
    const staticBlock = createSprite({
      x: 18, y: -16, width: 16, height: 16,
      data: { isSolid: true, pushable: false },
    });

    setSceneSprites(scene, [
      ['player', player],
      ['dynamic', dynamicBlock],
      ['static', staticBlock],
    ]);

    (scene as any).resolveAxisMovement(player, 10, 'x');

    // Only dynamicBlock has real overlap → pushed freely
    expect(player.x).toBe(10);
    expect(dynamicBlock.x).toBe(26);
    expect(staticBlock.x).toBe(18);
  });

  it('limits push to the most constrained block (with real overlap)', () => {
    // blockedBlock has real Y overlap with player, backed by a wall.
    // freeBlock also has real overlap, unobstructed.
    const player = createSprite({
      x: 0, y: 0, width: 16, height: 16,
      data: { collidesWithWalls: true, pushesObjects: true, isSolid: true, pushable: true, bounce: 0, vx: 100 },
    });
    const freeBlock = createSprite({
      x: 18, y: 3, width: 16, height: 16,
      data: { collidesWithWalls: true, pushesObjects: true, isSolid: true, pushable: true, drag: 1 },
    });
    const blockedBlock = createSprite({
      x: 18, y: -3, width: 16, height: 16,
      data: { collidesWithWalls: true, pushesObjects: true, isSolid: true, pushable: true, drag: 1, bounce: 0 },
    });
    const wall = createSprite({
      x: 38, y: -3, width: 16, height: 16,
      data: { isSolid: true, pushable: false },
    });

    setSceneSprites(scene, [
      ['player', player],
      ['free', freeBlock],
      ['blocked', blockedBlock],
      ['wall', wall],
    ]);

    (scene as any).resolveAxisMovement(player, 10, 'x');

    // gap to both blocks = 2, remain = 8.
    // blockedBlock hits wall at gap (38-8)-(18+8) = 4 → pushed only 4.
    // freeBlock pushed full 8. minPushed = 4.
    expect(player.x).toBeCloseTo(6);
    expect(blockedBlock.x).toBeCloseTo(22);
  });
});

describe('GameScene chain-push (iterative sweep)', () => {
  let scene: GameScene;

  beforeEach(() => {
    scene = new GameScene();
    (scene as any).worldBounds = { left: -200, top: -200, right: 200, bottom: 200 };
    (scene as any).getClosestTileCollisionGap = vi.fn(() => null);
  });

  it('chain-pushes A into B when they are in a line', () => {
    // Player → A → B, all 16×16, gap=2 between each
    const player = createSprite({
      x: 0, y: 0, width: 16, height: 16,
      data: { collidesWithWalls: true, pushesObjects: true, isSolid: true, pushable: true, bounce: 0, vx: 100 },
    });
    const blockA = createSprite({
      x: 18, y: 0, width: 16, height: 16,
      data: { collidesWithWalls: true, pushesObjects: true, isSolid: true, pushable: true, drag: 1 },
    });
    const blockB = createSprite({
      x: 36, y: 0, width: 16, height: 16,
      data: { collidesWithWalls: true, pushesObjects: true, isSolid: true, pushable: true, drag: 1 },
    });

    setSceneSprites(scene, [
      ['player', player],
      ['blockA', blockA],
      ['blockB', blockB],
    ]);

    (scene as any).resolveAxisMovement(player, 10, 'x');

    // gap to A = 2, player moves 2 to contact. remain = 8.
    // A pushes into B: gap between A and B = 2, A moves 2 to contact B, remain = 6.
    // B is free, pushed 6. A advances 6. Player advances 8 total after contact.
    expect(player.x).toBe(10);
    expect(blockA.x).toBe(26);
    expect(blockB.x).toBe(42);
  });

  it('chain-pushes three blocks A → B → C', () => {
    const player = createSprite({
      x: 0, y: 0, width: 16, height: 16,
      data: { collidesWithWalls: true, pushesObjects: true, isSolid: true, pushable: true, bounce: 0, vx: 100 },
    });
    const blockA = createSprite({
      x: 18, y: 0, width: 16, height: 16,
      data: { collidesWithWalls: true, pushesObjects: true, isSolid: true, pushable: true, drag: 1 },
    });
    const blockB = createSprite({
      x: 36, y: 0, width: 16, height: 16,
      data: { collidesWithWalls: true, pushesObjects: true, isSolid: true, pushable: true, drag: 1 },
    });
    const blockC = createSprite({
      x: 54, y: 0, width: 16, height: 16,
      data: { collidesWithWalls: true, pushesObjects: true, isSolid: true, pushable: true, drag: 1 },
    });

    setSceneSprites(scene, [
      ['player', player],
      ['blockA', blockA],
      ['blockB', blockB],
      ['blockC', blockC],
    ]);

    (scene as any).resolveAxisMovement(player, 10, 'x');

    // gap to A = 2. After contact, remain = 8.
    // A→B gap = 2. A contacts B, remain = 6. Push B with 6.
    //   B→C gap = 2. B contacts C, remain = 4. Push C with 4.
    //   C free → C.x = 58. B re-scans, clear → B.x = 38+4 = 42.
    // A re-scans, clear → A.x = 20+6 = 26.
    // Player re-scans, clear → player.x = 2+8 = 10.
    expect(player.x).toBe(10);
    expect(blockA.x).toBe(26);
    expect(blockB.x).toBe(42);
    expect(blockC.x).toBe(58);
  });

  it('chain stops at static wall and bounces back', () => {
    const player = createSprite({
      x: 0, y: 0, width: 16, height: 16,
      data: { collidesWithWalls: true, pushesObjects: true, isSolid: true, pushable: true, bounce: 0.5, vx: 100 },
    });
    const blockA = createSprite({
      x: 18, y: 0, width: 16, height: 16,
      data: { collidesWithWalls: true, pushesObjects: true, isSolid: true, pushable: true, drag: 1, bounce: 0 },
    });
    const wall = createSprite({
      x: 40, y: 0, width: 16, height: 16,
      data: { isSolid: true, pushable: false },
    });

    setSceneSprites(scene, [
      ['player', player],
      ['blockA', blockA],
      ['wall', wall],
    ]);

    (scene as any).resolveAxisMovement(player, 10, 'x');

    // gap to A = 2. After contact, remain = 8.
    // A→wall gap = (40-8)-(18+8) = 6. A can only move 6 of 8.
    // Push incomplete → player advances 2 + 6 = 8, bounces.
    expect(player.x).toBeCloseTo(8);
    expect(blockA.x).toBeCloseTo(24);
    expect(wall.x).toBe(40);
    expect(player.getData('vx')).toBeCloseTo(-50);
  });

  it('elastic collision: bouncy pusher bounces and imparts velocity to pushed object', () => {
    // A (bounce=0.5, pushesObjects) hits B (pushable). A bounces, B gets imparted velocity.
    const spriteA = createSprite({
      x: 0, y: 0, width: 16, height: 16,
      data: { collidesWithWalls: true, pushesObjects: true, isSolid: true, pushable: true, bounce: 0.5, vx: 100 },
    });
    const spriteB = createSprite({
      x: 18, y: 0, width: 16, height: 16,
      data: { collidesWithWalls: true, pushesObjects: true, isSolid: true, pushable: true, drag: 1 },
    });

    setSceneSprites(scene, [
      ['A', spriteA],
      ['B', spriteB],
    ]);

    (scene as any).resolveAxisMovement(spriteA, 10, 'x');

    // A pushes B, both move. A bounces (vx = -100 * 0.5 = -50), B gets imparted (vx = 100)
    expect(spriteA.getData('vx')).toBe(-50);
    expect(spriteB.getData('vx')).toBe(100);
  });

  it('imparts velocity through chain A→C→B when C has low drag (B gets full impact)', () => {
    // A pushes C (drag=0.5), C pushes B (drag=1).
    // B receives full impact from A (100), not dampened by C's drag. C retains 50.
    const spriteA = createSprite({
      x: 0, y: 0, width: 16, height: 16,
      data: { collidesWithWalls: true, pushesObjects: true, isSolid: true, pushable: true, bounce: 0, vx: 100 },
    });
    const spriteC = createSprite({
      x: 18, y: 0, width: 16, height: 16,
      data: { collidesWithWalls: true, pushesObjects: true, isSolid: true, pushable: true, drag: 0.5 },
    });
    const spriteB = createSprite({
      x: 36, y: 0, width: 16, height: 16,
      data: { collidesWithWalls: true, pushesObjects: true, isSolid: true, pushable: true, drag: 1 },
    });

    setSceneSprites(scene, [
      ['A', spriteA],
      ['C', spriteC],
      ['B', spriteB],
    ]);

    (scene as any).resolveAxisMovement(spriteA, 10, 'x');

    // Positions: A→C→B all move correctly
    expect(spriteA.x).toBe(10);
    expect(spriteC.x).toBe(26);
    expect(spriteB.x).toBe(42);

    // C receives velocity from A: 100 * 0.5 = 50
    expect(spriteC.getData('vx')).toBe(50);

    // B receives full impact from A (passed through chain): 100 * 1 = 100
    expect(spriteB.getData('vx')).toBe(100);
  });

  it('imparts velocity through chain A→C→B when C has drag=0 (impact passes through)', () => {
    // A pushes C (drag=0), C pushes B (drag=1).
    // C absorbs all velocity (does not slide), but B should still receive velocity from the impact.
    const spriteA = createSprite({
      x: 0, y: 0, width: 16, height: 16,
      data: { collidesWithWalls: true, pushesObjects: true, isSolid: true, pushable: true, bounce: 0, vx: 100 },
    });
    const spriteC = createSprite({
      x: 18, y: 0, width: 16, height: 16,
      data: { collidesWithWalls: true, pushesObjects: true, isSolid: true, pushable: true, drag: 0 },
    });
    const spriteB = createSprite({
      x: 36, y: 0, width: 16, height: 16,
      data: { collidesWithWalls: true, pushesObjects: true, isSolid: true, pushable: true, drag: 1 },
    });

    setSceneSprites(scene, [
      ['A', spriteA],
      ['C', spriteC],
      ['B', spriteB],
    ]);

    (scene as any).resolveAxisMovement(spriteA, 10, 'x');

    // Positions: A→C→B all move correctly
    expect(spriteA.x).toBe(10);
    expect(spriteC.x).toBe(26);
    expect(spriteB.x).toBe(42);

    // C has drag=0 so retains no velocity
    expect(spriteC.getData('vx')).toBe(0);

    // B receives velocity from A's impact (passed through C): 100 * 1 = 100
    expect(spriteB.getData('vx')).toBe(100);
  });

  it('imparts velocity through chain A→C→B→D (D gets root A velocity, not C)', () => {
    // A pushes C (drag=0.5), C pushes B, B pushes D.
    // Without passing effectiveImpartVel through pushBlockerGroup, D would get C's velocity (50).
    // With the fix, D receives A's velocity (100).
    const spriteA = createSprite({
      x: 0, y: 0, width: 16, height: 16,
      data: { collidesWithWalls: true, pushesObjects: true, isSolid: true, pushable: true, bounce: 0, vx: 100 },
    });
    const spriteC = createSprite({
      x: 18, y: 0, width: 16, height: 16,
      data: { collidesWithWalls: true, pushesObjects: true, isSolid: true, pushable: true, drag: 0.5 },
    });
    const spriteB = createSprite({
      x: 36, y: 0, width: 16, height: 16,
      data: { collidesWithWalls: true, pushesObjects: true, isSolid: true, pushable: true, drag: 1 },
    });
    const spriteD = createSprite({
      x: 54, y: 0, width: 16, height: 16,
      data: { collidesWithWalls: true, pushesObjects: true, isSolid: true, pushable: true, drag: 1 },
    });

    setSceneSprites(scene, [
      ['A', spriteA],
      ['C', spriteC],
      ['B', spriteB],
      ['D', spriteD],
    ]);

    (scene as any).resolveAxisMovement(spriteA, 10, 'x');

    // C gets 50 (A * C's drag), B gets 100, D must get 100 (root A), not 50 (C)
    expect(spriteC.getData('vx')).toBe(50);
    expect(spriteB.getData('vx')).toBe(100);
    expect(spriteD.getData('vx')).toBe(100);
  });

  it('B separates from C when B has higher velocity (processed does not skip faster pushed)', () => {
    // C (vx=50) and B (vx=100) in contact. B should move and separate from C.
    // Without the processed fix, B would be skipped and stick to C.
    const spriteC = createSprite({
      x: 0, y: 0, width: 16, height: 16,
      data: { collidesWithWalls: true, pushesObjects: true, isSolid: true, pushable: true, drag: 1, vx: 50 },
    });
    const spriteB = createSprite({
      x: 18, y: 0, width: 16, height: 16,
      data: { collidesWithWalls: true, pushesObjects: true, isSolid: true, pushable: true, drag: 1, vx: 100 },
    });

    setSceneSprites(scene, [
      ['C', spriteC],
      ['B', spriteB],
    ]);

    (scene as any).physicsStep(0.1);

    // B (100) moves 10, C (50) moves 5. B should end up ahead of C.
    expect(spriteB.x).toBeGreaterThan(spriteC.x + 8);
  });

  it('pushesObjects sprite blocks pushable mover even when not solid', () => {
    // Player (pushesObjects, isSolid=false) blocks puzzle block (pushable) from passing through
    const player = createSprite({
      x: 20, y: 0, width: 16, height: 16,
      data: { collidesWithWalls: true, pushesObjects: true, isSolid: false, pushable: false },
    });
    const block = createSprite({
      x: 0, y: 0, width: 16, height: 16,
      data: { collidesWithWalls: true, pushesObjects: true, isSolid: true, pushable: true, vx: 100 },
    });

    setSceneSprites(scene, [
      ['player', player],
      ['block', block],
    ]);

    (scene as any).resolveAxisMovement(block, 15, 'x');

    // Block should stop at player, not pass through
    expect(block.x).toBeLessThan(player.x);
  });

  it('pusher pushes pushable player (isSolid=false) and is not impeded', () => {
    // Block (pushesObjects) hits player (pushable, isSolid=false). Block moves full delta, player gets imparted.
    const block = createSprite({
      x: 0, y: 0, width: 16, height: 16,
      data: { collidesWithWalls: true, pushesObjects: true, isSolid: true, pushable: true, vx: 100 },
    });
    const player = createSprite({
      x: 20, y: 0, width: 16, height: 16,
      data: { collidesWithWalls: true, pushesObjects: true, isSolid: false, pushable: true },
    });

    setSceneSprites(scene, [
      ['block', block],
      ['player', player],
    ]);

    (scene as any).resolveAxisMovement(block, 15, 'x');

    // Block should move full 15 (not impeded by player)
    expect(block.x).toBe(15);
    // Player gets imparted velocity
    expect(player.getData('vx')).toBe(100);
  });

  it('pushable=false mover passes through pushesObjects isSolid=false sprite', () => {
    // Player (pushable=false) passes through non-solid pusher (e.g. enemy)
    const player = createSprite({
      x: 0, y: 0, width: 16, height: 16,
      data: { collidesWithWalls: true, pushesObjects: true, isSolid: false, pushable: false, vx: 100 },
    });
    const enemy = createSprite({
      x: 20, y: 0, width: 16, height: 16,
      data: { collidesWithWalls: true, pushesObjects: true, isSolid: false, pushable: false },
    });

    setSceneSprites(scene, [
      ['player', player],
      ['enemy', enemy],
    ]);

    (scene as any).resolveAxisMovement(player, 15, 'x');

    // Player should pass through enemy (overlap)
    expect(player.x).toBe(15);
  });

  it('does not reduce B velocity when slower C bumps into faster B', () => {
    // C (vx=50) bumps into B (vx=100). B should keep 100, not be dampened to 50.
    const spriteC = createSprite({
      x: 0, y: 0, width: 16, height: 16,
      data: { collidesWithWalls: true, pushesObjects: true, isSolid: true, pushable: true, vx: 50 },
    });
    const spriteB = createSprite({
      x: 18, y: 0, width: 16, height: 16,
      data: { collidesWithWalls: true, pushesObjects: true, isSolid: true, pushable: true, drag: 1, vx: 100 },
    });

    setSceneSprites(scene, [
      ['C', spriteC],
      ['B', spriteB],
    ]);

    (scene as any).resolveAxisMovement(spriteC, 10, 'x');

    // C pushes B (same direction). B had 100, C would impart 50. Don't reduce.
    expect(spriteB.getData('vx')).toBe(100);
  });
});
