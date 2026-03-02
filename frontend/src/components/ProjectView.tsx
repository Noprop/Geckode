'use client';

import { useEffect } from 'react';
import BlocklyEditor from '@/components/BlocklyEditor';
import { useWorkspaceView } from '@/contexts/WorkspaceViewContext';
import { useGeckodeStore } from '@/stores/geckodeStore';
import Phaser from './PhaserPanel/Phaser';

import AssetWorkspace from './AssetManager/Overview';
import TilemapEditor from '@/components/ui/TilemapEditor';
import projectsApi from '@/lib/api/handlers/projects';
import assetsApi from '@/lib/api/handlers/assets';
import { useParams } from 'next/navigation';
import { useSnackbar } from '@/hooks/useSnackbar';
import { extractAxiosErrMsg } from '@/lib/api/axios';
import { useWorkspaceSync } from '@/hooks/yjs/useWorkspaceSync';
import useMultiDebounce from '@/hooks/useMultiDebounce';

// disable for now
// import { useBlockSync } from "@/hooks/yjs/useBlockSync";
// import { useVariableSync } from "@/hooks/yjs/useVariableSync";

// TODO: either delete or use this again
// const snapToGrid = (x: number, y: number): { x: number; y: number } => {
//   // Snap to grid lines that radiate from center
//   const snappedX = CENTER_X + Math.round((x - CENTER_X) / GRID_SIZE) * GRID_SIZE;
//   const snappedY = CENTER_Y + Math.round((y - CENTER_Y) / GRID_SIZE) * GRID_SIZE;
//   return { x: snappedX, y: snappedY };
// };

const ProjectView = () => {
  const { projectID } = useParams();
  const { view } = useWorkspaceView();
  const showSnackbar = useSnackbar();
  const {
    undoWorkspace,
    redoWorkspace,
    canUndo,
    canRedo,
    spriteIdsUpdated,
    isEditorScene,
    projectId,
    setProjectId,
    setAsset,
    addAssetId,
    addLibraryAsset,
  } = useGeckodeStore();
  const debouncedEditorChanges = useMultiDebounce({
    values: { spriteIdsUpdated, isEditorScene },
    delays: {
      isEditorScene: 100,
    },
    defaultDelay: 400,
  });

  // Keep store projectId in sync with route so Yjs documentRegistry resolves the right doc
  useEffect(() => {
    setProjectId(projectID != null && !Number.isNaN(projectID) ? Number(projectID) : null);

    // set project ID and pull all assets
    if (projectId) {
      const prjId = Number(projectID);

      projectsApi(prjId)
        .assetsApi.list({ asset_type: 'textures' })
        .then((res) => {
          for (var asset of res.results) {
            setAsset(asset.name, asset.asset, 'textures');
            addAssetId(asset.name, asset.id);
          }
        })
        .catch((err) => showSnackbar(extractAxiosErrMsg(err, 'Failed to get project assets!'), 'error'));

      assetsApi
        .list({ asset_type: 'textures' })
        .then((res) => {
          for (var asset of res.results) {
            addLibraryAsset(asset.name, asset.asset, 'libaryTextures');
          }
        })
        .catch((err) => showSnackbar(extractAxiosErrMsg(err, 'Failed to get library assets!'), 'error'));
    }

    return () => setProjectId(null);
  }, [projectID, setProjectId]);

  useWorkspaceSync(String(projectID ?? ''));

  // This handles generating the code after any changes
  useEffect(() => {
    console.log('debouncing editor changes to generate code', debouncedEditorChanges.spriteIdsUpdated);
    if (!debouncedEditorChanges.isEditorScene || !debouncedEditorChanges.spriteIdsUpdated.length) return;

    useGeckodeStore.setState({ isConverting: true });
    useGeckodeStore.getState().generateCode();

    // This timeout is to visually show that the code actual did generate (at least useful during development)
    const timeoutFunc = () => {
      useGeckodeStore.setState({ isConverting: false });
    };
    const timeout = setTimeout(timeoutFunc, 100);

    return () => {
      clearTimeout(timeout);
      timeoutFunc();
    };
  }, [debouncedEditorChanges]);

  return (
    <div className='flex h-[calc(100vh-4rem)]'>
      <div className='relative flex-1 min-h-0 min-w-0 bg-light-whiteboard dark:bg-dark-whiteboard mr-2 overflow-hidden'>
        <div
          className={`absolute inset-0 transition-opacity duration-150 ${
            view === 'blocks' ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          aria-hidden={view !== 'blocks'}
        >
          <BlocklyEditor />
        </div>
        <div
          className={`absolute inset-0 transition-opacity duration-150 ${
            view === 'tilemap' ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          aria-hidden={view !== 'tilemap'}
        >
          <TilemapEditor />
        </div>
        <div
          className={`absolute inset-0 transition-opacity duration-150 ${
            view === 'assets' ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          aria-hidden={view !== 'assets'}
        >
          <AssetWorkspace />
        </div>

        {view === 'blocks' && (
          <div className='absolute bottom-8 right-[30px] flex items-center gap-2.5 z-20 pointer-events-auto'>
            <button
              onClick={undoWorkspace}
              disabled={!canUndo}
              className={`
                w-10.5 h-10.5 flex items-center justify-center rounded text-white transition-all
                ${
                  canUndo
                    ? 'bg-primary-green hover:bg-primary-green/90 hover:translate-y-px hover:shadow-[0_2px_0_0_#1a5c3a] active:translate-y-[3px] active:shadow-none shadow-[0_4px_0_0_#1a5c3a] cursor-pointer'
                    : 'bg-slate-400 dark:bg-slate-600 shadow-[0_4px_0_0_#64748b] dark:shadow-[0_4px_0_0_#334155] opacity-90'
                }
              `}
              title='Undo'
            >
              <svg aria-hidden='true' focusable='false' viewBox='0 0 16 16' width='20' height='20' fill='currentColor'>
                <path d='M1.22 6.28a.749.749 0 0 1 0-1.06l3.5-3.5a.749.749 0 1 1 1.06 1.06L3.561 5h7.188l.001.007L10.749 5c.058 0 .116.007.171.019A4.501 4.501 0 0 1 10.5 14H8.796a.75.75 0 0 1 0-1.5H10.5a3 3 0 1 0 0-6H3.561L5.78 8.72a.749.749 0 1 1-1.06 1.06l-3.5-3.5Z'></path>
              </svg>
            </button>
            <button
              onClick={redoWorkspace}
              disabled={!canRedo}
              className={`
                w-10.5 h-10.5 flex items-center justify-center rounded text-white transition-all
                ${
                  canRedo
                    ? 'bg-primary-green hover:bg-primary-green/90 hover:translate-y-px hover:shadow-[0_2px_0_0_#1a5c3a] active:translate-y-[3px] active:shadow-none shadow-[0_4px_0_0_#1a5c3a] cursor-pointer'
                    : 'bg-slate-400 dark:bg-slate-600 shadow-[0_4px_0_0_#64748b] dark:shadow-[0_4px_0_0_#334155] opacity-90'
                }
              `}
              title='Redo'
            >
              <span
                style={{
                  display: 'inline-block',
                  transform: 'rotate(180deg) scaleY(-1)',
                }}
              >
                <svg
                  aria-hidden='true'
                  focusable='false'
                  viewBox='0 0 16 16'
                  width='20'
                  height='20'
                  fill='currentColor'
                >
                  <path d='M1.22 6.28a.749.749 0 0 1 0-1.06l3.5-3.5a.749.749 0 1 1 1.06 1.06L3.561 5h7.188l.001.007L10.749 5c.058 0 .116.007.171.019A4.501 4.501 0 0 1 10.5 14H8.796a.75.75 0 0 1 0-1.5H10.5a3 3 0 1 0 0-6H3.561L5.78 8.72a.749.749 0 1 1-1.06 1.06l-3.5-3.5Z'></path>
                </svg>
              </span>
            </button>
          </div>
        )}
      </div>

      <div className='flex flex-col pr-2 pt-2' style={{ width: '480px' }}>
        <Phaser />
      </div>
    </div>
  );
};

export default ProjectView;
