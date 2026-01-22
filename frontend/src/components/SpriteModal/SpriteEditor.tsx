'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { Pencil2Icon, EraserIcon } from '@radix-ui/react-icons';
import { Button } from '../ui/Button';
import { useSpriteStore } from '@/stores/spriteStore';

const GRID_SIZE = 48;
const MIN_ZOOM = 6;
const MAX_ZOOM = 20;

const SpriteEditor = () => {
  const [spriteName, setSpriteName] = useState('Custom Sprite');
  const [brushSize, setBrushSize] = useState(2);
  const [selectedColor, setSelectedColor] = useState('#10b981');
  const [activeTool, setActiveTool] = useState<'pen' | 'bucket' | 'eraser' | 'rectangle'>('pen');
  const [showGrid, setShowGrid] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [rectangleStart, setRectangleStart] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [zoom, setZoom] = useState(10);
  const addSpriteToGame = useSpriteStore((state) => state.addSpriteToGame);
  const setIsSpriteModalOpen = useSpriteStore((state) => state.setIsSpriteModalOpen);
  const registerTexture = useSpriteStore((state) => state.registerTexture);
  const addToSpriteLibrary = useSpriteStore((state) => state.addToSpriteLibrary);

  const prevPosRef = useRef<{ x: number; y: number } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const previewRef = useRef<HTMLCanvasElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);

  // Layer 1 is the main layer, layer 2 is for visual effects that aren't saved
  const [layer1, setLayer1] = useState<string[]>(Array.from({ length: GRID_SIZE * GRID_SIZE }, () => ''));
  const [layer2, setLayer2] = useState<string[]>(Array.from({ length: GRID_SIZE * GRID_SIZE }, () => ''));

  const palette = [
    '#ffffff',
    '#000000',
    '#10b981',
    '#22c55e',
    '#38bdf8',
    '#ef4444',
    '#facc15',
    '#a855f7',
  ]; 

  const drawShadow = (x: number, y: number) => {
    console.log('[SpriteEditor] drawShadow()');
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(x, y, 1, 1);
  }

  const drawChecker = useCallback(
    (ctx: CanvasRenderingContext2D, cellSize: number) => {
      const light = '#9e9e9e';
      const dark = '#6e6e6e';
      for (let y = 0; y < GRID_SIZE; y += 1) {
        for (let x = 0; x < GRID_SIZE; x += 1) {
          const isDark = (x + y) % 2 === 0;
          ctx.fillStyle = isDark ? light : dark;
          ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
      }
    },
    [GRID_SIZE]
  );

  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cellSize = zoom;
    canvas.width = GRID_SIZE * cellSize;
    canvas.height = GRID_SIZE * cellSize;
    ctx.imageSmoothingEnabled = false;

    drawChecker(ctx, cellSize);

    layer1.forEach((color, index) => {
      if (!color) return;
      const x = index % GRID_SIZE;
      const y = Math.floor(index / GRID_SIZE);
      ctx.fillStyle = color;
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    });

    if (showGrid) {
      ctx.strokeStyle = 'rgba(15,23,42,0.15)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= GRID_SIZE; i += 1) {
        ctx.beginPath();
        ctx.moveTo(i * cellSize + 0.25, 0);
        ctx.lineTo(i * cellSize + 0.25, GRID_SIZE * cellSize);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i * cellSize + 0.25);
        ctx.lineTo(GRID_SIZE * cellSize, i * cellSize + 0.25);
        ctx.stroke();
      }
    }
  }, [zoom, GRID_SIZE, drawChecker, layer1, showGrid]);

  const renderPreview = useCallback(() => {
    const preview = previewRef.current;
    if (!preview) return;
    const ctx = preview.getContext('2d');
    if (!ctx) return;

    const scale = 4;
    preview.width = GRID_SIZE * scale;
    preview.height = GRID_SIZE * scale;
    ctx.imageSmoothingEnabled = false;

    drawChecker(ctx, scale);

    layer1.forEach((color, index) => {
      if (!color) return;
      const x = index % GRID_SIZE;
      const y = Math.floor(index / GRID_SIZE);
      ctx.fillStyle = color;
      ctx.fillRect(x * scale, y * scale, scale, scale);
    });
  }, [GRID_SIZE, drawChecker, layer1]);

  const clampCoord = (value: number) => Math.max(0, Math.min(GRID_SIZE - 1, value));

  // Tools
  const paintAt = useCallback(
    (x: number, y: number, color: string) => {
      console.log('[SpriteEditor] paintAt()', x, y, color);
      setLayer1((prev) => {
        const next = [...prev];
        const offset = Math.floor(brushSize / 2);
        for (let dy = 0; dy < brushSize; dy += 1) {
          for (let dx = 0; dx < brushSize; dx += 1) {
            const px = Math.max(0, Math.min(GRID_SIZE - 1, x + dx - offset));
            const py = Math.max(0, Math.min(GRID_SIZE - 1, y + dy - offset));
            next[py * GRID_SIZE + px] = color;
          }
        }
        console.log('[SpriteEditor] paintAt()', next);
        return next;
      });
    },
    [GRID_SIZE, brushSize]
  );
  const floodFill = useCallback(
    (startX: number, startY: number, fillColor: string) => {
      setLayer1((prev) => {
        const next = [...prev];
        const targetColor = prev[startY * GRID_SIZE + startX];
        if (targetColor === fillColor) return prev;

        const queue: [number, number][] = [[startX, startY]];
        const visited = new Set<string>();

        while (queue.length > 0) {
          const [x, y] = queue.shift()!;
          const key = `${x},${y}`;
          if (visited.has(key)) continue;
          if (x < 0 || x >= GRID_SIZE || y < 0 || y >= GRID_SIZE) continue;
          if (next[y * GRID_SIZE + x] !== targetColor) continue;

          visited.add(key);
          next[y * GRID_SIZE + x] = fillColor;

          queue.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
        }
        return next;
      });
    },
    [GRID_SIZE]
  );
  const drawRectangle = useCallback(
    (x1: number, y1: number, x2: number, y2: number, color: string) => {
      setLayer1((prev) => {
        const next = [...prev];
        const minX = Math.min(x1, x2);
        const maxX = Math.max(x1, x2);
        const minY = Math.min(y1, y2);
        const maxY = Math.max(y1, y2);
        for (let y = minY; y <= maxY; y++) {
          for (let x = minX; x <= maxX; x++) {
            next[y * GRID_SIZE + x] = color;
          }
        }
        return next;
      });
    },
    [GRID_SIZE]
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

  // Pointer events
  const getPointerPosition = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    console.log('[SpriteEditor] getPointerPosition()', event, rect);
    const scale = rect.width / GRID_SIZE;
    const x = Math.floor((event.clientX - rect.left) / scale);
    const y = Math.floor((event.clientY - rect.top) / scale);
    if (x < 0 || y < 0 || x >= GRID_SIZE || y >= GRID_SIZE) return null;
    return { x, y };
  };
  const handlePointerDown = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    const position = getPointerPosition(event);
    if (!position) return;

    if (activeTool === 'pen') {
      setIsDrawing(true);
      prevPosRef.current = position;
      paintAt(position.x, position.y, selectedColor);
    } else if (activeTool === 'eraser') {
      setIsDrawing(true);
      paintAt(position.x, position.y, '');
    } else if (activeTool === 'bucket') {
      floodFill(position.x, position.y, selectedColor);
    } else if (activeTool === 'rectangle') {
      setRectangleStart(position);
      setIsDrawing(true);
    }
  }; 
  const handlePointerMove = (event: ReactPointerEvent<HTMLCanvasElement>) => { 
    const position = getPointerPosition(event);
    if (!position) return;
    if (!isDrawing) {
      drawShadow(position.x, position.y);
      return;
    }

    if (activeTool === 'pen') {
      const prev = prevPosRef.current;
      if (prev && (Math.abs(position.x - prev.x) > 1 || Math.abs(position.y - prev.y) > 1)) {
        // fast movement - interpolate using Bresenham's line
        const pixels = getLinePixels(prev.x, prev.y, position.x, position.y);
        pixels.forEach(p => paintAt(p.x, p.y, selectedColor));
      } else {
        paintAt(position.x, position.y, selectedColor);
      }
      prevPosRef.current = position;
    } else if (activeTool === 'eraser') {
      paintAt(position.x, position.y, '');
    }
  };
  const handlePointerUp = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (activeTool === 'rectangle' && rectangleStart && isDrawing) {
      const position = getPointerPosition(event);
      if (position) {
        drawRectangle(rectangleStart.x, rectangleStart.y, position.x, position.y, selectedColor);
      }
      setRectangleStart(null);
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
    exportCanvas.width = GRID_SIZE;
    exportCanvas.height = GRID_SIZE;
    const ctx = exportCanvas.getContext('2d');
    if (!ctx) return;
  
    // Draw pixels to export canvas
    layer1.forEach((color, index) => {
      if (!color) return;
      const x = index % GRID_SIZE;
      const y = Math.floor(index / GRID_SIZE);
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
    const stopDrawing = () => setIsDrawing(false);
    window.addEventListener('pointerup', stopDrawing);
    window.addEventListener('pointerleave', stopDrawing);

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
    return () => {
      window.removeEventListener('pointerup', stopDrawing);
      window.removeEventListener('pointerleave', stopDrawing);
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  useEffect(() => {
    renderCanvas();
    renderPreview();
  }, [renderCanvas, renderPreview]);

  return (
    <div className="flex-1 min-h-0 flex border-t border-slate-200 bg-slate-800 dark:border-slate-700">
      <div className="w-16 flex flex-col gap-3 p-2 bg-slate-700 dark:bg-slate-800 border-r border-slate-600">
        <div className="grid grid-cols-2 gap-1 pb-3 border-b border-slate-600">
          {[1, 2, 3, 4].map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setBrushSize(size)}
              className={`w-6 h-6 flex items-center justify-center rounded cursor-pointer transition ${
                brushSize === size
                  ? 'bg-primary-green ring-2 ring-primary-green ring-offset-1 ring-offset-slate-700'
                  : 'bg-slate-600 hover:bg-slate-500'
              }`}
              title={`${size}x${size} brush`}
            >
              <div className="bg-white" style={{ width: size * 3 + 2, height: size * 3 + 2 }} />
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-1 pb-3 border-b border-slate-600">
          <button
            type="button"
            onClick={() => setActiveTool('pen')}
            className={`w-full h-10 flex items-center justify-center rounded cursor-pointer transition ${
              activeTool === 'pen'
                ? 'bg-primary-green text-white'
                : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
            }`}
            title="Pen tool"
          >
            <Pencil2Icon className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => setActiveTool('bucket')}
            className={`w-full h-10 flex items-center justify-center rounded cursor-pointer transition ${
              activeTool === 'bucket'
                ? 'bg-primary-green text-white'
                : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
            }`}
            title="Bucket fill tool"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 11.5s-2 2.17-2 3.5a2 2 0 0 0 4 0c0-1.33-2-3.5-2-3.5zM5.21 10L10 5.21L14.79 10M16.56 10.35L10 3.79L3.44 10.35a1.5 1.5 0 0 0 0 2.12l6.56 6.56a1.5 1.5 0 0 0 2.12 0l6.56-6.56a1.5 1.5 0 0 0-.12-2.12z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setActiveTool('eraser')}
            className={`w-full h-10 flex items-center justify-center rounded cursor-pointer transition ${
              activeTool === 'eraser'
                ? 'bg-primary-green text-white'
                : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
            }`}
            title="Eraser tool"
          >
            <EraserIcon className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => setActiveTool('rectangle')}
            className={`w-full h-10 flex items-center justify-center rounded cursor-pointer transition ${
              activeTool === 'rectangle'
                ? 'bg-primary-green text-white'
                : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
            }`}
            title="Rectangle tool"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="1" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-1">
          {palette.slice(0, 8).map((color) => (
            console.log('[SpriteEditor] palette', color),
            <button
              key={color}
              type="button"
              onClick={() => setSelectedColor(color)}
              className={`w-6 h-6 rounded cursor-pointer transition ${
                selectedColor === color ? 'ring-2 ring-white ring-offset-1 ring-offset-slate-700' : ''
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>

        <label
          className="w-full h-8 flex items-center justify-center rounded cursor-pointer bg-slate-600 hover:bg-slate-500 transition"
          title="Pick custom color"
        >
          <div className="w-4 h-4 rounded border border-white/30" style={{ backgroundColor: selectedColor }} />
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="hidden"
          />
        </label>

        <div className="flex-1"/>
        <button
          type="button"
          onClick={() => {
            setLayer1(Array.from({ length: GRID_SIZE * GRID_SIZE }, () => ''));
            setLayer2(Array.from({ length: GRID_SIZE * GRID_SIZE }, () => ''));
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
                width: GRID_SIZE * zoom,
                height: GRID_SIZE * zoom,
                imageRendering: 'pixelated',
              }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
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
          <span className="text-xs text-slate-300 w-16 text-center">{Math.round((zoom / 10) * 100)}%</span>
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
