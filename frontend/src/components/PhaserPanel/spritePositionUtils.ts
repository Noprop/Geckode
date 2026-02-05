import type { SpriteInstance } from "@/blockly/spriteRegistry";

/** Local form state for the sprite position panel */
export interface SpriteFormValues {
  name: string;
  x: string;
  y: string;
  size: string;
  direction: string;
  snapToGrid: boolean;
  visible: boolean;
}

/** Default values for each field when blur produces an invalid value */
export const FIELD_DEFAULTS = {
  x: (centerX: number) => centerX,
  y: (centerY: number) => centerY,
  size: 100,
  direction: 90,
  name: "Sprite",
} as const;

const EMPTY_FORM_VALUES: SpriteFormValues = {
  name: "",
  x: "",
  y: "",
  size: "",
  direction: "",
  snapToGrid: false,
  visible: true,
};

/** Resolve the value to commit on blur */
export function resolveBlurValue(
  rawValue: string,
  field: string,
  defaultValue: number | string,
): string | number {
  if (field === "name") {
    return rawValue.trim() || String(defaultValue);
  }
  const parsed = parseFloat(rawValue);
  return Number.isNaN(parsed) ? defaultValue : parsed;
}

/** Build the local form state from a sprite (or empty defaults) */
export function buildFormValues(
  sprite: SpriteInstance | null,
  centerX: number,
  centerY: number,
): SpriteFormValues {
  if (!sprite) return EMPTY_FORM_VALUES;
  return {
    name: sprite.name,
    x: String(sprite.x ?? centerX),
    y: String(sprite.y ?? centerY),
    size: String(sprite.size ?? 100),
    direction: String(sprite.direction ?? 90),
    snapToGrid: sprite.snapToGrid ?? false,
    visible: sprite.visible ?? true,
  };
}

// ── Shared Tailwind class constants ──

const baseInputClasses =
  "rounded-full border border-slate-300 bg-white py-1.5 text-xs outline-none transition focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 disabled:bg-slate-100 disabled:text-slate-400 dark:border-slate-600 dark:bg-dark-hover dark:text-slate-100 dark:disabled:bg-dark-tertiary dark:disabled:text-slate-500";

export const numericInputClasses = `${baseInputClasses} w-14 px-2 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`;

export const textInputClasses = `${baseInputClasses} w-28 px-3`;

export const labelClasses = "font-semibold text-slate-600 dark:text-slate-400";

export const iconClasses = "text-slate-500 dark:text-slate-400";

export const visibilityButtonBaseClasses =
  "rounded-md p-1.5 border transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
export const visibilityButtonActiveClasses =
  "border-primary-green bg-primary-green text-white";
export const visibilityButtonInactiveClasses =
  "border-slate-300 bg-white text-slate-400 dark:border-slate-600 dark:bg-dark-hover dark:text-slate-500";
