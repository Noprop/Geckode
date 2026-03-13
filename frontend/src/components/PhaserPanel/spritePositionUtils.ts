import type { SpriteInstance } from "@/blockly/spriteRegistry";

/** Local form state for the sprite position panel */
export interface SpriteFormValues {
  name: string;
  spriteTypeId: string;
  x: string;
  y: string;
  scaleX: string;
  scaleY: string;
  direction: string;
  snapToGrid: boolean;
  enabled: boolean;
}

/** Default values for each field when blur produces an invalid value */
export const FIELD_DEFAULTS = {
  x: (centerX: number) => centerX,
  y: (centerY: number) => centerY,
  scaleX: 1,
  scaleY: 1,
  direction: 90,
  name: "Sprite",
} as const;

const EMPTY_FORM_VALUES: SpriteFormValues = {
  name: "",
  spriteTypeId: "",
  x: "",
  y: "",
  scaleX: "",
  scaleY: "",
  direction: "",
  snapToGrid: false,
  enabled: true,
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
    spriteTypeId: sprite.spriteTypeId ?? "",
    x: String(sprite.x ?? centerX),
    y: String(sprite.y ?? centerY),
    scaleX: String(sprite.scaleX ?? 1),
    scaleY: String(sprite.scaleY ?? 1),
    direction: String(sprite.direction ?? 90),
    snapToGrid: sprite.snapToGrid ?? false,
    enabled: sprite.enabled ?? true,
  };
}

// ── Shared Tailwind class constants ──

const baseInputClasses =
  "rounded-full border border-slate-300 bg-white py-1.5 text-xs outline-none transition focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 disabled:bg-slate-100 disabled:text-slate-400 dark:border-slate-600 dark:bg-dark-hover dark:text-slate-100 dark:disabled:bg-dark-tertiary dark:disabled:text-slate-500";

export const numericInputClasses = `${baseInputClasses} w-14 px-2 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`;

export const textInputClasses = `${baseInputClasses} w-28 px-3`;

export const labelClasses = "font-semibold text-slate-600 dark:text-slate-400";

/** Default text for the type selector trigger when a real type is selected */
export const typeTriggerTextDefaultClasses = "font-semibold text-slate-700 dark:text-slate-100";
/** Dimmer variant for the type selector trigger when (none) is selected */
export const typeTriggerTextClasses = "font-semibold text-slate-400 dark:text-slate-300";

/** White text for dropdown options (excluding (none)) */
export const dropdownOptionTextClasses = "font-semibold text-slate-900 dark:text-white";

export const iconClasses = "text-slate-500 dark:text-slate-400";

export const visibilityButtonBaseClasses =
  "rounded-md p-1.5 border cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
export const visibilityButtonActiveClasses =
  "border-primary-green bg-primary-green text-white";
export const visibilityButtonInactiveClasses =
  "border-slate-300 bg-white text-slate-400 dark:border-slate-600 dark:bg-dark-hover dark:text-slate-500";
