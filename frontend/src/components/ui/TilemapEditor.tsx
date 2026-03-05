'use client';

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { DragEvent as ReactDragEvent, PointerEvent as ReactPointerEvent } from 'react';
import { EraserIcon, Pencil2Icon } from '@radix-ui/react-icons';
import { Trash2Icon, PlusIcon, Box, TrashIcon } from 'lucide-react';
import { PencilIcon, BucketIcon, LineIcon, CircleIcon } from '@/components/icons';
import { useGeckodeStore } from '@/stores/geckodeStore';
import type { TilemapTool, Tileset } from '@/stores/geckodeStore';
import { EventBus } from '@/phaser/EventBus';
import { useCanvasZoom } from '@/hooks/useCanvasZoom';
import { usePixelCanvas } from '@/hooks/usePixelCanvas';
import {
  useTilePixelCache,
  stampSolidColorAt,
  stampTileAtWithAlpha,
  rebuildPixelBuffer,
} from '@/hooks/useTilePixelCache';
import TileEditorModal from '@/components/TileModal/TileEditorModal';
import { getLineCells, getRectangleCells, getOvalCells } from '@/lib/tileGridGeometry';
import { LIBRARY_TILE_PREFIX, TILE_PX, TILESET_WIDTH } from '@/stores/slices/spriteSlice';
import {
  visibilityButtonBaseClasses,
  visibilityButtonActiveClasses,
  visibilityButtonInactiveClasses,
} from '@/components/PhaserPanel/spritePositionUtils';
import { Modal } from './modals/Modal';
import { Button } from './Button';

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
    type='button'
    onClick={onClick}
    className={`w-full h-12 flex items-center justify-center cursor-pointer transition ${
      activeTool === tool
        ? 'bg-primary-green text-white'
        : 'bg-slate-200 hover:bg-slate-300 dark:bg-dark-tertiary dark:hover:bg-dark-tertiary/80 text-slate-600 dark:text-slate-300'
    }`}
    title={title}
  >
    {children}
  </button>
);

const TilemapEditor = () => {
  const [activeTool, setActiveTool] = useState<TilemapTool>('place');
  const [selectedSingleTile, setSelectedSingleTile] = useState<string | null>(null);
  const [selectedSecondaryTile, setSelectedSecondaryTile] = useState<string | null>(null);
  const [selectedTilesetCell, setSelectedTilesetCell] = useState<{ row: number; col: number; tileKey: string | null } | null>(
    null,
  );
  const [dragOverTilesetCell, setDragOverTilesetCell] = useState<{ row: number; col: number } | null>(null);
  const [brushSize, setBrushSize] = useState(1);
  const [hoverCell, setHoverCell] = useState<{ row: number; col: number } | null>(null);
  const [isTileEditorOpen, setIsTileEditorOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [showCollidables, setShowCollidables] = useState(false);
  const minimapRef = useRef<HTMLCanvasElement>(null);
  const collidableCanvasRef = useRef<HTMLCanvasElement>(null);
  const pendingNewTileSlotRef = useRef<{ row: number; col: number } | null>(null);

  const libaryTiles = useGeckodeStore((s) => s.libaryTiles);
  const tiles = useGeckodeStore((s) => s.tiles);
  const tileTextures = useMemo(() => ({ ...libaryTiles, ...tiles }), [libaryTiles, tiles]);
  const tilesets = useGeckodeStore((s) => s.tilesets);
  const tilemaps = useGeckodeStore((s) => s.tilemaps);
  const activeTilemapId = useGeckodeStore((s) => s.activeTilemapId);
  const updateTilemapCell = useGeckodeStore((s) => s.updateTilemapCell);
  const setTilemapData = useGeckodeStore((s) => s.setTilemapData);
  const resizeTilemap = useGeckodeStore((s) => s.resizeTilemap);
  const setTilemapTilesetId = useGeckodeStore((s) => s.setTilemapTilesetId);
  const updateTileset = useGeckodeStore((s) => s.updateTileset);
  const setEditingAsset = useGeckodeStore((s) => s.setEditingAsset);
  const tileCollidables = useGeckodeStore((s) => s.tileCollidables);
  const setTileCollidable = useGeckodeStore((s) => s.setTileCollidable);

  const tilemap = activeTilemapId ? tilemaps[activeTilemapId] : null;

  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scheduleSaveToScene = useCallback(() => {
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      saveTimeoutRef.current = null;
      EventBus.emit('update-tilemap');
    }, 150);
  }, []);

  useEffect(() => () => {
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
  }, []);

  const selectedTileset: Tileset | null = tilemap
    ? (tilesets.find((ts) => ts.id === tilemap.tilesetId) ?? tilesets[0] ?? null)
    : null;

  // Ensure active tilemap always points at a valid tileset.
  useEffect(() => {
    if (!tilemap || !activeTilemapId || tilesets.length === 0) return;
    if (!tilesets.some((ts) => ts.id === tilemap.tilesetId)) {
      setTilemapTilesetId(activeTilemapId, tilesets[0].id);
    }
  }, [tilemap, activeTilemapId, tilesets, setTilemapTilesetId]);

  // Keep selected tile synced with the current tileset or fallback to first non-null cell.
  useEffect(() => {
    if (!selectedTileset) {
      setSelectedTilesetCell(null);
      setSelectedSingleTile(null);
      return;
    }

    if (selectedTilesetCell) {
      const currentTile = selectedTileset.data[selectedTilesetCell.row]?.[selectedTilesetCell.col] ?? null;
      if (currentTile !== selectedTilesetCell.tileKey) {
        setSelectedTilesetCell({ row: selectedTilesetCell.row, col: selectedTilesetCell.col, tileKey: currentTile });
      }
      setSelectedSingleTile(currentTile);
      return;
    }

    // No cell selected (initial load or tileset switch) — auto-select first tile
    const first = findFirstTileCell(selectedTileset);
    setSelectedTilesetCell(first);
    setSelectedSingleTile(first?.tileKey ?? null);
  }, [selectedTileset]);

  // Track tile keys so we can auto-insert newly created tiles into the active tileset.
  const prevTileKeysRef = useRef<Set<string>>(new Set(Object.keys(tileTextures)));
  useEffect(() => {
    const prevKeys = prevTileKeysRef.current;
    const currentKeys = new Set(Object.keys(tileTextures));
    prevTileKeysRef.current = currentKeys;

    if (!selectedTileset) return;

    const tilesetKeys = new Set(selectedTileset.data.flat().filter(Boolean) as string[]);
    const newKeys = [...currentKeys].filter((k) => !prevKeys.has(k) && !tilesetKeys.has(k));
    if (newKeys.length === 0) return;

    const draft = selectedTileset.data.map((row) => [...row]);
    const pending = pendingNewTileSlotRef.current;
    pendingNewTileSlotRef.current = null;

    for (const key of newKeys) {
      let placed = false;
      if (pending && draft[pending.row]?.[pending.col] === null) {
        draft[pending.row][pending.col] = key;
        placed = true;
      }
      if (!placed) {
        for (let r = 0; r < draft.length && !placed; r++) {
          for (let c = 0; c < TILESET_WIDTH && !placed; c++) {
            if (draft[r][c] === null) {
              draft[r][c] = key;
              placed = true;
            }
          }
        }
      }
      if (!placed) {
        const newRow: (string | null)[] = Array.from({ length: TILESET_WIDTH }, () => null);
        newRow[0] = key;
        draft.push(newRow);
      }
    }
    updateTileset(selectedTileset.id, { ...selectedTileset, data: normalizeTilesetData(draft) });
  }, [tileTextures]);

  const effectiveSingleTile: string | null = selectedSingleTile;

  /** Number of tilemap cells that use the currently selected tile (will be cleared if tile is deleted). */
  const tilemapCellsUsingSelectedTile =
    tilemap && effectiveSingleTile
      ? tilemap.data.reduce((acc, row) => acc + (row?.filter((cell) => cell === effectiveSingleTile).length ?? 0), 0)
      : 0;

  const gridWidthTiles = tilemap?.width ?? 16;
  const gridHeightTiles = tilemap?.height ?? 16;
  const pixelW = gridWidthTiles * TILE_PX;
  const pixelH = gridHeightTiles * TILE_PX;

  const {
    cellSize,
    zoomIn,
    zoomOut,
    canZoomIn,
    canZoomOut,
    canvasContainerRef,
    scrollContainerRef,
  } = useCanvasZoom(pixelW, pixelH);

  // Integer display dimensions so CSS size, getBoundingClientRect(), and the
  // shadow overlay all agree on exact pixel boundaries.
  const canvasDisplayW = Math.round(pixelW * cellSize);
  const canvasDisplayH = Math.round(pixelH * cellSize);

  const {
    canvasRef,
    outputPixelsRef,
    previewPixelsRef,
    hoverPixelsRef,
    hoverEraseMaskRef,
    clearHoverPreview,
    requestRender,
    resetPixelArrays,
  } = usePixelCanvas(
    pixelW,
    pixelH,
    cellSize,
    8,
    { enableKeyboardShortcuts: false, canvasSize: { w: canvasDisplayW, h: canvasDisplayH } },
  );

  const { tilePixelsRef, tileAveragesRef, isReady } = useTilePixelCache(tileTextures);

  const isTileEmpty = !(isReady && effectiveSingleTile && tileTextures[effectiveSingleTile]);

  // ── Render minimap — one averaged-color block per tile ──
  const renderMinimap = useCallback(() => {
    const canvas = minimapRef.current;
    if (!canvas || !tilemap) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = gridWidthTiles;
    canvas.height = gridHeightTiles;
    ctx.clearRect(0, 0, gridWidthTiles, gridHeightTiles);
    const averages = tileAveragesRef.current;
    for (let row = 0; row < gridHeightTiles; row++) {
      for (let col = 0; col < gridWidthTiles; col++) {
        const key = tilemap.data[row]?.[col];
        if (!key || !averages[key]) continue;
        const { r, g, b, a } = averages[key];
        ctx.fillStyle = `rgba(${r},${g},${b},${a / 255})`;
        ctx.fillRect(col, row, 1, 1);
      }
    }
  }, [tilemap, gridWidthTiles, gridHeightTiles, tileAveragesRef]);

  // ── Zustand → pixel buffer sync (useLayoutEffect so it runs before usePixelCanvas paint) ──
  const prevDimsRef = useRef({ w: pixelW, h: pixelH });
  useLayoutEffect(() => {
    if (!tilemap || !isReady) return;
    if (prevDimsRef.current.w !== pixelW || prevDimsRef.current.h !== pixelH) {
      resetPixelArrays(pixelW, pixelH);
      prevDimsRef.current = { w: pixelW, h: pixelH };
    }
    rebuildPixelBuffer(
      outputPixelsRef.current,
      tilemap.data,
      tilePixelsRef.current,
      tilemap.width,
      tilemap.height,
      TILE_PX,
    );
    requestRender();
    renderMinimap();
  }, [tilemap, isReady, pixelW, pixelH, outputPixelsRef, tilePixelsRef, requestRender, renderMinimap, resetPixelArrays]);

  // ── Render collidable overlay ──
  useEffect(() => {
    const canvas = collidableCanvasRef.current;
    if (!canvas || !tilemap || !showCollidables) return;
    const w = canvasDisplayW;
    const h = canvasDisplayH;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, w, h);
    const tileSizePx = w / tilemap.width;
    ctx.fillStyle = 'rgba(239, 68, 68, 0.3)';
    for (let row = 0; row < tilemap.height; row++) {
      for (let col = 0; col < tilemap.width; col++) {
        const key = tilemap.data[row]?.[col];
        if (key && tileCollidables[key]) {
          ctx.fillRect(col * tileSizePx, row * tileSizePx, tileSizePx, tileSizePx);
        }
      }
    }
  }, [tilemap, showCollidables, tileCollidables, canvasDisplayW, canvasDisplayH]);

  // ── Drawing state ref (avoids stale closures in window handlers) ──
  const drawStateRef = useRef({
    isDrawing: false,
    shapeStart: null as { row: number; col: number } | null,
    prevCell: null as { row: number; col: number } | null,
    activeTool: 'place' as TilemapTool,
    selectedSingleTile: null as string | null,
    selectedSecondaryTile: null as string | null,
    brushSize: 1,
    drawingButton: 0,
  });
  useEffect(() => {
    const ds = drawStateRef.current;
    ds.activeTool = activeTool;
    ds.selectedSingleTile = effectiveSingleTile;
    ds.selectedSecondaryTile = selectedSecondaryTile;
    ds.brushSize = brushSize;
  }, [activeTool, effectiveSingleTile, selectedSecondaryTile, brushSize]);

  const hoverPreviewResetKey = `${activeTool}:${brushSize}:${effectiveSingleTile ?? ''}:${selectedSecondaryTile ?? ''}`;
  useEffect(() => {
    if (!hoverPreviewResetKey) return;
    clearHoverPreview();
    requestRender();
  }, [hoverPreviewResetKey, clearHoverPreview, requestRender]);

  // ── Preview cells for shape commit ──
  const previewCellsRef = useRef<{ row: number; col: number }[]>([]);

  // ── Undo / Redo ──
  const MAX_HISTORY = 50;
  const undoStackRef = useRef<(string | null)[][][]>([]);
  const redoStackRef = useRef<(string | null)[][][]>([]);
  const [_historyVersion, setHistoryVersion] = useState(0);

  const saveToHistory = useCallback(() => {
    if (!tilemap) return;
    undoStackRef.current.push(tilemap.data.map((r) => [...r]));
    if (undoStackRef.current.length > MAX_HISTORY) undoStackRef.current.shift();
    redoStackRef.current = [];
    setHistoryVersion((v) => v + 1);
  }, [tilemap]);

  const undo = useCallback(() => {
    if (!activeTilemapId || !tilemap || undoStackRef.current.length === 0) return;
    redoStackRef.current.push(tilemap.data.map((r) => [...r]));
    const prev = undoStackRef.current.pop();
    if (prev) setTilemapData(activeTilemapId, prev);
    setHistoryVersion((v) => v + 1);
    scheduleSaveToScene();
  }, [activeTilemapId, tilemap, setTilemapData, scheduleSaveToScene]);

  const redo = useCallback(() => {
    if (!activeTilemapId || !tilemap || redoStackRef.current.length === 0) return;
    undoStackRef.current.push(tilemap.data.map((r) => [...r]));
    const next = redoStackRef.current.pop();
    if (next) setTilemapData(activeTilemapId, next);
    setHistoryVersion((v) => v + 1);
    scheduleSaveToScene();
  }, [activeTilemapId, tilemap, setTilemapData, scheduleSaveToScene]);

  // ── Cell from pointer event ──
  const getCellFromEvent = useCallback(
    (e: { clientX: number; clientY: number }) => {
      const canvas = canvasRef.current;
      if (!canvas || !tilemap) return null;
      const rect = canvas.getBoundingClientRect();
      const col = Math.floor((e.clientX - rect.left) / (rect.width / tilemap.width));
      const row = Math.floor((e.clientY - rect.top) / (rect.height / tilemap.height));
      if (col < 0 || col >= tilemap.width || row < 0 || row >= tilemap.height) return null;
      return { row, col };
    },
    [canvasRef, tilemap],
  );

  // ── Expand a cell by brush size ──
  const expandBrush = useCallback(
    (row: number, col: number, size: number) => {
      if (size <= 1) return [{ row, col }];
      const cells: { row: number; col: number }[] = [];
      const offset = Math.floor(size / 2);
      for (let dr = 0; dr < size; dr++) {
        for (let dc = 0; dc < size; dc++) {
          const r = row + dr - offset;
          const c = col + dc - offset;
          if (r >= 0 && r < gridHeightTiles && c >= 0 && c < gridWidthTiles) {
            cells.push({ row: r, col: c });
          }
        }
      }
      return cells;
    },
    [gridWidthTiles, gridHeightTiles],
  );

  const updateHoverPreview = useCallback(
    (row: number, col: number, buttons: number, button: number) => {
      clearHoverPreview();

      if (!['place', 'line', 'rectangle', 'oval', 'eraser'].includes(activeTool)) {
        requestRender();
        return;
      }

      const cells = expandBrush(row, col, brushSize);
      const useSecondaryTile = (buttons & 2) === 2 || button === 2;
      const hoverTileKey = useSecondaryTile ? selectedSecondaryTile : effectiveSingleTile;
      const hoverTilePixels = hoverTileKey ? tilePixelsRef.current[hoverTileKey] : null;
      const shouldErasePreview = activeTool === 'eraser' || !hoverTilePixels;

      if (shouldErasePreview) {
        const eraseMask = hoverEraseMaskRef.current;
        for (const cell of cells) {
          eraseMask[cell.row * gridWidthTiles + cell.col] = 1;
        }
        requestRender();
        return;
      }

      const hoverPixels = hoverPixelsRef.current;
      for (const cell of cells) {
        stampTileAtWithAlpha(hoverPixels, hoverTilePixels, cell.row, cell.col, pixelW, TILE_PX, 255);
      }
      requestRender();
    },
    [
      activeTool,
      brushSize,
      clearHoverPreview,
      effectiveSingleTile,
      expandBrush,
      gridWidthTiles,
      hoverEraseMaskRef,
      hoverPixelsRef,
      pixelW,
      requestRender,
      selectedSecondaryTile,
      tilePixelsRef,
    ],
  );

  const clearCanvasHoverPreview = useCallback(() => {
    setHoverCell(null);
    clearHoverPreview();
    requestRender();
  }, [clearHoverPreview, requestRender]);

  const handleCanvasPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLCanvasElement>) => {
      if (!tilemap) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const col = Math.floor(((e.clientX - rect.left) / rect.width) * tilemap.width);
      const row = Math.floor(((e.clientY - rect.top) / rect.height) * tilemap.height);
      if (col < 0 || col >= tilemap.width || row < 0 || row >= tilemap.height) {
        clearCanvasHoverPreview();
        return;
      }
      setHoverCell({ row, col });
      updateHoverPreview(row, col, e.buttons, e.button);
    },
    [tilemap, canvasRef, clearCanvasHoverPreview, updateHoverPreview],
  );

  // ── Apply single cell placement (for pen / eraser drag with single tile) ──
  const applySingleCell = useCallback(
    (row: number, col: number) => {
      if (!activeTilemapId || !tilemap) return;
      const ds = drawStateRef.current;
      const tileKey =
        ds.activeTool === 'eraser' ? null : ds.drawingButton === 2 ? ds.selectedSecondaryTile : ds.selectedSingleTile;
      const cells = expandBrush(row, col, ds.brushSize);
      for (const c of cells) {
        if (tilemap.data[c.row][c.col] !== tileKey) {
          updateTilemapCell(activeTilemapId, c.row, c.col, tileKey);
        }
      }
      scheduleSaveToScene();
    },
    [activeTilemapId, tilemap, updateTilemapCell, expandBrush, scheduleSaveToScene],
  );

  // ── Flood fill on tile grid ──
  const floodFill = useCallback(
    (startRow: number, startCol: number, fillKey: string | null) => {
      if (!activeTilemapId || !tilemap) return;
      const w = tilemap.width;
      const h = tilemap.height;
      const target = tilemap.data[startRow][startCol];
      if (target === fillKey) return;

      const newData = tilemap.data.map((r) => [...r]);
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
      scheduleSaveToScene();
    },
    [activeTilemapId, tilemap, setTilemapData, scheduleSaveToScene],
  );

  // ── Commit shape preview cells to store ──
  const commitPreview = useCallback(() => {
    if (!activeTilemapId || !tilemap || previewCellsRef.current.length === 0) return;
    const ds = drawStateRef.current;
    const tileKey =
      ds.activeTool === 'eraser' ? null : ds.drawingButton === 2 ? ds.selectedSecondaryTile : ds.selectedSingleTile;
    const newData = tilemap.data.map((r) => [...r]);
    for (const { row, col } of previewCellsRef.current) {
      if (row >= 0 && row < tilemap.height && col >= 0 && col < tilemap.width) {
        newData[row][col] = tileKey;
      }
    }
    setTilemapData(activeTilemapId, newData);
    previewCellsRef.current = [];
    scheduleSaveToScene();
  }, [activeTilemapId, tilemap, setTilemapData, scheduleSaveToScene]);

  // ── Compute shape cells with brush expansion ──
  const computeShapeCells = useCallback(
    (start: { row: number; col: number }, end: { row: number; col: number }) => {
      const ds = drawStateRef.current;
      let baseCells: { row: number; col: number }[] = [];
      if (ds.activeTool === 'line') {
        baseCells = getLineCells(start.col, start.row, end.col, end.row);
      } else if (ds.activeTool === 'rectangle') {
        baseCells = getRectangleCells(start.col, start.row, end.col, end.row);
      } else if (ds.activeTool === 'oval') {
        baseCells = getOvalCells(start.col, start.row, end.col, end.row, gridWidthTiles, gridHeightTiles);
      }

      if (ds.brushSize <= 1) return baseCells;

      // Expand each cell by brush size, deduplicate
      const seen = new Set<string>();
      const expanded: { row: number; col: number }[] = [];
      for (const cell of baseCells) {
        for (const ec of expandBrush(cell.row, cell.col, ds.brushSize)) {
          const key = `${ec.row},${ec.col}`;
          if (!seen.has(key)) {
            seen.add(key);
            expanded.push(ec);
          }
        }
      }
      return expanded;
    },
    [gridWidthTiles, gridHeightTiles, expandBrush],
  );

  // ── Write shape preview into previewPixelsRef ──
  const updateShapePreview = useCallback(
    (cells: { row: number; col: number }[]) => {
      previewPixelsRef.current.fill(0);
      const ds = drawStateRef.current;
      const tileKey =
        ds.activeTool === 'eraser' ? null : ds.drawingButton === 2 ? ds.selectedSecondaryTile : ds.selectedSingleTile;
      for (const { row, col } of cells) {
        if (row < 0 || row >= gridHeightTiles || col < 0 || col >= gridWidthTiles) continue;
        if (ds.activeTool === 'eraser') {
          stampSolidColorAt(previewPixelsRef.current, row, col, pixelW, TILE_PX, 239, 68, 68, 90);
        } else if (tileKey && tilePixelsRef.current[tileKey]) {
          stampTileAtWithAlpha(
            previewPixelsRef.current,
            tilePixelsRef.current[tileKey],
            row,
            col,
            pixelW,
            TILE_PX,
            128,
          );
        } else {
          stampSolidColorAt(previewPixelsRef.current, row, col, pixelW, TILE_PX, 16, 185, 129, 77);
        }
      }
      requestRender();
    },
    [previewPixelsRef, tilePixelsRef, pixelW, gridWidthTiles, gridHeightTiles, requestRender],
  );

  // ── Pointer handlers ──
  const handlePointerDown = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const cell = getCellFromEvent(e);
    if (!cell || !tilemap) return;
    const ds = drawStateRef.current;
    ds.drawingButton = e.button;

    if (ds.activeTool === 'place') {
      const activeTile = ds.drawingButton === 2 ? ds.selectedSecondaryTile : ds.selectedSingleTile;
      if (!activeTile) return;
      saveToHistory();
      ds.isDrawing = true;
      ds.prevCell = cell;
      applySingleCell(cell.row, cell.col);
    } else if (ds.activeTool === 'eraser') {
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
      const fillTile = ds.drawingButton === 2 ? ds.selectedSecondaryTile : ds.selectedSingleTile;
      floodFill(cell.row, cell.col, fillTile);
    } else if (ds.activeTool === 'tile-picker') {
      const tileKey = tilemap.data[cell.row][cell.col];
      if (tileKey) {
        setSelectedSingleTile(tileKey);
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

  // ── Undo/Redo keyboard shortcuts ──
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if (mod && e.key === 'z' && e.shiftKey) {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  // ── Grid resize ──
  const handleGridResize = (dimension: 'width' | 'height', value: string) => {
    if (!activeTilemapId || !tilemap) return;
    if (value === '') return;
    const parsed = Math.max(1, Math.min(128, parseInt(value, 10)));
    if (Number.isNaN(parsed)) return;
    const newW = dimension === 'width' ? parsed : tilemap.width;
    const newH = dimension === 'height' ? parsed : tilemap.height;
    resizeTilemap(activeTilemapId, newW, newH);
    scheduleSaveToScene();
  };

  const handleSelectTilesetCell = useCallback(
    (row: number, col: number) => {
      if (!selectedTileset) return;
      const tileKey = selectedTileset.data[row]?.[col] ?? null;
      setSelectedTilesetCell({ row, col, tileKey });
      setSelectedSingleTile(tileKey);
      if (tileKey && activeTool === 'tile-picker') setActiveTool('place');
    },
    [selectedTileset, activeTool],
  );

  const openTileEditorForCell = useCallback(
    (row: number, col: number) => {
      if (!selectedTileset) return;
      const tileKey = selectedTileset.data[row]?.[col] ?? null;
      if (tileKey) {
        setEditingAsset(tileKey, 'tiles', 'asset');
        if (tileKey.startsWith(LIBRARY_TILE_PREFIX)) {
          pendingNewTileSlotRef.current = { row, col };
        }
      } else {
        pendingNewTileSlotRef.current = { row, col };
        setEditingAsset(null!, 'tiles', 'new');
      }
      setIsTileEditorOpen(true);
    },
    [selectedTileset, setEditingAsset],
  );

  const updateActiveTilesetData = useCallback(
    (updater: (data: (string | null)[][]) => (string | null)[][] | null) => {
      if (!selectedTileset) return;
      const draft = selectedTileset.data.map((row) => [...row]);
      const nextData = updater(draft);
      if (!nextData) return;
      updateTileset(selectedTileset.id, {
        ...selectedTileset,
        data: normalizeTilesetData(nextData),
      });
    },
    [selectedTileset, updateTileset],
  );

  const handleTileAdded = useCallback(
    (tileKey: string) => {
      if (!selectedTileset) return;
      const pending = pendingNewTileSlotRef.current;
      pendingNewTileSlotRef.current = null;

      const resultRef: { current: { row: number; col: number } | null } = { current: null };

      updateActiveTilesetData((data) => {
        const draft = data.map((row) => [...row]);

        if (pending) {
          draft[pending.row][pending.col] = tileKey;
          resultRef.current = { row: pending.row, col: pending.col };
          return draft;
        }

        const sel = selectedTilesetCell;
        if (sel && draft[sel.row]?.[sel.col] === null) {
          draft[sel.row][sel.col] = tileKey;
          return draft;
        }

        for (let r = 0; r < draft.length; r++) {
          for (let c = 0; c < TILESET_WIDTH; c++) {
            if (draft[r]?.[c] === null) {
              draft[r][c] = tileKey;
              resultRef.current = { row: r, col: c };
              return draft;
            }
          }
        }
        const newRow: (string | null)[] = Array.from({ length: TILESET_WIDTH }, () => null);
        newRow[0] = tileKey;
        draft.push(newRow);
        resultRef.current = { row: draft.length - 1, col: 0 };
        return draft;
      });

      const placed = resultRef.current;
      if (placed) {
        setSelectedTilesetCell({ row: placed.row, col: placed.col, tileKey });
        setSelectedSingleTile(tileKey);
      }
    },
    [selectedTileset, selectedTilesetCell, updateActiveTilesetData],
  );

  const handleDeleteTile = useCallback(() => {
    if (!effectiveSingleTile || !activeTilemapId || !tilemap) return;
    const tileToDelete = effectiveSingleTile;

    saveToHistory();

    // Remove all placed instances from the tilemap
    const newData = tilemap.data.map((row) => row.map((cell) => (cell === tileToDelete ? null : cell)));
    setTilemapData(activeTilemapId, newData);
    scheduleSaveToScene();

    // Remove from tileset
    updateActiveTilesetData((data) => {
      let found = false;
      for (let r = 0; r < data.length; r++) {
        for (let c = 0; c < (data[r]?.length ?? 0); c++) {
          if (data[r][c] === tileToDelete) {
            data[r][c] = null;
            found = true;
          }
        }
      }
      return found ? data : null;
    });
  }, [effectiveSingleTile, activeTilemapId, tilemap, saveToHistory, setTilemapData, updateActiveTilesetData, scheduleSaveToScene]);

  const handleSwapTiles = useCallback(() => {
    setSelectedSingleTile(selectedSecondaryTile);
    setSelectedSecondaryTile(effectiveSingleTile);
  }, [selectedSecondaryTile, effectiveSingleTile]);

  const handleTilesetDragStart = useCallback(
    (e: ReactDragEvent<HTMLButtonElement>, row: number, col: number, tileKey: string) => {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', JSON.stringify({ row, col, tileKey }));
    },
    [],
  );

  const handleTilesetDrop = useCallback(
    (e: ReactDragEvent<HTMLButtonElement>, destRow: number, destCol: number) => {
      e.preventDefault();
      setDragOverTilesetCell(null);
      if (!selectedTileset) return;

      let payload: { row: number; col: number; tileKey: string } | null = null;
      try {
        payload = JSON.parse(e.dataTransfer.getData('text/plain'));
      } catch {
        payload = null;
      }
      if (!payload) return;

      updateActiveTilesetData((data) => {
        const sourceTile = data[payload.row]?.[payload.col] ?? null;
        if (!sourceTile || sourceTile !== payload.tileKey) return null;
        if (!data[destRow]) return null;
        if (payload.row === destRow && payload.col === destCol) return null;

        const destTile = data[destRow][destCol];
        data[payload.row][payload.col] = destTile;
        data[destRow][destCol] = sourceTile;
        setSelectedTilesetCell({ row: destRow, col: destCol, tileKey: sourceTile });
        setSelectedSingleTile(sourceTile);
        return data;
      });
    },
    [selectedTileset, updateActiveTilesetData],
  );

  const handleAddTilesetRow = useCallback(() => {
    updateActiveTilesetData((data) => {
      data.push(Array.from({ length: TILESET_WIDTH }, () => null));
      return data;
    });
  }, [updateActiveTilesetData]);

  if (!tilemap || !activeTilemapId) {
    return (
      <div className='flex-1 min-h-0 flex items-center justify-center text-slate-500 dark:text-slate-400'>
        No tilemap selected
      </div>
    );
  }

  return (
    <div className='flex-1 min-h-0 flex bg-light-secondary dark:bg-dark-secondary h-full'>
      <TileEditorModal
        isOpen={isTileEditorOpen}
        onClose={() => {
          pendingNewTileSlotRef.current = null;
          setIsTileEditorOpen(false);
        }}
        onAddTileToSlot={handleTileAdded}
      />
      {deleteConfirmOpen && (
        <Modal
          title="Delete Tile"
          icon={TrashIcon}
          onClose={() => setDeleteConfirmOpen(false)}
          className="bg-red-500"
          text="Are you sure you want to delete this tile? This cannot be undone."
          subtitle={`There are ${tilemapCellsUsingSelectedTile} tiles using this tile.`}
          actions={
            <>
              <Button
                className="btn-deny ml-3"
                onClick={() => {
                  handleDeleteTile();
                  setDeleteConfirmOpen(false);
                  undoStackRef.current = [];
                  redoStackRef.current = [];
                }}
              >
                Delete
              </Button>
              <Button
                className="btn-neutral"
                onClick={() => setDeleteConfirmOpen(false)}
              >
                Cancel
              </Button>
            </>
          }
        />
      )}
      {/* Left sidebar — brush size, tools, tileset palette */}
      <div className='w-[250px] flex flex-col gap-3 p-2 bg-light-secondary dark:bg-dark-secondary border-r border-slate-200 dark:border-slate-700'>
        {/* Brush size */}
        <div className='grid grid-cols-3 rounded overflow-hidden'>
          {[1, 2, 3].map((size) => (
            <button
              key={size}
              type='button'
              onClick={() => setBrushSize(size)}
              className={`h-9 flex items-center justify-center cursor-pointer transition ${
                brushSize === size
                  ? 'bg-primary-green'
                  : 'bg-slate-200 hover:bg-slate-300 dark:bg-dark-tertiary dark:hover:bg-dark-tertiary/80'
              }`}
              title={`${size}x${size} brush`}
            >
              <div className='bg-white' style={{ width: size * 3 + 2, height: size * 3 + 2 }} />
            </button>
          ))}
        </div>

        {/* Minimap */}
        <div className='flex flex-col gap-1'>
          <span className='text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wide font-semibold px-0.5'>
            Minimap
          </span>
          <canvas
            ref={minimapRef}
            className='w-full rounded border border-gray-400'
            style={{ imageRendering: 'pixelated', aspectRatio: `${gridWidthTiles} / ${gridHeightTiles}` }}
          />
        </div>

        {/* Tools grid — 3 columns, full sidebar width */}
        <div className='grid grid-cols-3 gap-2 w-full'>
          <ToolButton
            tool='place'
            activeTool={activeTool}
            onClick={() => setActiveTool('place')}
            title='Place tile (pen)'
          >
            <PencilIcon className='w-5 h-5' />
          </ToolButton>
          <ToolButton tool='eraser' activeTool={activeTool} onClick={() => setActiveTool('eraser')} title='Eraser'>
            <EraserIcon className='w-5 h-5' />
          </ToolButton>
          <ToolButton tool='bucket' activeTool={activeTool} onClick={() => setActiveTool('bucket')} title='Bucket fill'>
            <BucketIcon className='w-5 h-5' />
          </ToolButton>
          <ToolButton tool='line' activeTool={activeTool} onClick={() => setActiveTool('line')} title='Line tool'>
            <LineIcon className='w-5 h-5' />
          </ToolButton>
          <ToolButton
            tool='rectangle'
            activeTool={activeTool}
            onClick={() => setActiveTool('rectangle')}
            title='Rectangle tool'
          >
            <svg className='w-5 h-5' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
              <rect x='3' y='3' width='18' height='18' rx='1' />
            </svg>
          </ToolButton>
          <ToolButton tool='oval' activeTool={activeTool} onClick={() => setActiveTool('oval')} title='Oval tool'>
            <CircleIcon className='w-5 h-5' />
          </ToolButton>
        </div>

        {/* Tileset panel */}
        <div className='flex flex-col gap-2 min-h-0'>
          <span className='text-sm text-slate-600 dark:text-slate-300 font-semibold px-0.5'>Tileset</span>
          <div className='flex items-center gap-1'>
            <div className='relative flex-1 min-w-0'>
              <select
                value={tilemap.tilesetId}
                onChange={(e) => setTilemapTilesetId(activeTilemapId, e.target.value)}
                className='appearance-none w-full h-7 pl-2 pr-6 rounded bg-white border border-slate-200 dark:bg-dark-tertiary dark:border-slate-600 text-xs text-slate-700 dark:text-slate-200 outline-none focus:border-primary-green'
                title='Active tilemap tileset'
              >
                {tilesets.map((tileset) => (
                  <option key={tileset.id} value={tileset.id}>
                    {tileset.name}
                  </option>
                ))}
              </select>
              <svg
                className='pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 dark:text-slate-500'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M6 9l6 6 6-6' />
              </svg>
            </div>

            <div className='flex gap-1'>
              <button
                type='button'
                onClick={() => {
                  if (selectedTilesetCell && selectedTileset?.data[selectedTilesetCell.row]?.[selectedTilesetCell.col] === null) {
                    pendingNewTileSlotRef.current = { row: selectedTilesetCell.row, col: selectedTilesetCell.col };
                  } else {
                    pendingNewTileSlotRef.current = null;
                  }
                  setEditingAsset(null!, 'tiles', 'new');
                  setIsTileEditorOpen(true);
                }}
                className='w-7 h-7 flex items-center justify-center rounded-sm bg-transparent hover:bg-slate-200/60 dark:hover:bg-dark-tertiary/60 text-slate-700 dark:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-green/50 cursor-pointer transition'
                title='New tile'
              >
                <PlusIcon className='w-4 h-4' />
              </button>
              <button
                type='button'
                disabled={!selectedTilesetCell}
                onClick={() => {
                  if (!selectedTilesetCell) return;
                  openTileEditorForCell(selectedTilesetCell.row, selectedTilesetCell.col);
                }}
                className='w-7 h-7 flex items-center justify-center rounded-sm bg-transparent hover:bg-slate-200/60 dark:hover:bg-dark-tertiary/60 text-slate-700 dark:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-green/50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition'
                title='Edit selected tile'
              >
                <Pencil2Icon className='w-4 h-4' />
              </button>
              <button
                type='button'
                disabled={isTileEmpty}
                onClick={() => setDeleteConfirmOpen(true)}
                className='w-7 h-7 flex items-center justify-center rounded-sm bg-transparent hover:bg-slate-200/60 dark:hover:bg-dark-tertiary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-green/50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition'
                title='Delete selected tile from tileset'
              >
                <Trash2Icon className='w-4 h-4 text-red-500' />
              </button>
            </div>
          </div>

          {/* Dual tile swatch: primary (left-click) + secondary (right-click) */}
          <div className='flex gap-2 items-end'>
            {/* Primary tile — larger */}
            <div
              className={`w-16 h-16 shrink-0 overflow-hidden${effectiveSingleTile && tileTextures[effectiveSingleTile] ? '' : ' bg-slate-300 dark:bg-slate-600'}`}
              title='Primary tile (left-click to place)'
            >
              {effectiveSingleTile && tileTextures[effectiveSingleTile] && (
                <img
                  src={tileTextures[effectiveSingleTile]}
                  alt='Primary tile'
                  className='w-full h-full object-cover'
                  style={{ imageRendering: 'pixelated' }}
                />
              )}
            </div>

            {/* Secondary column: swap arrow above, secondary tile below */}
            <div className='flex flex-col items-center gap-0.5'>
              <button
                type='button'
                onClick={handleSwapTiles}
                className='w-9 h-6 flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer transition'
                title='Swap primary and secondary tiles'
              >
                <svg
                  className='w-5 h-5'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M20 19v-6a4 4 0 0 0-4-4H3' />
                  <path d='M8 14 3 9l5-5' />
                </svg>
              </button>
              {/* Secondary tile — smaller */}
              <div
                className={`w-10 h-10 shrink-0 overflow-hidden${selectedSecondaryTile && tileTextures[selectedSecondaryTile] ? '' : ' bg-slate-300 dark:bg-slate-600'}`}
                title='Secondary tile (right-click to place)'
              >
                {selectedSecondaryTile && tileTextures[selectedSecondaryTile] && (
                  <img
                    src={tileTextures[selectedSecondaryTile]}
                    alt='Secondary tile'
                    className='w-full h-full object-cover'
                    style={{ imageRendering: 'pixelated' }}
                  />
                )}
              </div>
            </div>
          </div>

          {selectedTileset && (
            <div className='h-[260px] min-h-[260px] overflow-y-auto'>
              <div className='flex flex-col items-center gap-2 pb-2'>
                <div className='grid grid-cols-5 gap-px p-px w-full'>
                  {selectedTileset.data.map((row, rowIndex) =>
                    Array.from({ length: TILESET_WIDTH }, (_, colIndex) => {
                      const tileKey = row[colIndex] ?? null;
                      const isSelected =
                        selectedTilesetCell?.row === rowIndex &&
                        selectedTilesetCell?.col === colIndex;
                      const isDragOver = dragOverTilesetCell?.row === rowIndex && dragOverTilesetCell?.col === colIndex;
                      const isCollidable = showCollidables && tileKey !== null && tileCollidables[tileKey];
                      return (
                        <button
                          key={`${rowIndex}-${colIndex}`}
                          type='button'
                          draggable={Boolean(tileKey)}
                          onClick={() => handleSelectTilesetCell(rowIndex, colIndex)}
                          onDoubleClick={() => openTileEditorForCell(rowIndex, colIndex)}
                          onContextMenu={(e) => {
                            e.preventDefault();
                            if (tileKey) setSelectedSecondaryTile(tileKey);
                          }}
                          onDragStart={(e) => {
                            if (!tileKey) return;
                            handleTilesetDragStart(e, rowIndex, colIndex, tileKey);
                          }}
                          onDragOver={(e) => {
                            e.preventDefault();
                            setDragOverTilesetCell({ row: rowIndex, col: colIndex });
                          }}
                          onDragLeave={() => setDragOverTilesetCell(null)}
                          onDrop={(e) => handleTilesetDrop(e, rowIndex, colIndex)}
                          className={
                            `group relative aspect-square transition-colors cursor-pointer bg-light-tertiary dark:bg-dark-tertiary
                            ${isDragOver && 'bg-emerald-100! dark:bg-emerald-900/30!'}`
                          }
                          title={tileKey ?? 'Empty'}
                        >
                          {tileKey && tileTextures[tileKey] ? (
                            <img
                              src={tileTextures[tileKey]}
                              alt={tileKey}
                              className='w-full h-full object-cover pointer-events-none'
                              style={{ imageRendering: 'pixelated' }}
                            />
                          ) : null}
                          <div className='absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors pointer-events-none' />
                          {isCollidable && (
                            <div className='absolute inset-0 bg-red-500/30 pointer-events-none' />
                          )}
                          {isSelected && (
                            <div className='absolute -inset-px border-2 border-primary-green pointer-events-none z-10' />
                          )}
                        </button>
                      );
                    }),
                  )}
                </div>
                <button
                  type='button'
                  onClick={handleAddTilesetRow}
                  className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:border-primary-green hover:text-primary-green dark:hover:border-primary-green dark:hover:text-primary-green transition-colors text-xs font-medium'
                  title='Add row'
                >
                  <PlusIcon className='w-3.5 h-3.5' />
                  Add row
                </button>
              </div>
            </div>
          )}

          {/* Solid toggle for selected tile */}
          <div className={`flex items-center gap-1.5 ${isTileEmpty ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
            <button
              type='button'
              disabled={isTileEmpty}
              onClick={() => {
                if (!effectiveSingleTile) return;
                setTileCollidable(effectiveSingleTile, !tileCollidables[effectiveSingleTile]);
              }}
              className={`${visibilityButtonBaseClasses} shrink-0 ${
                effectiveSingleTile && tileCollidables[effectiveSingleTile]
                  ? visibilityButtonActiveClasses
                  : visibilityButtonInactiveClasses
              }`}
              title='Is solid'
            >
              <Box className='w-3.5 h-3.5 shrink-0' />
            </button>
            <span
              className={`text-xs select-none ${isTileEmpty ? 'text-slate-400 dark:text-slate-500' : 'text-slate-600 dark:text-slate-300 cursor-pointer'}`}
              onClick={() => {
                if (isTileEmpty || !effectiveSingleTile) return;
                setTileCollidable(effectiveSingleTile, !tileCollidables[effectiveSingleTile]);
              }}
            >
              Is solid
            </span>
          </div>

          {/* Show collidables checkbox */}
          <label className='flex items-center gap-1.5 px-0.5 cursor-pointer select-none'>
            <input
              type='checkbox'
              checked={showCollidables}
              onChange={(e) => setShowCollidables(e.target.checked)}
              className='accent-primary-green w-3.5 h-3.5 cursor-pointer'
            />
            <span className='text-xs text-slate-500 dark:text-slate-400'>Show collidables</span>
          </label>
        </div>
        <div className='flex-1' />
      </div>

      {/* Main canvas area */}
      <div className='flex-1 flex flex-col min-h-0 overflow-hidden'>
        {/*
          Outer div: stable size source for baseZoom — overflow-hidden so the
          ResizeObserver never sees scrollbar-induced size changes.
        */}
        <div
          ref={canvasContainerRef}
          className='relative flex-1 min-h-0 bg-light-whiteboard dark:bg-dark-whiteboard'
        >
          {/*
            Inner div: actual scroll container — absolutely fills the outer div
            so its presence never changes the outer div's measured size.
          */}
          <div ref={scrollContainerRef} className='absolute inset-0 overflow-auto'>
            {/*
              Centering wrapper: min-w/h = 100% ensures the flex centering works
              when the canvas is small, AND that all canvas edges are reachable
              by scrolling when the canvas is large.
            */}
            <div className='min-w-full min-h-full w-max flex items-center justify-center p-4'>
              <div className='relative'>
                <canvas
                  ref={canvasRef}
                  className='cursor-crosshair select-none touch-none'
                  style={{
                    width: canvasDisplayW,
                    height: canvasDisplayH,
                    imageRendering: 'pixelated',
                  }}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handleCanvasPointerMove}
                  onPointerLeave={clearCanvasHoverPreview}
                  onContextMenu={(e) => e.preventDefault()}
                />
                {showCollidables && (
                  <canvas
                    ref={collidableCanvasRef}
                    className='absolute top-0 left-0 pointer-events-none'
                    style={{
                      width: canvasDisplayW,
                      height: canvasDisplayH,
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Floating undo/redo + zoom — outside the scroll container so they stay anchored */}
          <div className='absolute bottom-2 right-2 z-10 flex items-center gap-1.5'>
            <button
              type='button'
              onClick={undo}
              disabled={undoStackRef.current.length === 0}
              className='w-7 h-7 flex items-center justify-center rounded bg-slate-200/80 hover:bg-slate-300 dark:bg-dark-tertiary/80 dark:hover:bg-dark-tertiary text-slate-600 dark:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition'
              title='Undo (Ctrl+Z)'
            >
              <svg
                className='w-4 h-4'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M3 7h10a5 5 0 0 1 0 10H9' />
                <path d='M3 7l4-4M3 7l4 4' />
              </svg>
            </button>
            <button
              type='button'
              onClick={redo}
              disabled={redoStackRef.current.length === 0}
              className='w-7 h-7 flex items-center justify-center rounded bg-slate-200/80 hover:bg-slate-300 dark:bg-dark-tertiary/80 dark:hover:bg-dark-tertiary text-slate-600 dark:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition'
              title='Redo (Ctrl+Shift+Z)'
            >
              <svg
                className='w-4 h-4'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M21 7H11a5 5 0 0 0 0 10h4' />
                <path d='M21 7l-4-4M21 7l-4 4' />
              </svg>
            </button>
            <div className='w-px h-5 bg-slate-300 dark:bg-slate-600' />
            <button
              type='button'
              onClick={zoomOut}
              disabled={!canZoomOut}
              className='w-7 h-7 flex items-center justify-center rounded bg-slate-200/80 hover:bg-slate-300 dark:bg-dark-tertiary/80 dark:hover:bg-dark-tertiary text-slate-600 dark:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition'
              title='Zoom out'
            >
              <svg className='w-3.5 h-3.5' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <circle cx='11' cy='11' r='8' />
                <path d='M21 21l-4.35-4.35M8 11h6' />
              </svg>
            </button>
            <button
              type='button'
              onClick={zoomIn}
              disabled={!canZoomIn}
              className='w-7 h-7 flex items-center justify-center rounded bg-slate-200/80 hover:bg-slate-300 dark:bg-dark-tertiary/80 dark:hover:bg-dark-tertiary text-slate-600 dark:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition'
              title='Zoom in'
            >
              <svg className='w-3.5 h-3.5' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <circle cx='11' cy='11' r='8' />
                <path d='M21 21l-4.35-4.35M11 8v6M8 11h6' />
              </svg>
            </button>
          </div>
        </div>

        {/* Footer bar */}
        <div className='h-10 flex items-center px-3 bg-white/80 dark:bg-dark-secondary/80 border-t border-slate-200 dark:border-slate-700 shrink-0'>
          {/* Left: grid size + cursor coords */}
          <div className='flex items-center gap-1.5 flex-1 min-w-0'>
            <input
              key={`w-${tilemap.width}`}
              type='number'
              defaultValue={tilemap.width}
              onBlur={(e) => handleGridResize('width', e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
              min={1}
              max={128}
              className='w-10 h-6 px-1 text-xs text-slate-700 dark:text-slate-300 text-center bg-white border border-slate-200 dark:bg-dark-tertiary dark:border-slate-600 rounded outline-none focus:border-primary-green [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
              title='Grid width (tiles)'
            />
            <span className='text-slate-500 dark:text-slate-400 text-xs'>x</span>
            <input
              key={`h-${tilemap.height}`}
              type='number'
              defaultValue={tilemap.height}
              onBlur={(e) => handleGridResize('height', e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
              min={1}
              max={128}
              className='w-10 h-6 px-1 text-xs text-slate-700 dark:text-slate-300 text-center bg-white border border-slate-200 dark:bg-dark-tertiary dark:border-slate-600 rounded outline-none focus:border-primary-green [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
              title='Grid height (tiles)'
            />
            <span className='text-slate-300 dark:text-slate-600 mx-1'>|</span>
            <span className='text-xs text-slate-500 dark:text-slate-400 tabular-nums'>
              {hoverCell ? `${hoverCell.col}, ${hoverCell.row}` : '\u2014'}
            </span>
          </div>

          {/* Right: tilemap name */}
          <span className='text-xs text-slate-500 dark:text-slate-400 font-medium truncate px-2 flex-1 min-w-0 text-right'>{tilemap.name}</span>
        </div>
      </div>
    </div>
  );
};

function normalizeTilesetData(data: (string | null)[][]): (string | null)[][] {
  const rowCount = Math.max(1, data.length);
  return Array.from({ length: rowCount }, (_, row) =>
    Array.from({ length: TILESET_WIDTH }, (_, col) => data[row]?.[col] ?? null),
  );
}

function findFirstTileCell(tileset: Tileset): { row: number; col: number; tileKey: string } | null {
  for (let row = 0; row < tileset.data.length; row++) {
    for (let col = 0; col < TILESET_WIDTH; col++) {
      const tileKey = tileset.data[row]?.[col] ?? null;
      if (tileKey) {
        return { row, col, tileKey };
      }
    }
  }
  return null;
}

export default TilemapEditor;
