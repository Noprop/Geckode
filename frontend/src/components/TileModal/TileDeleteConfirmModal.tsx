'use client';

import { useMemo } from 'react';
import { TrashIcon } from 'lucide-react';
import { Modal } from '@/components/ui/modals/Modal';
import { Button } from '@/components/ui/Button';
import { useGeckodeStore } from '@/stores/geckodeStore';

interface TileDeleteConfirmModalProps {
  tileName: string | null;
  onClose: () => void;
  onConfirm: () => void;
}

const TileDeleteConfirmModal = ({ tileName, onClose, onConfirm }: TileDeleteConfirmModalProps) => {
  const tilesets = useGeckodeStore((s) => s.tilesets);
  const tilemaps = useGeckodeStore((s) => s.tilemaps);

  const usage = useMemo(() => {
    if (!tileName) return null;

    let tilesetPlacementCount = 0;
    let tilesetCount = 0;
    for (const tileset of tilesets) {
      let localCount = 0;
      for (const row of tileset.data) {
        for (const cell of row) {
          if (cell === tileName) localCount += 1;
        }
      }
      if (localCount > 0) {
        tilesetCount += 1;
        tilesetPlacementCount += localCount;
      }
    }

    let tilemapPlacementCount = 0;
    let tilemapCount = 0;
    for (const tilemap of Object.values(tilemaps)) {
      let localCount = 0;
      for (const row of tilemap.data) {
        for (const cell of row) {
          if (cell === tileName) localCount += 1;
        }
      }
      if (localCount > 0) {
        tilemapCount += 1;
        tilemapPlacementCount += localCount;
      }
    }

    return {
      tilesetCount,
      tilesetPlacementCount,
      tilemapCount,
      tilemapPlacementCount,
    };
  }, [tileName, tilesets, tilemaps]);

  if (!tileName || !usage) return null;

  return (
    <Modal
      title="Delete Tile"
      icon={TrashIcon}
      onClose={onClose}
      subtitle={tileName}
      text={(
        <div className="space-y-3">
          <p>Deleting this tile will remove every occurrence from your project:</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-md bg-black/15 px-3 py-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/80">Tilesets</p>
              <p className="text-sm">
                <strong>{usage.tilesetPlacementCount}</strong> placements in{' '}
                <strong>{usage.tilesetCount}</strong> tileset{usage.tilesetCount === 1 ? '' : 's'}
              </p>
            </div>
            <div className="rounded-md bg-black/15 px-3 py-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/80">Tilemaps</p>
              <p className="text-sm">
                <strong>{usage.tilemapPlacementCount}</strong> placements in{' '}
                <strong>{usage.tilemapCount}</strong> tilemap{usage.tilemapCount === 1 ? '' : 's'}
              </p>
            </div>
          </div>
        </div>
      )}
      className="bg-red-500"
      actions={(
        <>
          <Button onClick={onConfirm} className="btn-deny ml-3">
            Delete
          </Button>
          <Button onClick={onClose} className="btn-neutral">
            Cancel
          </Button>
        </>
      )}
    />
  );
};

export default TileDeleteConfirmModal;
