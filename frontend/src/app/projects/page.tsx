"use client";
import projectsApi from "@/lib/api/projects";
import { Project } from "@/lib/types/api/projects";
import { useState, useEffect, useRef } from "react";
import { ProjectTable, ProjectTableRef } from "./ProjectTable";
import { authApi } from "@/lib/api/auth";

export default function ProjectsPage() {
  const tableRef = useRef<ProjectTableRef | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProjects = async () => {
      try {
        const userInfo = await authApi.getUserDetails();
        const res = await projectsApi.list({ owner: userInfo.id });
        if (isMounted) {
          setProjects(res.results);
        }
      } catch (err) {
        setErrMsg(
          "Failed to fetch projects! Please refresh page or try again later."
        );
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
      {!errMsg ? (
        <>
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
        </>
      ) : (
        <h2 className="flex text-center justify-center text-rose-300">
          {errMsg}
        </h2>
      )}
    </div>
  );
}
