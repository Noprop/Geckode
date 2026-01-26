'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { Button } from '../ui/Button';
import { useSpriteStore } from '@/stores/spriteStore';
import EditorTools from './EditorTools';

const MIN_ZOOM = 6;
const MAX_ZOOM = 20;
const MAX_HISTORY = 50;

export type Tool = 'pen' | 'eraser' | 'bucket' | 'rectangle' | 'line' | 'oval' | 'rectangle-selection' | 'pan-tool' | 'color-picker';

const SpriteEditor = () => {
  const [spriteName, setSpriteName] = useState('Custom Sprite');
  const [brushSize, setBrushSize] = useState(2);
  const [primaryColor, setPrimaryColor] = useState('#10b981');
  const [secondaryColor, setSecondaryColor] = useState('#3b82f6');
  const [activeTool, setActiveTool] = useState<Tool>('pen');
  const [showGrid, setShowGrid] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [rectangleStart, setRectangleStart] = useState<{ x: number; y: number } | null>(null);
  const [lineStart, setLineStart] = useState<{ x: number; y: number } | null>(null);
  const [ovalStart, setOvalStart] = useState<{ x: number; y: number } | null>(null);
  const [zoom, setZoom] = useState(7);
  const [gridSize, setGridSize] = useState(64);
  const [isEditingZoom, setIsEditingZoom] = useState(false);
  const addSpriteToGame = useSpriteStore((state) => state.addSpriteToGame);
  const setIsSpriteModalOpen = useSpriteStore((state) => state.setIsSpriteModalOpen);
  const registerTexture = useSpriteStore((state) => state.registerTexture);
  const addToSpriteLibrary = useSpriteStore((state) => state.addToSpriteLibrary);

  const prevPosRef = useRef<{ x: number; y: number } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const previewRef = useRef<HTMLCanvasElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const activeButtonRef = useRef<number>(0); // 0 = left click, 2 = right click

  // Swap primary and secondary colors
  const swapColors = () => {
    setPrimaryColor(secondaryColor);
    setSecondaryColor(primaryColor);
  };

  // Layer 1 is the main layer, layer 2 is for visual effects that aren't saved
  const [layer1, setLayer1] = useState<string[]>(Array.from({ length: gridSize * gridSize }, () => ''));
  const [layer2, setLayer2] = useState<string[]>(Array.from({ length: gridSize * gridSize }, () => ''));

  // Undo/Redo history
  const undoStackRef = useRef<string[][]>([]);
  const redoStackRef = useRef<string[][]>([]);
  const layer1Ref = useRef(layer1);
  layer1Ref.current = layer1;

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
  const saveToHistory = () => {
    undoStackRef.current.push([...layer1Ref.current]);
    if (undoStackRef.current.length > MAX_HISTORY) {
      undoStackRef.current.shift();
    }
    // Clear redo stack when new action is performed
    redoStackRef.current = [];
  };

  // Undo function
  const undo = () => {
    if (undoStackRef.current.length === 0) return;
    const previousState = undoStackRef.current.pop()!;
    redoStackRef.current.push([...layer1Ref.current]);
    setLayer1(previousState);
  };

  // Redo function
  const redo = () => {
    if (redoStackRef.current.length === 0) return;
    const nextState = redoStackRef.current.pop()!;
    undoStackRef.current.push([...layer1Ref.current]);
    setLayer1(nextState);
  };

  const drawShadow = (x: number, y: number) => {
    // console.log('[SpriteEditor] drawShadow()');
    // const canvas = canvasRef.current;
    // if (!canvas) return;
    // const ctx = canvas.getContext('2d');
    // if (!ctx) return;
    // ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    // ctx.fillRect(x, y, 1, 1);
  }

  const drawChecker = useCallback(
    (ctx: CanvasRenderingContext2D, cellSize: number) => {
      const light = '#9e9e9e';
      const dark = '#6e6e6e';
      for (let y = 0; y < gridSize; y += 1) {
        for (let x = 0; x < gridSize; x += 1) {
          const isDark = (x + y) % 2 === 0;
          ctx.fillStyle = isDark ? light : dark;
          ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
      }
    },
    [gridSize]
  );

  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cellSize = Math.round(zoom);
    canvas.width = gridSize * cellSize;
    canvas.height = gridSize * cellSize;
    ctx.imageSmoothingEnabled = false;

    drawChecker(ctx, cellSize);

    layer1.forEach((color, index) => {
      if (!color) return;
      const x = index % gridSize;
      const y = Math.floor(index / gridSize);
      ctx.fillStyle = color;
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    });

    // Render layer2 (preview layer) on top
    layer2.forEach((color, index) => {
      if (!color) return;
      const x = index % gridSize;
      const y = Math.floor(index / gridSize);
      ctx.fillStyle = color;
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    });

    if (showGrid) {
      ctx.strokeStyle = 'rgba(15,23,42,0.15)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= gridSize; i += 1) {
        ctx.beginPath();
        ctx.moveTo(i * cellSize + 0.25, 0);
        ctx.lineTo(i * cellSize + 0.25, gridSize * cellSize);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i * cellSize + 0.25);
        ctx.lineTo(gridSize * cellSize, i * cellSize + 0.25);
        ctx.stroke();
      }
    }
  }, [zoom, gridSize, drawChecker, layer1, layer2, showGrid]);

  const renderPreview = useCallback(() => {
    const preview = previewRef.current;
    if (!preview) return;
    const ctx = preview.getContext('2d');
    if (!ctx) return;

    const scale = 4;
    preview.width = gridSize * scale;
    preview.height = gridSize * scale;
    ctx.imageSmoothingEnabled = false;

    drawChecker(ctx, scale);

    layer1.forEach((color, index) => {
      if (!color) return;
      const x = index % gridSize;
      const y = Math.floor(index / gridSize);
      ctx.fillStyle = color;
      ctx.fillRect(x * scale, y * scale, scale, scale);
    });
  }, [gridSize, drawChecker, layer1]);

  // Tools
  const paintAt = useCallback(
    (x: number, y: number, color: string) => {
      setLayer1((prev) => {
        const next = [...prev];
        const offset = Math.floor(brushSize / 2);
        for (let dy = 0; dy < brushSize; dy += 1) {
          for (let dx = 0; dx < brushSize; dx += 1) {
            const px = Math.max(0, Math.min(gridSize - 1, x + dx - offset));
            const py = Math.max(0, Math.min(gridSize - 1, y + dy - offset));
            next[py * gridSize + px] = color;
          }
        }
        return next;
      });
    },
    [gridSize, brushSize]
  );
  const floodFill = useCallback(
    (startX: number, startY: number, fillColor: string) => {
      setLayer1((prev) => {
        const next = [...prev];
        const targetColor = prev[startY * gridSize + startX];
        if (targetColor === fillColor) return prev;

        const queue: [number, number][] = [[startX, startY]];
        const visited = new Set<string>();

        while (queue.length > 0) {
          const [x, y] = queue.shift()!;
          const key = `${x},${y}`;
          if (visited.has(key)) continue;
          if (x < 0 || x >= gridSize || y < 0 || y >= gridSize) continue;
          if (next[y * gridSize + x] !== targetColor) continue;

          visited.add(key);
          next[y * gridSize + x] = fillColor;

          queue.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
        }
        return next;
      });
    },
    [gridSize]
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

  // Apply brush size to a list of pixels
  const applyBrush = (pixels: { x: number; y: number }[], color: string, layer: string[]) => {
    const offset = Math.floor(brushSize / 2);
    pixels.forEach(p => {
      for (let dy = 0; dy < brushSize; dy++) {
        for (let dx = 0; dx < brushSize; dx++) {
          const px = Math.max(0, Math.min(gridSize - 1, p.x + dx - offset));
          const py = Math.max(0, Math.min(gridSize - 1, p.y + dy - offset));
          layer[py * gridSize + px] = color;
        }
      }
    });
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
    const cx = (x1 + x2) / 2, cy = (y1 + y2) / 2;
    const rx = Math.abs(x2 - x1) / 2, ry = Math.abs(y2 - y1) / 2;
    if (rx === 0 || ry === 0) return [];
    const pixels: { x: number; y: number }[] = [];
    const steps = Math.max(Math.ceil(2 * Math.PI * Math.max(rx, ry)), 32);
    for (let i = 0; i < steps; i++) {
      const angle = (2 * Math.PI * i) / steps;
      const x = Math.round(cx + rx * Math.cos(angle));
      const y = Math.round(cy + ry * Math.sin(angle));
      if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) pixels.push({ x, y });
    }
    return pixels;
  };

  // Pointer events
  const getPointerPosition = (event: { clientX: number; clientY: number }, allowOutside = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const scale = rect.width / gridSize;
    const x = Math.floor((event.clientX - rect.left) / scale);
    const y = Math.floor((event.clientY - rect.top) / scale);
    if (!allowOutside && (x < 0 || y < 0 || x >= gridSize || y >= gridSize)) return null;
    return { x, y };
  };
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
      const pickedColor = layer1[position.y * gridSize + position.x];
      setPrimaryColor(pickedColor);
    }
  };
  // Clip line endpoint to canvas boundary while preserving direction
  const clipToCanvas = (start: { x: number; y: number }, end: { x: number; y: number }) => {
    let { x, y } = end;
    const dx = x - start.x, dy = y - start.y;
    let t = 1;
    if (x < 0) t = Math.min(t, -start.x / dx);
    if (x >= gridSize) t = Math.min(t, (gridSize - 1 - start.x) / dx);
    if (y < 0) t = Math.min(t, -start.y / dy);
    if (y >= gridSize) t = Math.min(t, (gridSize - 1 - start.y) / dy);
    if (t < 1) { x = Math.round(start.x + dx * t); y = Math.round(start.y + dy * t); }
    return { x: Math.max(0, Math.min(gridSize - 1, x)), y: Math.max(0, Math.min(gridSize - 1, y)) };
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const isShapeTool = ['line', 'rectangle', 'oval'].includes(activeTool);
    const position = getPointerPosition(event, isDrawing && isShapeTool);
    if (!position) return;
    if (!isDrawing) { drawShadow(position.x, position.y); return; }

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
      setLayer2(() => { const next = Array(gridSize * gridSize).fill(''); applyBrush(pixels, color, next); return next; });
    } else if (activeTool === 'rectangle' && rectangleStart) {
      const cp = clipToCanvas(rectangleStart, position);
      const pixels = getRectanglePixels(rectangleStart.x, rectangleStart.y, cp.x, cp.y);
      setLayer2(() => { const next = Array(gridSize * gridSize).fill(''); applyBrush(pixels, color, next); return next; });
    } else if (activeTool === 'oval' && ovalStart) {
      const cp = clipToCanvas(ovalStart, position);
      const pixels = getOvalPixels(ovalStart.x, ovalStart.y, cp.x, cp.y);
      setLayer2(() => { const next = Array(gridSize * gridSize).fill(''); applyBrush(pixels, color, next); return next; });
    }
  };
  const handlePointerUp = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const pos = getPointerPosition(event, true);
    if (!pos) return;
    const color = activeButtonRef.current === 2 ? secondaryColor : primaryColor;
    const clearLayer2 = () => setLayer2(Array(gridSize * gridSize).fill(''));

    const commitShape = (start: { x: number; y: number }, pixels: { x: number; y: number }[], resetStart: () => void) => {
      setLayer1((prev) => { const next = [...prev]; applyBrush(pixels, color, next); return next; });
      resetStart();
      clearLayer2();
    };

    if (activeTool === 'rectangle' && rectangleStart && isDrawing) {
      const cp = clipToCanvas(rectangleStart, pos);
      commitShape(rectangleStart, getRectanglePixels(rectangleStart.x, rectangleStart.y, cp.x, cp.y), () => setRectangleStart(null));
    } else if (activeTool === 'line' && lineStart && isDrawing) {
      const cp = clipToCanvas(lineStart, pos);
      commitShape(lineStart, getLinePixels(lineStart.x, lineStart.y, cp.x, cp.y), () => setLineStart(null));
    } else if (activeTool === 'oval' && ovalStart && isDrawing) {
      const cp = clipToCanvas(ovalStart, pos);
      commitShape(ovalStart, getOvalPixels(ovalStart.x, ovalStart.y, cp.x, cp.y), () => setOvalStart(null));
    }
    setIsDrawing(false);
  };

  const hasPixels = useMemo(() => layer1.some(Boolean), [layer1]);

  const saveToAssets = async () => {
    if (!hasPixels) return;
    const label = spriteName.trim() || 'Custom Sprite';
    const safeBase = label.toLowerCase().replace(/[^\w]/g, '') || 'customsprite';
    const texture = `${safeBase}-${Date.now()}`;

    // Create a clean canvas with just the sprite pixels (no grid)
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = gridSize;
    exportCanvas.height = gridSize;
    const ctx = exportCanvas.getContext('2d');
    if (!ctx) return;

    // Draw pixels to export canvas
    layer1.forEach((color, index) => {
      if (!color) return;
      const x = index % gridSize;
      const y = Math.floor(index / gridSize);
      ctx.fillStyle = color;
      ctx.fillRect(x, y, 1, 1);
    });

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
      setIsSpriteModalOpen(false);
    }
  };

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
        const delta = event.deltaY > 0 ? -0.2 : 0.2;
        setZoom((z) => Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, z + delta)));
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
      setLayer2(() => { const next = Array(gridSize * gridSize).fill(''); applyBrush(pixels, color, next); return next; });
    };
    const handleWindowUp = (e: PointerEvent) => {
      const pos = getPointerPosition(e, true);
      if (!pos) { setIsDrawing(false); return; }
      let pixels: { x: number; y: number }[] = [];
      if (lineStart) { const cp = clipToCanvas(lineStart, pos); pixels = getLinePixels(lineStart.x, lineStart.y, cp.x, cp.y); setLineStart(null); }
      else if (rectangleStart) { const cp = clipToCanvas(rectangleStart, pos); pixels = getRectanglePixels(rectangleStart.x, rectangleStart.y, cp.x, cp.y); setRectangleStart(null); }
      else if (ovalStart) { const cp = clipToCanvas(ovalStart, pos); pixels = getOvalPixels(ovalStart.x, ovalStart.y, cp.x, cp.y); setOvalStart(null); }
      setLayer1((prev) => { const next = [...prev]; applyBrush(pixels, color, next); return next; });
      setLayer2(Array(gridSize * gridSize).fill(''));
      setIsDrawing(false);
    };
    window.addEventListener('pointermove', handleWindowMove);
    window.addEventListener('pointerup', handleWindowUp);
    return () => { window.removeEventListener('pointermove', handleWindowMove); window.removeEventListener('pointerup', handleWindowUp); };
  }, [isDrawing, lineStart, rectangleStart, ovalStart, primaryColor, secondaryColor, gridSize, brushSize]);

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
  }, [renderCanvas, renderPreview]);

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
            className="absolute right-1.5 bottom-0 w-18 h-8 rounded-xs cursor-pointer transition"
            style={{
              backgroundColor: secondaryColor || undefined,
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
            className="absolute left-1.5 top-0 w-18 h-8 rounded-xs cursor-pointer transition"
            style={{
              backgroundColor: primaryColor || undefined,
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
        <button
          type="button"
          onClick={() => {
            setLayer1(Array.from({ length: gridSize * gridSize }, () => ''));
            setLayer2(Array.from({ length: gridSize * gridSize }, () => ''));
          }}
          className="w-full h-8 flex items-center justify-center rounded bg-red-600/80 hover:bg-red-600 text-white text-xs font-medium cursor-pointer transition"
          title="Clear canvas"
        >
          Clear
        </button>
      </div>

      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <div
          ref={canvasContainerRef}
          className="flex-1 flex items-center justify-center bg-slate-600 p-4 overflow-auto min-h-0"
        >
          <div className="relative">
            <canvas
              ref={canvasRef}
              className="cursor-crosshair select-none touch-none"
              style={{
                width: gridSize * zoom,
                height: gridSize * zoom,
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
            onClick={() => setZoom((z) => Math.max(MIN_ZOOM, z - 1.5))}
            disabled={zoom <= MIN_ZOOM}
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
              defaultValue={Math.round(zoom * 10)}
              onBlur={(e) => {
                const percent = parseInt(e.target.value, 10);
                if (!isNaN(percent)) setZoom(Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, percent / 10)));
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
              title="Click to edit zoom"
            >
              {Math.round(zoom * 10)}%
            </button>
          )}
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(MAX_ZOOM, z + 1.5))}
            disabled={zoom >= MAX_ZOOM}
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
