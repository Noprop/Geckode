'use client';

import EditorTools, { type Tool } from './SpriteModal/EditorTools';

const PALETTE = [
  '#ffffff',
  '#ef4444',
  '#10b981',
  '#3b82f6',
  '#f97316',
  '#000000',
  '#8b5cf6',
  '#fbbf24',
];

interface PixelEditorToolbarProps {
  brushSize: number;
  setBrushSize: (size: number) => void;
  activeTool: Tool;
  setActiveTool: (tool: Tool) => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  secondaryColor: string;
  swapColors: () => void;
  gridWidth: number;
  gridHeight: number;
  onGridResize: (dimension: 'width' | 'height', value: string) => void;
}

export function PixelEditorToolbar({
  brushSize,
  setBrushSize,
  activeTool,
  setActiveTool,
  primaryColor,
  setPrimaryColor,
  secondaryColor,
  swapColors,
  gridWidth,
  gridHeight,
  onGridResize,
}: PixelEditorToolbarProps) {
  return (
    <div className="w-30 flex flex-col gap-3 p-2 bg-slate-700 dark:bg-slate-800 border-r border-slate-600">
      {/* brush size */}
      <div className="grid grid-cols-3 rounded overflow-hidden">
        {[1, 2, 3].map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => setBrushSize(size)}
            className={`h-9 flex items-center justify-center cursor-pointer transition ${
              brushSize === size ? 'bg-primary-green' : 'bg-slate-600 hover:bg-slate-500'
            }`}
            title={`${size}x${size} brush`}
          >
            <div className="bg-white" style={{ width: size * 3 + 2, height: size * 3 + 2 }} />
          </button>
        ))}
      </div>

      <EditorTools activeTool={activeTool} setActiveTool={setActiveTool} />

      {/* dual color indicator */}
      <div className="relative w-full h-12 mx-auto mt-2.5 mb-1">
        <button
          type="button"
          onClick={swapColors}
          className="absolute right-1.5 bottom-0 w-18 h-8 rounded-xs cursor-pointer transition-shadow"
          style={{
            backgroundColor: secondaryColor || '#9e9e9e',
            backgroundImage: !secondaryColor
              ? 'linear-gradient(45deg, #6e6e6e 25%, transparent 25%), linear-gradient(-45deg, #6e6e6e 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #6e6e6e 75%), linear-gradient(-45deg, transparent 75%, #6e6e6e 75%)'
              : undefined,
            backgroundSize: '8px 8px',
            backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
          }}
          title="Secondary color (right-click) - Click to swap"
        />
        <button
          type="button"
          onClick={swapColors}
          className="absolute left-1.5 top-0 w-18 h-8 rounded-xs cursor-pointer transition-shadow"
          style={{
            backgroundColor: primaryColor || '#9e9e9e',
            backgroundImage: !primaryColor
              ? 'linear-gradient(45deg, #6e6e6e 25%, transparent 25%), linear-gradient(-45deg, #6e6e6e 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #6e6e6e 75%), linear-gradient(-45deg, transparent 75%, #6e6e6e 75%)'
              : undefined,
            backgroundSize: '8px 8px',
            backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
          }}
          title="Primary color (left-click) - Click to swap"
        />
      </div>

      {/* color palette */}
      <div className="flex flex-col gap-2 pt-2">
        <div className="grid grid-cols-3 w-full gap-1.5">
          <button
            type="button"
            onClick={() => setPrimaryColor('')}
            className="rounded-xs cursor-pointer transition aspect-square hover:ring-2 hover:ring-white/40"
            style={{
              backgroundImage:
                'linear-gradient(45deg, #6e6e6e 25%, transparent 25%), linear-gradient(-45deg, #6e6e6e 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #6e6e6e 75%), linear-gradient(-45deg, transparent 75%, #6e6e6e 75%)',
              backgroundSize: '8px 8px',
              backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
              backgroundColor: '#9e9e9e',
            }}
            title="Transparent"
          />
          {PALETTE.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setPrimaryColor(color)}
              className="rounded-xs cursor-pointer transition aspect-square hover:ring-2 hover:ring-white/40"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>

        <label
          className="w-full h-8 flex items-center justify-center gap-2 rounded cursor-pointer bg-slate-600 hover:bg-slate-500 transition"
          title="Pick custom color"
        >
          <div className="w-4 h-4 rounded border border-white/30" style={{ backgroundColor: primaryColor }} />
          <span className="text-xs text-slate-300">Custom</span>
          <input
            type="color"
            value={primaryColor || '#000000'}
            onChange={(e) => setPrimaryColor(e.target.value)}
            className="hidden"
          />
        </label>
      </div>

      <div className="flex-1" />

      {/* grid size (uncontrolled inputs reset via key) */}
      <div className="flex items-center gap-1">
        <input
          key={`w-${gridWidth}`}
          type="number"
          defaultValue={gridWidth}
          onBlur={(e) => onGridResize('width', e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
          min={1}
          max={1024}
          className="w-12 h-8 px-1 text-xs text-slate-300 text-center bg-slate-600 border border-slate-500 rounded outline-none focus:border-primary-green [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          title="Grid width"
          name="gridWidth"
        />
        <span className="text-slate-400 text-xs">x</span>
        <input
          key={`h-${gridHeight}`}
          type="number"
          defaultValue={gridHeight}
          onBlur={(e) => onGridResize('height', e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
          min={1}
          max={1024}
          className="w-12 h-8 px-1 text-xs text-slate-300 text-center bg-slate-600 border border-slate-500 rounded outline-none focus:border-primary-green [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          title="Grid height"
          name="gridHeight"
        />
      </div>
    </div>
  );
}
