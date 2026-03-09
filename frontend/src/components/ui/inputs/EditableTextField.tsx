"use client";

import { useState, useRef, useEffect } from "react";
import { Pencil2Icon, CheckIcon, Cross2Icon } from "@radix-ui/react-icons";

export interface EditableTextFieldProps {
  value: string;
  onSave: (value: string) => void | Promise<void>;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  /** Label shown above the field (optional) */
  label?: string;
  /** Use smaller text (e.g. for header/title placement). Only when multiline is false. */
  compact?: boolean;
  /** When true, use a textarea (multi-line); otherwise use a single-line input. */
  multiline?: boolean;
  /** Minimum rows when in edit mode. Only used when multiline is true. */
  minRows?: number;
}

/**
 * Editable text: display mode with edit button and double-click to edit; edit mode
 * with input or textarea (when multiline) and save/cancel. Reusable for names,
 * titles, descriptions, etc.
 */
export function EditableTextField({
  value,
  onSave,
  placeholder = "",
  disabled = false,
  className = "",
  label,
  compact = false,
  multiline = false,
  minRows = 3,
}: EditableTextFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setEditValue(value);
    setIsEditing(false);
  }, [value]);

  useEffect(() => {
    if (!isEditing) return;
    const el = multiline ? textareaRef.current : inputRef.current;
    if (el) {
      el.focus();
      el.select();
    }
  }, [isEditing, multiline]);

  const startEdit = () => {
    if (disabled) return;
    setEditValue(value);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleSave = () => {
    const trimmed = multiline ? editValue.trim() : editValue.trim();
    if (trimmed === value) {
      setIsEditing(false);
      return;
    }
    if (!trimmed && !multiline) {
      cancelEdit();
      return;
    }
    onSave(trimmed);
    setIsEditing(false);
  };

  const editPlaceholder = multiline ? (placeholder || "Add a description…") : (placeholder || "No name");

  if (isEditing) {
    const inputClassName =
      "w-full rounded border border-gray-500 bg-white px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary-green focus:outline-none focus:ring-1 focus:ring-primary-green dark:bg-dark-tertiary";
    return (
      <div className={className}>
        {label && (
          <label className="mb-1 block text-sm font-medium text-muted-foreground">
            {label}
          </label>
        )}
        {multiline ? (
          <textarea
            ref={textareaRef}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") cancelEdit();
            }}
            rows={minRows}
            className={`${inputClassName} resize-y text-sm`}
            placeholder={editPlaceholder}
          />
        ) : (
          <input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") cancelEdit();
              if (e.key === "Enter") handleSave();
            }}
            className={inputClassName}
            placeholder={editPlaceholder}
          />
        )}
        <div className="mt-2 flex gap-2">
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-1.5 rounded px-2.5 py-1.5 text-sm font-medium text-white bg-primary-green hover:bg-primary-green/90"
          >
            <CheckIcon className="size-4" />
            Save
          </button>
          <button
            type="button"
            onClick={cancelEdit}
            className="flex items-center gap-1.5 rounded px-2.5 py-1.5 text-sm font-medium text-muted-foreground hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Cross2Icon className="size-4" />
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {label && (
        <label className="mb-1 block text-sm font-medium text-muted-foreground">
          {label}
        </label>
      )}
      <div
        className={`group relative rounded border border-transparent py-1 pr-8 ${multiline ? "cursor-text" : ""}`}
        onDoubleClick={!disabled ? startEdit : undefined}
        role={!disabled ? "button" : undefined}
        tabIndex={!disabled ? 0 : undefined}
        onKeyDown={
          !disabled
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  startEdit();
                }
              }
            : undefined
        }
      >
        {multiline ? (
          <p className="whitespace-pre-wrap text-sm text-foreground">
            {value || (
              <span className="text-muted-foreground italic">{editPlaceholder}</span>
            )}
          </p>
        ) : (
          <p className={`${compact ? "text-lg" : "text-xl"} font-semibold text-foreground truncate`}>
            {value || (
              <span className="text-muted-foreground italic font-normal">
                {editPlaceholder}
              </span>
            )}
          </p>
        )}
        {!disabled && (
          <button
            type="button"
            onClick={startEdit}
            className="absolute right-0 top-1/2 -translate-y-1/2 rounded p-1.5 text-muted-foreground opacity-0 transition hover:bg-gray-200 hover:text-foreground group-hover:opacity-100 dark:hover:bg-gray-700"
            aria-label={multiline ? "Edit description" : "Edit name"}
          >
            <Pencil2Icon className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
}
