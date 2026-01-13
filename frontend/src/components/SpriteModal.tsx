"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type {
  Dispatch,
  DragEvent,
  SetStateAction,
  PointerEvent as ReactPointerEvent,
} from 'react';
import {
  Cross2Icon,
  MagnifyingGlassIcon,
  MixerHorizontalIcon,
  Pencil2Icon,
  EraserIcon,
  ImageIcon,
} from '@radix-ui/react-icons';
import { Button } from './ui/Button';

export type SpriteDragPayload = {
  kind: 'sprite-blueprint';
  texture: string;
  label: string;
  dataUrl?: string;
};

type SpriteAsset = {
  id: string;
  name: string;
  category: string;
  tags: string[];
  preview: string;
};

const HERO_WALK_FRONT = '/heroWalkFront1.bmp';
const HERO_WALK_BACK = '/heroWalkBack1.bmp';
const HERO_WALK_LEFT = '/heroWalkSideLeft2.bmp';
// const HERO_WALK_RIGHT = '/heroWalkSideRight2.bmp';

const HERO_WALK_RIGHT =
  'data:image/png;base64,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';

const spriteLibrary: SpriteAsset[] = [
  {
    id: 'hero-walk-front',
    name: 'Hero Walk Front',
    category: 'Hero',
    tags: ['front', 'walk', 'bitmap'],
    preview: HERO_WALK_FRONT,
  },
  {
    id: 'hero-walk-back',
    name: 'Hero Walk Back',
    category: 'Hero',
    tags: ['back', 'walk', 'bitmap'],
    preview: HERO_WALK_BACK,
  },
  {
    id: 'hero-walk-left',
    name: 'Hero Walk Left',
    category: 'Hero',
    tags: ['left', 'walk', 'bitmap'],
    preview: HERO_WALK_LEFT,
  },
  {
    id: 'hero-walk-right',
    name: 'Hero Walk Right',
    category: 'Hero',
    tags: ['right', 'walk', 'bitmap'],
    preview: HERO_WALK_RIGHT,
  },
];

type Props = {
  isSpriteModalOpen: boolean;
  setIsSpriteModalOpen: Dispatch<SetStateAction<boolean>>;
  addSpriteToGame: (payload: SpriteDragPayload) => Promise<boolean>;
};

const SpriteModal = ({
  isSpriteModalOpen,
  setIsSpriteModalOpen,
  addSpriteToGame,
}: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTab, setActiveTab] = useState<'library' | 'editor'>('library');
  const [spriteName, setSpriteName] = useState('Custom Sprite');
  const [brushSize, setBrushSize] = useState(1);
  const [selectedColor, setSelectedColor] = useState('#10b981');
  const [activeTool, setActiveTool] = useState<
    'pen' | 'bucket' | 'eraser' | 'rectangle'
  >('pen');
  const [showGrid, setShowGrid] = useState(true);
  const [isDrawing, setIsDrawing] = useState(false);
  const [rectangleStart, setRectangleStart] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [zoom, setZoom] = useState(10);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const previewRef = useRef<HTMLCanvasElement | null>(null);

  const GRID_SIZE = 32;
  const MIN_ZOOM = 4;
  const MAX_ZOOM = 20;

  const createEmptyPixels = useCallback(
    () => Array.from({ length: GRID_SIZE * GRID_SIZE }, () => ''),
    [GRID_SIZE]
  );
  const [pixels, setPixels] = useState<string[]>(createEmptyPixels);

  const spriteCategories = useMemo(
    () => ['all', ...new Set(spriteLibrary.map((asset) => asset.category))],
    []
  );

  const filteredSprites = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return spriteLibrary.filter((sprite) => {
      const matchesCategory =
        activeCategory === 'all' || sprite.category === activeCategory;
      const matchesSearch =
        !query ||
        sprite.name.toLowerCase().includes(query) ||
        sprite.tags.some((tag) => tag.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const buildPayload = (sprite: SpriteAsset): SpriteDragPayload => ({
    kind: 'sprite-blueprint',
    label: sprite.name,
    texture: sprite.id,
    dataUrl: sprite.preview,
  });

  const handleSpriteClick = (sprite: SpriteAsset) => async () => {
    const success = await addSpriteToGame(buildPayload(sprite));
    if (success) setIsSpriteModalOpen(false);
  };

  const palette = [
    '#0f172a',
    '#10b981',
    '#22c55e',
    '#38bdf8',
    '#f97316',
    '#ef4444',
    '#facc15',
    '#a855f7',
    '#ec4899',
    '#ffffff',
  ];

  const drawChecker = useCallback(
    (ctx: CanvasRenderingContext2D, cellSize: number) => {
      const light = '#f8fafc';
      const dark = '#e2e8f0';
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

    pixels.forEach((color, index) => {
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
  }, [zoom, GRID_SIZE, drawChecker, pixels, showGrid]);

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

    pixels.forEach((color, index) => {
      if (!color) return;
      const x = index % GRID_SIZE;
      const y = Math.floor(index / GRID_SIZE);
      ctx.fillStyle = color;
      ctx.fillRect(x * scale, y * scale, scale, scale);
    });
  }, [GRID_SIZE, drawChecker, pixels]);

  useEffect(() => {
    renderCanvas();
    renderPreview();
  }, [renderCanvas, renderPreview]);

  // Re-render canvas when switching to editor tab
  useEffect(() => {
    if (activeTab === 'editor') {
      // Small delay to ensure canvas ref is mounted
      const timer = setTimeout(() => {
        renderCanvas();
        renderPreview();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [activeTab, renderCanvas, renderPreview]);

  const clampCoord = (value: number) =>
    Math.max(0, Math.min(GRID_SIZE - 1, value));

  const paintAt = useCallback(
    (x: number, y: number, color: string) => {
      setPixels((prev) => {
        const next = [...prev];
        const offset = Math.floor(brushSize / 2);
        for (let dy = 0; dy < brushSize; dy += 1) {
          for (let dx = 0; dx < brushSize; dx += 1) {
            const px = clampCoord(x + dx - offset);
            const py = clampCoord(y + dy - offset);
            next[py * GRID_SIZE + px] = color;
          }
        }
        return next;
      });
    },
    [GRID_SIZE, brushSize]
  );

  const floodFill = useCallback(
    (startX: number, startY: number, fillColor: string) => {
      setPixels((prev) => {
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
      setPixels((prev) => {
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

  const getPointerPosition = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
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
    if (!isDrawing) return;
    const position = getPointerPosition(event);
    if (!position) return;

    if (activeTool === 'pen') {
      paintAt(position.x, position.y, selectedColor);
    } else if (activeTool === 'eraser') {
      paintAt(position.x, position.y, '');
    }
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (activeTool === 'rectangle' && rectangleStart && isDrawing) {
      const position = getPointerPosition(event);
      if (position) {
        drawRectangle(
          rectangleStart.x,
          rectangleStart.y,
          position.x,
          position.y,
          selectedColor
        );
      }
      setRectangleStart(null);
    }
    setIsDrawing(false);
  };

  useEffect(() => {
    const stopDrawing = () => setIsDrawing(false);
    window.addEventListener('pointerup', stopDrawing);
    window.addEventListener('pointerleave', stopDrawing);
    return () => {
      window.removeEventListener('pointerup', stopDrawing);
      window.removeEventListener('pointerleave', stopDrawing);
    };
  }, []);

  // Handle mouse wheel zoom (Ctrl/Cmd + scroll or pinch on trackpad)
  const handleWheel = useCallback((event: WheelEvent) => {
    if (event.ctrlKey || event.metaKey) {
      event.preventDefault();
      const delta = event.deltaY > 0 ? -2 : 2;
      setZoom((z) => Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, z + delta)));
    }
  }, []);

  // Attach wheel listener to canvas container
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;
    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  const hasPixels = useMemo(() => pixels.some(Boolean), [pixels]);

  const resetCanvas = () => {
    setPixels(createEmptyPixels());
  };

  const generateDataUrl = useCallback(() => {
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = GRID_SIZE;
    exportCanvas.height = GRID_SIZE;
    const ctx = exportCanvas.getContext('2d');
    if (!ctx) return '';
    ctx.clearRect(0, 0, GRID_SIZE, GRID_SIZE);
    pixels.forEach((color, index) => {
      if (!color) return;
      const x = index % GRID_SIZE;
      const y = Math.floor(index / GRID_SIZE);
      ctx.fillStyle = color;
      ctx.fillRect(x, y, 1, 1);
    });
    return exportCanvas.toDataURL('image/png');
  }, [GRID_SIZE, pixels]);

  const handleSaveCustomSprite = async () => {
    if (!hasPixels) return;
    const label = spriteName.trim() || 'Custom Sprite';
    const safeBase =
      label.toLowerCase().replace(/[^\w]/g, '') || 'customsprite';
    const texture = `${safeBase}-${Date.now()}`;
    const dataUrl = generateDataUrl();
    const success = await addSpriteToGame({
      kind: 'sprite-blueprint',
      texture,
      label,
      dataUrl,
    });
    if (success) {
      setIsSpriteModalOpen(false);
      setActiveTab('library');
    }
  };

  if (!isSpriteModalOpen) return <></>;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center px-4 py-8">
      <div
        className="absolute inset-0 bg-slate-900/70"
        onClick={() => setIsSpriteModalOpen(false)}
        aria-hidden
      />
      <div className="relative z-10 w-[min(1100px,80vw)] h-[82vh] overflow-hidden rounded-lg border border-slate-300 bg-white text-slate-900 shadow-2xl ring-4 ring-primary-green/10 dark:border-slate-700 dark:bg-dark-secondary dark:text-slate-100">
        <button
          type="button"
          onClick={() => setIsSpriteModalOpen(false)}
          className="absolute right-3 top-3 rounded-full bg-black/5 p-2 text-slate-700 transition hover:bg-black/10 dark:bg-white/10 dark:text-slate-100 dark:hover:bg-white/20"
          title="Close asset picker"
        >
          <Cross2Icon className="h-4 w-4" />
        </button>

        <div className="px-6 pb-3 pt-4">
          <div className="inline-flex rounded-md border border-slate-200 bg-light-tertiary p-1 text-xs font-semibold dark:border-slate-700 dark:bg-dark-tertiary">
            <button
              type="button"
              onClick={() => setActiveTab('library')}
              className={`cursor-pointer flex items-center gap-2 rounded-md px-4 py-2 transition ${
                activeTab === 'library'
                  ? 'bg-white text-primary-green shadow-sm ring-1 ring-primary-green/30 dark:bg-slate-900'
                  : 'text-slate-600 hover:text-primary-green dark:text-slate-300'
              }`}
            >
              <ImageIcon className="h-4 w-4" />
              Library
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('editor')}
              className={`cursor-pointer flex items-center gap-2 rounded-md px-4 py-2 transition ${
                activeTab === 'editor'
                  ? 'bg-white text-primary-green shadow-sm ring-1 ring-primary-green/30 dark:bg-slate-900'
                  : 'text-slate-600 hover:text-primary-green dark:text-slate-300'
              }`}
            >
              <Pencil2Icon className="h-4 w-4" />
              Editor
            </button>
          </div>
        </div>

        {activeTab === 'library' ? (
          <>
            {/* TODO: Add search and filter functionality */}
            {/* <div className="px-6 pb-4 pt-1">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <div className="relative flex-1">
                  <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search by name or tag"
                    className="w-full rounded-lg border border-slate-200 bg-white px-9 py-2 text-sm outline-none ring-2 ring-transparent transition focus:border-primary-green focus:ring-primary-green/30 dark:border-slate-700 dark:bg-dark-tertiary dark:text-slate-100"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-wide text-slate-600 dark:text-slate-300">
                  <MixerHorizontalIcon className="h-4 w-4" />
                  Filters
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {spriteCategories.map((category) => {
                  const isActive = activeSpriteCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveSpriteCategory(category)}
                      className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                        isActive
                          ? 'border-primary-green bg-primary-green/10 text-primary-green'
                          : 'border-slate-200 text-slate-700 hover:border-primary-green/50 hover:text-primary-green dark:border-slate-700 dark:text-slate-200 dark:hover:border-primary-green/60'
                      }`}
                    >
                      {category === 'all' ? 'All sprites' : category}
                    </button>
                  );
                })}
              </div>
            </div> */}

            <div className="h-[82vh] overflow-y-auto border-t border-slate-200 bg-light-tertiary px-6 py-4 dark:border-slate-700 dark:bg-dark-tertiary">
              {spriteLibrary.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-sm text-slate-600 shadow-sm dark:border-slate-700 dark:bg-dark-secondary dark:text-slate-300">
                  <p>No sprites match your search yet.</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Once sprites are uploaded, they will appear here for you.
                  </p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-4">
                  {spriteLibrary.map((sprite) => (
                    <div
                      key={sprite.id}
                      className="flex w-36 flex-col overflow-hidden rounded-xs border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-700 dark:bg-dark-secondary cursor-pointer"
                      onClick={handleSpriteClick(sprite)}
                      title="Click to add to center of the game window"
                    >
                      <div className="relative flex aspect-4/3 items-center justify-center bg-white dark:bg-slate-900">
                        <img
                          src={sprite.preview}
                          alt={sprite.name}
                          className="h-17 object-contain drop-shadow-sm"
                          style={{ imageRendering: 'pixelated' }}
                        />
                      </div>
                      <div className="flex items-center justify-between px-3 py-2">
                        <div className="text-sm font-semibold">
                          {sprite.name}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="h-[82vh] flex border-t border-slate-200 bg-slate-800 dark:border-slate-700">
            {/* Left Tool Panel */}
            <div className="w-16 flex flex-col gap-3 p-2 bg-slate-700 dark:bg-slate-800 border-r border-slate-600">
              {/* Brush Size Selector - 2x2 grid */}
              <div className="grid grid-cols-2 gap-1">
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
                    <div
                      className="bg-white"
                      style={{ width: size * 3 + 2, height: size * 3 + 2 }}
                    />
                  </button>
                ))}
              </div>

              <div className="w-full h-px bg-slate-600" />

              {/* Tools */}
              <div className="flex flex-col gap-1">
                {/* Pen */}
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

                {/* Bucket */}
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
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19 11.5s-2 2.17-2 3.5a2 2 0 0 0 4 0c0-1.33-2-3.5-2-3.5zM5.21 10L10 5.21L14.79 10M16.56 10.35L10 3.79L3.44 10.35a1.5 1.5 0 0 0 0 2.12l6.56 6.56a1.5 1.5 0 0 0 2.12 0l6.56-6.56a1.5 1.5 0 0 0-.12-2.12z" />
                  </svg>
                </button>

                {/* Eraser */}
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

                {/* Rectangle */}
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
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="1" />
                  </svg>
                </button>
              </div>

              <div className="w-full h-px bg-slate-600" />

              {/* Color Palette */}
              <div className="grid grid-cols-2 gap-1">
                {palette.slice(0, 8).map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`w-6 h-6 rounded cursor-pointer transition ${
                      selectedColor === color
                        ? 'ring-2 ring-white ring-offset-1 ring-offset-slate-700'
                        : ''
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>

              {/* Color Picker */}
              <label
                className="w-full h-8 flex items-center justify-center rounded cursor-pointer bg-slate-600 hover:bg-slate-500 transition"
                title="Pick custom color"
              >
                <div
                  className="w-4 h-4 rounded border border-white/30"
                  style={{ backgroundColor: selectedColor }}
                />
                <input
                  type="color"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="hidden"
                />
              </label>

              <div className="flex-1" />

              {/* Clear button at bottom */}
              <button
                type="button"
                onClick={resetCanvas}
                className="w-full h-8 flex items-center justify-center rounded bg-red-600/80 hover:bg-red-600 text-white text-xs font-medium cursor-pointer transition"
                title="Clear canvas"
              >
                Clear
              </button>
            </div>

            {/* Right Canvas Area */}
            <div className="flex-1 flex flex-col">
              {/* Canvas container */}
              <div
                ref={canvasContainerRef}
                className="flex-1 flex items-center justify-center bg-slate-600 p-4 overflow-auto"
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

              {/* Zoom controls */}
              <div className="h-10 flex items-center justify-center gap-2 bg-slate-700 border-t border-slate-600">
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.max(MIN_ZOOM, z - 2))}
                  disabled={zoom <= MIN_ZOOM}
                  className="w-8 h-8 flex items-center justify-center rounded bg-slate-600 hover:bg-slate-500 disabled:opacity-40 disabled:cursor-not-allowed text-white cursor-pointer transition"
                  title="Zoom out"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35M8 11h6" />
                  </svg>
                </button>
                <span className="text-xs text-slate-300 w-16 text-center">
                  {Math.round((zoom / 10) * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.min(MAX_ZOOM, z + 2))}
                  disabled={zoom >= MAX_ZOOM}
                  className="w-8 h-8 flex items-center justify-center rounded bg-slate-600 hover:bg-slate-500 disabled:opacity-40 disabled:cursor-not-allowed text-white cursor-pointer transition"
                  title="Zoom in"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
                  </svg>
                </button>
              </div>

              {/* Bottom bar with preview, name, and save */}
              <div className="h-16 flex items-center gap-3 px-4 bg-slate-700 dark:bg-slate-800 border-t border-slate-600">
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
                  onClick={handleSaveCustomSprite}
                  title="Add sprite to game"
                >
                  Add to Game
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* <div className="flex items-center justify-end gap-2 border-t border-slate-200 bg-white px-6 py-4 dark:border-slate-700 dark:bg-dark-secondary">
          <Button
            className="btn-neutral px-4"
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
              setIsAssetModalOpen(false);
            }}
            title="Close asset picker"
          >
            Close
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default SpriteModal;
