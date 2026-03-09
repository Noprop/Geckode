"use client";

import { useEffect, useState } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";

const ANIMATION_DURATION_MS = 200;

export interface SidePanelProps {
  /** Whether the panel is visible */
  open: boolean;
  /** Called when the panel should close (e.g. close button, overlay click, Escape) */
  onClose: () => void;
  /** Optional title shown at the top */
  title?: React.ReactNode;
  /** Panel content */
  children: React.ReactNode;
  /** Width of the panel (default: 28rem) */
  width?: string;
  className?: string;
  /**
   * When true (default), the overlay blurs and blocks the rest of the page.
   * When false, the rest of the page stays visible and interactive (no overlay blur/blocking).
   */
  blocking?: boolean;
}

/**
 * Reusable side panel that slides in from the right.
 * Use for detail views, forms, or any secondary content that should not navigate away.
 */
export function SidePanel({
  open,
  onClose,
  title,
  children,
  width = "28rem",
  className = "",
  blocking = true,
}: SidePanelProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const visible = open || isExiting;

  useEffect(() => {
    if (open) {
      setIsExiting(false);
      setIsEntering(true);
    }
  }, [open]);

  useEffect(() => {
    if (!open || !isEntering) return;
    let cancelled = false;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!cancelled) setIsEntering(false);
      });
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(id);
    };
  }, [open, isEntering]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  useEffect(() => {
    if (!isExiting) return;
    const id = setTimeout(() => {
      onClose();
      setIsExiting(false);
    }, ANIMATION_DURATION_MS);
    return () => clearTimeout(id);
  }, [isExiting, onClose]);

  function requestClose() {
    setIsExiting(true);
  }

  if (!visible) return null;

  return (
    <>
      {blocking && (
        <div
          role="presentation"
          className={`fixed inset-0 z-50 bg-black/30 backdrop-blur-sm transition-opacity duration-200 ease-out ${
            isExiting ? "opacity-0" : "opacity-100"
          }`}
          onClick={requestClose}
          aria-hidden
        />
      )}
      <aside
        role="dialog"
        aria-modal="true"
        className={`fixed right-0 top-0 bottom-0 z-50 flex flex-col overflow-hidden border-l border-gray-600 bg-light-bg shadow-xl transition-transform duration-200 ease-out dark:bg-dark-secondary ${className}`}
        style={{
          width: `min(${width}, 100vw)`,
          transform: isExiting ? "translateX(100%)" : isEntering ? "translateX(100%)" : "translateX(0)",
        }}
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-gray-500 px-4 py-3">
          {title !== undefined && (
            <div className="min-w-0 flex-1">
              {title}
            </div>
          )}
          <button
            type="button"
            onClick={requestClose}
            className="ml-auto shrink-0 rounded p-1.5 text-muted-foreground transition hover:bg-gray-200 hover:text-foreground dark:hover:bg-gray-700"
            aria-label="Close panel"
          >
            <Cross2Icon className="size-5" />
          </button>
        </div>
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</div>
      </aside>
    </>
  );
}
