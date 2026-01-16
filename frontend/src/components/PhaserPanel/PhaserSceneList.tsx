import { useSpriteStore } from '@/stores/spriteStore';

const PhaserSceneList = () => {
  // const scenes = useSpriteStore((state) => state.scenes);

  return (
    <div className="w-1/3 flex flex-col pl-3 overflow-hidden">
      <div className="py-2">
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Stage</span>
      </div>

      <div className="flex-1 pt-2 flex flex-col gap-3">
        <div className="w-full aspect-4/3 rounded-lg border border-slate-200 dark:border-slate-600 overflow-hidden">
          <div
            className="w-full h-full"
            style={{
              background: `repeating-linear-gradient(
                45deg,
                #bfdbfe 0px,
                #bfdbfe 8px,
                #93c5fd 8px,
                #93c5fd 16px
              )`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PhaserSceneList;
