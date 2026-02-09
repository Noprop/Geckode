'use client';

import { useMemo } from 'react';
import { useGeckodeStore } from '@/stores/geckodeStore';

const TextureGallery = () => {
  const tileTextures = useGeckodeStore((s) => s.tileTextures);
  const assetTextures = useGeckodeStore((s) => s.assetTextures);

  const entries = useMemo(() => {
    const tiles: { name: string; base64: string; kind: 'tile' }[] = Object.entries(tileTextures).map(
      ([name, base64]) => ({ name, base64, kind: 'tile' }),
    );
    const assets: { name: string; base64: string; kind: 'sprite' }[] = Object.entries(assetTextures).map(
      ([name, base64]) => ({ name, base64, kind: 'sprite' }),
    );
    return [...tiles, ...assets];
  }, [tileTextures, assetTextures]);

  if (entries.length === 0) {
    return (
      <div className="flex-1 min-h-0 overflow-y-auto border-t border-slate-200 bg-light-tertiary px-6 py-4 dark:border-slate-700 dark:bg-dark-tertiary">
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-sm text-slate-600 shadow-sm dark:border-slate-700 dark:bg-dark-secondary dark:text-slate-300">
          <p>No assets yet.</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Create tiles in the Tile Editor or add sprites from the Sprite Modal.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-0 overflow-y-auto border-t border-slate-200 bg-light-tertiary px-6 py-4 dark:border-slate-700 dark:bg-dark-tertiary">
      <div className="flex flex-wrap gap-4">
        {entries.map(({ name, base64, kind }) => (
          <div
            key={`${kind}-${name}`}
            className="group relative flex w-36 flex-col overflow-hidden rounded-xs border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-dark-secondary"
          >
            <div className="relative flex aspect-4/3 items-center justify-center bg-white dark:bg-slate-900">
              <img
                src={base64}
                alt={name}
                className="h-17 object-contain drop-shadow-sm"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
            <div className="flex items-center justify-between px-3 py-2">
              <div className="text-sm font-semibold truncate">{name}</div>
              <span
                className={`ml-2 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium uppercase ${
                  kind === 'tile'
                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                    : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                }`}
              >
                {kind}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextureGallery;
