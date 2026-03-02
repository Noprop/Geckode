'use client';

import type { RefObject } from 'react';

interface PixelCanvasEditorLayoutProps {
  canvasContainerRef: RefObject<HTMLDivElement | null>;
  scrollContainerRef: RefObject<HTMLDivElement | null>;
  undo: () => void;
  redo: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  canZoomIn: boolean;
  canZoomOut: boolean;
  clearButton?: { onClick: () => void };
  children: React.ReactNode;
}

export function PixelCanvasEditorLayout({
  canvasContainerRef,
  scrollContainerRef,
  undo,
  redo,
  zoomIn,
  zoomOut,
  canZoomIn,
  canZoomOut,
  clearButton,
  children,
}: PixelCanvasEditorLayoutProps) {
  return (
    <div
      ref={canvasContainerRef}
      className="relative flex-1 min-h-0 bg-slate-600"
    >
      <div ref={scrollContainerRef} className="absolute inset-0 overflow-auto">
        <div className="min-w-full min-h-full w-max flex items-center justify-center p-4">
          {children}
        </div>
      </div>

      {clearButton && (
        <button
          type="button"
          onClick={clearButton.onClick}
          className="absolute top-2 right-2 z-10 px-3 h-7 flex items-center justify-center rounded bg-red-600/80 hover:bg-red-600 text-white text-xs font-medium cursor-pointer transition"
          title="Clear canvas"
        >
          Clear
        </button>
      )}

      <div className="absolute bottom-2 right-2 z-10 flex items-center gap-1.5">
        <button
          type="button"
          onClick={undo}
          className="w-7 h-7 flex items-center justify-center rounded bg-slate-500/80 hover:bg-slate-400 text-white cursor-pointer transition"
          title="Undo (Ctrl+Z)"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 7h10a5 5 0 0 1 0 10H9" />
            <path d="M3 7l4-4M3 7l4 4" />
          </svg>
        </button>
        <button
          type="button"
          onClick={redo}
          className="w-7 h-7 flex items-center justify-center rounded bg-slate-500/80 hover:bg-slate-400 text-white cursor-pointer transition"
          title="Redo (Ctrl+Shift+Z)"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 7H11a5 5 0 0 0 0 10h4" />
            <path d="M21 7l-4-4M21 7l-4 4" />
          </svg>
        </button>
        <div className="w-px h-5 bg-slate-400/50" />
        <button
          type="button"
          onClick={zoomOut}
          disabled={!canZoomOut}
          className="w-7 h-7 flex items-center justify-center rounded bg-slate-500/80 hover:bg-slate-400 disabled:opacity-30 disabled:cursor-not-allowed text-white cursor-pointer transition"
          title="Zoom out"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35M8 11h6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={zoomIn}
          disabled={!canZoomIn}
          className="w-7 h-7 flex items-center justify-center rounded bg-slate-500/80 hover:bg-slate-400 disabled:opacity-30 disabled:cursor-not-allowed text-white cursor-pointer transition"
          title="Zoom in"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
