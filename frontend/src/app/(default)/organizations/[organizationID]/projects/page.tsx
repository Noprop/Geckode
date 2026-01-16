"use client";

import organizationsApi from "@/lib/api/handlers/organizations";
import {
  OrganizationProject,
  OrganizationProjectFilters,
  OrganizationProjectPayload,
  organizationProjectSortKeys,
  OrganizationProjectSortKeys,
} from "@/lib/types/api/organizations/projects";
import { useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Table, TableRef } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/modals/Modal";
import { InputBox, InputBoxRef } from "@/components/ui/inputs/InputBox";
import { useSnackbar } from "@/hooks/useSnackbar";
import projectsApi from "@/lib/api/handlers/projects";
import { Project, ProjectPermissions } from "@/lib/types/api/projects";
import { projectPermissions } from "@/lib/types/api/projects";
import DragAndDrop, { DragAndDropRef } from "@/components/DragAndDrop";
import {
  ExclamationTriangleIcon,
  FilePlusIcon,
  TrashIcon,
} from "@radix-ui/react-icons";

export default function ProjectsPage() {
  const showSnackbar = useSnackbar();

  const { organizationID } = useParams();
  const orgProjectsApi = organizationsApi(Number(organizationID)).projects;

  const dropboxRef = useRef<DragAndDropRef>(null);
  const tableRef = useRef<TableRef<
    OrganizationProject,
    OrganizationProjectFilters
  > | null>(null);
  const projectNameRef = useRef<InputBoxRef | null>(null);
  const autoProjectOpenRef = useRef<InputBoxRef | null>(null);
  const permissionDropdownView = useRef<HTMLSelectElement | null>(null);

  const [showModal, setShowModal] = useState<null | "create" | "delete">(null);
  const [rowIndex, setRowIndex] = useState<number>(0);

  const createProject = () => {
    // first create project with projects API, then register it as an org project with orgProjectsApi
    console.log({
      name: projectNameRef?.current?.inputValue || "",
      thumbnail:
        dropboxRef.current?.files?.length! > 0
          ? dropboxRef.current?.files![0]
          : null,
    });
    projectsApi
      .create({
        name: projectNameRef?.current?.inputValue || "",
        thumbnail:
          dropboxRef.current?.files?.length! > 0
            ? dropboxRef.current?.files![0]
            : null,
      })
      .then((project) => {
        const _permission = permissionDropdownView.current?.value ?? "view";
        orgProjectsApi
          .create({
            project_id: project.id,
            permission: _permission as ProjectPermissions,
          })
          .then(() => {
            if (autoProjectOpenRef.current?.isChecked) {
              window.location.href = `/projects/${project.id}`;
            } else {
              tableRef.current?.refresh();
              setShowModal(null);
            }
          })
          .catch(() => {
            showSnackbar("Assigning project to organization failed!", "error");
            projectsApi(project.id).delete(); // remove project from database
          });
      })
      .catch(() => showSnackbar("Creating project failed!", "error"));
  };

  const deleteProject = () => {
    const projectId = tableRef.current?.data[rowIndex]["project"]["id"];

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
      <h1 className="header-1">Projects</h1>
      <Table<
        OrganizationProject,
        OrganizationProjectPayload,
        OrganizationProjectFilters,
        OrganizationProjectSortKeys,
        typeof orgProjectsApi
      >
        ref={tableRef}
        api={orgProjectsApi}
        columns={{
          id: {
            key: "project",
            value: (orgProj: Project) => orgProj.id,
            hidden: true,
          },
          Thumbnail: {
            key: "project",
            value: (orgProj: Project) => orgProj.thumbnail,
            type: "thumbnail",
          },
          Name: {
            key: "project",
            value: (orgProj: Project) => orgProj.name,
          },
          Owner: {
            key: "project",
            value: (orgProj: Project) => orgProj.owner,
            type: "user",
          },
          "Created At": {
            key: "project",
            value: (orgProj: Project) => orgProj.created_at,
            type: "datetime",
          },
        }}
        sortKeys={organizationProjectSortKeys}
        defaultSortDirection="desc"
        handleRowClick={(row) =>
          (window.location.href = `/projects/${
            (row.getValue("id") as Project).id
          }/`)
        }
        actions={[
          {
            rowIcon: TrashIcon,
            rowIconSize: 24,
            rowIconClicked: (index) => {
              setRowIndex(index);
              setShowModal("delete");
            },
            rowIconClassName: "hover:text-red-500 mt-1",
            canUse: (project) => project.permission === "admin",
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
        rowStyle="py-2"
      />

      {showModal === "create" ? (
        <Modal
          title="Create Project"
          icon={FilePlusIcon}
          actions={
            <>
              <Button onClick={createProject} className="btn-confirm ml-3">
                Create
              </Button>
              <Button
                onClick={() => {
                  setShowModal(null);
                }}
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
              className="bg-white text-black mb-3 border-0"
            />
            <p>Default user permission:</p>
            <select
              ref={permissionDropdownView}
              className="bg-white text-black mb-3 p-2 rounded-md"
            >
              {Object.entries(projectPermissions).map((p) => (
                <option key={p[0]} value={p[0]}>
                  {p.join(" - ")}
                </option>
              ))}
            </select>
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
          title="Delete Project"
          subtitle={tableRef.current?.data?.[rowIndex].project["name"]}
          icon={ExclamationTriangleIcon}
          actions={
            <>
              <Button onClick={deleteProject} className="btn-deny ml-3">
                Delete
              </Button>
              <Button
                onClick={() => {
                  setShowModal(null);
                  dropboxRef.current?.setFiles([]);
                }}
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
