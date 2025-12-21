"use client";

import { useTheme as useNextTheme } from 'next-themes';

export type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
  const { theme, setTheme, resolvedTheme } = useNextTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  };

  return {
    theme: theme as Theme,
    resolvedTheme: (resolvedTheme as 'light' | 'dark') || 'light',
    setTheme,
    toggleTheme,
  };
}

