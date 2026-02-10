'use client';

import { useEffect } from 'react';
import { Cross2Icon } from '@radix-ui/react-icons';
import TilemapEditor from '../ui/TilemapEditor';

interface TilemapEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TilemapEditorModal = ({ isOpen, onClose }: TilemapEditorModalProps) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center px-4 py-8">
      <div className="absolute inset-0 bg-slate-900/70" onClick={onClose} aria-hidden />
      <div className="relative z-10 w-[min(1100px,80vw)] h-[82vh] overflow-hidden flex flex-col rounded-lg border border-slate-300 bg-white shadow-2xl ring-4 ring-primary-green/10 dark:border-slate-700 dark:bg-dark-secondary dark:text-slate-100">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 rounded-full bg-black/5 p-2 text-slate-700 transition hover:bg-black/10 dark:bg-white/10 dark:text-slate-100 dark:hover:bg-white/20"
          title="Close tilemap editor"
        >
          <Cross2Icon className="h-4 w-4" />
        </button>
        <TilemapEditor />
      </div>
    </div>
  );
};

export default TilemapEditorModal;
