"use client";

import React, { useState, useCallback } from "react";
import { SnackbarContext, SnackbarType } from "@/contexts/SnackbarContext";

interface SnackbarMessage {
  message: string;
  type?: SnackbarType;
}

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [snackbar, setSnackbar] = useState<SnackbarMessage | null>(null);
  const [visible, setVisible] = useState(false);

  const showSnackbar = useCallback((msg: string, type: SnackbarType = "info") => {
    setSnackbar({ message: msg, type });
    setVisible(true);

    // Hide after 3 seconds
    setTimeout(() => setVisible(false), 3000);
    // Remove from DOM after animation
    setTimeout(() => setSnackbar(null), 3500);
  }, []);

  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-gray-800",
  }[snackbar?.type || "info"];

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}

      {/* Always mount the container */}
      <div
        className={`
          fixed bottom-4 left-1/2 transform -translate-x-1/2
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