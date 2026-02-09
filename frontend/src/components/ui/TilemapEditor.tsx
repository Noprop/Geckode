'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { EraserIcon } from '@radix-ui/react-icons';
import { PencilIcon, BucketIcon, LineIcon, CircleIcon, ColorPickerIcon } from '@/components/icons';
import { useGeckodeStore } from '@/stores/geckodeStore';
import type { TilemapTool } from '@/stores/geckodeStore';
import { useCanvasZoom } from '@/hooks/useCanvasZoom';

const TILE_PX = 16;

// ── Bresenham line (tile coords) ──
const getLineCells = (c0: number, r0: number, c1: number, r1: number) => {
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

// ── Rectangle outline (tile coords) ──
const getRectangleCells = (c1: number, r1: number, c2: number, r2: number) => {
  const minC = Math.min(c1, c2), maxC = Math.max(c1, c2);
  const minR = Math.min(r1, r2), maxR = Math.max(r1, r2);
  const cells: { row: number; col: number }[] = [];
  for (let c = minC; c <= maxC; c++) { cells.push({ row: minR, col: c }); cells.push({ row: maxR, col: c }); }
  for (let r = minR + 1; r < maxR; r++) { cells.push({ row: r, col: minC }); cells.push({ row: r, col: maxC }); }
  return cells;
};

// ── Oval outline (tile coords) ──
const getOvalCells = (c1: number, r1: number, c2: number, r2: number, w: number, h: number) => {
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

// ── Tool button ──
const ToolButton = ({
  tool,
  activeTool,
  onClick,
  title,
  children,
}: {
  tool: TilemapTool;
  activeTool: TilemapTool;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-12 h-12 flex items-center justify-center rounded cursor-pointer transition ${
      activeTool === tool
        ? 'bg-primary-green text-white'
        : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
    }`}
    title={title}
  >
    {children}
  </button>
);

const TilemapEditor = () => {
  const [activeTool, setActiveTool] = useState<TilemapTool>('place');
  const [selectedTileKey, setSelectedTileKey] = useState<string | null>(null);
  const [brushSize, setBrushSize] = useState(1);

  const tileTextures = useGeckodeStore((s) => s.tileTextures);
  const tilemaps = useGeckodeStore((s) => s.tilemaps);
  const activeTilemapId = useGeckodeStore((s) => s.activeTilemapId);
  const updateTilemapCell = useGeckodeStore((s) => s.updateTilemapCell);
  const setTilemapData = useGeckodeStore((s) => s.setTilemapData);
  const resizeTilemap = useGeckodeStore((s) => s.resizeTilemap);
  const clearTilemap = useGeckodeStore((s) => s.clearTilemap);

  const tilemap = activeTilemapId ? tilemaps[activeTilemapId] : null;

  // Auto-select first tile texture
  useEffect(() => {
    if (!selectedTileKey) {
      const keys = Object.keys(tileTextures);
      if (keys.length > 0) setSelectedTileKey(keys[0]);
    }
  }, [tileTextures, selectedTileKey]);

  const gridWidth = tilemap?.width ?? 16;
  const gridHeight = tilemap?.height ?? 16;
  const { cellSize, zoomPercent, setZoom, isEditingZoom, setIsEditingZoom, canvasContainerRef, MIN_ZOOM_PERCENT, MAX_ZOOM_PERCENT } =
    useCanvasZoom(gridWidth, gridHeight);

  // Pre-load tile images
  const tileImagesRef = useRef<Record<string, HTMLImageElement>>({});
  useEffect(() => {
    const images: Record<string, HTMLImageElement> = {};
    for (const [key, base64] of Object.entries(tileTextures)) {
      const img = new Image();
      img.src = base64;
      images[key] = img;
    }
    tileImagesRef.current = images;
  }, [tileTextures]);

  // ── Drawing state ref (avoids stale closures in window handlers) ──
  const drawStateRef = useRef({
    isDrawing: false,
    shapeStart: null as { row: number; col: number } | null,
    prevCell: null as { row: number; col: number } | null,
    activeTool: 'place' as TilemapTool,
    selectedTileKey: null as string | null,
    brushSize: 1,
  });
  useEffect(() => {
    const ds = drawStateRef.current;
    ds.activeTool = activeTool;
    ds.selectedTileKey = selectedTileKey;
    ds.brushSize = brushSize;
  }, [activeTool, selectedTileKey, brushSize]);

  // ── Preview cells for shape tools ──
  const previewCellsRef = useRef<{ row: number; col: number }[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ── Canvas rendering ──
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !tilemap) return;

    const w = tilemap.width;
    const h = tilemap.height;
    const cs = cellSize;

    canvas.width = w * cs;
    canvas.height = h * cs;

    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = false;

    // Draw committed cells
    for (let row = 0; row < h; row++) {
      for (let col = 0; col < w; col++) {
        const tileKey = tilemap.data[row][col];
        const x = col * cs;
        const y = row * cs;
        if (tileKey && tileImagesRef.current[tileKey]) {
          ctx.drawImage(tileImagesRef.current[tileKey], x, y, cs, cs);
        } else {
          const isLight = (row + col) % 2 === 0;
          ctx.fillStyle = isLight ? '#e2e8f0' : '#cbd5e1';
          ctx.fillRect(x, y, cs, cs);
        }
      }
    }

    // Draw shape preview overlay
    const ds = drawStateRef.current;
    const previewKey = ds.activeTool === 'eraser' ? null : ds.selectedTileKey;
    if (previewCellsRef.current.length > 0) {
      for (const { row, col } of previewCellsRef.current) {
        if (row < 0 || row >= h || col < 0 || col >= w) continue;
        const x = col * cs;
        const y = row * cs;
        if (ds.activeTool === 'eraser') {
          // Show empty checkerboard with red tint for eraser preview
          ctx.fillStyle = 'rgba(239, 68, 68, 0.35)';
          ctx.fillRect(x, y, cs, cs);
        } else if (previewKey && tileImagesRef.current[previewKey]) {
          ctx.globalAlpha = 0.5;
          ctx.drawImage(tileImagesRef.current[previewKey], x, y, cs, cs);
          ctx.globalAlpha = 1.0;
        } else {
          ctx.fillStyle = 'rgba(16, 185, 129, 0.3)';
          ctx.fillRect(x, y, cs, cs);
        }
      }
    }

    // Draw grid lines
    ctx.strokeStyle = 'rgba(100, 116, 139, 0.4)';
    ctx.lineWidth = 1;
    for (let col = 0; col <= w; col++) {
      const x = col * cs;
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h * cs); ctx.stroke();
    }
    for (let row = 0; row <= h; row++) {
      const y = row * cs;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w * cs, y); ctx.stroke();
    }
  }, [tilemap, cellSize]);

  useEffect(() => { renderCanvas(); }, [renderCanvas]);

  // ── Cell from pointer event ──
  const getCellFromEvent = useCallback((e: { clientX: number; clientY: number }) => {
    const canvas = canvasRef.current;
    if (!canvas || !tilemap) return null;
    const rect = canvas.getBoundingClientRect();
    const col = Math.floor((e.clientX - rect.left) / (rect.width / tilemap.width));
    const row = Math.floor((e.clientY - rect.top) / (rect.height / tilemap.height));
    if (col < 0 || col >= tilemap.width || row < 0 || row >= tilemap.height) return null;
    return { row, col };
  }, [tilemap]);

  // ── Expand a cell by brush size ──
  const expandBrush = useCallback((row: number, col: number, size: number) => {
    if (size <= 1) return [{ row, col }];
    const cells: { row: number; col: number }[] = [];
    const offset = Math.floor(size / 2);
    for (let dr = 0; dr < size; dr++) {
      for (let dc = 0; dc < size; dc++) {
        const r = row + dr - offset;
        const c = col + dc - offset;
        if (r >= 0 && r < gridHeight && c >= 0 && c < gridWidth) {
          cells.push({ row: r, col: c });
        }
      }
    }
    return cells;
  }, [gridWidth, gridHeight]);

  // ── Apply single cell placement (for pen / eraser drag) ──
  const applySingleCell = useCallback((row: number, col: number) => {
    if (!activeTilemapId || !tilemap) return;
    const ds = drawStateRef.current;
    const tileKey = ds.activeTool === 'eraser' ? null : ds.selectedTileKey;
    const cells = expandBrush(row, col, ds.brushSize);
    for (const c of cells) {
      if (tilemap.data[c.row][c.col] !== tileKey) {
        updateTilemapCell(activeTilemapId, c.row, c.col, tileKey);
      }
    }
  }, [activeTilemapId, tilemap, updateTilemapCell, expandBrush]);

  // ── Flood fill on tile grid ──
  const floodFill = useCallback((startRow: number, startCol: number, fillKey: string | null) => {
    if (!activeTilemapId || !tilemap) return;
    const w = tilemap.width;
    const h = tilemap.height;
    const target = tilemap.data[startRow][startCol];
    if (target === fillKey) return;

    const newData = tilemap.data.map(r => [...r]);
    const queue: [number, number][] = [[startRow, startCol]];
    const visited = new Set<number>();

    while (queue.length > 0) {
      const [r, c] = queue.shift()!;
      const idx = r * w + c;
      if (visited.has(idx)) continue;
      if (r < 0 || r >= h || c < 0 || c >= w) continue;
      if (newData[r][c] !== target) continue;

      visited.add(idx);
      newData[r][c] = fillKey;
      queue.push([r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]);
    }

    setTilemapData(activeTilemapId, newData);
  }, [activeTilemapId, tilemap, setTilemapData]);

  // ── Commit shape preview cells to store ──
  const commitPreview = useCallback(() => {
    if (!activeTilemapId || !tilemap || previewCellsRef.current.length === 0) return;
    const ds = drawStateRef.current;
    const tileKey = ds.activeTool === 'eraser' ? null : ds.selectedTileKey;
    const newData = tilemap.data.map(r => [...r]);
    for (const { row, col } of previewCellsRef.current) {
      if (row >= 0 && row < tilemap.height && col >= 0 && col < tilemap.width) {
        newData[row][col] = tileKey;
      }
    }
    setTilemapData(activeTilemapId, newData);
    previewCellsRef.current = [];
  }, [activeTilemapId, tilemap, setTilemapData]);

  // ── Compute shape cells with brush expansion ──
  const computeShapeCells = useCallback((start: { row: number; col: number }, end: { row: number; col: number }) => {
    const ds = drawStateRef.current;
    let baseCells: { row: number; col: number }[] = [];
    if (ds.activeTool === 'line') {
      baseCells = getLineCells(start.col, start.row, end.col, end.row);
    } else if (ds.activeTool === 'rectangle') {
      baseCells = getRectangleCells(start.col, start.row, end.col, end.row);
    } else if (ds.activeTool === 'oval') {
      baseCells = getOvalCells(start.col, start.row, end.col, end.row, gridWidth, gridHeight);
    }

    if (ds.brushSize <= 1) return baseCells;

    // Expand each cell by brush size, deduplicate
    const seen = new Set<string>();
    const expanded: { row: number; col: number }[] = [];
    for (const cell of baseCells) {
      for (const ec of expandBrush(cell.row, cell.col, ds.brushSize)) {
        const key = `${ec.row},${ec.col}`;
        if (!seen.has(key)) { seen.add(key); expanded.push(ec); }
      }
    }
    return expanded;
  }, [gridWidth, gridHeight, expandBrush]);

  // ── Pointer handlers ──
  const handlePointerDown = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const cell = getCellFromEvent(e);
    if (!cell || !tilemap) return;
    const ds = drawStateRef.current;

    if (ds.activeTool === 'place' || ds.activeTool === 'eraser') {
      ds.isDrawing = true;
      ds.prevCell = cell;
      applySingleCell(cell.row, cell.col);
    } else if (['line', 'rectangle', 'oval'].includes(ds.activeTool)) {
      ds.isDrawing = true;
      ds.shapeStart = cell;
      previewCellsRef.current = expandBrush(cell.row, cell.col, ds.brushSize);
      renderCanvas();
    } else if (ds.activeTool === 'bucket') {
      const fillKey = ds.selectedTileKey;
      floodFill(cell.row, cell.col, fillKey);
    } else if (ds.activeTool === 'tile-picker') {
      const tileKey = tilemap.data[cell.row][cell.col];
      if (tileKey) {
        setSelectedTileKey(tileKey);
        setActiveTool('place');
      }
    }
  };

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      const ds = drawStateRef.current;
      if (!ds.isDrawing) return;
      const cell = getCellFromEvent(e);
      if (!cell) return;

      if (ds.activeTool === 'place' || ds.activeTool === 'eraser') {
        const prev = ds.prevCell;
        if (prev && prev.row === cell.row && prev.col === cell.col) return;
        ds.prevCell = cell;

        // Interpolate line between prev and current for fast drags
        if (prev && (Math.abs(cell.row - prev.row) > 1 || Math.abs(cell.col - prev.col) > 1)) {
          const lineCells = getLineCells(prev.col, prev.row, cell.col, cell.row);
          for (const lc of lineCells) applySingleCell(lc.row, lc.col);
        } else {
          applySingleCell(cell.row, cell.col);
        }
      } else if (['line', 'rectangle', 'oval'].includes(ds.activeTool) && ds.shapeStart) {
        previewCellsRef.current = computeShapeCells(ds.shapeStart, cell);
        renderCanvas();
      }
    };

    const handleUp = () => {
      const ds = drawStateRef.current;
      if (!ds.isDrawing) return;

      if (['line', 'rectangle', 'oval'].includes(ds.activeTool) && ds.shapeStart) {
        commitPreview();
      }

      ds.isDrawing = false;
      ds.shapeStart = null;
      ds.prevCell = null;
      previewCellsRef.current = [];
      renderCanvas();
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };
  });

  // ── Grid resize ──
  const handleGridResize = (dimension: 'width' | 'height', value: string) => {
    if (!activeTilemapId || !tilemap) return;
    if (value === '') return;
    const parsed = Math.max(1, Math.min(128, parseInt(value, 10)));
    if (Number.isNaN(parsed)) return;
    const newW = dimension === 'width' ? parsed : tilemap.width;
    const newH = dimension === 'height' ? parsed : tilemap.height;
    resizeTilemap(activeTilemapId, newW, newH);
  };

  if (!tilemap || !activeTilemapId) {
    return (
      <div className="flex-1 min-h-0 flex items-center justify-center text-slate-400">
        No tilemap selected
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-0 flex border-t border-slate-200 bg-slate-800 dark:border-slate-700">
      {/* Left sidebar — brush size, tools, tile palette, grid size */}
      <div className="w-30 flex flex-col gap-3 p-2 bg-slate-700 dark:bg-slate-800 border-r border-slate-600">
        {/* Brush size */}
        <div className="grid grid-cols-3 rounded overflow-hidden">
          {[1, 2, 3].map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setBrushSize(size)}
              className={`h-9 flex items-center justify-center cursor-pointer transition ${
                brushSize === size ? 'bg-primary-green' : 'bg-slate-600 hover:bg-slate-500'
              }`}
              title={`${size}x${size} brush`}
            >
              <div className="bg-white" style={{ width: size * 3 + 2, height: size * 3 + 2 }} />
            </button>
          ))}
        </div>

        {/* Tools grid — matches EditorTools layout */}
        <div className="grid grid-cols-2 gap-2 w-fit mx-auto">
          <ToolButton tool="place" activeTool={activeTool} onClick={() => setActiveTool('place')} title="Place tile (pen)">
            <PencilIcon className="w-5 h-5" />
          </ToolButton>
          <ToolButton tool="eraser" activeTool={activeTool} onClick={() => setActiveTool('eraser')} title="Eraser">
            <EraserIcon className="w-5 h-5" />
          </ToolButton>
          <ToolButton tool="bucket" activeTool={activeTool} onClick={() => setActiveTool('bucket')} title="Bucket fill">
            <BucketIcon className="w-5 h-5" />
          </ToolButton>
          <ToolButton tool="line" activeTool={activeTool} onClick={() => setActiveTool('line')} title="Line tool">
            <LineIcon className="w-5 h-5" />
          </ToolButton>
          <ToolButton tool="rectangle" activeTool={activeTool} onClick={() => setActiveTool('rectangle')} title="Rectangle tool">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="1" />
            </svg>
          </ToolButton>
          <ToolButton tool="oval" activeTool={activeTool} onClick={() => setActiveTool('oval')} title="Oval tool">
            <CircleIcon className="w-5 h-5" />
          </ToolButton>
          <ToolButton tool="tile-picker" activeTool={activeTool} onClick={() => setActiveTool('tile-picker')} title="Tile picker">
            <ColorPickerIcon className="w-5 h-5" />
          </ToolButton>
        </div>

        {/* Tile palette */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-slate-400 uppercase tracking-wide font-semibold px-0.5">Tiles</span>
          <div className="grid grid-cols-2 gap-1.5">
            {Object.entries(tileTextures).map(([key, base64]) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setSelectedTileKey(key);
                  if (activeTool === 'tile-picker') setActiveTool('place');
                }}
                className={`aspect-square rounded cursor-pointer transition border-2 overflow-hidden ${
                  selectedTileKey === key
                    ? 'border-primary-green ring-1 ring-primary-green/50'
                    : 'border-slate-500 hover:border-slate-400'
                }`}
                title={key}
              >
                <img
                  src={base64}
                  alt={key}
                  className="w-full h-full object-cover"
                  style={{ imageRendering: 'pixelated' }}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1" />

        {/* Grid size */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-slate-400 uppercase tracking-wide font-semibold px-0.5">
            Grid ({tilemap.width * TILE_PX}x{tilemap.height * TILE_PX}px)
          </span>
          <div className="flex items-center gap-1">
            <input
              key={`w-${tilemap.width}`}
              type="number"
              defaultValue={tilemap.width}
              onBlur={(e) => handleGridResize('width', e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
              min={1}
              max={128}
              className="w-12 h-8 px-1 text-xs text-slate-300 text-center bg-slate-600 border border-slate-500 rounded outline-none focus:border-primary-green [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              title="Grid width (tiles)"
            />
            <span className="text-slate-400 text-xs">x</span>
            <input
              key={`h-${tilemap.height}`}
              type="number"
              defaultValue={tilemap.height}
              onBlur={(e) => handleGridResize('height', e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
              min={1}
              max={128}
              className="w-12 h-8 px-1 text-xs text-slate-300 text-center bg-slate-600 border border-slate-500 rounded outline-none focus:border-primary-green [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              title="Grid height (tiles)"
            />
          </div>
        </div>
      </div>

      {/* Main canvas area */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <div
          ref={canvasContainerRef}
          className="relative flex-1 flex items-center justify-center bg-slate-600 p-4 overflow-auto min-h-0"
        >
          <button
            type="button"
            onClick={() => clearTilemap(activeTilemapId)}
            className="absolute top-2 right-2 z-10 px-3 h-7 flex items-center justify-center rounded bg-red-600/80 hover:bg-red-600 text-white text-xs font-medium cursor-pointer transition"
            title="Clear tilemap"
          >
            Clear
          </button>
          <div className="relative">
            <canvas
              ref={canvasRef}
              className="cursor-crosshair select-none touch-none"
              style={{
                width: tilemap.width * cellSize,
                height: tilemap.height * cellSize,
                imageRendering: 'pixelated',
              }}
              onPointerDown={handlePointerDown}
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        </div>

        {/* Zoom controls */}
        <div className="h-10 flex items-center justify-center gap-2 bg-slate-700 border-t border-slate-600 shrink-0">
          <button
            type="button"
            onClick={() => setZoom(zoomPercent - 25)}
            disabled={zoomPercent <= MIN_ZOOM_PERCENT}
            className="w-8 h-8 flex items-center justify-center rounded bg-slate-600 hover:bg-slate-500 disabled:opacity-40 disabled:cursor-not-allowed text-white cursor-pointer transition"
            title="Zoom out"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35M8 11h6" />
            </svg>
          </button>
          {isEditingZoom ? (
            <input
              type="number"
              defaultValue={Math.round(zoomPercent)}
              onBlur={(e) => {
                setZoom(parseInt(e.target.value, 10));
                setIsEditingZoom(false);
              }}
              onKeyDown={(e) =>
                e.key === 'Enter' ? e.currentTarget.blur() : e.key === 'Escape' && setIsEditingZoom(false)
              }
              className="w-14 h-6 px-1 text-xs text-slate-300 text-center bg-slate-600 border border-slate-500 rounded outline-none focus:border-primary-green [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              autoFocus
              onFocus={(e) => e.target.select()}
            />
          ) : (
            <button
              type="button"
              onClick={() => setIsEditingZoom(true)}
              className="w-14 h-6 text-xs text-slate-300 text-center hover:bg-slate-600 rounded cursor-pointer transition"
              title="Click to edit zoom (100% = fit to container)"
            >
              {Math.round(zoomPercent)}%
            </button>
          )}
          <button
            type="button"
            onClick={() => setZoom(zoomPercent + 25)}
            disabled={zoomPercent >= MAX_ZOOM_PERCENT}
            className="w-8 h-8 flex items-center justify-center rounded bg-slate-600 hover:bg-slate-500 disabled:opacity-40 disabled:cursor-not-allowed text-white cursor-pointer transition"
            title="Zoom in"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
            </svg>
          </button>
        </div>

        {/* Bottom bar */}
        <div className="h-12 flex items-center gap-3 px-4 bg-slate-700 dark:bg-slate-800 border-t border-slate-600 shrink-0">
          <span className="text-xs text-slate-400 font-medium">{tilemap.name}</span>
          <span className="text-xs text-slate-500">
            {tilemap.width}x{tilemap.height} tiles ({tilemap.width * TILE_PX}x{tilemap.height * TILE_PX}px)
          </span>
        </div>
      </div>
    </div>
  );
};

export default TilemapEditor;
