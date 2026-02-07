import { BaseApiInnerReturn, createBaseApi } from "@/lib/api/base";
import { Sprite, SpriteFilters, SpritePayload } from "@/lib/types/api/sprites/sprites";
import React from "react";

interface Props {
  sprite: Sprite;
  onClick?: () => void;

  // api used to get sample sprites (could be public or project-based)
  spriteApi?: BaseApiInnerReturn<typeof createBaseApi<Sprite, SpritePayload, SpriteFilters>>;
}
const SpriteBtn = ({ sprite, onClick, spriteApi }: Props) => {
  return (
    <div
      className="flex w-36 flex-col overflow-hidden rounded-xs border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-700 dark:bg-dark-secondary cursor-pointer"
      onClick={() => onClick!()}
      title="Click to add sprite to project!"
    >
      <div className="relative flex aspect-4/3 items-center justify-center bg-white dark:bg-slate-900">
        <img
          key={sprite.id}
          src={sprite.texture}
          alt={sprite.name}
          className="h-17 w-17 object-contain drop-shadow-sm"
          style={{ imageRendering: "pixelated" }}
        />
      </div>
      <div className="flex items-center justify-between px-3 py-2">
        <div className="text-sm font-semibold">{sprite.name}</div>
      </div>
    </div>
  );
};

export default SpriteBtn;
