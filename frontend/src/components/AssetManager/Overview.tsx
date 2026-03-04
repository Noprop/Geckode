'use client';

import { useEffect, useState } from 'react';
import { useGeckodeStore } from '@/stores/geckodeStore';
import { createUniqueTextureName } from '@/stores/slices/spriteSlice';
import type { AssetType, Tileset } from '@/stores/slices/types';
import AssetList from './AssetList';
import TextureDetailPanel from './DetailPanel';
import TileEditorModal from '../TileModal/TileEditorModal';
import TilesetEditorModal from '../TileModal/TilesetEditorModal';
import { useSnackbar } from '@/hooks/useSnackbar';
import projectsApi from '@/lib/api/handlers/projects';
import { Asset } from '@/lib/types/api/assets';

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
  const tilesets = useGeckodeStore((s) => s.tilesets);
  const setAsset = useGeckodeStore((s) => s.setAsset);
  const removeAsset = useGeckodeStore((s) => s.removeAsset);
  const addTileset = useGeckodeStore((s) => s.addTileset);
  const removeTileset = useGeckodeStore((s) => s.removeTileset);
  const setEditingAsset = useGeckodeStore((s) => s.setEditingAsset);
  const setIsSpriteModalOpen = useGeckodeStore((s) => s.setIsSpriteModalOpen);
  const setSpriteModalContext = useGeckodeStore((s) => s.setSpriteModalContext);
  const assetIds = useGeckodeStore((s) => s.assetIds);
  const addAssetId = useGeckodeStore((s) => s.addAssetId);
  const updateAssetId = useGeckodeStore((s) => s.updateAssetId);
  const removeAssetId = useGeckodeStore((s) => s.removeAssetId);
  const projectId = useGeckodeStore((s) => s.projectId);
  const showSnackbar = useSnackbar();

  const selectedTileset =
    selectedAsset?.type === 'tilesets' ? (tilesets.find((ts) => ts.id === selectedAsset.name) ?? null) : null;
  const rawValue =
    selectedAsset?.type === 'tilesets'
      ? selectedTileset
      : selectedAsset
        ? (assets as Record<string, string>)[selectedAsset.name]
        : null;
  const selectedBase64 = rawValue
    ? typeof rawValue === 'string'
      ? rawValue
      : (rawValue as Tileset).base64Preview
    : null;

  const handleEdit = () => {
    if (!selectedAsset) return;
    setEditingAsset(selectedAsset.name, selectedAsset.type, 'asset');
    if (selectedAsset.type === 'textures') {
      setSpriteModalContext('asset_manager', selectedAsset.name);
      setIsSpriteModalOpen(true);
    } else if (selectedAsset.type === 'tiles') setIsTileEditorModalOpen(true);
    else if (selectedAsset.type === 'tilesets') setIsTilesetEditorModalOpen(true);
  };

  const handleDuplicate = async () => {
    if (!selectedAsset || !selectedBase64) return;
    if (selectedAsset.type === 'tilesets') {
      const source = tilesets.find((ts) => ts.id === selectedAsset.name);
      if (!source) return;
      const existingNames = Object.fromEntries(tilesets.map((ts) => [ts.name, '']));
      const duplicatedName = createUniqueTextureName(source.name, existingNames);
      const existingIds = Object.fromEntries(tilesets.map((ts) => [ts.id, '']));
      const duplicatedId = createUniqueTextureName(`tileset_${Date.now()}`, existingIds);
      const duplicatedTileset: Tileset = {
        ...source,
        id: duplicatedId,
        name: duplicatedName,
        data: source.data.map((row) => [...row]),
      };
      addTileset(duplicatedTileset);
      setSelectedAsset({ name: duplicatedId, type: 'tilesets' });
      return;
    }
    const all = useGeckodeStore.getState()[selectedAsset.type];
    const nameMap = Object.fromEntries(Object.keys(all).map((k) => [k, '']));
    const newName = createUniqueTextureName(selectedAsset.name, nameMap);

    setAsset(newName, selectedBase64, selectedAsset.type);
    showSnackbar(`Successfully duplicated ${selectedAsset.name}!`, 'success');
    setSelectedAsset({ name: newName, type: selectedAsset.type });
  };

  const handleCopy = async () => {
    if (!selectedBase64) return;
    await navigator.clipboard.writeText(selectedBase64);
  };

  const addAssetToBackend = async (name: string, base64string: string, assetType = 'textures'): Promise<boolean> => {
    var success: boolean = true; // if connected to backend, becomes false if request fails
    console.log({
      name: name,
      asset: base64string,
      asset_type: assetType,
    });
    if (projectId) {
      await projectsApi(projectId)
        .assetsApi.create({
          name: name,
          asset: base64string,
          asset_type: assetType,
        })
        .then((res) => addAssetId(res.name, res.id))
        .catch(() => (success = false));
    }
    return success;
  };

  const updateTextureInBackend = async (textureName: string, props: Partial<Asset>): Promise<boolean> => {
    var success: boolean = true; // if connected to backend, becomes false if request fails
    if (projectId && textureName in assetIds) {
      const id = assetIds[textureName];
      await projectsApi(projectId)
        .assetsApi(id)
        .update(props)
        .then(() => {
          if (props.name) updateAssetId(textureName, props.name); // update asset name if changed
        })
        .catch(() => (success = false));
    }
    return success;
  };

  const deleteTextureInBackend = async (textureName: string): Promise<boolean> => {
    var success: boolean = true; // if connected to backend, becomes false if request fails
    if (projectId && textureName in assetIds) {
      const id = assetIds[textureName];
      await projectsApi(projectId)
        .assetsApi(id)
        .delete()
        .then(() => {
          removeAssetId(textureName);
        })
        .catch(() => (success = false));
    }
    return success;
  };

  const handleDelete = async () => {
    if (!selectedAsset) return;

    if (selectedAsset.type === 'tilesets') {
      removeTileset(selectedAsset.name);
    } else {
      if (
        selectedAsset.type === 'textures' &&
        useGeckodeStore.getState().spriteInstances.some((sprite) => sprite.textureName === selectedAsset.name)
      ) {
        showSnackbar('A texture may only be deleted if no sprites are using it.', 'error');
        return;
      }
      showSnackbar(`Successfully deleted ${selectedAsset.name}!`, 'success');
      removeAsset(selectedAsset.name, selectedAsset.type);
    }
    setSelectedAsset(null);
  };

  const handleCreateNew = () => {
    setEditingAsset(null, activeTab, 'new');
    if (activeTab === 'textures') {
      setSpriteModalContext('asset_manager');
      setIsSpriteModalOpen(true);
    } else if (activeTab === 'tiles') setIsTileEditorModalOpen(true);
    else if (activeTab === 'tilesets') setIsTilesetEditorModalOpen(true);
  };

  // Auto-select first item when nothing is selected
  useEffect(() => {
    if (selectedAsset) return;
    const firstKey = activeTab === 'tilesets' ? tilesets[0]?.id : Object.keys(assets as Record<string, string>)[0];
    if (firstKey) setSelectedAsset({ name: firstKey, type: activeTab });
  }, [selectedAsset, activeTab, assets, tilesets]);

  return (
    <div className='flex-1 min-h-0 flex flex-col w-full h-full'>
      <div className='flex flex-1 min-h-0'>
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
            const firstKey =
              tab === 'tilesets'
                ? (tabAssets as Tileset[])[0]?.id
                : Object.keys(tabAssets as Record<string, string>)[0];
            setSelectedAsset(firstKey ? { name: firstKey, type: tab } : null);
          }}
          selectedAsset={selectedAsset}
          onSelectAsset={setSelectedAsset}
          onCreateNew={handleCreateNew}
          onDoubleClickAsset={(asset) => {
            if (!asset) return;
            setSelectedAsset(asset);
            setEditingAsset(asset.name, asset.type, 'asset');
            if (asset.type === 'textures') {
              setSpriteModalContext('asset_manager', asset.name);
              setIsSpriteModalOpen(true);
            } else if (asset.type === 'tiles') setIsTileEditorModalOpen(true);
            else if (asset.type === 'tilesets') setIsTilesetEditorModalOpen(true);
          }}
        />
      </div>

      <TileEditorModal isOpen={isTileEditorModalOpen} onClose={() => setIsTileEditorModalOpen(false)} />
      <TilesetEditorModal isOpen={isTilesetEditorModalOpen} onClose={() => setIsTilesetEditorModalOpen(false)} />
    </div>
  );
};

export default AssetWorkspace;
