'use client';

import { useEffect, useState } from 'react';
import { useGeckodeStore } from '@/stores/geckodeStore';
import { createUniqueTextureName } from '@/stores/slices/spriteSlice';
import type { AssetType, Tileset } from '@/stores/slices/types';
import AssetList from './AssetList';
import TextureDetailPanel from './DetailPanel';
import TileEditorModal from '../TileModal/TileEditorModal';
import TilesetEditorModal from '../TileModal/TilesetEditorModal';

export type SelectedAsset = { name: string; type: AssetType } | null;

export const TAB_CONFIG: { id: AssetType; label: string }[] = [
  { id: 'textures', label: 'Textures' },
  { id: 'tiles', label: 'Tiles' },
  { id: 'tilesets', label: 'Tilesets' },
  // TODO:
  // { id: 'animations', label: 'Animations' },
  // { id: 'backgrounds', label: 'Backgrounds' },
];

const AssetWorkspace = () => {
  const [activeTab, setActiveTab] = useState<AssetType>('textures');
  const [selectedAsset, setSelectedAsset] = useState<SelectedAsset>(null);
  const [isTileEditorModalOpen, setIsTileEditorModalOpen] = useState(false);
  const [isTilesetEditorModalOpen, setIsTilesetEditorModalOpen] = useState(false);

  const assets = useGeckodeStore((s) => s[activeTab]);
  const addAsset = useGeckodeStore((s) => s.addAsset);
  const removeAsset = useGeckodeStore((s) => s.removeAsset);
  const setEditingAsset = useGeckodeStore((s) => s.setEditingAsset);
  const setIsSpriteModalOpen = useGeckodeStore((s) => s.setIsSpriteModalOpen);

  const rawValue = selectedAsset ? assets[selectedAsset.name] : null;
  const selectedBase64 = rawValue
    ? (typeof rawValue === 'string' ? rawValue : (rawValue as Tileset).base64Preview)
    : null;

  const handleEdit = () => {
    if (!selectedAsset) return;
    setEditingAsset(selectedAsset.name, selectedAsset.type, 'asset');
    if (selectedAsset.type === 'textures') setIsSpriteModalOpen(true);
    else if (selectedAsset.type === 'tiles') setIsTileEditorModalOpen(true);
    else if (selectedAsset.type === 'tilesets') setIsTilesetEditorModalOpen(true);
  };

  const handleDuplicate = () => {
    if (!selectedAsset || !selectedBase64) return;
    const all = useGeckodeStore.getState()[selectedAsset.type];
    const nameMap = Object.fromEntries(Object.keys(all).map(k => [k, '']));
    const newName = createUniqueTextureName(selectedAsset.name, nameMap);
    addAsset(newName, selectedBase64, selectedAsset.type);
    setSelectedAsset({ name: newName, type: selectedAsset.type });
  };

  const handleCopy = async () => {
    if (!selectedBase64) return;
    await navigator.clipboard.writeText(selectedBase64);
  };

  const handleDelete = () => {
    if (!selectedAsset) return;
    removeAsset(selectedAsset.name, selectedAsset.type);
    setSelectedAsset(null);
  };

  const handleCreateNew = () => {
    setEditingAsset(null, activeTab, 'new');
    if (activeTab === 'textures') setIsSpriteModalOpen(true);
    else if (activeTab === 'tiles') setIsTileEditorModalOpen(true);
    else if (activeTab === 'tilesets') setIsTilesetEditorModalOpen(true);
  };

  // Auto-select first item when nothing is selected
  useEffect(() => {
    if (selectedAsset) return;
    const firstKey = Object.keys(assets)[0];
    if (firstKey) setSelectedAsset({ name: firstKey, type: activeTab });
  }, [selectedAsset, activeTab, assets]);

  return (
    <div className="flex-1 min-h-0 flex flex-col w-full h-full">
      <div className="flex flex-1 min-h-0">
        <TextureDetailPanel
          selectedAsset={selectedAsset}
          base64={selectedBase64}
          onEdit={handleEdit}
          onDuplicate={handleDuplicate}
          onCopy={handleCopy}
          onDelete={handleDelete}
        />
        <AssetList
          filter={activeTab}
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            const tabAssets = useGeckodeStore.getState()[tab];
            const firstKey = Object.keys(tabAssets)[0];
            setSelectedAsset(firstKey ? { name: firstKey, type: tab } : null);
          }}
          selectedAsset={selectedAsset}
          onSelectAsset={setSelectedAsset}
          onCreateNew={handleCreateNew}
        />
      </div>

      <TileEditorModal
        isOpen={isTileEditorModalOpen}
        onClose={() => setIsTileEditorModalOpen(false)}
      />
      <TilesetEditorModal
        isOpen={isTilesetEditorModalOpen}
        onClose={() => setIsTilesetEditorModalOpen(false)}
      />
    </div>
  );
};

export default AssetWorkspace;
