import { useMemo, useRef } from 'react';
import { useGeckodeStore } from '@/stores/geckodeStore';
import { useTilePixelCache, rebuildPixelBuffer } from '@/hooks/useTilePixelCache';
import { TILE_PX } from '@/stores/slices/spriteSlice';
import type { Tilemap } from '@/stores/slices/types';

function buildTilemapPreview(
  tilemap: Tilemap,
  cache: Record<string, Uint8ClampedArray>,
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
): string | null {
  const w = tilemap.width;
  const h = tilemap.height;
  const pixelW = w * TILE_PX;
  const pixelH = h * TILE_PX;
  const buf = new Uint8ClampedArray(pixelW * pixelH * 4);
  rebuildPixelBuffer(buf, tilemap.data, cache, w, h, TILE_PX);

  const hasContent = buf.some((v, i) => i % 4 === 3 && v > 0);
  if (!hasContent) return null;

  if (!canvasRef.current) canvasRef.current = document.createElement('canvas');
  const canvas = canvasRef.current;
  canvas.width = pixelW;
  canvas.height = pixelH;
  const ctx = canvas.getContext('2d')!;
  const imgData = ctx.createImageData(pixelW, pixelH);
  imgData.data.set(buf);
  ctx.putImageData(imgData, 0, 0);
  return canvas.toDataURL('image/png');
}

const PhaserSceneList = () => {
  const setIsSpriteModalOpen = useGeckodeStore((state) => state.setIsSpriteModalOpen);
  const setSpriteModalContext = useGeckodeStore((state) => state.setSpriteModalContext);
  const scenes = useGeckodeStore((s) => s.scenes);
  const tilemaps = useGeckodeStore((s) => s.tilemaps);
  const libaryTiles = useGeckodeStore((s) => s.libaryTiles);
  const tiles = useGeckodeStore((s) => s.tiles);
  const tileTextures = useMemo(() => ({ ...libaryTiles, ...tiles }), [libaryTiles, tiles]);
  const canEditProject = useGeckodeStore((s) => s.canEditProject);
  const { tilePixelsRef, isReady } = useTilePixelCache(tileTextures);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const previews = useMemo(() => {
    if (!isReady) return {} as Record<string, string | null>;
    const result: Record<string, string | null> = {};
    for (const scene of scenes) {
      const tilemap = tilemaps[scene.tilemapId];
      result[scene.id] = tilemap
        ? buildTilemapPreview(tilemap, tilePixelsRef.current, canvasRef)
        : null;
    }
    return result;
  }, [scenes, tilemaps, isReady, tileTextures]);

  const handleSceneClick = () => {
    if (!canEditProject) return;
    useGeckodeStore.setState({
      editingSource: 'new',
      editingAssetName: null,
      editingAssetType: 'textures',
    });
    setSpriteModalContext('phaser_add');
    setIsSpriteModalOpen(true);
  };

  return (
    <div className="w-1/4 flex flex-col pl-3 overflow-hidden">
      <div className="py-2">
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Scene</span>
      </div>

      <div className="flex-1 pt-2 flex flex-col gap-3 overflow-y-auto">
        {scenes.map((scene) => {
          const preview = previews[scene.id];
          return (
            <button
              key={scene.id}
              type="button"
              onClick={handleSceneClick}
              className="w-full rounded border border-slate-200 dark:border-slate-600 overflow-hidden cursor-pointer transition-all hover:border-primary-green hover:ring-2 hover:ring-primary-green/30 focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/30"
            >
              {preview ? (
                <img
                  src={preview}
                  alt={scene.name}
                  className="w-full aspect-4/3 object-cover bg-slate-50 dark:bg-dark-hover"
                  style={{ imageRendering: 'pixelated' }}
                  draggable={false}
                />
              ) : (
                  <div
                    className="w-full aspect-4/3"
                    style={{ background: 'repeating-linear-gradient(45deg, #bfdbfe 0px, #bfdbfe 8px, #93c5fd 8px, #93c5fd 16px)' }}
                  />
              )}
              <div className="px-2 py-1 bg-white dark:bg-dark-secondary border-t border-slate-200 dark:border-slate-600">
                <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">{scene.name}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PhaserSceneList;
