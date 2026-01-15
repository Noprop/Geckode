"use client";

import { useParams } from "next/navigation";
import ProjectView from '@/components/ProjectView';
import { useEditorStore } from '@/stores/editorStore';
import { useEffect } from 'react';

const ProjectPage = () => {
  const { projectID } = useParams();

  const { setProjectId } = useEditorStore();
  useEffect(() => {
    setProjectId(Number(projectID));
  }, [projectID, setProjectId]);

  return <ProjectView projectId={Number(projectID)} />;
};

export default ProjectPage;
