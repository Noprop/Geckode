import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const MIN_ZOOM_PERCENT = 25;
const MAX_ZOOM_PERCENT = 800;

export function useCanvasZoom(gridWidth: number, gridHeight: number) {
  const [zoomPercent, setZoomPercent] = useState(100);
  const [isEditingZoom, setIsEditingZoom] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);

  // Clamp helper exposed to the consumer
  const setZoom = useCallback((z: number) => {
    setZoomPercent(Math.max(MIN_ZOOM_PERCENT, Math.min(MAX_ZOOM_PERCENT, z)));
  }, []);

  // Keep a ref so the wheel handler always reads the latest value
  const zoomRef = useRef(zoomPercent);
  useEffect(() => { zoomRef.current = zoomPercent; }, [zoomPercent]);

  // ResizeObserver + Ctrl/Cmd‑wheel zoom
  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        const delta = e.deltaY > 0 ? -5 : 5;
        const next = zoomRef.current + delta;
        setZoomPercent(Math.max(MIN_ZOOM_PERCENT, Math.min(MAX_ZOOM_PERCENT, next)));
      }
    };

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setContainerSize({ width, height });
    });

    container.addEventListener('wheel', handleWheel, { passive: false });
    observer.observe(container);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      observer.disconnect();
    };
  }, []);

  // Pixels-per-cell that makes the grid exactly fit the container
  const baseZoom = useMemo(() => {
    if (containerSize.width === 0 || containerSize.height === 0) return 1;
    return Math.min(containerSize.width / gridWidth, containerSize.height / gridHeight);
  }, [containerSize, gridWidth, gridHeight]);

  // Final cell size = baseZoom * user zoom factor, minimum 1px
  const cellSize = useMemo(() => {
    return Math.max(1, baseZoom * (zoomPercent / 100));
  }, [baseZoom, zoomPercent]);

  return {
    cellSize,
    zoomPercent,
    setZoom,
    isEditingZoom,
    setIsEditingZoom,
    canvasContainerRef,
    MIN_ZOOM_PERCENT,
    MAX_ZOOM_PERCENT,
  };
}
