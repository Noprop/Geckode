"use client";

import projectsApi from "@/lib/api/handlers/projects";
import { Project, ProjectFilters } from "@/lib/types/api/projects";
import { useState, useEffect, useRef } from "react";
import { authApi } from "@/lib/api/auth";
import { Table, TableRef } from "@/components/ui/Table";

export default function ProjectsPage() {
  const tableRef = useRef<TableRef| null>(null);
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
    tableRef?.current?.refresh();
  };

  const createProject = () => {
    const projectName = prompt("Project name");

    if (projectName != null) {
      projectsApi.create({
        name: projectName,
      }).then(project => window.location.href = `/projects/${project.id}`);
    }
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
            <button
              onClick={createProject}
              className="ml-10 h-min btn btn-confirm p-2"
            >
              Create
            </button>
          </div>
          <Table<Project, ProjectFilters>
            ref={tableRef}
            data={projects}
            columns={{
              id: {
                hidden: true,
              },
              thumbnail: {
                type: 'thumbnail',
              },
              name: {
                label: 'Name',
              },
              owner: {
                label: 'Owner',
                type: 'user'
              },
              updated_at: {
                label: 'Last Updated',
                type: 'datetime',
              },
              created_at: {
                label: 'Created at',
                type: 'datetime',
              },
            }}
            handleRowClick={(row) => window.location.href = `/projects/${row.getValue('id')}/`}
          />
        </>
      ) : (
        <h2 className="flex text-center justify-center text-rose-300">
          {errMsg}
        </h2>
      )}
    </div>
  );
}
