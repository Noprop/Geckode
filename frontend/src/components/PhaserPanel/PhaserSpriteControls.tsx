import { useState, useEffect } from "react";
import { useSpriteStore } from "@/stores/spriteStore";
import { EyeOpenIcon, EyeNoneIcon } from "@radix-ui/react-icons";
import type { SpriteInstance } from "@/blockly/spriteRegistry";

// todo, move to constant/global variable
const CENTER_X = 240;
const CENTER_Y = 180;

const PhaserSpriteControls = () => {
  const selectedSprite = useSpriteStore((state) => state.selectedSprite);
  const selectedSpriteId = useSpriteStore((state) => state.selectedSpriteId);
  const updateSprite = useSpriteStore((state) => state.updateSprite);

  const [values, setValues] = useState({ name: '', x: '', y: '', size: '', direction: '', snapToGrid: false, visible: true });
  useEffect(() => {
    if (selectedSprite) {
      setValues({
        name: selectedSprite.name,
        x: String(selectedSprite.x ?? CENTER_X),
        y: String(selectedSprite.y ?? CENTER_Y),
        size: String(selectedSprite.size ?? 100),
        direction: String(selectedSprite.direction ?? 90),
        snapToGrid: selectedSprite.snapToGrid ?? false,
        visible: selectedSprite.visible ?? true
      });
    } else {
      setValues({ name: '', x: '', y: '', size: '', direction: '', snapToGrid: false, visible: true });
    }
  }, [selectedSpriteId]);

  const handleInputChange = (field: keyof typeof values, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };
  const handleBlur = (field: keyof SpriteInstance, defaultValue: number | string) => {
    if (!selectedSpriteId) return;
    const rawValue = values[field as keyof typeof values];
    
    let finalValue: string | number;
    if (field === 'name') {
      finalValue = String(rawValue).trim() || String(defaultValue);
    } else {
      const parsed = parseFloat(String(rawValue));
      finalValue = isNaN(parsed) ? defaultValue : parsed;
    }

    // Only update if value actually changed
    if (selectedSprite && selectedSprite[field] !== finalValue) {
      updateSprite(selectedSpriteId, { [field]: finalValue });
    }
  };
  // For boolean/toggle fields (snapToGrid, visible) - update store immediately
  const handleToggle = (field: keyof SpriteInstance, value: boolean) => {
    if (!selectedSpriteId) return;
    updateSprite(selectedSpriteId, { [field]: value });
  };

  return (
    <div className="w-full pb-3 mb-3 border-b border-slate-300 dark:border-slate-600">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
        <div className="flex items-center gap-2">
          <label className="font-semibold text-slate-600 dark:text-slate-400">Sprite</label>
          <input
            type="text"
            value={values.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            onBlur={() => handleBlur('name', 'Sprite')}
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
            value={values.x}
            onChange={(e) => handleInputChange('x', e.target.value)}
            onBlur={() => handleBlur('x', CENTER_X)}
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
            value={values.y}
            onChange={(e) => handleInputChange('y', e.target.value)}
            onBlur={() => handleBlur('y', CENTER_Y)}
            disabled={!selectedSprite}
            className="w-14 rounded-full border border-slate-300 bg-white px-2 py-1.5 text-xs text-center outline-none transition focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 disabled:bg-slate-100 disabled:text-slate-400 dark:border-slate-600 dark:bg-dark-hover dark:text-slate-100 dark:disabled:bg-dark-tertiary dark:disabled:text-slate-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>

        {/* Snap to Grid */}
        <label className="flex cursor-pointer items-center gap-1.5">
          <input
            type="checkbox"
            checked={values.snapToGrid}
            onChange={() => handleToggle('snapToGrid', !values.snapToGrid)}
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
            onClick={() => {
              if (!selectedSpriteId) return;
              updateSprite(selectedSpriteId, { visible: true });
            }}
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
            onClick={() => {
              if (!selectedSpriteId) return;
              updateSprite(selectedSpriteId, { visible: false });
            }}
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
            // value={'size' in editingValues ? editingValues.size : selectedSprite?.size ?? 100}
            // onFocus={() => handleFocus('size', selectedSprite?.size ?? 100)}
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
            // value={'direction' in editingValues ? editingValues.direction : selectedSprite?.direction ?? 90}
            // onFocus={() => handleFocus('direction', selectedSprite?.direction ?? 90)}
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
  );
};

export default PhaserSpriteControls;
