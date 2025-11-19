"use client";

import projectsApi from "@/lib/api/handlers/projects";
import { Project, ProjectFilters, ProjectSortKeys, ProjectPayload, projectSortKeys } from "@/lib/types/api/projects";
import { useRef } from "react";
import { Table, TableRef } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";

export default function ProjectsPage() {
  const tableRef = useRef<TableRef | null>(null);

  const createProject = () => {
    const projectName = prompt("Please enter a project name:");

    if (projectName != null) {
      projectsApi.create({
        name: projectName,
      }).then(project => window.location.href = `/projects/${project.id}`);
    }
  };

  return (
    <div className="mx-20 my-5">
      <Table<Project, ProjectPayload, ProjectFilters, ProjectSortKeys, typeof projectsApi>
        ref={tableRef}
        label="Projects"
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
        extras={(
          <>
            <Button
              onClick={createProject}
              className="btn-confirm"
            >
              Create Project
            </Button>
          </>
        )}
      />
    </div>
  );
}
