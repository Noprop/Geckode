import { describe, expect, it } from 'vitest';
import { getClosestTileCollisionGap } from '@/phaser/tileCollision';

describe('getClosestTileCollisionGap', () => {
  it('returns the nearest positive-X gap to a collidable tile', () => {
    const gap = getClosestTileCollisionGap({
      axis: 'x',
      delta: 20,
      aabb: {
        left: 8,
        right: 24,
        top: 16,
        bottom: 31,
      },
      grid: {
        data: [
          [0, 0, 0],
          [0, 0, 7],
        ],
        collidableTileIndices: new Set([7]),
        tileSize: 16,
        originX: 0,
        originY: 0,
      },
    });

    expect(gap).toBe(8);
  });

  it('handles upward movement with a negative map origin Y', () => {
    const gap = getClosestTileCollisionGap({
      axis: 'y',
      delta: -20,
      aabb: {
        left: 2,
        right: 14,
        top: -20,
        bottom: -4,
      },
      grid: {
        data: [
          [0],
          [4],
        ],
        collidableTileIndices: new Set([4]),
        tileSize: 16,
        originX: 0,
        originY: -64,
      },
    });

    expect(gap).toBe(12);
  });

  it('ignores non-collidable tiles', () => {
    const gap = getClosestTileCollisionGap({
      axis: 'x',
      delta: 40,
      aabb: {
        left: 0,
        right: 16,
        top: 0,
        bottom: 16,
      },
      grid: {
        data: [[0, 0, 9]],
        collidableTileIndices: new Set([3]),
        tileSize: 16,
        originX: 0,
        originY: 0,
      },
    });

    expect(gap).toBeNull();
  });

  it('prevents tunneling by returning the first collidable tile hit on large sweeps', () => {
    const gap = getClosestTileCollisionGap({
      axis: 'x',
      delta: 80,
      aabb: {
        left: 0,
        right: 16,
        top: 0,
        bottom: 16,
      },
      grid: {
        data: [[0, 0, 0, 5]],
        collidableTileIndices: new Set([5]),
        tileSize: 16,
        originX: 0,
        originY: 0,
      },
    });

    expect(gap).toBe(32);
  });

  it('returns null when delta is zero', () => {
    const gap = getClosestTileCollisionGap({
      axis: 'x',
      delta: 0,
      aabb: {
        left: 0,
        right: 16,
        top: 0,
        bottom: 16,
      },
      grid: {
        data: [[5]],
        collidableTileIndices: new Set([5]),
        tileSize: 16,
        originX: 0,
        originY: 0,
      },
    });

    expect(gap).toBeNull();
  });

  it('returns null for empty grid or empty collidable set', () => {
    const aabb = {
      left: 0,
      right: 16,
      top: 0,
      bottom: 16,
    };

    const emptyGridGap = getClosestTileCollisionGap({
      axis: 'x',
      delta: 10,
      aabb,
      grid: {
        data: [],
        collidableTileIndices: new Set([1]),
        tileSize: 16,
        originX: 0,
        originY: 0,
      },
    });

    const emptyCollidableSetGap = getClosestTileCollisionGap({
      axis: 'x',
      delta: 10,
      aabb,
      grid: {
        data: [[1]],
        collidableTileIndices: new Set(),
        tileSize: 16,
        originX: 0,
        originY: 0,
      },
    });

    expect(emptyGridGap).toBeNull();
    expect(emptyCollidableSetGap).toBeNull();
  });

  it('finds the nearest gap for negative X sweeps', () => {
    const gap = getClosestTileCollisionGap({
      axis: 'x',
      delta: -30,
      aabb: {
        left: 32,
        right: 48,
        top: 0,
        bottom: 16,
      },
      grid: {
        data: [[5, 0, 0]],
        collidableTileIndices: new Set([5]),
        tileSize: 16,
        originX: 0,
        originY: 0,
      },
    });

    expect(gap).toBe(16);
  });

  it('finds the nearest gap for positive Y sweeps', () => {
    const gap = getClosestTileCollisionGap({
      axis: 'y',
      delta: 40,
      aabb: {
        left: 0,
        right: 16,
        top: 0,
        bottom: 16,
      },
      grid: {
        data: [
          [0],
          [0],
          [9],
        ],
        collidableTileIndices: new Set([9]),
        tileSize: 16,
        originX: 0,
        originY: 0,
      },
    });

    expect(gap).toBe(16);
  });

  it('chooses the nearest collider when multiple tiles are in sweep range', () => {
    const gap = getClosestTileCollisionGap({
      axis: 'x',
      delta: 60,
      aabb: {
        left: 0,
        right: 16,
        top: 0,
        bottom: 16,
      },
      grid: {
        data: [[0, 0, 6, 6]],
        collidableTileIndices: new Set([6]),
        tileSize: 16,
        originX: 0,
        originY: 0,
      },
    });

    expect(gap).toBe(16);
  });

  it('treats tiny overlap within epsilon as contact (gap 0)', () => {
    const gap = getClosestTileCollisionGap({
      axis: 'x',
      delta: 8,
      aabb: {
        left: 0,
        right: 16.005,
        top: 0,
        bottom: 16,
      },
      grid: {
        data: [[0, 7]],
        collidableTileIndices: new Set([7]),
        tileSize: 16,
        originX: 0,
        originY: 0,
      },
    });

    expect(gap).toBe(0);
  });

  it('handles ragged rows and out-of-bounds columns safely', () => {
    const gap = getClosestTileCollisionGap({
      axis: 'x',
      delta: 30,
      aabb: {
        left: 0,
        right: 15,
        top: 16,
        bottom: 31,
      },
      grid: {
        data: [
          [0],
          [0, 7],
        ],
        collidableTileIndices: new Set([7]),
        tileSize: 16,
        originX: 0,
        originY: 0,
      },
    });

    expect(gap).toBe(1);
  });

  it('returns null for invalid tileSize values', () => {
    const gap = getClosestTileCollisionGap({
      axis: 'x',
      delta: 10,
      aabb: {
        left: 0,
        right: 16,
        top: 0,
        bottom: 16,
      },
      grid: {
        data: [[7]],
        collidableTileIndices: new Set([7]),
        tileSize: 0,
        originX: 0,
        originY: 0,
      },
    });

    expect(gap).toBeNull();
  });
});
