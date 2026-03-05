import { useCallback, useEffect, useRef, useState } from 'react';

const MIN_CELL_SIZE = 1;
const MAX_CELL_SIZE = 64;

export function useCanvasZoom(
  gridWidth: number,
  gridHeight: number,
  options?: { zoomStep?: number },
) {
  const step = options?.zoomStep ?? 1;
  const [zoomOffset, setZoomOffset] = useState(0);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Subtract wrapper padding (p-4 = 16px each side = 32px total) so the canvas
  // at default zoom fits within the container without triggering scrollbars.
  const WRAPPER_PADDING = 32;
  const baseZoom =
    containerSize.width > 0 && containerSize.height > 0
      ? Math.min(
          (containerSize.width - WRAPPER_PADDING) / gridWidth,
          (containerSize.height - WRAPPER_PADDING) / gridHeight,
        )
      : 1;

  // offset 0 → exact fractional fit; otherwise steps from baseZoom
  const cellSize =
    zoomOffset === 0
      ? Math.max(MIN_CELL_SIZE, baseZoom)
      : Math.max(MIN_CELL_SIZE, Math.min(MAX_CELL_SIZE, baseZoom + zoomOffset));

  // Keep scroll centered on zoom changes
  const prevCellSizeRef = useRef(cellSize);
  useEffect(() => {
    const prev = prevCellSizeRef.current;
    prevCellSizeRef.current = cellSize;
    const el = scrollContainerRef.current;
    if (!el || prev === cellSize) return;

    const s = cellSize / prev;
    el.scrollLeft = el.scrollLeft * s + (el.clientWidth / 2) * (s - 1);
    el.scrollTop = el.scrollTop * s + (el.clientHeight / 2) * (s - 1);
  }, [cellSize]);

  const zoomIn = useCallback(() => {
    setZoomOffset((o) => {
      const next = o === 0 ? step : o + step;
      return baseZoom + next <= MAX_CELL_SIZE ? next : o;
    });
  }, [baseZoom, step]);

  const zoomOut = useCallback(() => {
    setZoomOffset((o) => {
      const next = o === 0 ? -step : o - step;
      return baseZoom + next >= MIN_CELL_SIZE ? next : o;
    });
  }, [baseZoom, step]);

  const canZoomIn = zoomOffset === 0
    ? baseZoom + step <= MAX_CELL_SIZE
    : baseZoom + zoomOffset + step <= MAX_CELL_SIZE;
  const canZoomOut = zoomOffset === 0
    ? baseZoom - step >= MIN_CELL_SIZE
    : baseZoom + zoomOffset - step >= MIN_CELL_SIZE;

  // Keep refs so the wheel handler reads the latest values
  const zoomOffsetRef = useRef(zoomOffset);
  useEffect(() => { zoomOffsetRef.current = zoomOffset; }, [zoomOffset]);
  const baseZoomRef = useRef(baseZoom);
  useEffect(() => { baseZoomRef.current = baseZoom; }, [baseZoom]);
  const stepRef = useRef(step);
  useEffect(() => { stepRef.current = step; }, [step]);

  // ResizeObserver + Ctrl/Cmd-wheel zoom
  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const bz = baseZoomRef.current;
        const o = zoomOffsetRef.current;
        const s = stepRef.current;
        if (e.deltaY > 0) {
          const next = o === 0 ? -s : o - s;
          if (bz + next >= MIN_CELL_SIZE) setZoomOffset(next);
        } else {
          const next = o === 0 ? s : o + s;
          if (bz + next <= MAX_CELL_SIZE) setZoomOffset(next);
        }
      }
    };

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setContainerSize({ width, height });
    });

    container.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    observer.observe(container);

    return () => {
      container.removeEventListener('wheel', handleWheel, { capture: true });
      observer.disconnect();
    };
  }, []);

  return {
    cellSize,
    zoomIn,
    zoomOut,
    canZoomIn,
    canZoomOut,
    canvasContainerRef,
    scrollContainerRef,
  };
}
