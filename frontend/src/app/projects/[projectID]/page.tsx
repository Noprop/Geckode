"use client";

import { useParams } from "next/navigation";
import ProjectView from '@/components/ProjectView';

const ProjectPage = () => {
  const { projectID } = useParams();

  return (
      <ProjectView projectID={Number(projectID)} />
  );
};

export default ProjectPage;