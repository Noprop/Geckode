import { Sprite } from "@/lib/types/api/assets/index";
import { TrashIcon } from "@radix-ui/react-icons";
import React from "react";

interface Props {
  sprite: Sprite;
  isPublic: boolean;
  handleTextureClick?: (textureName: string) => void;
  handleDelete?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, spr: Sprite) => void;
}
const SpriteBtn = ({ sprite, isPublic, handleTextureClick, handleDelete }: Props) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => handleTextureClick!(sprite.texture)}
      onKeyDown={(e) => e.key === "Enter" && handleTextureClick!(sprite.texture)}
      className="group relative flex w-36 flex-col overflow-hidden rounded-xs border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-700 dark:bg-dark-secondary cursor-pointer"
      title="Click to edit in sprite editor"
    >
      {!isPublic && (
        <button
          type="button"
          onClick={(e) => handleDelete!(e, sprite)}
          className="absolute right-1 top-1 z-10 rounded p-1 text-slate-400 opacity-0 transition hover:bg-red-100 hover:text-red-600 group-hover:opacity-100 dark:hover:bg-red-900/30 dark:hover:text-red-400"
          title="Delete asset"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      )}
      <div className="relative flex aspect-4/3 items-center justify-center bg-white dark:bg-slate-900">
        <img
          src={sprite.texture}
          alt={sprite.name}
          className="h-17 object-contain drop-shadow-sm"
          style={{ imageRendering: "pixelated" }}
        />
      </div>
      <div className="flex items-center justify-between px-3 py-2">
        <div className="text-sm font-semibold truncate">{sprite.name}</div>
      </div>
    </div>
  );
};

export default SpriteBtn;
