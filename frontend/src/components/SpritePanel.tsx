"use client";

import { memo, useState, useCallback, useEffect } from 'react';
import { Cross2Icon, EyeOpenIcon, EyeNoneIcon } from '@radix-ui/react-icons';
import { Button } from './ui/Button';
import { useEditorStore } from '@/stores/editorStore';
import SpriteModal, { type SpriteDragPayload } from './SpriteModal/SpriteModal';
import type { SpriteInstance } from '@/blockly/spriteRegistry';

type Props = {
  sprites: SpriteInstance[];
  onRemoveSprite: (spriteId: string) => void;
  onUpdateSprite?: (spriteId: string, updates: Partial<SpriteInstance>) => void;
};

const SpritePanel = memo(function SpriteEditor({ sprites, onRemoveSprite, onUpdateSprite }: Props) {
  const [isSpriteModalOpen, setIsSpriteModalOpen] = useState(false);
  const [selectedSpriteId, setSelectedSpriteId] = useState<string | null>(null);
  const addSpriteToGame = useEditorStore((state) => state.addSpriteToGame);

  // Track editing state for inputs (allows empty while editing)
  const [editingValues, setEditingValues] = useState<Record<string, string>>({});
  const [originalName, setOriginalName] = useState<string>('');

  // Auto-select first sprite or clear selection when sprites change
  useEffect(() => {
    if (selectedSpriteId && !sprites.find((s) => s.id === selectedSpriteId)) {
      setSelectedSpriteId(sprites.length > 0 ? sprites[0].id : null);
    } else if (!selectedSpriteId && sprites.length > 0) {
      setSelectedSpriteId(sprites[0].id);
    }
  }, [sprites, selectedSpriteId]);

  const selectedSprite = sprites.find((s) => s.id === selectedSpriteId) || null;

  const handleSpriteSelect = useCallback((spriteId: string) => {
    useEditorStore.getState().loadWorkspace(spriteId);
    setSelectedSpriteId(spriteId);
  }, []);

  const handleFieldChange = useCallback(
    (field: keyof SpriteInstance, value: string | number | boolean) => {
      if (!selectedSpriteId || !onUpdateSprite) return;
      onUpdateSprite(selectedSpriteId, { [field]: value });
    },
    [selectedSpriteId, onUpdateSprite]
  );

  const handleFocus = useCallback((field: string, currentValue: string | number) => {
    setEditingValues((prev) => ({ ...prev, [field]: String(currentValue) }));
    if (field === 'variableName') {
      setOriginalName(String(currentValue));
    }
  }, []);

  const handleInputChange = useCallback((field: string, value: string) => {
    setEditingValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleBlur = useCallback(
    (field: keyof SpriteInstance, defaultValue: string | number) => {
      const editedValue = editingValues[field];

      // Determine final value
      let finalValue: string | number;
      if (editedValue === '' || editedValue === undefined) {
        // Empty - use default
        finalValue = defaultValue;
      } else if (field === 'name') {
        finalValue = editedValue;
      } else {
        // Parse as number
        const parsed = parseInt(editedValue);
        finalValue = isNaN(parsed) ? defaultValue : parsed;
      }

      // Update sprite
      handleFieldChange(field, finalValue);

      // Clear editing state
      setEditingValues((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    },
    [editingValues, handleFieldChange]
  );

  return (
    <section className="flex-1 rounded-lg bg-light-secondary p-3 text-sm shadow dark:bg-dark-secondary flex flex-col min-h-0 overflow-hidden">
      {/* Sprite Info Panel - Full Width Top */}
      <div className="w-full pb-3 mb-3 border-b border-slate-300 dark:border-slate-600">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
          {/* Sprite Name */}
          <div className="flex items-center gap-2">
            <label className="font-semibold text-slate-600 dark:text-slate-400">Sprite</label>
            <input
              type="text"
              value={'name' in editingValues ? editingValues.name : selectedSprite?.name || ''}
              onFocus={() => handleFocus('name', selectedSprite?.name || '')}
              onChange={(e) => handleInputChange('name', e.target.value)}
              onBlur={() => handleBlur('name', originalName)}
              disabled={!selectedSprite}
              className="w-28 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs outline-none transition focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 disabled:bg-slate-100 disabled:text-slate-400 dark:border-slate-600 dark:bg-dark-hover dark:text-slate-100 dark:disabled:bg-dark-tertiary dark:disabled:text-slate-500"
              placeholder="—"
            />
          </div>

          {/* X Position */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 dark:text-slate-400">↔</span>
            <label className="text-slate-600 dark:text-slate-400">x</label>
            <input
              type="number"
              value={'x' in editingValues ? editingValues.x : selectedSprite?.x ?? ''}
              onFocus={() => handleFocus('x', selectedSprite?.x ?? 0)}
              onChange={(e) => handleInputChange('x', e.target.value)}
              onBlur={() => handleBlur('x', 0)}
              disabled={!selectedSprite}
              className="w-14 rounded-full border border-slate-300 bg-white px-2 py-1.5 text-xs text-center outline-none transition focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 disabled:bg-slate-100 disabled:text-slate-400 dark:border-slate-600 dark:bg-dark-hover dark:text-slate-100 dark:disabled:bg-dark-tertiary dark:disabled:text-slate-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>

          {/* Y Position */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 dark:text-slate-400">↕</span>
            <label className="text-slate-600 dark:text-slate-400">y</label>
            <input
              type="number"
              value={'y' in editingValues ? editingValues.y : selectedSprite?.y ?? ''}
              onFocus={() => handleFocus('y', selectedSprite?.y ?? 0)}
              onChange={(e) => handleInputChange('y', e.target.value)}
              onBlur={() => handleBlur('y', 0)}
              disabled={!selectedSprite}
              className="w-14 rounded-full border border-slate-300 bg-white px-2 py-1.5 text-xs text-center outline-none transition focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 disabled:bg-slate-100 disabled:text-slate-400 dark:border-slate-600 dark:bg-dark-hover dark:text-slate-100 dark:disabled:bg-dark-tertiary dark:disabled:text-slate-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>

          {/* Snap to Grid */}
          <label className="flex cursor-pointer items-center gap-1.5">
            <input
              type="checkbox"
              checked={selectedSprite?.snapToGrid ?? false}
              onChange={() => handleFieldChange('snapToGrid', !(selectedSprite?.snapToGrid ?? false))}
              disabled={!selectedSprite}
              className="h-3.5 w-3.5 accent-primary-green cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <span className="font-semibold text-slate-600 dark:text-slate-400">Snap</span>
          </label>

          {/* Show/Hide Toggle */}
          <div className="flex items-center gap-0">
            <label className="font-semibold text-slate-600 dark:text-slate-400 mr-2">Show</label>
            <button
              type="button"
              onClick={() => handleFieldChange('visible', true)}
              disabled={!selectedSprite}
              className={`rounded-l-md p-1.5 border transition cursor-pointer ${
                selectedSprite?.visible !== false
                  ? 'border-primary-green bg-primary-green text-white'
                  : 'border-slate-300 bg-white text-slate-400 dark:border-slate-600 dark:bg-dark-hover dark:text-slate-500'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              title="Show sprite"
            >
              <EyeOpenIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => handleFieldChange('visible', false)}
              disabled={!selectedSprite}
              className={`rounded-r-md p-1.5 border transition cursor-pointer ${
                selectedSprite?.visible === false
                  ? 'border-primary-green bg-primary-green text-white'
                  : 'border-slate-300 bg-white text-slate-400 dark:border-slate-600 dark:bg-dark-hover dark:text-slate-500'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              title="Hide sprite"
            >
              <EyeNoneIcon className="h-4 w-4" />
            </button>
          </div>

          {/* Size */}
          <div className="flex items-center gap-2">
            <label className="font-semibold text-slate-600 dark:text-slate-400">Size</label>
            <input
              type="number"
              value={'size' in editingValues ? editingValues.size : selectedSprite?.size ?? 100}
              onFocus={() => handleFocus('size', selectedSprite?.size ?? 100)}
              onChange={(e) => handleInputChange('size', e.target.value)}
              onBlur={() => handleBlur('size', 100)}
              disabled={!selectedSprite}
              min="1"
              max="1000"
              className="w-14 rounded-full border border-slate-300 bg-white px-2 py-1.5 text-xs text-center outline-none transition focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 disabled:bg-slate-100 disabled:text-slate-400 dark:border-slate-600 dark:bg-dark-hover dark:text-slate-100 dark:disabled:bg-dark-tertiary dark:disabled:text-slate-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>

          {/* Direction */}
          <div className="flex items-center gap-2">
            <label className="font-semibold text-slate-600 dark:text-slate-400">Direction</label>
            <input
              type="number"
              value={'direction' in editingValues ? editingValues.direction : selectedSprite?.direction ?? 90}
              onFocus={() => handleFocus('direction', selectedSprite?.direction ?? 90)}
              onChange={(e) => handleInputChange('direction', e.target.value)}
              onBlur={() => handleBlur('direction', 0)}
              disabled={!selectedSprite}
              min="-180"
              max="180"
              className="w-14 rounded-full border border-slate-300 bg-white px-2 py-1.5 text-xs text-center outline-none transition focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 disabled:bg-slate-100 disabled:text-slate-400 dark:border-slate-600 dark:bg-dark-hover dark:text-slate-100 dark:disabled:bg-dark-tertiary dark:disabled:text-slate-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </div>
      </div>

      {/* Content Row - 2/3 Sprite Grid + 1/3 Stage Panel */}
      <div className="flex flex-1 gap-0 min-h-0 overflow-hidden">
        {/* Sprite Grid - Left 2/3 Width */}
        <div className="w-2/3 flex flex-col min-h-0 pr-3 border-r border-slate-300 dark:border-slate-600 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between py-2">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
              Sprites
            </span>
            <Button
              className="btn-confirm px-3 py-1 text-[11px]"
              onClick={() => setIsSpriteModalOpen(true)}
              title="Add new sprite"
            >
              + Add
            </Button>
          </div>

          {/* Grid */}
          <div className="flex-1 overflow-y-auto pt-2">
            {sprites.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-4 text-slate-400 dark:text-slate-500">
                <p className="text-xs">No sprites yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(75px,1fr))] gap-2 pr-1">
                {sprites.map((sprite) => {
                  const isSelected = sprite.id === selectedSpriteId;
                  return (
                    <div
                      key={sprite.id}
                      onClick={() => handleSpriteSelect(sprite.id)}
                      className={`relative aspect-square rounded-lg border-2 cursor-pointer transition-all overflow-hidden ${
                        isSelected
                          ? 'border-primary-green bg-primary-green/10 shadow-md ring-2 ring-primary-green/30'
                          : 'border-slate-200 bg-slate-50 hover:border-primary-green/50 dark:border-slate-600 dark:bg-dark-hover dark:hover:border-primary-green/50'
                      }`}
                    >
                      {/* Sprite Thumbnail Placeholder */}
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-10 h-10 rounded-md bg-slate-200 dark:bg-slate-600 flex items-center justify-center text-lg font-bold text-slate-400 dark:text-slate-400">
                          {sprite.name.charAt(0).toUpperCase()}
                        </div>
                      </div>

                      {/* Sprite Name Label */}
                      <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent px-1 py-1">
                        <p className="text-[9px] text-white truncate text-center font-medium">{sprite.name}</p>
                      </div>

                      {/* Delete Button - Only on Selected */}
                      {isSelected && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemoveSprite(sprite.id);
                          }}
                          className="absolute top-1 right-1 rounded-full bg-slate-700/80 hover:bg-red-500 text-white p-0.5 transition shadow"
                          title="Delete sprite"
                        >
                          <Cross2Icon className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Stage Panel - Right 1/3 Width */}
        <div className="w-1/3 flex flex-col pl-3 overflow-hidden">
          {/* Header */}
          <div className="py-2">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
              Stage
            </span>
          </div>

          {/* Stage Content */}
          <div className="flex-1 pt-2 flex flex-col gap-3">
            {/* Backdrop Thumbnail Preview */}
            <div className="w-full aspect-4/3 rounded-lg border border-slate-200 dark:border-slate-600 overflow-hidden">
              <div
                className="w-full h-full"
                style={{
                  background: `repeating-linear-gradient(
                    45deg,
                    #bfdbfe 0px,
                    #bfdbfe 8px,
                    #93c5fd 8px,
                    #93c5fd 16px
                  )`,
                }}
              />
            </div>

            {/* Backdrops Info */}
            <div className="text-center">
              <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wide">Backdrops</p>
              <p className="text-lg font-bold text-slate-700 dark:text-slate-300">1</p>
            </div>
          </div>
        </div>
      </div>

      {/* TODO: The modal shouldn't be placed here. */}
      <SpriteModal isSpriteModalOpen={isSpriteModalOpen} setIsSpriteModalOpen={setIsSpriteModalOpen} />
    </section>
  );
});

export default SpritePanel;
