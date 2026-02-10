'use client';

import { useCallback, useState } from 'react';
import { useGeckodeStore } from '@/stores/geckodeStore';
import { createUniqueTextureName } from '@/stores/slices/spriteSlice';
import TextureGallery from './TextureGallery';
import TextureDetailPanel, { type SelectedAsset } from './TextureDetailPanel';
import CreateAssetModal from './CreateAssetModal';
import TileEditorModal from './TileEditorModal';

type TabId = 'textures' | 'tiles' | 'tilesets' | 'animations' | 'backgrounds';

const tabs: { id: TabId; label: string }[] = [
  { id: 'textures', label: 'Textures' },
  { id: 'tiles', label: 'Tiles' },
  { id: 'tilesets', label: 'Tilesets' },
  { id: 'animations', label: 'Animations' },
  { id: 'backgrounds', label: 'Backgrounds' },
];

const AssetWorkspace = () => {
  const [activeTab, setActiveTab] = useState<TabId>('textures');
  const [selectedAsset, setSelectedAsset] = useState<SelectedAsset>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isTileEditorModalOpen, setIsTileEditorModalOpen] = useState(false);

  const assetTextures = useGeckodeStore((s) => s.assetTextures);
  const tileTextures = useGeckodeStore((s) => s.tileTextures);
  const tilesetTextures = useGeckodeStore((s) => s.tilesetTextures);
  const animationTextures = useGeckodeStore((s) => s.animationTextures);
  const backgroundTextures = useGeckodeStore((s) => s.backgroundTextures);
  const addAssetTexture = useGeckodeStore((s) => s.addAssetTexture);
  const addTileTexture = useGeckodeStore((s) => s.addTileTexture);
  const removeAssetTexture = useGeckodeStore((s) => s.removeAssetTexture);
  const removeTileTexture = useGeckodeStore((s) => s.removeTileTexture);
  const removeTilesetTexture = useGeckodeStore((s) => s.removeTilesetTexture);
  const removeAnimationTexture = useGeckodeStore((s) => s.removeAnimationTexture);
  const removeBackgroundTexture = useGeckodeStore((s) => s.removeBackgroundTexture);
  const setIsSpriteModalOpen = useGeckodeStore((s) => s.setIsSpriteModalOpen);
  const setEditingSprite = useGeckodeStore((s) => s.setEditingSprite);

  // Resolve the base64 for the currently selected asset
  const getSelectedBase64 = (): string | null => {
    if (!selectedAsset) return null;
    switch (selectedAsset.kind) {
      case 'tile': return tileTextures[selectedAsset.name] ?? null;
      case 'tileset': return tilesetTextures[selectedAsset.name] ?? null;
      case 'animation': return animationTextures[selectedAsset.name] ?? null;
      case 'background': return backgroundTextures[selectedAsset.name] ?? null;
      default: return assetTextures[selectedAsset.name] ?? null;
    }
  };

  const handleEdit = useCallback(() => {
    if (!selectedAsset) return;
    if (selectedAsset.kind === 'sprite') {
      setEditingSprite('asset', selectedAsset.name);
      setIsSpriteModalOpen(true);
    } else if (selectedAsset.kind === 'tile') {
      setEditingSprite('tile', selectedAsset.name);
      setIsTileEditorModalOpen(true);
    }
  }, [selectedAsset, setEditingSprite, setIsSpriteModalOpen]);

  const handleDuplicate = useCallback(() => {
    if (!selectedAsset) return;
    const base64 = getSelectedBase64();
    if (!base64) return;

    if (selectedAsset.kind === 'tile') {
      const newName = createUniqueTextureName(selectedAsset.name, tileTextures);
      addTileTexture(newName, base64);
      setSelectedAsset({ name: newName, kind: 'tile' });
    } else {
      const newName = createUniqueTextureName(selectedAsset.name, assetTextures);
      addAssetTexture(newName, base64);
      setSelectedAsset({ name: newName, kind: 'sprite' });
    }
  }, [selectedAsset, assetTextures, tileTextures, addAssetTexture, addTileTexture]);

  const handleCopy = useCallback(async () => {
    const base64 = getSelectedBase64();
    if (!base64) return;
    await navigator.clipboard.writeText(base64);
  }, [selectedAsset, activeTab, assetTextures, tileTextures, tilesetTextures, animationTextures, backgroundTextures]);

  const handleDelete = useCallback(() => {
    if (!selectedAsset) return;
    switch (selectedAsset.kind) {
      case 'tile': removeTileTexture(selectedAsset.name); break;
      case 'tileset': removeTilesetTexture(selectedAsset.name); break;
      case 'animation': removeAnimationTexture(selectedAsset.name); break;
      case 'background': removeBackgroundTexture(selectedAsset.name); break;
      default: removeAssetTexture(selectedAsset.name); break;
    }
    setSelectedAsset(null);
  }, [selectedAsset, removeAssetTexture, removeTileTexture, removeTilesetTexture, removeAnimationTexture, removeBackgroundTexture]);

  const handleCreateSprite = useCallback(() => {
    setEditingSprite('new', null);
    setIsSpriteModalOpen(true);
  }, [setEditingSprite, setIsSpriteModalOpen]);

  const handleCreateTile = useCallback(() => {
    setEditingSprite('tile', null);
    setIsTileEditorModalOpen(true);
  }, [setEditingSprite]);

  // Clear selection when switching tabs
  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    setSelectedAsset(null);
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col w-full h-full">
      {/* Tab bar */}
      <div className="px-4 pb-3 pt-4 shrink-0">
        <div className="inline-flex rounded-md border border-slate-200 bg-light-tertiary p-1 text-xs font-semibold dark:border-slate-700 dark:bg-dark-tertiary">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabChange(tab.id)}
              className={`cursor-pointer flex items-center gap-2 rounded-md px-4 py-2 transition ${
                activeTab === tab.id
                  ? 'bg-white text-primary-green shadow-sm ring-1 ring-primary-green/30 dark:bg-slate-900'
                  : 'text-slate-600 hover:text-primary-green dark:text-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content area: detail panel + grid */}
      <div className="flex flex-1 min-h-0 border-t border-slate-200 dark:border-slate-700">
        <TextureDetailPanel
          selectedAsset={selectedAsset}
          base64={getSelectedBase64()}
          onEdit={handleEdit}
          onDuplicate={handleDuplicate}
          onCopy={handleCopy}
          onDelete={handleDelete}
        />
        <TextureGallery
          filter={activeTab}
          selectedAsset={selectedAsset}
          onSelectAsset={setSelectedAsset}
          onCreateNew={() => setIsCreateModalOpen(true)}
        />
      </div>

      {/* Modals */}
      <CreateAssetModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateSprite={handleCreateSprite}
        onCreateTile={handleCreateTile}
      />
      <TileEditorModal
        isOpen={isTileEditorModalOpen}
        onClose={() => setIsTileEditorModalOpen(false)}
      />
    </div>
  );
};

export default AssetWorkspace;
