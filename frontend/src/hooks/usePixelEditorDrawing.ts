'use client';

import { useEffect, useRef } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { Display } from 'phaser';
import { createPixelArray } from './usePixelCanvas';
import type { Tool } from '@/components/SpriteModal/EditorTools';

// Convert RGBA values at index to hex (returns '' for transparent)
const rgbaToHex = (data: Uint8ClampedArray, idx: number): string => {
  if (data[idx + 3] === 0) return '';
  const r = data[idx].toString(16).padStart(2, '0');
  const g = data[idx + 1].toString(16).padStart(2, '0');
  const b = data[idx + 2].toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
};

const setPixel = (
  data: Uint8ClampedArray,
  idx: number,
  color: { r: number; g: number; b: number; a: number } | null,
) => {
  if (color) {
    data[idx] = color.r;
    data[idx + 1] = color.g;
    data[idx + 2] = color.b;
    data[idx + 3] = color.a;
  } else {
    data[idx] = 0;
    data[idx + 1] = 0;
    data[idx + 2] = 0;
    data[idx + 3] = 0;
  }
};

export interface UsePixelEditorDrawingParams {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  outputPixelsRef: React.RefObject<Uint8ClampedArray>;
  previewPixelsRef: React.RefObject<Uint8ClampedArray>;
  requestRender: () => void;
  saveToHistory: () => void;
  gridWidth: number;
  gridHeight: number;
  brushSize: number;
  primaryColor: string;
  secondaryColor: string;
  activeTool: Tool;
  setPrimaryColor: (color: string) => void;
  onMarkDirty?: () => void;
}

export function usePixelEditorDrawing({
  canvasRef,
  outputPixelsRef,
  previewPixelsRef,
  requestRender,
  saveToHistory,
  gridWidth,
  gridHeight,
  brushSize,
  primaryColor,
  secondaryColor,
  activeTool,
  setPrimaryColor,
  onMarkDirty,
}: UsePixelEditorDrawingParams) {
  const drawStateRef = useRef({
    isDrawing: false,
    shapeStart: null as { x: number; y: number } | null,
    prevPos: null as { x: number; y: number } | null,
    activeButton: 0,
    activeTool: 'pen' as Tool,
    primaryColor: '#10b981',
    secondaryColor: '#3b82f6',
    brushSize: 1,
    gridWidth: 16,
    gridHeight: 16,
  });

  useEffect(() => {
    const ds = drawStateRef.current;
    ds.activeTool = activeTool;
    ds.primaryColor = primaryColor;
    ds.secondaryColor = secondaryColor;
    ds.brushSize = brushSize;
    ds.gridWidth = gridWidth;
    ds.gridHeight = gridHeight;
  }, [activeTool, primaryColor, secondaryColor, brushSize, gridWidth, gridHeight]);

  const paintAt = (x: number, y: number, color: string) => {
    const { gridWidth: w, gridHeight: h, brushSize: size } = drawStateRef.current;
    const pixelColor =
      color === ''
        ? null
        : (() => {
            const rgba = Display.Color.HexStringToColor(color);
            return { r: rgba.red, g: rgba.green, b: rgba.blue, a: rgba.alpha };
          })();
    const offset = Math.floor(size / 2);
    const layer1 = outputPixelsRef.current;

    for (let dy = 0; dy < size; dy += 1) {
      for (let dx = 0; dx < size; dx += 1) {
        const px = Math.max(0, Math.min(w - 1, x + dx - offset));
        const py = Math.max(0, Math.min(h - 1, y + dy - offset));
        const idx = (py * w + px) * 4;
        setPixel(layer1, idx, pixelColor);
      }
    }
    requestRender();
    onMarkDirty?.();
  };

  const floodFill = (startX: number, startY: number, fillColor: string) => {
    const { gridWidth: w, gridHeight: h } = drawStateRef.current;
    const layer1 = outputPixelsRef.current;
    const fillPixelColor =
      fillColor === ''
        ? null
        : (() => {
            const fillRgba = Display.Color.HexStringToColor(fillColor);
            return { r: fillRgba.red, g: fillRgba.green, b: fillRgba.blue, a: fillRgba.alpha };
          })();

    const startIdx = (startY * w + startX) * 4;
    const targetR = layer1[startIdx];
    const targetG = layer1[startIdx + 1];
    const targetB = layer1[startIdx + 2];
    const targetA = layer1[startIdx + 3];

    if (fillPixelColor) {
      if (
        targetR === fillPixelColor.r &&
        targetG === fillPixelColor.g &&
        targetB === fillPixelColor.b &&
        targetA === fillPixelColor.a
      )
        return;
    } else {
      if (targetA === 0) return;
    }

    const queue: [number, number][] = [[startX, startY]];
    const visited = new Set<number>();

    while (queue.length > 0) {
      const [x, y] = queue.shift()!;
      const pixelIndex = y * w + x;
      if (visited.has(pixelIndex)) continue;
      if (x < 0 || x >= w || y < 0 || y >= h) continue;

      const idx = pixelIndex * 4;
      if (
        layer1[idx] !== targetR ||
        layer1[idx + 1] !== targetG ||
        layer1[idx + 2] !== targetB ||
        layer1[idx + 3] !== targetA
      )
        continue;

      visited.add(pixelIndex);
      setPixel(layer1, idx, fillPixelColor);

      queue.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }
    requestRender();
    onMarkDirty?.();
  };

  const getLinePixels = (x0: number, y0: number, x1: number, y1: number) => {
    const pixels: { x: number; y: number }[] = [];
    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1;
    const sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;

    while (true) {
      pixels.push({ x: x0, y: y0 });
      if (x0 === x1 && y0 === y1) break;
      const e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        x0 += sx;
      }
      if (e2 < dx) {
        err += dx;
        y0 += sy;
      }
    }
    return pixels;
  };

  const applyBrush = (pixels: { x: number; y: number }[], color: string, layer: Uint8ClampedArray) => {
    const { brushSize: size, gridWidth: w, gridHeight: h } = drawStateRef.current;
    const offset = Math.floor(size / 2);
    const pixelColor =
      color === ''
        ? null
        : (() => {
            const rgba = Display.Color.HexStringToColor(color);
            return { r: rgba.red, g: rgba.green, b: rgba.blue, a: rgba.alpha };
          })();

    for (const p of pixels) {
      for (let dy = 0; dy < size; dy++) {
        for (let dx = 0; dx < size; dx++) {
          const px = Math.max(0, Math.min(w - 1, p.x + dx - offset));
          const py = Math.max(0, Math.min(h - 1, p.y + dy - offset));
          const idx = (py * w + px) * 4;
          setPixel(layer, idx, pixelColor);
        }
      }
    }
  };

  const getRectanglePixels = (x1: number, y1: number, x2: number, y2: number) => {
    const minX = Math.min(x1, x2),
      maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2),
      maxY = Math.max(y1, y2);
    const pixels: { x: number; y: number }[] = [];
    for (let x = minX; x <= maxX; x++) {
      pixels.push({ x, y: minY }, { x, y: maxY });
    }
    for (let y = minY + 1; y < maxY; y++) {
      pixels.push({ x: minX, y }, { x: maxX, y });
    }
    return pixels;
  };

  const getOvalPixels = (x1: number, y1: number, x2: number, y2: number) => {
    const { gridWidth: w, gridHeight: h } = drawStateRef.current;
    const cx = (x1 + x2) / 2,
      cy = (y1 + y2) / 2;
    const rx = Math.abs(x2 - x1) / 2,
      ry = Math.abs(y2 - y1) / 2;
    if (rx === 0 || ry === 0) return [];
    const pixels: { x: number; y: number }[] = [];
    const steps = Math.max(Math.ceil(2 * Math.PI * Math.max(rx, ry)), 32);
    for (let i = 0; i < steps; i++) {
      const angle = (2 * Math.PI * i) / steps;
      const x = Math.round(cx + rx * Math.cos(angle));
      const y = Math.round(cy + ry * Math.sin(angle));
      if (x >= 0 && x < w && y >= 0 && y < h) pixels.push({ x, y });
    }
    return pixels;
  };

  const getPointerPosition = (event: { clientX: number; clientY: number }) => {
    const { gridWidth: w, gridHeight: h } = drawStateRef.current;
    const rect = canvasRef.current!.getBoundingClientRect();
    return {
      x: Math.floor((event.clientX - rect.left) / (rect.width / w)),
      y: Math.floor((event.clientY - rect.top) / (rect.height / h)),
    };
  };

  const clipToCanvas = (start: { x: number; y: number }, end: { x: number; y: number }) => {
    const { gridWidth: w, gridHeight: h } = drawStateRef.current;
    const dx = end.x - start.x,
      dy = end.y - start.y;
    const t = Math.min(
      1,
      end.x < 0 ? -start.x / dx : end.x >= w ? (w - 1 - start.x) / dx : 1,
      end.y < 0 ? -start.y / dy : end.y >= h ? (h - 1 - start.y) / dy : 1,
    );
    return {
      x: Math.max(0, Math.min(w - 1, Math.round(start.x + dx * t))),
      y: Math.max(0, Math.min(h - 1, Math.round(start.y + dy * t))),
    };
  };

  const canvasPointerDown = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const ds = drawStateRef.current;
    const position = getPointerPosition(e);
    ds.prevPos = position;
    ds.activeButton = e.button;
    const color = e.button === 2 ? secondaryColor : primaryColor;

    saveToHistory();

    if (['pen', 'eraser'].includes(activeTool)) {
      paintAt(position.x, position.y, activeTool === 'pen' ? color : '');
      ds.isDrawing = true;
    } else if (['rectangle', 'line', 'oval'].includes(activeTool)) {
      ds.shapeStart = position;
      ds.isDrawing = true;
    }
    if (activeTool === 'bucket') {
      floodFill(position.x, position.y, color);
    } else if (activeTool === 'color-picker') {
      const idx = (position.y * gridWidth + position.x) * 4;
      const pickedColor = rgbaToHex(outputPixelsRef.current, idx);
      setPrimaryColor(pickedColor);
    }
  };

  const handlePointerMove = (e: PointerEvent | ReactPointerEvent<HTMLCanvasElement>) => {
    const ds = drawStateRef.current;
    if (!ds.isDrawing) return;
    const isShapeTool = ['line', 'rectangle', 'oval'].includes(ds.activeTool);

    const position = getPointerPosition(e);
    const prev = ds.prevPos;
    if (prev && prev.x === position.x && prev.y === position.y) return;
    const color = ds.activeButton === 2 ? ds.secondaryColor : ds.primaryColor;
    ds.prevPos = position;

    if (isShapeTool && ds.shapeStart) {
      const cp = clipToCanvas(ds.shapeStart, position);
      let pixels: { x: number; y: number }[] = [];
      if (ds.activeTool === 'line') pixels = getLinePixels(ds.shapeStart.x, ds.shapeStart.y, cp.x, cp.y);
      else if (ds.activeTool === 'rectangle') pixels = getRectanglePixels(ds.shapeStart.x, ds.shapeStart.y, cp.x, cp.y);
      else if (ds.activeTool === 'oval') pixels = getOvalPixels(ds.shapeStart.x, ds.shapeStart.y, cp.x, cp.y);

      previewPixelsRef.current = createPixelArray(ds.gridWidth, ds.gridHeight);
      applyBrush(pixels, color, previewPixelsRef.current);
      requestRender();
      return;
    }

    if (ds.activeTool === 'pen' || ds.activeTool === 'eraser') {
      if (prev && (Math.abs(position.x - prev.x) > 1 || Math.abs(position.y - prev.y) > 1)) {
        getLinePixels(prev.x, prev.y, position.x, position.y).forEach((p) =>
          paintAt(p.x, p.y, ds.activeTool === 'pen' ? color : ''),
        );
      } else {
        paintAt(position.x, position.y, ds.activeTool === 'pen' ? color : '');
      }
    }
  };

  const handlePointerUp = (event: PointerEvent) => {
    const ds = drawStateRef.current;
    ds.prevPos = null;

    if (!ds.isDrawing) return;

    if (ds.shapeStart && ['line', 'rectangle', 'oval'].includes(ds.activeTool)) {
      const pos = getPointerPosition(event);
      const cp = clipToCanvas(ds.shapeStart, pos);
      const color = ds.activeButton === 2 ? ds.secondaryColor : ds.primaryColor;

      let pixels: { x: number; y: number }[] = [];
      if (ds.activeTool === 'line') pixels = getLinePixels(ds.shapeStart.x, ds.shapeStart.y, cp.x, cp.y);
      else if (ds.activeTool === 'rectangle') pixels = getRectanglePixels(ds.shapeStart.x, ds.shapeStart.y, cp.x, cp.y);
      else if (ds.activeTool === 'oval') pixels = getOvalPixels(ds.shapeStart.x, ds.shapeStart.y, cp.x, cp.y);

      applyBrush(pixels, color, outputPixelsRef.current);
      previewPixelsRef.current = createPixelArray(ds.gridWidth, ds.gridHeight);
      onMarkDirty?.();
    }

    ds.isDrawing = false;
    ds.shapeStart = null;
    requestRender();
  };

  useEffect(() => {
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  return { canvasPointerDown };
}
