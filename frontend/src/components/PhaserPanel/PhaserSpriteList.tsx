import { useEffect, useState } from 'react';
import { useGeckodeStore } from '@/stores/geckodeStore';
import { Button } from '../ui/Button';
import { Cross2Icon } from '@radix-ui/react-icons';

const PhaserSpriteList = () => {
  const sprites = useGeckodeStore((state) => state.spriteInstances);
  const setIsSpriteModalOpen = useGeckodeStore((state) => state.setIsSpriteModalOpen);
  const selectedSpriteId = useGeckodeStore((state) => state.selectedSpriteId);
  const setSelectedSpriteId = useGeckodeStore((state) => state.setSelectedSpriteId);
  const removeSpriteInstance = useGeckodeStore((state) => state.removeSpriteInstance);
  const textures = useGeckodeStore((state) => state.textures);
  const libaryTextures = useGeckodeStore((state) => state.libaryTextures);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    if (sprites.length === 0) return;
    if (selectedSpriteId === null)
      setSelectedSpriteId(sprites[0].id);
  }, []);

  return (
    <div className="w-2/3 flex flex-col min-h-0 pr-3 border-r border-slate-300 dark:border-slate-600 overflow-hidden">
      <div className="flex items-center justify-between py-2">
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
          Sprites
        </span>
        <Button
          className="btn-confirm px-3 py-1 text-[11px]"
          onClick={() => {
            useGeckodeStore.setState({ editingSource: 'new', isSpriteModalOpen: true });
          }}
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
                const isHovered = sprite.id === hoveredId;
                const textureUrl = textures[sprite.textureName] ?? libaryTextures[sprite.textureName];

                return (
                  <div
                    key={sprite.id}
                    onClick={() => setSelectedSpriteId(sprite.id)}
                    onDoubleClick={() => {
                      useGeckodeStore.setState({
                        editingSource: 'asset',
                        editingAssetName: sprite.textureName,
                        editingAssetType: 'textures',
                        isSpriteModalOpen: true,
                      });
                    }}
                    onMouseEnter={() => setHoveredId(sprite.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className={`relative aspect-square rounded-lg border-2 cursor-pointer transition-all overflow-hidden select-none ${isSelected
                        ? 'border-primary-green bg-primary-green/10 shadow-md ring-2 ring-primary-green/30'
                        : 'border-slate-200 bg-slate-50 hover:border-primary-green/50 dark:border-slate-600 dark:bg-dark-hover dark:hover:border-primary-green/50'
                      }`}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      {textureUrl ? (
                        <img
                          src={textureUrl}
                          alt={sprite.name}
                          className="w-10 h-10 object-contain"
                          style={{ imageRendering: 'pixelated' }}
                          draggable={false}
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-md bg-slate-200 dark:bg-slate-600 flex items-center justify-center text-lg font-bold text-slate-400 dark:text-slate-400">
                          {sprite.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>

                    {/* Sprite Name Label */}
                    <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent px-1 py-1">
                      <p className="text-[9px] text-white truncate text-center font-medium">{sprite.name}</p>
                    </div>

                    {(isSelected || isHovered) && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeSpriteInstance(sprite.id)
                        }}
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
