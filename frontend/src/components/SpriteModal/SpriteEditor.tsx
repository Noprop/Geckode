'use client';

import { useEffect, useRef, useState } from 'react';
import * as Blockly from 'blockly/core';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { Button } from '../ui/Button';
import { useGeckodeStore } from '@/stores/geckodeStore';
import EditorTools from './EditorTools';
import { Display } from 'phaser';
import EditorScene from '@/phaser/scenes/EditorScene';
import GameScene from '@/phaser/scenes/GameScene';
import { useCanvasZoom } from '@/hooks/useCanvasZoom';
import { usePixelCanvas, createPixelArray } from '@/hooks/usePixelCanvas';
import { createUniqueSpriteName, createUniqueTextureName } from '@/stores/slices/spriteSlice';
import type { SpriteInstance } from '@/blockly/spriteRegistry';
import { addSpriteSync } from '@/hooks/yjs/useWorkspaceSync';
export type Tool = 'pen' | 'eraser' | 'bucket' | 'rectangle' | 'line' | 'oval' | 'rectangle-selection' | 'pan-tool' | 'color-picker';

// Convert RGBA values at index to hex (returns '' for transparent)
const rgbaToHex = (data: Uint8ClampedArray, idx: number): string => {
  if (data[idx + 3] === 0) return '';
  const r = data[idx].toString(16).padStart(2, '0');
  const g = data[idx + 1].toString(16).padStart(2, '0');
  const b = data[idx + 2].toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
};

// Set pixel in RGBA array
const setPixel = (data: Uint8ClampedArray, idx: number, color: { r: number; g: number; b: number; a: number } | null) => {
  if (color) {
    data[idx] = color.r;
    data[idx + 1] = color.g;
    data[idx + 2] = color.b;
    data[idx + 3] = color.a;
  } else {
    data[idx] = 0;
    data[idx + 1] = 0;
    data[idx + 2] = 0;
    data[idx + 3] = 0;
  }
};

const palette = [
  '#ffffff',
  '#ef4444',
  '#10b981',
  '#3b82f6',
  '#f97316',
  '#000000',
  '#8b5cf6',
  '#fbbf24',
];

const SpriteEditor = () => {
  // --- UI state (drives rendering) ---
  const [spriteName, setSpriteName] = useState('mySprite');
  const [brushSize, setBrushSize] = useState(1);
  const [primaryColor, setPrimaryColor] = useState('#10b981');
  const [secondaryColor, setSecondaryColor] = useState('#3b82f6');
  const [activeTool, setActiveTool] = useState<Tool>('pen');
  const [gridWidth, setGridWidth] = useState(16);
  const [gridHeight, setGridHeight] = useState(16);

  // --- Zustand selectors ---
  const setIsSpriteModalOpen = useGeckodeStore((s) => s.setIsSpriteModalOpen);
  const saveSprite = useGeckodeStore((s) => s.saveSprite);
  const libaryTextures = useGeckodeStore((s) => s.libaryTextures);
  const textures = useGeckodeStore((s) => s.textures);
  const editingSource = useGeckodeStore((s) => s.editingSource);
  const editingAssetName = useGeckodeStore((s) => s.editingAssetName);
  const phaserScene = useGeckodeStore((s) => s.phaserScene);
  const spriteInstances = useGeckodeStore((s) => s.spriteInstances);

  // --- Custom hooks ---
  const { cellSize, zoomPercent, setZoom, isEditingZoom, setIsEditingZoom, canvasContainerRef, MIN_ZOOM_PERCENT, MAX_ZOOM_PERCENT } = useCanvasZoom(gridWidth, gridHeight);
  const { canvasRef, previewRef, outputPixelsRef, previewPixelsRef, requestRender, saveToHistory, clearCanvas, resetPixelArrays } = usePixelCanvas(gridWidth, gridHeight, cellSize, 0.5);

  // --- Drawing state (single ref, no re-renders) ---
  const drawStateRef = useRef({
    isDrawing: false,
    shapeStart: null as { x: number; y: number } | null,
    prevPos: null as { x: number; y: number } | null,
    activeButton: 0,
    // Mirrors of React state for window event handlers (avoids stale closures)
    activeTool: 'pen' as Tool,
    primaryColor: '#10b981',
    secondaryColor: '#3b82f6',
    brushSize: 1,
    gridWidth: 16,
    gridHeight: 16,
  });

  // Keep the mirror in sync with React state
  useEffect(() => {
    const ds = drawStateRef.current;
    ds.activeTool = activeTool;
    ds.primaryColor = primaryColor;
    ds.secondaryColor = secondaryColor;
    ds.brushSize = brushSize;
    ds.gridWidth = gridWidth;
    ds.gridHeight = gridHeight;
  }, [activeTool, primaryColor, secondaryColor, brushSize, gridWidth, gridHeight]);

  // Swap primary and secondary colors
  const swapColors = () => {
    setPrimaryColor(secondaryColor);
    setSecondaryColor(primaryColor);
  };

  // --- Drawing tools (inline per user preference) ---
  const paintAt = (x: number, y: number, color: string) => {
    const { gridWidth: w, gridHeight: h, brushSize: size } = drawStateRef.current;
    const rgba = Display.Color.HexStringToColor(color);
    const offset = Math.floor(size / 2);
    const layer1 = outputPixelsRef.current;

    for (let dy = 0; dy < size; dy += 1) {
      for (let dx = 0; dx < size; dx += 1) {
        const px = Math.max(0, Math.min(w - 1, x + dx - offset));
        const py = Math.max(0, Math.min(h - 1, y + dy - offset));
        const idx = (py * w + px) * 4;
        setPixel(layer1, idx, { r: rgba.red, g: rgba.green, b: rgba.blue, a: rgba.alpha });
      }
    }
    requestRender();
  };

  const floodFill = (startX: number, startY: number, fillColor: string) => {
    const { gridWidth: w, gridHeight: h } = drawStateRef.current;
    const layer1 = outputPixelsRef.current;
    const fillRgba = Display.Color.HexStringToColor(fillColor);

    const startIdx = (startY * w + startX) * 4;
    const targetR = layer1[startIdx];
    const targetG = layer1[startIdx + 1];
    const targetB = layer1[startIdx + 2];
    const targetA = layer1[startIdx + 3];

    if (fillRgba) {
      if (targetR === fillRgba.red && targetG === fillRgba.green && targetB === fillRgba.blue && targetA === fillRgba.alpha) return;
    } else {
      if (targetA === 0) return;
    }

    const queue: [number, number][] = [[startX, startY]];
    const visited = new Set<number>();

    while (queue.length > 0) {
      const [x, y] = queue.shift()!;
      const pixelIndex = y * w + x;
      if (visited.has(pixelIndex)) continue;
      if (x < 0 || x >= w || y < 0 || y >= h) continue;

      const idx = pixelIndex * 4;
      if (layer1[idx] !== targetR || layer1[idx + 1] !== targetG ||
        layer1[idx + 2] !== targetB || layer1[idx + 3] !== targetA) continue;

      visited.add(pixelIndex);
      setPixel(layer1, idx, { r: fillRgba.red, g: fillRgba.green, b: fillRgba.blue, a: fillRgba.alpha });

      queue.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }
    requestRender();
  };

  // Bresenham's line algorithm
  const getLinePixels = (x0: number, y0: number, x1: number, y1: number) => {
    const pixels: { x: number; y: number }[] = [];
    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1;
    const sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;

    while (true) {
      pixels.push({ x: x0, y: y0 });
      if (x0 === x1 && y0 === y1) break;
      const e2 = 2 * err;
      if (e2 > -dy) { err -= dy; x0 += sx; }
      if (e2 < dx) { err += dx; y0 += sy; }
    }
    return pixels;
  };

  const applyBrush = (pixels: { x: number; y: number }[], color: string, layer: Uint8ClampedArray) => {
    const { brushSize: size, gridWidth: w, gridHeight: h } = drawStateRef.current;
    const offset = Math.floor(size / 2);
    const rgba = Display.Color.HexStringToColor(color);

    for (const p of pixels) {
      for (let dy = 0; dy < size; dy++) {
        for (let dx = 0; dx < size; dx++) {
          const px = Math.max(0, Math.min(w - 1, p.x + dx - offset));
          const py = Math.max(0, Math.min(h - 1, p.y + dy - offset));
          const idx = (py * w + px) * 4;
          setPixel(layer, idx, { r: rgba.red, g: rgba.green, b: rgba.blue, a: rgba.alpha });
        }
      }
    }
  };

  const getRectanglePixels = (x1: number, y1: number, x2: number, y2: number) => {
    const minX = Math.min(x1, x2), maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2), maxY = Math.max(y1, y2);
    const pixels: { x: number; y: number }[] = [];
    for (let x = minX; x <= maxX; x++) { pixels.push({ x, y: minY }, { x, y: maxY }); }
    for (let y = minY + 1; y < maxY; y++) { pixels.push({ x: minX, y }, { x: maxX, y }); }
    return pixels;
  };

  const getOvalPixels = (x1: number, y1: number, x2: number, y2: number) => {
    const { gridWidth: w, gridHeight: h } = drawStateRef.current;
    const cx = (x1 + x2) / 2, cy = (y1 + y2) / 2;
    const rx = Math.abs(x2 - x1) / 2, ry = Math.abs(y2 - y1) / 2;
    if (rx === 0 || ry === 0) return [];
    const pixels: { x: number; y: number }[] = [];
    const steps = Math.max(Math.ceil(2 * Math.PI * Math.max(rx, ry)), 32);
    for (let i = 0; i < steps; i++) {
      const angle = (2 * Math.PI * i) / steps;
      const x = Math.round(cx + rx * Math.cos(angle));
      const y = Math.round(cy + ry * Math.sin(angle));
      if (x >= 0 && x < w && y >= 0 && y < h) pixels.push({ x, y });
    }
    return pixels;
  };

  // --- Pointer helpers ---
  const getPointerPosition = (event: { clientX: number; clientY: number }) => {
    const { gridWidth: w, gridHeight: h } = drawStateRef.current;
    const rect = canvasRef.current!.getBoundingClientRect();
    return {
      x: Math.floor((event.clientX - rect.left) / (rect.width / w)),
      y: Math.floor((event.clientY - rect.top) / (rect.height / h))
    };
  };

  const clipToCanvas = (start: { x: number; y: number }, end: { x: number; y: number }) => {
    const { gridWidth: w, gridHeight: h } = drawStateRef.current;
    const dx = end.x - start.x, dy = end.y - start.y;
    const t = Math.min(1,
      end.x < 0 ? -start.x / dx : end.x >= w ? (w - 1 - start.x) / dx : 1,
      end.y < 0 ? -start.y / dy : end.y >= h ? (h - 1 - start.y) / dy : 1
    );
    return {
      x: Math.max(0, Math.min(w - 1, Math.round(start.x + dx * t))),
      y: Math.max(0, Math.min(h - 1, Math.round(start.y + dy * t)))
    };
  };

  // --- Pointer event handlers ---
  const canvasPointerDown = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const ds = drawStateRef.current;
    const position = getPointerPosition(e);
    ds.prevPos = position;
    ds.activeButton = e.button;
    const color = e.button === 2 ? secondaryColor : primaryColor;

    saveToHistory();

    if (['pen', 'eraser'].includes(activeTool)) {
      paintAt(position.x, position.y, color);
      ds.isDrawing = true;
    } else if (['rectangle', 'line', 'oval'].includes(activeTool)) {
      ds.shapeStart = position;
      ds.isDrawing = true;
    }
    if (activeTool === 'bucket') {
      floodFill(position.x, position.y, color);
    } else if (activeTool === 'color-picker') {
      const idx = (position.y * gridWidth + position.x) * 4;
      const pickedColor = rgbaToHex(outputPixelsRef.current, idx);
      setPrimaryColor(pickedColor);
    }
  };

  const handlePointerMove = (e: PointerEvent | ReactPointerEvent<HTMLCanvasElement>) => {
    const ds = drawStateRef.current;
    if (!ds.isDrawing) return;
    const isShapeTool = ['line', 'rectangle', 'oval'].includes(ds.activeTool);

    const position = getPointerPosition(e);
    const prev = ds.prevPos;
    if (prev && prev.x === position.x && prev.y === position.y) return;
    const color = ds.activeButton === 2 ? ds.secondaryColor : ds.primaryColor;
    ds.prevPos = position;

    // Show shadow for shape tools
    if (isShapeTool && ds.shapeStart) {
      const cp = clipToCanvas(ds.shapeStart, position);
      let pixels: { x: number; y: number }[] = [];
      if (ds.activeTool === 'line') pixels = getLinePixels(ds.shapeStart.x, ds.shapeStart.y, cp.x, cp.y);
      else if (ds.activeTool === 'rectangle') pixels = getRectanglePixels(ds.shapeStart.x, ds.shapeStart.y, cp.x, cp.y);
      else if (ds.activeTool === 'oval') pixels = getOvalPixels(ds.shapeStart.x, ds.shapeStart.y, cp.x, cp.y);

      previewPixelsRef.current = createPixelArray(ds.gridWidth, ds.gridHeight);
      applyBrush(pixels, color, previewPixelsRef.current);
      requestRender();
      return;
    }

    // Paint for pen and eraser
    if (ds.activeTool === 'pen') {
      if (prev && (Math.abs(position.x - prev.x) > 1 || Math.abs(position.y - prev.y) > 1)) {
        getLinePixels(prev.x, prev.y, position.x, position.y).forEach(p => paintAt(p.x, p.y, color));
      } else {
        paintAt(position.x, position.y, color);
      }
    } else if (ds.activeTool === 'eraser') {
      paintAt(position.x, position.y, '');
    }
  };

  const handlePointerUp = (event: PointerEvent) => {
    const ds = drawStateRef.current;
    ds.prevPos = null;

    if (!ds.isDrawing) return;

    // Finalize shape tools
    if (ds.shapeStart && ['line', 'rectangle', 'oval'].includes(ds.activeTool)) {
      const pos = getPointerPosition(event);
      const cp = clipToCanvas(ds.shapeStart, pos);
      const color = ds.activeButton === 2 ? ds.secondaryColor : ds.primaryColor;

      let pixels: { x: number; y: number }[] = [];
      if (ds.activeTool === 'line') pixels = getLinePixels(ds.shapeStart.x, ds.shapeStart.y, cp.x, cp.y);
      else if (ds.activeTool === 'rectangle') pixels = getRectanglePixels(ds.shapeStart.x, ds.shapeStart.y, cp.x, cp.y);
      else if (ds.activeTool === 'oval') pixels = getOvalPixels(ds.shapeStart.x, ds.shapeStart.y, cp.x, cp.y);

      applyBrush(pixels, color, outputPixelsRef.current);
      previewPixelsRef.current = createPixelArray(ds.gridWidth, ds.gridHeight);
    }

    ds.isDrawing = false;
    ds.shapeStart = null;
    requestRender();
  };

  // Window-level pointer tracking
  useEffect(() => {
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  // --- Save / Load ---
  const addSpriteToGame = async () => {
    if (!phaserScene) throw new Error('Phaser scene is not ready.');

    // Read editing state from the live store to avoid stale closure values
    // (the component may have unmounted/remounted when switching tabs)
    const { editingSource: currentEditingSource, editingAssetName: currentEditingAssetName } = useGeckodeStore.getState();

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

    const isEditorScene = phaserScene instanceof EditorScene;

    if (currentEditingSource === 'asset') {
      // Update texture in store (will sync to other clients)
      useGeckodeStore.getState().setAsset(currentEditingAssetName!, base64Image, 'textures');
      
      // Only update Phaser if in EditorScene - GameScene will pick up changes when user switches back
      if (isEditorScene) {
        await phaserScene.updateSpriteTextureAsync(currentEditingAssetName!, base64Image);
      }
    } else {
      const newSpriteName = createUniqueSpriteName(spriteName, spriteInstances);
      const newTextureName = createUniqueTextureName(spriteName, textures);

      const newSprite: SpriteInstance = {
        name: newSpriteName,
        textureName: newTextureName,
        id: `id_${Date.now()}`,
        x: 0,
        y: 0,
        visible: true,
        scaleX: 1,
        scaleY: 1,
        direction: 0,
        snapToGrid: true,
      };

      // Add texture to state (will sync to other clients)
      useGeckodeStore.getState().setAsset(newTextureName, base64Image, 'textures');
      
      // Only manipulate Phaser sprites in EditorScene
      if (isEditorScene) {
        await phaserScene.loadSpriteTextureAsync(newTextureName, base64Image);
        phaserScene.createSprite(newSprite);
      }

      // Add sprite to state and sync (will be created in EditorScene when user switches back)
      useGeckodeStore.setState((s) => ({
        spriteInstances: [...spriteInstances, newSprite],
        selectedSpriteId: newSprite.id,
        spriteWorkspaces: {
          ...s.spriteWorkspaces,
          [newSprite.id]: new Blockly.Workspace(),
        },
      }));

      addSpriteSync(newSprite);
    }

    useGeckodeStore.setState({ editingSource: null, editingAssetName: null, editingAssetType: null });
    setIsSpriteModalOpen(false);
  };

  // Load existing texture when editing from library or asset (use offscreen canvas to avoid checkerboard in pixel data)
  useEffect(() => {
    if (
      editingSource === null ||
      editingAssetName === null ||
      !canvasRef.current
    )
      return;

    const textureInfo =
      editingSource === "library"
        ? libaryTextures[editingAssetName]
        : textures[editingAssetName];
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
      setSpriteName(editingAssetName);
      requestRender();
    };
    img.src = textureInfo;
  }, [editingSource, editingAssetName, libaryTextures, textures]);

  // --- Grid resize handler (used by uncontrolled inputs) ---
  const handleGridResize = (dimension: 'width' | 'height', value: string, fallback: number) => {
    if (value === '') return;
    const parsed = Math.max(1, Math.min(1024, parseInt(value, 10)));
    if (Number.isNaN(parsed)) return;
    const newW = dimension === 'width' ? parsed : gridWidth;
    const newH = dimension === 'height' ? parsed : gridHeight;
    resetPixelArrays(newW, newH);
    if (dimension === 'width') setGridWidth(parsed);
    else setGridHeight(parsed);
  };

  return (
    <div className="flex-1 min-h-0 flex border-t border-slate-200 bg-slate-800 dark:border-slate-700">
      <div className="w-30 flex flex-col gap-3 p-2 bg-slate-700 dark:bg-slate-800 border-r border-slate-600">
        {/* brush size */}
        <div className="grid grid-cols-3 rounded overflow-hidden">
          {[1, 2, 3].map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setBrushSize(size)}
              className={`h-9 flex items-center justify-center cursor-pointer transition ${brushSize === size
                ? 'bg-primary-green'
                : 'bg-slate-600 hover:bg-slate-500'
                }`}
              title={`${size}x${size} brush`}
            >
              <div className="bg-white" style={{ width: size * 3 + 2, height: size * 3 + 2 }} />
            </button>
          ))}
        </div>

        <EditorTools activeTool={activeTool} setActiveTool={setActiveTool} />

        {/* dual color indicator */}
        <div className="relative w-full h-12 mx-auto mt-2.5 mb-1">
          <button
            type="button"
            onClick={swapColors}
            className="absolute right-1.5 bottom-0 w-18 h-8 rounded-xs cursor-pointer transition-shadow"
            style={{
              backgroundColor: secondaryColor || '#9e9e9e',
              backgroundImage: !secondaryColor
                ? 'linear-gradient(45deg, #6e6e6e 25%, transparent 25%), linear-gradient(-45deg, #6e6e6e 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #6e6e6e 75%), linear-gradient(-45deg, transparent 75%, #6e6e6e 75%)'
                : undefined,
              backgroundSize: '8px 8px',
              backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
            }}
            title="Secondary color (right-click) - Click to swap"
          />
          <button
            type="button"
            onClick={swapColors}
            className="absolute left-1.5 top-0 w-18 h-8 rounded-xs cursor-pointer transition-shadow"
            style={{
              backgroundColor: primaryColor || '#9e9e9e',
              backgroundImage: !primaryColor
                ? 'linear-gradient(45deg, #6e6e6e 25%, transparent 25%), linear-gradient(-45deg, #6e6e6e 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #6e6e6e 75%), linear-gradient(-45deg, transparent 75%, #6e6e6e 75%)'
                : undefined,
              backgroundSize: '8px 8px',
              backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
            }}
            title="Primary color (left-click) - Click to swap"
          />
        </div>

        {/* color palette */}
        <div className="flex flex-col gap-2 pt-2">
          <div className="grid grid-cols-3 w-full gap-1.5">
            <button
              type="button"
              onClick={() => setPrimaryColor('')}
              className="rounded-xs cursor-pointer transition aspect-square hover:ring-2 hover:ring-white/40"
              style={{
                backgroundImage: 'linear-gradient(45deg, #6e6e6e 25%, transparent 25%), linear-gradient(-45deg, #6e6e6e 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #6e6e6e 75%), linear-gradient(-45deg, transparent 75%, #6e6e6e 75%)',
                backgroundSize: '8px 8px',
                backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
                backgroundColor: '#9e9e9e',
              }}
              title="Transparent"
            />
            {palette.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setPrimaryColor(color)}
                className="rounded-xs cursor-pointer transition aspect-square hover:ring-2 hover:ring-white/40"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>

          <label
            className="w-full h-8 flex items-center justify-center gap-2 rounded cursor-pointer bg-slate-600 hover:bg-slate-500 transition"
            title="Pick custom color"
          >
            <div className="w-4 h-4 rounded border border-white/30" style={{ backgroundColor: primaryColor }} />
            <span className="text-xs text-slate-300">Custom</span>
            <input
              type="color"
              value={primaryColor || '#000000'}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="hidden"
            />
          </label>
        </div>

        <div className="flex-1" />

        {/* grid size (uncontrolled inputs reset via key) */}
        <div className="flex items-center gap-1">
          <input
            key={`w-${gridWidth}`}
            type="number"
            defaultValue={gridWidth}
            onBlur={(e) => handleGridResize('width', e.target.value, gridWidth)}
            onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
            min={1}
            max={1024}
            className="w-12 h-8 px-1 text-xs text-slate-300 text-center bg-slate-600 border border-slate-500 rounded outline-none focus:border-primary-green [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            title="Grid width"
            name="gridWidth"
          />
          <span className="text-slate-400 text-xs">x</span>
          <input
            key={`h-${gridHeight}`}
            type="number"
            defaultValue={gridHeight}
            onBlur={(e) => handleGridResize('height', e.target.value, gridHeight)}
            onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
            min={1}
            max={1024}
            className="w-12 h-8 px-1 text-xs text-slate-300 text-center bg-slate-600 border border-slate-500 rounded outline-none focus:border-primary-green [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            title="Grid height"
            name="gridHeight"
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* the canvas, clear button */}
        <div
          ref={canvasContainerRef}
          className="relative flex-1 flex items-center justify-center bg-slate-600 p-4 overflow-auto min-h-0"
        >
          <button
            type="button"
            onClick={clearCanvas}
            className="absolute top-2 right-2 z-10 px-3 h-7 flex items-center justify-center rounded bg-red-600/80 hover:bg-red-600 text-white text-xs font-medium cursor-pointer transition"
            title="Clear canvas"
          >
            Clear
          </button>
          <div className="relative">
            <canvas
              ref={canvasRef}
              className="cursor-crosshair select-none touch-none"
              style={{
                width: gridWidth * cellSize,
                height: gridHeight * cellSize,
                imageRendering: 'pixelated',
              }}
              onPointerDown={canvasPointerDown}
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        </div>

        {/* zoom controls */}
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
              onKeyDown={(e) => e.key === 'Enter' ? e.currentTarget.blur() : e.key === 'Escape' && setIsEditingZoom(false)}
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

        {/* Bottom row; preview, name, and add to game */}
        <div className="h-16 flex items-center gap-3 px-4 bg-slate-700 dark:bg-slate-800 border-t border-slate-600 shrink-0">
          <canvas
            ref={previewRef}
            className="w-10 h-10 rounded border border-slate-500"
            style={{ imageRendering: 'pixelated' }}
          />
          <input
            type="text"
            value={spriteName}
            onChange={(e) => setSpriteName(e.target.value)}
            placeholder="Sprite name"
            className="flex-1 h-9 px-3 rounded bg-slate-600 border border-slate-500 text-sm text-white placeholder:text-slate-400 outline-none focus:border-primary-green"
          />
          <Button
            className="btn-confirm h-9 px-4"
            onClick={addSpriteToGame}
            title={editingSource === 'asset' ? "Save changes" : "Add to game"}
          >
            {editingSource === 'asset' ? 'Save' : 'Add to Game'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SpriteEditor;
