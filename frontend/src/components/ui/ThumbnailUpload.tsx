"use client";

import { useEffect, useRef, useState } from "react";
import { TrashIcon } from "@radix-ui/react-icons";

const ASPECT_MIN = 1 / 3;
const ASPECT_MAX = 21 / 9;
const ASPECT_DEFAULT = 16 / 9;

function clampAspect(ratio: number): number {
  return Math.max(ASPECT_MIN, Math.min(ASPECT_MAX, ratio));
}

export interface ThumbnailUploadProps {
  /** Current image URL (e.g. existing project thumbnail). Omit for "create" mode. */
  currentSrc?: string | null;
  /** Called when the user selects a new image file. Pass null to clear. */
  onFileSelect?: (file: File | null) => void;
  disabled?: boolean;
  accept?: string;
  /** Optional label above the area */
  label?: string;
  /** Aspect ratio class (e.g. aspect-video). Default: aspect-video */
  aspectClass?: string;
  className?: string;
}

/**
 * Reusable thumbnail upload: shows current image (or placeholder), drag-and-drop
 * or click to select a new image. Use in create flows (no currentSrc) or edit
 * flows (currentSrc + onFileSelect to save).
 */
export function ThumbnailUpload({
  currentSrc,
  onFileSelect,
  disabled = false,
  accept = "image/*",
  label,
  aspectClass = "aspect-video",
  className = "",
}: ThumbnailUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [imageAspectRatio, setImageAspectRatio] = useState<number | null>(null);

  useEffect(() => {
    setPendingFile(null);
  }, [currentSrc]);

  useEffect(() => {
    if (pendingFile == null) {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
        setObjectUrl(null);
      }
      return;
    }
    const url = URL.createObjectURL(pendingFile);
    setObjectUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [pendingFile]);

  const displaySrc = objectUrl ?? currentSrc ?? null;

  const applyRatioFromImg = (img: HTMLImageElement | null) => {
    if (!img?.naturalWidth || !img.naturalHeight) return;
    setImageAspectRatio(clampAspect(img.naturalWidth / img.naturalHeight));
  };

  const imgRef = useRef<HTMLImageElement | null>(null);
  const setImgRef = (el: HTMLImageElement | null) => {
    imgRef.current = el;
    if (el && el.complete && el.naturalWidth) applyRatioFromImg(el);
  };

  useEffect(() => {
    setImageAspectRatio(null);
  }, [displaySrc]);

  useEffect(() => {
    if (!displaySrc) return;
    const img = imgRef.current;
    if (!img) return;
    const applyRatio = () => applyRatioFromImg(img);
    img.addEventListener("load", applyRatio);
    applyRatio();
    const t = setTimeout(applyRatio, 50);
    return () => {
      img.removeEventListener("load", applyRatio);
      clearTimeout(t);
    };
  }, [displaySrc]);

  const handleFile = (file: File | null) => {
    if (disabled) return;
    setPendingFile(file ?? null);
    onFileSelect?.(file ?? null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (disabled) return;
    const files = e.dataTransfer.files;
    if (files.length === 0) return;
    const file = files[0];
    if (accept === "image/*" && !file.type.startsWith("image/")) return;
    handleFile(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    handleFile(file);
    e.target.value = "";
  };

  return (
    <div className={className}>
      {label && (
        <label className="mb-1 block text-sm font-medium text-muted-foreground">
          {label}
        </label>
      )}
      <div
        role={disabled ? undefined : "button"}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={
          disabled
            ? undefined
            : (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  inputRef.current?.click();
                }
              }
        }
        onDrop={disabled ? undefined : handleDrop}
        onDragOver={disabled ? undefined : (e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={disabled ? undefined : () => setDragOver(false)}
        onClick={() => !disabled && inputRef.current?.click()}
        style={(() => {
          const ratio = imageAspectRatio ?? ASPECT_DEFAULT;
          const isPortrait = ratio < 1;
          return {
            aspectRatio: ratio,
            ...(isPortrait
              ? { height: "16rem", width: "auto", maxWidth: "100%", marginLeft: "auto", marginRight: "auto" }
              : { maxHeight: "16rem" }),
          };
        })()}
        className={
          disabled
            ? `relative w-full max-w-full max-h-64 min-h-0 overflow-hidden rounded-lg border border-gray-500 bg-light-secondary dark:bg-dark-tertiary flex items-center justify-center`
            : `relative w-full max-w-full max-h-64 min-h-0 overflow-hidden rounded-lg border-2 flex items-center justify-center cursor-pointer transition-colors duration-200 group
          ${dragOver
              ? "border-dashed border-primary-green bg-primary-green/10"
              : displaySrc
                ? "border-solid border-gray-500 hover:border-dashed hover:border-gray-400"
                : "border-dashed border-gray-500 bg-light-secondary dark:bg-dark-tertiary"}`
        }
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={false}
          onChange={handleInputChange}
          className="hidden"
          disabled={disabled}
        />
        {displaySrc ? (
          <>
            <img
              ref={setImgRef}
              key={displaySrc}
              src={displaySrc}
              alt=""
              className="absolute inset-0 size-full object-cover pointer-events-none"
              onLoad={(e) => applyRatioFromImg(e.currentTarget)}
            />
            {!disabled && onFileSelect && (
              <div
                className={`absolute inset-0 z-1 flex items-center justify-center bg-black/50 transition-opacity duration-200 ${dragOver ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                aria-hidden
              >
                <p className="text-sm text-white text-center px-4 pointer-events-none">
                  Drop image here or click to choose
                </p>
              </div>
            )}
            {!disabled && onFileSelect && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFile(null);
                }}
                className="absolute right-2 top-2 z-10 rounded-full bg-black/60 p-1.5 text-white opacity-0 transition-[opacity,color,background-color] duration-200 group-hover:opacity-100 hover:bg-black/80 hover:text-red-400"
                aria-label="Remove thumbnail"
              >
                <TrashIcon className="size-5" />
              </button>
            )}
          </>
        ) : (
          <p className="relative z-10 text-sm text-muted-foreground text-center px-4">
            {disabled ? "No thumbnail" : "Drop image here or click to choose"}
          </p>
        )}
      </div>
      {pendingFile != null && !disabled && (
        <p className="mt-1 text-xs text-muted-foreground truncate">
          {pendingFile.name}
        </p>
      )}
    </div>
  );
}
