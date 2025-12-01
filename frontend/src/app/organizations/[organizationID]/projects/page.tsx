"use client";

import organizationsApi from "@/lib/api/handlers/organizations";
import { OrganizationProject, OrganizationProjectFilter, OrganizationProjectPayload, organizationProjectSortKeys, OrganizationProjectSortKeys } from "@/lib/types/api/organizations/projects";
import { useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Table, TableRef } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { InputBox, InputBoxRef } from "@/components/ui/InputBox";
import { useSnackbar } from "@/hooks/useSnackbar";
import projectsApi from "@/lib/api/handlers/projects";
import { Project } from "@/lib/types/api/projects";

export default function ProjectsPage() {
  const showSnackbar = useSnackbar();

  const { _oid } = useParams();
  const orgProjectsApi = organizationsApi(Number(_oid)).projects;

  const tableRef = useRef<TableRef<OrganizationProject> | null>(null);
  const projectNameRef = useRef<InputBoxRef | null>(null);
  const autoProjectOpenRef = useRef<InputBoxRef | null>(null);

  const [showModal, setShowModal] = useState<null | "create" | "delete">(null);
  const createProject = () => {
    // first create project with projects API, then register it as an org project with orgProjectsApi
    projectsApi
      .create({
        name: projectNameRef?.current?.inputValue || "",
      })
      .then((project) => {
        orgProjectsApi.create({ project_id: project.id, permission: "view" }).then(() => {
          if (autoProjectOpenRef.current?.isChecked) {
            window.location.href = `/projects/${project.id}`;
          } else {
            tableRef.current?.refresh();
            setShowModal(null);
          }
        });
      });
  };

  const deleteProject = () => {
    const projectId = tableRef.current?.data[tableRef.current?.dataIndex]["project"]["id"];

    if (!projectId) return;

    projectsApi(projectId)
      .delete()
      .then((res) => {
        showSnackbar("Succesfully deleted the project!", "success");
        setShowModal(null);
        tableRef.current?.refresh();
      })
      .catch((err) => showSnackbar("Something went wrong. Please try again.", "error"));
  };

  return (
    <div className="mx-20 my-5">
      <Table<OrganizationProject, OrganizationProjectPayload, OrganizationProjectFilter, OrganizationProjectSortKeys, typeof orgProjectsApi>
        ref={tableRef}
        label="Projects"
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
        defaultSortField="project"
        defaultSortDirection="desc"
        handleRowClick={(row) => (window.location.href = `/projects/${row.getValue("id")}/`)}
        actions={[
          {
            rowIcon: "trash",
            rowIconSize: 24,
            rowIconClicked: () => setShowModal("delete"),
            rowIconClassName: "hover:text-red-500 mt-1",
            canUse: (project) => project.permission === "owner",
          },
        ]}
        extras={
          <>
            <Button onClick={() => setShowModal("create")} className="btn-confirm">
              Create Project
            </Button>
          </>
        }
      />

      {showModal === "create" ? (
        <Modal
          onClose={() => setShowModal(null)}
          title="Create project"
          icon="file-plus"
          actions={
            <>
              <Button onClick={createProject} className="btn-confirm ml-3">
                Create
              </Button>
              <Button onClick={() => setShowModal(null)} className="btn-neutral">
                Cancel
              </Button>
            </>
          }
        >
          Please enter a name for your project:
          <div className="flex flex-col">
            <InputBox ref={projectNameRef} placeholder="Project name" className="bg-white text-black my-3 border-0" />
            <div className="flex align-center">
              <InputBox ref={autoProjectOpenRef} type="checkbox" defaultChecked={true} className="mr-2" />
              Automatically open the project after creation
            </div>
          </div>
        </Modal>
      ) : showModal === "delete" ? (
        <Modal
          className="bg-red-500"
          onClose={() => setShowModal(null)}
          title={`Delete project (${tableRef.current?.data?.[tableRef.current.dataIndex].project["name"]})`}
          icon="warning"
          actions={
            <>
              <Button onClick={deleteProject} className="btn-deny ml-3">
                Delete
              </Button>
              <Button onClick={() => setShowModal(null)} className="btn-neutral">
                Cancel
              </Button>
            </>
          }
        >
          Are you sure you would like to delete this project? This is a permanent change that cannot be undone.
        </Modal>
      ) : null}
    </div>
  );
}
