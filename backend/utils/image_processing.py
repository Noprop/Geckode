"""
Process uploaded images: strip EXIF and resize to a reasonable resolution
while preserving aspect ratio. Used for avatars and thumbnails.
"""
from __future__ import annotations

import io
from django.core.files.base import ContentFile

try:
    from PIL import Image
except ImportError:
    Image = None  # type: ignore[misc, assignment]

# Maximum width or height; aspect ratio is preserved.
MAX_DIMENSION = 1024

# JPEG quality when saving as JPEG (no transparency).
JPEG_QUALITY = 85


def process_uploaded_image(uploaded_file) -> ContentFile | None:
    """
    Strip EXIF and resize an uploaded image to at most MAX_DIMENSION per side.
    Returns a ContentFile suitable for assigning to an ImageField, or None
    if the file is not a processable image.
    """
    if Image is None:
        return None

    if not getattr(uploaded_file, "read", None):
        return None

    try:
        uploaded_file.seek(0)
        image = Image.open(uploaded_file).convert("RGB")
    except Exception:
        try:
            uploaded_file.seek(0)
            image = Image.open(uploaded_file)
            if image.mode in ("RGBA", "P"):
                image = image.convert("RGBA")
            else:
                image = image.convert("RGB")
        except Exception:
            try:
                uploaded_file.seek(0)
            except Exception:
                pass
            return None

    # Strip EXIF by re-encoding: we never pass exif to save().
    # Resize if either dimension exceeds MAX_DIMENSION.
    w, h = image.size
    if w > MAX_DIMENSION or h > MAX_DIMENSION:
        if w >= h:
            new_w = MAX_DIMENSION
            new_h = max(1, round(h * MAX_DIMENSION / w))
        else:
            new_h = MAX_DIMENSION
            new_w = max(1, round(w * MAX_DIMENSION / h))
        image = image.resize((new_w, new_h), Image.Resampling.LANCZOS)

    buffer = io.BytesIO()
    ext = _get_extension(uploaded_file)
    has_alpha = image.mode == "RGBA"

    if has_alpha and ext.lower() == "png":
        image.save(buffer, format="PNG", optimize=True)
        suffix = ".png"
    else:
        if has_alpha:
            image = image.convert("RGB")
        image.save(buffer, format="JPEG", quality=JPEG_QUALITY, optimize=True)
        suffix = ".jpg"

    buffer.seek(0)
    return ContentFile(buffer.read(), name=f"processed{suffix}")


def _get_extension(uploaded_file) -> str:
    name = getattr(uploaded_file, "name", None) or ""
    if "." in name:
        return name.rsplit(".", 1)[-1].lower()
    return ""
