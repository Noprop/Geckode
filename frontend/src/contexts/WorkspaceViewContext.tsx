"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useMemo, useState } from "react";

export type WorkspaceView = "blocks" | "sprite";

type WorkspaceViewContextValue = {
  view: WorkspaceView;
  setView: (view: WorkspaceView) => void;
};

const WorkspaceViewContext = createContext<WorkspaceViewContextValue | null>(null);

export function WorkspaceViewProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<WorkspaceView>("blocks");

  const value = useMemo(() => ({ view, setView }), [view]);

  return (
    <WorkspaceViewContext.Provider value={value}>
      {children}
    </WorkspaceViewContext.Provider>
  );
}

export function useWorkspaceView() {
  const ctx = useContext(WorkspaceViewContext);
  if (!ctx) {
    throw new Error("useWorkspaceView must be used within a WorkspaceViewProvider");
  }
  return ctx;
}
