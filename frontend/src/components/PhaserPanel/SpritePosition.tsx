import { Check, ChevronDown, SquareCheck, Move, MoveDiagonal, RotateCw } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { EventBus } from '@/phaser/EventBus';
import { useGeckodeStore } from '@/stores/geckodeStore';
import {
  buildFormValues,
  FIELD_DEFAULTS,
  labelClasses,
  numericInputClasses,
  typeTriggerTextClasses,
  typeTriggerTextDefaultClasses,
  dropdownOptionTextClasses,
  resolveBlurValue,
  type SpriteFormValues,
  textInputClasses,
  visibilityButtonActiveClasses,
  visibilityButtonBaseClasses,
  visibilityButtonInactiveClasses,
} from './spritePositionUtils';
import { SPRITE_TYPE_NONE } from '@/blockly/spriteRegistry';
import SpriteTypeModal from './SpriteTypeModal';
import { Modal } from '@/components/ui/modals/Modal';
import { Button } from '@/components/ui/Button';

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
  <label
    className={`flex items-center gap-1.5 ${d ? 'cursor-not-allowed' : 'cursor-pointer'}`}
  >
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
  </label>
);

/** Compact label + input for x/y columns - aligns inputs vertically */
const NumericCompact = ({
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
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  disabled?: boolean;
  min?: number;
  max?: number;
}) => (
  <div className="grid grid-cols-[1.25rem_auto] items-center gap-0.5">
    <span className="flex items-center gap-1 min-w-0">
      {Icon ? <Icon size={iconSize} className="text-slate-500 dark:text-slate-400 shrink-0" /> : null}
      <span className={labelClasses}>{label}</span>
    </span>
    <input
      id={id}
      type="number"
      aria-label={label}
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

  const SpritePosition = ({ borderless }: { borderless?: boolean }) => {
  const selectedSpriteId = useGeckodeStore((s) => s.selectedSpriteId);
  const selectedSprite = useGeckodeStore((s) =>
    s.selectedSpriteId !== null ? (s.spriteInstances.find((i) => i.id === s.selectedSpriteId) ?? null) : null,
  );
  const spriteTypes = useGeckodeStore((s) => s.spriteTypes);
  const updateSpriteInstance = useGeckodeStore((s) => s.updateSpriteInstance);
  const setSelectedSpriteId = useGeckodeStore((s) => s.setSelectedSpriteId);
  const removeSpriteType = useGeckodeStore((s) => s.removeSpriteType);
  const canEditProject = useGeckodeStore((state) => state.canEditProject);

  const [spriteTypeModal, setSpriteTypeModal] = useState<{
    show: boolean;
    mode: 'create' | 'rename';
    spriteTypeId?: string | null;
    initialName?: string;
  }>({ show: false, mode: 'create' });
  const [spriteTypeToDelete, setSpriteTypeToDelete] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const phaserGame = useGeckodeStore((s) => s.phaserGame);
  const centerX = useMemo(() => (phaserGame ? Math.round(phaserGame.scale.width / 2) : 80), [phaserGame]);
  const centerY = useMemo(() => (phaserGame ? Math.round(phaserGame.scale.height / 2) : 64), [phaserGame]);

  const [values, setValues] = useState<SpriteFormValues>(() => buildFormValues(selectedSprite, centerX, centerY));

  useEffect(() => {
    setValues(buildFormValues(selectedSprite, centerX, centerY));
  }, [selectedSprite, centerX, centerY]);

  useEffect(() => {
    const handleDragStart = ({ id }: { id: string }) => {
      setSelectedSpriteId(id);
    };

    const handleDragging = ({ x, y }: { x: number; y: number }) => {
      setValues((prev) => ({
        ...prev,
        x: String(Math.round(x)),
        y: String(Math.round(y)),
      }));
    };

    const handleDragEnd = ({ id, x, y }: { id: string; x: number; y: number }) => {
      const { selectedSpriteId, updateSpriteInstance } = useGeckodeStore.getState();
      if (selectedSpriteId !== id) return;
      setValues((prev) => ({
        ...prev,
        x: String(Math.round(x)),
        y: String(Math.round(y)),
      }));
      updateSpriteInstance(id, { x: Math.round(x), y: Math.round(y) });
    };

    EventBus.on('editor-sprite-drag-start', handleDragStart);
    EventBus.on('editor-sprite-dragging', handleDragging);
    EventBus.on('editor-sprite-drag-end', handleDragEnd);
    return () => {
      EventBus.off('editor-sprite-drag-start', handleDragStart);
      EventBus.off('editor-sprite-dragging', handleDragging);
      EventBus.off('editor-sprite-drag-end', handleDragEnd);
    };
  }, []);

  const handleInputChange = useCallback((field: keyof SpriteFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSpriteTypeSelect = useCallback(
    (spriteTypeId: string | null) => {
      if (selectedSpriteId === null || !selectedSprite) return;
      updateSpriteInstance(selectedSpriteId, { spriteTypeId });
      setDropdownOpen(false);
    },
    [selectedSpriteId, selectedSprite, updateSpriteInstance],
  );

  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const currentSpriteTypeId = values.spriteTypeId === SPRITE_TYPE_NONE ? null : values.spriteTypeId;
  const isNoneSelected = !currentSpriteTypeId || currentSpriteTypeId === '';
  const canRenameOrDelete = !isNoneSelected && canEditProject;
  const canDelete = canRenameOrDelete;

  const handleBlurX = useCallback(() => {
    if (selectedSpriteId === null || !selectedSprite) return;
    const rawValue = values.x;
    const finalValue = resolveBlurValue(rawValue, 'x', centerX);
    if (selectedSprite.x !== finalValue) {
      updateSpriteInstance(selectedSpriteId, { x: finalValue as number });
    }
  }, [selectedSpriteId, selectedSprite, values.x, centerX, updateSpriteInstance]);

  const handleBlurY = useCallback(() => {
    if (selectedSpriteId === null || !selectedSprite) return;
    const rawValue = values.y;
    const finalValue = resolveBlurValue(rawValue, 'y', centerY);
    if (selectedSprite.y !== finalValue) {
      updateSpriteInstance(selectedSpriteId, { y: finalValue as number });
    }
  }, [selectedSpriteId, selectedSprite, values.y, centerY, updateSpriteInstance]);

  const handleBlurName = useCallback(() => {
    if (selectedSpriteId === null || !selectedSprite) return;
    const finalValue = resolveBlurValue(values.name, 'name', FIELD_DEFAULTS.name);
    if (selectedSprite.name !== finalValue) {
      updateSpriteInstance(selectedSpriteId, { name: finalValue as string });
    }
  }, [selectedSpriteId, selectedSprite, values.name, updateSpriteInstance]);

  const handleBlurScaleX = useCallback(() => {
    if (selectedSpriteId === null || !selectedSprite) return;
    const finalValue = resolveBlurValue(values.scaleX, 'scaleX', FIELD_DEFAULTS.scaleX);
    if (selectedSprite.scaleX !== finalValue) {
      updateSpriteInstance(selectedSpriteId, { scaleX: finalValue as number });
    }
  }, [selectedSpriteId, selectedSprite, values.scaleX, updateSpriteInstance]);

  const handleBlurScaleY = useCallback(() => {
    if (selectedSpriteId === null || !selectedSprite) return;
    const finalValue = resolveBlurValue(values.scaleY, 'scaleY', FIELD_DEFAULTS.scaleY);
    if (selectedSprite.scaleY !== finalValue) {
      updateSpriteInstance(selectedSpriteId, { scaleY: finalValue as number });
    }
  }, [selectedSpriteId, selectedSprite, values.scaleY, updateSpriteInstance]);

  const handleBlurDirection = useCallback(() => {
    if (selectedSpriteId === null || !selectedSprite) return;
    const finalValue = resolveBlurValue(values.direction, 'direction', FIELD_DEFAULTS.direction);
    if (selectedSprite.direction !== finalValue) {
      updateSpriteInstance(selectedSpriteId, { direction: finalValue as number });
    }
  }, [selectedSpriteId, selectedSprite, values.direction, updateSpriteInstance]);

  const setEnabled = useCallback(
    (enabled: boolean) => {
      if (selectedSpriteId === null) return;
      updateSpriteInstance(selectedSpriteId, { enabled });
    },
    [selectedSpriteId, updateSpriteInstance],
  );

  const disabled = !selectedSprite || !canEditProject;
  const enabled = selectedSprite?.enabled ?? true;

  return (
    <>
    <div className="grid grid-cols-[auto_5rem_auto_auto] gap-x-2 gap-y-2.5 text-xs auto-rows-[minmax(24px,auto)] items-center">
      {/* Row 1: name | position | x: | y: */}
      <div className="flex items-center gap-2">
        <span className={labelClasses}>
          Sprite
        </span>
        <input
          id="sprite-name"
          type="text"
          aria-label="Sprite name"
          value={values.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          onBlur={handleBlurName}
          disabled={disabled}
          className={textInputClasses}
          placeholder="—"
        />
      </div>
      <div className="flex items-center gap-1.5">
        <Move size={iconSize} className="text-slate-500 dark:text-slate-400 shrink-0" />
        <span className={labelClasses}>Position</span>
      </div>
        <NumericCompact
          label="x"
          id="sprite-x"
        value={values.x}
        onChange={(v) => handleInputChange('x', v)}
        onBlur={handleBlurX}
        disabled={disabled}
      />
        <NumericCompact
          label="y"
          id="sprite-y"
        value={values.y}
        onChange={(v) => handleInputChange('y', v)}
        onBlur={handleBlurY}
        disabled={disabled}
      />

      {/* Row 2: enabled | scale | x: | y: */}
      <ToggleIcon
        checked={enabled}
        onToggle={() => setEnabled(!enabled)}
        icon={Check}
        label="Enabled"
        disabled={disabled}
      />
      <div className="flex items-center gap-1.5">
        <MoveDiagonal size={iconSize} className="text-slate-500 dark:text-slate-400 shrink-0" />
        <span className={labelClasses}>Scale</span>
      </div>
      <NumericCompact
        label="x"
        id="sprite-scale-x"
        value={values.scaleX}
        onChange={(v) => handleInputChange('scaleX', v)}
        onBlur={handleBlurScaleX}
        disabled={disabled}
        min={-200}
        max={200}
      />
        <NumericCompact
          label="y"
          id="sprite-scale-y"
        value={values.scaleY}
        onChange={(v) => handleInputChange('scaleY', v)}
        onBlur={handleBlurScaleY}
        disabled={disabled}
        min={-200}
        max={200}
      />

      {/* Row 3: Type dropdown (MakeCode Style) | direction (spans cols 2–4, left-aligned) */}
      <div ref={dropdownRef} className="relative flex items-center gap-1.5 flex-wrap">
        <span className={labelClasses}>Type</span>
        <div className="relative flex-1 min-w-0">
          <button
            type="button"
            id="sprite-type"
            aria-label="Sprite type"
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
            onClick={() => !disabled && setDropdownOpen((o) => !o)}
            disabled={disabled}
            className={`${textInputClasses} min-w-0 w-full flex items-center justify-between gap-1`}
          >
            <span
              className={`${values.spriteTypeId === SPRITE_TYPE_NONE ? typeTriggerTextClasses : typeTriggerTextDefaultClasses} truncate`}
            >
              {values.spriteTypeId === SPRITE_TYPE_NONE
                ? '(none)'
                : spriteTypes.find((t) => t.id === values.spriteTypeId)?.name ?? '(none)'}
            </span>
            <ChevronDown size={iconSize} className="shrink-0" />
          </button>
          {dropdownOpen && (
            <div
              role="listbox"
              className="absolute left-0 right-0 top-full mt-1 z-50 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-dark-hover shadow-lg py-1 max-h-48 overflow-y-auto"
            >
              <button
                type="button"
                role="option"
                aria-selected={values.spriteTypeId === SPRITE_TYPE_NONE}
                onClick={() => handleSpriteTypeSelect(null)}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-left hover:bg-slate-100 dark:hover:bg-dark-tertiary"
              >
                {values.spriteTypeId === SPRITE_TYPE_NONE ? (
                  <Check size={iconSize} className="shrink-0 text-primary-green" />
                ) : (
                  <span className="w-[14px]" />
                )}
                <span className={typeTriggerTextClasses}>(none)</span>
              </button>
              {spriteTypes.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="option"
                  aria-selected={values.spriteTypeId === t.id}
                  onClick={() => handleSpriteTypeSelect(t.id)}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-left hover:bg-slate-100 dark:hover:bg-dark-tertiary"
                >
                  {values.spriteTypeId === t.id ? (
                    <Check size={iconSize} className="shrink-0 text-primary-green" />
                  ) : (
                    <span className="w-[14px]" />
                  )}
                  <span className={dropdownOptionTextClasses}>{t.name}</span>
                </button>
              ))}
              <hr className="border-slate-300 dark:border-slate-600 my-1" />
              <button
                type="button"
                onClick={() => {
                  setSpriteTypeModal({ show: true, mode: 'create' });
                  setDropdownOpen(false);
                }}
                className="w-full px-3 py-1.5 text-left hover:bg-slate-100 dark:hover:bg-dark-tertiary"
              >
                <span className={dropdownOptionTextClasses}>Add a new type...</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (currentSpriteTypeId) {
                    const t = spriteTypes.find((x) => x.id === currentSpriteTypeId);
                    setSpriteTypeModal({
                      show: true,
                      mode: 'rename',
                      spriteTypeId: currentSpriteTypeId,
                      initialName: t?.name ?? '',
                    });
                  }
                  setDropdownOpen(false);
                }}
                disabled={!canRenameOrDelete}
                className="w-full px-3 py-1.5 text-left hover:bg-slate-100 dark:hover:bg-dark-tertiary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className={dropdownOptionTextClasses}>Rename type...</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (currentSpriteTypeId) setSpriteTypeToDelete(currentSpriteTypeId);
                  setDropdownOpen(false);
                }}
                disabled={!canDelete}
                className="w-full px-3 py-1.5 text-left hover:bg-slate-100 dark:hover:bg-dark-tertiary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className={dropdownOptionTextClasses}>Delete type...</span>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="col-span-3 flex items-center justify-center gap-2.5">
        <RotateCw size={iconSize} className="text-slate-500 dark:text-slate-400 shrink-0" />
        <span className={labelClasses}>Direction</span>
        <input
          id="sprite-direction"
          type="number"
          aria-label="Direction"
          value={values.direction}
          onChange={(e) => handleInputChange('direction', e.target.value)}
          onBlur={handleBlurDirection}
          disabled={disabled}
          min={-180}
          max={180}
          className={numericInputClasses}
        />
      </div>
    </div>

      <SpriteTypeModal
        show={spriteTypeModal.show}
        mode={spriteTypeModal.mode}
        spriteTypeId={spriteTypeModal.spriteTypeId}
        initialName={spriteTypeModal.initialName}
        onClose={() => setSpriteTypeModal((p) => ({ ...p, show: false }))}
        onSuccess={(id) => {
          if (selectedSpriteId) updateSpriteInstance(selectedSpriteId, { spriteTypeId: id });
        }}
      />

      {spriteTypeToDelete && (
        <Modal
          title="Delete Sprite Type"
          subtitle="Sprites using this type will be reassigned to None."
          onClose={() => setSpriteTypeToDelete(null)}
          actions={
            <>
              <Button
                onClick={() => {
                  try {
                    removeSpriteType(spriteTypeToDelete);
                    setSpriteTypeToDelete(null);
                  } catch {
                    // handled by store/snackbar
                  }
                }}
                className="btn-deny ml-3"
              >
                Delete
              </Button>
              <Button onClick={() => setSpriteTypeToDelete(null)} className="btn-neutral">
                Cancel
              </Button>
            </>
          }
        />
      )}
    </>
  );
};

export default SpritePosition;
