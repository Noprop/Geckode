import { useGeckodeStore } from '@/stores/geckodeStore';

const PhaserSceneList = () => {
  const setIsSpriteModalOpen = useGeckodeStore((state) => state.setIsSpriteModalOpen);

  const handleSceneClick = () => {
    setIsSpriteModalOpen(true);
  };

  return (
    <div className="w-1/3 flex flex-col pl-3 overflow-hidden">
      <div className="py-2">
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Scene</span>
      </div>

      <div className="flex-1 pt-2 flex flex-col gap-3">
        <button
          type="button"
          onClick={handleSceneClick}
          className="w-full aspect-4/3 rounded-lg border border-slate-200 dark:border-slate-600 overflow-hidden cursor-pointer transition-all hover:border-primary-green hover:ring-2 hover:ring-primary-green/30 focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/30"
        >
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
        </button>
      </div>
    </div>
  );
};

export default PhaserSceneList;
