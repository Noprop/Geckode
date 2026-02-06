import { BaseApiInnerReturn, createBaseApi } from "@/lib/api/base";
import spriteLibrariesApi from "@/lib/api/handlers/spriteLibraries";
import { SpriteLibrary } from "@/lib/types/api/sprite-libraries";
import { Sprite, SpriteFilters, SpritePayload } from "@/lib/types/api/sprite-libraries/sprites";
import React, { useEffect, useState } from "react";

interface Props {
  spriteLibrary: SpriteLibrary;
  onClick?: (spl: SpriteLibrary) => void;

  // api used to get sample sprites (could be public or project-based)
  spriteApi?: BaseApiInnerReturn<typeof createBaseApi<Sprite, SpritePayload, SpriteFilters>>;
}
const LibraryBtn = ({ spriteLibrary, onClick, spriteApi }: Props) => {
  // up to 3 sample sprites to show on the button
  const [displaySprites, setDisplaySprites] = useState<Sprite[]>();

  useEffect(() => {
    spriteApi?.list({ limit: 3 }).then((res) => setDisplaySprites(res.results));
  }, []);

  return (
    <div
      className="flex w-36 flex-col overflow-hidden rounded-xs border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-700 dark:bg-dark-secondary cursor-pointer"
      onClick={() => onClick!(spriteLibrary)}
      title="Click to see sprites in the library!"
    >
      <div className="relative flex aspect-4/3 items-center justify-center bg-white dark:bg-slate-900">
        {displaySprites?.map((spr) => (
          <img
            key={spr.id}
            src={spr.texture}
            alt={spr.name}
            className="h-17 w-17 object-contain drop-shadow-sm"
            style={{ imageRendering: "pixelated" }}
          />
        ))}
      </div>
      <div className="flex items-center justify-between px-3 py-2">
        <div className="text-sm font-semibold">{spriteLibrary.name}</div>
      </div>
    </div>
  );
};

export default LibraryBtn;
