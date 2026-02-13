import { useState, useEffect, useCallback } from 'react';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { useGeckodeStore } from '@/stores/geckodeStore';
import type { SpritePhysics } from '@/blockly/spriteRegistry';
import { NumericField } from './SpritePosition';
import { labelClasses } from './spritePositionUtils';

interface SpritePhysicsCurtainProps {
  isExpanded: boolean;
  onToggle: () => void;
}

const DEFAULT_PHYSICS: SpritePhysics = {
  enabled: false,
  gravityY: 300,
  bounce: 0.2,
  drag: 0.99,
  collideWorldBounds: true,
};

interface PhysicsFormValues {
  gravityY: string;
  bounce: string;
  drag: string;
}

function buildPhysicsFormValues(physics: SpritePhysics | undefined): PhysicsFormValues {
  const p = physics ?? DEFAULT_PHYSICS;
  return {
    gravityY: String(p.gravityY),
    bounce: String(p.bounce),
    drag: String(p.drag),
  };
}

const SpritePhysicsCurtain = ({ isExpanded, onToggle }: SpritePhysicsCurtainProps) => {
  const selectedSpriteId = useGeckodeStore((state) => state.selectedSpriteId);
  const selectedSprite = useGeckodeStore((s) =>
    s.selectedSpriteId !== null
      ? s.spriteInstances.find((i) => i.id === s.selectedSpriteId) ?? null
      : null,
  );
  const updateSpriteInstance = useGeckodeStore((state) => state.updateSpriteInstance);

  const physics = selectedSprite?.physics;
  const enabled = physics?.enabled ?? DEFAULT_PHYSICS.enabled;
  const collideWorldBounds = physics?.collideWorldBounds ?? DEFAULT_PHYSICS.collideWorldBounds;

  const [values, setValues] = useState<PhysicsFormValues>(() => buildPhysicsFormValues(physics));

  useEffect(() => {
    setValues(buildPhysicsFormValues(physics));
  }, [selectedSpriteId, physics]);

  const handleInputChange = useCallback(
    (field: keyof PhysicsFormValues, value: string) => {
      setValues((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const handleToggleField = (field: keyof SpritePhysics, value: boolean) => {
    if (!selectedSpriteId) return;
    const currentPhysics = physics ?? DEFAULT_PHYSICS;
    updateSpriteInstance(selectedSpriteId, {
      physics: { ...currentPhysics, [field]: value },
    });
  };

  const handleBlurGravityY = useCallback(() => {
    if (selectedSpriteId === null || !selectedSprite) return;
    const parsed = parseFloat(values.gravityY);
    const finalValue = Number.isNaN(parsed) ? DEFAULT_PHYSICS.gravityY : parsed;
    const currentPhysics = selectedSprite.physics ?? DEFAULT_PHYSICS;
    if (currentPhysics.gravityY !== finalValue) {
      updateSpriteInstance(selectedSpriteId, {
        physics: { ...currentPhysics, gravityY: finalValue },
      });
    }
    setValues((prev) => ({ ...prev, gravityY: String(finalValue) }));
  }, [selectedSpriteId, selectedSprite, values.gravityY, updateSpriteInstance]);

  const handleBlurBounce = useCallback(() => {
    if (selectedSpriteId === null || !selectedSprite) return;
    const parsed = parseFloat(values.bounce);
    const finalValue = Number.isNaN(parsed) ? DEFAULT_PHYSICS.bounce : parsed;
    const currentPhysics = selectedSprite.physics ?? DEFAULT_PHYSICS;
    if (currentPhysics.bounce !== finalValue) {
      updateSpriteInstance(selectedSpriteId, {
        physics: { ...currentPhysics, bounce: finalValue },
      });
    }
    setValues((prev) => ({ ...prev, bounce: String(finalValue) }));
  }, [selectedSpriteId, selectedSprite, values.bounce, updateSpriteInstance]);

  const handleBlurDrag = useCallback(() => {
    if (selectedSpriteId === null || !selectedSprite) return;
    const parsed = parseFloat(values.drag);
    const finalValue = Number.isNaN(parsed) ? DEFAULT_PHYSICS.drag : parsed;
    const currentPhysics = selectedSprite.physics ?? DEFAULT_PHYSICS;
    if (currentPhysics.drag !== finalValue) {
      updateSpriteInstance(selectedSpriteId, {
        physics: { ...currentPhysics, drag: finalValue },
      });
    }
    setValues((prev) => ({ ...prev, drag: String(finalValue) }));
  }, [selectedSpriteId, selectedSprite, values.drag, updateSpriteInstance]);

  const disabled = !selectedSprite;
  const fieldsDisabled = disabled || !enabled;

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
                checked={enabled}
                onChange={() => handleToggleField('enabled', !enabled)}
                disabled={disabled}
                className="h-3.5 w-3.5 accent-primary-green cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <span className={labelClasses}>Enable Physics</span>
            </label>

            {/* Collide World Bounds */}
            <label className="flex cursor-pointer items-center gap-1.5">
              <input
                type="checkbox"
                checked={collideWorldBounds}
                onChange={() => handleToggleField('collideWorldBounds', !collideWorldBounds)}
                disabled={fieldsDisabled}
                className="h-3.5 w-3.5 accent-primary-green cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <span className={labelClasses}>World Bounds</span>
            </label>

            {/* Gravity Y */}
            <NumericField
              label="Gravity"
              value={values.gravityY}
              disabled={fieldsDisabled}
              onChange={(v) => handleInputChange('gravityY', v)}
              onBlur={handleBlurGravityY}
            />

            {/* Bounce */}
            <NumericField
              label="Bounce"
              value={values.bounce}
              disabled={fieldsDisabled}
              min="0"
              max="1"
              onChange={(v) => handleInputChange('bounce', v)}
              onBlur={handleBlurBounce}
            />

            {/* Drag */}
            <NumericField
              label="Drag"
              value={values.drag}
              disabled={fieldsDisabled}
              min="0"
              max="1"
              onChange={(v) => handleInputChange('drag', v)}
              onBlur={handleBlurDrag}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SpritePhysicsCurtain;
