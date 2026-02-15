"use client";

import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useCallback, useEffect, useRef, useState } from "react";
import TileEditorModal from "@/components/TileModal/TileEditorModal";
import type { TileDragData } from "@/components/ui/tileset-dnd";
import {
  DraggableTile,
  DragOverlay,
  DroppableTileCell,
  TileDragOverlay,
} from "@/components/ui/tileset-dnd";
import {
  rebuildPixelBuffer,
  useTilePixelCache,
} from "@/hooks/useTilePixelCache";
import type { Tileset } from "@/stores/geckodeStore";
import { useGeckodeStore } from "@/stores/geckodeStore";

const TILE_PX = 16;
const GRID_W = 5;
const DEFAULT_GRID_H = 5;
const TILES_PER_PAGE = 9;

const createEmptyGrid = (rows = DEFAULT_GRID_H): (string | null)[][] =>
  Array.from({ length: rows }, () =>
    Array.from({ length: GRID_W }, () => null),
  );

const normalizeGrid = (grid: (string | null)[][]): (string | null)[][] => {
  const rowCount = Math.max(DEFAULT_GRID_H, grid.length || 0);
  return Array.from({ length: rowCount }, (_, row) =>
    Array.from({ length: GRID_W }, (_, col) => grid[row]?.[col] ?? null),
  );
};

const TilesetEditor = ({ onClose }: { onClose: () => void }) => {
  const [selectedTileKey, setSelectedTileKey] = useState<string | null>(null);
  const [tilesetName, setTilesetName] = useState("myTileset");
  const [tilePage, setTilePage] = useState(0);
  const [isTileEditorOpen, setIsTileEditorOpen] = useState(false);
  const [activeDragData, setActiveDragData] = useState<TileDragData | null>(
    null,
  );

  // Local grid data (not in store until saved)
  const gridRef = useRef<(string | null)[][]>(createEmptyGrid());
  const [_gridVersion, setGridVersion] = useState(0);
  const bumpGrid = () => setGridVersion((v) => v + 1);

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
  const pagedTileKeys = tileKeys.slice(
    tilePage * TILES_PER_PAGE,
    (tilePage + 1) * TILES_PER_PAGE,
  );
  const gridHeight = Math.max(DEFAULT_GRID_H, gridRef.current.length);

  // ── History ──
  const saveToHistory = useCallback(() => {
    undoStackRef.current.push(gridRef.current.map((r) => [...r]));
    if (undoStackRef.current.length > MAX_HISTORY) undoStackRef.current.shift();
    redoStackRef.current = [];
    setHistoryVersion((v) => v + 1);
  }, []);

  const undo = useCallback(() => {
    if (undoStackRef.current.length === 0) return;
    redoStackRef.current.push(gridRef.current.map((r) => [...r]));
    gridRef.current = undoStackRef.current.pop()!;
    setHistoryVersion((v) => v + 1);
    bumpGrid();
  }, []);

  const redo = useCallback(() => {
    if (redoStackRef.current.length === 0) return;
    undoStackRef.current.push(gridRef.current.map((r) => [...r]));
    gridRef.current = redoStackRef.current.pop()!;
    setHistoryVersion((v) => v + 1);
    bumpGrid();
  }, []);

  // ── Keyboard undo/redo ──
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if (mod && e.key === "z" && e.shiftKey) {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo]);

  // ── Load existing tileset when editing ──
  useEffect(() => {
    if (!editingSource || !editingAssetName || editingAssetType !== "tilesets")
      return;
    const tileset = tilesets.find((ts) => ts.id === editingAssetName);
    if (!tileset) return;
    gridRef.current = normalizeGrid(tileset.data);
    setTilesetName(tileset.name);
    undoStackRef.current = [];
    redoStackRef.current = [];
    setHistoryVersion((v) => v + 1);
    bumpGrid();
  }, [editingSource, editingAssetName, editingAssetType, tilesets]);

  // ── dnd-kit sensors & handlers ──
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const handleDndDragStart = useCallback((event: DragStartEvent) => {
    const data = event.active.data.current as TileDragData | undefined;
    if (data) setActiveDragData(data);
  }, []);

  const handleDndDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveDragData(null);
      const { active, over } = event;
      if (!over) return;

      const srcData = active.data.current as TileDragData | undefined;
      if (!srcData) return;

      // Parse destination cell id: "grid-cell-{row}-{col}"
      const parts = (over.id as string).split("-");
      const destRow = parseInt(parts[2], 10);
      const destCol = parseInt(parts[3], 10);
      if (Number.isNaN(destRow) || Number.isNaN(destCol)) return;

      saveToHistory();
      if (srcData.source === "palette") {
        gridRef.current[destRow][destCol] = srcData.tileKey;
      } else if (srcData.source === "grid") {
        if (srcData.row !== undefined && srcData.col !== undefined) {
          gridRef.current[srcData.row][srcData.col] = null;
        }
        gridRef.current[destRow][destCol] = srcData.tileKey;
      }
      bumpGrid();
    },
    [saveToHistory],
  );

  const handleCellContextMenu = (
    e: React.MouseEvent,
    row: number,
    col: number,
  ) => {
    e.preventDefault();
    if (gridRef.current[row][col] !== null) {
      saveToHistory();
      gridRef.current[row][col] = null;
      bumpGrid();
    }
  };

  // ── Generate preview base64 ──
  const generatePreviewBase64 = useCallback((): string => {
    if (!isReady) return "";
    const normalizedGrid = normalizeGrid(gridRef.current);
    const pixelW = GRID_W * TILE_PX;
    const pixelH = normalizedGrid.length * TILE_PX;
    const off = document.createElement("canvas");
    off.width = pixelW;
    off.height = pixelH;
    const ctx = off.getContext("2d")!;
    const buf = new Uint8ClampedArray(pixelW * pixelH * 4);
    rebuildPixelBuffer(
      buf,
      normalizedGrid,
      tilePixelsRef.current,
      GRID_W,
      normalizedGrid.length,
      TILE_PX,
    );
    const imgData = ctx.createImageData(pixelW, pixelH);
    imgData.data.set(buf);
    ctx.putImageData(imgData, 0, 0);
    return off.toDataURL("image/png");
  }, [isReady, tilePixelsRef]);

  // ── Save ──
  const saveTileset = () => {
    const base64Preview = generatePreviewBase64();
    const id =
      editingSource === "asset" && editingAssetName
        ? editingAssetName
        : `tileset_${Date.now()}`;

    const tileset: Tileset = {
      id,
      name: tilesetName,
      data: normalizeGrid(gridRef.current),
      base64Preview,
    };

    if (editingSource === "asset" && editingAssetName) {
      updateTileset(editingAssetName, tileset);
    } else {
      addTileset(tileset);
    }

    useGeckodeStore.setState({
      editingSource: null,
      editingAssetName: null,
      editingAssetType: null,
    });
    onClose();
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDndDragStart}
      onDragEnd={handleDndDragEnd}
    >
      <div className="flex-1 min-h-0 flex bg-light-secondary dark:bg-dark-secondary h-full">
        <TileEditorModal
          isOpen={isTileEditorOpen}
          onClose={() => setIsTileEditorOpen(false)}
        />
        {/* Left sidebar */}
        <div className="w-[250px] flex flex-col gap-3 p-2 bg-white/50 dark:bg-dark-secondary/50 border-r border-slate-200 dark:border-slate-700">
          {/* Tile palette with pagination */}
          <div className="flex flex-col gap-1">
            <span className="text-sm text-slate-600 dark:text-slate-300 font-semibold px-0.5">
              Tiles
            </span>

            {/* Pagination arrows + grid */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setTilePage((p) => Math.max(0, p - 1))}
                disabled={tilePage === 0}
                className="w-6 h-6 flex items-center justify-center rounded text-slate-500 hover:bg-slate-200 dark:hover:bg-dark-tertiary disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition"
                title="Previous page"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <div className="grid grid-cols-3 gap-[2px] flex-1">
                {pagedTileKeys.map((key) => (
                  <DraggableTile
                    key={key}
                    id={`palette-${key}`}
                    data={{ tileKey: key, source: "palette" }}
                    className={`aspect-square transition-colors overflow-hidden ${
                      selectedTileKey === key
                        ? "border-2 border-primary-green"
                        : "border-2 border-transparent hover:border-slate-400 dark:hover:border-slate-500"
                    }`}
                    onClick={() => setSelectedTileKey(key)}
                    onDoubleClick={() => {
                      setEditingAsset(key, "tiles", "asset");
                      setIsTileEditorOpen(true);
                    }}
                  >
                    <img
                      src={tileTextures[key]}
                      alt={key}
                      className="w-full h-full object-cover pointer-events-none"
                      style={{ imageRendering: "pixelated" }}
                    />
                  </DraggableTile>
                ))}
              </div>

              <button
                type="button"
                onClick={() =>
                  setTilePage((p) => Math.min(totalPages - 1, p + 1))
                }
                disabled={tilePage >= totalPages - 1}
                className="w-6 h-6 flex items-center justify-center rounded text-slate-500 hover:bg-slate-200 dark:hover:bg-dark-tertiary disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition"
                title="Next page"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
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
                      i === tilePage
                        ? "bg-primary-green"
                        : "bg-slate-300 dark:bg-slate-600"
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
              onClick={() =>
                setTileCollidable(
                  selectedTileKey,
                  !tileCollidables[selectedTileKey],
                )
              }
              className={`flex items-center gap-2 px-3 py-2 rounded text-xs font-medium cursor-pointer transition ${
                tileCollidables[selectedTileKey]
                  ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  : "bg-slate-100 text-slate-600 dark:bg-dark-tertiary dark:text-slate-300"
              }`}
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              {tileCollidables[selectedTileKey]
                ? "Collidable"
                : "Not collidable"}
              {tileCollidables[selectedTileKey] && (
                <span className="w-2 h-2 rounded-full bg-red-500 ml-auto" />
              )}
            </button>
          )}

          <div className="flex-1" />
        </div>

        {/* Main area — 5xN CSS grid */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <div className="relative flex-1 flex items-center justify-center bg-light-whiteboard dark:bg-dark-whiteboard p-4 overflow-auto min-h-0">
            <div
              className="grid gap-1"
              style={{
                gridTemplateColumns: `repeat(${GRID_W}, 1fr)`,
                gridTemplateRows: `repeat(${gridHeight}, 1fr)`,
                width: "min(400px, 60vh)",
                aspectRatio: `${GRID_W} / ${gridHeight}`,
              }}
            >
              {Array.from({ length: gridHeight }, (_, row) =>
                Array.from({ length: GRID_W }, (_, col) => {
                  const tileKey = gridRef.current[row]?.[col];
                  const cellId = `grid-cell-${row}-${col}`;
                  return (
                    <DroppableTileCell
                      key={cellId}
                      id={cellId}
                      className={`relative flex items-center justify-center rounded transition-colors ${
                        tileKey
                          ? "bg-slate-100 dark:bg-dark-tertiary"
                          : "bg-slate-50 dark:bg-dark-tertiary/50 border-2 border-dashed border-slate-300 dark:border-slate-600"
                      }`}
                      onContextMenu={(e) => handleCellContextMenu(e, row, col)}
                    >
                      {tileKey && tileTextures[tileKey] ? (
                        <DraggableTile
                          id={`grid-drag-${row}-${col}`}
                          data={{ tileKey, row, col, source: "grid" }}
                          className="w-full h-full"
                        >
                          <img
                            src={tileTextures[tileKey]}
                            alt={tileKey}
                            className="w-full h-full object-contain"
                            style={{ imageRendering: "pixelated" }}
                          />
                        </DraggableTile>
                      ) : null}
                    </DroppableTileCell>
                  );
                }),
              )}
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
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
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
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
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

      <DragOverlay dropAnimation={null}>
        {activeDragData?.tileKey && tileTextures[activeDragData.tileKey] ? (
          <TileDragOverlay
            tileKey={activeDragData.tileKey}
            textureSrc={tileTextures[activeDragData.tileKey]}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default TilesetEditor;
