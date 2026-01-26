'use client';

import { YjsProvider } from '@/contexts/YjsContext';
// doing this so that we can call import * as Phaser from 'phaser' in both scenes.
// may not be the most optimal fix, however, I want this to play nicely with TS.
import dynamic from 'next/dynamic';
const ProjectView = dynamic(() => import('@/components/ProjectView'), { ssr: false });

const ProjectPage = () => {
  return (
      <YjsProvider>
        <ProjectView />
      </YjsProvider>
    );
};

export default ProjectPage;
