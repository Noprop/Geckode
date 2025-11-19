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

const SpriteEditor = memo(function SpriteEditor({
  sprites,
  onRemoveSprite,
}: Props) {
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
    <section className="rounded-lg bg-light-secondary dark:bg-dark-secondary p-4 text-sm shadow flex-1 ">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">Sprite Editor</h2>
        <p className="text-xs">
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
            className="flex w-28 cursor-grab flex-col items-center rounded-md border border-dashed bg-light-tertiary dark:bg-dark-tertiary hover:bg-light-hover px-2 py-3 text-center text-xs font-medium transition hover:dark:bg-dark-hover hover:border-slate-600  active:cursor-grabbing dark:border-slate-600  dark:hover:border-slate-400 "
          >
            <div className="mb-2 h-8 w-8 rounded-full bg-linear-to-br from-amber-200 via-amber-400 to-amber-600 shadow-inner" />
            <span>{sprite.label}</span>
            {sprite.description ? (
              <span className="mt-1 text-[10px] font-normal ">
                {sprite.description}
              </span>
            ) : null}
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-col flex-1 overflow-hidden">
        <h3 className="text-xs font-semibold uppercase tracking-wide">
          Scene Sprites
        </h3>
        {sprites.length === 0 ? (
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            No sprites yet. Drag one from the palette and drop it onto the game
            window.
          </p>
        ) : (
          <ul className="mt-2 space-y-2 overflow-y-auto flex-1">
            {sprites.map((sprite) => (
              <li
                key={sprite.id}
                className="flex items-center justify-between rounded-md border bg-light-tertiary dark:bg-dark-tertiary hover:bg-light-hover hover:dark:bg-dark-hover   px-3 py-2 text-xs shadow-sm dark:border-slate-700 "
              >
                <div className="font-semibold">{sprite.variableName}</div>
                <div className="w-full ml-5   text-[10px]">
                  {sprite.label} @ ({sprite.x}, {sprite.y})
                </div>
                <button
                  type="button"
                  className="cursor-pointer rounded border  px-2 py-1 text-[10px] uppercase tracking-wide transition hover:border-red-400 hover:text-red-600 dark:border-slate-600 dark:hover:border-red-400 dark:hover:text-red-300"
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
