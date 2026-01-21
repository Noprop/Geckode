"use client";

import { useParams } from "next/navigation";
import ProjectView from '@/components/ProjectView';
import { YjsProvider } from "@/contexts/YjsContext";

const ProjectPage = () => {
  const { projectID } = useParams();

  return (
    <YjsProvider>
      <ProjectView projectId={Number(projectID)} />
    </YjsProvider>
  );
};

export default ProjectPage;