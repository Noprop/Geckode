'use client';

import { ReactNode, useContext, useEffect, useState } from 'react';
import { ResetIcon } from '@radix-ui/react-icons';
import { useGeckodeStore } from '@/stores/geckodeStore';
import { useSnackbar } from '@/hooks/useSnackbar';
import { Modal } from '@/components/ui/modals/Modal';
import { YjsContext } from '@/contexts/YjsContext';

export default function ProjectControls(): ReactNode {
  const showSnackbar = useSnackbar();
  const { projectId, projectName, setProjectName, saveProject, persistence, canEditProject } = useGeckodeStore();
  const documentName = String(projectId ?? '');
  const yjsContext = useContext(YjsContext);
  const [showResetModal, setShowResetModal] = useState<boolean>(false);
  const [persistenceOn, setPersistenceOn] = useState<boolean>(false);

  useEffect(() => {
    setPersistenceOn(!!persistence);
  }, [persistence]);

  const handleSave = () => {
    saveProject(showSnackbar);
  };

  const handleResetClick = () => {
    setShowResetModal(true);
  };

  const handleResetConfirm = () => {
    if (yjsContext) {
      yjsContext.disablePersistence(documentName);
    }
    window.location.reload();
  };

  const handleResetCancel = () => {
    setShowResetModal(false);
  };

  const handleTogglePersistence = () => {
    if (!yjsContext) return;

    if (persistenceOn) {
      yjsContext.disablePersistence(documentName);
      setPersistenceOn(false);
    } else {
      yjsContext.enablePersistence(documentName);
      setPersistenceOn(true);
    }
  };

  return (
    <>
      <div className='flex items-center gap-2 ml-6'>
        <input
          type='text'
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder='Project Name'
          className='h-8 px-3 rounded-md bg-white/15 text-white text-sm placeholder-white/60 outline-none border border-white/20 transition focus:bg-white/25 focus:border-white/40'
          style={{ width: '160px' }}
          disabled={!canEditProject}
        />
        {canEditProject && (<>
          <button onClick={handleSave} title='Save Project' className='header-btn'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2.5'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='w-4 h-4'
            >
              <path d='M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z' />
              <polyline points='17 21 17 13 7 13 7 21' />
              <polyline points='7 3 7 8 15 8' />
            </svg>
          </button>
          <button onClick={handleResetClick} title='Reset Project' className='header-btn'>
            <ResetIcon className='w-4 h-4' />
          </button>
        </>)}
        {yjsContext && (
          <button
            onClick={handleTogglePersistence}
            title={persistenceOn ? 'Disable Browser Storage' : 'Enable Browser Storage'}
            className='header-btn'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='w-4 h-4'
            >
              {persistenceOn ? (
                <>
                  <ellipse cx='12' cy='6' rx='8' ry='3' />
                  <path d='M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6' />
                  <path d='M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6' />
                </>
              ) : (
                <>
                  <ellipse cx='12' cy='6' rx='8' ry='3' />
                  <path d='M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6' />
                  <path d='M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6' />
                  <line x1='3' y1='3' x2='21' y2='21' strokeWidth='2.5' />
                </>
              )}
            </svg>
          </button>
        )}
      </div>

      {showResetModal && (
        <Modal
          title='Reset Project'
          text='Are you sure you want to reset the project? This will clear all blocks and sprites, keeping only the default hero sprites. This action cannot be undone.'
          onClose={handleResetCancel}
          actions={
            <>
              <button
                onClick={handleResetConfirm}
                className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
              >
                Reset
              </button>
              <button
                onClick={handleResetCancel}
                className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
              >
                Cancel
              </button>
            </>
          }
        />
      )}
    </>
  );
}
