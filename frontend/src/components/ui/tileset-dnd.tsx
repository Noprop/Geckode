"use client";

import { DragOverlay, useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { ReactNode } from "react";

// ── Types ──

export interface TileDragData {
  tileKey: string;
  row?: number;
  col?: number;
  source: "grid" | "palette";
}

// ── DroppableTileCell ──
// Wraps a grid cell so it can receive drops. Shows a highlight when hovered.

export const DroppableTileCell = ({
  id,
  children,
  className = "",
  onClick,
  onContextMenu,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  onContextMenu?: (e: React.MouseEvent) => void;
}) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: drop target div managed by dnd-kit
    <div
      ref={setNodeRef}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`${className} ${isOver ? "ring-2 ring-primary-green bg-emerald-100 dark:bg-emerald-900/30" : ""}`}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      onContextMenu={onContextMenu}
    >
      {children}
    </div>
  );
};

// ── DraggableTile ──
// Makes a tile image draggable. Becomes semi-transparent while being dragged.

export const DraggableTile = ({
  id,
  data,
  children,
  className = "",
  onClick,
  onDoubleClick,
  disabled = false,
}: {
  id: string;
  data: TileDragData;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  onDoubleClick?: () => void;
  disabled?: boolean;
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      data,
      disabled,
    });

  const style = transform
    ? { transform: CSS.Translate.toString(transform) }
    : undefined;

  return (
    <button
      type="button"
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`${className} cursor-grab active:cursor-grabbing ${isDragging ? "opacity-30" : ""}`}
      style={style}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      {children}
    </button>
  );
};

// ── TileDragOverlay ──
// The floating preview shown during a drag. Renders the tile image at a fixed size.

export const TileDragOverlay = ({
  tileKey,
  textureSrc,
}: {
  tileKey: string;
  textureSrc: string;
}) => (
  <div className="w-12 h-12 rounded shadow-lg ring-2 ring-primary-green pointer-events-none">
    <img
      src={textureSrc}
      alt={tileKey}
      className="w-full h-full object-cover"
      style={{ imageRendering: "pixelated" }}
    />
  </div>
);

export { DragOverlay };
