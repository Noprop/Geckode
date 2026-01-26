'use client';

import { useEffect, useState } from 'react';
import { Cross2Icon, Pencil2Icon, ImageIcon } from '@radix-ui/react-icons';
import SpriteLibrary from './SpriteLibrary';
import SpriteEditor from './SpriteEditor';
import { useSpriteStore } from '@/stores/spriteStore';

const SpriteModal = () => {
  const [activeTab, setActiveTab] = useState<'library' | 'editor'>('editor');
  const setIsSpriteModalOpen = useSpriteStore((state) => state.setIsSpriteModalOpen);
  const isSpriteModalOpen = useSpriteStore((state) => state.isSpriteModalOpen);

  useEffect(() => {
    if (!isSpriteModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSpriteModalOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSpriteModalOpen, setIsSpriteModalOpen]);

  if (!isSpriteModalOpen) return <></>;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center px-4 py-8">
      <div className="absolute inset-0 bg-slate-900/70" onClick={() => setIsSpriteModalOpen(false)} aria-hidden />
      <div className="relative z-10 w-[min(1100px,80vw)] h-[82vh] overflow-hidden flex flex-col rounded-lg border border-slate-300 bg-white text-slate-900 shadow-2xl ring-4 ring-primary-green/10 dark:border-slate-700 dark:bg-dark-secondary dark:text-slate-100">
        <button
          type="button"
          onClick={() => setIsSpriteModalOpen(false)}
          className="absolute right-3 top-3 z-10 rounded-full bg-black/5 p-2 text-slate-700 transition hover:bg-black/10 dark:bg-white/10 dark:text-slate-100 dark:hover:bg-white/20"
          title="Close asset picker"
        >
          <Cross2Icon className="h-4 w-4" />
        </button>

        <div className="px-6 pb-3 pt-4 shrink-0">
          <div className="inline-flex rounded-md border border-slate-200 bg-light-tertiary p-1 text-xs font-semibold dark:border-slate-700 dark:bg-dark-tertiary">
            <button
              type="button"
              onClick={() => setActiveTab('library')}
              className={`cursor-pointer flex items-center gap-2 rounded-md px-4 py-2 transition ${
                activeTab === 'library'
                  ? 'bg-white text-primary-green shadow-sm ring-1 ring-primary-green/30 dark:bg-slate-900'
                  : 'text-slate-600 hover:text-primary-green dark:text-slate-300'
              }`}
            >
              <ImageIcon className="h-4 w-4" />
              Library
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('editor')}
              className={`cursor-pointer flex items-center gap-2 rounded-md px-4 py-2 transition ${
                activeTab === 'editor'
                  ? 'bg-white text-primary-green shadow-sm ring-1 ring-primary-green/30 dark:bg-slate-900'
                  : 'text-slate-600 hover:text-primary-green dark:text-slate-300'
              }`}
            >
              <Pencil2Icon className="h-4 w-4" />
              Editor
            </button>
          </div>
        </div>

        {activeTab === 'library' ? <SpriteLibrary /> : <SpriteEditor />}
      </div>
    </div>
  );
};

export default SpriteModal;
