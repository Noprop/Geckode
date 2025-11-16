"use client";

import { useParams } from "next/navigation";
import ProjectView from '@/components/ProjectView';

const ProjectPage = () => {
  const { projectID } = useParams();

  return (
      <ProjectView projectId={Number(projectID)} />
  );
};

export default ProjectPage;