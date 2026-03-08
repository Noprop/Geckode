'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Share1Icon } from '@radix-ui/react-icons';
import { useGeckodeStore } from '@/stores/geckodeStore';
import { useSnackbar } from '@/hooks/useSnackbar';
import { ProjectShareModal } from '../ui/modals/ProjectShareModal';
import { Project } from '@/lib/types/api/projects';
import projectsApi from '@/lib/api/handlers/projects';

export default function ProjectControls(): ReactNode {
  const showSnackbar = useSnackbar();
  const {
    projectId,
    projectName,
    setProjectName,
    saveProject,
    persistence,
    canEditProject,
    projectPermission,
    enablePersistence,
    disablePersistence,
  } = useGeckodeStore();
  const documentName = String(projectId ?? '');
  const [persistenceOn, setPersistenceOn] = useState<boolean>(false);
  const [shareModalProjectData, setShareModalProjectData] = useState<Project | null>(null);

  useEffect(() => {
    setPersistenceOn(!!persistence);
  }, [persistence]);

  useEffect(() => {
    setShareModalProjectData((data) => (data ? { ...data, permission: projectPermission, name: projectName } : null));
  }, [projectPermission, projectName]);

  const handleSave = () => {
    saveProject(showSnackbar);
  };

  const handleTogglePersistence = () => {
    if (persistenceOn) {
      disablePersistence(documentName);
      setPersistenceOn(false);
    } else {
      enablePersistence(documentName);
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
          className='px-3 header-line-edit'
          style={{ width: '160px' }}
          disabled={!canEditProject}
        />
        {canEditProject && (
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
        )}
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
        <button
          onClick={() => {
            if (!projectId) return;
            projectsApi(projectId)
              .get()
              .then((project) => {
                setShareModalProjectData(project);
              })
              .catch(() => {
                showSnackbar('Was not able to fetch project data. Please try again.', 'error');
              });
          }}
          title='Share Project'
          className='header-btn'
        >
          <Share1Icon className='w-4 h-4' />
        </button>
      </div>

      {shareModalProjectData && (
        <ProjectShareModal onClose={() => setShareModalProjectData(null)} project={shareModalProjectData} />
      )}
    </>
  );
}
