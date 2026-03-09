"use client";

import { useEffect, useRef, useState } from "react";
import { useSnackbar } from "@/hooks/useSnackbar";

export interface EditableApiTextCellProps<TPayload> {
  value: string;
  api: (id: number | string) => { update: (payload: Partial<TPayload>) => Promise<unknown> };
  resourceId: number | string | null | undefined;
  fieldPath: (keyof TPayload)[];
  placeholder?: string;
  disabled?: boolean;
  debounceMs?: number;
  onLocalChange?: (newValue: string) => void;
}

export function EditableApiTextCell<TPayload>({
  value,
  api,
  resourceId,
  fieldPath,
  placeholder = "No name",
  disabled = false,
  debounceMs = 500,
  onLocalChange,
}: EditableApiTextCellProps<TPayload>) {
  const showSnackbar = useSnackbar();
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value ?? "");
  const [lastSavedValue, setLastSavedValue] = useState(value ?? "");
  const [pendingValue, setPendingValue] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setLocalValue(value ?? "");
    setLastSavedValue(value ?? "");
  }, [value]);

  useEffect(() => {
    if (!isEditing || !inputRef.current) return;
    inputRef.current.focus();
    inputRef.current.select();
  }, [isEditing]);

  const runSave = (rawValue: string) => {
    const trimmed = rawValue.trim();

    if (trimmed === lastSavedValue) return;

    // If we don't have an id, update only local state.
    if (resourceId === null || resourceId === undefined) {
      setLastSavedValue(trimmed);
      onLocalChange?.(trimmed);
      return;
    }

    api(resourceId)
      .update({
        [fieldPath[fieldPath.length - 1]]: trimmed,
      } as Partial<TPayload>)
      .then(() => {
        setLastSavedValue(trimmed);
        onLocalChange?.(trimmed);
      })
      .catch(() => {
        showSnackbar("Something went wrong. Please try again later.", "error");
        setLocalValue(lastSavedValue);
      });
  };

  useEffect(() => {
    if (pendingValue === null) return;

    const timeout = setTimeout(() => {
      runSave(pendingValue);
    }, debounceMs);

    return () => clearTimeout(timeout);
  }, [pendingValue, debounceMs]);

  const handleDoubleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (disabled) return;
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = () => {
    setIsEditing(false);
    setPendingValue(null);
    runSave(localValue);
  };

  if (!isEditing) {
    return (
      <div
        className="w-full truncate"
        onDoubleClick={handleDoubleClick}
      >
        {localValue || <span className="italic text-muted-foreground">{placeholder}</span>}
      </div>
    );
  }

  return (
    <input
      ref={inputRef}
      type="text"
      value={localValue}
      onChange={(e) => {
        setLocalValue(e.target.value);
        setPendingValue(e.target.value);
      }}
      onBlur={handleBlur}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setIsEditing(false);
          setLocalValue(lastSavedValue);
        }
        if (e.key === "Enter") {
          e.preventDefault();
          setPendingValue(null);
          runSave(localValue);
          setIsEditing(false);
        }
      }}
      className="w-full rounded border border-gray-500 bg-white px-2 py-1 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary-green focus:outline-none focus:ring-1 focus:ring-primary-green dark:bg-dark-tertiary"
      disabled={disabled}
      placeholder={placeholder}
    />
  );
}

