"use client";

import { useMemo, useState } from 'react';
import type { Dispatch, DragEvent, SetStateAction } from 'react';
import {
  Cross2Icon,
  MagnifyingGlassIcon,
  MixerHorizontalIcon,
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
const HERO_WALK_RIGHT = '/heroWalkSideRight2.bmp';

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
              Choose a bitmap sprite
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Search, filter, and drag a bitmap frame into the game canvas to
              place it, or click a card to drop it in the center.
            </p>
          </div>
          <div className="hidden items-center gap-2 rounded-full bg-primary-green/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-primary-green sm:flex">
            Bitmap ready
          </div>
        </div>

        <div className="px-6 pb-4 pt-4">
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
                      <div className="text-sm font-semibold">{asset.name}</div>
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
