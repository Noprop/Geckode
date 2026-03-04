import { useState, useEffect, useCallback } from 'react';
import {
  Square,
  Hand,
  RectangleHorizontal,
  Box,
  Move,
  ArrowDown,
  ArrowUpFromLine,
  Blocks,
  SquareArrowRightExit,
  ArrowRightToLine,
  ArrowUpNarrowWide,
} from 'lucide-react';
import { useGeckodeStore } from '@/stores/geckodeStore';
import type { SpritePhysics } from '@/blockly/spriteRegistry';
import {
  labelClasses,
  numericInputClasses,
  visibilityButtonBaseClasses,
  visibilityButtonActiveClasses,
  visibilityButtonInactiveClasses,
} from './spritePositionUtils';

const DEFAULT_PHYSICS: SpritePhysics = {
  pushesObjects: false,
  pushable: false,
  collidesWithWalls: true,
  isSolid: false,
  gravityY: 0,
  bounce: 0,
  drag: 1,
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

const iconSize = 14;
const ToggleIcon = ({
  checked,
  onToggle,
  icon: Icon,
  label,
  disabled: d,
}: {
  checked: boolean;
  onToggle: () => void;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  disabled?: boolean;
}) => (
  <label className={`grid grid-cols-[auto_minmax(0,1fr)] items-center gap-1.5 ${d ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
    <button
      type="button"
      onClick={onToggle}
      disabled={d}
      className={`${visibilityButtonBaseClasses} rounded-md shrink-0 ${
        checked ? visibilityButtonActiveClasses : visibilityButtonInactiveClasses
      }`}
      title={label}
    >
      <Icon size={iconSize} className="shrink-0" />
    </button>
    <span
      className={`${labelClasses} select-none`}
      onClick={(e) => {
        if (!d) {
          e.preventDefault();
          onToggle();
        }
      }}
    >
      {label}
    </span>
  </label>
);

const NumericWithIcon = ({
  icon: Icon,
  label,
  id,
  value,
  onChange,
  onBlur,
  disabled: d,
  min,
  max,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  disabled?: boolean;
  min?: number;
  max?: number;
}) => (
  <div className="grid grid-cols-[5rem_auto] items-center gap-1.5">
    <label htmlFor={id} className="flex items-center gap-1.5 min-w-0">
      <Icon size={iconSize} className="text-slate-500 dark:text-slate-400 shrink-0" />
      <span className={labelClasses}>{label}</span>
    </label>
    <input
      id={id}
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      disabled={d}
      min={min}
      max={max}
      className={numericInputClasses}
    />
  </div>
);

const SpritePhysicsCurtain = () => {
  const selectedSpriteId = useGeckodeStore((state) => state.selectedSpriteId);
  const selectedSprite = useGeckodeStore((s) =>
    s.selectedSpriteId !== null
      ? s.spriteInstances.find((i) => i.id === s.selectedSpriteId) ?? null
      : null,
  );
  const updateSpriteInstance = useGeckodeStore((state) => state.updateSpriteInstance);
  const canEditProject = useGeckodeStore((state) => state.canEditProject);

  const physics = selectedSprite?.physics;
  const pushesObjects = physics?.pushesObjects ?? DEFAULT_PHYSICS.pushesObjects;
  const pushable = physics?.pushable ?? DEFAULT_PHYSICS.pushable;
  const collidesWithWalls = physics?.collidesWithWalls ?? DEFAULT_PHYSICS.collidesWithWalls;
  const isSolid = physics?.isSolid ?? DEFAULT_PHYSICS.isSolid;
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

  const disabled = !selectedSprite || !canEditProject;

  return (
    <div className="grid grid-cols-3 gap-x-4 gap-y-2.5 text-xs auto-rows-[minmax(24px,auto)] items-center">
      {/* Row 0: Collides with walls | Pushes objects | Gravity */}
      <ToggleIcon
        checked={collidesWithWalls}
        onToggle={() => handleToggleField('collidesWithWalls', !collidesWithWalls)}
        icon={Blocks}
        label="Collides with solids"
        disabled={disabled}
      />
      <ToggleIcon
        checked={pushesObjects}
        onToggle={() => handleToggleField('pushesObjects', !pushesObjects)}
        icon={ArrowRightToLine}
        label="Pushes objects"
        disabled={disabled}
      />
      <NumericWithIcon
        icon={ArrowDown}
        label="Gravity"
        id="sprite-gravity"
        value={values.gravityY}
        onChange={(v) => handleInputChange('gravityY', v)}
        onBlur={handleBlurGravityY}
        disabled={disabled}
      />

      {/* Row 1: Is solid | Pushable | Bounce */}
      <ToggleIcon
        checked={isSolid}
        onToggle={() => handleToggleField('isSolid', !isSolid)}
        icon={Box}
        label="Is solid"
        disabled={disabled}
      />
      <ToggleIcon
        checked={pushable}
        onToggle={() => handleToggleField('pushable', !pushable)}
        icon={SquareArrowRightExit}
        label="Pushable"
        disabled={disabled}
      />
      <NumericWithIcon
        icon={ArrowUpFromLine}
        label="Bounce"
        id="sprite-bounce"
        value={values.bounce}
        onChange={(v) => handleInputChange('bounce', v)}
        onBlur={handleBlurBounce}
        disabled={disabled}
        min={0}
        max={1}
      />

      {/* Row 2: World Bounds (centered across cols 1–2) | Drag */}
      <div className="col-span-2 flex justify-center">
        <ToggleIcon
          checked={collideWorldBounds}
          onToggle={() => handleToggleField('collideWorldBounds', !collideWorldBounds)}
          icon={RectangleHorizontal}
          label="World Bounds"
          disabled={disabled}
        />
      </div>
      <NumericWithIcon
        icon={ArrowUpNarrowWide}
        label="Drag"
        id="sprite-drag"
        value={values.drag}
        onChange={(v) => handleInputChange('drag', v)}
        onBlur={handleBlurDrag}
        disabled={disabled}
        min={0}
        max={1}
      />
    </div>
  );
};

export default SpritePhysicsCurtain;
