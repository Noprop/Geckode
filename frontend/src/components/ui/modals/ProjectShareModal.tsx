import { Share1Icon, PersonIcon, BackpackIcon, TrashIcon } from "@radix-ui/react-icons";
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
import {
  PROJECT_COLLABORATOR_CHANGE_EVENT,
  PROJECT_ORGANIZATION_CHANGE_EVENT,
} from "@/contexts/YjsContext";

interface ProjectShareModalProps {
  onClose: () => void;
  project: Project;
}

export const ProjectShareModal: React.FC<ProjectShareModalProps> = ({
  onClose = () => {},
  project,
}) => {
  const showSnackbar = useSnackbar();
  const collaboratorTableRef =
    useRef<TableRef<ProjectCollaborator, ProjectCollaboratorFilters>>(null);
  const organizationTableRef =
    useRef<TableRef<ProjectOrganization, ProjectOrganizationFilters>>(null);

  const [tab, setTab] = useState<"users" | "organizations">("users");

  const projectApi = projectsApi(project.id);
  const collaboratorsApi = projectApi.collaborators;
  const projectOrganizationsApi = projectApi.organizations;
  const isProjectPermission = (value: unknown): value is keyof typeof projectPermissions =>
    typeof value === "string" && value in projectPermissions;

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

  return (
    <Modal
      className="bg-green-500 min-w-150"
      title="Share Project"
      subtitle={project.name}
      text="Share this project with specific users or entire organizations."
      icon={Share1Icon}
      actions={
        <div className="flex justify-between w-full">
          <TabSelector
            tab={tab}
            setTab={setTab}
            options={[
              { value: "users", label: "Users", icon: PersonIcon },
              { value: "organizations", label: "Organizations", icon: BackpackIcon }
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
            },
            Permission: {
              key: "permission",
              type: "select",
              options: Object.entries(projectPermissions).slice(
                0,
                project.permission in projectPermissions
                  ? Object.keys(projectPermissions).findIndex((p) => p === project.permission) + 1
                  : Object.keys(projectPermissions).length,
              ).map(
                ([value, label]) => ({
                  value, label
                })
              ),
              style: "w-3 pr-3",
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
            },
            Slug: {
              key: ["organization", "slug"],
            },
            Permission: {
              key: "permission",
              type: "select",
              options: Object.entries(projectPermissions).map(
                ([value, label]) => ({
                  value, label
                })
              ),
              style: "w-3 pr-3",
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
      </> : null}
    </Modal>
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