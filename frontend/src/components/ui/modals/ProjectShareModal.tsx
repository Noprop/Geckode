import { Share1Icon, PersonIcon, BackpackIcon, TrashIcon } from "@radix-ui/react-icons";
import { Modal } from "./Modal";
import { Button } from "../Button";
import { Project, projectPermissions } from "@/lib/types/api/projects";
import { Ref, useImperativeHandle, useRef, useState } from "react";
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
import { Organization, OrganizationFilters, OrganizationPayload, organizationSortKeys, OrganizationSortKeys } from "@/lib/types/api/organizations";
import { ProjectOrganization, ProjectOrganizationFilters, ProjectOrganizationPayload, projectOrganizationSortKeys, ProjectOrganizationSortKeys } from "@/lib/types/api/projects/organizations";
import organizationsApi from "@/lib/api/handlers/organizations";

interface ProjectShareModalProps {
  onClose: () => void;
  project: Project;
}

export const ProjectShareModal: React.FC<ProjectShareModalProps> = ({
  onClose = () => {},
  project,
}) => {
  const showSnackbar = useSnackbar();
  const tableRef = useRef<ProjectShareTableRef>(null);

  const [tab, setTab] = useState<"users" | "organizations">("users");

  const projectApi = projectsApi(project.id);
  const collaboratorsApi = projectApi.collaborators;
  const projectOrganizationsApi = projectApi.organizations;

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
              key: "avatar",
              type: "thumbnail",
              style: "w-18",
            },
            User: {
              key: ".",
              type: "user",
            }
          }}
          handleRowClick={(row, onSuccess) => {
            collaboratorsApi
              .create({
                collaborator_id: Number(row.getValue('id')),
                permission: 'view',
              })
              .then(() => {
                showSnackbar("Successfully added the user as a collaborator.", "success");
                tableRef.current?.refresh();
                onSuccess();
              })
              .catch(() => {
                showSnackbar("An error occured when adding the user as a collaborator.", "error");
              });
          }}
          canUse={["owner", "admin", "invite"].includes(project.permission ?? '')}
        />
        <ProjectShareTable<
          ProjectCollaborator,
          ProjectCollaboratorPayload,
          ProjectCollaboratorFilters,
          ProjectCollaboratorSortKeys,
          typeof collaboratorsApi
        >
          key="collaborator-table"
          ref={tableRef}
          project={project}
          api={collaboratorsApi}
          sortKeys={projectCollaboratorSortKeys}
          columns={{
            id: {
              key: ["collaborator", "id"],
              hidden: true,
            },
            Avatar: {
              key: ["collaborator", "avatar"],
              type: "thumbnail",
              hideLabel: true,
              style: "w-18",
            },
            User: {
              key: "collaborator",
              type: "user",
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
              disabled: !["owner", "admin", "invite"].includes(project.permission ?? ''),
            }
          }}
          defaultSortField="id"
          defaultSortDirection="desc"
          handleRowDelete={(collaborator) => {
            const collaboratorId = collaborator.collaborator.id;
            if (!collaboratorId) return;
            collaboratorsApi(collaboratorId)
              .delete()
              .then(() => {
                showSnackbar("Succesfully removed the user from the project!", "success");
                tableRef.current?.refresh();
              })
              .catch(() =>
                showSnackbar("Something went wrong. Please try again.", "error")
              );
          }}
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
          handleRowClick={(row, onSuccess) => {
            organizationsApi(row.getValue('id')).projects
              .create({
                project_id: project.id,
                permission: 'view',
              })
              .then(() => {
                showSnackbar("Successfully shared the project with the organization.", "success");
                tableRef.current?.refresh();
                onSuccess();
              })
              .catch(() => {
                showSnackbar("An error occured when sharing the project with the organization.", "error");
              });
          }}
          canUse={["owner", "admin"].includes(project.permission ?? '')}
        />
        <ProjectShareTable<
          ProjectOrganization,
          ProjectOrganizationPayload,
          ProjectOrganizationFilters,
          ProjectOrganizationSortKeys,
          typeof projectOrganizationsApi
        >
          key="project-organization-table"
          ref={tableRef}
          project={project}
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
              disabled: !["owner", "manager"].includes(project.permission ?? ''),
            }
          }}
          defaultSortField="id"
          defaultSortDirection="desc"
          handleRowDelete={(projectOrganization) => {
            const organizationId = projectOrganization.organization.id;
            if (!organizationId) return;
            organizationsApi(organizationId).projects(project.id)
              .delete()
              .then(() => {
                showSnackbar("Succesfully removed the project from the organization!", "success");
                tableRef.current?.refresh();
              })
              .catch(() =>
                showSnackbar("Something went wrong. Please try again.", "error")
              );
          }}
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

interface ProjectShareTableRef {
  refresh: () => void;
}

interface ProjectShareTableProps<TData, TSortKeys, TApi> {
  ref?: Ref<ProjectShareTableRef>;
  project: Project;
  api: TApi;
  sortKeys: TSortKeys[];
  columns?: TableColumns<TData>;
  defaultSortField?: TSortKeys;
  defaultSortDirection?: 'asc' | 'desc';
  handleRowDelete?: (data: TData) => void;
}

const ProjectShareTable = <
  TData extends Record<string, any>,
  TPayload extends Record<string, any>,
  TFilters extends BaseFilters,
  TSortKeys extends string,
  TApi extends BaseApiInnerReturn<typeof createBaseApi<TData, TPayload, TFilters>>,
>({
  ref,
  project,
  api,
  sortKeys,
  columns = {},
  defaultSortField,
  defaultSortDirection,
  handleRowDelete = () => {},
}: ProjectShareTableProps<TData, TSortKeys, TApi>) => {
  const tableRef = useRef<TableRef<TData, TFilters>>(null);

  useImperativeHandle(ref, () => ({
    refresh: () => { tableRef?.current?.refresh() },
  }));

  return (
    <Table<
      TData,
      TPayload,
      TFilters,
      TSortKeys,
      typeof api
    >
      ref={tableRef}
      api={api}
      columns={columns}
      sortKeys={sortKeys}
      defaultSortField={defaultSortField}
      defaultSortDirection={defaultSortDirection}
      defaultPageSize={5}
      pageSizeOptions={[3, 5, 10]}
      enableSearch={false}
      rowStyle="py-2"
      noResultsMessage="You have not shared this project yet."
      actions={[
        {
          rowIcon: TrashIcon,
          rowIconSize: 24,
          rowIconClicked: (index) => {
            if (!tableRef.current) return;
            handleRowDelete(tableRef.current?.data[index]);
          },
          rowIconClassName: "hover:text-red-500 mt-1",
          canUse: () => ["owner", "admin"].includes(project.permission ?? ''),
        },
      ]}
    />
  );
}