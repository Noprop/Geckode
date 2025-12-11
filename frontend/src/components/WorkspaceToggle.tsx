"use client";

import type { ReactNode } from "react";
import { DrawingPinFilledIcon, ImageIcon } from "@radix-ui/react-icons";
import { WorkspaceView, useWorkspaceView } from "@/contexts/WorkspaceViewContext";

const options: { value: WorkspaceView; label: string; icon: ReactNode }[] = [
  { value: 'blocks', label: 'Blocks', icon: <DrawingPinFilledIcon /> },
  { value: 'sprite', label: 'Sprite Editor', icon: <ImageIcon /> },
];

export default function WorkspaceToggle() {
  const { view, setView } = useWorkspaceView();

  return (
    <div className="inline-flex items-center rounded-full bg-[#3d8c5c] p-1 shadow-md">
      {options.map((option) => {
        const isActive = view === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setView(option.value)}
            aria-pressed={isActive}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
              isActive
                ? 'bg-white text-[#3d8c5c] shadow-sm'
                : 'text-white/90 hover:text-white hover:bg-white/10'
            }`}
          >
            <span className={isActive ? 'text-[#3d8c5c]' : 'text-white/80'}>
              {option.icon}
            </span>
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
