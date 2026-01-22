"use client";

import { YjsProvider } from '@/contexts/YjsContext';
// doing this so that we can call import * as Phaser from 'phaser' in both scenes.
// may not be the most optimal fix, however, I want this it play nicely with TS.
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
const ProjectView = dynamic(() => import('@/components/ProjectView'), { ssr: false });

const ProjectPage = () => {
  const { projectID } = useParams();

  return (
    <YjsProvider>
      <ProjectView projectId={Number(projectID)}/>
    </YjsProvider>
  );
};

export default ProjectPage;
