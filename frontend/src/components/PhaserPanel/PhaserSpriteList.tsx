import { useEffect } from 'react';
import { useSpriteStore } from '@/stores/spriteStore';
import { Button } from '../ui/Button';
import { useEditorStore } from '@/stores/editorStore';
import { Cross2Icon } from '@radix-ui/react-icons';

const PhaserSpriteList = () => {
  const sprites = useSpriteStore((state) => state.spriteInstances);
  const isSpriteModalOpen = useSpriteStore((state) => state.isSpriteModalOpen);
  const setIsSpriteModalOpen = useSpriteStore((state) => state.setIsSpriteModalOpen);
  const selectedSpriteId = useSpriteStore((state) => state.selectedSpriteId);
  const setSelectedSpriteId = useSpriteStore((state) => state.setSelectedSpriteId);
  const setSelectedSprite = useSpriteStore((state) => state.setSelectedSprite);
  const removeSpriteFromGame = useSpriteStore((state) => state.removeSpriteFromGame);

  const handleSpriteSelect = (spriteId: string) => {
    useEditorStore.getState().loadWorkspace(spriteId);
    setSelectedSpriteId(spriteId);
    setSelectedSprite(sprites.find((sprite) => sprite.id === spriteId)!);
  };

  // TODO: ensure this works. the idea is that if we load a project with sprites,
  // then it needs to auto select the first. there should in theory be a manual
  // way to do this. get rid of this useEffect code if there is.
  useEffect(() => {
    if (selectedSpriteId || sprites.length === 0) return;
    setSelectedSpriteId(sprites[0].id);
    setSelectedSprite(sprites[0]);
    useEditorStore.getState().loadWorkspace(sprites[0].id);
  }, []);

  return (
    <div className="w-2/3 flex flex-col min-h-0 pr-3 border-r border-slate-300 dark:border-slate-600 overflow-hidden">
      <div className="flex items-center justify-between py-2">
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
          Sprites
        </span>
        <Button
          className="btn-confirm px-3 py-1 text-[11px]"
          onClick={() => setIsSpriteModalOpen(true)}
          title="Add new sprite"
        >
          + Add
        </Button>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto pt-2">
        {sprites.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-4 text-slate-400 dark:text-slate-500">
            <p className="text-xs">No sprites yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(75px,1fr))] gap-2 pr-1">
            {sprites.map((sprite) => {
              const isSelected = sprite.id === selectedSpriteId;
              return (
                <div
                  key={sprite.id}
                  onClick={() => handleSpriteSelect(sprite.id)}
                  className={`relative aspect-square rounded-lg border-2 cursor-pointer transition-all overflow-hidden ${
                    isSelected
                      ? 'border-primary-green bg-primary-green/10 shadow-md ring-2 ring-primary-green/30'
                      : 'border-slate-200 bg-slate-50 hover:border-primary-green/50 dark:border-slate-600 dark:bg-dark-hover dark:hover:border-primary-green/50'
                  }`}
                >
                  {/* Sprite Thumbnail Placeholder */}
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-10 h-10 rounded-md bg-slate-200 dark:bg-slate-600 flex items-center justify-center text-lg font-bold text-slate-400 dark:text-slate-400">
                      {sprite.name.charAt(0).toUpperCase()}
                    </div>
                  </div>

                  {/* Sprite Name Label */}
                  <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent px-1 py-1">
                    <p className="text-[9px] text-white truncate text-center font-medium">{sprite.name}</p>
                  </div>

                  {/* Delete Button - Only on Selected */}
                  {isSelected && (
                    <button
                      type="button"
                      onClick={() => removeSpriteFromGame(sprite.id)}
                      className="absolute top-1 right-1 rounded-full bg-slate-700/80 hover:bg-red-500 text-white p-0.5 transition shadow"
                      title="Delete sprite"
                    >
                      <Cross2Icon className="h-3 w-3" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhaserSpriteList;
