'use client';

import { useState, useMemo } from 'react';
import { useGeckodeStore } from '@/stores/geckodeStore';
import { getLibraryTileDisplayName } from '@/stores/slices/spriteSlice';

type TabId = 'library' | 'editor' | 'assets';

interface TileLibraryProps {
  setActiveTab: (tab: TabId) => void;
}

const TileLibrary = ({ setActiveTab }: TileLibraryProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const libaryTiles = useGeckodeStore((s) => s.libaryTiles);
  const editingSource = useGeckodeStore((s) => s.editingSource);
  const setEditingAsset = useGeckodeStore((s) => s.setEditingAsset);
  const setEditingTextureToLoad = useGeckodeStore((s) => s.setEditingTextureToLoad);

  const filteredEntries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return Object.entries(libaryTiles).filter(
      ([tileName]) => !query || getLibraryTileDisplayName(tileName).toLowerCase().includes(query),
    );
  }, [searchQuery, libaryTiles]);

  const handleTileClick = (tileName: string) => {
    if (editingSource === 'asset') {
      setEditingTextureToLoad(tileName);
    } else {
      setEditingAsset(tileName, 'tiles', 'library');
    }
    setActiveTab('editor');
  };

  return (
    <div className="flex-1 min-h-0 overflow-y-auto border-t border-slate-200 bg-light-tertiary px-6 py-4 dark:border-slate-700 dark:bg-dark-tertiary">
      {filteredEntries.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-sm text-slate-600 shadow-sm dark:border-slate-700 dark:bg-dark-secondary dark:text-slate-300">
          <p>No tiles match your search yet.</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Library tiles provided by Geckode appear here.
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
              <div className="relative flex aspect-square items-center justify-center bg-white dark:bg-slate-900">
                <img
                  src={base64}
                  alt={tileName}
                  className="h-17 w-17 object-contain drop-shadow-sm"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
              <div className="flex items-center justify-between px-3 py-2">
                <div className="text-sm font-semibold truncate">{getLibraryTileDisplayName(tileName)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TileLibrary;
