'use client';

import { useMemo } from 'react';
import { PlusIcon } from '@radix-ui/react-icons';
import { useGeckodeStore } from '@/stores/geckodeStore';
import type { AssetType } from '@/stores/slices/types';
import { type SelectedAsset } from './Overview';
import { TAB_CONFIG } from './Overview';

interface AssetListProps {
  filter: AssetType;
  selectedAsset: SelectedAsset;
  onSelectAsset: (asset: SelectedAsset) => void;
  onCreateNew: () => void;
}

const AssetList = ({ filter, selectedAsset, onSelectAsset, onCreateNew }: AssetListProps) => {
  const assets = useGeckodeStore((s) => s[filter]);

  const entries = useMemo(
    () => Object.entries(assets).map(([name, base64]) => ({ name, base64, type: filter })),
    [assets, filter],
  );

  const isSelected = (e: { name: string; type: AssetType }) =>
    selectedAsset?.name === e.name && selectedAsset?.type === e.type;

  return (
    <div className="flex-1 min-h-0 overflow-y-auto bg-light-tertiary px-4 py-4 dark:bg-dark-tertiary">
      <div className="flex flex-wrap gap-3">
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

        {entries.map((entry) => (
          <button
            type="button"
            key={`${entry.type}-${entry.name}`}
            onClick={() => onSelectAsset({ name: entry.name, type: entry.type })}
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

export default AssetList;
