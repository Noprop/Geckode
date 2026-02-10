'use client';

import { useEffect, useState } from 'react';
import { useGeckodeStore } from '@/stores/geckodeStore';
import { createUniqueTextureName } from '@/stores/slices/spriteSlice';
import type { AssetType } from '@/stores/slices/types';
import AssetList from './AssetList';
import TextureDetailPanel from './DetailPanel';
import TileEditorModal from '../TileModal/TileEditorModal';

export type SelectedAsset = { name: string; type: AssetType } | null;

export const TAB_CONFIG: { id: AssetType; label: string }[] = [
  { id: 'textures', label: 'Textures' },
  { id: 'tiles', label: 'Tiles' },
  // TODO:
  // { id: 'tilesets', label: 'Tilesets' },
  // { id: 'animations', label: 'Animations' },
  // { id: 'backgrounds', label: 'Backgrounds' },
];

const AssetWorkspace = () => {
  const [activeTab, setActiveTab] = useState<AssetType>('textures');
  const [selectedAsset, setSelectedAsset] = useState<SelectedAsset>(null);
  const [isTileEditorModalOpen, setIsTileEditorModalOpen] = useState(false);

  const assets = useGeckodeStore((s) => s[activeTab]);
  const addAsset = useGeckodeStore((s) => s.addAsset);
  const removeAsset = useGeckodeStore((s) => s.removeAsset);
  const setEditingAsset = useGeckodeStore((s) => s.setEditingAsset);
  const setIsSpriteModalOpen = useGeckodeStore((s) => s.setIsSpriteModalOpen);

  const selectedBase64 = selectedAsset ? assets[selectedAsset.name] : null;

  const handleEdit = () => {
    if (!selectedAsset) return;
    setEditingAsset(selectedAsset.name, selectedAsset.type, 'asset');
    if (selectedAsset.type === 'textures') setIsSpriteModalOpen(true);
    else if (selectedAsset.type === 'tiles') setIsTileEditorModalOpen(true);
  };

  const handleDuplicate = () => {
    if (!selectedAsset || !selectedBase64) return;
    const all = useGeckodeStore.getState()[selectedAsset.type];
    const newName = createUniqueTextureName(selectedAsset.name, all);
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
  };

  // Auto-select first item when nothing is selected
  useEffect(() => {
    if (selectedAsset) return;
    const firstKey = Object.keys(assets)[0];
    if (firstKey) setSelectedAsset({ name: firstKey, type: activeTab });
  }, [selectedAsset, activeTab, assets]);

  return (
    <div className="flex-1 min-h-0 flex flex-col w-full h-full">
      {/* Tab bar */}
      <div className="px-4 pb-3 pt-4 shrink-0">
        <div className="inline-flex rounded-md border border-slate-200 bg-light-tertiary p-1 text-xs font-semibold dark:border-slate-700 dark:bg-dark-tertiary">
          {TAB_CONFIG.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => { setActiveTab(tab.id); setSelectedAsset(null); }}
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

      {/* Content area */}
      <div className="flex flex-1 min-h-0 border-t border-slate-200 dark:border-slate-700">
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
          selectedAsset={selectedAsset}
          onSelectAsset={setSelectedAsset}
          onCreateNew={handleCreateNew}
        />
      </div>

      <TileEditorModal
        isOpen={isTileEditorModalOpen}
        onClose={() => setIsTileEditorModalOpen(false)}
      />
    </div>
  );
};

export default AssetWorkspace;
