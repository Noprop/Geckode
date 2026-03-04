'use client';

import { useEffect, useMemo } from 'react';
import { PlusIcon } from '@radix-ui/react-icons';
import { useGeckodeStore } from '@/stores/geckodeStore';
import type { AssetType, Tileset } from '@/stores/slices/types';
import { TILE_PX, TILESET_WIDTH } from '@/stores/slices/spriteSlice';
import { useTilePixelCache, rebuildPixelBuffer } from '@/hooks/useTilePixelCache';
import { type SelectedAsset } from './Overview';
import { TAB_CONFIG } from './Overview';

interface AssetListProps {
  filter: AssetType;
  activeTab: AssetType;
  onTabChange: (tab: AssetType) => void;
  selectedAsset: SelectedAsset;
  onSelectAsset: (asset: SelectedAsset) => void;
  onCreateNew: () => void;
  onDoubleClickAsset?: (asset: SelectedAsset) => void;
}

const AssetList = ({ filter, activeTab, onTabChange, selectedAsset, onSelectAsset, onCreateNew, onDoubleClickAsset }: AssetListProps) => {
  const assets = useGeckodeStore((s) => s[filter]);
  const tileTextures = useGeckodeStore((s) => s.tiles);
  const updateTileset = useGeckodeStore((s) => s.updateTileset);
  const canEditProject = useGeckodeStore((state) => state.canEditProject);

  const { tilePixelsRef, isReady } = useTilePixelCache(tileTextures);

  // Auto-generate base64Preview for tilesets that don't have one (e.g. after fresh load)
  useEffect(() => {
    if (filter !== 'tilesets' || !isReady) return;
    const tilesets = assets as Tileset[];
    const needsPreview = tilesets.filter((ts) => !ts.base64Preview);
    if (needsPreview.length === 0) return;

    for (const tileset of needsPreview) {
      const rows = Math.max(5, tileset.data.length);
      const pixelW = TILESET_WIDTH * TILE_PX;
      const pixelH = rows * TILE_PX;
      const grid = Array.from({ length: rows }, (_, r) =>
        Array.from({ length: TILESET_WIDTH }, (_, c) => tileset.data[r]?.[c] ?? null),
      );
      const buf = new Uint8ClampedArray(pixelW * pixelH * 4);
      rebuildPixelBuffer(buf, grid, tilePixelsRef.current, TILESET_WIDTH, rows, TILE_PX);
      const canvas = document.createElement('canvas');
      canvas.width = pixelW;
      canvas.height = pixelH;
      const ctx = canvas.getContext('2d')!;
      const imgData = ctx.createImageData(pixelW, pixelH);
      imgData.data.set(buf);
      ctx.putImageData(imgData, 0, 0);
      updateTileset(tileset.id, { ...tileset, base64Preview: canvas.toDataURL('image/png') });
    }
  }, [filter, isReady, assets, tilePixelsRef, updateTileset]);

  const entries = useMemo(
    () => {
      if (filter === 'tilesets') {
        return (assets as Tileset[]).map((tileset) => ({
          name: tileset.id,
          label: tileset.name,
          base64: tileset.base64Preview,
          type: filter,
        }));
      }
      return Object.entries(assets as Record<string, string>).map(([name, val]) => ({
        name,
        label: name,
        base64: val,
        type: filter,
      }));
    },
    [assets, filter],
  );

  const isSelected = (e: { name: string; type: AssetType }) =>
    selectedAsset?.name === e.name && selectedAsset?.type === e.type;

  return (
    <div className="flex flex-1 min-h-0 flex-col">
      {/* Tab row */}
      <div className="relative shrink-0 flex px-4 pt-2">
        {TAB_CONFIG.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`relative z-10 cursor-pointer px-4 py-2 text-xs font-semibold transition ${
              activeTab === tab.id
                ? 'text-primary-green border-b-2 border-primary-green'
                : 'text-slate-500 hover:text-primary-green dark:text-slate-400 border-b-2 border-transparent'
            }`}
          >
            {tab.label}
          </button>
        ))}
        {/* Full-width bottom border sits behind tab borders */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-200 dark:bg-slate-700" />
      </div>

      {/* Asset grid */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4">
        <div className="flex flex-wrap gap-3">
          {canEditProject && (
            <button
              type="button"
              onClick={onCreateNew}
              className="group flex w-[120px] flex-col items-center justify-center gap-1 rounded-md border-2 border-dashed border-slate-300 bg-white/60 py-8 transition hover:border-primary-green hover:bg-primary-green/5 dark:border-slate-600 dark:bg-dark-secondary/60 dark:hover:border-primary-green"
            >
              <PlusIcon className="h-6 w-6 text-slate-400 group-hover:text-primary-green dark:text-slate-500" />
              <span className="text-[11px] font-semibold text-slate-400 group-hover:text-primary-green dark:text-slate-500">
                New {TAB_CONFIG.find((tab) => tab.id === filter)?.label.slice(0, -1)}
              </span>
            </button>
          )}

          {entries.map((entry) => (
            <button
              type="button"
              key={`${entry.type}-${entry.name}`}
              onClick={() => onSelectAsset({ name: entry.name, type: entry.type })}
              onDoubleClick={() => canEditProject && onDoubleClickAsset?.({ name: entry.name, type: entry.type })}
              className={`group relative flex w-[120px] cursor-pointer flex-col overflow-hidden rounded-md border bg-white shadow-sm transition dark:bg-dark-secondary ${
                isSelected(entry)
                  ? 'border-primary-green ring-2 ring-primary-green/30'
                  : 'border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600'
              }`}
            >
              <div className="relative flex aspect-square items-center justify-center bg-white dark:bg-slate-900">
                {entry.base64 ? (
                  <img
                    src={entry.base64}
                    alt={entry.label}
                    className="h-14 object-contain drop-shadow-sm"
                    style={{ imageRendering: 'pixelated' }}
                  />
                ) : (
                  <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">
                    No preview
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between px-2 py-1.5">
                <div className="truncate text-[11px] font-semibold">{entry.label}</div>
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
    </div>
  );
};

export default AssetList;
