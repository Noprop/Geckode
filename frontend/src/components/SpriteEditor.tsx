"use client";

import { memo } from "react";
import type { DragEvent } from "react";

export type SpriteDragPayload = {
  kind: "sprite-blueprint";
  texture: string;
  label: string;
};

export type SpriteInstance = {
  id: string;
  texture: string;
  label: string;
  variableName: string;
  x: number;
  y: number;
  blockId?: string;
};

type SpritePaletteItem = {
  key: string;
  label: string;
  texture: string;
  description?: string;
};

const SPRITE_PALETTE: SpritePaletteItem[] = [
  {
    key: "star",
    label: "Star",
    texture: "star",
    description: "Default arcade star sprite",
  },
];

type Props = {
  sprites: SpriteInstance[];
  onRemoveSprite: (spriteId: string) => void;
};

const SpriteEditor = memo(function SpriteEditor({ sprites, onRemoveSprite }: Props) {
  const handleDragStart = (
    event: DragEvent<HTMLDivElement>,
    sprite: SpritePaletteItem
  ) => {
    const payload: SpriteDragPayload = {
      kind: "sprite-blueprint",
      label: sprite.label,
      texture: sprite.texture,
    };
    event.dataTransfer.setData("application/json", JSON.stringify(payload));
    event.dataTransfer.effectAllowed = "copy";
  };

  return (
    <section className="mt-4 rounded-lg border border-slate-300 bg-white/60 p-4 text-sm shadow dark:border-slate-800 dark:bg-slate-900/40">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">Sprite Editor</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Drag sprites into the game view to place them.
        </p>
      </div>

      <div className="mt-3 flex flex-wrap gap-3">
        {SPRITE_PALETTE.map((sprite) => (
          <div
            key={sprite.key}
            draggable
            role="button"
            tabIndex={0}
            onDragStart={(event) => handleDragStart(event, sprite)}
            className="flex w-28 cursor-grab flex-col items-center rounded-md border border-dashed border-slate-400 bg-slate-50 px-2 py-3 text-center text-xs font-medium transition hover:border-slate-600 hover:bg-slate-100 active:cursor-grabbing dark:border-slate-600 dark:bg-slate-800 dark:hover:border-slate-400 dark:hover:bg-slate-700"
          >
            <div className="mb-2 h-10 w-10 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 shadow-inner" />
            <span>{sprite.label}</span>
            {sprite.description ? (
              <span className="mt-1 text-[10px] font-normal text-slate-500 dark:text-slate-400">
                {sprite.description}
              </span>
            ) : null}
          </div>
        ))}
      </div>

      <div className="mt-5">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Scene Sprites
        </h3>
        {sprites.length === 0 ? (
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            No sprites yet. Drag one from the palette and drop it onto the game window.
          </p>
        ) : (
          <ul className="mt-2 space-y-2">
            {sprites.map((sprite) => (
              <li
                key={sprite.id}
                className="flex items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-xs shadow-sm dark:border-slate-700 dark:bg-slate-800"
              >
                <div>
                  <div className="font-semibold">{sprite.variableName}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">
                    {sprite.label} @ ({sprite.x}, {sprite.y})
                  </div>
                </div>
                <button
                  type="button"
                  className="rounded border border-slate-300 px-2 py-1 text-[10px] uppercase tracking-wide text-slate-600 transition hover:border-red-400 hover:text-red-600 dark:border-slate-600 dark:text-slate-200 dark:hover:border-red-400 dark:hover:text-red-300"
                  onClick={() => onRemoveSprite(sprite.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
});

export default SpriteEditor;
