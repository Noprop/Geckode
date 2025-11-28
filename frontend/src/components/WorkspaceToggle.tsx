"use client";

import type { ReactNode } from "react";
import { DrawingPinFilledIcon, ImageIcon } from "@radix-ui/react-icons";
import { WorkspaceView, useWorkspaceView } from "@/contexts/WorkspaceViewContext";

const options: { value: WorkspaceView; label: string; icon: ReactNode }[] = [
  { value: "blocks", label: "Blocks", icon: <DrawingPinFilledIcon className="h-4 w-4" /> },
  { value: "sprite", label: "Sprite Editor", icon: <ImageIcon className="h-4 w-4" /> },
];

export default function WorkspaceToggle() {
  const { view, setView } = useWorkspaceView();

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="inline-flex items-center gap-1 rounded-xl border border-white/40 bg-white/15 px-1.5 py-1 backdrop-blur-sm shadow-[0_4px_0_rgba(0,0,0,0.16)]">
        {options.map((option) => {
          const isActive = view === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setView(option.value)}
              aria-pressed={isActive}
              className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-lg px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] transition-all duration-150 focus:outline-none ${
                isActive
                  ? "bg-white text-primary-green shadow-[0_3px_0_rgba(0,0,0,0.12)]"
                  : "bg-primary-green/85 text-white hover:bg-primary-green"
              }`}
            >
              <span className="text-white/80">{option.icon}</span>
              <span className="drop-shadow-sm">{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
