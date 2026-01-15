'use client';

import { useState, useMemo, Dispatch, SetStateAction } from 'react';
import type { SpriteAddPayload } from '@/stores/spriteStore';
import { useEditorStore } from '@/stores/editorStore';
import { useSpriteStore } from '@/stores/spriteStore';

const HERO_WALK_FRONT = '/heroWalkFront1.png';
const HERO_WALK_BACK = '/heroWalkBack1.png';
const HERO_WALK_LEFT = '/heroWalkSideLeft2.png';

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
  // {
  //   name: 'Hero Walk Right',
  //   textureName: 'hero-walk-right',
  //   textureUrl: HERO_WALK_RIGHT,
  // },
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
