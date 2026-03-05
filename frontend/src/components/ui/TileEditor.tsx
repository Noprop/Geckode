'use client';

import { useEffect, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { Button } from '../ui/Button';
import { useGeckodeStore } from '@/stores/geckodeStore';
import { createUniqueTextureName, getLibraryTileDisplayName, LIBRARY_TILE_PREFIX } from '@/stores/slices/spriteSlice';
import { PixelEditorToolbar } from '@/components/PixelEditorToolbar';
import { type Tool } from '../SpriteModal/EditorTools';
import { PixelCanvasEditorLayout } from '@/components/PixelCanvasEditorLayout';
import { useCanvasZoom } from '@/hooks/useCanvasZoom';
import { usePixelCanvas } from '@/hooks/usePixelCanvas';
import { usePixelEditorDrawing } from '@/hooks/usePixelEditorDrawing';

interface TileEditorProps {
  onClose: () => void;
  onAddTileToSlot?: (tileKey: string) => void;
}

const BRUSH_PREVIEW_TOOLS: Tool[] = ['pen', 'line', 'rectangle', 'oval'];

const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const normalized = hex.trim();
  const fullHex = normalized.length === 4
    ? `#${normalized[1]}${normalized[1]}${normalized[2]}${normalized[2]}${normalized[3]}${normalized[3]}`
    : normalized;
  const match = /^#([0-9a-f]{6})$/i.exec(fullHex);
  if (!match) return null;
  return {
    r: Number.parseInt(match[1].slice(0, 2), 16),
    g: Number.parseInt(match[1].slice(2, 4), 16),
    b: Number.parseInt(match[1].slice(4, 6), 16),
  };
};

const TileEditor = ({ onClose, onAddTileToSlot }: TileEditorProps) => {
  // --- UI state (drives rendering) ---
  const [tileName, setTileName] = useState('myTile');
  const [brushSize, setBrushSize] = useState(1);
  const [primaryColor, setPrimaryColor] = useState('#10b981');
  const [secondaryColor, setSecondaryColor] = useState('#3b82f6');
  const [activeTool, setActiveTool] = useState<Tool>('pen');
  const [gridWidth, setGridWidth] = useState(16);
  const [gridHeight, setGridHeight] = useState(16);
  const [isCanvasDirty, setIsCanvasDirty] = useState(false);

  // --- Zustand selectors ---
  const libaryTiles = useGeckodeStore((s) => s.libaryTiles);
  const tiles = useGeckodeStore((s) => s.tiles);
  const editingSource = useGeckodeStore((s) => s.editingSource);
  const editingAssetName = useGeckodeStore((s) => s.editingAssetName);
  const editingAssetType = useGeckodeStore((s) => s.editingAssetType);
  const editingTextureToLoad = useGeckodeStore((s) => s.editingTextureToLoad);

  // --- Custom hooks ---
  const { cellSize, zoomIn, zoomOut, canZoomIn, canZoomOut, canvasContainerRef, scrollContainerRef } = useCanvasZoom(gridWidth, gridHeight, { zoomStep: 10 });

  // Integer display dimensions so canvas internal resolution matches CSS size (1:1 scaling).
  // Avoids checkerboard 2x2 chunk artifacts from non-integer scale factors.
  const canvasDisplayW = Math.round(gridWidth * cellSize);
  const canvasDisplayH = Math.round(gridHeight * cellSize);

  const { canvasRef, previewRef, outputPixelsRef, previewPixelsRef, hoverPixelsRef, hoverEraseMaskRef, clearHoverPreview, requestRender, saveToHistory, undo, redo, clearCanvas, resetPixelArrays } = usePixelCanvas(gridWidth, gridHeight, cellSize, 0.5, {
    canvasSize: { w: canvasDisplayW, h: canvasDisplayH },
  });
  const { canvasPointerDown } = usePixelEditorDrawing({
    canvasRef,
    outputPixelsRef,
    previewPixelsRef,
    requestRender,
    saveToHistory,
    gridWidth,
    gridHeight,
    brushSize,
    primaryColor,
    secondaryColor,
    activeTool,
    setPrimaryColor,
    onMarkDirty: () => setIsCanvasDirty(true),
  });

  const swapColors = () => {
    setPrimaryColor(secondaryColor);
    setSecondaryColor(primaryColor);
  };

  const updateHover = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(((e.clientX - rect.left) / rect.width) * gridWidth);
    const y = Math.floor(((e.clientY - rect.top) / rect.height) * gridHeight);
    if (x < 0 || x >= gridWidth || y < 0 || y >= gridHeight) { clearHover(); return; }

    clearHoverPreview();
    const offset = Math.floor(brushSize / 2);
    const startX = Math.max(0, x - offset);
    const startY = Math.max(0, y - offset);
    const endX = Math.min(gridWidth, x - offset + brushSize);
    const endY = Math.min(gridHeight, y - offset + brushSize);

    if (activeTool === 'eraser') {
      const hoverEraseMask = hoverEraseMaskRef.current;
      for (let py = startY; py < endY; py++) {
        for (let px = startX; px < endX; px++) {
          hoverEraseMask[py * gridWidth + px] = 1;
        }
      }
      requestRender();
      return;
    }

    if (!BRUSH_PREVIEW_TOOLS.includes(activeTool)) {
      requestRender();
      return;
    }

    const useSecondaryColor = (e.buttons & 2) === 2 || e.button === 2;
    const previewColor = useSecondaryColor ? secondaryColor : primaryColor;
    const rgb = hexToRgb(previewColor);
    if (!rgb) {
      requestRender();
      return;
    }

    const hoverPixels = hoverPixelsRef.current;
    for (let py = startY; py < endY; py++) {
      for (let px = startX; px < endX; px++) {
        const idx = (py * gridWidth + px) * 4;
        hoverPixels[idx] = rgb.r;
        hoverPixels[idx + 1] = rgb.g;
        hoverPixels[idx + 2] = rgb.b;
        hoverPixels[idx + 3] = 255;
      }
    }
    requestRender();
  };

  const clearHover = () => {
    clearHoverPreview();
    requestRender();
  };

  useEffect(() => {
    if (!activeTool) return;
    clearHoverPreview();
    requestRender();
  }, [activeTool, clearHoverPreview, requestRender]);

  // --- Save / Load ---
  const saveTileToAssets = () => {
    // Library + no edits: use library key directly, no copy to My Assets
    if (editingSource === 'library' && editingAssetName && !isCanvasDirty) {
      onAddTileToSlot?.(editingAssetName);
      useGeckodeStore.setState({ editingSource: null, editingAssetName: null, editingAssetType: null, editingTextureToLoad: null });
      onClose();
      return;
    }

    const w = gridWidth;
    const h = gridHeight;
    const offscreen = document.createElement('canvas');
    offscreen.width = w;
    offscreen.height = h;
    const ctx = offscreen.getContext('2d')!;
    const imageData = ctx.createImageData(w, h);
    imageData.data.set(outputPixelsRef.current);
    ctx.putImageData(imageData, 0, 0);
    const base64Image = offscreen.toDataURL('image/png');

    if (editingSource === 'new' || editingSource === 'library') {
      const allTiles = useGeckodeStore.getState().getTilesForRendering();
      const uniqueName = createUniqueTextureName(tileName, allTiles);
      useGeckodeStore.getState().setAsset(uniqueName, base64Image, 'tiles');
      onAddTileToSlot?.(uniqueName);
    } else if (editingSource === 'asset') {
      // Editing a library tile from the tileset: create new asset, don't save to lib: key
      if (editingAssetName!.startsWith(LIBRARY_TILE_PREFIX)) {
        const allTiles = useGeckodeStore.getState().getTilesForRendering();
        const uniqueName = createUniqueTextureName(tileName, allTiles);
        useGeckodeStore.getState().setAsset(uniqueName, base64Image, 'tiles');
        onAddTileToSlot?.(uniqueName);
      } else {
        useGeckodeStore.getState().setAsset(editingAssetName!, base64Image, 'tiles');
      }
    }

    useGeckodeStore.setState({ editingSource: null, editingAssetName: null, editingAssetType: null, editingTextureToLoad: null });
    onClose();
  };

  // Load existing texture when editing from library or asset
  useEffect(() => {
    if (
      editingSource === null ||
      editingAssetName === null ||
      editingAssetType !== 'tiles' ||
      !canvasRef.current
    )
      return;

    // When editing an asset and user picked a library texture, load that but keep save target as editingAssetName
    const textureInfo =
      editingTextureToLoad != null
        ? (libaryTiles[editingTextureToLoad] ?? tiles[editingTextureToLoad])
        : editingSource === 'library'
          ? libaryTiles[editingAssetName]
          : (tiles[editingAssetName] ?? libaryTiles[editingAssetName]);
    if (!textureInfo) return;

    const img = new Image();
    img.onload = () => {
      const width = img.width;
      const height = img.height;

      setGridWidth(width);
      setGridHeight(height);

      const offscreen = document.createElement("canvas");
      offscreen.width = width;
      offscreen.height = height;
      const offCtx = offscreen.getContext("2d")!;
      offCtx.drawImage(img, 0, 0);
      const imageData = offCtx.getImageData(0, 0, width, height);

      resetPixelArrays(width, height);
      outputPixelsRef.current = new Uint8ClampedArray(imageData.data);
      setTileName(editingAssetName.startsWith(LIBRARY_TILE_PREFIX) ? getLibraryTileDisplayName(editingAssetName) : editingAssetName);
      setIsCanvasDirty(false);
      requestRender();
    };
    img.src = textureInfo;
  }, [editingSource, editingAssetName, editingTextureToLoad, libaryTiles, tiles]);

  // --- Grid resize handler (used by uncontrolled inputs) ---
  const handleGridResize = (dimension: 'width' | 'height', value: string) => {
    if (value === '') return;
    const parsed = Math.max(1, Math.min(1024, parseInt(value, 10)));
    if (Number.isNaN(parsed)) return;
    const newW = dimension === 'width' ? parsed : gridWidth;
    const newH = dimension === 'height' ? parsed : gridHeight;
    if (newW === gridWidth && newH === gridHeight) return;
    resetPixelArrays(newW, newH);
    setIsCanvasDirty(true);
    if (dimension === 'width') setGridWidth(parsed);
    else setGridHeight(parsed);
  };

  const handleClearCanvas = () => {
    clearCanvas();
    setIsCanvasDirty(true);
  };

  return (
    <div className="flex-1 min-h-0 flex border-t border-slate-200 bg-slate-800 dark:border-slate-700">
      <PixelEditorToolbar
        brushSize={brushSize}
        setBrushSize={setBrushSize}
        activeTool={activeTool}
        setActiveTool={setActiveTool}
        primaryColor={primaryColor}
        setPrimaryColor={setPrimaryColor}
        secondaryColor={secondaryColor}
        swapColors={swapColors}
        gridWidth={gridWidth}
        gridHeight={gridHeight}
        onGridResize={handleGridResize}
      />

      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <PixelCanvasEditorLayout
          canvasContainerRef={canvasContainerRef}
          scrollContainerRef={scrollContainerRef}
          undo={undo}
          redo={redo}
          zoomIn={zoomIn}
          zoomOut={zoomOut}
          canZoomIn={canZoomIn}
          canZoomOut={canZoomOut}
          clearButton={{ onClick: handleClearCanvas }}
        >
          <canvas
            ref={canvasRef}
            className="cursor-crosshair select-none touch-none"
            style={{
              width: canvasDisplayW,
              height: canvasDisplayH,
              imageRendering: 'pixelated',
            }}
            onPointerDown={canvasPointerDown}
            onPointerMove={updateHover}
            onPointerLeave={clearHover}
            onContextMenu={(e) => e.preventDefault()}
          />
        </PixelCanvasEditorLayout>

        {/* Bottom row; preview, name, and add to tilemap */}
        <div className="h-16 flex items-center gap-3 px-4 bg-slate-700 dark:bg-slate-800 border-t border-slate-600 shrink-0">
          <canvas
            ref={previewRef}
            className="w-10 h-10 rounded border border-slate-500"
            style={{ imageRendering: 'pixelated' }}
          />
          <input
            type="text"
            value={tileName}
            onChange={(e) => setTileName(e.target.value)}
            placeholder="Tile name"
            className="flex-1 h-9 px-3 rounded bg-slate-600 border border-slate-500 text-sm text-white placeholder:text-slate-400 outline-none focus:border-primary-green"
          />
          <Button
            className="btn-confirm h-9 px-4"
            onClick={saveTileToAssets}
            title={
              editingSource === 'asset' && editingAssetName && !editingAssetName.startsWith(LIBRARY_TILE_PREFIX)
                ? 'Save changes'
                : 'Add to tilemap'
            }
          >
            {editingSource === 'asset' && editingAssetName && !editingAssetName.startsWith(LIBRARY_TILE_PREFIX)
              ? 'Save'
              : 'Add to tilemap'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TileEditor;
