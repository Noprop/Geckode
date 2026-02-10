'use client';

import { useEffect } from 'react';
import { Cross2Icon, Pencil2Icon } from '@radix-ui/react-icons';

interface CreateAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateSprite: () => void;
  onCreateTile: () => void;
}

const CreateAssetModal = ({ isOpen, onClose, onCreateSprite, onCreateTile }: CreateAssetModalProps) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const buttons = [
    {
      label: 'Sprite Texture',
      icon: (
        <svg width="28" height="28" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.5 1H12.5C13.3284 1 14 1.67157 14 2.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V2.5C1 1.67157 1.67157 1 2.5 1ZM2.5 2C2.22386 2 2 2.22386 2 2.5V8.3636L4.01856 6.34504C4.21382 6.14978 4.53041 6.14978 4.72567 6.34504L8.00005 9.61942L10.0186 7.60086C10.2138 7.4056 10.5304 7.4056 10.7257 7.60086L13 9.87518V2.5C13 2.22386 12.7761 2 12.5 2H2.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
        </svg>
      ),
      onClick: onCreateSprite,
    },
    {
      label: 'Tile',
      icon: <Pencil2Icon className="h-7 w-7" />,
      onClick: onCreateTile,
    },
    {
      label: 'Tileset',
      icon: (
        <svg width="28" height="28" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1H6V6H1V1ZM9 1H14V6H9V1ZM1 9H6V14H1V9ZM9 9H14V14H9V9ZM2 2V5H5V2H2ZM10 2V5H13V2H10ZM2 10V13H5V10H2ZM10 10V13H13V10H10Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
        </svg>
      ),
      onClick: () => {},
      disabled: true,
    },
  ];

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center px-4 py-8">
      <div className="absolute inset-0 bg-slate-900/70" onClick={onClose} aria-hidden />
      <div className="relative z-10 w-[360px] overflow-hidden rounded-lg border border-slate-300 bg-white shadow-2xl ring-4 ring-primary-green/10 dark:border-slate-700 dark:bg-dark-secondary">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 rounded-full bg-black/5 p-2 text-slate-700 transition hover:bg-black/10 dark:bg-white/10 dark:text-slate-100 dark:hover:bg-white/20"
          title="Close"
        >
          <Cross2Icon className="h-4 w-4" />
        </button>

        <div className="px-6 pt-5 pb-2">
          <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">Create New Asset</h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Choose what type of asset to create.</p>
        </div>

        <div className="grid grid-cols-2 gap-3 px-6 pb-6 pt-3">
          {buttons.map((btn) => (
            <button
              key={btn.label}
              type="button"
              onClick={() => { btn.onClick(); onClose(); }}
              disabled={btn.disabled}
              className={`flex flex-col items-center justify-center gap-2 rounded-lg border p-5 transition ${
                btn.disabled
                  ? 'cursor-not-allowed border-slate-200 bg-slate-50 text-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-600'
                  : 'cursor-pointer border-slate-200 bg-white text-slate-700 hover:border-primary-green hover:text-primary-green hover:shadow-sm dark:border-slate-700 dark:bg-dark-tertiary dark:text-slate-200 dark:hover:border-primary-green'
              }`}
            >
              {btn.icon}
              <span className="text-xs font-semibold">{btn.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateAssetModal;
