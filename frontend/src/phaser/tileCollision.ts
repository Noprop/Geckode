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

type IndexRange = {
  start: number;
  end: number;
  step: 1 | -1;
};

function isCollidableTile(grid: TileCollisionGrid, row: number, col: number): boolean {
  if (row < 0 || col < 0) return false;
  if (row >= grid.data.length) return false;
  if (col >= (grid.data[row]?.length ?? 0)) return false;
  const tileIndex = grid.data[row][col] ?? 0;
  return grid.collidableTileIndices.has(tileIndex);
}

function isValidGrid(grid: TileCollisionGrid): boolean {
  return (
    grid.data.length > 0 &&
    grid.collidableTileIndices.size > 0 &&
    Number.isFinite(grid.tileSize) &&
    grid.tileSize > 0
  );
}

function floorTileIndex(value: number, origin: number, tileSize: number, epsilon: number): number {
  return Math.floor((value - origin + epsilon) / tileSize);
}

function createInclusiveRange(start: number, end: number, step: 1 | -1): IndexRange | null {
  if (step === 1 && start > end) return null;
  if (step === -1 && start < end) return null;
  return { start, end, step };
}

function forEachInRange(range: IndexRange, callback: (value: number) => void): void {
  if (range.step === 1) {
    for (let value = range.start; value <= range.end; value++) {
      callback(value);
    }
    return;
  }

  for (let value = range.start; value >= range.end; value--) {
    callback(value);
  }
}

function normalizeGap(rawGap: number): number | null {
  if (rawGap < -TILE_OVERLAP_EPSILON) return null;
  return rawGap < 0 ? 0 : rawGap;
}

function scanClosestGap(
  grid: TileCollisionGrid,
  outerRange: IndexRange,
  innerRange: IndexRange,
  initialGap: number,
  getCandidate: (outer: number, inner: number) => { row: number; col: number; rawGap: number },
): number | null {
  let found = false;
  let closestGap = initialGap;

  forEachInRange(outerRange, (outer) => {
    forEachInRange(innerRange, (inner) => {
      const candidate = getCandidate(outer, inner);
      if (!isCollidableTile(grid, candidate.row, candidate.col)) return;

      const gap = normalizeGap(candidate.rawGap);
      if (gap === null) return;

      found = true;
      if (gap < closestGap) {
        closestGap = gap;
      }
    });
  });

  return found ? closestGap : null;
}

export const getClosestTileCollisionGap = ({
  aabb,
  axis,
  delta,
  grid,
}: ClosestTileCollisionGapInput): number | null => {
  if (delta === 0 || !isValidGrid(grid)) {
    return null;
  }

  const tileSize = grid.tileSize;
  const { left, right, top, bottom } = aabb;
  const initialGap = Math.abs(delta);

  if (axis === 'x') {
    const rowRange = createInclusiveRange(
      floorTileIndex(top, grid.originY, tileSize, EDGE_EPSILON),
      floorTileIndex(bottom, grid.originY, tileSize, -EDGE_EPSILON),
      1,
    );
    if (!rowRange) return null;

    if (delta > 0) {
      const colRange = createInclusiveRange(
        floorTileIndex(right, grid.originX, tileSize, EDGE_EPSILON),
        floorTileIndex(right + delta, grid.originX, tileSize, -EDGE_EPSILON),
        1,
      );
      if (!colRange) return null;

      return scanClosestGap(grid, colRange, rowRange, initialGap, (col, row) => ({
        row,
        col,
        rawGap: grid.originX + col * tileSize - right,
      }));
    }

    const colRange = createInclusiveRange(
      floorTileIndex(left, grid.originX, tileSize, -EDGE_EPSILON),
      floorTileIndex(left + delta, grid.originX, tileSize, EDGE_EPSILON),
      -1,
    );
    if (!colRange) return null;

    return scanClosestGap(grid, colRange, rowRange, initialGap, (col, row) => ({
      row,
      col,
      rawGap: left - (grid.originX + (col + 1) * tileSize),
    }));
  }

  const colRange = createInclusiveRange(
    floorTileIndex(left, grid.originX, tileSize, EDGE_EPSILON),
    floorTileIndex(right, grid.originX, tileSize, -EDGE_EPSILON),
    1,
  );
  if (!colRange) return null;

  if (delta > 0) {
    const rowRange = createInclusiveRange(
      floorTileIndex(bottom, grid.originY, tileSize, EDGE_EPSILON),
      floorTileIndex(bottom + delta, grid.originY, tileSize, -EDGE_EPSILON),
      1,
    );
    if (!rowRange) return null;

    return scanClosestGap(grid, rowRange, colRange, initialGap, (row, col) => ({
      row,
      col,
      rawGap: grid.originY + row * tileSize - bottom,
    }));
  }

  const rowRange = createInclusiveRange(
    floorTileIndex(top, grid.originY, tileSize, -EDGE_EPSILON),
    floorTileIndex(top + delta, grid.originY, tileSize, EDGE_EPSILON),
    -1,
  );
  if (!rowRange) return null;

  return scanClosestGap(grid, rowRange, colRange, initialGap, (row, col) => ({
    row,
    col,
    rawGap: top - (grid.originY + (row + 1) * tileSize),
  }));
};
