"use client";

import projectsApi from "@/lib/api/handlers/projects";
import {
  Project,
  ProjectFilters,
  ProjectSortKeys,
  ProjectPayload,
  projectSortKeys,
} from "@/lib/types/api/projects";
import { useRef, useState } from "react";
import { Table, TableRef } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { InputBox, InputBoxRef } from "@/components/ui/InputBox";
import { useSnackbar } from "@/hooks/useSnackbar";
import DragAndDrop, { DragAndDropRef } from "@/components/DragAndDrop";
import { convertFormData } from "@/lib/api/base";
import { FilePlusIcon, TrashIcon } from "@radix-ui/react-icons";

export default function ProjectsPage() {
  const showSnackbar = useSnackbar();

  const dropboxRef = useRef<DragAndDropRef>(null);
  const tableRef = useRef<TableRef<Project> | null>(null);
  const projectNameRef = useRef<InputBoxRef | null>(null);
  const autoProjectOpenRef = useRef<InputBoxRef | null>(null);

  const [showModal, setShowModal] = useState<null | "create" | "delete">(null);

  const createProject = () => {
    projectsApi
      .create(
        convertFormData<ProjectPayload>({
          name: projectNameRef?.current?.inputValue || "",
          thumbnail:
            dropboxRef.current?.files?.length! > 0
              ? dropboxRef.current?.files![0]
              : null,
        })
      )
      .then((project) => {
        if (autoProjectOpenRef.current?.isChecked) {
          window.location.href = `/projects/${project.id}`;
        } else {
          tableRef.current?.refresh();
          setShowModal(null);
        }
      });
  };

  const deleteProject = () => {
    const projectId = tableRef.current?.data[tableRef.current?.dataIndex]["id"];

    if (!projectId) return;

    projectsApi(projectId)
      .delete()
      .then((res) => {
        showSnackbar("Succesfully deleted the project!", "success");
        setShowModal(null);
        tableRef.current?.refresh();
      })
      .catch((err) =>
        showSnackbar("Something went wrong. Please try again.", "error")
      );
  };

  return (
    <div className="mx-20 my-5">
      <Table<
        Project,
        ProjectPayload,
        ProjectFilters,
        ProjectSortKeys,
        typeof projectsApi
      >
        ref={tableRef}
        label="Projects"
        api={projectsApi}
        columns={{
          id: {
            key: "id",
            hidden: true,
          },
          Thumbnail: {
            key: "thumbnail",
            type: "thumbnail",
          },
          Name: {
            key: "name",
          },
          Owner: {
            key: "owner",
            type: "user",
          },
          "Created At": {
            key: "created_at",
            type: "datetime",
          },
        }}
        sortKeys={projectSortKeys}
        defaultSortField="updated_at"
        defaultSortDirection="desc"
        handleRowClick={(row) =>
          (window.location.href = `/projects/${row.getValue("id")}/`)
        }
        actions={[
          {
            rowIcon: TrashIcon,
            rowIconSize: 24,
            rowIconClicked: () => setShowModal("delete"),
            rowIconClassName: "hover:text-red-500 mt-1",
            canUse: (project) => project.permission === "owner",
          },
        ]}
        extras={
          <>
            <Button
              onClick={() => setShowModal("create")}
              className="btn-confirm"
            >
              Create Project
            </Button>
          </>
        }
      />

      {showModal === "create" ? (
        <Modal
          onClose={() => setShowModal(null)}
          title="Create project"
          icon={FilePlusIcon}
          actions={
            <>
              <Button onClick={createProject} className="btn-confirm ml-3">
                Create
              </Button>
              <Button
                onClick={() => setShowModal(null)}
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
            <p>Project Thumbnail:</p>
            <DragAndDrop ref={dropboxRef} accept="image/*" multiple={false} />
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
      ) : showModal === "delete" ? (
        <Modal
          className="bg-red-500"
          onClose={() => setShowModal(null)}
          title={`Delete project (${
            tableRef.current?.data?.[tableRef.current.dataIndex]["name"]
          })`}
          icon={TrashIcon}
          actions={
            <>
              <Button onClick={deleteProject} className="btn-deny ml-3">
                Delete
              </Button>
              <Button
                onClick={() => setShowModal(null)}
                className="btn-neutral"
              >
                Cancel
              </Button>
            </>
          }
        >
          Are you sure you would like to delete this project? This is a
          permanent change that cannot be undone.
        </Modal>
      ) : null}
    </div>
  );
}
