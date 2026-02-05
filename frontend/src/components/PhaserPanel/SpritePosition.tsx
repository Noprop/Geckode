import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useCallback, useEffect, useMemo, useState } from "react";
import { EventBus } from "@/phaser/EventBus";
import { useGeckodeStore } from "@/stores/geckodeStore";
import {
  buildFormValues,
  FIELD_DEFAULTS,
  iconClasses,
  labelClasses,
  numericInputClasses,
  resolveBlurValue,
  type SpriteFormValues,
  textInputClasses,
  visibilityButtonActiveClasses,
  visibilityButtonBaseClasses,
  visibilityButtonInactiveClasses,
} from "./spritePositionUtils";

interface NumericFieldProps {
  label: string;
  icon?: string;
  value: string;
  disabled: boolean;
  min?: string;
  max?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}

function NumericField({
  label,
  icon,
  value,
  disabled,
  min,
  max,
  onChange,
  onBlur,
}: NumericFieldProps) {
  const id = `sprite-${label.toLowerCase().replace(/\s/g, "-")}`;
  return (
    <div className="flex items-center gap-1.5">
      {icon ? <span className={iconClasses}>{icon}</span> : null}
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
      <input
        id={id}
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        disabled={disabled}
        min={min}
        max={max}
        className={numericInputClasses}
      />
    </div>
  );
}

const SpritePosition = () => {
  const selectedSpriteIdx = useGeckodeStore((s) => s.selectedSpriteIdx);
  const selectedSprite = useGeckodeStore((s) =>
    s.selectedSpriteIdx !== null
      ? s.spriteInstances[s.selectedSpriteIdx]
      : null,
  );
  const spriteInstances = useGeckodeStore((s) => s.spriteInstances);
  const updateSpriteInstance = useGeckodeStore((s) => s.updateSpriteInstance);
  const setSelectedSpriteIdx = useGeckodeStore((s) => s.setSelectedSpriteIdx);

  const phaserGame = useGeckodeStore((s) => s.phaserGame);
  const centerX = useMemo(
    () => (phaserGame ? Math.round(phaserGame.scale.width / 2) : 80),
    [phaserGame],
  );
  const centerY = useMemo(
    () => (phaserGame ? Math.round(phaserGame.scale.height / 2) : 64),
    [phaserGame],
  );

  const [values, setValues] = useState<SpriteFormValues>(() =>
    buildFormValues(selectedSprite, centerX, centerY),
  );

  useEffect(() => {
    setValues(buildFormValues(selectedSprite, centerX, centerY));
  }, [selectedSprite, centerX, centerY]);

  useEffect(() => {
    const handleDragStart = ({ id }: { id: string }) => {
      const idx = spriteInstances.findIndex((s) => s.id === id);
      if (idx !== -1) setSelectedSpriteIdx(idx);
    };

    const handleDragging = ({
      id,
      x,
      y,
    }: {
      id: string;
      x: number;
      y: number;
    }) => {
      if (selectedSpriteIdx === null) return;
      if (spriteInstances[selectedSpriteIdx]?.id !== id) return;
      setValues((prev) => ({
        ...prev,
        x: String(Math.round(x)),
        y: String(Math.round(y)),
      }));
    };

    EventBus.on("editor-sprite-drag-start", handleDragStart);
    EventBus.on("editor-sprite-dragging", handleDragging);
    return () => {
      EventBus.off("editor-sprite-drag-start", handleDragStart);
      EventBus.off("editor-sprite-dragging", handleDragging);
    };
  }, [spriteInstances, selectedSpriteIdx, setSelectedSpriteIdx]);

  const handleInputChange = useCallback(
    (field: keyof SpriteFormValues, value: string) => {
      setValues((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const handleBlurX = useCallback(() => {
    if (selectedSpriteIdx === null || !selectedSprite) return;
    const rawValue = values.x;
    const finalValue = resolveBlurValue(rawValue, "x", centerX);
    if (selectedSprite.x !== finalValue) {
      updateSpriteInstance(selectedSpriteIdx, { x: finalValue as number });
    }
  }, [
    selectedSpriteIdx,
    selectedSprite,
    values.x,
    centerX,
    updateSpriteInstance,
  ]);

  const handleBlurY = useCallback(() => {
    if (selectedSpriteIdx === null || !selectedSprite) return;
    const rawValue = values.y;
    const finalValue = resolveBlurValue(rawValue, "y", centerY);
    if (selectedSprite.y !== finalValue) {
      updateSpriteInstance(selectedSpriteIdx, { y: finalValue as number });
    }
  }, [
    selectedSpriteIdx,
    selectedSprite,
    values.y,
    centerY,
    updateSpriteInstance,
  ]);

  const handleBlurName = useCallback(() => {
    if (selectedSpriteIdx === null || !selectedSprite) return;
    const finalValue = resolveBlurValue(
      values.name,
      "name",
      FIELD_DEFAULTS.name,
    );
    if (selectedSprite.name !== finalValue) {
      updateSpriteInstance(selectedSpriteIdx, { name: finalValue as string });
    }
  }, [selectedSpriteIdx, selectedSprite, values.name, updateSpriteInstance]);

  const handleBlurSize = useCallback(() => {
    if (selectedSpriteIdx === null || !selectedSprite) return;
    const finalValue = resolveBlurValue(
      values.size,
      "size",
      FIELD_DEFAULTS.size,
    );
    if (selectedSprite.size !== finalValue) {
      updateSpriteInstance(selectedSpriteIdx, { size: finalValue as number });
    }
  }, [selectedSpriteIdx, selectedSprite, values.size, updateSpriteInstance]);

  const handleBlurDirection = useCallback(() => {
    if (selectedSpriteIdx === null || !selectedSprite) return;
    const finalValue = resolveBlurValue(
      values.direction,
      "direction",
      FIELD_DEFAULTS.direction,
    );
    if (selectedSprite.direction !== finalValue) {
      updateSpriteInstance(selectedSpriteIdx, {
        direction: finalValue as number,
      });
    }
  }, [
    selectedSpriteIdx,
    selectedSprite,
    values.direction,
    updateSpriteInstance,
  ]);

  const handleToggle = useCallback(
    (field: "snapToGrid" | "visible", value: boolean) => {
      if (selectedSpriteIdx === null) return;
      updateSpriteInstance(selectedSpriteIdx, { [field]: value });
    },
    [selectedSpriteIdx, updateSpriteInstance],
  );

  const setVisible = useCallback(
    (visible: boolean) => {
      if (selectedSpriteIdx === null) return;
      updateSpriteInstance(selectedSpriteIdx, { visible });
    },
    [selectedSpriteIdx, updateSpriteInstance],
  );

  const disabled = !selectedSprite;

  return (
    <div className="w-full pb-3 mb-3 border-b border-slate-300 dark:border-slate-600">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
        <div className="flex items-center gap-2">
          <label htmlFor="sprite-name" className={labelClasses}>
            Sprite
          </label>
          <input
            id="sprite-name"
            type="text"
            value={values.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            onBlur={handleBlurName}
            disabled={disabled}
            className={textInputClasses}
            placeholder="—"
          />
        </div>

        <NumericField
          label="x"
          icon="↔"
          value={values.x}
          disabled={disabled}
          onChange={(v) => handleInputChange("x", v)}
          onBlur={handleBlurX}
        />
        <NumericField
          label="y"
          icon="↕"
          value={values.y}
          disabled={disabled}
          onChange={(v) => handleInputChange("y", v)}
          onBlur={handleBlurY}
        />

        <label className="flex cursor-pointer items-center gap-1.5">
          <input
            type="checkbox"
            checked={values.snapToGrid}
            onChange={() => handleToggle("snapToGrid", !values.snapToGrid)}
            disabled={disabled}
            className="h-3.5 w-3.5 accent-primary-green cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <span className={labelClasses}>Snap</span>
        </label>

        <fieldset className="flex items-center gap-0 border-0 p-0 m-0">
          <legend className={`${labelClasses} mr-2 sr-only`}>
            Show sprite
          </legend>
          <span className={`${labelClasses} mr-2`} aria-hidden>
            Show
          </span>
          <button
            type="button"
            onClick={() => setVisible(true)}
            disabled={disabled}
            className={`${visibilityButtonBaseClasses} rounded-l-md ${
              selectedSprite?.visible !== false
                ? visibilityButtonActiveClasses
                : visibilityButtonInactiveClasses
              }`}
            title="Show sprite"
          >
            <EyeOpenIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setVisible(false)}
            disabled={disabled}
            className={`${visibilityButtonBaseClasses} rounded-r-md ${
              selectedSprite?.visible === false
                ? visibilityButtonActiveClasses
                : visibilityButtonInactiveClasses
              }`}
            title="Hide sprite"
          >
            <EyeNoneIcon className="h-4 w-4" />
          </button>
        </fieldset>

        <NumericField
          label="Size"
          value={values.size}
          disabled={disabled}
          min="1"
          max="1000"
          onChange={(v) => handleInputChange("size", v)}
          onBlur={handleBlurSize}
        />
        <NumericField
          label="Direction"
          value={values.direction}
          disabled={disabled}
          min="-180"
          max="180"
          onChange={(v) => handleInputChange("direction", v)}
          onBlur={handleBlurDirection}
        />
      </div>
    </div>
  );
};

export default SpritePosition;
