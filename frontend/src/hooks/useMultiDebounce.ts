import { useState, useEffect, useRef } from 'react';

interface DebounceConfig<T> {
  values: T;
  delays?: Partial<Record<keyof T, number>>;
  defaultDelay?: number;
}

export default function useMultiDebounce<T extends Record<string, any>>(
  config: DebounceConfig<T>
): T {
  const [debouncedValues, setDebouncedValues] = useState<T>(config.values);
  const prevValues = useRef<T>(config.values);
  const defaultDelay = config.defaultDelay ?? 300;

  useEffect(() => {
    const keys = Object.keys(config.values) as Array<keyof T>;
    const changed = keys.filter((key) => config.values[key] !== prevValues.current[key]);
    let timeout: NodeJS.Timeout | null = null;

    if (changed.length > 0) {
      timeout = setTimeout(() => {
        setDebouncedValues((prev) => ({
          ...prev,
          ...(Object.fromEntries(changed.map((key) =>
            [key, config.values[key]]
          )))
        }));
        prevValues.current = config.values;
      }, Math.max(...changed.map((key) => config.delays?.[key] ?? defaultDelay)));
    }

    return () => { if (timeout) clearTimeout(timeout) };
  }, [config.values, config.delays, defaultDelay]);

  return debouncedValues;
}