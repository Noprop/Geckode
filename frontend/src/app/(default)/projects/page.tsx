"use client";

import projectsApi from "@/lib/api/handlers/projects";
import {
  Project,
  ProjectFilters,
  ProjectSortKeys,
  ProjectPayload,
  projectSortKeys,
} from "@/lib/types/api/projects";
import { useEffect, useRef, useState } from "react";
import { Table, TableRef } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/modals/Modal";
import { InputBox, InputBoxRef } from "@/components/ui/inputs/InputBox";
import { useSnackbar } from "@/hooks/useSnackbar";
import DragAndDrop, { DragAndDropRef } from "@/components/DragAndDrop";
import { convertFormData } from "@/lib/api/base";
import {
  FilePlusIcon,
  GearIcon,
  Share1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { ProjectShareModal } from "@/components/ui/modals/ProjectShareModal";
import { SelectionBox } from "@/components/ui/selectors/SelectionBox";
import { useUser } from "@/contexts/UserContext";
import { useLayout } from "@/contexts/LayoutProvider";
import { useRouter } from "next/navigation";

export default function ProjectsPage() {
  const router = useRouter();
  const showSnackbar = useSnackbar();
  const user = useUser();

  const dropboxRef = useRef<DragAndDropRef>(null);
  const tableRef = useRef<TableRef<Project, ProjectFilters> | null>(null);
  const projectNameRef = useRef<InputBoxRef | null>(null);
  const autoProjectOpenRef = useRef<InputBoxRef | null>(null);

  const [showModal, setShowModal] = useState<
    null | "create" | "delete" | "share"
  >(null);
  const [rowIndex, setRowIndex] = useState<number>(0);

  const layout = useLayout();
  useEffect(() => {
    layout.attachFooterLHS(<p>Hello</p>);
  }, []);

  const createProject = () => {
    projectsApi
      .create(
        convertFormData<ProjectPayload>({
          name: projectNameRef?.current?.inputValue || "",
          ...((dropboxRef.current?.files?.length ?? 0) > 0
            ? {
                thumnail: dropboxRef.current?.files![0],
              }
            : {}),
          permission: "owner",
        }),
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
    const projectId = tableRef.current?.data[rowIndex]["id"];

    if (!projectId) return;

    projectsApi(projectId)
      .delete()
      .then((res) => {
        showSnackbar("Succesfully deleted the project!", "success");
        setShowModal(null);
        tableRef.current?.refresh();
      })
      .catch((err) =>
        showSnackbar("Something went wrong. Please try again.", "error"),
      );
  };

  return (
    <div className="mx-20 my-5">
      <div className="flex w-full">
        <h1 className="header-1">Projects</h1>
        <div className="flex w-full justify-end"></div>
      </div>

      <Table<
        Project,
        ProjectPayload,
        ProjectFilters,
        ProjectSortKeys,
        typeof projectsApi
      >
        ref={tableRef}
        api={projectsApi}
        columns={{
          id: {
            key: "id",
            hidden: true,
          },
          Thumbnail: {
            key: "thumbnail",
            type: "thumbnail",
            hideLabel: true,
            style: "w-20",
          },
          Name: {
            key: "name",
            style: "min-w-50",
          },
          Owner: {
            key: "owner",
            type: "user",
          },
          "Created At": {
            key: "created_at",
            type: "datetime",
          },
          "Updated At": {
            key: "updated_at",
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
            rowIcon: Share1Icon,
            rowIconSize: 24,
            rowIconClicked: (index) => {
              setRowIndex(index);
              setShowModal("share");
            },
            rowIconClassName: "hover:text-green-500 mt-1",
            canUse: (project) =>
              ["owner", "admin", "manage", "invite"].includes(
                project.permission ?? "",
              ),
          },
          {
            rowIcon: TrashIcon,
            rowIconSize: 24,
            rowIconClicked: (index) => {
              setRowIndex(index);
              setShowModal("delete");
            },
            rowIconClassName: "hover:text-red-500 mt-1",
            canUse: (project) => project.permission === "owner",
          },
          {
            rowIcon: GearIcon,
            rowIconSize: 24,
            rowIconClassName: "transition-transform hover:rotate-22",
            rowIconClicked: (index) => {
              router.push(
                `/projects/${tableRef.current?.data?.[index].id}/settings`,
              );
            },
          },
        ]}
        extras={
          <div className="flex grow justify-between">
            <SelectionBox
              options={[
                { value: "", label: "Owned by anyone" },
                { value: user?.id ?? "", label: "Owned by me" },
                { value: "0", label: "Owned by others" },
              ]}
              onChange={(e) => {
                tableRef.current?.setFilters((filters) => ({
                  ...filters,
                  ...{
                    owner: e.target.value ? Number(e.target.value) : undefined,
                  },
                }));
              }}
            />
            <Button
              onClick={() => setShowModal("create")}
              className="btn-confirm"
            >
              Create Project
            </Button>
          </div>
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
          title="Delete Project"
          subtitle={tableRef.current?.data?.[rowIndex]["name"]}
          text="Are you sure you would like to delete this project? This is a
                permanent change that cannot be undone."
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
        />
      ) : showModal === "share" && tableRef.current?.data?.[rowIndex] ? (
        <ProjectShareModal
          onClose={() => setShowModal(null)}
          project={tableRef.current?.data?.[rowIndex]}
        />
      ) : null}
    </div>
  );
}
