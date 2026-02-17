/** Bresenham line in tile coordinates. */
export const getLineCells = (c0: number, r0: number, c1: number, r1: number) => {
  const cells: { row: number; col: number }[] = [];
  const dx = Math.abs(c1 - c0);
  const dy = Math.abs(r1 - r0);
  const sx = c0 < c1 ? 1 : -1;
  const sy = r0 < r1 ? 1 : -1;
  let err = dx - dy;
  let col = c0;
  let row = r0;
  while (true) {
    cells.push({ row, col });
    if (col === c1 && row === r1) break;
    const e2 = 2 * err;
    if (e2 > -dy) { err -= dy; col += sx; }
    if (e2 < dx) { err += dx; row += sy; }
  }
  return cells;
};

/** Rectangle outline in tile coordinates. */
export const getRectangleCells = (c1: number, r1: number, c2: number, r2: number) => {
  const minC = Math.min(c1, c2), maxC = Math.max(c1, c2);
  const minR = Math.min(r1, r2), maxR = Math.max(r1, r2);
  const cells: { row: number; col: number }[] = [];
  for (let c = minC; c <= maxC; c++) { cells.push({ row: minR, col: c }); cells.push({ row: maxR, col: c }); }
  for (let r = minR + 1; r < maxR; r++) { cells.push({ row: r, col: minC }); cells.push({ row: r, col: maxC }); }
  return cells;
};

/** Oval outline in tile coordinates. */
export const getOvalCells = (c1: number, r1: number, c2: number, r2: number, w: number, h: number) => {
  const cx = (c1 + c2) / 2, cy = (r1 + r2) / 2;
  const rx = Math.abs(c2 - c1) / 2, ry = Math.abs(r2 - r1) / 2;
  if (rx === 0 || ry === 0) return [];
  const cells: { row: number; col: number }[] = [];
  const seen = new Set<string>();
  const steps = Math.max(Math.ceil(2 * Math.PI * Math.max(rx, ry)), 32);
  for (let i = 0; i < steps; i++) {
    const angle = (2 * Math.PI * i) / steps;
    const col = Math.round(cx + rx * Math.cos(angle));
    const row = Math.round(cy + ry * Math.sin(angle));
    if (col >= 0 && col < w && row >= 0 && row < h) {
      const key = `${row},${col}`;
      if (!seen.has(key)) { seen.add(key); cells.push({ row, col }); }
    }
  }
  return cells;
};
