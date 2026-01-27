import { useState, useEffect } from 'react';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { useSpriteStore } from '@/stores/spriteStore';
import type { SpritePhysics } from '@/blockly/spriteRegistry';

interface SpritePhysicsCurtainProps {
  isExpanded: boolean;
  onToggle: () => void;
}

const DEFAULT_PHYSICS: SpritePhysics = {
  enabled: false,
  gravityY: 300,
  bounce: 0.2,
  drag: 0.005,
  collideWorldBounds: true,
};

const SpritePhysicsCurtain = ({ isExpanded, onToggle }: SpritePhysicsCurtainProps) => {
  const selectedSprite = useSpriteStore((state) => state.selectedSprite);
  const selectedSpriteId = useSpriteStore((state) => state.selectedSpriteId);
  const updateSprite = useSpriteStore((state) => state.updateSprite);

  const [values, setValues] = useState<SpritePhysics>(DEFAULT_PHYSICS);

  useEffect(() => {
    if (selectedSprite?.physics) {
      setValues(selectedSprite.physics);
    } else {
      setValues(DEFAULT_PHYSICS);
    }
  }, [selectedSpriteId, selectedSprite?.physics]);

  const handleToggleField = (field: keyof SpritePhysics, value: boolean) => {
    if (!selectedSpriteId) return;
    const newPhysics = { ...values, [field]: value };
    setValues(newPhysics);
    updateSprite(selectedSpriteId, { physics: newPhysics });
  };

  const handleNumberChange = (field: keyof SpritePhysics, value: string) => {
    const parsed = parseFloat(value);
    if (isNaN(parsed)) return;
    setValues((prev) => ({ ...prev, [field]: parsed }));
  };

  const handleNumberBlur = (field: keyof SpritePhysics, defaultValue: number) => {
    if (!selectedSpriteId) return;
    const currentValue = values[field];
    const finalValue = typeof currentValue === 'number' && !isNaN(currentValue) ? currentValue : defaultValue;
    const newPhysics = { ...values, [field]: finalValue };
    updateSprite(selectedSpriteId, { physics: newPhysics });
  };

  return (
    <>
      {/* Chevron toggle button - always visible, sits in normal flow */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full h-3 flex items-center justify-center bg-slate-200/60 hover:bg-slate-300/80 dark:bg-slate-700/40 dark:hover:bg-slate-600/60 transition-colors cursor-pointer rounded-sm z-10 relative"
        title={isExpanded ? 'Hide physics settings' : 'Show physics settings'}
      >
        <ChevronDownIcon
          className={`h-3 w-3 text-slate-500 dark:text-slate-400 transition-transform duration-300 ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Expandable content - overlays on top of content below, stretches to bottom */}
      <div
        className={`absolute left-0 right-0 top-3 bottom-0 z-20 bg-light-secondary dark:bg-dark-secondary flex flex-col transition-all duration-300 ease-in-out ${
          isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-0 pt-3 pb-2">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
              Physics Settings
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
            {/* Enable Physics */}
            <label className="flex cursor-pointer items-center gap-1.5">
              <input
                type="checkbox"
                checked={values.enabled}
                onChange={() => handleToggleField('enabled', !values.enabled)}
                disabled={!selectedSprite}
                className="h-3.5 w-3.5 accent-primary-green cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <span className="font-semibold text-slate-600 dark:text-slate-400">Enable Physics</span>
            </label>

            {/* Collide World Bounds */}
            <label className="flex cursor-pointer items-center gap-1.5">
              <input
                type="checkbox"
                checked={values.collideWorldBounds}
                onChange={() => handleToggleField('collideWorldBounds', !values.collideWorldBounds)}
                disabled={!selectedSprite || !values.enabled}
                className="h-3.5 w-3.5 accent-primary-green cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <span className="font-semibold text-slate-600 dark:text-slate-400">World Bounds</span>
            </label>

            {/* Gravity Y */}
            <div className="flex items-center gap-1.5">
              <label className="font-semibold text-slate-600 dark:text-slate-400">Gravity</label>
              <input
                type="number"
                value={values.gravityY}
                onChange={(e) => handleNumberChange('gravityY', e.target.value)}
                onBlur={() => handleNumberBlur('gravityY', 300)}
                disabled={!selectedSprite || !values.enabled}
                className="w-16 rounded-full border border-slate-300 bg-white px-2 py-1 text-xs text-center outline-none transition focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 disabled:bg-slate-100 disabled:text-slate-400 dark:border-slate-600 dark:bg-dark-hover dark:text-slate-100 dark:disabled:bg-dark-tertiary dark:disabled:text-slate-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>

            {/* Bounce */}
            <div className="flex items-center gap-1.5">
              <label className="font-semibold text-slate-600 dark:text-slate-400">Bounce</label>
              <input
                type="number"
                value={values.bounce}
                onChange={(e) => handleNumberChange('bounce', e.target.value)}
                onBlur={() => handleNumberBlur('bounce', 0.2)}
                disabled={!selectedSprite || !values.enabled}
                min="0"
                max="1"
                step="0.1"
                className="w-14 rounded-full border border-slate-300 bg-white px-2 py-1 text-xs text-center outline-none transition focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 disabled:bg-slate-100 disabled:text-slate-400 dark:border-slate-600 dark:bg-dark-hover dark:text-slate-100 dark:disabled:bg-dark-tertiary dark:disabled:text-slate-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>

            {/* Drag */}
            <div className="flex items-center gap-1.5">
              <label className="font-semibold text-slate-600 dark:text-slate-400">Drag</label>
              <input
                type="number"
                value={values.drag}
                onChange={(e) => handleNumberChange('drag', e.target.value)}
                onBlur={() => handleNumberBlur('drag', 0.005)}
                disabled={!selectedSprite || !values.enabled}
                min="0"
                max="1"
                step="0.001"
                className="w-16 rounded-full border border-slate-300 bg-white px-2 py-1 text-xs text-center outline-none transition focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 disabled:bg-slate-100 disabled:text-slate-400 dark:border-slate-600 dark:bg-dark-hover dark:text-slate-100 dark:disabled:bg-dark-tertiary dark:disabled:text-slate-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpritePhysicsCurtain;
