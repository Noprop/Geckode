'use client';

import { useState, useMemo, useCallback } from 'react';
import { TrashIcon } from '@radix-ui/react-icons';
import { useSpriteStore } from '@/stores/spriteStore';
import type { SpriteDefinition } from '@/blockly/spriteRegistry';

interface SpriteLibraryProps {
  onSwitchToEditor: () => void;
}

// Load image URL into pixel data
const loadImageToPixels = (url: string): Promise<{ data: Uint8ClampedArray; width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      resolve({ data: new Uint8ClampedArray(imageData.data), width: img.width, height: img.height });
    };
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = url;
  });
};

const SpriteLibrary = ({ onSwitchToEditor }: SpriteLibraryProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const spriteLibrary = useSpriteStore((state) => state.spriteLibrary);
  const spriteTextures = useSpriteStore((state) => state.spriteTextures);
  const setEditingLibrarySprite = useSpriteStore((state) => state.setEditingLibrarySprite);
  const removeFromSpriteLibrary = useSpriteStore((state) => state.removeFromSpriteLibrary);

  const handleDeleteSprite = useCallback((e: React.MouseEvent, spriteId: string) => {
    e.stopPropagation(); // Prevent triggering the card click
    removeFromSpriteLibrary(spriteId);
  }, [removeFromSpriteLibrary]);

  const filteredSprites = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return spriteLibrary.filter((sprite) => {
      return !query || sprite.name.toLowerCase().includes(query);
    });
  }, [searchQuery, spriteLibrary]);

  const handleSpriteClick = useCallback(async (sprite: SpriteDefinition) => {
    const textureInfo = spriteTextures.get(sprite.textureName);
    if (!textureInfo?.url) {
      console.error('No texture URL found for sprite:', sprite.textureName);
      return;
    }

    try {
      const { data } = await loadImageToPixels(textureInfo.url);
      setEditingLibrarySprite(sprite, data);
      onSwitchToEditor();
    } catch (error) {
      console.error('Failed to load sprite image:', error);
    }
  }, [spriteTextures, setEditingLibrarySprite, onSwitchToEditor]);

  return (
    <>
      {/* TODO: Add search and filter functionality */}
      {/* <div className="px-6 pb-4 pt-1">
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
                {spriteCategories.map((category) => {
                  const isActive = activeSpriteCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveSpriteCategory(category)}
                      className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                        isActive
                          ? 'border-primary-green bg-primary-green/10 text-primary-green'
                          : 'border-slate-200 text-slate-700 hover:border-primary-green/50 hover:text-primary-green dark:border-slate-700 dark:text-slate-200 dark:hover:border-primary-green/60'
                      }`}
                    >
                      {category === 'all' ? 'All sprites' : category}
                    </button>
                  );
                })}
              </div>
            </div> */}

      <div className="flex-1 min-h-0 overflow-y-auto border-t border-slate-200 bg-light-tertiary px-6 py-4 dark:border-slate-700 dark:bg-dark-tertiary">
        {filteredSprites.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-sm text-slate-600 shadow-sm dark:border-slate-700 dark:bg-dark-secondary dark:text-slate-300">
            <p>No sprites match your search yet.</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Once sprites are uploaded, they will appear here for you.
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-4">
            {filteredSprites.map((sprite) => (
              <div
                key={sprite.textureName}
                className="group relative flex w-36 flex-col overflow-hidden rounded-xs border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-700 dark:bg-dark-secondary cursor-pointer"
                onClick={() => handleSpriteClick(sprite)}
                title="Click to edit in sprite editor"
              >
                <button
                  type="button"
                  onClick={(e) => handleDeleteSprite(e, sprite.id)}
                  className="absolute right-1 top-1 z-10 rounded p-1 text-slate-400 opacity-0 transition hover:bg-red-100 hover:text-red-600 group-hover:opacity-100 dark:hover:bg-red-900/30 dark:hover:text-red-400"
                  title="Delete sprite from library"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
                <div className="relative flex aspect-4/3 items-center justify-center bg-white dark:bg-slate-900">
                  <img
                    src={spriteTextures.get(sprite.textureName)?.url}
                    alt={sprite.name}
                    className="h-17 object-contain drop-shadow-sm"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </div>
                <div className="flex items-center justify-between px-3 py-2">
                  <div className="text-sm font-semibold truncate">{sprite.name}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SpriteLibrary;
