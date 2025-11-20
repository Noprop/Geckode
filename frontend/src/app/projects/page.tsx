"use client";

import projectsApi from "@/lib/api/handlers/projects";
import { Project, ProjectFilters, ProjectSortKeys, ProjectPayload, projectSortKeys } from "@/lib/types/api/projects";
import { useRef, useState } from "react";
import { Table, TableRef } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { InputBox, InputBoxRef } from "@/components/ui/InputBox";

export default function ProjectsPage() {
  const tableRef = useRef<TableRef | null>(null);
  const projectNameRef = useRef<InputBoxRef | null>(null);
  const autoProjectOpenRef = useRef<InputBoxRef | null>(null);

  const [showProjectCreateModal, setShowProjectCreateModal] = useState<boolean>(false);

  const createProject = () => {
    projectsApi.create({
      name: projectNameRef?.current?.inputValue || '',
    }).then(project => {
      if (autoProjectOpenRef.current?.isChecked) {
        window.location.href = `/projects/${project.id}`;
      } else {
        tableRef.current?.refresh();
        setShowProjectCreateModal(false);
      }
    });
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
              onClick={() => setShowProjectCreateModal(true)}
              className="btn-confirm"
            >
              Create Project
            </Button>
          </>
        )}
      />

      {showProjectCreateModal ? (
        <Modal
          onClose={() => setShowProjectCreateModal(false)}
          title="Create project"
          icon="file-plus"
          actions={
            <>
              <Button
                onClick={createProject}
                className="btn-confirm ml-3"
              >
                Create
              </Button>
              <Button
                onClick={() => setShowProjectCreateModal(false)}
                className="btn-neutral"
              >
                Cancel
              </Button>
            </>
          }
        >
          Please enter a name for your project:
          <div className="flex flex-col">
            <InputBox
              ref={projectNameRef}
              placeholder="Project name"
              className="bg-white text-black my-3 border-0"
            />
            <div className="flex align-center">
              <InputBox
                ref={autoProjectOpenRef}
                type="checkbox"
                defaultChecked={true}
                className="mr-2"
              />
              Automatically open the project after creation
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
