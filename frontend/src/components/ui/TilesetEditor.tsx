'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useGeckodeStore } from '@/stores/geckodeStore';
import type { Tileset } from '@/stores/geckodeStore';
import {
  useTilePixelCache,
  rebuildPixelBuffer,
} from '@/hooks/useTilePixelCache';
import TileEditorModal from '@/components/TileModal/TileEditorModal';
import { PlusIcon, ShieldBanIcon } from 'lucide-react';

const TILE_PX = 16;
const GRID_W = 5;
const DEFAULT_GRID_H = 5;
const TILES_PER_PAGE = 9;

const createEmptyGrid = (rows = DEFAULT_GRID_H): (string | null)[][] =>
  Array.from({ length: rows }, () => Array.from({ length: GRID_W }, () => null));

const normalizeGrid = (grid: (string | null)[][]): (string | null)[][] => {
  const rowCount = Math.max(DEFAULT_GRID_H, grid.length || 0);
  return Array.from({ length: rowCount }, (_, row) =>
    Array.from({ length: GRID_W }, (_, col) => grid[row]?.[col] ?? null),
  );
};

type TilesetTool = 'place' | 'collidable';

const TilesetEditor = ({ onClose }: { onClose: () => void }) => {
  const [selectedTileKey, setSelectedTileKey] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<TilesetTool>('place');
  const [tilesetName, setTilesetName] = useState('myTileset');
  const [tilePage, setTilePage] = useState(0);
  const [isTileEditorOpen, setIsTileEditorOpen] = useState(false);
  const [dragOverCell, setDragOverCell] = useState<{ row: number; col: number } | null>(null);

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

  // For preview generation only
  const { tilePixelsRef, isReady } = useTilePixelCache(tileTextures);

  // Auto-select first tile
  useEffect(() => {
    if (!selectedTileKey) {
      const keys = Object.keys(tileTextures);
      if (keys.length > 0) setSelectedTileKey(keys[0]);
    }
  }, [tileTextures, selectedTileKey]);

  // Tile palette pagination
  const tileKeys = Object.keys(tileTextures);
  const totalPages = Math.max(1, Math.ceil(tileKeys.length / TILES_PER_PAGE));
  const pagedTileKeys = tileKeys.slice(tilePage * TILES_PER_PAGE, (tilePage + 1) * TILES_PER_PAGE);
  const gridHeight = Math.max(DEFAULT_GRID_H, gridRef.current.length);

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

  // ── Load existing tileset when editing ──
  useEffect(() => {
    if (!editingSource || !editingAssetName || editingAssetType !== 'tilesets') return;
    const tileset = tilesets.find((ts) => ts.id === editingAssetName);
    if (!tileset) return;
    gridRef.current = normalizeGrid(tileset.data);
    setTilesetName(tileset.name);
    undoStackRef.current = [];
    redoStackRef.current = [];
    setHistoryVersion(v => v + 1);
    bumpGrid();
  }, [editingSource, editingAssetName, editingAssetType, tilesets]);

  // ── Collidable tool click ──
  const handleCellClick = (row: number, col: number) => {
    if (activeTool !== 'collidable') return;
    const tileKey = gridRef.current[row]?.[col];
    if (!tileKey) return;
    setTileCollidable(tileKey, !tileCollidables[tileKey]);
  };

  // ── Drag & Drop handlers ──
  const handleDragStart = (e: React.DragEvent, source: 'palette' | 'grid', tileKey: string, row?: number, col?: number) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ source, tileKey, row, col }));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, row: number, col: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverCell({ row, col });
  };

  const handleDragLeave = () => {
    setDragOverCell(null);
  };

  const handleDrop = (e: React.DragEvent, destRow: number, destCol: number) => {
    e.preventDefault();
    setDragOverCell(null);
    try {
      const data = JSON.parse(e.dataTransfer.getData('text/plain'));
      saveToHistory();
      if (data.source === 'palette') {
        gridRef.current[destRow][destCol] = data.tileKey;
      } else if (data.source === 'grid') {
        // Move: clear source, set destination
        if (data.row !== undefined && data.col !== undefined) {
          gridRef.current[data.row][data.col] = null;
        }
        gridRef.current[destRow][destCol] = data.tileKey;
      }
      bumpGrid();
    } catch { /* ignore invalid drag data */ }
  };

  const handleCellContextMenu = (e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault();
    if (gridRef.current[row][col] !== null) {
      saveToHistory();
      gridRef.current[row][col] = null;
      bumpGrid();
    }
  };

  const handleAddRow = useCallback(() => {
    saveToHistory();
    gridRef.current.push(Array.from({ length: GRID_W }, () => null));
    bumpGrid();
  }, [saveToHistory]);

  // ── Generate preview base64 ──
  const generatePreviewBase64 = useCallback((): string => {
    if (!isReady) return '';
    const normalizedGrid = normalizeGrid(gridRef.current);
    const pixelW = GRID_W * TILE_PX;
    const pixelH = normalizedGrid.length * TILE_PX;
    const off = document.createElement('canvas');
    off.width = pixelW;
    off.height = pixelH;
    const ctx = off.getContext('2d')!;
    const buf = new Uint8ClampedArray(pixelW * pixelH * 4);
    rebuildPixelBuffer(buf, normalizedGrid, tilePixelsRef.current, GRID_W, normalizedGrid.length, TILE_PX);
    const imgData = ctx.createImageData(pixelW, pixelH);
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
      data: normalizeGrid(gridRef.current),
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
        {/* Tile palette with pagination */}
        <div className="flex flex-col gap-1">
          <span className="text-sm text-slate-600 dark:text-slate-300 font-semibold px-0.5">Tiles</span>

          {/* Tile grid — always 3×3 */}
          <div className="grid grid-cols-3 gap-[2px]">
            {Array.from({ length: TILES_PER_PAGE }, (_, i) => {
              const key = pagedTileKeys[i];
              if (!key) {
                return <div key={`empty-${i}`} className="aspect-square" />;
              }
              return (
                <button
                  key={key}
                  type="button"
                  draggable
                  onDragStart={(e) => handleDragStart(e, 'palette', key)}
                  onClick={() => { setSelectedTileKey(key); setActiveTool('place'); }}
                  onDoubleClick={() => {
                    setEditingAsset(key, 'tiles', 'asset');
                    setIsTileEditorOpen(true);
                  }}
                  className={`aspect-square cursor-grab active:cursor-grabbing transition-colors overflow-hidden ${
                    (selectedTileKey === key && activeTool !== 'collidable')
                      ? 'border-2 border-primary-green'
                      : 'border-2 border-transparent hover:border-slate-400 dark:hover:border-slate-500'
                  }`}
                  title={key}
                >
                  <img
                    src={tileTextures[key]}
                    alt={key}
                    className="w-full h-full object-cover pointer-events-none"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </button>
              );
            })}
          </div>

          {/* Arrows + page dots in one row */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1">
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
          )}
        </div>

        {/* Tool buttons */}
        <div className="flex flex-col gap-1 items-start">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold px-0.5">Tools</span>
          <button
            type="button"
            onClick={() => { setActiveTool('collidable'); setSelectedTileKey(null); }}
            className={`flex items-center gap-2 px-3 py-2 rounded text-xs font-medium cursor-pointer transition ${
              activeTool === 'collidable'
                ? 'bg-primary-green text-white'
                : 'bg-slate-100 text-slate-600 dark:bg-dark-tertiary dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-dark-tertiary/80'
            }`}
            style={{ minWidth: 0, width: 'auto', maxWidth: '100%' }}
            title="Collidable tool — click tiles in the grid to toggle collision"
          >
            <ShieldBanIcon className="w-4 h-4" />
            Collidable
          </button>
        </div>

        <div className="flex-1" />
      </div>

      {/* Main area — 5xN CSS grid */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <div className="relative flex-1 flex flex-col items-center bg-light-whiteboard dark:bg-dark-whiteboard p-4 overflow-auto min-h-0">
          <div className="flex flex-col items-center gap-4 py-4">
            <div
              className="grid gap-1"
              style={{
                gridTemplateColumns: `repeat(${GRID_W}, 1fr)`,
                gridTemplateRows: `repeat(${gridHeight}, 1fr)`,
                width: 'min(400px, 60vh)',
                aspectRatio: `${GRID_W} / ${gridHeight}`,
              }}
            >
              {Array.from({ length: gridHeight }, (_, row) =>
                Array.from({ length: GRID_W }, (_, col) => {
                  const tileKey = gridRef.current[row]?.[col];
                  const isDragOver = dragOverCell?.row === row && dragOverCell?.col === col;
                  return (
                    <div
                      key={`${row}-${col}`}
                      className={`relative flex items-center justify-center rounded transition-colors ${
                        isDragOver
                          ? 'bg-emerald-100 dark:bg-emerald-900/40 ring-2 ring-primary-green'
                          : tileKey
                            ? 'bg-slate-100 dark:bg-dark-tertiary'
                            : 'bg-slate-50 dark:bg-dark-tertiary/50 border-2 border-dashed border-slate-300 dark:border-slate-600'
                        } ${activeTool === 'collidable' && tileKey ? 'cursor-pointer' : ''}`}
                      onDragOver={(e) => handleDragOver(e, row, col)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, row, col)}
                      onContextMenu={(e) => handleCellContextMenu(e, row, col)}
                      onClick={() => handleCellClick(row, col)}
                    >
                      {tileKey && tileTextures[tileKey] ? (
                        <img
                          src={tileTextures[tileKey]}
                          alt={tileKey}
                          draggable={activeTool !== 'collidable'}
                          onDragStart={(e) => handleDragStart(e, 'grid', tileKey, row, col)}
                          className="w-full h-full object-contain pointer-events-none"
                          style={{ imageRendering: 'pixelated' }}
                        />
                      ) : null}
                      {tileKey && tileCollidables[tileKey] && (
                        <div className="absolute inset-0 bg-red-500/30 flex items-center justify-center rounded pointer-events-none">
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            <button
              type="button"
              onClick={handleAddRow}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:border-primary-green hover:text-primary-green dark:hover:border-primary-green dark:hover:text-primary-green transition-colors text-sm font-medium"
              title="Add row"
            >
              <PlusIcon className="w-4 h-4" />
              Add row
            </button>
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
        </div>
      </div>
    </div>
  );
};

export default TilesetEditor;
