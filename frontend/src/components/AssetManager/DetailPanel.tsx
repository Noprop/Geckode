'use client';

import { Pencil2Icon, CopyIcon, TrashIcon } from '@radix-ui/react-icons';
import { Files } from 'lucide-react';
import { type SelectedAsset } from './Overview';

interface TextureDetailPanelProps {
  selectedAsset: SelectedAsset;
  base64: string | null;
  onEdit: () => void;
  onDuplicate: () => void;
  onCopy: () => void;
  onDelete: () => void;
}

const TextureDetailPanel = ({ selectedAsset, base64, onEdit, onDuplicate, onCopy, onDelete }: TextureDetailPanelProps) => {
  if (!selectedAsset || !base64) {
    return (
      <div className="flex w-[120px] shrink-0 flex-col items-center justify-center border-r border-slate-200 bg-white/50 px-3 pb-3 text-center dark:border-slate-700 dark:bg-dark-secondary/50">
        <p className="text-xs text-slate-400 dark:text-slate-500">Select an asset to view details</p>
      </div>
    );
  }

  return (
    <div className="flex w-[180px] shrink-0 flex-col border-r border-slate-200 bg-white/50 pt-4 pl-4 pr-3 pb-3 dark:border-slate-700 dark:bg-dark-secondary/50">
      <div className="flex aspect-square items-center justify-center rounded-md border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
        <img
          src={base64}
          alt={selectedAsset.name}
          className="h-16 w-16 object-contain drop-shadow-sm"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>

      <p className="mt-2 truncate text-xs font-semibold text-slate-800 dark:text-slate-200" title={selectedAsset.name}>
        {selectedAsset.name}
      </p>

      <div className="mt-3 flex flex-col gap-1.5">
        <button type="button" onClick={onEdit} className="flex items-center gap-1.5 rounded px-2 py-1.5 text-[11px] font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700">
          <Pencil2Icon className="h-3 w-3" /> Edit
        </button>
        <button type="button" onClick={onDuplicate} className="flex items-center gap-1.5 rounded px-2 py-1.5 text-[11px] font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700">
          <Files className="h-3 w-3" /> Duplicate
        </button>
        <button type="button" onClick={onCopy} className="flex items-center gap-1.5 rounded px-2 py-1.5 text-[11px] font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700">
          <CopyIcon className="h-3 w-3" /> Copy
        </button>
        <button type="button" onClick={onDelete} className="flex items-center gap-1.5 rounded px-2 py-1.5 text-[11px] font-medium text-red-500 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20">
          <TrashIcon className="h-3 w-3" /> Delete
        </button>
      </div>
    </div>
  );
};

export default TextureDetailPanel;
