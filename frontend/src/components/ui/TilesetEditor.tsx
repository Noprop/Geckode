'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { EraserIcon } from '@radix-ui/react-icons';
import { PencilIcon, BucketIcon, LineIcon, CircleIcon } from '@/components/icons';
import { useGeckodeStore } from '@/stores/geckodeStore';
import type { TilemapTool, Tileset } from '@/stores/geckodeStore';
import { useCanvasZoom } from '@/hooks/useCanvasZoom';
import { usePixelCanvas } from '@/hooks/usePixelCanvas';
import {
  useTilePixelCache,
  stampSolidColorAt,
  stampTileAtWithAlpha,
  rebuildPixelBuffer,
} from '@/hooks/useTilePixelCache';
import { getLineCells, getRectangleCells, getOvalCells } from '@/lib/tileGridGeometry';
import TileEditorModal from '@/components/TileModal/TileEditorModal';

const TILE_PX = 16;
const GRID_W = 5;
const GRID_H = 5;
const PIXEL_W = GRID_W * TILE_PX;
const PIXEL_H = GRID_H * TILE_PX;
const TILES_PER_PAGE = 9;

const createEmptyGrid = (): (string | null)[][] =>
  Array.from({ length: GRID_H }, () => Array.from({ length: GRID_W }, () => null));

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
        : 'bg-slate-200 hover:bg-slate-300 dark:bg-dark-tertiary dark:hover:bg-dark-tertiary/80 text-slate-600 dark:text-slate-300'
    }`}
    title={title}
  >
    {children}
  </button>
);

const TilesetEditor = ({ onClose }: { onClose: () => void }) => {
  const [activeTool, setActiveTool] = useState<TilemapTool>('place');
  const [selectedTileKey, setSelectedTileKey] = useState<string | null>(null);
  const [brushSize, setBrushSize] = useState(1);
  const [tilesetName, setTilesetName] = useState('myTileset');
  const [tilePage, setTilePage] = useState(0);
  const [isTileEditorOpen, setIsTileEditorOpen] = useState(false);
  const collidableCanvasRef = useRef<HTMLCanvasElement>(null);

  // Local grid data (not in store until saved)
  const gridRef = useRef<(string | null)[][]>(createEmptyGrid());
  const [_gridVersion, setGridVersion] = useState(0);
  const bumpGrid = () => setGridVersion(v => v + 1);

  // Undo/redo
  const MAX_HISTORY = 50;
  const undoStackRef = useRef<(string | null)[][][]>([]);
  const redoStackRef = useRef<(string | null)[][][]>([]);
  const [_historyVersion, setHistoryVersion] = useState(0);

  const tileTextures = useGeckodeStore((s) => s.tiles);
  const tilesets = useGeckodeStore((s) => s.tilesets);
  const tileCollidables = useGeckodeStore((s) => s.tileCollidables);
  const setTileCollidable = useGeckodeStore((s) => s.setTileCollidable);
  const addTileset = useGeckodeStore((s) => s.addTileset);
  const updateTileset = useGeckodeStore((s) => s.updateTileset);
  const editingSource = useGeckodeStore((s) => s.editingSource);
  const editingAssetName = useGeckodeStore((s) => s.editingAssetName);
  const editingAssetType = useGeckodeStore((s) => s.editingAssetType);
  const setEditingAsset = useGeckodeStore((s) => s.setEditingAsset);

  // Auto-select first tile
  useEffect(() => {
    if (!selectedTileKey) {
      const keys = Object.keys(tileTextures);
      if (keys.length > 0) setSelectedTileKey(keys[0]);
    }
  }, [tileTextures, selectedTileKey]);

  // Canvas hooks
  const { cellSize, zoomPercent, setZoom, isEditingZoom, setIsEditingZoom, canvasContainerRef, MIN_ZOOM_PERCENT, MAX_ZOOM_PERCENT } =
    useCanvasZoom(PIXEL_W, PIXEL_H);

  const { canvasRef, outputPixelsRef, previewPixelsRef, requestRender } =
    usePixelCanvas(PIXEL_W, PIXEL_H, cellSize, 8, { enableKeyboardShortcuts: false });

  const { tilePixelsRef, isReady } = useTilePixelCache(tileTextures);

  // Tile palette pagination
  const tileKeys = Object.keys(tileTextures);
  const totalPages = Math.max(1, Math.ceil(tileKeys.length / TILES_PER_PAGE));
  const pagedTileKeys = tileKeys.slice(tilePage * TILES_PER_PAGE, (tilePage + 1) * TILES_PER_PAGE);

  // ── Rebuild pixel buffer from local grid ──
  const rebuildFromGrid = useCallback(() => {
    if (!isReady) return;
    rebuildPixelBuffer(
      outputPixelsRef.current, gridRef.current, tilePixelsRef.current,
      GRID_W, GRID_H, TILE_PX,
    );
    requestRender();
  }, [isReady, outputPixelsRef, tilePixelsRef, requestRender]);

  // Sync pixel buffer whenever grid changes
  useEffect(() => {
    rebuildFromGrid();
  }, [_gridVersion, rebuildFromGrid]);

  // ── Render collidable overlay ──
  useEffect(() => {
    const canvas = collidableCanvasRef.current;
    if (!canvas) return;
    const w = PIXEL_W * cellSize;
    const h = PIXEL_H * cellSize;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, w, h);

    if (activeTool !== 'collidable') return;
    const tileSizePx = w / GRID_W;
    ctx.fillStyle = 'rgba(239, 68, 68, 0.3)';
    for (let row = 0; row < GRID_H; row++) {
      for (let col = 0; col < GRID_W; col++) {
        const key = gridRef.current[row]?.[col];
        if (key && tileCollidables[key]) {
          ctx.fillRect(col * tileSizePx, row * tileSizePx, tileSizePx, tileSizePx);
        }
      }
    }
  }, [activeTool, tileCollidables, cellSize, _gridVersion]);

  // ── Load existing tileset when editing ──
  useEffect(() => {
    if (!editingSource || !editingAssetName || editingAssetType !== 'tilesets') return;
    const tileset = tilesets[editingAssetName];
    if (!tileset) return;
    gridRef.current = tileset.data.map(r => [...r]);
    setTilesetName(tileset.name);
    undoStackRef.current = [];
    redoStackRef.current = [];
    setHistoryVersion(v => v + 1);
    bumpGrid();
  }, [editingSource, editingAssetName, editingAssetType, tilesets]);

  // ── Drawing state ref ──
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

  const previewCellsRef = useRef<{ row: number; col: number }[]>([]);

  // ── History ──
  const saveToHistory = useCallback(() => {
    undoStackRef.current.push(gridRef.current.map(r => [...r]));
    if (undoStackRef.current.length > MAX_HISTORY) undoStackRef.current.shift();
    redoStackRef.current = [];
    setHistoryVersion(v => v + 1);
  }, []);

  const undo = useCallback(() => {
    if (undoStackRef.current.length === 0) return;
    redoStackRef.current.push(gridRef.current.map(r => [...r]));
    gridRef.current = undoStackRef.current.pop()!;
    setHistoryVersion(v => v + 1);
    bumpGrid();
  }, []);

  const redo = useCallback(() => {
    if (redoStackRef.current.length === 0) return;
    undoStackRef.current.push(gridRef.current.map(r => [...r]));
    gridRef.current = redoStackRef.current.pop()!;
    setHistoryVersion(v => v + 1);
    bumpGrid();
  }, []);

  // ── Cell from pointer ──
  const getCellFromEvent = useCallback((e: { clientX: number; clientY: number }) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const col = Math.floor((e.clientX - rect.left) / (rect.width / GRID_W));
    const row = Math.floor((e.clientY - rect.top) / (rect.height / GRID_H));
    if (col < 0 || col >= GRID_W || row < 0 || row >= GRID_H) return null;
    return { row, col };
  }, [canvasRef]);

  // ── Expand brush ──
  const expandBrush = useCallback((row: number, col: number, size: number) => {
    if (size <= 1) return [{ row, col }];
    const cells: { row: number; col: number }[] = [];
    const offset = Math.floor(size / 2);
    for (let dr = 0; dr < size; dr++) {
      for (let dc = 0; dc < size; dc++) {
        const r = row + dr - offset;
        const c = col + dc - offset;
        if (r >= 0 && r < GRID_H && c >= 0 && c < GRID_W) {
          cells.push({ row: r, col: c });
        }
      }
    }
    return cells;
  }, []);

  // ── Apply single cell ──
  const applySingleCell = useCallback((row: number, col: number) => {
    const ds = drawStateRef.current;
    const tileKey = ds.activeTool === 'eraser' ? null : ds.selectedTileKey;
    const cells = expandBrush(row, col, ds.brushSize);
    for (const c of cells) {
      gridRef.current[c.row][c.col] = tileKey;
    }
    bumpGrid();
  }, [expandBrush]);

  // ── Flood fill ──
  const floodFill = useCallback((startRow: number, startCol: number, fillKey: string | null) => {
    const target = gridRef.current[startRow][startCol];
    if (target === fillKey) return;
    const queue: [number, number][] = [[startRow, startCol]];
    const visited = new Set<number>();
    while (queue.length > 0) {
      const [r, c] = queue.shift()!;
      const idx = r * GRID_W + c;
      if (visited.has(idx)) continue;
      if (r < 0 || r >= GRID_H || c < 0 || c >= GRID_W) continue;
      if (gridRef.current[r][c] !== target) continue;
      visited.add(idx);
      gridRef.current[r][c] = fillKey;
      queue.push([r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]);
    }
    bumpGrid();
  }, []);

  // ── Commit preview ──
  const commitPreview = useCallback(() => {
    if (previewCellsRef.current.length === 0) return;
    const ds = drawStateRef.current;
    const tileKey = ds.activeTool === 'eraser' ? null : ds.selectedTileKey;
    for (const { row, col } of previewCellsRef.current) {
      if (row >= 0 && row < GRID_H && col >= 0 && col < GRID_W) {
        gridRef.current[row][col] = tileKey;
      }
    }
    previewCellsRef.current = [];
    bumpGrid();
  }, []);

  // ── Shape cells ──
  const computeShapeCells = useCallback((start: { row: number; col: number }, end: { row: number; col: number }) => {
    const ds = drawStateRef.current;
    let baseCells: { row: number; col: number }[] = [];
    if (ds.activeTool === 'line') baseCells = getLineCells(start.col, start.row, end.col, end.row);
    else if (ds.activeTool === 'rectangle') baseCells = getRectangleCells(start.col, start.row, end.col, end.row);
    else if (ds.activeTool === 'oval') baseCells = getOvalCells(start.col, start.row, end.col, end.row, GRID_W, GRID_H);
    if (ds.brushSize <= 1) return baseCells;
    const seen = new Set<string>();
    const expanded: { row: number; col: number }[] = [];
    for (const cell of baseCells) {
      for (const ec of expandBrush(cell.row, cell.col, ds.brushSize)) {
        const key = `${ec.row},${ec.col}`;
        if (!seen.has(key)) { seen.add(key); expanded.push(ec); }
      }
    }
    return expanded;
  }, [expandBrush]);

  // ── Shape preview ──
  const updateShapePreview = useCallback((cells: { row: number; col: number }[]) => {
    previewPixelsRef.current.fill(0);
    const ds = drawStateRef.current;
    const tileKey = ds.activeTool === 'eraser' ? null : ds.selectedTileKey;
    for (const { row, col } of cells) {
      if (row < 0 || row >= GRID_H || col < 0 || col >= GRID_W) continue;
      if (ds.activeTool === 'eraser') {
        stampSolidColorAt(previewPixelsRef.current, row, col, PIXEL_W, TILE_PX, 239, 68, 68, 90);
      } else if (tileKey && tilePixelsRef.current[tileKey]) {
        stampTileAtWithAlpha(previewPixelsRef.current, tilePixelsRef.current[tileKey], row, col, PIXEL_W, TILE_PX, 128);
      } else {
        stampSolidColorAt(previewPixelsRef.current, row, col, PIXEL_W, TILE_PX, 16, 185, 129, 77);
      }
    }
    requestRender();
  }, [previewPixelsRef, tilePixelsRef, requestRender]);

  // ── Pointer handlers ──
  const handlePointerDown = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const cell = getCellFromEvent(e);
    if (!cell) return;
    const ds = drawStateRef.current;

    if (ds.activeTool === 'collidable') {
      const key = gridRef.current[cell.row][cell.col];
      if (key) {
        setTileCollidable(key, !tileCollidables[key]);
      }
      return;
    }

    if (ds.activeTool === 'place' || ds.activeTool === 'eraser') {
      saveToHistory();
      ds.isDrawing = true;
      ds.prevCell = cell;
      applySingleCell(cell.row, cell.col);
    } else if (['line', 'rectangle', 'oval'].includes(ds.activeTool)) {
      saveToHistory();
      ds.isDrawing = true;
      ds.shapeStart = cell;
      const cells = expandBrush(cell.row, cell.col, ds.brushSize);
      previewCellsRef.current = cells;
      updateShapePreview(cells);
    } else if (ds.activeTool === 'bucket') {
      saveToHistory();
      floodFill(cell.row, cell.col, ds.selectedTileKey);
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
        if (prev && (Math.abs(cell.row - prev.row) > 1 || Math.abs(cell.col - prev.col) > 1)) {
          const lineCells = getLineCells(prev.col, prev.row, cell.col, cell.row);
          for (const lc of lineCells) applySingleCell(lc.row, lc.col);
        } else {
          applySingleCell(cell.row, cell.col);
        }
      } else if (['line', 'rectangle', 'oval'].includes(ds.activeTool) && ds.shapeStart) {
        const cells = computeShapeCells(ds.shapeStart, cell);
        previewCellsRef.current = cells;
        updateShapePreview(cells);
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
      previewPixelsRef.current.fill(0);
      requestRender();
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };
  });

  // ── Keyboard undo/redo ──
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo(); }
      else if (mod && e.key === 'z' && e.shiftKey) { e.preventDefault(); redo(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  // ── Generate preview base64 ──
  const generatePreviewBase64 = useCallback((): string => {
    if (!isReady) return '';
    const off = document.createElement('canvas');
    off.width = PIXEL_W;
    off.height = PIXEL_H;
    const ctx = off.getContext('2d')!;
    const buf = new Uint8ClampedArray(PIXEL_W * PIXEL_H * 4);
    rebuildPixelBuffer(buf, gridRef.current, tilePixelsRef.current, GRID_W, GRID_H, TILE_PX);
    const imgData = ctx.createImageData(PIXEL_W, PIXEL_H);
    imgData.data.set(buf);
    ctx.putImageData(imgData, 0, 0);
    return off.toDataURL('image/png');
  }, [isReady, tilePixelsRef]);

  // ── Save ──
  const saveTileset = () => {
    const base64Preview = generatePreviewBase64();
    const id = editingSource === 'asset' && editingAssetName
      ? editingAssetName
      : `tileset_${Date.now()}`;

    const tileset: Tileset = {
      id,
      name: tilesetName,
      data: gridRef.current.map(r => [...r]),
      base64Preview,
    };

    if (editingSource === 'asset' && editingAssetName) {
      updateTileset(editingAssetName, tileset);
    } else {
      addTileset(tileset);
    }

    useGeckodeStore.setState({ editingSource: null, editingAssetName: null, editingAssetType: null });
    onClose();
  };

  return (
    <div className="flex-1 min-h-0 flex bg-light-secondary dark:bg-dark-secondary h-full">
      <TileEditorModal
        isOpen={isTileEditorOpen}
        onClose={() => setIsTileEditorOpen(false)}
      />
      {/* Left sidebar */}
      <div className="w-[250px] flex flex-col gap-3 p-2 bg-white/50 dark:bg-dark-secondary/50 border-r border-slate-200 dark:border-slate-700">
        {/* Brush size */}
        <div className="grid grid-cols-3 rounded overflow-hidden">
          {[1, 2, 3].map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setBrushSize(size)}
              className={`h-9 flex items-center justify-center cursor-pointer transition ${
                brushSize === size ? 'bg-primary-green' : 'bg-slate-200 hover:bg-slate-300 dark:bg-dark-tertiary dark:hover:bg-dark-tertiary/80'
              }`}
              title={`${size}x${size} brush`}
            >
              <div className="bg-white" style={{ width: size * 3 + 2, height: size * 3 + 2 }} />
            </button>
          ))}
        </div>

        {/* Tools grid (2 cols) */}
        <div className="grid grid-cols-2 gap-2 w-fit mx-auto">
          <ToolButton tool="place" activeTool={activeTool} onClick={() => setActiveTool('place')} title="Place tile">
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
          <ToolButton tool="collidable" activeTool={activeTool} onClick={() => setActiveTool('collidable')} title="Toggle collidable">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </ToolButton>
        </div>

        {/* Tile palette with pagination */}
        <div className="flex flex-col gap-1">
          <span className="text-sm text-slate-600 dark:text-slate-300 font-semibold px-0.5">Tiles</span>

          {/* Pagination arrows + grid */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setTilePage(p => Math.max(0, p - 1))}
              disabled={tilePage === 0}
              className="w-6 h-6 flex items-center justify-center rounded text-slate-500 hover:bg-slate-200 dark:hover:bg-dark-tertiary disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition"
              title="Previous page"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="grid grid-cols-3 gap-[2px] flex-1">
              {pagedTileKeys.map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setSelectedTileKey(key);
                    if (activeTool === 'collidable') setActiveTool('place');
                  }}
                  onDoubleClick={() => {
                    setEditingAsset(key, 'tiles', 'asset');
                    setIsTileEditorOpen(true);
                  }}
                  className={`aspect-square cursor-pointer transition-colors overflow-hidden ${
                    selectedTileKey === key
                      ? 'border-2 border-primary-green'
                      : 'border-2 border-transparent hover:border-slate-400 dark:hover:border-slate-500'
                  }`}
                  title={key}
                >
                  <img
                    src={tileTextures[key]}
                    alt={key}
                    className="w-full h-full object-cover"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setTilePage(p => Math.min(totalPages - 1, p + 1))}
              disabled={tilePage >= totalPages - 1}
              className="w-6 h-6 flex items-center justify-center rounded text-slate-500 hover:bg-slate-200 dark:hover:bg-dark-tertiary disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition"
              title="Next page"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Page dots */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-1 pt-1">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setTilePage(i)}
                  className={`w-2 h-2 rounded-full cursor-pointer transition ${
                    i === tilePage ? 'bg-primary-green' : 'bg-slate-300 dark:bg-slate-600'
                  }`}
                  title={`Page ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Collidable toggle for selected tile */}
        {selectedTileKey && (
          <button
            type="button"
            onClick={() => setTileCollidable(selectedTileKey, !tileCollidables[selectedTileKey])}
            className={`flex items-center gap-2 px-3 py-2 rounded text-xs font-medium cursor-pointer transition ${
              tileCollidables[selectedTileKey]
                ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                : 'bg-slate-100 text-slate-600 dark:bg-dark-tertiary dark:text-slate-300'
            }`}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            {tileCollidables[selectedTileKey] ? 'Collidable' : 'Not collidable'}
            {tileCollidables[selectedTileKey] && (
              <span className="w-2 h-2 rounded-full bg-red-500 ml-auto" />
            )}
          </button>
        )}

        <div className="flex-1" />
      </div>

      {/* Main canvas area */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <div
          ref={canvasContainerRef}
          className="relative flex-1 flex items-center justify-center bg-light-whiteboard dark:bg-dark-whiteboard p-4 overflow-auto min-h-0"
        >
          <div className="relative">
            <canvas
              ref={canvasRef}
              className="cursor-crosshair select-none touch-none"
              style={{
                width: PIXEL_W * cellSize,
                height: PIXEL_H * cellSize,
                imageRendering: 'pixelated',
              }}
              onPointerDown={handlePointerDown}
              onContextMenu={(e) => e.preventDefault()}
            />
            <canvas
              ref={collidableCanvasRef}
              className="absolute top-0 left-0 pointer-events-none"
              style={{
                width: PIXEL_W * cellSize,
                height: PIXEL_H * cellSize,
              }}
            />
          </div>
          {/* Floating undo/redo */}
          <div className="absolute bottom-2 right-2 z-10 flex gap-1.5">
            <button
              type="button"
              onClick={undo}
              disabled={undoStackRef.current.length === 0}
              className="w-7 h-7 flex items-center justify-center rounded bg-slate-200/80 hover:bg-slate-300 dark:bg-dark-tertiary/80 dark:hover:bg-dark-tertiary text-slate-600 dark:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition"
              title="Undo (Ctrl+Z)"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 7h10a5 5 0 0 1 0 10H9" />
                <path d="M3 7l4-4M3 7l4 4" />
              </svg>
            </button>
            <button
              type="button"
              onClick={redo}
              disabled={redoStackRef.current.length === 0}
              className="w-7 h-7 flex items-center justify-center rounded bg-slate-200/80 hover:bg-slate-300 dark:bg-dark-tertiary/80 dark:hover:bg-dark-tertiary text-slate-600 dark:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition"
              title="Redo (Ctrl+Shift+Z)"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 7H11a5 5 0 0 0 0 10h4" />
                <path d="M21 7l-4-4M21 7l-4 4" />
              </svg>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="h-12 flex items-center gap-3 px-3 bg-white/80 dark:bg-dark-secondary/80 border-t border-slate-200 dark:border-slate-700 shrink-0">
          <input
            type="text"
            value={tilesetName}
            onChange={(e) => setTilesetName(e.target.value)}
            placeholder="Tileset name"
            className="flex-1 h-7 px-2 rounded bg-white border border-slate-200 dark:bg-dark-tertiary dark:border-slate-600 text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 outline-none focus:border-primary-green"
          />
          <button
            type="button"
            onClick={saveTileset}
            className="px-4 h-7 flex items-center justify-center rounded bg-emerald-600/80 hover:bg-emerald-600 text-white text-xs font-medium cursor-pointer transition"
          >
            Save
          </button>

          {/* Zoom controls */}
          <div className="flex items-center gap-1.5 ml-auto">
            <button
              type="button"
              onClick={() => setZoom(zoomPercent - 25)}
              disabled={zoomPercent <= MIN_ZOOM_PERCENT}
              className="w-6 h-6 flex items-center justify-center rounded bg-slate-200 hover:bg-slate-300 dark:bg-dark-tertiary dark:hover:bg-dark-tertiary/80 disabled:opacity-40 disabled:cursor-not-allowed text-slate-600 dark:text-slate-300 cursor-pointer transition"
              title="Zoom out"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                className="w-12 h-6 px-1 text-xs text-slate-700 dark:text-slate-300 text-center bg-white border border-slate-200 dark:bg-dark-tertiary dark:border-slate-600 rounded outline-none focus:border-primary-green [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                autoFocus
                onFocus={(e) => e.target.select()}
              />
            ) : (
              <button
                type="button"
                onClick={() => setIsEditingZoom(true)}
                className="w-12 h-6 text-xs text-slate-600 dark:text-slate-300 text-center hover:bg-slate-200 dark:hover:bg-dark-tertiary rounded cursor-pointer transition"
                title="Click to edit zoom"
              >
                {Math.round(zoomPercent)}%
              </button>
            )}
            <button
              type="button"
              onClick={() => setZoom(zoomPercent + 25)}
              disabled={zoomPercent >= MAX_ZOOM_PERCENT}
              className="w-6 h-6 flex items-center justify-center rounded bg-slate-200 hover:bg-slate-300 dark:bg-dark-tertiary dark:hover:bg-dark-tertiary/80 disabled:opacity-40 disabled:cursor-not-allowed text-slate-600 dark:text-slate-300 cursor-pointer transition"
              title="Zoom in"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TilesetEditor;
