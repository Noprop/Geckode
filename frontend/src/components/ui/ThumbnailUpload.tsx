"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ImageIcon, TrashIcon } from "@radix-ui/react-icons";
import Cropper, { Area } from "react-easy-crop";

const ASPECT_MIN = 1 / 3;
const ASPECT_MAX = 21 / 9;
const ASPECT_DEFAULT = 16 / 9;
const MAX_ZOOM_MULTIPLIER = 4;

function clampAspect(ratio: number): number {
  return Math.max(ASPECT_MIN, Math.min(ASPECT_MAX, ratio));
}

function dataUrlToFile(dataUrl: string, originalFile: File): File {
  const arr = dataUrl.split(",");
  const match = arr[0]?.match(/:(.*?);/);
  const mime = match ? match[1] : originalFile.type || "image/png";
  const bstr = atob(arr[1] ?? "");
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new File([u8arr], originalFile.name, { type: mime });
}

async function getCroppedImageFromArea(
  file: File,
  imageSrc: string,
  croppedAreaPixels: Area,
): Promise<File> {
  const img = new Image();
  img.src = imageSrc;
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("Failed to load image"));
  });

  const canvas = document.createElement("canvas");
  canvas.width = croppedAreaPixels.width;
  canvas.height = croppedAreaPixels.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return file;

  ctx.drawImage(
    img,
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
    0,
    0,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
  );

  const dataUrl = canvas.toDataURL(file.type || "image/png", 0.92);
  return dataUrlToFile(dataUrl, file);
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
  /** Aspect ratio class (e.g. aspect-video). Default: aspect-video (kept for backwards-compat; not required) */
  aspectClass?: string;
  className?: string;
  /** Enable client-side crop/zoom before emitting the file. Default: false */
  enableCropZoom?: boolean;
  /**
   * Target aspect ratio when crop/zoom is enabled.
   * Defaults to the component's existing 16:9 aspect.
   * Example: 1 for square, 4/3 for 4:3.
   */
  cropAspectRatio?: number;
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
  enableCropZoom = false,
  cropAspectRatio,
}: ThumbnailUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const suppressNextClickRef = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Shared object URL for the selected file
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [imageAspectRatio, setImageAspectRatio] = useState<number | null>(null);

  // react-easy-crop state (used only when enableCropZoom is true)
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

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
    if (el && el.complete && el.naturalWidth) {
      applyRatioFromImg(el);
    }
  };

  useEffect(() => {
    setImageAspectRatio(null);
  }, [displaySrc]);

  const handleFile = (file: File | null) => {
    if (disabled) return;
    setPendingFile(file ?? null);
    if (!enableCropZoom) {
      onFileSelect?.(file ?? null);
    } else {
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
      if (!file) {
        onFileSelect?.(null);
      }
    }
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

  const handleCropComplete = useCallback((_: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const commitCrop = useCallback(async () => {
    if (!enableCropZoom) return;
    if (!pendingFile || !displaySrc || !croppedAreaPixels || !onFileSelect) return;
    const cropped = await getCroppedImageFromArea(pendingFile, displaySrc, croppedAreaPixels);
    onFileSelect(cropped);
  }, [enableCropZoom, pendingFile, displaySrc, croppedAreaPixels, onFileSelect]);

  // When a new file is selected in crop mode and we have a first cropped area, emit it
  useEffect(() => {
    if (!enableCropZoom) return;
    if (!pendingFile || !displaySrc || !croppedAreaPixels) return;
    void commitCrop();
  }, [enableCropZoom, pendingFile, displaySrc, croppedAreaPixels, commitCrop]);

  const shouldShowOverlayHint =
    !disabled &&
    !!onFileSelect &&
    (!enableCropZoom || !pendingFile || (enableCropZoom && pendingFile && zoom === 1));

  const aspect = clampAspect(cropAspectRatio ?? ASPECT_DEFAULT);

  const [cropSize, setCropSize] = useState<{ width: number; height: number } | undefined>(undefined);
  const [mediaSize, setMediaSize] = useState<{ width: number; height: number } | null>(null);
  const [minZoom, setMinZoom] = useState(1);

  useEffect(() => {
    if (!enableCropZoom) return;
    const el = containerRef.current;
    if (!el) return;

    const updateSize = () => {
      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      setCropSize({ width: rect.width, height: rect.height });
    };

    updateSize();

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(() => updateSize());
      observer.observe(el);
      return () => observer.disconnect();
    }

    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [enableCropZoom]);

  // Recompute minimum zoom so the image always fully COVERS the crop box (no blank space).
  // react-easy-crop's zoom is relative to a "fit" baseline, so we convert the
  // COVER requirement into that zoom space.
  useEffect(() => {
    if (!enableCropZoom) return;
    if (!cropSize || !mediaSize?.width || !mediaSize.height) return;
    const coverX = cropSize.width / mediaSize.width;
    const coverY = cropSize.height / mediaSize.height;
    // Base "fit" scale is the smaller ratio; easy-crop's zoom multiplies this.
    const fitScale = Math.min(coverX, coverY);
    const coverScale = Math.max(coverX, coverY);
    // In zoom space, 1 = fitScale, so cover zoom = coverScale / fitScale.
    const nextMinZoom = coverScale / fitScale || 1;
    setMinZoom(nextMinZoom);
    setZoom((prev) => (prev < nextMinZoom ? nextMinZoom : prev));
  }, [enableCropZoom, cropSize, mediaSize]);

  return (
    <div className={`${className} select-none`}>
      {label && (
        <label className="mb-1 block text-sm font-medium text-muted-foreground">
          {label}
        </label>
      )}

      <div
        ref={containerRef}
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
        onDragOver={
          disabled
            ? undefined
            : (e) => {
                e.preventDefault();
                setDragOver(true);
              }
        }
        onDragLeave={disabled ? undefined : () => setDragOver(false)}
        onClick={() => {
          if (disabled) return;
          if (suppressNextClickRef.current) {
            suppressNextClickRef.current = false;
            return;
          }
          inputRef.current?.click();
        }}
        style={
          enableCropZoom
            ? {
                aspectRatio: aspect,
                width: "100%",
                maxHeight: "none",
              }
            : (() => {
                const ratio = imageAspectRatio ?? ASPECT_DEFAULT;
                const isPortrait = ratio < 1;
                return {
                  aspectRatio: ratio,
                  ...(isPortrait
                    ? {
                        height: "16rem",
                        width: "auto",
                        maxWidth: "100%",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }
                    : { maxHeight: "16rem" }),
                };
              })()
        }
        className={
          disabled
            ? `relative w-full max-w-full max-h-64 min-h-0 overflow-hidden rounded-lg border border-gray-500 bg-light-secondary dark:bg-dark-tertiary flex items-center justify-center select-none`
            : `relative w-full max-w-full max-h-64 min-h-0 overflow-hidden rounded-lg border-2 flex items-center justify-center cursor-pointer transition-colors duration-200 group select-none
          ${dragOver
              ? "border-dashed border-primary-green bg-primary-green/10"
              : displaySrc
                ? "border-solid border-gray-500 hover:border-dashed hover:border-gray-400"
                : "border-dashed border-gray-500 hover:border-gray-400 bg-light-secondary dark:bg-dark-tertiary"}`
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
          enableCropZoom ? (
            <>
              <Cropper
                image={displaySrc}
                crop={crop}
                zoom={zoom}
                aspect={aspect}
                cropSize={cropSize}
                onCropChange={setCrop}
                minZoom={minZoom}
                maxZoom={minZoom * MAX_ZOOM_MULTIPLIER}
                onZoomChange={(value) => {
                  const maxZoom = minZoom * MAX_ZOOM_MULTIPLIER;
                  const clamped = Math.max(minZoom, Math.min(maxZoom, value));
                  setZoom(clamped);
                }}
                onCropComplete={handleCropComplete}
                cropShape="rect"
                showGrid={false}
                restrictPosition={true}
                onMediaLoaded={(media) => {
                  const width = (media as any).naturalWidth ?? (media as any).width;
                  const height = (media as any).naturalHeight ?? (media as any).height;
                  if (!width || !height) return;
                  setMediaSize({ width, height });
                }}
                onInteractionStart={() => {
                  suppressNextClickRef.current = true;
                }}
                onInteractionEnd={() => {
                  void commitCrop();
                }}
              />
              {!disabled && pendingFile && (
                <div
                  className="pointer-events-none absolute inset-x-3 bottom-3 z-10 flex items-center gap-2 text-[10px] text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  onMouseDown={(e) => {
                    suppressNextClickRef.current = true;
                    e.stopPropagation();
                  }}
                >
                  <span className="whitespace-nowrap">Zoom</span>
                  <input
                    type="range"
                    min={minZoom}
                    max={minZoom * MAX_ZOOM_MULTIPLIER}
                    step={0.05}
                    value={zoom}
                    onChange={(e) => {
                      const raw = Number(e.target.value) || minZoom;
                      const maxZoom = minZoom * MAX_ZOOM_MULTIPLIER;
                      const clamped = Math.max(minZoom, Math.min(maxZoom, raw));
                      setZoom(clamped);
                    }}
                    onMouseUp={(e) => {
                      e.stopPropagation();
                      void commitCrop();
                    }}
                    onTouchEnd={(e) => {
                      e.stopPropagation();
                      void commitCrop();
                    }}
                    className="pointer-events-auto flex-1 accent-primary-green"
                  />
                </div>
              )}
            </>
          ) : (
            <>
              <img
                ref={setImgRef}
                key={displaySrc}
                src={displaySrc}
                alt=""
                className="absolute inset-0 size-full object-cover pointer-events-none select-none"
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                onLoad={(e) => applyRatioFromImg(e.currentTarget)}
              />
            </>
          )
        ) : (
          <p className="relative z-10 text-sm text-muted-foreground text-center px-4">
            {disabled
              ? "No thumbnail"
              : "Drop image here or click to choose"}
          </p>
        )}

        {/* Shared filename pill (both modes) */}
        {pendingFile != null && !disabled && (
          <div className="pointer-events-none absolute left-2 right-20 top-2 z-20 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <span className="pointer-events-none inline-block max-w-full truncate rounded-full bg-black/60 px-2 py-0.5 text-[11px] text-white">
              {pendingFile.name}
            </span>
          </div>
        )}

        {/* Shared action buttons (both modes) */}
        {!disabled && onFileSelect && displaySrc && (
          <div className="pointer-events-none absolute right-2 top-2 z-20 flex gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                inputRef.current?.click();
              }}
              className="pointer-events-auto rounded-full bg-black/60 p-1.5 text-white hover:bg-emerald-500/90"
              aria-label="Change image"
            >
              <ImageIcon className="size-4" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleFile(null);
              }}
              className="pointer-events-auto rounded-full bg-black/60 p-1.5 text-white hover:bg-red-500/90"
              aria-label="Remove thumbnail"
            >
              <TrashIcon className="size-4" />
            </button>
          </div>
        )}

        {shouldShowOverlayHint && displaySrc && !enableCropZoom && (
          <div
            className={`pointer-events-none absolute inset-0 z-1 flex items-center justify-center bg-black/50 transition-opacity duration-200 ${dragOver ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
            aria-hidden
          >
            <p className="text-sm text-white text-center px-4 pointer-events-none">
              Drop image here or click to choose
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
