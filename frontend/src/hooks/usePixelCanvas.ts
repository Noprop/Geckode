import { useCallback, useEffect, useRef, useState } from 'react';

const MAX_HISTORY = 50;

/** Create a zeroed-out RGBA pixel buffer */
export const createPixelArray = (width: number, height: number): Uint8ClampedArray => {
  return new Uint8ClampedArray(width * height * 4);
};

export function usePixelCanvas(gridWidth: number, gridHeight: number, cellSize: number) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const previewRef = useRef<HTMLCanvasElement | null>(null);

  // Pixel data layers (refs for perf – no React re-renders during drawing)
  const outputPixelsRef = useRef<Uint8ClampedArray>(createPixelArray(gridWidth, gridHeight));
  const previewPixelsRef = useRef<Uint8ClampedArray>(createPixelArray(gridWidth, gridHeight));

  // Undo / Redo stacks
  const undoStackRef = useRef<Uint8ClampedArray[]>([]);
  const redoStackRef = useRef<Uint8ClampedArray[]>([]);

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
    setRenderCount((n) => n + 1);
  }, [gridWidth, gridHeight, saveToHistory]);

  /** Reset pixel arrays when the grid dimensions change */
  const resetPixelArrays = useCallback((w: number, h: number) => {
    outputPixelsRef.current = createPixelArray(w, h);
    previewPixelsRef.current = createPixelArray(w, h);
    undoStackRef.current = [];
    redoStackRef.current = [];
  }, []);

  // ---- Checker pattern (cached tile) ----
  const getCheckerPattern = (ctx: CanvasRenderingContext2D, size: number): CanvasPattern => {
    if (!checkerTileRef.current || checkerTileCellSizeRef.current !== size) {
      const tile = document.createElement('canvas');
      tile.width = size * 2;
      tile.height = size * 2;
      const tileCtx = tile.getContext('2d')!;

      tileCtx.fillStyle = '#9e9e9e';
      tileCtx.fillRect(0, 0, size, size);
      tileCtx.fillRect(size, size, size, size);
      tileCtx.fillStyle = '#6e6e6e';
      tileCtx.fillRect(size, 0, size, size);
      tileCtx.fillRect(0, size, size, size);

      checkerTileRef.current = tile;
      checkerTileCellSizeRef.current = size;
    }
    return ctx.createPattern(checkerTileRef.current, 'repeat')!;
  };

  // ---- Render main canvas ----
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = Math.max(1, Math.round(cellSize));
    const w = gridWidth;
    const h = gridHeight;
    canvas.width = w * size;
    canvas.height = h * size;
    ctx.imageSmoothingEnabled = false;

    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;
    const outLayer = outputPixelsRef.current;
    const previewLayer = previewPixelsRef.current;

    for (let py = 0; py < h; py++) {
      for (let px = 0; px < w; px++) {
        const srcIdx = (py * w + px) * 4;
        const layer = previewLayer[srcIdx + 3] > 0 ? previewLayer : outLayer;
        if (layer[srcIdx + 3] === 0) continue;

        for (let dy = 0; dy < size; dy++) {
          for (let dx = 0; dx < size; dx++) {
            const dstIdx = ((py * size + dy) * canvas.width + (px * size + dx)) * 4;
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
    ctx.fillStyle = getCheckerPattern(ctx, size);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'source-over';
  }, [cellSize, gridWidth, gridHeight]);

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
  }, [undo, redo]);

  return {
    canvasRef,
    previewRef,
    outputPixelsRef,
    previewPixelsRef,
    requestRender,
    saveToHistory,
    undo,
    redo,
    clearCanvas,
    resetPixelArrays,
  };
}
