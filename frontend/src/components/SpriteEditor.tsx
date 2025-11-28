"use client";

import { memo, useState } from 'react';
import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import { Button } from './ui/Button';
import SpriteModal from './SpriteModal';

export type SpriteInstance = {
  id: string;
  texture: string;
  label: string;
  variableName: string;
  x: number;
  y: number;
  blockId?: string;
};

type Props = {
  sprites: SpriteInstance[];
  onRemoveSprite: (spriteId: string) => void;
};

const SpriteEditor = memo(function SpriteEditor({
  sprites,
  onRemoveSprite,
}: Props) {
  const [isAssetModalOpen, setIsAssetModalOpen] = useState(false);

  return (
    <section className="flex-1 rounded-lg bg-light-secondary p-4 text-sm shadow dark:bg-dark-secondary">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold">Sprite Editor</h2>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Plan your sprite library and drag assets into the game view.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-slate-700 shadow-sm dark:bg-dark-tertiary dark:text-slate-200">
            {sprites.length} in scene
          </span>
          <Button
            className="btn-confirm whitespace-nowrap px-4"
            onClick={() => setIsAssetModalOpen(true)}
            title="Open asset library"
          >
            Add sprite to game
          </Button>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-dashed border-slate-400 bg-light-tertiary p-4 text-xs text-slate-700 shadow-inner dark:border-slate-600 dark:bg-dark-tertiary dark:text-slate-200">
        <div className="flex items-center gap-2 font-semibold uppercase tracking-wide">
          <MixerHorizontalIcon className="h-4 w-4" />
          <span>Asset library preview</span>
        </div>
        <p className="mt-2 text-[13px] leading-relaxed">
          Click &ldquo;Add sprite to game&rdquo; to open the asset picker. You
          can search, filter, and drag a placeholder card into the Phaser window
          to prototype placement while the real asset library is being wired up.
        </p>
      </div>

      <div className="mt-6 flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-dark-tertiary">
        <div className="flex items-center justify-between bg-light-hover px-3 py-2 text-[11px] font-semibold uppercase tracking-wide dark:bg-dark-hover">
          <span>Active sprites</span>
          <span className="text-slate-500 dark:text-slate-300">
            {sprites.length > 0 ? 'Click remove to clear' : 'Empty'}
          </span>
        </div>
        {sprites.length === 0 ? (
          <p className="px-3 py-4 text-xs text-slate-500 dark:text-slate-300">
            No sprites yet. Choose an asset and drag it into the game to
            generate one.
          </p>
        ) : (
          <ul className="max-h-40 space-y-2 overflow-y-auto p-3">
            {sprites.map((sprite) => (
              <li
                key={sprite.id}
                className="flex items-center justify-between rounded-md border border-slate-200 bg-light-tertiary px-3 py-2 text-xs shadow-sm transition hover:border-primary-green/70 hover:bg-white dark:border-slate-700 dark:bg-dark-secondary dark:hover:border-primary-green/60 dark:hover:bg-dark-hover"
              >
                <div className="flex flex-col">
                  <span className="font-semibold">{sprite.variableName}</span>
                  <span className="text-[11px] text-slate-600 dark:text-slate-300">
                    {sprite.label} @ ({sprite.x}, {sprite.y})
                  </span>
                </div>
                <button
                  type="button"
                  className="rounded border border-red-300 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-red-600 transition hover:bg-red-50 dark:border-red-500/60 dark:text-red-300 dark:hover:bg-red-500/10"
                  onClick={() => onRemoveSprite(sprite.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <SpriteModal
        isAssetModalOpen={isAssetModalOpen}
        setIsAssetModalOpen={setIsAssetModalOpen}
      />
    </section>
  );
});

export default SpriteEditor;
