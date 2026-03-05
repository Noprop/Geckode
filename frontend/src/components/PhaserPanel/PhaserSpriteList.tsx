import { useEffect, useState } from 'react';
import * as ContextMenu from '@radix-ui/react-context-menu';
import { useGeckodeStore } from '@/stores/geckodeStore';
import { Button } from '../ui/Button';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Modal } from '../ui/modals/Modal';
import { TrashIcon } from 'lucide-react';

const PhaserSpriteList = () => {
  const sprites = useGeckodeStore((state) => state.spriteInstances);
  const setIsSpriteModalOpen = useGeckodeStore((state) => state.setIsSpriteModalOpen);
  const setSpriteModalContext = useGeckodeStore((state) => state.setSpriteModalContext);
  const selectedSpriteId = useGeckodeStore((state) => state.selectedSpriteId);
  const setSelectedSpriteId = useGeckodeStore((state) => state.setSelectedSpriteId);
  const removeSpriteInstance = useGeckodeStore((state) => state.removeSpriteInstance);
  const duplicateSpriteInstance = useGeckodeStore((state) => state.duplicateSpriteInstance);
  const textures = useGeckodeStore((state) => state.textures);
  const libaryTextures = useGeckodeStore((state) => state.libaryTextures);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [spriteIdToDelete, setSpriteIdToDelete] = useState<string | null>(null);

  useEffect(() => {
    setSpriteIdToDelete((prev) =>
      sprites.findIndex((sprite) => sprite.id === prev) === -1
        ? null
        : prev
    );
    if (sprites.length === 0) return;
    if (selectedSpriteId === null)
      setSelectedSpriteId(sprites[0].id);
  }, [sprites]);

  const openDeleteConfirm = (spriteId: string) => {
    setSpriteIdToDelete(spriteId);
  };

  const handleConfirmDelete = () => {
    if (spriteIdToDelete) {
      removeSpriteInstance(spriteIdToDelete);
      setSpriteIdToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setSpriteIdToDelete(null);
  };

  return (
    <div className="w-2/3 flex flex-col min-h-0 pr-3 border-r border-slate-300 dark:border-slate-600 overflow-hidden">
      <div className="flex items-center justify-between py-2">
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
          Sprites
        </span>
        <Button
          className="btn-confirm px-3 py-1 text-[11px]"
          onClick={() => {
            useGeckodeStore.setState({
              editingSource: 'new',
              editingAssetName: null,
              editingAssetType: 'textures',
            });
            setSpriteModalContext('phaser_add');
            setIsSpriteModalOpen(true);
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
                  <ContextMenu.Root key={sprite.id} modal={false}>
                    <ContextMenu.Trigger asChild>
                      <div
                        onClick={() => setSelectedSpriteId(sprite.id)}
                        onDoubleClick={() => {
                          useGeckodeStore.setState({
                            editingSource: 'asset',
                            editingAssetName: sprite.textureName,
                            editingAssetType: 'textures',
                          });
                          setSpriteModalContext('phaser_edit', sprite.textureName);
                          setIsSpriteModalOpen(true);
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
                              openDeleteConfirm(sprite.id);
                            }}
                            className="absolute top-1 right-1 rounded-full bg-slate-700/80 hover:bg-red-500 text-white p-0.5 transition shadow"
                            title="Delete sprite"
                          >
                            <Cross2Icon className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    </ContextMenu.Trigger>
                    <ContextMenu.Portal>
                      <ContextMenu.Content
                        className="min-w-[140px] rounded-md border border-slate-200 bg-white p-1 shadow-md dark:border-slate-700 dark:bg-slate-800"
                      >
                        <ContextMenu.Item
                          className="relative flex cursor-default select-none items-center rounded px-2 py-1.5 text-sm outline-none hover:bg-slate-100 focus:bg-slate-100 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
                          onSelect={() => {
                            useGeckodeStore.setState({
                              editingSource: 'asset',
                              editingAssetName: sprite.textureName,
                              editingAssetType: 'textures',
                            });
                            setSpriteModalContext('phaser_edit', sprite.textureName);
                            setIsSpriteModalOpen(true);
                          }}
                        >
                          Edit
                        </ContextMenu.Item>
                        <ContextMenu.Item
                          className="relative flex cursor-default select-none items-center rounded px-2 py-1.5 text-sm outline-none hover:bg-slate-100 focus:bg-slate-100 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
                          onSelect={() => duplicateSpriteInstance(sprite.id)}
                        >
                          Duplicate
                        </ContextMenu.Item>
                        <ContextMenu.Item
                          className="relative flex cursor-default select-none items-center rounded px-2 py-1.5 text-sm outline-none hover:bg-red-50 hover:text-red-600 focus:bg-red-50 focus:text-red-600 dark:hover:bg-red-900/20 dark:focus:bg-red-900/20"
                          onSelect={() => openDeleteConfirm(sprite.id)}
                        >
                          Delete
                        </ContextMenu.Item>
                      </ContextMenu.Content>
                    </ContextMenu.Portal>
                  </ContextMenu.Root>
                );
            })}
          </div>
        )}
      </div>

      {spriteIdToDelete && (
        <Modal
          title="Delete Sprite"
          icon={TrashIcon}
          onClose={handleCancelDelete}
          text="Are you sure you want to delete this sprite? This cannot be undone."
          subtitle={sprites.find((sprite) => sprite.id === spriteIdToDelete)?.name}
          className="bg-red-500"
          actions={
            <>
              <Button onClick={handleConfirmDelete} className="btn-deny ml-3">Delete</Button>
              <Button onClick={handleCancelDelete} className="btn-neutral">Cancel</Button>
            </>
          }
        />
      )}
    </div>
  );
};

export default PhaserSpriteList;
