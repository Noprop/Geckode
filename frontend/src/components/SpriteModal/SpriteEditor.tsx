'use client';

import { useEffect, useState } from 'react';
import * as Blockly from 'blockly/core';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { Button } from '../ui/Button';
import { useGeckodeStore } from '@/stores/geckodeStore';
import EditorScene from '@/phaser/scenes/EditorScene';
import { PixelCanvasEditorLayout } from '@/components/PixelCanvasEditorLayout';
import { PixelEditorToolbar } from '@/components/PixelEditorToolbar';
import { useCanvasZoom } from '@/hooks/useCanvasZoom';
import { usePixelCanvas } from '@/hooks/usePixelCanvas';
import { usePixelEditorDrawing } from '@/hooks/usePixelEditorDrawing';
import { createUniqueSpriteName, createUniqueTextureName } from '@/stores/slices/spriteSlice';
import type { SpriteInstance } from '@/blockly/spriteRegistry';
import { addSpriteSync } from '@/hooks/yjs/useWorkspaceSync';
import { type Tool } from '../SpriteModal/EditorTools';

const BRUSH_PREVIEW_TOOLS: Tool[] = ['pen', 'line', 'rectangle', 'oval'];

const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const normalized = hex.trim();
  const fullHex = normalized.length === 4
    ? `#${normalized[1]}${normalized[1]}${normalized[2]}${normalized[2]}${normalized[3]}${normalized[3]}`
    : normalized;
  const match = /^#([0-9a-f]{6})$/i.exec(fullHex);
  if (!match) return null;
  return {
    r: Number.parseInt(match[1].slice(0, 2), 16),
    g: Number.parseInt(match[1].slice(2, 4), 16),
    b: Number.parseInt(match[1].slice(4, 6), 16),
  };
};

const SpriteEditor = () => {
  // --- UI state (drives rendering) ---
  const [spriteName, setSpriteName] = useState('mySprite');
  const [brushSize, setBrushSize] = useState(1);
  const [primaryColor, setPrimaryColor] = useState('#10b981');
  const [secondaryColor, setSecondaryColor] = useState('#3b82f6');
  const [activeTool, setActiveTool] = useState<Tool>('pen');
  const [gridWidth, setGridWidth] = useState(16);
  const [gridHeight, setGridHeight] = useState(16);
  const [isCanvasDirty, setIsCanvasDirty] = useState(false);

  // --- Zustand selectors ---
  const setIsSpriteModalOpen = useGeckodeStore((s) => s.setIsSpriteModalOpen);
  const clearSpriteModalContext = useGeckodeStore((s) => s.clearSpriteModalContext);
  const setAsset = useGeckodeStore((s) => s.setAsset);
  const removeAsset = useGeckodeStore((s) => s.removeAsset);
  const updateSpriteInstance = useGeckodeStore((s) => s.updateSpriteInstance);
  const libaryTextures = useGeckodeStore((s) => s.libaryTextures);
  const textures = useGeckodeStore((s) => s.textures);
  const editingSource = useGeckodeStore((s) => s.editingSource);
  const editingAssetName = useGeckodeStore((s) => s.editingAssetName);
  const editingTextureToLoad = useGeckodeStore((s) => s.editingTextureToLoad);
  const spriteModalMode = useGeckodeStore((s) => s.spriteModalMode);
  const spriteModalSaveTargetTextureName = useGeckodeStore((s) => s.spriteModalSaveTargetTextureName);
  const selectedSpriteId = useGeckodeStore((s) => s.selectedSpriteId);
  const phaserScene = useGeckodeStore((s) => s.phaserScene);

  // --- Custom hooks ---
  const {
    cellSize,
    zoomIn,
    zoomOut,
    canZoomIn,
    canZoomOut,
    canvasContainerRef,
    scrollContainerRef,
  } = useCanvasZoom(gridWidth, gridHeight, { zoomStep: 10 });

  // Integer display dimensions so canvas internal resolution matches CSS size (1:1 scaling).
  // Avoids checkerboard 2x2 chunk artifacts from non-integer scale factors.
  const canvasDisplayW = Math.round(gridWidth * cellSize);
  const canvasDisplayH = Math.round(gridHeight * cellSize);

  const {
    canvasRef,
    previewRef,
    outputPixelsRef,
    previewPixelsRef,
    hoverPixelsRef,
    hoverEraseMaskRef,
    clearHoverPreview,
    requestRender,
    saveToHistory,
    undo,
    redo,
    clearCanvas,
    resetPixelArrays,
  } = usePixelCanvas(gridWidth, gridHeight, cellSize, 0.5, {
    canvasSize: { w: canvasDisplayW, h: canvasDisplayH },
  });
  const { canvasPointerDown } = usePixelEditorDrawing({
    canvasRef,
    outputPixelsRef,
    previewPixelsRef,
    requestRender,
    saveToHistory,
    gridWidth,
    gridHeight,
    brushSize,
    primaryColor,
    secondaryColor,
    activeTool,
    setPrimaryColor,
    onMarkDirty: () => setIsCanvasDirty(true),
  });

  const swapColors = () => {
    setPrimaryColor(secondaryColor);
    setSecondaryColor(primaryColor);
  };

  const updateHover = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(((e.clientX - rect.left) / rect.width) * gridWidth);
    const y = Math.floor(((e.clientY - rect.top) / rect.height) * gridHeight);
    if (x < 0 || x >= gridWidth || y < 0 || y >= gridHeight) { clearHover(); return; }

    clearHoverPreview();
    const offset = Math.floor(brushSize / 2);
    const startX = Math.max(0, x - offset);
    const startY = Math.max(0, y - offset);
    const endX = Math.min(gridWidth, x - offset + brushSize);
    const endY = Math.min(gridHeight, y - offset + brushSize);

    if (activeTool === 'eraser') {
      const hoverEraseMask = hoverEraseMaskRef.current;
      for (let py = startY; py < endY; py++) {
        for (let px = startX; px < endX; px++) {
          hoverEraseMask[py * gridWidth + px] = 1;
        }
      }
      requestRender();
      return;
    }

    if (!BRUSH_PREVIEW_TOOLS.includes(activeTool)) {
      requestRender();
      return;
    }

    const useSecondaryColor = (e.buttons & 2) === 2 || e.button === 2;
    const previewColor = useSecondaryColor ? secondaryColor : primaryColor;
    const rgb = hexToRgb(previewColor);
    if (!rgb) {
      requestRender();
      return;
    }

    const hoverPixels = hoverPixelsRef.current;
    for (let py = startY; py < endY; py++) {
      for (let px = startX; px < endX; px++) {
        const idx = (py * gridWidth + px) * 4;
        hoverPixels[idx] = rgb.r;
        hoverPixels[idx + 1] = rgb.g;
        hoverPixels[idx + 2] = rgb.b;
        hoverPixels[idx + 3] = 255;
      }
    }
    requestRender();
  };

  const clearHover = () => {
    clearHoverPreview();
    requestRender();
  };

  useEffect(() => {
    if (!activeTool) return;
    clearHoverPreview();
    requestRender();
  }, [activeTool, clearHoverPreview, requestRender]);

  const closeSpriteModal = () => {
    useGeckodeStore.setState({ editingSource: null, editingAssetName: null, editingAssetType: null, editingTextureToLoad: null });
    clearSpriteModalContext();
    setIsSpriteModalOpen(false);
  };

  const createBase64FromCanvas = () => {
    const offscreen = document.createElement('canvas');
    offscreen.width = gridWidth;
    offscreen.height = gridHeight;
    const ctx = offscreen.getContext('2d')!;
    const imageData = ctx.createImageData(gridWidth, gridHeight);
    imageData.data.set(outputPixelsRef.current);
    ctx.putImageData(imageData, 0, 0);
    return offscreen.toDataURL('image/png');
  };

  const createAndInsertSprite = (textureName: string) => {
    if (!phaserScene) throw new Error('Phaser scene is not ready.');

    const { spriteInstances: currentInstances } = useGeckodeStore.getState();
    const newSpriteName = createUniqueSpriteName(spriteName, currentInstances);

    const newSprite: SpriteInstance = {
      name: newSpriteName,
      textureName: textureName,
      id: `id_${Date.now()}`,
      x: 0,
      y: 0,
      visible: true,
      scaleX: 1,
      scaleY: 1,
      direction: 0,
      snapToGrid: true,
    };

    // Only manipulate Phaser sprites in EditorScene
    if (phaserScene instanceof EditorScene) {
      phaserScene.createSprite(newSprite);
    }

    // Add sprite to state and sync (will be created in EditorScene when user switches back)
    useGeckodeStore.setState((s) => ({
      spriteInstances: [...s.spriteInstances, newSprite],
      selectedSpriteId: newSprite.id,
      spriteWorkspaces: {
        ...s.spriteWorkspaces,
        [newSprite.id]: new Blockly.Workspace(),
      },
    }));

    addSpriteSync(newSprite);
  };

  const handlePrimaryAction = async () => {
    if (spriteName.trim().length === 0) return;

    const base64Image = createBase64FromCanvas();
    const {
      editingSource: currentEditingSource,
      editingAssetName: currentEditingAssetName,
      spriteModalMode: currentSpriteModalMode,
      spriteModalSaveTargetTextureName: currentSaveTargetTextureName,
      textures: currentTextures,
    } = useGeckodeStore.getState();
    const isEditorScene = phaserScene instanceof EditorScene;

    if (!phaserScene) throw new Error('Phaser scene is not ready.');

    if (currentSpriteModalMode === 'phaser_edit') {
      const targetTextureName = currentSaveTargetTextureName ?? currentEditingAssetName;
      if (!targetTextureName) return;

      const requestedTextureName = spriteName.trim();
      const isTargetLibraryTexture = targetTextureName in libaryTextures;
      const desiredTextureName = requestedTextureName.length > 0 ? requestedTextureName : targetTextureName;
      const nextTextureName = isTargetLibraryTexture
        ? createUniqueTextureName(desiredTextureName, { ...currentTextures, ...libaryTextures })
        : desiredTextureName;
      const shouldRenameTexture = nextTextureName !== targetTextureName;

      setAsset(nextTextureName, base64Image, 'textures');

      if (shouldRenameTexture) {
        if (isTargetLibraryTexture) {
          // Editing a library-backed sprite should only retarget the sprite being edited.
          if (selectedSpriteId) {
            updateSpriteInstance(selectedSpriteId, { textureName: nextTextureName });
          }
        } else {
          const currentState = useGeckodeStore.getState();

          currentState.spriteInstances
            .filter((sprite) => sprite.textureName === targetTextureName)
            .forEach((sprite) => {
              // Keep all sprite texture references in sync locally and in Yjs.
              updateSpriteInstance(sprite.id, { textureName: nextTextureName });
            });

          removeAsset(targetTextureName, 'textures');
        }
      }

      if (isEditorScene) {
        await phaserScene.updateSpriteTextureAsync(nextTextureName, base64Image);
      }

      closeSpriteModal();
      return;
    }

    if (currentSpriteModalMode === 'asset_manager') {
      const targetTextureName =
        currentSaveTargetTextureName ?? (currentEditingSource === 'asset' ? currentEditingAssetName : null);
      if (targetTextureName) {
        const requestedTextureName = spriteName.trim();
        const shouldRenameTexture =
          currentEditingSource === 'asset'
          && requestedTextureName.length > 0
          && requestedTextureName !== targetTextureName;

        if (shouldRenameTexture) {
          const renamedTextureName = requestedTextureName;

          setAsset(renamedTextureName, base64Image, 'textures');

          const currentState = useGeckodeStore.getState();
          currentState.spriteInstances
            .filter((sprite) => sprite.textureName === targetTextureName)
            .forEach((sprite) => {
              // Keep sprite texture references in sync locally and in Yjs.
              updateSpriteInstance(sprite.id, { textureName: renamedTextureName });
            });

          removeAsset(targetTextureName, 'textures');

          if (isEditorScene) {
            await phaserScene.updateSpriteTextureAsync(renamedTextureName, base64Image);
          }
        } else {
          setAsset(targetTextureName, base64Image, 'textures');
          if (isEditorScene) {
            await phaserScene.updateSpriteTextureAsync(targetTextureName, base64Image);
          }
        }
      } else {
        const newTextureName = createUniqueTextureName(spriteName, { ...currentTextures, ...libaryTextures });
        setAsset(newTextureName, base64Image, 'textures');
      }
      closeSpriteModal();
      return;
    }

    if (currentEditingSource === 'library' && currentEditingAssetName && !isCanvasDirty) {
      const libraryTextureBase64 = libaryTextures[currentEditingAssetName];
      if (!libraryTextureBase64) return;
      console.log('texture name added library: ', currentEditingAssetName);
      if (isEditorScene) {
        await phaserScene.loadSpriteTextureAsync(currentEditingAssetName, libraryTextureBase64);
      }
      createAndInsertSprite(currentEditingAssetName);
      closeSpriteModal();
      return;
    }

    if (currentEditingSource === 'asset' && currentEditingAssetName && !isCanvasDirty) {
      const existingTextureBase64 = currentTextures[currentEditingAssetName];
      if (!existingTextureBase64) return;
      if (isEditorScene) {
        await phaserScene.loadSpriteTextureAsync(currentEditingAssetName, existingTextureBase64);
      }
      createAndInsertSprite(currentEditingAssetName);
      closeSpriteModal();
      return;
    }

    const newTextureName = createUniqueTextureName(spriteName, { ...currentTextures, ...libaryTextures });
    setAsset(newTextureName, base64Image, 'textures');

    console.log('texture name added new: ', newTextureName);

    if (isEditorScene) {
      await phaserScene.loadSpriteTextureAsync(newTextureName, base64Image);
    }

    createAndInsertSprite(newTextureName);
    closeSpriteModal();
  };

  // Load existing texture when editing from library or asset (use offscreen canvas to avoid checkerboard in pixel data)
  useEffect(() => {
    if (editingSource === null || editingAssetName === null || !canvasRef.current) return;

    // When editing an asset and user picked a library texture, load that but keep save target as editingAssetName
    const textureInfo =
      editingTextureToLoad != null
        ? (libaryTextures[editingTextureToLoad] ?? textures[editingTextureToLoad])
        : editingSource === 'library'
          ? libaryTextures[editingAssetName]
          : (textures[editingAssetName] ?? libaryTextures[editingAssetName]);
    if (!textureInfo) return;

    const img = new Image();
    img.onload = () => {
      const width = img.width;
      const height = img.height;

      setGridWidth(width);
      setGridHeight(height);

      const offscreen = document.createElement('canvas');
      offscreen.width = width;
      offscreen.height = height;
      const offCtx = offscreen.getContext('2d')!;
      offCtx.drawImage(img, 0, 0);
      const imageData = offCtx.getImageData(0, 0, width, height);

      resetPixelArrays(width, height);
      outputPixelsRef.current = new Uint8ClampedArray(imageData.data);
      setSpriteName(editingAssetName);
      setIsCanvasDirty(false);
      requestRender();
    };
    img.src = textureInfo;
  }, [editingSource, editingAssetName, editingTextureToLoad, libaryTextures, textures]);

  // --- Grid resize handler (used by uncontrolled inputs) ---
  const handleGridResize = (dimension: 'width' | 'height', value: string) => {
    if (value === '') return;
    const parsed = Math.max(1, Math.min(1024, parseInt(value, 10)));
    if (Number.isNaN(parsed)) return;
    const newW = dimension === 'width' ? parsed : gridWidth;
    const newH = dimension === 'height' ? parsed : gridHeight;
    if (newW === gridWidth && newH === gridHeight) return;
    resetPixelArrays(newW, newH);
    setIsCanvasDirty(true);
    if (dimension === 'width') setGridWidth(parsed);
    else setGridHeight(parsed);
  };

  const handleClearCanvas = () => {
    clearCanvas();
    setIsCanvasDirty(true);
  };

  const isSaveMode = spriteModalMode === 'phaser_edit' || spriteModalMode === 'asset_manager';
  const isAddMode = spriteModalMode === 'phaser_add';
  const isNameEmpty = spriteName.trim().length === 0;
  const isSaveDisabled =
    isSaveMode && spriteModalMode === 'asset_manager' && editingSource === 'library' && !isCanvasDirty;
  const isMissingEditTarget =
    spriteModalMode === 'phaser_edit' && !spriteModalSaveTargetTextureName && !editingAssetName;
  const isPrimaryActionDisabled = isSaveDisabled || isMissingEditTarget || isNameEmpty;
  const namePlaceholder =
    spriteModalMode === 'asset_manager'
      ? 'Texture name'
      : spriteModalMode === 'phaser_edit'
        ? 'Updated texture name'
        : 'New sprite name';

  return (
    <div className='flex-1 min-h-0 flex border-t border-slate-200 bg-slate-800 dark:border-slate-700'>
      <PixelEditorToolbar
        brushSize={brushSize}
        setBrushSize={setBrushSize}
        activeTool={activeTool}
        setActiveTool={setActiveTool}
        primaryColor={primaryColor}
        setPrimaryColor={setPrimaryColor}
        secondaryColor={secondaryColor}
        swapColors={swapColors}
        gridWidth={gridWidth}
        gridHeight={gridHeight}
        onGridResize={handleGridResize}
      />

      <div className='flex-1 flex flex-col min-h-0 overflow-hidden'>
        <PixelCanvasEditorLayout
          canvasContainerRef={canvasContainerRef}
          scrollContainerRef={scrollContainerRef}
          undo={undo}
          redo={redo}
          zoomIn={zoomIn}
          zoomOut={zoomOut}
          canZoomIn={canZoomIn}
          canZoomOut={canZoomOut}
          clearButton={{ onClick: handleClearCanvas }}
        >
          <canvas
            ref={canvasRef}
            className="cursor-crosshair select-none touch-none"
            style={{
              width: canvasDisplayW,
              height: canvasDisplayH,
              imageRendering: 'pixelated',
            }}
            onPointerDown={canvasPointerDown}
            onPointerMove={updateHover}
            onPointerLeave={clearHover}
            onContextMenu={(e) => e.preventDefault()}
          />
        </PixelCanvasEditorLayout>

        {/* Bottom row; preview, name, and add to game */}
        <div className='h-16 flex items-center gap-3 px-4 bg-slate-700 dark:bg-slate-800 border-t border-slate-600 shrink-0'>
          <canvas
            ref={previewRef}
            className='w-10 h-10 rounded border border-slate-500'
            style={{ imageRendering: 'pixelated' }}
          />
          <input
            type='text'
            value={spriteName}
            onChange={(e) => setSpriteName(e.target.value)}
            placeholder={namePlaceholder}
            className='flex-1 h-9 px-3 rounded bg-slate-600 border border-slate-500 text-sm text-white placeholder:text-slate-400 outline-none focus:border-primary-green'
          />
          <Button
            className='btn-confirm h-9 px-4'
            onClick={handlePrimaryAction}
            disabled={isPrimaryActionDisabled}
            title={
              isNameEmpty
                ? 'Enter a name'
                : isSaveMode
                ? isSaveDisabled
                  ? 'Make a canvas edit before saving'
                  : 'Save changes'
                : isAddMode
                  ? 'Add to game'
                  : 'Primary action'
            }
          >
            {isSaveMode ? 'Save' : 'Add to Game'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SpriteEditor;
