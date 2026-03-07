'use client';

import { useState, useMemo, useCallback } from 'react';
import { TrashIcon } from '@radix-ui/react-icons';
import { useGeckodeStore } from '@/stores/geckodeStore';

type TabId = 'library' | 'editor' | 'assets';

interface TileAssetsProps {
  setActiveTab: (tab: TabId) => void;
}

const TileAssets = ({ setActiveTab }: TileAssetsProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const tiles = useGeckodeStore((s) => s.tiles);
  const setEditingAsset = useGeckodeStore((s) => s.setEditingAsset);
  const removeAsset = useGeckodeStore((s) => s.removeAsset);

  const filteredEntries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return Object.entries(tiles).filter(([tileName]) => !query || tileName.toLowerCase().includes(query));
  }, [searchQuery, tiles]);

  const handleTileClick = (tileName: string) => {
    setEditingAsset(tileName, 'tiles', 'asset');
    setActiveTab('editor');
  };

  const handleDelete = useCallback(
    (e: React.MouseEvent, tileName: string) => {
      e.stopPropagation();
      removeAsset(tileName, 'tiles');
    },
    [removeAsset],
  );

  return (
    <div className="flex-1 min-h-0 overflow-y-auto border-t border-slate-200 bg-light-tertiary px-6 py-4 dark:border-slate-700 dark:bg-dark-tertiary">
      {filteredEntries.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-sm text-slate-600 shadow-sm dark:border-slate-700 dark:bg-dark-secondary dark:text-slate-300">
          <p>No assets yet.</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Create a new tile in the Editor or add one from the Library.
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {filteredEntries.map(([tileName, base64]) => (
            <div
              key={tileName}
              role="button"
              tabIndex={0}
              onClick={() => handleTileClick(tileName)}
              onKeyDown={(e) => e.key === 'Enter' && handleTileClick(tileName)}
              className="group relative flex w-36 flex-col overflow-hidden rounded-xs border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-700 dark:bg-dark-secondary cursor-pointer"
              title="Click to edit in tile editor"
            >
              <button
                type="button"
                onClick={(e) => handleDelete(e, tileName)}
                className="absolute right-1 top-1 z-10 rounded p-1 text-slate-400 opacity-0 transition hover:bg-red-100 hover:text-red-600 group-hover:opacity-100 dark:hover:bg-red-900/30 dark:hover:text-red-400"
                title="Delete asset"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
              <div className="relative flex aspect-square items-center justify-center bg-white dark:bg-slate-900">
                <img
                  src={base64}
                  alt={tileName}
                  className="h-17 w-17 object-contain drop-shadow-sm"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
              <div className="flex items-center justify-between px-3 py-2">
                <div className="text-sm font-semibold truncate">{tileName}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TileAssets;
