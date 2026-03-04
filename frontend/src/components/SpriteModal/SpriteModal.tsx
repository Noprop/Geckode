'use client';

import { useEffect, useState } from 'react';
import { Cross2Icon, Pencil2Icon, ImageIcon, ArchiveIcon } from '@radix-ui/react-icons';
import SpriteLibrary from './SpriteLibrary';
import SpriteAssets from './SpriteAssets';
import SpriteEditor from './SpriteEditor';
import { useGeckodeStore } from '@/stores/geckodeStore';

type TabId = 'library' | 'editor' | 'assets';

const SpriteModal = () => {
  const [activeTab, setActiveTab] = useState<TabId>('editor');
  const setIsSpriteModalOpen = useGeckodeStore((state) => state.setIsSpriteModalOpen);
  const clearSpriteModalContext = useGeckodeStore((state) => state.clearSpriteModalContext);
  const isSpriteModalOpen = useGeckodeStore((state) => state.isSpriteModalOpen);
  const canEditProject = useGeckodeStore((state) => state.canEditProject);
  const handleClose = () => {
    useGeckodeStore.setState({ editingSource: null, editingAssetName: null, editingAssetType: null, editingTextureToLoad: null });
    clearSpriteModalContext();
    setIsSpriteModalOpen(false);
    setActiveTab('editor');
  };

  useEffect(() => {
    if (!isSpriteModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSpriteModalOpen, handleClose]);

  useEffect(() => {
    if (!canEditProject) {
      handleClose();
    }
  }, [canEditProject]);

  if (!isSpriteModalOpen) return <></>;

  return (
    <div className='fixed inset-0 z-100 flex items-center justify-center px-4 py-8'>
      <div className='absolute inset-0 bg-slate-900/70' onClick={handleClose} aria-hidden />
      <div className='relative z-10 w-[min(1100px,80vw)] h-[82vh] overflow-hidden flex flex-col rounded-lg border border-slate-300 bg-white text-slate-900 shadow-2xl ring-4 ring-primary-green/10 dark:border-slate-700 dark:bg-dark-secondary dark:text-slate-100'>
        <button
          type='button'
          onClick={handleClose}
          className='absolute right-3 top-3 z-10 rounded-full bg-black/5 p-2 text-slate-700 transition hover:bg-black/10 dark:bg-white/10 dark:text-slate-100 dark:hover:bg-white/20'
          title='Close asset picker'
        >
          <Cross2Icon className='h-4 w-4' />
        </button>

        <div className='px-6 pb-3 pt-4 shrink-0'>
          <div className='inline-flex rounded-md border border-slate-200 bg-light-tertiary p-1 text-xs font-semibold dark:border-slate-700 dark:bg-dark-tertiary'>
            <button
              type='button'
              onClick={() => setActiveTab('assets')}
              className={`cursor-pointer flex items-center gap-2 rounded-md px-4 py-2 transition ${
                activeTab === 'assets'
                  ? 'bg-white text-primary-green shadow-sm ring-1 ring-primary-green/30 dark:bg-slate-900'
                  : 'text-slate-600 hover:text-primary-green dark:text-slate-300'
              }`}
            >
              <ArchiveIcon className='h-4 w-4' />
              My Assets
            </button>
            <button
              type='button'
              onClick={() => setActiveTab('library')}
              className={`cursor-pointer flex items-center gap-2 rounded-md px-4 py-2 transition ${
                activeTab === 'library'
                  ? 'bg-white text-primary-green shadow-sm ring-1 ring-primary-green/30 dark:bg-slate-900'
                  : 'text-slate-600 hover:text-primary-green dark:text-slate-300'
              }`}
            >
              <ImageIcon className='h-4 w-4' />
              Library
            </button>
            <button
              type='button'
              onClick={() => setActiveTab('editor')}
              className={`cursor-pointer flex items-center gap-2 rounded-md px-4 py-2 transition ${
                activeTab === 'editor'
                  ? 'bg-white text-primary-green shadow-sm ring-1 ring-primary-green/30 dark:bg-slate-900'
                  : 'text-slate-600 hover:text-primary-green dark:text-slate-300'
              }`}
            >
              <Pencil2Icon className='h-4 w-4' />
              Editor
            </button>
          </div>
        </div>

        <div
          className="flex-1 min-h-0 flex flex-col overflow-hidden"
          style={{ display: activeTab === 'library' ? 'flex' : 'none' }}
          aria-hidden={activeTab !== 'library'}
        >
          <SpriteLibrary setActiveTab={setActiveTab} />
        </div>
        <div
          className="flex-1 min-h-0 flex flex-col overflow-hidden"
          style={{ display: activeTab === 'assets' ? 'flex' : 'none' }}
          aria-hidden={activeTab !== 'assets'}
        >
          <SpriteAssets setActiveTab={setActiveTab} />
        </div>
        <div
          className="flex-1 min-h-0 flex flex-col overflow-hidden"
          style={{ display: activeTab === 'editor' ? 'flex' : 'none' }}
          aria-hidden={activeTab !== 'editor'}
        >
          <SpriteEditor />
        </div>
      </div>
    </div>
  );
};

export default SpriteModal;
