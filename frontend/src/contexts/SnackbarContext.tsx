"use client";

import { createContext, useState, useCallback, useRef, useEffect } from "react";

type SnackbarType = "success" | "error" | "info";

interface SnackbarContextType {
  showSnackbar: (msg: string, type?: SnackbarType) => void;
}

export const SnackbarContext = createContext<SnackbarContextType | null>(null);

interface SnackbarMessage {
  message: string;
  type?: SnackbarType;
}

type SnackbarStateRef = {
  setSnackbar: (msg: SnackbarMessage | null) => void;
  setVisible: (visible: boolean) => void;
};

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const stateRef = useRef<SnackbarStateRef | null>(null);
  const visibleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const snackbarTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showSnackbar = useCallback(
    (msg: string, type: SnackbarType = "info") => {
      if (visibleTimeoutRef.current) clearTimeout(visibleTimeoutRef.current);
      if (snackbarTimeoutRef.current) clearTimeout(snackbarTimeoutRef.current);

      stateRef.current?.setSnackbar({ message: msg, type });
      stateRef.current?.setVisible(true);

      visibleTimeoutRef.current = setTimeout(() => {
        stateRef.current?.setVisible(false);
      }, 3000);
      snackbarTimeoutRef.current = setTimeout(() => {
        stateRef.current?.setSnackbar(null);
      }, 3500);
    },
    []
  );

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <SnackbarDisplay stateRef={stateRef} />
    </SnackbarContext.Provider>
  );
}

function SnackbarDisplay({ stateRef }: { stateRef: React.RefObject<SnackbarStateRef | null> }) {
  const [mounted, setMounted] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarMessage | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    stateRef.current = { setSnackbar, setVisible };
    return () => {
      stateRef.current = null;
    };
  }, [mounted, stateRef]);

  if (!mounted) {
    return null;
  }

  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-gray-800",
  }[snackbar?.type || "info"];

  return (
    <div
      className={`
        z-101 fixed bottom-4 left-1/2 transform -translate-x-1/2
        px-4 py-2 rounded shadow-lg text-white
        transition-all duration-300
        ${bgColor}
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
        pointer-events-none
      `}
    >
      {snackbar?.message}
    </div>
  );
}
