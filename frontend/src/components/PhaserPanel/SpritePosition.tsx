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

export function NumericField({
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

const SpritePosition = ({ borderless }: { borderless?: boolean }) => {
  const selectedSpriteId = useGeckodeStore((s) => s.selectedSpriteId);
  const selectedSprite = useGeckodeStore((s) =>
    s.selectedSpriteId !== null
      ? s.spriteInstances.find((i) => i.id === s.selectedSpriteId) ?? null
      : null,
  );
  const updateSpriteInstance = useGeckodeStore((s) => s.updateSpriteInstance);
  const setSelectedSpriteId = useGeckodeStore((s) => s.setSelectedSpriteId);
  const canEditProject = useGeckodeStore((state) => state.canEditProject);

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
      setSelectedSpriteId(id);
    };

    const handleDragging = ({ x, y, }: { x: number; y: number; }) => {
      setValues((prev) => ({
        ...prev,
        x: String(Math.round(x)),
        y: String(Math.round(y)),
      }));
    };

    const handleDragEnd = ({ id, x, y }: { id: string; x: number; y: number; }) => {
      const { selectedSpriteId, updateSpriteInstance } = useGeckodeStore.getState();
      if (selectedSpriteId !== id) return;
      setValues((prev) => ({
        ...prev,
        x: String(Math.round(x)),
        y: String(Math.round(y)),
      }));
      updateSpriteInstance(id, { x: Math.round(x), y: Math.round(y) });
    };

    EventBus.on("editor-sprite-drag-start", handleDragStart);
    EventBus.on("editor-sprite-dragging", handleDragging);
    EventBus.on("editor-sprite-drag-end", handleDragEnd);
    return () => {
      EventBus.off("editor-sprite-drag-start", handleDragStart);
      EventBus.off("editor-sprite-dragging", handleDragging);
      EventBus.off("editor-sprite-drag-end", handleDragEnd);
    };
  }, []);

  const handleInputChange = useCallback(
    (field: keyof SpriteFormValues, value: string) => {
      setValues((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const handleBlurY = () => {
    if (selectedSpriteId === null || !selectedSprite) return;
    const rawValue = values.y;
    const finalValue = resolveBlurValue(rawValue, "y", centerY);
    if (selectedSprite.y !== finalValue) {
      updateSpriteInstance(selectedSpriteId, { y: finalValue as number });
    }
  };

  const handleBlurName = useCallback(() => {
    if (selectedSpriteId === null || !selectedSprite) return;
    const finalValue = resolveBlurValue(
      values.name,
      "name",
      FIELD_DEFAULTS.name,
    );
    if (selectedSprite.name !== finalValue) {
      updateSpriteInstance(selectedSpriteId, { name: finalValue as string });
    }
  }, [selectedSpriteId, selectedSprite, values.name, updateSpriteInstance]);

  const handleBlurScaleX = useCallback(() => {
    if (selectedSpriteId === null || !selectedSprite) return;
    const finalValue = resolveBlurValue(
      values.scaleX,
      "scaleX",
      FIELD_DEFAULTS.scaleX,
    );
    if (selectedSprite.scaleX !== finalValue) {
      updateSpriteInstance(selectedSpriteId, { scaleX: finalValue as number });
    }
  }, [selectedSpriteId, selectedSprite, values.scaleX, updateSpriteInstance]);

  const handleBlurScaleY = useCallback(() => {
    if (selectedSpriteId === null || !selectedSprite) return;
    const finalValue = resolveBlurValue(
      values.scaleY,
      "scaleY",
      FIELD_DEFAULTS.scaleY,
    );
    if (selectedSprite.scaleY !== finalValue) {
      updateSpriteInstance(selectedSpriteId, { scaleY: finalValue as number });
    }
  }, [selectedSpriteId, selectedSprite, values.scaleY, updateSpriteInstance]);

  const handleToggle = useCallback(
    (field: "snapToGrid" | "visible", value: boolean) => {
      if (selectedSpriteId === null) return;
      updateSpriteInstance(selectedSpriteId, { [field]: value });
    },
    [selectedSpriteId, updateSpriteInstance],
  );

  const setVisible = useCallback(
    (visible: boolean) => {
      if (selectedSpriteId === null) return;
      updateSpriteInstance(selectedSpriteId, { visible });
    },
    [selectedSpriteId, updateSpriteInstance],
  );

  const disabled = !selectedSprite || !canEditProject;

  return (
    <div className="w-full flex flex-col gap-2 text-xs">
      <div className="flex items-center gap-5">
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
          onBlur={() => {
            const rawValue = values.x;
            const finalValue = resolveBlurValue(rawValue, "x", centerX);
            if (selectedSprite!.x !== finalValue)
              updateSpriteInstance(selectedSpriteId!, { x: finalValue as number });
          }}
        />
        <NumericField
          label="y"
          icon="↕"
          value={values.y}
          disabled={disabled}
          onChange={(v) => handleInputChange("y", v)}
          onBlur={handleBlurY}
        />
      </div>

      {/* Row 2: Show, Scale X, Scale Y */}
      <div className="flex items-center gap-5">
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
          label="Scale X"
          value={values.scaleX}
          disabled={disabled}
          min="-200"
          max="200"
          onChange={(v) => handleInputChange("scaleX", v)}
          onBlur={handleBlurScaleX}
        />
        <NumericField
          label="Scale Y"
          value={values.scaleY}
          disabled={disabled}
          min="-200"
          max="200"
          onChange={(v) => handleInputChange("scaleY", v)}
          onBlur={handleBlurScaleY}
        />
      </div>
    </div>
  );
};

export default SpritePosition;
