'use client';

import { useMemo } from 'react';
import { PlusIcon } from '@radix-ui/react-icons';
import { useGeckodeStore } from '@/stores/geckodeStore';
import type { SelectedAsset } from './TextureDetailPanel';

type TextureKind = 'sprite' | 'tile' | 'tileset' | 'animation' | 'background';

type TextureEntry = {
  name: string;
  base64: string;
  kind: TextureKind;
};

const kindColors: Record<string, string> = {
  sprite: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  tile: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  tileset: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  animation: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
  background: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
};

export type TextureFilter = 'textures' | 'tiles' | 'tilesets' | 'animations' | 'backgrounds';

interface TextureGalleryProps {
  filter: TextureFilter;
  selectedAsset: SelectedAsset;
  onSelectAsset: (asset: SelectedAsset) => void;
  onCreateNew: () => void;
}

const TextureGallery = ({ filter, selectedAsset, onSelectAsset, onCreateNew }: TextureGalleryProps) => {
  const tileTextures = useGeckodeStore((s) => s.tileTextures);
  const assetTextures = useGeckodeStore((s) => s.assetTextures);
  const libraryTextures = useGeckodeStore((s) => s.libraryTextures);
  const tilesetTextures = useGeckodeStore((s) => s.tilesetTextures);
  const animationTextures = useGeckodeStore((s) => s.animationTextures);
  const backgroundTextures = useGeckodeStore((s) => s.backgroundTextures);

  const entries: TextureEntry[] = useMemo(() => {
    switch (filter) {
      case 'textures': {
        const assets: TextureEntry[] = Object.entries(assetTextures).map(([name, base64]) => ({
          name, base64, kind: 'sprite',
        }));
        const library: TextureEntry[] = Object.entries(libraryTextures).map(([name, base64]) => ({
          name, base64, kind: 'sprite',
        }));
        return [...assets, ...library];
      }
      case 'tiles':
        return Object.entries(tileTextures).map(([name, base64]) => ({
          name, base64, kind: 'tile',
        }));
      case 'tilesets':
        return Object.entries(tilesetTextures).map(([name, base64]) => ({
          name, base64, kind: 'tileset',
        }));
      case 'animations':
        return Object.entries(animationTextures).map(([name, base64]) => ({
          name, base64, kind: 'animation',
        }));
      case 'backgrounds':
        return Object.entries(backgroundTextures).map(([name, base64]) => ({
          name, base64, kind: 'background',
        }));
    }
  }, [filter, tileTextures, assetTextures, libraryTextures, tilesetTextures, animationTextures, backgroundTextures]);

  const isSelected = (entry: TextureEntry) =>
    selectedAsset?.name === entry.name && selectedAsset?.kind === entry.kind;

  return (
    <div className="flex-1 min-h-0 overflow-y-auto bg-light-tertiary px-4 py-4 dark:bg-dark-tertiary">
      <div className="flex flex-wrap gap-3">
        {/* "+" create card */}
        <button
          type="button"
          onClick={onCreateNew}
          className="group flex w-[120px] flex-col items-center justify-center gap-1 rounded-md border-2 border-dashed border-slate-300 bg-white/60 py-8 transition hover:border-primary-green hover:bg-primary-green/5 dark:border-slate-600 dark:bg-dark-secondary/60 dark:hover:border-primary-green"
        >
          <PlusIcon className="h-6 w-6 text-slate-400 group-hover:text-primary-green dark:text-slate-500" />
          <span className="text-[11px] font-semibold text-slate-400 group-hover:text-primary-green dark:text-slate-500">
            New Asset
          </span>
        </button>

        {entries.map((entry) => (
          <button
            type="button"
            key={`${entry.kind}-${entry.name}`}
            onClick={() => onSelectAsset({ name: entry.name, kind: entry.kind })}
            className={`group relative flex w-[120px] cursor-pointer flex-col overflow-hidden rounded-md border bg-white shadow-sm transition dark:bg-dark-secondary ${
              isSelected(entry)
                ? 'border-primary-green ring-2 ring-primary-green/30'
                : 'border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600'
            }`}
          >
            <div className="relative flex aspect-square items-center justify-center bg-white dark:bg-slate-900">
              <img
                src={entry.base64}
                alt={entry.name}
                className="h-14 object-contain drop-shadow-sm"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
            <div className="flex items-center justify-between px-2 py-1.5">
              <div className="truncate text-[11px] font-semibold">{entry.name}</div>
              <span
                className={`ml-1 shrink-0 rounded px-1 py-0.5 text-[9px] font-medium uppercase ${kindColors[entry.kind] ?? ''}`}
              >
                {entry.kind}
              </span>
            </div>
          </button>
        ))}

        {entries.length === 0 && (
          <div className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-sm text-slate-600 shadow-sm dark:border-slate-700 dark:bg-dark-secondary dark:text-slate-300">
            <p>No assets in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextureGallery;
