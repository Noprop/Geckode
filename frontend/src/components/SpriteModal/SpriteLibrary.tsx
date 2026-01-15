'use client';

import { useState, useMemo, Dispatch, SetStateAction } from 'react';
import type { SpriteAddPayload } from '@/stores/spriteStore';
import { useEditorStore } from '@/stores/editorStore';
import { useSpriteStore } from '@/stores/spriteStore';

const HERO_WALK_FRONT = '/heroWalkFront1.bmp';
const HERO_WALK_BACK = '/heroWalkBack1.bmp';
const HERO_WALK_LEFT = '/heroWalkSideLeft2.bmp';

const HERO_WALK_RIGHT =
  'data:image/png;base64,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';

const spriteLibrary: SpriteAddPayload[] = [
  {
    name: 'Hero Walk Front',
    textureName: 'hero-walk-front',
    textureUrl: HERO_WALK_FRONT,
  },
  {
    name: 'Hero Walk Back',
    textureName: 'hero-walk-back',
    textureUrl: HERO_WALK_BACK,
  },
  {
    name: 'Hero Walk Left',
    textureName: 'hero-walk-left',
    textureUrl: HERO_WALK_LEFT,
  },
  {
    name: 'Hero Walk Right',
    textureName: 'hero-walk-right',
    textureUrl: HERO_WALK_RIGHT,
  },
];

type Props = {
  setIsSpriteModalOpen: Dispatch<SetStateAction<boolean>>;
};

const SpriteLibrary = ({ setIsSpriteModalOpen }: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const addSpriteToGame = useSpriteStore((state) => state.addSpriteToGame);

  const filteredSprites = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return spriteLibrary.filter((sprite) => {
      return !query || sprite.name.toLowerCase().includes(query);
    });
  }, [searchQuery]);

  const handleSpriteClick = async (sprite: SpriteAddPayload) => {
    const success = await addSpriteToGame({
      name: sprite.name,
      textureName: sprite.textureName,
      textureUrl: sprite.textureUrl,
      x: 240,
      y: 180,
    });
    if (success) setIsSpriteModalOpen(false);
  };

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

      <div className="h-[82vh] overflow-y-auto border-t border-slate-200 bg-light-tertiary px-6 py-4 dark:border-slate-700 dark:bg-dark-tertiary">
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
                className="flex w-36 flex-col overflow-hidden rounded-xs border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-700 dark:bg-dark-secondary cursor-pointer"
                onClick={() => handleSpriteClick(sprite)}
                title="Click to add to center of the game window"
              >
                <div className="relative flex aspect-4/3 items-center justify-center bg-white dark:bg-slate-900">
                  <img
                    src={sprite.textureUrl}
                    alt={sprite.name}
                    className="h-17 object-contain drop-shadow-sm"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </div>
                <div className="flex items-center justify-between px-3 py-2">
                  <div className="text-sm font-semibold">{sprite.name}</div>
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
