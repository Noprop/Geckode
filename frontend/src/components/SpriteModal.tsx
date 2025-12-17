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

const SPRITE_LIBRARY: SpriteAsset[] = [
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
  isAssetModalOpen: boolean;
  setIsAssetModalOpen: Dispatch<SetStateAction<boolean>>;
  onAssetClick: (payload: SpriteDragPayload) => Promise<boolean>;
};

const SpriteModal = ({ isAssetModalOpen, setIsAssetModalOpen, onAssetClick }: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTab, setActiveTab] = useState<'library' | 'editor'>('library');
  const [spriteName, setSpriteName] = useState('Custom Sprite');
  const [brushSize, setBrushSize] = useState(2);
  const [selectedColor, setSelectedColor] = useState('#10b981');
  const [isErasing, setIsErasing] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [isDrawing, setIsDrawing] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const previewRef = useRef<HTMLCanvasElement | null>(null);

  const GRID_SIZE = 32;
  const DISPLAY_SCALE = 10;

  const createEmptyPixels = useCallback(
    () => Array.from({ length: GRID_SIZE * GRID_SIZE }, () => ''),
    [GRID_SIZE]
  );
  const [pixels, setPixels] = useState<string[]>(createEmptyPixels);

  const categories = useMemo(
    () => ['all', ...new Set(SPRITE_LIBRARY.map((asset) => asset.category))],
    []
  );

  const filteredAssets = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return SPRITE_LIBRARY.filter((asset) => {
      const matchesCategory =
        activeCategory === 'all' || asset.category === activeCategory;
      const matchesSearch =
        !query ||
        asset.name.toLowerCase().includes(query) ||
        asset.tags.some((tag) => tag.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const buildPayload = (asset: SpriteAsset): SpriteDragPayload => ({
    kind: 'sprite-blueprint',
    label: asset.name,
    texture: asset.id,
    dataUrl: asset.preview,
  });

  const handleDragStart =
    (asset: SpriteAsset) => (event: DragEvent<HTMLDivElement>) => {
      const payload = buildPayload(asset);
      event.dataTransfer.setData('application/json', JSON.stringify(payload));
      event.dataTransfer.effectAllowed = 'move';
    };

  const handleAssetClick = (asset: SpriteAsset) => async () => {
    const success = await onAssetClick(buildPayload(asset));
    if (success) setIsAssetModalOpen(false);
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

    const cellSize = DISPLAY_SCALE;
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
  }, [DISPLAY_SCALE, GRID_SIZE, drawChecker, pixels, showGrid]);

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
    setIsDrawing(true);
    paintAt(position.x, position.y, isErasing ? '' : selectedColor);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const position = getPointerPosition(event);
    if (!position) return;
    paintAt(position.x, position.y, isErasing ? '' : selectedColor);
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
    const success = await onAssetClick({
      kind: 'sprite-blueprint',
      texture,
      label,
      dataUrl,
    });
    if (success) {
      setIsAssetModalOpen(false);
      setActiveTab('library');
    }
  };

  if (!isAssetModalOpen) return <></>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
      <div
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"
        onClick={() => setIsAssetModalOpen(false)}
        aria-hidden
      />
      <div className="relative z-10 w-[min(1100px,66vw)] max-h-[82vh] overflow-hidden rounded-2xl border border-slate-300 bg-white text-slate-900 shadow-2xl ring-4 ring-primary-green/10 dark:border-slate-700 dark:bg-dark-secondary dark:text-slate-100">
        <button
          type="button"
          onClick={() => setIsAssetModalOpen(false)}
          className="absolute right-3 top-3 rounded-full bg-black/5 p-2 text-slate-700 transition hover:bg-black/10 dark:bg-white/10 dark:text-slate-100 dark:hover:bg-white/20"
          title="Close asset picker"
        >
          <Cross2Icon className="h-4 w-4" />
        </button>

        <div className="flex items-start justify-between gap-3 px-6 pt-5">
          <div>
            <h3 className="text-lg font-semibold leading-tight">
              Choose or design a bitmap sprite
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Search, filter, and drag a bitmap frame into the game canvas to
              place it, or click a card to drop it in the center. Flip over to
              the pixel editor tab to paint your own.
            </p>
          </div>
          <div className="hidden items-center gap-2 rounded-full bg-primary-green/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-primary-green sm:flex">
            Bitmap ready
          </div>
        </div>

        <div className="px-6 pb-3 pt-4">
          <div className="inline-flex rounded-full border border-slate-200 bg-light-tertiary p-1 text-xs font-semibold dark:border-slate-700 dark:bg-dark-tertiary">
            <button
              type="button"
              onClick={() => setActiveTab('library')}
              className={`flex items-center gap-2 rounded-full px-4 py-2 transition ${
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
              className={`flex items-center gap-2 rounded-full px-4 py-2 transition ${
                activeTab === 'editor'
                  ? 'bg-white text-primary-green shadow-sm ring-1 ring-primary-green/30 dark:bg-slate-900'
                  : 'text-slate-600 hover:text-primary-green dark:text-slate-300'
              }`}
            >
              <Pencil2Icon className="h-4 w-4" />
              Pixel editor
            </button>
          </div>
        </div>

        {activeTab === 'library' ? (
          <>
            <div className="px-6 pb-4 pt-1">
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
                {categories.map((category) => {
                  const isActive = activeCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                        isActive
                          ? 'border-primary-green bg-primary-green/10 text-primary-green'
                          : 'border-slate-200 text-slate-700 hover:border-primary-green/50 hover:text-primary-green dark:border-slate-700 dark:text-slate-200 dark:hover:border-primary-green/60'
                      }`}
                    >
                      {category === 'all' ? 'All assets' : category}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="max-h-[55vh] overflow-y-auto border-t border-slate-200 bg-light-tertiary px-6 py-4 dark:border-slate-700 dark:bg-dark-tertiary">
              {filteredAssets.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-sm text-slate-600 shadow-sm dark:border-slate-700 dark:bg-dark-secondary dark:text-slate-300">
                  <p>No assets match your search yet.</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Once assets are uploaded, they will appear here for you.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredAssets.map((asset) => (
                    <div
                      key={asset.id}
                      className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-700 dark:bg-dark-secondary"
                    >
                      <div
                        className="relative flex aspect-4/3 cursor-grab items-center justify-center bg-white dark:bg-slate-900"
                        draggable
                        onDragStart={handleDragStart(asset)}
                        onClick={handleAssetClick(asset)}
                        title="Click to add to center or drag into the game window"
                      >
                        <img
                          src={asset.preview}
                          alt={asset.name}
                          className="h-28 w-auto max-w-[85%] object-contain drop-shadow-sm"
                          style={{ imageRendering: 'pixelated' }}
                        />
                        <div className="absolute right-3 top-3 rounded-full bg-black/5 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-700 dark:bg-white/10 dark:text-slate-100">
                          {asset.category}
                        </div>
                      </div>
                      <div className="flex items-center justify-between px-3 py-2">
                        <div>
                          <div className="text-sm font-semibold">
                            {asset.name}
                          </div>
                          <p className="text-[11px] text-slate-600 dark:text-slate-300">
                            {asset.tags.join(' • ')}
                          </p>
                        </div>
                        <span className="rounded-full bg-primary-green/10 px-2 py-1 text-[11px] font-semibold text-primary-green">
                          BMP
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="max-h-[55vh] overflow-y-auto border-t border-slate-200 bg-light-tertiary px-6 py-5 dark:border-slate-700 dark:bg-dark-tertiary">
            <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
              <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/60">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">
                      Canvas
                    </p>
                    <h4 className="text-sm font-semibold">32 x 32 pixels</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-light-tertiary px-3 py-1 text-[11px] font-semibold text-slate-600 transition hover:border-primary-green/50 hover:text-primary-green dark:border-slate-700 dark:bg-dark-tertiary dark:text-slate-200">
                      <input
                        type="checkbox"
                        checked={showGrid}
                        onChange={() => setShowGrid((prev) => !prev)}
                        className="h-3 w-3 accent-primary-green"
                      />
                      Grid
                    </label>
                    <button
                      type="button"
                      className="rounded-full border border-red-300 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-red-600 transition hover:bg-red-50 dark:border-red-500/60 dark:text-red-200 dark:hover:bg-red-500/10"
                      onClick={resetCanvas}
                    >
                      Clear
                    </button>
                  </div>
                </div>
                <div className="relative mx-auto flex max-w-full justify-center rounded-lg border border-slate-200 bg-light-tertiary p-3 shadow-inner dark:border-slate-700 dark:bg-slate-950/60">
                  <canvas
                    ref={canvasRef}
                    className="h-[320px] w-[320px] cursor-crosshair select-none touch-none"
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-black/5 dark:ring-white/10" />
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Click and drag to paint. Shift to eraser by toggling the
                  eraser button; brush starts at 2x2 for quick fills.
                </p>
              </div>

              <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/60">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-300">
                      Brush
                    </p>
                    <h4 className="text-sm font-semibold">Size & Mode</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsErasing(false)}
                      className={`flex items-center gap-1 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide transition ${
                        !isErasing
                          ? 'border-primary-green bg-primary-green/10 text-primary-green'
                          : 'border-slate-200 text-slate-700 hover:border-primary-green/50 hover:text-primary-green dark:border-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <Pencil2Icon className="h-3.5 w-3.5" />
                      Paint
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsErasing(true)}
                      className={`flex items-center gap-1 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide transition ${
                        isErasing
                          ? 'border-primary-green bg-primary-green/10 text-primary-green'
                          : 'border-slate-200 text-slate-700 hover:border-primary-green/50 hover:text-primary-green dark:border-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <EraserIcon className="h-3.5 w-3.5" />
                      Erase
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {[1, 2, 3, 4].map((size) => {
                    const isActive = brushSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setBrushSize(size)}
                        className={`rounded-md border px-3 py-2 text-xs font-semibold transition ${
                          isActive
                            ? 'border-primary-green bg-primary-green/10 text-primary-green shadow-sm'
                            : 'border-slate-200 text-slate-700 hover:border-primary-green/50 hover:text-primary-green dark:border-slate-700 dark:text-slate-200'
                        }`}
                        title={`${size}x${size} brush`}
                      >
                        {size}x{size}
                      </button>
                    );
                  })}
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-300">
                    Palette
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {palette.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => {
                          setSelectedColor(color);
                          setIsErasing(false);
                        }}
                        className={`h-8 w-8 rounded-md border ring-offset-2 transition ${
                          selectedColor === color && !isErasing
                            ? 'ring-2 ring-primary-green'
                            : 'ring-0'
                        }`}
                        style={{ backgroundColor: color }}
                        title={`Use ${color}`}
                      />
                    ))}
                    <label
                      className="flex h-8 w-20 cursor-pointer items-center justify-center rounded-md border border-slate-300 bg-light-tertiary text-[11px] font-semibold uppercase tracking-wide text-slate-700 transition hover:border-primary-green/60 hover:text-primary-green dark:border-slate-700 dark:bg-dark-tertiary dark:text-slate-200"
                      title="Pick a custom color"
                    >
                      Pick
                      <input
                        type="color"
                        value={selectedColor}
                        onChange={(event) => {
                          setSelectedColor(event.target.value);
                          setIsErasing(false);
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div className="rounded-lg border border-slate-200 bg-light-tertiary px-3 py-2 text-xs dark:border-slate-700 dark:bg-dark-tertiary">
                  <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-300">
                    Preview
                  </p>
                  <div className="mt-2 flex items-center gap-3">
                    <canvas
                      ref={previewRef}
                      className="h-28 w-28 rounded-md border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-950"
                    />
                    <div className="flex-1">
                      <label className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-300">
                        Sprite name
                      </label>
                      <input
                        type="text"
                        value={spriteName}
                        onChange={(event) => setSpriteName(event.target.value)}
                        className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-2 ring-transparent transition focus:border-primary-green focus:ring-primary-green/30 dark:border-slate-700 dark:bg-dark-tertiary dark:text-slate-100"
                        placeholder="Custom Sprite"
                      />
                    </div>
                  </div>
                  <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-300">
                    Starts blank at 32x32 with a 2x2 brush. Export to drop it
                    into the scene instantly.
                  </p>
                </div>

                <div className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-light-tertiary px-3 py-3 text-xs dark:border-slate-700 dark:bg-dark-tertiary">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-300">
                      Ready to place
                    </span>
                    <span
                      className={`rounded-full px-2 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                        hasPixels
                          ? 'bg-primary-green/10 text-primary-green'
                          : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {hasPixels ? 'Painted' : 'Empty'}
                    </span>
                  </div>
                  <Button
                    className="btn-confirm w-full justify-center"
                    disabled={!hasPixels}
                    onClick={handleSaveCustomSprite}
                    title="Export this sprite and add it to the scene"
                  >
                    Add to game from editor
                  </Button>
                  {!hasPixels && (
                    <p className="text-[11px] text-slate-500 dark:text-slate-300">
                      Paint a few pixels to enable export. Transparent pixels
                      stay transparent in the scene.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-end gap-2 border-t border-slate-200 bg-white px-6 py-4 dark:border-slate-700 dark:bg-dark-secondary">
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
        </div>
      </div>
    </div>
  );
};

export default SpriteModal;
