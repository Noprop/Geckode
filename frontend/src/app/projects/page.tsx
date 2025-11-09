"use client";
import projectsApi from "@/lib/api/projects";
import { Project } from "@/lib/types/projects";
import { useState, useEffect, useRef } from "react";
import { ProjectTable, ProjectTableRef } from "./ProjectTable";

export default function ProjectsPage() {
  const tableRef = useRef<ProjectTableRef | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    let isMounted = true; // helps avoid setting state after unmount

    const fetchProjects = async () => {
      try {
        const res = await projectsApi.list();
        if (isMounted) {
          setProjects(res.results);
        }
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      }
    };

    fetchProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  const onRefreshClicked = () => {
    tableRef?.current?.handleRefresh();
  };

  return (
    <div className="mx-20 my-5">
      <div className="flex items-center">
        <h1 className="text-3xl mb-2 font-bold">Projects</h1>
        <button
          onClick={onRefreshClicked}
          className="ml-10 h-min btn btn-confirm p-2"
        >
          Refresh
        </button>
      </div>
      <ProjectTable ref={tableRef} data={projects} />
    </div>
  );
}
