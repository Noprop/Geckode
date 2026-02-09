'use client';

import { useState } from 'react';
import { ArchiveIcon, Pencil2Icon, GridIcon } from '@radix-ui/react-icons';
import TextureGallery from './TextureGallery';
import TileEditor from '../ui/TileEditor';
import TilemapEditor from '../ui/TilemapEditor';

type TabId = 'assets' | 'tile-editor' | 'tilemap-editor';

const AssetWorkspace = () => {
  const [activeTab, setActiveTab] = useState<TabId>('assets');

  return (
    <div className="flex-1 min-h-0 flex flex-col w-full h-full">
      <div className="px-4 pb-3 pt-4 shrink-0">
        <div className="inline-flex rounded-md border border-slate-200 bg-light-tertiary p-1 text-xs font-semibold dark:border-slate-700 dark:bg-dark-tertiary">
          <button
            type="button"
            onClick={() => setActiveTab('assets')}
            className={`cursor-pointer flex items-center gap-2 rounded-md px-4 py-2 transition ${
              activeTab === 'assets'
                ? 'bg-white text-primary-green shadow-sm ring-1 ring-primary-green/30 dark:bg-slate-900'
                : 'text-slate-600 hover:text-primary-green dark:text-slate-300'
            }`}
          >
            <ArchiveIcon className="h-4 w-4" />
            Assets
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('tile-editor')}
            className={`cursor-pointer flex items-center gap-2 rounded-md px-4 py-2 transition ${
              activeTab === 'tile-editor'
                ? 'bg-white text-primary-green shadow-sm ring-1 ring-primary-green/30 dark:bg-slate-900'
                : 'text-slate-600 hover:text-primary-green dark:text-slate-300'
            }`}
          >
            <Pencil2Icon className="h-4 w-4" />
            Tile Editor
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('tilemap-editor')}
            className={`cursor-pointer flex items-center gap-2 rounded-md px-4 py-2 transition ${
              activeTab === 'tilemap-editor'
                ? 'bg-white text-primary-green shadow-sm ring-1 ring-primary-green/30 dark:bg-slate-900'
                : 'text-slate-600 hover:text-primary-green dark:text-slate-300'
            }`}
          >
            <GridIcon className="h-4 w-4" />
            Tilemap Editor
          </button>
        </div>
      </div>

      {activeTab === 'assets' && <TextureGallery />}
      {activeTab === 'tile-editor' && <TileEditor />}
      {activeTab === 'tilemap-editor' && <TilemapEditor />}
    </div>
  );
};

export default AssetWorkspace;
