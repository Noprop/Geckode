"use client";

import organizationsApi from "@/lib/api/handlers/organizations";
import { authApi } from "@/lib/api/auth";
import {
  Organization,
  OrganizationFilters,
  OrganizationSortKeys,
  OrganizationPayload,
  organizationSortKeys,
} from "@/lib/types/api/organizations";
import { useEffect, useRef, useState } from "react";
import { Table, TableRef } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { InputBox, InputBoxRef } from "@/components/ui/InputBox";
import { useSnackbar } from "@/hooks/useSnackbar";
import DragAndDrop, { DragAndDropRef } from "@/components/DragAndDrop";

export default function OrganizationsPage() {
  const showSnackbar = useSnackbar();

  const dropboxRef = useRef<DragAndDropRef>(null);
  const tableRef = useRef<TableRef<Organization> | null>(null);
  const organizationNameRef = useRef<InputBoxRef | null>(null);
  const autoOrganizationOpenRef = useRef<InputBoxRef | null>(null);

  const [userId, setUserId] = useState<number>(-1);
  const [slug, setSlug] = useState<string>("");

  const [showModal, setShowModal] = useState<
    null | "create" | "delete" | "leave"
  >(null);

  useEffect(() => {
    const fetchUserInfo = () => {
      authApi
        .getUserDetails()
        .then((res) => {
          setUserId(res.id);
        })
        .catch((err) =>
          showSnackbar("Something went wrong. Please try again.", "error")
        );
    };

    fetchUserInfo();
  }, []);

  //spaces -> dashes, non-alphanumeric characters removed
  const createSlug = (val: string) => {
    setSlug(
      val
        .toLowerCase()
        .replace(/[^A-Za-z0-9_ -]/g, "")
        .trim()
        .replaceAll(" ", "-")
    );
  };

  const createOrganization = () => {
    const orgName = organizationNameRef?.current?.inputValue || "";
    organizationsApi
      .create({
        slug: slug,
        name: orgName,
        thumbnail:
          dropboxRef.current?.files?.length! > 0
            ? dropboxRef.current?.files![0]
            : null,
      })
      .then((organization) => {
        if (autoOrganizationOpenRef.current?.isChecked) {
          window.location.href = `/organizations/${organization.id}`;
        } else {
          tableRef.current?.refresh();
          setShowModal(null);
        }
      });
  };

  const deleteOrganization = () => {
    const organizationId =
      tableRef.current?.data[tableRef.current?.dataIndex]["id"];

    if (!organizationId) return;

    organizationsApi(organizationId)
      .delete()
      .then((res) => {
        showSnackbar("Succesfully deleted the organization!", "success");
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
        Organization,
        OrganizationPayload,
        OrganizationFilters,
        OrganizationSortKeys,
        typeof organizationsApi
      >
        ref={tableRef}
        label="Organizations"
        api={organizationsApi}
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
          "Created at": {
            key: "created_at",
            type: "datetime",
          },
        }}
        sortKeys={organizationSortKeys}
        defaultSortField="name"
        defaultSortDirection="desc"
        handleRowClick={(row) =>
          (window.location.href = `/organizations/${row.getValue(
            "id"
          )}/projects/`)
        }
        actions={[
          {
            rowIcon: "trash",
            rowIconSize: 24,
            rowIconClicked: () => setShowModal("delete"),
            rowIconClassName: "hover:text-red-500 mt-1",
            canUse: (organization) => organization.owner.id === userId,
          },
          {
            rowIcon: "leave",
            rowIconSize: 24,
            rowIconClicked: () => setShowModal("leave"),
            rowIconClassName: "hover:text-yellow-600 mt-1",
          },
        ]}
        extras={
          <>
            <Button
              onClick={() => setShowModal("create")}
              className="btn-confirm"
            >
              Create Organization
            </Button>
          </>
        }
      />

      {showModal === "create" ? (
        <Modal
          onClose={() => setShowModal(null)}
          title="Create organization"
          icon="file-plus"
          actions={
            <>
              <Button onClick={createOrganization} className="btn-confirm ml-3">
                Create
              </Button>
              <Button
                onClick={() => {
                  setShowModal(null);
                  setSlug("");
                }}
                className="btn-neutral"
              >
                Cancel
              </Button>
            </>
          }
        >
          Please enter a name for your organization:
          <div className="flex flex-col">
            <InputBox
              ref={organizationNameRef}
              placeholder="Organization name"
              className="bg-white text-black mt-3 border-0"
              onChange={(e) => createSlug(e.target.value)}
            />
            <p className="mt-3 mb-2 h-4 text-white">{slug}</p>
            <p>Organization Thumbnail:</p>
            <DragAndDrop ref={dropboxRef} accept="image/*" multiple={false} />
            <div className="flex align-center">
              <InputBox
                ref={autoOrganizationOpenRef}
                type="checkbox"
                defaultChecked={true}
                className="mr-2"
              />
              Automatically open the organization after creation
            </div>
          </div>
        </Modal>
      ) : showModal === "delete" ? (
        <Modal
          className="bg-red-500"
          onClose={() => setShowModal(null)}
          title={`Delete organization (${
            tableRef.current?.data?.[tableRef.current.dataIndex]["name"]
          })`}
          icon="warning"
          actions={
            <>
              <Button onClick={deleteOrganization} className="btn-deny ml-3">
                Delete
              </Button>
              <Button
                onClick={() => {
                  setShowModal(null);
                  setSlug("");
                }}
                className="btn-neutral"
              >
                Cancel
              </Button>
            </>
          }
        >
          Are you sure you would like to delete this organization? This is a
          permanent change that cannot be undone.
        </Modal>
      ) : showModal === "leave" ? (
        <Modal
          className="bg-yellow-600"
          onClose={() => setShowModal(null)}
          title={`Leave organization (${
            tableRef.current?.data?.[tableRef.current.dataIndex]["name"]
          })`}
          icon="warning"
          actions={
            <>
              <Button onClick={deleteOrganization} className="btn-warn ml-3">
                Leave
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
          Are you sure you would like to leave this organization? You may not be
          able to be added back
        </Modal>
      ) : null}
    </div>
  );
}
