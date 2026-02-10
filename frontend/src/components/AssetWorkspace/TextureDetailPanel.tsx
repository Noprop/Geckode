'use client';

import { Pencil2Icon, CopyIcon, TrashIcon } from '@radix-ui/react-icons';

export type SelectedAsset = {
  name: string;
  kind: 'sprite' | 'tile' | 'tileset' | 'animation' | 'background';
} | null;

interface TextureDetailPanelProps {
  selectedAsset: SelectedAsset;
  base64: string | null;
  onEdit: () => void;
  onDuplicate: () => void;
  onCopy: () => void;
  onDelete: () => void;
}

const kindColors: Record<string, string> = {
  sprite: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  tile: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  tileset: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  animation: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
  background: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
};

const DuplicateIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.77620 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00006H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50006C5 4.67163 5.67157 4.00006 6.5 4.00006H12.5C13.3284 4.00006 14 4.67163 14 5.50006V12.5001C14 13.3285 13.3284 14.0001 12.5 14.0001H6.5C5.67157 14.0001 5 13.3285 5 12.5001V5.50006ZM6.5 5.00006C6.22386 5.00006 6 5.22392 6 5.50006V12.5001C6 12.7762 6.22386 13.0001 6.5 13.0001H12.5C12.7761 13.0001 13 12.7762 13 12.5001V5.50006C13 5.22392 12.7761 5.00006 12.5 5.00006H6.5Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);

const TextureDetailPanel = ({ selectedAsset, base64, onEdit, onDuplicate, onCopy, onDelete }: TextureDetailPanelProps) => {
  if (!selectedAsset || !base64) {
    return (
      <div className="flex w-[120px] shrink-0 flex-col items-center justify-center border-r border-slate-200 bg-white/50 p-3 text-center dark:border-slate-700 dark:bg-dark-secondary/50">
        <p className="text-xs text-slate-400 dark:text-slate-500">Select an asset to view details</p>
      </div>
    );
  }

  return (
    <div className="flex w-[120px] shrink-0 flex-col border-r border-slate-200 bg-white/50 p-3 dark:border-slate-700 dark:bg-dark-secondary/50">
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

      <span
        className={`mt-1 self-start rounded px-1.5 py-0.5 text-[9px] font-medium uppercase ${kindColors[selectedAsset.kind] ?? ''}`}
      >
        {selectedAsset.kind}
      </span>

      <div className="mt-3 flex flex-col gap-1.5">
        <button
          type="button"
          onClick={onEdit}
          className="flex items-center gap-1.5 rounded px-2 py-1.5 text-[11px] font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          <Pencil2Icon className="h-3 w-3" /> Edit
        </button>
        <button
          type="button"
          onClick={onDuplicate}
          className="flex items-center gap-1.5 rounded px-2 py-1.5 text-[11px] font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          <DuplicateIcon /> Duplicate
        </button>
        <button
          type="button"
          onClick={onCopy}
          className="flex items-center gap-1.5 rounded px-2 py-1.5 text-[11px] font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          <CopyIcon className="h-3 w-3" /> Copy
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="flex items-center gap-1.5 rounded px-2 py-1.5 text-[11px] font-medium text-red-500 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
        >
          <TrashIcon className="h-3 w-3" /> Delete
        </button>
      </div>
    </div>
  );
};

export default TextureDetailPanel;
