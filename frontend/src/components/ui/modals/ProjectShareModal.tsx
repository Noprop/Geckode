import { Share1Icon, PersonIcon, BackpackIcon, TrashIcon, Link2Icon, ReloadIcon, StarFilledIcon } from "@radix-ui/react-icons";
import { Modal } from "./Modal";
import { Button } from "../Button";
import { Project, projectPermissions } from "@/lib/types/api/projects";
import { useCallback, useEffect, useRef, useState } from "react";
import projectsApi from "@/lib/api/handlers/projects";
import {
  ProjectCollaborator,
  ProjectCollaboratorFilters,
  ProjectCollaboratorPayload,
  projectCollaboratorSortKeys,
  ProjectCollaboratorSortKeys,
} from "@/lib/types/api/projects/collaborators";
import { Table, TableColumns, TableRef } from "../Table";
import { useSnackbar } from "@/hooks/useSnackbar";
import TabSelector from "../selectors/TabSelector";
import { ApiModelSearchBox, ApiModelSearchBoxRef } from "../inputs/ApiModelSearchBox";
import usersApi from "@/lib/api/handlers/users";
import { User, UserFilters, UserPayload, UserSortKeys } from "@/lib/types/api/users";
import { BaseFilters } from "@/lib/types/api";
import { BaseApiInnerReturn, createBaseApi } from "@/lib/api/base";
import { Row } from "@tanstack/react-table";
import { Organization, OrganizationFilters, OrganizationPayload, OrganizationSortKeys } from "@/lib/types/api/organizations";
import {
  ProjectOrganization,
  ProjectOrganizationFilters,
  ProjectOrganizationPayload,
  projectOrganizationSortKeys,
  ProjectOrganizationSortKeys,
} from "@/lib/types/api/projects/organizations";
import organizationsApi from "@/lib/api/handlers/organizations";
import { ProjectShareLink, ProjectShareLinkPayload, ProjectShareLinkFilters, ProjectShareLinkSortKeys, projectShareLinkSortKeys } from "@/lib/types/api/projects/shareLinks";
import {
  PROJECT_COLLABORATOR_CHANGE_EVENT,
  PROJECT_ORGANIZATION_CHANGE_EVENT,
  PROJECT_SHARE_LINK_CHANGE_EVENT,
  PROJECT_DEFAULT_SHARE_LINK_CHANGE_EVENT,
} from "@/contexts/YjsContext";
import { InputBox } from "../inputs/InputBox";
import api from "@/lib/api/axios";
import { unwrap } from "@/lib/api/base";

interface CreateShareLinkFormProps {
  shareLinksApi: { create: (payload: ProjectShareLinkPayload) => Promise<unknown> };
  showSnackbar: (message: string, variant: "success" | "error") => void;
  onSuccess: () => void;
  compact?: boolean;
}

function CreateShareLinkForm({ shareLinksApi, showSnackbar, onSuccess, compact = false }: CreateShareLinkFormProps) {
  const [newLinkName, setNewLinkName] = useState("");
  const [isCreatingLink, setIsCreatingLink] = useState(false);

  const handleCreateLink = useCallback(() => {
    if (!newLinkName.trim()) {
      showSnackbar("Please provide a name for the share link.", "error");
      return;
    }
    setIsCreatingLink(true);
    (async () => {
      try {
        await shareLinksApi.create({ name: newLinkName.trim() });
        showSnackbar("Share link created.", "success");
        setNewLinkName("");
        onSuccess();
      } catch (err: any) {
        const msg =
          err?.response?.data?.yjs_blob?.[0] ?? err?.response?.data?.detail ?? "Failed to create share link.";
        showSnackbar(msg, "error");
      } finally {
        setIsCreatingLink(false);
      }
    })();
  }, [newLinkName, shareLinksApi, showSnackbar, onSuccess]);

  return (
    <div className={`flex items-center gap-2 ${compact ? "" : "mb-3"}`}>
      <div className={`flex flex-col ${compact ? "" : "flex-1"}`}>
        {!compact && (
          <label className="mb-1 block text-sm font-medium text-muted-foreground">
            New link name
          </label>
        )}
        <InputBox
          value={newLinkName}
          onChange={(e) => setNewLinkName(e.target.value)}
          placeholder="My playtest build"
          className={`bg-white text-black border-0 ${compact ? "w-64" : "w-full"}`}
        />
      </div>
      <Button
        onClick={handleCreateLink}
        disabled={isCreatingLink}
        className="btn-confirm whitespace-nowrap"
      >
        Create link
      </Button>
    </div>
  );
}

interface ProjectShareModalProps {
  onClose: () => void;
  project: Project;
  initialTab?: "users" | "organizations" | "links";
}

export const ProjectShareModal: React.FC<ProjectShareModalProps> = ({
  onClose = () => {},
  project,
  initialTab = "users",
}) => {
  const showSnackbar = useSnackbar();
  const collaboratorTableRef =
    useRef<TableRef<ProjectCollaborator, ProjectCollaboratorFilters>>(null);
  const organizationTableRef =
    useRef<TableRef<ProjectOrganization, ProjectOrganizationFilters>>(null);
  const shareLinksTableRef =
    useRef<TableRef<ProjectShareLink, ProjectShareLinkFilters>>(null);

  const [tab, setTab] = useState<"users" | "organizations" | "links">(initialTab);
  const [defaultShareLinkId, setDefaultShareLinkId] = useState<number | null>(project.default_share_link?.id ?? null);
  const [linkToRefresh, setLinkToRefresh] = useState<ProjectShareLink | null>(null);
  const [linkToDelete, setLinkToDelete] = useState<ProjectShareLink | null>(null);

  const projectApi = projectsApi(project.id);
  const collaboratorsApi = projectApi.collaborators;
  const projectOrganizationsApi = projectApi.organizations;
  const shareLinksApi = projectApi.shareLinksApi;
  const isProjectPermission = (value: unknown): value is keyof typeof projectPermissions =>
    typeof value === "string" && value in projectPermissions;

  const baseUrl =
    typeof window !== "undefined" ? window.location.origin : "";

  const refreshShareLinksTable = useCallback(() => {
    shareLinksTableRef.current?.refresh();
  }, []);

  const handleUserRowClick = useCallback(
    (row: Row<User>, onSuccess: () => void) => {
      collaboratorsApi
        .create({
          collaborator_id: Number(row.getValue("id")),
          permission: "view",
        })
        .then(() => {
          showSnackbar("Successfully added the user as a collaborator.", "success");
          collaboratorTableRef.current?.refresh();
          onSuccess();
        })
        .catch(() => {
          showSnackbar("An error occured when adding the user as a collaborator.", "error");
        });
    },
    [collaboratorsApi, showSnackbar]
  );

  const handleOrganizationRowClick = useCallback(
    (row: Row<Organization>, onSuccess: () => void) => {
      organizationsApi(row.getValue("id")).projects
        .create({
          project_id: project.id,
          permission: "view",
        })
        .then(() => {
          showSnackbar("Successfully shared the project with the organization.", "success");
          organizationTableRef.current?.refresh();
          onSuccess();
        })
        .catch(() => {
          showSnackbar("An error occured when sharing the project with the organization.", "error");
        });
    },
    [project.id, showSnackbar]
  );

  useEffect(() => {
    const handleProjectCollaboratorChange = (
      event: Event,
    ) => {
      if (tab !== "users") return;

      const customEvent = event as CustomEvent<{
        project_id: number;
        event: "collaborator_added" | "collaborator_permission_updated" | "collaborator_removed";
        collaborator_id: number;
        permission?: string | null;
        project_collaborator?: ProjectCollaborator | null;
      }>;
      const payload = customEvent.detail;

      if (!payload || payload.project_id !== project.id) return;

      if (
        payload.event === "collaborator_permission_updated" &&
        isProjectPermission(payload.permission)
      ) {
        const permission = payload.permission;
        collaboratorTableRef.current?.updateRowById(payload.collaborator_id, (row) => ({
          ...row,
          permission,
        }));
      } else if (payload.event === "collaborator_added" && payload.project_collaborator) {
        collaboratorTableRef.current?.addRowIfSpace(
          payload.collaborator_id,
          payload.project_collaborator,
        );
      } else if (payload.event === "collaborator_removed") {
        collaboratorTableRef.current?.removeRowById(payload.collaborator_id);
      }
    };

    window.addEventListener(
      PROJECT_COLLABORATOR_CHANGE_EVENT,
      handleProjectCollaboratorChange as EventListener,
    );

    return () => {
      window.removeEventListener(
        PROJECT_COLLABORATOR_CHANGE_EVENT,
        handleProjectCollaboratorChange as EventListener,
      );
    };
  }, [project.id, tab]);

  useEffect(() => {
    const handleProjectOrganizationChange = (
      event: Event,
    ) => {
      if (tab !== "organizations") return;

      const customEvent = event as CustomEvent<{
        project_id: number;
        event: "organization_added" | "organization_permission_updated" | "organization_removed";
        organization_id: number;
        project_organization_id?: number;
        permission?: string | null;
        project_organization?: ProjectOrganization | null;
      }>;
      const payload = customEvent.detail;

      if (!payload || payload.project_id !== project.id) return;

      if (
        payload.event === "organization_permission_updated" &&
        isProjectPermission(payload.permission)
      ) {
        const permission = payload.permission;
        organizationTableRef.current?.updateRowById(payload.organization_id, (row) => ({
          ...row,
          permission,
        }));
      } else if (payload.event === "organization_added" && payload.project_organization) {
        organizationTableRef.current?.addRowIfSpace(
          payload.organization_id,
          payload.project_organization,
        );
      } else if (payload.event === "organization_removed") {
        organizationTableRef.current?.removeRowById(payload.organization_id);
      }
    };

    window.addEventListener(
      PROJECT_ORGANIZATION_CHANGE_EVENT,
      handleProjectOrganizationChange as EventListener,
    );

    return () => {
      window.removeEventListener(
        PROJECT_ORGANIZATION_CHANGE_EVENT,
        handleProjectOrganizationChange as EventListener,
      );
    };
  }, [project.id, tab]);

  useEffect(() => {
    const handleProjectShareLinkChange = (
      event: Event,
    ) => {
      if (tab !== "links") return;

      const customEvent = event as CustomEvent<{
        project_id: number;
        event: "share_link_created" | "share_link_updated" | "share_link_deleted";
        share_link: ProjectShareLink;
      }>;
      const payload = customEvent.detail;

      if (!payload || payload.project_id !== project.id) return;

      const link = payload.share_link;
      if (!link || !shareLinksTableRef.current) return;

      if (payload.event === "share_link_deleted") {
        shareLinksTableRef.current.removeRowById(link.id);
      } else if (payload.event === "share_link_created") {
        shareLinksTableRef.current.addRowIfSpace(link.id, link);
      } else if (payload.event === "share_link_updated") {
        shareLinksTableRef.current.updateRowById(link.id, () => link);
      }
    };

    window.addEventListener(
      PROJECT_SHARE_LINK_CHANGE_EVENT,
      handleProjectShareLinkChange as EventListener,
    );

    return () => {
      window.removeEventListener(
        PROJECT_SHARE_LINK_CHANGE_EVENT,
        handleProjectShareLinkChange as EventListener,
      );
    };
  }, [project.id, tab]);

  useEffect(() => {
    const handleProjectDefaultShareLinkChange = (event: Event) => {
      const customEvent = event as CustomEvent<{
        project_id: number;
        default_share_link_id: number | null;
      }>;
      const payload = customEvent.detail;

      if (!payload || payload.project_id !== project.id) return;

      setDefaultShareLinkId(payload.default_share_link_id);
    };

    window.addEventListener(
      PROJECT_DEFAULT_SHARE_LINK_CHANGE_EVENT,
      handleProjectDefaultShareLinkChange as EventListener,
    );

    return () => {
      window.removeEventListener(
        PROJECT_DEFAULT_SHARE_LINK_CHANGE_EVENT,
        handleProjectDefaultShareLinkChange as EventListener,
      );
    };
  }, [project.id]);

  const contentOuterRef = useRef<HTMLDivElement | null>(null);
  const contentInnerRef = useRef<HTMLDivElement | null>(null);
  const [contentHeight, setContentHeight] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || typeof ResizeObserver === "undefined") {
      return;
    }

    const node = contentInnerRef.current;
    if (!node) return;

    const updateHeight = () => {
      setContentHeight(node.getBoundingClientRect().height);
    };

    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });

    resizeObserver.observe(node);
    updateHeight();

    return () => {
      resizeObserver.disconnect();
    };
  }, [tab]);

  return (
    <>
    <Modal
      className="bg-green-500 min-w-150"
      title="Share Project"
      subtitle={project.name}
      text="Share this project with specific users/organizations or create share links."
      icon={Share1Icon}
      actions={
        <div className="flex justify-between w-full">
          <TabSelector
            tab={tab}
            setTab={setTab}
            options={[
              { value: "users", label: "Users", icon: PersonIcon },
              { value: "organizations", label: "Organizations", icon: BackpackIcon },
              { value: "links", label: "Links", icon: Link2Icon },
            ]}
          />
          <Button
            onClick={onClose}
            className="btn-neutral"
          >
            Done
          </Button>
        </div>
      }
    >
      <div
        ref={contentOuterRef}
        className="w-full"
        style={{
          height: contentHeight !== null ? contentHeight : undefined,
          transition: "height 220ms cubic-bezier(0.16, 1, 0.3, 1)",
          overflow: "hidden",
        }}
      >
        <div ref={contentInnerRef}>
      {tab === 'users' ? <>
        <ProjectShareSearchBox<
          User,
          UserPayload,
          UserFilters,
          UserSortKeys,
          typeof usersApi
        >
          key="user-search"
          api={usersApi}
          placeholder="Search for a user by their username, first name, or last name..."
          noResultsMessage="No user found that has not already had this project shared with them."
          filters={{
            exclude_project: project.id,
          }}
          columns={{
            Avatar: {
              key: ".",
              type: "avatar",
              style: "w-14",
            },
            User: {
              key: ".",
              type: "user",
            }
          }}
          handleRowClick={handleUserRowClick}
          canUse={["owner", "admin", "invite"].includes(project.permission ?? '')}
        />
        <Table<
          ProjectCollaborator,
          ProjectCollaboratorPayload,
          ProjectCollaboratorFilters,
          ProjectCollaboratorSortKeys,
          typeof collaboratorsApi
        >
          key="collaborator-table"
          ref={collaboratorTableRef}
          api={collaboratorsApi}
          sortKeys={projectCollaboratorSortKeys}
          columns={{
            id: {
              key: ["collaborator", "id"],
              hidden: true,
            },
            Avatar: {
              key: "collaborator",
              type: "avatar",
              hideLabel: true,
              style: "w-14",
            },
            User: {
              key: "collaborator",
              type: "user",
              style: "w-50",
            },
            Permission: {
              key: "permission",
              type: "select",
              options: Object.entries(projectPermissions).map(([value, label], index) => {
                const entries = Object.entries(projectPermissions);
                const maxIndex =
                  project.permission in projectPermissions
                    ? Object.keys(projectPermissions).findIndex((p) => p === project.permission) + 1
                    : entries.length;

                return {
                  value,
                  label,
                  disabled: index >= maxIndex,
                };
              }),
              style: "w-40 pr-3",
              disabled: !["owner", "admin", "invite"].includes(project.permission ?? ''),
            }
          }}
          defaultSortField="id"
          defaultSortDirection="desc"
          getRowIdValue={(collaborator) => collaborator.collaborator.id}
          defaultPageSize={5}
          pageSizeOptions={[3, 5, 10]}
          enableSearch={false}
          rowStyle="py-2"
          noResultsMessage="This project has not been shared with any users yet."
          actions={[
            {
              rowIcon: TrashIcon,
              rowIconSize: 24,
              rowIconTitle: "Remove user from project",
              rowIconClicked: (index) => {
                const collaborator = collaboratorTableRef.current?.data[index];
                const collaboratorId = collaborator?.collaborator?.id;
                if (!collaboratorId) return;
                collaboratorsApi(collaboratorId)
                  .delete()
                  .then(() => {
                    showSnackbar("Succesfully removed the user from the project!", "success");
                    collaboratorTableRef.current?.refresh();
                  })
                  .catch(() =>
                    showSnackbar("Something went wrong. Please try again.", "error")
                  );
              },
              rowIconClassName: "hover:text-red-500 mt-1",
              canUse: () => ["owner", "admin"].includes(project.permission ?? ''),
            },
          ]}
        />
      </> : tab === 'organizations' ? <>
        <ProjectShareSearchBox<
          Organization,
          OrganizationPayload,
          OrganizationFilters,
          OrganizationSortKeys,
          typeof organizationsApi
        >
          key="organization-search"
          api={organizationsApi}
          placeholder="Search for an organization by their name or slug..."
          noResultsMessage="No organizations found that do not already have access to this project."
          filters={{
            exclude_project: project.id,
            user_has_permission: "contribute",
          }}
          columns={{
            id: {
              key: "id",
              hidden: true,
            },
            Thumbnail: {
              key: "thumbnail",
              type: "thumbnail",
              style: "w-18",
            },
            Name: {
              key: "name",
            },
            Slug: {
              key: "slug",
            },
          }}
          handleRowClick={handleOrganizationRowClick}
          canUse={["owner", "admin"].includes(project.permission ?? '')}
        />
        <Table<
          ProjectOrganization,
          ProjectOrganizationPayload,
          ProjectOrganizationFilters,
          ProjectOrganizationSortKeys,
          typeof projectOrganizationsApi
        >
          key="project-organization-table"
          ref={organizationTableRef}
          api={projectOrganizationsApi}
          sortKeys={projectOrganizationSortKeys}
          columns={{
            id: {
              key: ["organization", "id"],
              hidden: true,
            },
            Thumbnail: {
              key: ["organization", "thumbnail"],
              type: "thumbnail",
              hideLabel: true,
              style: "w-18",
            },
            Name: {
              key: ["organization", "name"],
              style: "w-50",
            },
            Slug: {
              key: ["organization", "slug"],
              style: "w-50",
            },
            Permission: {
              key: "permission",
              type: "select",
              options: Object.entries(projectPermissions).map(([value, label], index) => {
                const entries = Object.entries(projectPermissions);
                const maxIndex =
                  project.permission in projectPermissions
                    ? Object.keys(projectPermissions).findIndex((p) => p === project.permission) + 1
                    : entries.length;

                return {
                  value,
                  label,
                  disabled: index >= maxIndex,
                };
              }),
              style: "w-40 pr-3",
              disabled: !["owner", "admin"].includes(project.permission ?? ''),
            }
          }}
          defaultSortField="id"
          defaultSortDirection="desc"
          getRowIdValue={(projectOrganization) => projectOrganization.organization.id}
          defaultPageSize={5}
          pageSizeOptions={[3, 5, 10]}
          enableSearch={false}
          rowStyle="py-2"
          noResultsMessage="This project has not been shared with any organizations yet."
          actions={[
            {
              rowIcon: TrashIcon,
              rowIconSize: 24,
              rowIconTitle: "Remove project from organization",
              rowIconClicked: (index) => {
                const projectOrganization = organizationTableRef.current?.data[index];
                const organizationId = projectOrganization?.organization?.id;
                if (!organizationId) return;
                organizationsApi(organizationId).projects(project.id)
                  .delete()
                  .then(() => {
                    showSnackbar("Succesfully removed the project from the organization!", "success");
                    organizationTableRef.current?.refresh();
                  })
                  .catch(() =>
                    showSnackbar("Something went wrong. Please try again.", "error")
                  );
              },
              rowIconClassName: "hover:text-red-500 mt-1",
              canUse: () => ["owner", "admin"].includes(project.permission ?? ''),
            },
          ]}
        />
      </> : tab === 'links' ? <>
        <Table<
          ProjectShareLink,
          ProjectShareLinkPayload,
          ProjectShareLinkFilters,
          ProjectShareLinkSortKeys,
          typeof shareLinksApi
        >
          ref={shareLinksTableRef}
          api={shareLinksApi}
          columns={{
            id: {
              key: "id",
              hidden: true,
            },
            Name: {
              key: "name",
              type: "editable-text",
              disabled: !["owner", "admin"].includes(project.permission ?? ''),
            },
            Token: { key: "token" },
            "Last Updated": {
              key: "updated_at",
              type: "time-since",
            },
            "Unique Visitors": { key: "unique_visits" },
            "Total Visitors": { key: "total_visits" },
          }}
          sortKeys={projectShareLinkSortKeys}
          extras={
            ["owner", "admin", "invite"].includes(project.permission ?? '') ? (
              <CreateShareLinkForm
                compact
                shareLinksApi={shareLinksApi}
                showSnackbar={showSnackbar}
                onSuccess={refreshShareLinksTable}
              />
            ) : null
          }
          defaultSortField="id"
          defaultSortDirection="desc"
          pageSizeOptions={[5, 10, 15, 20]}
          defaultPageSize={10}
          getRowIdValue={(row) => row.id}
          noResultsMessage="No share links yet. Create one above to share the current game."
          rowClassName={(row) =>
            row.id === defaultShareLinkId
              ? "bg-primary-green/10 hover:bg-primary-green/15"
              : ""
          }
          actions={[
            {
              rowIcon: StarFilledIcon,
              rowIconSize: 18,
              rowIconClassName: "hover:text-yellow-400",
              rowIconTitle: "Set as default share link",
              rowIconClicked: async (index) => {
                const link = shareLinksTableRef.current?.data?.[index];
                if (!link) return;
                try {
                  await projectApi.update({ default_share_link_id: link.id });
                  setDefaultShareLinkId(link.id);
                  showSnackbar("Default share link set.", "success");
                } catch (err: any) {
                  const msg =
                    err?.response?.data?.default_share_link_id?.[0] ??
                    err?.response?.data?.detail ??
                    "Failed to set default share link.";
                  showSnackbar(msg, "error");
                }
              },
              canUse: (row) => defaultShareLinkId !== row.id && ["owner", "admin"].includes(project.permission ?? ''),
            },
            {
              rowIcon: StarFilledIcon,
              rowIconSize: 18,
              rowIconClassName: "text-yellow-400",
              rowIconTitle: "Clear default share link",
              rowIconClicked: async (index) => {
                const link = shareLinksTableRef.current?.data?.[index];
                if (!link) return;
                try {
                  await projectApi.update({ default_share_link_id: null });
                  setDefaultShareLinkId(null);
                  showSnackbar("Default share link cleared.", "success");
                } catch (err: any) {
                  const msg =
                    err?.response?.data?.default_share_link_id?.[0] ??
                    err?.response?.data?.detail ??
                    "Failed to clear default share link.";
                  showSnackbar(msg, "error");
                }
              },
              canUse: (row) => defaultShareLinkId === row.id && ["owner", "admin"].includes(project.permission ?? ''),
            },
            {
              rowIcon: Link2Icon,
              rowIconSize: 20,
              rowIconClassName: "hover:text-green-500",
              rowIconTitle: "Copy share URL to clipboard",
              rowIconClicked: (index) => {
                const link = shareLinksTableRef.current?.data?.[index];
                if (!link) return;
                const url = `${baseUrl}/play/${link.token}`;
                navigator.clipboard
                  .writeText(url)
                  .then(() => showSnackbar("Share URL copied to clipboard.", "success"))
                  .catch(() => showSnackbar("Could not copy to clipboard.", "error"));
              },
            },
            {
              rowIcon: ReloadIcon,
              rowIconSize: 20,
              rowIconClassName: "hover:text-yellow-500",
              rowIconTitle: "Update link to current project state",
              rowIconClicked: (index) => {
                const link = shareLinksTableRef.current?.data?.[index];
                if (!link) return;
                setLinkToRefresh(link);
              },
              canUse: () => ["owner", "admin"].includes(project.permission ?? ''),
            },
            {
              rowIcon: TrashIcon,
              rowIconSize: 20,
              rowIconClassName: "hover:text-red-500",
              rowIconTitle: "Delete share link",
              rowIconClicked: (index) => {
                const link = shareLinksTableRef.current?.data?.[index];
                if (!link) return;
                setLinkToDelete(link);
              },
              canUse: () => ["owner", "admin"].includes(project.permission ?? ''),
            },
          ]}
        />
      </> : null}
        </div>
      </div>
    </Modal>
    {linkToRefresh && (
      <Modal
        className="bg-yellow-500"
        title="Update Share Link"
        subtitle={linkToRefresh.name}
        text="Update this share link to point to the current game state? Anyone with the URL will see the latest version."
        icon={ReloadIcon}
        onClose={() => setLinkToRefresh(null)}
        actions={(
          <>
            <Button
              onClick={async () => {
                if (!linkToRefresh) return;
                try {
                  await unwrap(
                    api.post(`projects/${project.id}/share-links/${linkToRefresh!.id}/refresh/`)
                  );
                  showSnackbar("Share link updated to current game state.", "success");
                  shareLinksTableRef.current?.refresh();
                } catch (err: any) {
                  const msg =
                    err?.response?.data?.yjs_blob?.[0] ??
                    err?.response?.data?.detail ??
                    "Failed to update share link.";
                  showSnackbar(msg, "error");
                } finally {
                  setLinkToRefresh(null);
                }
              }}
              className="btn-warn ml-3"
            >
              Update
            </Button>
            <Button
              onClick={() => setLinkToRefresh(null)}
              className="btn-neutral"
            >
              Cancel
            </Button>
          </>
        )}
      />
    )}
    {linkToDelete && (
      <Modal
        className="bg-red-500"
        title="Delete Share Link"
        subtitle={linkToDelete.name}
        text="Deleting this share link will revoke access for anyone with the URL. This action cannot be undone."
        icon={TrashIcon}
        onClose={() => setLinkToDelete(null)}
        actions={(
          <>
            <Button
              onClick={async () => {
                if (!linkToDelete) return;
                try {
                  await shareLinksApi(linkToDelete!.id).delete();
                  showSnackbar("Share link deleted.", "success");
                  shareLinksTableRef.current?.refresh();
                } catch {
                  showSnackbar("Failed to delete share link.", "error");
                } finally {
                  setLinkToDelete(null);
                }
              }}
              className="btn-deny ml-3"
            >
              Delete
            </Button>
            <Button
              onClick={() => setLinkToDelete(null)}
              className="btn-neutral"
            >
              Cancel
            </Button>
          </>
        )}
      />
    )}
    </>
  );
};

interface ProjectShareSearchBoxProps<TData, TFilters, TApi> {
  api: TApi;
  placeholder?: string;
  noResultsMessage?: string;
  filters?: Partial<TFilters>;
  columns?: TableColumns<TData>;
  handleRowClick?: (row: Row<TData>, onSuccess: () => void) => void;
  canUse?: boolean;
}

const ProjectShareSearchBox = <
  TData extends Record<string, any>,
  TPayload extends Record<string, any>,
  TFilters extends BaseFilters,
  TSortKeys extends string,
  TApi extends BaseApiInnerReturn<typeof createBaseApi<TData, TPayload, TFilters>>,
>({
  api,
  placeholder,
  noResultsMessage,
  filters = {},
  columns = {},
  handleRowClick = () => {},
  canUse = true,
}: ProjectShareSearchBoxProps<TData, TFilters, TApi>) => {
  const searchBoxRef = useRef<ApiModelSearchBoxRef>(null);

  return canUse && (
    <ApiModelSearchBox<
      TData,
      TPayload,
      TFilters,
      TSortKeys,
      typeof api
    >
      ref={searchBoxRef}
      placeholder={placeholder}
      className="w-full mb-3"
      noResultsMessage={noResultsMessage}
      api={api}
      filters={filters}
      columns={columns}
      handleRowClick={(row) => {
        handleRowClick(
          row,
          () => {
            searchBoxRef.current?.refresh();
            setTimeout(() => searchBoxRef.current?.setIsFocused(false), 500);
          }
        )
      }}
    />
  );
}