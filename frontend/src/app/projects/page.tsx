"use client";

import projectsApi from "@/lib/api/handlers/projects";
import { Project, ProjectFilters, ProjectSortKeys, ProjectPayload, projectSortKeys } from "@/lib/types/api/projects";
import { useState, useRef } from "react";
import { Table, TableRef } from "@/components/ui/Table";

export default function ProjectsPage() {
  const tableRef = useRef<TableRef | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);

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
          <Table<Project, ProjectPayload, ProjectFilters, ProjectSortKeys, typeof projectsApi>
            ref={tableRef}
            api={projectsApi}
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
            sortKeys={projectSortKeys}
            defaultSortField="updated_at"
            defaultSortDirection="desc"
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
