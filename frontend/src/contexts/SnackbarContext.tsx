"use client";

import { createContext, useState, useCallback, useRef } from "react";

type SnackbarType = "success" | "error" | "info";

interface SnackbarContextType {
  showSnackbar: (msg: string, type?: SnackbarType) => void;
}

export const SnackbarContext = createContext<SnackbarContextType | null>(null);

interface SnackbarMessage {
  message: string;
  type?: SnackbarType;
}

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [snackbar, setSnackbar] = useState<SnackbarMessage | null>(null);
  const [visible, setVisible] = useState(false);

  const visibleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const snackbarTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showSnackbar = useCallback(
    (msg: string, type: SnackbarType = "info") => {
      if (visibleTimeoutRef.current) clearTimeout(visibleTimeoutRef.current);
      if (snackbarTimeoutRef.current) clearTimeout(snackbarTimeoutRef.current);

      setSnackbar({ message: msg, type });
      setVisible(true);

      visibleTimeoutRef.current = setTimeout(() => setVisible(false), 3000);
      snackbarTimeoutRef.current = setTimeout(() => setSnackbar(null), 3500);
    },
    []
  );

  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-gray-800",
  }[snackbar?.type || "info"];

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}

      <div
        className={`
          z-50 fixed bottom-4 left-1/2 transform -translate-x-1/2
          px-4 py-2 rounded shadow-lg text-white
          transition-all duration-300
          ${bgColor}
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          pointer-events-none
        `}
      >
        {snackbar?.message}
      </div>
    </SnackbarContext.Provider>
  );
}
