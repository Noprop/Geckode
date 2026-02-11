import { useGeckodeStore } from '@/stores/geckodeStore';

const PhaserSceneList = () => {
  const setIsSpriteModalOpen = useGeckodeStore((state) => state.setIsSpriteModalOpen);
  const scenes = useGeckodeStore((s) => s.scenes);
  const tilemaps = useGeckodeStore((s) => s.tilemaps);

  const handleSceneClick = () => {
    setIsSpriteModalOpen(true);
  };

  return (
    <div className="w-1/3 flex flex-col pl-3 overflow-hidden">
      <div className="py-2">
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Scene</span>
      </div>

      <div className="flex-1 pt-2 flex flex-col gap-3">
        {scenes.map((scene) => {
          const tilemap = tilemaps[scene.tilemapId];
          return (
            <button
              key={scene.id}
              type="button"
              onClick={handleSceneClick}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-600 overflow-hidden cursor-pointer transition-all hover:border-primary-green hover:ring-2 hover:ring-primary-green/30 focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/30"
            >
              <div
                className="w-full aspect-4/3"
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
              <div className="px-2 py-1.5 bg-white dark:bg-dark-secondary border-t border-slate-200 dark:border-slate-600">
                <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">{scene.name}</div>
                {tilemap && (
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                    {tilemap.name} ({tilemap.width}x{tilemap.height})
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PhaserSceneList;
