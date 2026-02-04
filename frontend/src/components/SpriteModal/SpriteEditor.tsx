'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { Button } from '../ui/Button';
import { useSpriteStore } from '@/stores/spriteStore';
import EditorTools from './EditorTools';
import { Display } from 'phaser';
import { useEditorStore } from '@/stores/editorStore';
import EditorScene from '@/phaser/scenes/EditorScene';

const MIN_ZOOM_PERCENT = 25;
const MAX_ZOOM_PERCENT = 800;
const MAX_HISTORY = 50;

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

// Create empty RGBA array
const createPixelArray = (width: number, height: number): Uint8ClampedArray => {
  return new Uint8ClampedArray(width * height * 4);
};

const SpriteEditor = () => {
  const [spriteName, setSpriteName] = useState('mySprite');
  const [brushSize, setBrushSize] = useState(1);
  const [primaryColor, setPrimaryColor] = useState('#10b981');
  const [secondaryColor, setSecondaryColor] = useState('#3b82f6');
  const [activeTool, setActiveTool] = useState<Tool>('pen');
  const [isDrawing, setIsDrawing] = useState(false);
  const [shapeStart, setShapeStart] = useState<{ x: number; y: number } | null>(null);
  const [zoomPercent, setZoomPercent] = useState(100);
  const [gridWidth, setGridWidth] = useState(16);
  const [gridHeight, setGridHeight] = useState(16);
  const [inputWidth, setInputWidth] = useState(gridWidth);
  const [inputHeight, setInputHeight] = useState(gridHeight);
  const originalGridWidth = useRef(gridWidth);
  const originalGridHeight = useRef(gridHeight);
  const [isEditingZoom, setIsEditingZoom] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [renderCount, setRenderCount] = useState(0);
  const spriteLibrary = useSpriteStore((state) => state.spriteLibrary);
  const setIsSpriteModalOpen = useSpriteStore((state) => state.setIsSpriteModalOpen);
  const addStoreTexture = useSpriteStore((state) => state.addStoreTexture);
  const updateStoreTexture = useSpriteStore((state) => state.updateStoreTexture);
  const addToSpriteLibrary = useSpriteStore((state) => state.addToSpriteLibrary);
  const editingLibrarySpriteIdx = useSpriteStore((state) => state.editingLibrarySpriteIdx);
  const setEditingLibrarySprite = useSpriteStore((state) => state.setEditingLibrarySprite);
  const spriteTextures = useSpriteStore((state) => state.spriteTextures);
  const phaserScene = useEditorStore((state) => state.phaserScene);
  const addSpriteToGame = useSpriteStore((state) => state.addSpriteToGame);

  const prevPosRef = useRef<{ x: number; y: number } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const previewRef = useRef<HTMLCanvasElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const activeButtonRef = useRef<number>(0); // 0 = left click, 2 = right click

  // Ref to hold state values for window event handlers (avoids stale closures)
  const stateRef = useRef({
    isDrawing: false,
    shapeStart: null as { x: number; y: number } | null,
    activeTool: 'pen' as Tool,
    primaryColor: '#10b981',
    secondaryColor: '#3b82f6',
    gridWidth: 16,
    gridHeight: 16,
    brushSize: 1,
  });

  // Layer 1 is the main layer, layer 2 is for visual effects that aren't saved
  // Using refs + Uint8ClampedArray for performance (no React state updates during drawing)
  const layer1Ref = useRef<Uint8ClampedArray>(createPixelArray(gridWidth, gridHeight));
  const layer2Ref = useRef<Uint8ClampedArray>(createPixelArray(gridWidth, gridHeight));

  // Undo/Redo history (stores copies of the pixel data)
  const undoStackRef = useRef<Uint8ClampedArray[]>([]);
  const redoStackRef = useRef<Uint8ClampedArray[]>([]);

  // Cached 2x2 checker tile for pattern rendering
  const checkerTileRef = useRef<HTMLCanvasElement | null>(null);
  const checkerTileCellSizeRef = useRef<number>(0);

  // sync the state
  useEffect(() => {
    stateRef.current = {
      isDrawing,
      shapeStart,
      activeTool,
      primaryColor,
      secondaryColor,
      gridWidth,
      gridHeight,
      brushSize,
    };
  }, [isDrawing, shapeStart, activeTool, primaryColor, secondaryColor, gridWidth, gridHeight, brushSize]);

  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) throw new Error('Canvas container should exist.');

    // zoom in and out
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) setZoom(e.deltaY > 0 ? -5 : 5);
    };

    // track the container size for relative zoom
    const observer = new ResizeObserver((entries) => {
      setContainerSize({ width: entries[0].contentRect.width, height: entries[0].contentRect.height });
    });

    // undo/redo detection
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'z' && !event.shiftKey) {
        event.preventDefault();
        undo();
      } else if (
        ((event.metaKey || event.ctrlKey) && event.key === 'y') ||
        ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key === 'z')
      ) {
        event.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    container.addEventListener('wheel', handleWheel, { passive: false });
    observer.observe(container);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      container.removeEventListener('wheel', handleWheel);
      observer.disconnect();
    }
  }, []);

  const setZoom = (z: number) => {
    if (z < MIN_ZOOM_PERCENT) { setZoomPercent(MIN_ZOOM_PERCENT); return; }
    if (z > MAX_ZOOM_PERCENT) { setZoomPercent(MAX_ZOOM_PERCENT); return; }
    setZoomPercent(z);
  };

  useEffect(() => {
    if (!isDrawing) return;
    if (activeTool !== 'pen' && activeTool !== 'eraser') return;

    const handleWindowUp = () => {
      setIsDrawing(false);
      prevPosRef.current = null;
    };

    window.addEventListener('pointerup', handleWindowUp);
    return () => window.removeEventListener('pointerup', handleWindowUp);
  }, [isDrawing, activeTool]);

  // Calculate base zoom (pixels-per-cell that makes canvas fit the container)
  const baseZoom = useMemo(() => {
    if (containerSize.width === 0 || containerSize.height === 0) return 1;
    const fitWidth = containerSize.width / gridWidth;
    const fitHeight = containerSize.height / gridHeight;
    return Math.min(fitWidth, fitHeight);
  }, [containerSize, gridWidth, gridHeight]);

  // Actual cell size based on baseZoom and zoomPercent
  const cellSize = useMemo(() => {
    return Math.max(1, baseZoom * (zoomPercent / 100));
  }, [baseZoom, zoomPercent]);

  // Swap primary and secondary colors
  const swapColors = () => {
    setPrimaryColor(secondaryColor);
    setSecondaryColor(primaryColor);
  };

  const requestRender = () => setRenderCount((prev) => prev + 1);
  const saveToHistory = () => {
    undoStackRef.current.push(new Uint8ClampedArray(layer1Ref.current));
    if (undoStackRef.current.length > MAX_HISTORY) undoStackRef.current.shift();
    redoStackRef.current = [];
  };
  const undo = () => {
    if (undoStackRef.current.length === 0) return;
    const previousState = undoStackRef.current.pop()!;
    redoStackRef.current.push(new Uint8ClampedArray(layer1Ref.current));
    layer1Ref.current = previousState;
    requestRender();
  };
  const redo = () => {
    if (redoStackRef.current.length === 0) return;
    const nextState = redoStackRef.current.pop()!;
    undoStackRef.current.push(new Uint8ClampedArray(layer1Ref.current));
    layer1Ref.current = nextState;
    requestRender();
  };

  const getCheckerPattern = (ctx: CanvasRenderingContext2D, cellSize: number): CanvasPattern => {
    if (!checkerTileRef.current || checkerTileCellSizeRef.current !== cellSize) {
      const tile = document.createElement('canvas');
      tile.width = cellSize * 2;
      tile.height = cellSize * 2;
      const tileCtx = tile.getContext('2d')!;

      tileCtx.fillStyle = '#9e9e9e';
      tileCtx.fillRect(0, 0, cellSize, cellSize);
      tileCtx.fillRect(cellSize, cellSize, cellSize, cellSize);
      tileCtx.fillStyle = '#6e6e6e';
      tileCtx.fillRect(cellSize, 0, cellSize, cellSize);
      tileCtx.fillRect(0, cellSize, cellSize, cellSize);

      checkerTileRef.current = tile;
      checkerTileCellSizeRef.current = cellSize;
    }
    return ctx.createPattern(checkerTileRef.current, 'repeat')!;
  };

  const renderCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = Math.max(1, Math.round(cellSize));
    const w = gridWidth;
    const h = gridHeight;
    canvas.width = w * size;
    canvas.height = h * size;
    ctx.imageSmoothingEnabled = false;

    // Create scaled ImageData for pixels (single putImageData instead of per-pixel fillRect)
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;
    const layer1 = layer1Ref.current;
    const layer2 = layer2Ref.current;

    for (let py = 0; py < h; py++) {
      for (let px = 0; px < w; px++) {
        const srcIdx = (py * w + px) * 4;
        // Check layer2 first (preview), then layer1
        const layer = layer2[srcIdx + 3] > 0 ? layer2 : layer1;
        if (layer[srcIdx + 3] === 0) continue;

        // Fill the scaled cell
        for (let dy = 0; dy < size; dy++) {
          for (let dx = 0; dx < size; dx++) {
            const dstIdx = ((py * size + dy) * canvas.width + (px * size + dx)) * 4;
            data[dstIdx] = layer[srcIdx];
            data[dstIdx + 1] = layer[srcIdx + 1];
            data[dstIdx + 2] = layer[srcIdx + 2];
            data[dstIdx + 3] = layer[srcIdx + 3];
          }
        }
      }
    }

    // Draw pixels first, then checker pattern behind using destination-over
    // (putImageData replaces content entirely, so we must draw checker after)
    ctx.putImageData(imageData, 0, 0);
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = getCheckerPattern(ctx, size);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'source-over';
  };

  const renderPreview = useCallback(() => {
    const preview = previewRef.current;
    if (!preview) return;
    const ctx = preview.getContext('2d');
    if (!ctx) return;

    const scale = 4;
    const w = gridWidth;
    const h = gridHeight;
    preview.width = w * scale;
    preview.height = h * scale;
    ctx.imageSmoothingEnabled = false;

    // Create scaled ImageData for pixels
    const imageData = ctx.createImageData(preview.width, preview.height);
    const data = imageData.data;
    const layer1 = layer1Ref.current;

    for (let py = 0; py < h; py++) {
      for (let px = 0; px < w; px++) {
        const srcIdx = (py * w + px) * 4;
        if (layer1[srcIdx + 3] === 0) continue;

        // Fill the scaled cell
        for (let dy = 0; dy < scale; dy++) {
          for (let dx = 0; dx < scale; dx++) {
            const dstIdx = ((py * scale + dy) * preview.width + (px * scale + dx)) * 4;
            data[dstIdx] = layer1[srcIdx];
            data[dstIdx + 1] = layer1[srcIdx + 1];
            data[dstIdx + 2] = layer1[srcIdx + 2];
            data[dstIdx + 3] = layer1[srcIdx + 3];
          }
        }
      }
    }

    // Draw pixels first, then checker pattern behind using destination-over
    ctx.putImageData(imageData, 0, 0);
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = getCheckerPattern(ctx, scale);
    ctx.fillRect(0, 0, preview.width, preview.height);
    ctx.globalCompositeOperation = 'source-over';
  }, [gridWidth, gridHeight]); 

  // Tools
  const paintAt = (x: number, y: number, color: string) => {
    const { gridWidth: w, gridHeight: h, brushSize: size } = stateRef.current;
    const rgba = Display.Color.HexStringToColor(color);
    const offset = Math.floor(size / 2);
    const layer1 = layer1Ref.current;

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
    const { gridWidth: w, gridHeight: h } = stateRef.current;
    const layer1 = layer1Ref.current;
    const fillRgba = Display.Color.HexStringToColor(fillColor);

    const startIdx = (startY * w + startX) * 4;
    // Copy target color for comparison
    const targetR = layer1[startIdx];
    const targetG = layer1[startIdx + 1];
    const targetB = layer1[startIdx + 2];
    const targetA = layer1[startIdx + 3];

    // Check if fill color matches target
    if (fillRgba) {
      if (targetR === fillRgba.red && targetG === fillRgba.green && targetB === fillRgba.blue && targetA === fillRgba.alpha) return;
    } else {
      if (targetA === 0) return; // Already transparent
    }

    const queue: [number, number][] = [[startX, startY]];
    const visited = new Set<number>();

    while (queue.length > 0) {
      const [x, y] = queue.shift()!;
      const pixelIndex = y * w + x;
      if (visited.has(pixelIndex)) continue;
      if (x < 0 || x >= w || y < 0 || y >= h) continue;

      const idx = pixelIndex * 4;
      // Check if this pixel matches target color
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
      if (e2 > -dy) {
        err -= dy;
        x0 += sx;
      }
      if (e2 < dx) {
        err += dx;
        y0 += sy;
      }
    }

    return pixels;
  };

  // Apply brush size to a list of pixels (mutates the layer directly)
  const applyBrush = (pixels: { x: number; y: number }[], color: string, layer: Uint8ClampedArray) => {
    const { brushSize: size, gridWidth: w, gridHeight: h } = stateRef.current;
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

  // Get pixels for hollow rectangle outline
  const getRectanglePixels = (x1: number, y1: number, x2: number, y2: number) => {
    const minX = Math.min(x1, x2), maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2), maxY = Math.max(y1, y2);
    const pixels: { x: number; y: number }[] = [];
    for (let x = minX; x <= maxX; x++) { pixels.push({ x, y: minY }, { x, y: maxY }); }
    for (let y = minY + 1; y < maxY; y++) { pixels.push({ x: minX, y }, { x: maxX, y }); }
    return pixels;
  };

  // Get pixels for hollow oval outline 
  const getOvalPixels = (x1: number, y1: number, x2: number, y2: number) => {
    const { gridWidth: w, gridHeight: h } = stateRef.current;
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

  // Pointer events
  const getPointerPosition = (event: { clientX: number; clientY: number }) => {
    const { gridWidth: w, gridHeight: h } = stateRef.current;
    const rect = canvasRef.current!.getBoundingClientRect();
    return {
      x: Math.floor((event.clientX - rect.left) / (rect.width / w)),
      y: Math.floor((event.clientY - rect.top) / (rect.height / h))
    };
  };

  const canvasPointerDown = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const position = getPointerPosition(e);
    prevPosRef.current = position;

    // left or right click
    activeButtonRef.current = e.button;
    const color = e.button === 2 ? secondaryColor : primaryColor;

    saveToHistory();

    if (['pen', 'eraser'].includes(activeTool)) {
      paintAt(position.x, position.y, color);
      prevPosRef.current = position;
      setIsDrawing(true);
    } else if (['rectangle', 'line', 'oval'].includes(activeTool)) {
      setShapeStart(position);
      setIsDrawing(true);
    } if (activeTool === 'bucket') {
      floodFill(position.x, position.y, color);
    } else if (activeTool === 'color-picker') {
      const idx = (position.y * gridWidth + position.x) * 4;
      const pickedColor = rgbaToHex(layer1Ref.current, idx);
      setPrimaryColor(pickedColor);
    }
  };
  // Convert pointer to canvas coords
  const clipToCanvas = (start: { x: number; y: number }, end: { x: number; y: number }) => {
    const { gridWidth: w, gridHeight: h } = stateRef.current;
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

  const handlePointerUp = (event: PointerEvent) => {
    prevPosRef.current = null;
    const { isDrawing: drawing, shapeStart: start, activeTool: tool, primaryColor: primary, secondaryColor: secondary, gridWidth: w, gridHeight: h } = stateRef.current;
    if (!start || !drawing) return;
    const pos = getPointerPosition(event);
    const cp = clipToCanvas(start, pos);
    const color = activeButtonRef.current === 2 ? secondary : primary;

    let pixels: { x: number; y: number }[] = [];
    if (tool === 'line') { pixels = getLinePixels(start.x, start.y, cp.x, cp.y); }
    else if (tool === 'rectangle') { pixels = getRectanglePixels(start.x, start.y, cp.x, cp.y); }
    else if (tool === 'oval') { pixels = getOvalPixels(start.x, start.y, cp.x, cp.y); }

    applyBrush(pixels, color, layer1Ref.current);
    layer2Ref.current = createPixelArray(w, h);
    setShapeStart(null);
    setIsDrawing(false);
  };

  const handlePointerMove = (e: PointerEvent | ReactPointerEvent<HTMLCanvasElement>) => {
    const { isDrawing: drawing, shapeStart: start, activeTool: tool, primaryColor: primary, secondaryColor: secondary, gridWidth: w, gridHeight: h } = stateRef.current;
    if (!drawing) return;
    const isShapeTool = ['line', 'rectangle', 'oval'].includes(tool);

    const position = getPointerPosition(e);
    const prev = prevPosRef.current;
    if (prev && prev.x === position.x && prev.y === position.y) return;
    const color = activeButtonRef.current === 2 ? secondary : primary;
    prevPosRef.current = position;

    // show shadow for shape tools, don't paint
    if (isShapeTool && start) {
      const cp = clipToCanvas(start, position);

      let pixels: { x: number; y: number }[] = [];
      if (tool === 'line') {
        pixels = getLinePixels(start.x, start.y, cp.x, cp.y);
      } else if (tool === 'rectangle') {
        pixels = getRectanglePixels(start.x, start.y, cp.x, cp.y);
      } else if (tool === 'oval') {
        pixels = getOvalPixels(start.x, start.y, cp.x, cp.y);
      }
      // TODO: this should be optimized; instead of creating a new array, we
      // revert the previous display pixels and only update the new pixels
      layer2Ref.current = createPixelArray(w, h);
      applyBrush(pixels, color, layer2Ref.current);
      requestRender();
      return;
    }

    // paint to layer1 for pen and eraser
    if (tool === 'pen') {
      if (prev && (Math.abs(position.x - prev.x) > 1 || Math.abs(position.y - prev.y) > 1)) {
        getLinePixels(prev.x, prev.y, position.x, position.y).forEach(p => paintAt(p.x, p.y, color));
      } else {
        paintAt(position.x, position.y, color);
      }
    } else if (tool === 'eraser') {
      paintAt(position.x, position.y, '');
    }
  };

  // Window-level pointer tracking for shape tools
  useEffect(() => {
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);


  const saveToAssets = async () => {
    if (!(phaserScene instanceof EditorScene)) throw new Error('Phaser scene is not an EditorScene.');

    // Export at 1:1 pixel size (grid dimensions), not the zoomed display canvas,
    // so a 16x16 sprite stays small instead of e.g. 512x512 (~11KB+ base64).
    const w = gridWidth;
    const h = gridHeight;
    const offscreen = document.createElement('canvas');
    offscreen.width = w;
    offscreen.height = h;
    const ctx = offscreen.getContext('2d')!;
    const imageData = ctx.createImageData(w, h);
    const layer1 = layer1Ref.current;
    const layer2 = layer2Ref.current;
    const data = imageData.data;
    for (let i = 0; i < w * h * 4; i += 4) {
      const useLayer2 = layer2[i + 3] > 0;
      const src = useLayer2 ? layer2 : layer1;
      data[i] = src[i];
      data[i + 1] = src[i + 1];
      data[i + 2] = src[i + 2];
      data[i + 3] = src[i + 3];
    }
    ctx.putImageData(imageData, 0, 0);
    const base64Image = offscreen.toDataURL('image/png');

    if (editingLibrarySpriteIdx !== null) {
      const libSprite = spriteLibrary[editingLibrarySpriteIdx];
      if (phaserScene.textures.exists(libSprite.textureName)) {
        phaserScene.deloadTexture(libSprite.textureName);
        updateStoreTexture(libSprite.textureName, base64Image);
      } else {
        addStoreTexture(libSprite.textureName, base64Image);
      }
      phaserScene.load.image(libSprite.textureName, base64Image);

    } else {
      phaserScene.load.image(spriteName, base64Image);
      addStoreTexture(spriteName, base64Image);

      addToSpriteLibrary({
        id: `id_${Date.now()}`,
        textureName: spriteName,
        name: spriteName,
      });
    }

    addSpriteToGame({
      textureName: spriteName,
      name: spriteName,
      base64Image: base64Image,
    });
    setEditingLibrarySprite(null);
    setIsSpriteModalOpen(false);
  };

  // Load library sprite data when editing a library sprite
  useEffect(() => {
    if (editingLibrarySpriteIdx === null || !canvasRef.current) return;

    const libSprite = spriteLibrary[editingLibrarySpriteIdx];
    const textureInfo = spriteTextures[libSprite.textureName];
    if (!textureInfo) return;

    const img = new Image();
    img.onload = () => {
      const width = img.width;
      const height = img.height;

      setGridWidth(width);
      setGridHeight(height);
      setInputWidth(width);
      setInputHeight(height);

      const ctx = canvasRef.current!.getContext('2d')!;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, width, height);
      const pixelData = imageData.data;

      layer1Ref.current = new Uint8ClampedArray(pixelData);
      layer2Ref.current = createPixelArray(width, height);

      undoStackRef.current = [];
      redoStackRef.current = [];
      setSpriteName(libSprite.name);
    };
    img.src = textureInfo;
  }, [editingLibrarySpriteIdx]);

  // Render canvas when state changes
  useEffect(() => {
    renderCanvas();
    renderPreview();
  }, [renderCount, cellSize, gridWidth, gridHeight, renderPreview]);

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

        {/* grid size */}
        <div className="flex items-center gap-1">
          <input
            type="number"
            value={inputWidth}
            onFocus={() => { originalGridWidth.current = gridWidth; }}
            onChange={(e) => setInputWidth(e.target.value === '' ? '' as unknown as number : parseInt(e.target.value, 10))}
            onBlur={(e) => {
              if (e.target.value === '') { setInputWidth(originalGridWidth.current); return; }
              const newWidth = Math.max(1, Math.min(1024, parseInt(e.target.value, 10)));
              layer1Ref.current = createPixelArray(newWidth, gridHeight);
              layer2Ref.current = createPixelArray(newWidth, gridHeight);
              undoStackRef.current = [];
              redoStackRef.current = [];
              setGridWidth(newWidth);
            }}
            min={1}
            max={1024}
            className="w-12 h-8 px-1 text-xs text-slate-300 text-center bg-slate-600 border border-slate-500 rounded outline-none focus:border-primary-green [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            title="Grid width"
            name="gridWidth"
          />
          <span className="text-slate-400 text-xs">x</span>
          <input
            type="number"
            value={inputHeight}
            onFocus={() => { originalGridHeight.current = gridHeight; }}
            onChange={(e) => setInputHeight(e.target.value === '' ? '' as unknown as number : parseInt(e.target.value, 10))}
            onBlur={(e) => {
              if (e.target.value === '') { setInputHeight(originalGridHeight.current); return; }
              const newHeight = Math.max(1, Math.min(1024, parseInt(e.target.value, 10)));
              layer1Ref.current = createPixelArray(gridWidth, newHeight);
              layer2Ref.current = createPixelArray(gridWidth, newHeight);
              undoStackRef.current = [];
              redoStackRef.current = [];
              setGridHeight(newHeight);
            }}
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
            onClick={() => {
              saveToHistory();
              layer1Ref.current = createPixelArray(gridWidth, gridHeight);
              layer2Ref.current = createPixelArray(gridWidth, gridHeight);
              requestRender();
            }}
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
            onClick={saveToAssets}
            title="Save resource to assets"
          >
            Add to Game
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SpriteEditor;
