"use client";

import { useState, useMemo } from 'react';
import { useGeckodeStore } from '@/stores/geckodeStore';

type TabId = 'library' | 'editor' | 'assets';

interface SpriteLibraryProps {
  setActiveTab: (tab: TabId) => void;
}

const SpriteLibrary = ({ setActiveTab }: SpriteLibraryProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const libaryTextures = useGeckodeStore((s) => s.libaryTextures);
  const setEditingAsset = useGeckodeStore((s) => s.setEditingAsset);

  const filteredEntries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return Object.entries(libaryTextures).filter(
      ([textureName]) => !query || textureName.toLowerCase().includes(query),
    );
  }, [searchQuery, libaryTextures]);

  const handleTextureClick = (textureName: string) => {
    setEditingAsset(textureName, 'textures', 'library');
    setActiveTab('editor');
  };

  return (
    <div className="flex-1 min-h-0 overflow-y-auto border-t border-slate-200 bg-light-tertiary px-6 py-4 dark:border-slate-700 dark:bg-dark-tertiary">
      {filteredEntries.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-sm text-slate-600 shadow-sm dark:border-slate-700 dark:bg-dark-secondary dark:text-slate-300">
          <p>No sprites match your search yet.</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Library textures provided by Geckode appear here.
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4">
            {filteredEntries.map(([textureName, base64]) => (
              <div
              key={textureName}
              role="button"
              tabIndex={0}
              onClick={() => handleTextureClick(textureName)}
              onKeyDown={(e) =>
                e.key === 'Enter' && handleTextureClick(textureName)
              }
              className="group relative flex w-36 flex-col overflow-hidden rounded-xs border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-700 dark:bg-dark-secondary cursor-pointer"
              title="Click to edit in sprite editor"
            >
              <div className="relative flex aspect-4/3 items-center justify-center bg-white dark:bg-slate-900">
                <img
                  src={base64}
                  alt={textureName}
                  className="h-17 object-contain drop-shadow-sm"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
              <div className="flex items-center justify-between px-3 py-2">
                <div className="text-sm font-semibold truncate">{textureName}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpriteLibrary;
