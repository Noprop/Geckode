'use client';

import { useState, useMemo, useCallback } from 'react';
import { TrashIcon } from '@radix-ui/react-icons';
import { useGeckodeStore } from '@/stores/geckodeStore';
import { useSnackbar } from '@/hooks/useSnackbar';

type TabId = 'library' | 'editor' | 'assets';

interface SpriteAssetsProps {
  setActiveTab: (tab: TabId) => void;
}

const SpriteAssets = ({ setActiveTab }: SpriteAssetsProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const textures = useGeckodeStore((s) => s.textures);
  const setEditingAsset = useGeckodeStore((s) => s.setEditingAsset);
  const removeAsset = useGeckodeStore((s) => s.removeAsset);
  const showSnackbar = useSnackbar();

  const filteredEntries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return Object.entries(textures).filter(
      ([textureName]) => !query || textureName.toLowerCase().includes(query),
    );
  }, [searchQuery, textures]);

  const handleTextureClick = (textureName: string) => {
    setEditingAsset(textureName, 'textures', 'asset');
    setActiveTab('editor');
  };

  const handleDelete = useCallback(
    (e: React.MouseEvent, textureName: string) => {
      e.stopPropagation();
      if (useGeckodeStore.getState().spriteInstances.some((sprite) => sprite.textureName === textureName)) {
        showSnackbar("A texture may only be deleted if no sprites are using it.", "error");
        return;
      }
      removeAsset(textureName, 'textures');
    },
    [removeAsset],
  );

  return (
    <div className="flex-1 min-h-0 overflow-y-auto border-t border-slate-200 bg-light-tertiary px-6 py-4 dark:border-slate-700 dark:bg-dark-tertiary">
      {filteredEntries.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-sm text-slate-600 shadow-sm dark:border-slate-700 dark:bg-dark-secondary dark:text-slate-300">
          <p>No assets yet.</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Create a new sprite in the Editor or add one from the Library.
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
              <button
                type="button"
                onClick={(e) => handleDelete(e, textureName)}
                className="absolute right-1 top-1 z-10 rounded p-1 text-slate-400 opacity-0 transition hover:bg-red-100 hover:text-red-600 group-hover:opacity-100 dark:hover:bg-red-900/30 dark:hover:text-red-400"
                title="Delete asset"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
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

export default SpriteAssets;
