"use client";

import { memo, useState } from 'react';
import type { DragEvent, ChangeEvent } from 'react';

export type SpriteDragPayload = {
  kind: 'sprite-blueprint';
  texture: string;
  label: string;
  dataUrl?: string;
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

type UploadedSprite = {
  key: string;
  label: string;
  texture: string;
  dataUrl: string;
};

type Props = {
  sprites: SpriteInstance[];
  onRemoveSprite: (spriteId: string) => void;
};

const SpriteEditor = memo(function SpriteEditor({
  sprites,
  onRemoveSprite,
}: Props) {
  const [uploadedSprite, setUploadedSprite] = useState<UploadedSprite | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (png, jpg, gif, or webp).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string | null;
      if (!dataUrl) {
        setError('Could not read image file. Please try again.');
        return;
      }
      const baseName = file.name.replace(/\.[^/.]+$/, '');
      const safeKeyBase = baseName.replace(/[^\w]/g, '') || 'sprite';
      const textureKey = `${safeKeyBase}-${Date.now()}`;
      setUploadedSprite({
        key: textureKey,
        label: baseName || 'Uploaded Sprite',
        texture: textureKey,
        dataUrl,
      });
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    if (!uploadedSprite) return;
    const payload: SpriteDragPayload = {
      kind: 'sprite-blueprint',
      label: uploadedSprite.label,
      texture: uploadedSprite.texture,
      dataUrl: uploadedSprite.dataUrl,
    };
    event.dataTransfer.setData('application/json', JSON.stringify(payload));
    event.dataTransfer.effectAllowed = 'move';
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
        <label className="flex w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-slate-400 bg-light-tertiary px-4 py-6 text-center text-xs font-medium shadow-inner transition hover:border-slate-600 hover:bg-light-hover dark:border-slate-700 dark:bg-dark-tertiary dark:hover:border-slate-500 dark:hover:bg-dark-hover">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="mb-2 h-10 w-10 rounded-full bg-linear-to-br from-amber-200 via-amber-400 to-amber-600 shadow-inner" />
          <span>Upload a sprite image</span>
          <span className="mt-1 text-[10px] font-normal">
            PNG, JPG, GIF, or WEBP
          </span>
        </label>

        {uploadedSprite ? (
          <div
            key={uploadedSprite.key}
            draggable
            role="button"
            tabIndex={0}
            onDragStart={handleDragStart}
            className="flex w-full cursor-grab items-center gap-3 rounded-md border border-dashed bg-white px-3 py-2 text-left text-xs font-medium transition hover:border-slate-600 hover:bg-light-hover active:cursor-grabbing dark:border-slate-600 dark:bg-dark-tertiary dark:hover:border-slate-500"
          >
            <div className="h-12 w-12 overflow-hidden rounded-md border border-slate-200 bg-slate-100 shadow-inner dark:border-slate-700 dark:bg-slate-800">
              <img
                src={uploadedSprite.dataUrl}
                alt={uploadedSprite.label}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">
                {uploadedSprite.label}
              </span>
              <span className="text-[10px] text-slate-600 dark:text-slate-300">
                Drag into the game view to place it.
              </span>
            </div>
          </div>
        ) : (
          <div></div>
          // <div
          // //className="flex rounded-md border border-dashed border-slate-300 bg-white px-3 py-2 text-xs text-slate-600 shadow-inner dark:border-slate-700 dark:bg-dark-tertiary dark:text-slate-300">
          // >
          //   Upload an image to enable dragging a sprite into the game.
          // </div>
        )}

        {error ? (
          <p className="w-full text-xs text-red-600 dark:text-red-400">
            {error}
          </p>
        ) : null}
      </div>

      {/* <div className="mt-5 flex flex-col flex-1 overflow-hidden">
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
      </div> */}
    </section>
  );
});

export default SpriteEditor;
