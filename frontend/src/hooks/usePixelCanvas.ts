import { useCallback, useEffect, useRef, useState } from 'react';

const MAX_HISTORY = 50;

/** Create a zeroed-out RGBA pixel buffer */
export const createPixelArray = (width: number, height: number): Uint8ClampedArray => {
  return new Uint8ClampedArray(width * height * 4);
};

/** Create a zeroed-out single-byte mask buffer */
export const createMaskArray = (width: number, height: number): Uint8Array => {
  return new Uint8Array(width * height);
};

export function usePixelCanvas(
  gridWidth: number, gridHeight: number, cellSize: number, sizeMod: number,
  options?: { enableKeyboardShortcuts?: boolean; canvasSize?: { w: number; h: number } },
) {
  const enableKB = options?.enableKeyboardShortcuts ?? true;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const previewRef = useRef<HTMLCanvasElement | null>(null);

  // Pixel data layers (refs for perf – no React re-renders during drawing)
  const outputPixelsRef = useRef<Uint8ClampedArray>(createPixelArray(gridWidth, gridHeight));
  const previewPixelsRef = useRef<Uint8ClampedArray>(createPixelArray(gridWidth, gridHeight));
  const hoverPixelsRef = useRef<Uint8ClampedArray>(createPixelArray(gridWidth, gridHeight));
  const hoverEraseMaskRef = useRef<Uint8Array>(createMaskArray(gridWidth, gridHeight));

  // Undo / Redo stacks
  const undoStackRef = useRef<Uint8ClampedArray[]>([]);
  const redoStackRef = useRef<Uint8ClampedArray[]>([]);

  const clearHoverPreview = useCallback(() => {
    hoverPixelsRef.current.fill(0);
    hoverEraseMaskRef.current.fill(0);
  }, []);

  // Cached checker-pattern tile
  const checkerTileRef = useRef<HTMLCanvasElement | null>(null);
  const checkerTileCellSizeRef = useRef<number>(0);

  // Trigger re-render of canvases
  const [renderCount, setRenderCount] = useState(0);
  const requestRender = useCallback(() => setRenderCount((n) => n + 1), []);

  // ---- History helpers ----
  const saveToHistory = useCallback(() => {
    undoStackRef.current.push(new Uint8ClampedArray(outputPixelsRef.current));
    if (undoStackRef.current.length > MAX_HISTORY) undoStackRef.current.shift();
    redoStackRef.current = [];
  }, []);

  const undo = useCallback(() => {
    if (undoStackRef.current.length === 0) return;
    redoStackRef.current.push(new Uint8ClampedArray(outputPixelsRef.current));
    outputPixelsRef.current = undoStackRef.current.pop()!;
    setRenderCount((n) => n + 1);
  }, []);

  const redo = useCallback(() => {
    if (redoStackRef.current.length === 0) return;
    undoStackRef.current.push(new Uint8ClampedArray(outputPixelsRef.current));
    outputPixelsRef.current = redoStackRef.current.pop()!;
    setRenderCount((n) => n + 1);
  }, []);

  // ---- Canvas helpers ----
  const clearCanvas = useCallback(() => {
    saveToHistory();
    outputPixelsRef.current = createPixelArray(gridWidth, gridHeight);
    previewPixelsRef.current = createPixelArray(gridWidth, gridHeight);
    hoverPixelsRef.current = createPixelArray(gridWidth, gridHeight);
    hoverEraseMaskRef.current = createMaskArray(gridWidth, gridHeight);
    setRenderCount((n) => n + 1);
  }, [gridWidth, gridHeight, saveToHistory]);

  /** Reset pixel arrays when the grid dimensions change */
  const resetPixelArrays = useCallback((w: number, h: number) => {
    outputPixelsRef.current = createPixelArray(w, h);
    previewPixelsRef.current = createPixelArray(w, h);
    hoverPixelsRef.current = createPixelArray(w, h);
    hoverEraseMaskRef.current = createMaskArray(w, h);
    undoStackRef.current = [];
    redoStackRef.current = [];
  }, []);

  // ---- Checker pattern (cached tile) ----
  const getCheckerPattern = (ctx: CanvasRenderingContext2D, size: number): CanvasPattern => {
    size = size * sizeMod;

    if (!checkerTileRef.current || checkerTileCellSizeRef.current !== size) {
      const tile = document.createElement('canvas');
      tile.width = size * 2;
      tile.height = size * 2;
      const tileCtx = tile.getContext('2d')!;

      tileCtx.fillStyle = '#b8b8b8';
      tileCtx.fillRect(0, 0, size, size);
      tileCtx.fillRect(size, size, size, size);
      tileCtx.fillStyle = '#9e9e9e';
      tileCtx.fillRect(size, 0, size, size);
      tileCtx.fillRect(0, size, size, size);

      checkerTileRef.current = tile;
      checkerTileCellSizeRef.current = size;
    }
    return ctx.createPattern(checkerTileRef.current, 'repeat')!;
  };

  // ---- Render main canvas ----
  const canvasSizeOpt = options?.canvasSize;
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = gridWidth;
    const h = gridHeight;

    // When an explicit canvasSize is provided, use it as the internal
    // resolution so tile boundaries match CSS-level overlays exactly.
    const cw = canvasSizeOpt ? canvasSizeOpt.w : w * Math.max(1, Math.round(cellSize));
    const ch = canvasSizeOpt ? canvasSizeOpt.h : h * Math.max(1, Math.round(cellSize));
    canvas.width = cw;
    canvas.height = ch;
    ctx.imageSmoothingEnabled = false;

    const imageData = ctx.createImageData(cw, ch);
    const data = imageData.data;
    const outLayer = outputPixelsRef.current;
    const previewLayer = previewPixelsRef.current;
    const hoverLayer = hoverPixelsRef.current;
    const hoverEraseMask = hoverEraseMaskRef.current;

    for (let py = 0; py < h; py++) {
      const y0 = Math.round((py / h) * ch);
      const y1 = Math.round(((py + 1) / h) * ch);
      for (let px = 0; px < w; px++) {
        const srcIdx = (py * w + px) * 4;
        const maskIdx = py * w + px;
        if (hoverEraseMask[maskIdx] !== 0) continue;

        const layer =
          hoverLayer[srcIdx + 3] > 0
            ? hoverLayer
            : previewLayer[srcIdx + 3] > 0
              ? previewLayer
              : outLayer;
        if (layer[srcIdx + 3] === 0) continue;

        const x0 = Math.round((px / w) * cw);
        const x1 = Math.round(((px + 1) / w) * cw);
        for (let dy = y0; dy < y1; dy++) {
          for (let dx = x0; dx < x1; dx++) {
            const dstIdx = (dy * cw + dx) * 4;
            data[dstIdx] = layer[srcIdx];
            data[dstIdx + 1] = layer[srcIdx + 1];
            data[dstIdx + 2] = layer[srcIdx + 2];
            data[dstIdx + 3] = layer[srcIdx + 3];
          }
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);
    ctx.globalCompositeOperation = 'destination-over';
    if (canvasSizeOpt) {
      // 4 checker squares per tile (2×2) when sizeMod < 1; else 1 per sizeMod units (TilemapEditor)
      const step = sizeMod < 1 ? sizeMod : Math.max(1, Math.round(sizeMod));
      const gridCols = Math.ceil(w / step);
      const gridRows = Math.ceil(h / step);
      const colors = ['#b8b8b8', '#9e9e9e'];
      for (let gr = 0; gr < gridRows; gr++) {
        const py0 = gr * step;
        const py1 = Math.min(h, py0 + step);
        const cy0 = Math.round((py0 / h) * ch);
        const cy1 = Math.round((py1 / h) * ch);
        for (let gc = 0; gc < gridCols; gc++) {
          const px0 = gc * step;
          const px1 = Math.min(w, px0 + step);
          const cx0 = Math.round((px0 / w) * cw);
          const cx1 = Math.round((px1 / w) * cw);
          ctx.fillStyle = colors[(gc + gr) % 2];
          ctx.fillRect(cx0, cy0, cx1 - cx0, cy1 - cy0);
        }
      }
    } else {
      const checkerSize = Math.max(1, Math.round(cellSize));
      ctx.fillStyle = getCheckerPattern(ctx, checkerSize);
      ctx.fillRect(0, 0, cw, ch);
    }
    ctx.globalCompositeOperation = 'source-over';
  }, [cellSize, gridWidth, gridHeight, canvasSizeOpt?.w, canvasSizeOpt?.h]);

  // ---- Render preview thumbnail ----
  const renderPreview = useCallback(() => {
    const preview = previewRef.current;
    if (!preview) return;
    const ctx = preview.getContext('2d');
    if (!ctx) return;

    const scale = 4;
    const w = gridWidth;
    const h = gridHeight;
    preview.width = w * scale;
    preview.height = h * scale;
    ctx.imageSmoothingEnabled = false;

    const imageData = ctx.createImageData(preview.width, preview.height);
    const data = imageData.data;
    const layer1 = outputPixelsRef.current;

    for (let py = 0; py < h; py++) {
      for (let px = 0; px < w; px++) {
        const srcIdx = (py * w + px) * 4;
        if (layer1[srcIdx + 3] === 0) continue;

        for (let dy = 0; dy < scale; dy++) {
          for (let dx = 0; dx < scale; dx++) {
            const dstIdx = ((py * scale + dy) * preview.width + (px * scale + dx)) * 4;
            data[dstIdx] = layer1[srcIdx];
            data[dstIdx + 1] = layer1[srcIdx + 1];
            data[dstIdx + 2] = layer1[srcIdx + 2];
            data[dstIdx + 3] = layer1[srcIdx + 3];
          }
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = getCheckerPattern(ctx, scale);
    ctx.fillRect(0, 0, preview.width, preview.height);
    ctx.globalCompositeOperation = 'source-over';
  }, [gridWidth, gridHeight]);

  // Re-render both canvases whenever something triggers it
  useEffect(() => {
    renderCanvas();
    renderPreview();
  }, [renderCount, renderCanvas, renderPreview]);

  // Keyboard shortcuts for undo/redo
  useEffect(() => {
    if (!enableKB) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'z' && !event.shiftKey) {
        event.preventDefault();
        undo();
      } else if (
        ((event.metaKey || event.ctrlKey) && event.key === 'y') ||
        ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key === 'z')
      ) {
        event.preventDefault();
        redo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, enableKB]);

  return {
    canvasRef,
    previewRef,
    outputPixelsRef,
    previewPixelsRef,
    hoverPixelsRef,
    hoverEraseMaskRef,
    clearHoverPreview,
    requestRender,
    saveToHistory,
    undo,
    redo,
    clearCanvas,
    resetPixelArrays,
  };
}
