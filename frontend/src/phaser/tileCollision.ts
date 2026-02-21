export type SweepAxis = 'x' | 'y';

export interface AABB {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export interface TileCollisionGrid {
  data: number[][];
  collidableTileIndices: ReadonlySet<number>;
  tileSize: number;
  originX: number;
  originY: number;
}

export interface ClosestTileCollisionGapInput {
  aabb: AABB;
  axis: SweepAxis;
  delta: number;
  grid: TileCollisionGrid;
}

const TILE_OVERLAP_EPSILON = 0.01;
const EDGE_EPSILON = 1e-6;

const isCollidableTile = (grid: TileCollisionGrid, row: number, col: number): boolean => {
  if (row < 0 || col < 0) return false;
  if (row >= grid.data.length) return false;
  if (col >= (grid.data[row]?.length ?? 0)) return false;
  const tileIndex = grid.data[row][col] ?? 0;
  return grid.collidableTileIndices.has(tileIndex);
};

export const getClosestTileCollisionGap = ({
  aabb,
  axis,
  delta,
  grid,
}: ClosestTileCollisionGapInput): number | null => {
  if (delta === 0 || grid.collidableTileIndices.size === 0 || grid.data.length === 0) {
    return null;
  }

  const { left, right, top, bottom } = aabb;
  let found = false;
  let closestGap = Math.abs(delta);

  if (axis === 'x') {
    const rowStart = Math.floor((top - grid.originY + EDGE_EPSILON) / grid.tileSize);
    const rowEnd = Math.floor((bottom - grid.originY - EDGE_EPSILON) / grid.tileSize);
    if (rowStart > rowEnd) return null;

    if (delta > 0) {
      const colStart = Math.floor((right - grid.originX + EDGE_EPSILON) / grid.tileSize);
      const colEnd = Math.floor((right + delta - grid.originX - EDGE_EPSILON) / grid.tileSize);

      for (let col = colStart; col <= colEnd; col++) {
        for (let row = rowStart; row <= rowEnd; row++) {
          if (!isCollidableTile(grid, row, col)) continue;
          const tileLeft = grid.originX + col * grid.tileSize;
          let gap = tileLeft - right;
          if (gap < -TILE_OVERLAP_EPSILON) continue;
          if (gap < 0) gap = 0;
          found = true;
          closestGap = Math.min(closestGap, gap);
        }
      }
    } else {
      const colStart = Math.floor((left + delta - grid.originX + EDGE_EPSILON) / grid.tileSize);
      const colEnd = Math.floor((left - grid.originX - EDGE_EPSILON) / grid.tileSize);

      for (let col = colEnd; col >= colStart; col--) {
        for (let row = rowStart; row <= rowEnd; row++) {
          if (!isCollidableTile(grid, row, col)) continue;
          const tileRight = grid.originX + (col + 1) * grid.tileSize;
          let gap = left - tileRight;
          if (gap < -TILE_OVERLAP_EPSILON) continue;
          if (gap < 0) gap = 0;
          found = true;
          closestGap = Math.min(closestGap, gap);
        }
      }
    }

    return found ? closestGap : null;
  }

  const colStart = Math.floor((left - grid.originX + EDGE_EPSILON) / grid.tileSize);
  const colEnd = Math.floor((right - grid.originX - EDGE_EPSILON) / grid.tileSize);
  if (colStart > colEnd) return null;

  if (delta > 0) {
    const rowStart = Math.floor((bottom - grid.originY + EDGE_EPSILON) / grid.tileSize);
    const rowEnd = Math.floor((bottom + delta - grid.originY - EDGE_EPSILON) / grid.tileSize);

    for (let row = rowStart; row <= rowEnd; row++) {
      for (let col = colStart; col <= colEnd; col++) {
        if (!isCollidableTile(grid, row, col)) continue;
        const tileTop = grid.originY + row * grid.tileSize;
        let gap = tileTop - bottom;
        if (gap < -TILE_OVERLAP_EPSILON) continue;
        if (gap < 0) gap = 0;
        found = true;
        closestGap = Math.min(closestGap, gap);
      }
    }
  } else {
    const rowStart = Math.floor((top + delta - grid.originY + EDGE_EPSILON) / grid.tileSize);
    const rowEnd = Math.floor((top - grid.originY - EDGE_EPSILON) / grid.tileSize);

    for (let row = rowEnd; row >= rowStart; row--) {
      for (let col = colStart; col <= colEnd; col++) {
        if (!isCollidableTile(grid, row, col)) continue;
        const tileBottom = grid.originY + (row + 1) * grid.tileSize;
        let gap = top - tileBottom;
        if (gap < -TILE_OVERLAP_EPSILON) continue;
        if (gap < 0) gap = 0;
        found = true;
        closestGap = Math.min(closestGap, gap);
      }
    }
  }

  return found ? closestGap : null;
};
