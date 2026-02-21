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
        data: [
          [0, 0, 9],
        ],
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
        data: [
          [0, 0, 0, 5],
        ],
        collidableTileIndices: new Set([5]),
        tileSize: 16,
        originX: 0,
        originY: 0,
      },
    });

    expect(gap).toBe(32);
  });
});
