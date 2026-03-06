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
  const canEditProject = useGeckodeStore((state) => state.canEditProject);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [spriteIdToDelete, setSpriteIdToDelete] = useState<string | null>(null);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);

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

  useEffect(() => {
    if (canEditProject) return;
    handleCancelDelete();
    setIsContextMenuOpen((prev) => {
      if (prev) {
        // Force close the context menu when the user is no longer allowed to edit the project
        const event = new KeyboardEvent('keydown', { key: 'Escape' });
        document.dispatchEvent(event);
      }
      return prev;
    });
  }, [canEditProject]);

  return (
    <div className="flex flex-col w-3/4 min-h-0 pr-3 border-r border-slate-300 dark:border-slate-600 overflow-hidden">
      <div className="flex items-center justify-between pt-2">
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
          disabled={!canEditProject}
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
            <div className="grid grid-cols-4 gap-2 p-1 pr-2.5">
              {sprites.map((sprite) => {
                const isSelected = sprite.id === selectedSpriteId;
                const isHovered = sprite.id === hoveredId;
                const textureUrl = textures[sprite.textureName] ?? libaryTextures[sprite.textureName];

                return (
                  <ContextMenu.Root key={sprite.id} modal={false} onOpenChange={setIsContextMenuOpen}>
                    <ContextMenu.Trigger asChild disabled={!canEditProject}>
                      <div
                        onMouseDown={() => setSelectedSpriteId(sprite.id)}
                        onDoubleClick={() => {
                          if (!canEditProject) return;
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
                        className={`relative rounded cursor-pointer transition-all select-none ${isSelected
                          ? 'shadow-md'
                          : 'border border-slate-200 hover:border-accent-purple/50 dark:border-slate-600 dark:hover:border-accent-purple/50'
                          } bg-slate-50 dark:bg-dark-hover`}
                      >
                        <div className="overflow-hidden rounded-t flex items-center justify-center py-3.5">
                          {textureUrl ? (
                            <img
                              src={textureUrl}
                              alt={sprite.name}
                              className="w-9 h-9 object-contain"
                              style={{ imageRendering: 'pixelated' }}
                              draggable={false}
                            />
                          ) : (
                              <div className="w-9 h-9 rounded-sm bg-slate-200 dark:bg-slate-600 flex items-center justify-center text-base font-bold text-slate-400 dark:text-slate-400">
                              {sprite.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>

                        <div className={`px-1 py-0.5 rounded-b ${isSelected ? 'bg-accent-purple' : 'bg-slate-100 dark:bg-dark-tertiary'}`}>
                          <p className={`text-[9px] truncate text-center font-medium ${isSelected ? 'text-white' : 'text-slate-600 dark:text-slate-300'}`}>{sprite.name}</p>
                        </div>

                        {(isSelected || isHovered) && canEditProject && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              openDeleteConfirm(sprite.id);
                            }}
                            className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 rounded-full bg-accent-purple hover:bg-accent-purple/80 text-white p-0.5 transition shadow z-10 cursor-pointer"
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
