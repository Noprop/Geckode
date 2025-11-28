"use client";

import { useState, useMemo } from 'react'
import type { Dispatch, DragEvent, SetStateAction } from 'react';
import {
  Cross2Icon,
  MagnifyingGlassIcon,
  MixerHorizontalIcon,
  StarFilledIcon,
} from '@radix-ui/react-icons';
import { Button } from './ui/Button';

const buildPreviewDataUrl = (label: string, palette: string[]): string => {
  const [start, mid = start, end = mid] = palette;
  const initials = label.slice(0, 2).toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="160" viewBox="0 0 240 160">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="${start}" offset="0%"/>
        <stop stop-color="${mid}" offset="55%"/>
        <stop stop-color="${end}" offset="100%"/>
      </linearGradient>
    </defs>
    <rect rx="24" width="240" height="160" fill="url(#g)"/>
    <circle cx="60" cy="60" r="22" fill="white" fill-opacity="0.15"/>
    <circle cx="190" cy="40" r="18" fill="white" fill-opacity="0.18"/>
    <text x="32" y="118" font-family="Inter, sans-serif" font-size="48" font-weight="700" fill="#0f172a" fill-opacity="0.75">${initials}</text>
  </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

const SPRITE_LIBRARY: SpriteAsset[] = [
  {
    id: 'aurora-guardian',
    name: 'Aurora Guardian',
    category: 'Creatures',
    tags: ['ally', 'air', 'support'],
    palette: ['#e0f2fe', '#c084fc', '#7c3aed'],
    accent: '#7c3aed',
    description: 'A bright guardian placeholder for aerial routes and allies.',
    preview: '',
  },
  {
    id: 'ember-runner',
    name: 'Ember Runner',
    category: 'Creatures',
    tags: ['agile', 'fire', 'dash'],
    palette: ['#fff7ed', '#fdba74', '#ea580c'],
    accent: '#ea580c',
    description: 'Fast, warm-toned runner for chase sequences.',
    preview: '',
  },
  {
    id: 'clockwork-drone',
    name: 'Clockwork Drone',
    category: 'Props',
    tags: ['mechanical', 'ally', 'hover'],
    palette: ['#e2e8f0', '#a5b4fc', '#4338ca'],
    accent: '#4338ca',
    description: 'Floating helper suited for puzzle hints or pickups.',
    preview: '',
  },
  {
    id: 'luminous-shard',
    name: 'Luminous Shard',
    category: 'Environment',
    tags: ['crystal', 'collectible', 'light'],
    palette: ['#ecfeff', '#67e8f9', '#0ea5e9'],
    accent: '#0ea5e9',
    description: 'Glowing shard placeholder for collectibles or portals.',
    preview: '',
  },
  {
    id: 'mist-platform',
    name: 'Mist Platform',
    category: 'Environment',
    tags: ['platform', 'floating', 'support'],
    palette: ['#f8fafc', '#cbd5e1', '#475569'],
    accent: '#475569',
    description: 'Soft platform tile for traversal tests.',
    preview: '',
  },
  {
    id: 'coral-banner',
    name: 'Coral Banner',
    category: 'Props',
    tags: ['ui', 'flag', 'marker'],
    palette: ['#fff1f2', '#fb7185', '#be123c'],
    accent: '#be123c',
    description: 'Marker/banner graphic for checkpoints or HUD callouts.',
    preview: '',
  },
].map((asset) => ({
  ...asset,
  preview: buildPreviewDataUrl(asset.name, asset.palette),
}));

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
  palette: string[];
  accent: string;
  preview: string;
  description: string;
};

type Props = {
  isAssetModalOpen: boolean;
  setIsAssetModalOpen: Dispatch<SetStateAction<boolean>>;
}

const SpriteModal = ({ isAssetModalOpen, setIsAssetModalOpen, }: Props) => {

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

  const handleDragStart =
    (asset: SpriteAsset) => (event: DragEvent<HTMLDivElement>) => {
      const payload: SpriteDragPayload = {
        kind: 'sprite-blueprint',
        label: asset.name,
        texture: asset.id,
        dataUrl: asset.preview,
      };
      event.dataTransfer.setData('application/json', JSON.stringify(payload));
      event.dataTransfer.effectAllowed = 'move';
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
              Choose a sprite asset
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Search, filter, and drag a card into the game canvas to place it.
              Asset files will connect here later.
            </p>
          </div>
          <div className="hidden items-center gap-2 rounded-full bg-primary-green/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-primary-green sm:flex">
            <StarFilledIcon className="h-3.5 w-3.5" />
            Prototype view
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
                Once assets are uploaded, they will appear here for quick
                placement.
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
                    className="relative h-32 cursor-grab overflow-hidden"
                    draggable
                    onDragStart={handleDragStart(asset)}
                    title="Drag into the game window"
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${asset.palette[0]}, ${asset.palette[1]}, ${asset.palette[2]})`,
                      }}
                    />
                    <img
                      src={asset.preview}
                      alt={`${asset.name} placeholder`}
                      className="absolute inset-0 h-full w-full object-cover opacity-70 mix-blend-luminosity"
                    />
                    <div className="absolute right-3 top-3 rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold text-slate-700 shadow-sm dark:bg-slate-900/80 dark:text-slate-100">
                      {asset.category}
                    </div>
                    <div className="absolute bottom-3 left-3 rounded-md bg-black/40 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                      Drag to game
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold">
                          {asset.name}
                        </div>
                        <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                          {asset.description}
                        </p>
                      </div>
                      <StarFilledIcon
                        className="h-4 w-4 text-amber-400"
                        aria-hidden
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 text-[11px]">
                      {asset.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-slate-100 px-2 py-1 font-semibold text-slate-700 shadow-sm dark:bg-slate-800 dark:text-slate-200"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-300">
                      <span>Coming soon: attach real assets</span>
                      <span className="rounded-full bg-primary-green/10 px-2 py-1 font-semibold text-primary-green">
                        Placeholder
                      </span>
                    </div>
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
}

export default SpriteModal;