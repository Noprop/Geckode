"use client";

import { createContext } from "react";

export type SnackbarType = "success" | "error" | "info";

export interface SnackbarContextType {
  showSnackbar: (msg: string, type?: SnackbarType) => void;
}

export const SnackbarContext = createContext<SnackbarContextType | null>(null);
