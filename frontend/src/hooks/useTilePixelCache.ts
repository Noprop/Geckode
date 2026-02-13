import { useEffect, useRef, useState } from 'react';

type TilePixelCache = Record<string, Uint8ClampedArray>;

/**
 * Rasterises tile base64 data-URLs into raw RGBA pixel buffers (16×16 = 1024 bytes each).
 * Returns a ref to the cache and a ready flag.
 */
export function useTilePixelCache(tileTextures: Record<string, string>) {
  const tilePixelsRef = useRef<TilePixelCache>({});
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const entries = Object.entries(tileTextures);
    if (entries.length === 0) {
      tilePixelsRef.current = {};
      setIsReady(true);
      return;
    }

    setIsReady(false);
    const cache: TilePixelCache = {};
    let remaining = entries.length;

    for (const [key, base64] of entries) {
      const img = new Image();
      img.onload = () => {
        const offscreen = document.createElement('canvas');
        offscreen.width = 16;
        offscreen.height = 16;
        const ctx = offscreen.getContext('2d')!;
        ctx.drawImage(img, 0, 0, 16, 16);
        cache[key] = ctx.getImageData(0, 0, 16, 16).data;
        remaining--;
        if (remaining === 0) {
          tilePixelsRef.current = cache;
          setIsReady(true);
        }
      };
      img.onerror = () => {
        remaining--;
        if (remaining === 0) {
          tilePixelsRef.current = cache;
          setIsReady(true);
        }
      };
      img.src = base64;
    }
  }, [tileTextures]);

  return { tilePixelsRef, isReady };
}

/** Copy tile pixel data into target buffer at tile-grid position (row, col). */
export function stampTileAt(
  target: Uint8ClampedArray,
  tilePixels: Uint8ClampedArray,
  row: number, col: number,
  pixelWidth: number, tilePx: number,
) {
  const startX = col * tilePx;
  const startY = row * tilePx;
  for (let ty = 0; ty < tilePx; ty++) {
    const dstOffset = ((startY + ty) * pixelWidth + startX) * 4;
    const srcOffset = ty * tilePx * 4;
    target.set(tilePixels.subarray(srcOffset, srcOffset + tilePx * 4), dstOffset);
  }
}

/** Zero out the pixel region for a tile cell. */
export function clearTileAt(
  target: Uint8ClampedArray,
  row: number, col: number,
  pixelWidth: number, tilePx: number,
) {
  const startX = col * tilePx;
  const startY = row * tilePx;
  const zeroes = new Uint8ClampedArray(tilePx * 4);
  for (let ty = 0; ty < tilePx; ty++) {
    const dstOffset = ((startY + ty) * pixelWidth + startX) * 4;
    target.set(zeroes, dstOffset);
  }
}

/** Fill a tile region with a solid RGBA colour. */
export function stampSolidColorAt(
  target: Uint8ClampedArray,
  row: number, col: number,
  pixelWidth: number, tilePx: number,
  r: number, g: number, b: number, a: number,
) {
  const startX = col * tilePx;
  const startY = row * tilePx;
  for (let ty = 0; ty < tilePx; ty++) {
    for (let tx = 0; tx < tilePx; tx++) {
      const i = ((startY + ty) * pixelWidth + (startX + tx)) * 4;
      target[i] = r;
      target[i + 1] = g;
      target[i + 2] = b;
      target[i + 3] = a;
    }
  }
}

/** Stamp tile pixels with overridden alpha (for semi-transparent preview). */
export function stampTileAtWithAlpha(
  target: Uint8ClampedArray,
  tilePixels: Uint8ClampedArray,
  row: number, col: number,
  pixelWidth: number, tilePx: number,
  alpha: number,
) {
  const startX = col * tilePx;
  const startY = row * tilePx;
  for (let ty = 0; ty < tilePx; ty++) {
    for (let tx = 0; tx < tilePx; tx++) {
      const srcIdx = (ty * tilePx + tx) * 4;
      const dstIdx = ((startY + ty) * pixelWidth + (startX + tx)) * 4;
      target[dstIdx] = tilePixels[srcIdx];
      target[dstIdx + 1] = tilePixels[srcIdx + 1];
      target[dstIdx + 2] = tilePixels[srcIdx + 2];
      target[dstIdx + 3] = tilePixels[srcIdx + 3] > 0 ? alpha : 0;
    }
  }
}

/** Rebuild the full pixel buffer from tilemap data and the rasterised tile cache. */
export function rebuildPixelBuffer(
  target: Uint8ClampedArray,
  tilemapData: (string | null)[][],
  cache: TilePixelCache,
  w: number, h: number, tilePx: number,
) {
  target.fill(0);
  const pixelWidth = w * tilePx;
  const rows = Math.min(h, tilemapData.length);
  for (let row = 0; row < rows; row++) {
    const cols = Math.min(w, tilemapData[row].length);
    for (let col = 0; col < cols; col++) {
      const key = tilemapData[row][col];
      if (key && cache[key]) {
        stampTileAt(target, cache[key], row, col, pixelWidth, tilePx);
      }
    }
  }
}
