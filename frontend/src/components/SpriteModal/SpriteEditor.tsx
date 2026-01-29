'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { Button } from '../ui/Button';
import { useSpriteStore } from '@/stores/spriteStore';
import EditorTools from './EditorTools';

const MIN_ZOOM_PERCENT = 25;
const MAX_ZOOM_PERCENT = 800;
const MAX_HISTORY = 50;

export type Tool = 'pen' | 'eraser' | 'bucket' | 'rectangle' | 'line' | 'oval' | 'rectangle-selection' | 'pan-tool' | 'color-picker';

// Convert hex color to RGBA values (returns null for transparent/empty)
const hexToRgba = (hex: string): { r: number; g: number; b: number; a: number } | null => {
  if (!hex) return null;
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return null;
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
    a: 255,
  };
};

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

// Create empty RGBA array
const createPixelArray = (width: number, height: number): Uint8ClampedArray => {
  return new Uint8ClampedArray(width * height * 4);
};

const SpriteEditor = () => {
  const [spriteName, setSpriteName] = useState('Custom Sprite');
  const [brushSize, setBrushSize] = useState(1);
  const [primaryColor, setPrimaryColor] = useState('#10b981');
  const [secondaryColor, setSecondaryColor] = useState('#3b82f6');
  const [activeTool, setActiveTool] = useState<Tool>('pen');
  const [showGrid, setShowGrid] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [rectangleStart, setRectangleStart] = useState<{ x: number; y: number } | null>(null);
  const [lineStart, setLineStart] = useState<{ x: number; y: number } | null>(null);
  const [ovalStart, setOvalStart] = useState<{ x: number; y: number } | null>(null);
  const [zoomPercent, setZoomPercent] = useState(100);
  const [gridWidth, setGridWidth] = useState(16);
  const [gridHeight, setGridHeight] = useState(16);
  const [localGridWidth, setLocalGridWidth] = useState(gridWidth);
  const [localGridHeight, setLocalGridHeight] = useState(gridHeight);
  const originalGridWidth = useRef(gridWidth);
  const originalGridHeight = useRef(gridHeight);
  const [isEditingZoom, setIsEditingZoom] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const addSpriteToGame = useSpriteStore((state) => state.addSpriteToGame);
  const setIsSpriteModalOpen = useSpriteStore((state) => state.setIsSpriteModalOpen);
  const registerTexture = useSpriteStore((state) => state.registerTexture);
  const addToSpriteLibrary = useSpriteStore((state) => state.addToSpriteLibrary);
  const editingLibrarySprite = useSpriteStore((state) => state.editingLibrarySprite);
  const originalPixelData = useSpriteStore((state) => state.originalPixelData);
  const spriteTextures = useSpriteStore((state) => state.spriteTextures);
  const clearEditingLibrarySprite = useSpriteStore((state) => state.clearEditingLibrarySprite);

  const prevPosRef = useRef<{ x: number; y: number } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const previewRef = useRef<HTMLCanvasElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const activeButtonRef = useRef<number>(0); // 0 = left click, 2 = right click
  const rafIdRef = useRef<number>(0); // For requestAnimationFrame throttling
  const originalPixelDataRef = useRef<Uint8ClampedArray | null>(null); // For comparing against library sprite

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

  // Layer 1 is the main layer, layer 2 is for visual effects that aren't saved
  // Using refs + Uint8ClampedArray for performance (no React state updates during drawing)
  const layer1Ref = useRef<Uint8ClampedArray>(createPixelArray(gridWidth, gridHeight));
  const layer2Ref = useRef<Uint8ClampedArray>(createPixelArray(gridWidth, gridHeight));

  // Track if canvas needs re-render (incremented to trigger useEffect)
  const [renderVersion, setRenderVersion] = useState(0);
  const requestRender = useCallback(() => setRenderVersion((v) => v + 1), []);

  // Undo/Redo history (stores copies of the pixel data)
  const undoStackRef = useRef<Uint8ClampedArray[]>([]);
  const redoStackRef = useRef<Uint8ClampedArray[]>([]);

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

  // Save current state to undo history
  const saveToHistory = useCallback(() => {
    undoStackRef.current.push(new Uint8ClampedArray(layer1Ref.current));
    if (undoStackRef.current.length > MAX_HISTORY) {
      undoStackRef.current.shift();
    }
    // Clear redo stack when new action is performed
    redoStackRef.current = [];
  }, []);

  // Undo function
  const undo = useCallback(() => {
    if (undoStackRef.current.length === 0) return;
    const previousState = undoStackRef.current.pop()!;
    redoStackRef.current.push(new Uint8ClampedArray(layer1Ref.current));
    layer1Ref.current = previousState;
    requestRender();
  }, [requestRender]);

  // Redo function
  const redo = useCallback(() => {
    if (redoStackRef.current.length === 0) return;
    const nextState = redoStackRef.current.pop()!;
    undoStackRef.current.push(new Uint8ClampedArray(layer1Ref.current));
    layer1Ref.current = nextState;
    requestRender();
  }, [requestRender]);

  const drawShadow = (x: number, y: number) => {
    // console.log('[SpriteEditor] drawShadow()');
    // const canvas = canvasRef.current;
    // if (!canvas) return;
    // const ctx = canvas.getContext('2d');
    // if (!ctx) return;
    // ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    // ctx.fillRect(x, y, 1, 1);
  }

  // Pre-rendered checker pattern canvas (cached)
  const checkerCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const checkerSizeRef = useRef({ width: 0, height: 0, cellSize: 0 });

  const getCheckerCanvas = useCallback((cellSize: number, width: number, height: number): HTMLCanvasElement => {
    const cached = checkerCanvasRef.current;
    const cachedSize = checkerSizeRef.current;

    // Return cached if dimensions match
    if (cached && cachedSize.width === width && cachedSize.height === height && cachedSize.cellSize === cellSize) {
      return cached;
    }

    // Create new checker canvas
    const checkerCanvas = document.createElement('canvas');
    checkerCanvas.width = width * cellSize;
    checkerCanvas.height = height * cellSize;
    const ctx = checkerCanvas.getContext('2d')!;

    const light = '#9e9e9e';
    const dark = '#6e6e6e';
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        ctx.fillStyle = (x + y) % 2 === 0 ? light : dark;
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }

    checkerCanvasRef.current = checkerCanvas;
    checkerSizeRef.current = { width, height, cellSize };
    return checkerCanvas;
  }, []);

  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = Math.round(cellSize);
    const w = gridWidth;
    const h = gridHeight;
    canvas.width = w * size;
    canvas.height = h * size;
    ctx.imageSmoothingEnabled = false;

    // Draw cached checker pattern
    const checkerCanvas = getCheckerCanvas(size, w, h);
    ctx.drawImage(checkerCanvas, 0, 0);

    // Draw layer1 pixels
    const layer1 = layer1Ref.current;
    for (let i = 0; i < w * h; i++) {
      const idx = i * 4;
      if (layer1[idx + 3] === 0) continue; // Skip transparent
      const x = i % w;
      const y = Math.floor(i / w);
      ctx.fillStyle = `rgba(${layer1[idx]},${layer1[idx + 1]},${layer1[idx + 2]},${layer1[idx + 3] / 255})`;
      ctx.fillRect(x * size, y * size, size, size);
    }

    // Draw layer2 (preview layer) on top
    const layer2 = layer2Ref.current;
    for (let i = 0; i < w * h; i++) {
      const idx = i * 4;
      if (layer2[idx + 3] === 0) continue; // Skip transparent
      const x = i % w;
      const y = Math.floor(i / w);
      ctx.fillStyle = `rgba(${layer2[idx]},${layer2[idx + 1]},${layer2[idx + 2]},${layer2[idx + 3] / 255})`;
      ctx.fillRect(x * size, y * size, size, size);
    }

    if (showGrid) {
      ctx.strokeStyle = 'rgba(15,23,42,0.15)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= w; i += 1) {
        ctx.beginPath();
        ctx.moveTo(i * size + 0.25, 0);
        ctx.lineTo(i * size + 0.25, h * size);
        ctx.stroke();
      }
      for (let i = 0; i <= h; i += 1) {
        ctx.beginPath();
        ctx.moveTo(0, i * size + 0.25);
        ctx.lineTo(w * size, i * size + 0.25);
        ctx.stroke();
      }
    }
  }, [cellSize, gridWidth, gridHeight, getCheckerCanvas, showGrid]);

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

    // Draw checker pattern for preview
    const checkerCanvas = getCheckerCanvas(scale, w, h);
    ctx.drawImage(checkerCanvas, 0, 0);

    // Draw layer1 pixels
    const layer1 = layer1Ref.current;
    for (let i = 0; i < w * h; i++) {
      const idx = i * 4;
      if (layer1[idx + 3] === 0) continue;
      const x = i % w;
      const y = Math.floor(i / w);
      ctx.fillStyle = `rgba(${layer1[idx]},${layer1[idx + 1]},${layer1[idx + 2]},${layer1[idx + 3] / 255})`;
      ctx.fillRect(x * scale, y * scale, scale, scale);
    }
  }, [gridWidth, gridHeight, getCheckerCanvas]);

  // Tools
  const paintAt = useCallback(
    (x: number, y: number, color: string) => {
      const rgba = hexToRgba(color);
      const offset = Math.floor(brushSize / 2);
      const layer1 = layer1Ref.current;
      const w = gridWidth;
      const h = gridHeight;

      for (let dy = 0; dy < brushSize; dy += 1) {
        for (let dx = 0; dx < brushSize; dx += 1) {
          const px = Math.max(0, Math.min(w - 1, x + dx - offset));
          const py = Math.max(0, Math.min(h - 1, y + dy - offset));
          const idx = (py * w + px) * 4;
          setPixel(layer1, idx, rgba);
        }
      }
      requestRender();
    },
    [gridWidth, gridHeight, brushSize, requestRender]
  );
  const floodFill = useCallback(
    (startX: number, startY: number, fillColor: string) => {
      const layer1 = layer1Ref.current;
      const w = gridWidth;
      const h = gridHeight;
      const fillRgba = hexToRgba(fillColor);

      const startIdx = (startY * w + startX) * 4;
      // Copy target color for comparison
      const targetR = layer1[startIdx];
      const targetG = layer1[startIdx + 1];
      const targetB = layer1[startIdx + 2];
      const targetA = layer1[startIdx + 3];

      // Check if fill color matches target
      if (fillRgba) {
        if (targetR === fillRgba.r && targetG === fillRgba.g && targetB === fillRgba.b && targetA === fillRgba.a) return;
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
        setPixel(layer1, idx, fillRgba);

        queue.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
      }
      requestRender();
    },
    [gridWidth, gridHeight, requestRender]
  );
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
  const applyBrush = useCallback((pixels: { x: number; y: number }[], color: string, layer: Uint8ClampedArray) => {
    const offset = Math.floor(brushSize / 2);
    const rgba = hexToRgba(color);
    const w = gridWidth;
    const h = gridHeight;

    for (const p of pixels) {
      for (let dy = 0; dy < brushSize; dy++) {
        for (let dx = 0; dx < brushSize; dx++) {
          const px = Math.max(0, Math.min(w - 1, p.x + dx - offset));
          const py = Math.max(0, Math.min(h - 1, p.y + dy - offset));
          const idx = (py * w + px) * 4;
          setPixel(layer, idx, rgba);
        }
      }
    }
  }, [brushSize, gridWidth, gridHeight]);

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
  const getOvalPixels = useCallback((x1: number, y1: number, x2: number, y2: number) => {
    const cx = (x1 + x2) / 2, cy = (y1 + y2) / 2;
    const rx = Math.abs(x2 - x1) / 2, ry = Math.abs(y2 - y1) / 2;
    if (rx === 0 || ry === 0) return [];
    const pixels: { x: number; y: number }[] = [];
    const steps = Math.max(Math.ceil(2 * Math.PI * Math.max(rx, ry)), 32);
    for (let i = 0; i < steps; i++) {
      const angle = (2 * Math.PI * i) / steps;
      const x = Math.round(cx + rx * Math.cos(angle));
      const y = Math.round(cy + ry * Math.sin(angle));
      if (x >= 0 && x < gridWidth && y >= 0 && y < gridHeight) pixels.push({ x, y });
    }
    return pixels;
  }, [gridWidth, gridHeight]);

  // Pointer events
  const getPointerPosition = useCallback((event: { clientX: number; clientY: number }, allowOutside = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const scaleX = rect.width / gridWidth;
    const scaleY = rect.height / gridHeight;
    const x = Math.floor((event.clientX - rect.left) / scaleX);
    const y = Math.floor((event.clientY - rect.top) / scaleY);
    if (!allowOutside && (x < 0 || y < 0 || x >= gridWidth || y >= gridHeight)) return null;
    return { x, y };
  }, [gridWidth, gridHeight]);
  const handlePointerDown = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    const position = getPointerPosition(event);
    if (!position) return;

    // Track which button was pressed (0 = left, 2 = right)
    activeButtonRef.current = event.button;
    const color = event.button === 2 ? secondaryColor : primaryColor;

    // Save state before drawing for undo
    saveToHistory();

    if (activeTool === 'pen') {
      setIsDrawing(true);
      prevPosRef.current = position;
      paintAt(position.x, position.y, color);
    } else if (activeTool === 'eraser') {
      setIsDrawing(true);
      paintAt(position.x, position.y, '');
    } else if (activeTool === 'bucket') {
      floodFill(position.x, position.y, color);
    } else if (activeTool === 'rectangle') {
      setRectangleStart(position);
      setIsDrawing(true);
    } else if (activeTool === 'line') {
      setLineStart(position);
      setIsDrawing(true);
    } else if (activeTool === 'oval') {
      setOvalStart(position);
      setIsDrawing(true);
    } else if (activeTool === 'color-picker') {
      const idx = (position.y * gridWidth + position.x) * 4;
      const pickedColor = rgbaToHex(layer1Ref.current, idx);
      setPrimaryColor(pickedColor);
    }
  };
  // Clip line endpoint to canvas boundary while preserving direction
  const clipToCanvas = useCallback((start: { x: number; y: number }, end: { x: number; y: number }) => {
    let { x, y } = end;
    const dx = x - start.x, dy = y - start.y;
    let t = 1;
    if (x < 0) t = Math.min(t, -start.x / dx);
    if (x >= gridWidth) t = Math.min(t, (gridWidth - 1 - start.x) / dx);
    if (y < 0) t = Math.min(t, -start.y / dy);
    if (y >= gridHeight) t = Math.min(t, (gridHeight - 1 - start.y) / dy);
    if (t < 1) { x = Math.round(start.x + dx * t); y = Math.round(start.y + dy * t); }
    return { x: Math.max(0, Math.min(gridWidth - 1, x)), y: Math.max(0, Math.min(gridHeight - 1, y)) };
  }, [gridWidth, gridHeight]);

  const handlePointerMove = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const isShapeTool = ['line', 'rectangle', 'oval'].includes(activeTool);
    const position = getPointerPosition(event, isDrawing && isShapeTool);
    if (!position) return;
    if (!isDrawing) { drawShadow(position.x, position.y); return; }

    // Throttle with requestAnimationFrame for smooth performance
    if (rafIdRef.current) return;
    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = 0;
      const color = activeButtonRef.current === 2 ? secondaryColor : primaryColor;

      if (activeTool === 'pen') {
        const prev = prevPosRef.current;
        if (prev && (Math.abs(position.x - prev.x) > 1 || Math.abs(position.y - prev.y) > 1)) {
          getLinePixels(prev.x, prev.y, position.x, position.y).forEach(p => paintAt(p.x, p.y, color));
        } else {
          paintAt(position.x, position.y, color);
        }
        prevPosRef.current = position;
      } else if (activeTool === 'eraser') {
        paintAt(position.x, position.y, '');
      } else if (activeTool === 'line' && lineStart) {
        const cp = clipToCanvas(lineStart, position);
        const pixels = getLinePixels(lineStart.x, lineStart.y, cp.x, cp.y);
        layer2Ref.current = createPixelArray(gridWidth, gridHeight);
        applyBrush(pixels, color, layer2Ref.current);
        requestRender();
      } else if (activeTool === 'rectangle' && rectangleStart) {
        const cp = clipToCanvas(rectangleStart, position);
        const pixels = getRectanglePixels(rectangleStart.x, rectangleStart.y, cp.x, cp.y);
        layer2Ref.current = createPixelArray(gridWidth, gridHeight);
        applyBrush(pixels, color, layer2Ref.current);
        requestRender();
      } else if (activeTool === 'oval' && ovalStart) {
        const cp = clipToCanvas(ovalStart, position);
        const pixels = getOvalPixels(ovalStart.x, ovalStart.y, cp.x, cp.y);
        layer2Ref.current = createPixelArray(gridWidth, gridHeight);
        applyBrush(pixels, color, layer2Ref.current);
        requestRender();
      }
    });
  };
  const handlePointerUp = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const pos = getPointerPosition(event, true);
    if (!pos) return;
    const color = activeButtonRef.current === 2 ? secondaryColor : primaryColor;
    const clearLayer2 = () => {
      layer2Ref.current = createPixelArray(gridWidth, gridHeight);
    };

    const commitShape = (pixels: { x: number; y: number }[], resetStart: () => void) => {
      applyBrush(pixels, color, layer1Ref.current);
      resetStart();
      clearLayer2();
      requestRender();
    };

    if (activeTool === 'rectangle' && rectangleStart && isDrawing) {
      const cp = clipToCanvas(rectangleStart, pos);
      commitShape(getRectanglePixels(rectangleStart.x, rectangleStart.y, cp.x, cp.y), () => setRectangleStart(null));
    } else if (activeTool === 'line' && lineStart && isDrawing) {
      const cp = clipToCanvas(lineStart, pos);
      commitShape(getLinePixels(lineStart.x, lineStart.y, cp.x, cp.y), () => setLineStart(null));
    } else if (activeTool === 'oval' && ovalStart && isDrawing) {
      const cp = clipToCanvas(ovalStart, pos);
      commitShape(getOvalPixels(ovalStart.x, ovalStart.y, cp.x, cp.y), () => setOvalStart(null));
    }
    setIsDrawing(false);
  };

  // Check if canvas has any non-transparent pixels
  const hasPixels = useMemo(() => {
    const layer1 = layer1Ref.current;
    for (let i = 3; i < layer1.length; i += 4) {
      if (layer1[i] > 0) return true; // Check alpha channel
    }
    return false;
  }, [renderVersion]); // Re-check when render is triggered

  // Compare two Uint8ClampedArrays for equality
  const arraysEqual = (a: Uint8ClampedArray, b: Uint8ClampedArray): boolean => {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  };

  const saveToAssets = async () => {
    if (!hasPixels) return;

    // Check if we're editing a library sprite and if it's been modified
    const isEditingLibrary = editingLibrarySprite !== null;
    const originalData = originalPixelDataRef.current;
    const isModified = !originalData || !arraysEqual(layer1Ref.current, originalData);

    // If editing a library sprite and NOT modified, just add the existing sprite to game
    if (isEditingLibrary && !isModified) {
      const textureInfo = spriteTextures.get(editingLibrarySprite.textureName);
      const success = await addSpriteToGame({
        name: editingLibrarySprite.name,
        textureName: editingLibrarySprite.textureName,
        textureUrl: textureInfo?.url || '',
      });
      if (success) {
        clearEditingLibrarySprite();
        setIsSpriteModalOpen(false);
      }
      return;
    }

    // Modified or new sprite: create new library entry
    const label = spriteName.trim() || 'Custom Sprite';
    const safeBase = label.toLowerCase().replace(/[^\w]/g, '') || 'customsprite';
    const texture = `${safeBase}-${Date.now()}`;

    // Create a clean canvas with just the sprite pixels (no grid)
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = gridWidth;
    exportCanvas.height = gridHeight;
    const ctx = exportCanvas.getContext('2d');
    if (!ctx) return;

    // Create ImageData from layer1Ref and put it directly
    const imageData = new ImageData(new Uint8ClampedArray(layer1Ref.current), gridWidth, gridHeight);
    ctx.putImageData(imageData, 0, 0);

    // Convert to data URL
    const dataUrl = exportCanvas.toDataURL('image/png');

    // Register the texture before adding sprite
    registerTexture(texture, dataUrl, true);

    const spriteId = `id_${Date.now()}_${Math.round(Math.random() * 1e4)}`;
    addToSpriteLibrary({
      id: spriteId,
      textureName: texture,
      name: label,
    });

    const success = await addSpriteToGame({
      name: label,
      textureName: texture,
      textureUrl: dataUrl,
    });
    if (success) {
      clearEditingLibrarySprite();
      setIsSpriteModalOpen(false);
    }
  };

  // Sync local grid inputs when actual state changes externally
  useEffect(() => { setLocalGridWidth(gridWidth); }, [gridWidth]);
  useEffect(() => { setLocalGridHeight(gridHeight); }, [gridHeight]);

  // Load library sprite data when editingLibrarySprite changes
  useEffect(() => {
    if (!editingLibrarySprite || !originalPixelData) {
      originalPixelDataRef.current = null;
      return;
    }

    const textureInfo = spriteTextures.get(editingLibrarySprite.textureName);
    if (!textureInfo?.url) return;

    // Load image to get dimensions
    const img = new Image();
    img.onload = () => {
      const width = img.width;
      const height = img.height;

      // Update grid dimensions
      setGridWidth(width);
      setGridHeight(height);
      setLocalGridWidth(width);
      setLocalGridHeight(height);

      // Load pixel data into layer1
      layer1Ref.current = new Uint8ClampedArray(originalPixelData);
      layer2Ref.current = createPixelArray(width, height);
      originalPixelDataRef.current = new Uint8ClampedArray(originalPixelData);

      // Set sprite name
      setSpriteName(editingLibrarySprite.name);

      // Clear history since we're loading fresh
      undoStackRef.current = [];
      redoStackRef.current = [];

      requestRender();
    };
    img.src = textureInfo.url;
  }, [editingLibrarySprite, originalPixelData, spriteTextures, requestRender]);

  // Track container dimensions for relative zoom
  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      // Account for padding (p-4 = 16px on each side)
      setContainerSize({ width: width - 32, height: height - 32 });
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
        const delta = event.deltaY > 0 ? -10 : 10;
        setZoomPercent((z) => Math.max(MIN_ZOOM_PERCENT, Math.min(MAX_ZOOM_PERCENT, z + delta)));
      }
    };
    const container = canvasContainerRef.current;
    if (!container) throw new Error('Canvas container should exist.');
    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  // Window-level pointer tracking for shape tools
  useEffect(() => {
    if (!isDrawing) return;
    const isShapeTool = lineStart || rectangleStart || ovalStart;
    if (!isShapeTool) return;

    const color = activeButtonRef.current === 2 ? secondaryColor : primaryColor;
    const handleWindowMove = (e: PointerEvent) => {
      const pos = getPointerPosition(e, true);
      if (!pos) return;
      let pixels: { x: number; y: number }[] = [];
      if (lineStart) { const cp = clipToCanvas(lineStart, pos); pixels = getLinePixels(lineStart.x, lineStart.y, cp.x, cp.y); }
      else if (rectangleStart) { const cp = clipToCanvas(rectangleStart, pos); pixels = getRectanglePixels(rectangleStart.x, rectangleStart.y, cp.x, cp.y); }
      else if (ovalStart) { const cp = clipToCanvas(ovalStart, pos); pixels = getOvalPixels(ovalStart.x, ovalStart.y, cp.x, cp.y); }
      layer2Ref.current = createPixelArray(gridWidth, gridHeight);
      applyBrush(pixels, color, layer2Ref.current);
      requestRender();
    };
    const handleWindowUp = (e: PointerEvent) => {
      const pos = getPointerPosition(e, true);
      if (!pos) { setIsDrawing(false); return; }
      let pixels: { x: number; y: number }[] = [];
      if (lineStart) { const cp = clipToCanvas(lineStart, pos); pixels = getLinePixels(lineStart.x, lineStart.y, cp.x, cp.y); setLineStart(null); }
      else if (rectangleStart) { const cp = clipToCanvas(rectangleStart, pos); pixels = getRectanglePixels(rectangleStart.x, rectangleStart.y, cp.x, cp.y); setRectangleStart(null); }
      else if (ovalStart) { const cp = clipToCanvas(ovalStart, pos); pixels = getOvalPixels(ovalStart.x, ovalStart.y, cp.x, cp.y); setOvalStart(null); }
      applyBrush(pixels, color, layer1Ref.current);
      layer2Ref.current = createPixelArray(gridWidth, gridHeight);
      requestRender();
      setIsDrawing(false);
    };
    window.addEventListener('pointermove', handleWindowMove);
    window.addEventListener('pointerup', handleWindowUp);
    return () => { window.removeEventListener('pointermove', handleWindowMove); window.removeEventListener('pointerup', handleWindowUp); };
  }, [isDrawing, lineStart, rectangleStart, ovalStart, primaryColor, secondaryColor, gridWidth, gridHeight, brushSize, getPointerPosition, clipToCanvas, getOvalPixels, applyBrush, requestRender]);

  // Window-level pointer tracking for pen and eraser
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

  // Keyboard shortcuts for undo/redo
  useEffect(() => {
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
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    renderCanvas();
    renderPreview();
  }, [renderCanvas, renderPreview, renderVersion]);

  return (
    <div className="flex-1 min-h-0 flex border-t border-slate-200 bg-slate-800 dark:border-slate-700">
      <div className="w-30 flex flex-col gap-3 p-2 bg-slate-700 dark:bg-slate-800 border-r border-slate-600">
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

        {/* Dual color indicator */}
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

        {/* Color palette section */}
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

        {/* Grid size controls */}
        <div className="flex items-center gap-1">
          <input
            type="number"
            value={localGridWidth}
            onFocus={() => { originalGridWidth.current = gridWidth; }}
            onChange={(e) => setLocalGridWidth(e.target.value === '' ? '' as unknown as number : parseInt(e.target.value, 10))}
            onBlur={(e) => {
              if (e.target.value === '') {
                setLocalGridWidth(originalGridWidth.current);
                return;
              }
              const val = Math.max(1, Math.min(1024, parseInt(e.target.value, 10)));
              setGridWidth(val);
              setLocalGridWidth(val);
              layer1Ref.current = createPixelArray(val, gridHeight);
              layer2Ref.current = createPixelArray(val, gridHeight);
              undoStackRef.current = [];
              redoStackRef.current = [];
              requestRender();
            }}
            min={1}
            max={160}
            className="w-12 h-8 px-1 text-xs text-slate-300 text-center bg-slate-600 border border-slate-500 rounded outline-none focus:border-primary-green [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            title="Grid width"
            name="gridWidth"
          />
          <span className="text-slate-400 text-xs">x</span>
          <input
            type="number"
            value={localGridHeight}
            onFocus={() => { originalGridHeight.current = gridHeight; }}
            onChange={(e) => setLocalGridHeight(e.target.value === '' ? '' as unknown as number : parseInt(e.target.value, 10))}
            onBlur={(e) => {
              if (e.target.value === '') {
                setLocalGridHeight(originalGridHeight.current);
                return;
              }
              const val = Math.max(1, Math.min(1024, parseInt(e.target.value, 10)));
              setGridHeight(val);
              setLocalGridHeight(val);
              layer1Ref.current = createPixelArray(gridWidth, val);
              layer2Ref.current = createPixelArray(gridWidth, val);
              undoStackRef.current = [];
              redoStackRef.current = [];
              requestRender();
            }}
            min={1}
            max={128}
            className="w-12 h-8 px-1 text-xs text-slate-300 text-center bg-slate-600 border border-slate-500 rounded outline-none focus:border-primary-green [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            title="Grid height"
            name="gridHeight"
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
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
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        </div>

        <div className="h-10 flex items-center justify-center gap-2 bg-slate-700 border-t border-slate-600 shrink-0">
          <button
            type="button"
            onClick={() => setZoomPercent((z) => Math.max(MIN_ZOOM_PERCENT, z - 25))}
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
                const percent = parseInt(e.target.value, 10);
                if (!isNaN(percent)) setZoomPercent(Math.max(MIN_ZOOM_PERCENT, Math.min(MAX_ZOOM_PERCENT, percent)));
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
            onClick={() => setZoomPercent((z) => Math.min(MAX_ZOOM_PERCENT, z + 25))}
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
          <label className="flex items-center gap-2 text-slate-300 text-xs cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showGrid}
              onChange={() => setShowGrid((prev) => !prev)}
              className="accent-primary-green"
            />
            Grid
          </label>
          <Button
            className="btn-confirm h-9 px-4"
            disabled={!hasPixels}
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
