'use client';

import { useEffect, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { Button } from '../ui/Button';
import { useGeckodeStore } from '@/stores/geckodeStore';
import { createUniqueTextureName } from '@/stores/slices/spriteSlice';
import { PixelEditorToolbar } from '@/components/PixelEditorToolbar';
import { type Tool } from '../SpriteModal/EditorTools';
import { PixelCanvasEditorLayout } from '@/components/PixelCanvasEditorLayout';
import { useCanvasZoom } from '@/hooks/useCanvasZoom';
import { usePixelCanvas } from '@/hooks/usePixelCanvas';
import { usePixelEditorDrawing } from '@/hooks/usePixelEditorDrawing';

const TileEditor = ({ onClose }: { onClose: () => void }) => {
  // --- UI state (drives rendering) ---
  const [tileName, setTileName] = useState('myTile');
  const [brushSize, setBrushSize] = useState(1);
  const [primaryColor, setPrimaryColor] = useState('#10b981');
  const [secondaryColor, setSecondaryColor] = useState('#3b82f6');
  const [activeTool, setActiveTool] = useState<Tool>('pen');
  const [gridWidth, setGridWidth] = useState(16);
  const [gridHeight, setGridHeight] = useState(16);

  // --- Zustand selectors ---
  const libaryTiles = useGeckodeStore((s) => s.libaryTiles);
  const tiles = useGeckodeStore((s) => s.tiles);
  const editingSource = useGeckodeStore((s) => s.editingSource);
  const editingAssetName = useGeckodeStore((s) => s.editingAssetName);
  const editingAssetType = useGeckodeStore((s) => s.editingAssetType);

  // --- Custom hooks ---
  const { cellSize, zoomIn, zoomOut, canZoomIn, canZoomOut, canvasContainerRef, scrollContainerRef } = useCanvasZoom(gridWidth, gridHeight, { zoomStep: 10 });

  // Integer display dimensions so canvas internal resolution matches CSS size (1:1 scaling).
  // Avoids checkerboard 2x2 chunk artifacts from non-integer scale factors.
  const canvasDisplayW = Math.round(gridWidth * cellSize);
  const canvasDisplayH = Math.round(gridHeight * cellSize);

  const { canvasRef, previewRef, outputPixelsRef, previewPixelsRef, hoverRectRef, requestRender, saveToHistory, undo, redo, clearCanvas, resetPixelArrays } = usePixelCanvas(gridWidth, gridHeight, cellSize, 0.5, {
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
    const offset = Math.floor(brushSize / 2);
    hoverRectRef.current = {
      x0: Math.max(0, x - offset),
      y0: Math.max(0, y - offset),
      x1: Math.min(gridWidth, x - offset + brushSize),
      y1: Math.min(gridHeight, y - offset + brushSize),
    };
    requestRender();
  };

  const clearHover = () => {
    hoverRectRef.current = null;
    requestRender();
  };

  // --- Save / Load ---
  const saveTileToAssets = () => {
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
      const allTiles = useGeckodeStore.getState().tiles;
      const uniqueName = createUniqueTextureName(tileName, allTiles);
      useGeckodeStore.getState().setAsset(uniqueName, base64Image, 'tiles');
    } else if (editingSource === 'asset') {
      useGeckodeStore.getState().setAsset(editingAssetName!, base64Image, 'tiles');
    }

    useGeckodeStore.setState({ editingSource: null, editingAssetName: null, editingAssetType: null });
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

    const textureInfo =
      editingSource === 'library'
        ? libaryTiles[editingAssetName]
        : tiles[editingAssetName];
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
      setTileName(editingAssetName);
      requestRender();
    };
    img.src = textureInfo;
  }, [editingSource, editingAssetName, libaryTiles, tiles]);

  // --- Grid resize handler (used by uncontrolled inputs) ---
  const handleGridResize = (dimension: 'width' | 'height', value: string) => {
    if (value === '') return;
    const parsed = Math.max(1, Math.min(1024, parseInt(value, 10)));
    if (Number.isNaN(parsed)) return;
    const newW = dimension === 'width' ? parsed : gridWidth;
    const newH = dimension === 'height' ? parsed : gridHeight;
    if (newW === gridWidth && newH === gridHeight) return;
    resetPixelArrays(newW, newH);
    if (dimension === 'width') setGridWidth(parsed);
    else setGridHeight(parsed);
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
          clearButton={{ onClick: clearCanvas }}
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

        {/* Bottom row; preview, name, and add to game */}
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
            placeholder="Sprite name"
            className="flex-1 h-9 px-3 rounded bg-slate-600 border border-slate-500 text-sm text-white placeholder:text-slate-400 outline-none focus:border-primary-green"
          />
          <Button
            className="btn-confirm h-9 px-4"
            onClick={saveTileToAssets}
            title="Save to assets"
          >
            Save to Assets
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TileEditor;
