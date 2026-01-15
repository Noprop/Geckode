import { Share1Icon, PersonIcon, BackpackIcon, TrashIcon } from "@radix-ui/react-icons";
import { Modal } from "./Modal";
import { Button } from "../Button";
import { InputBox } from "../inputs/InputBox";
import { Project, ProjectFilters } from "@/lib/types/api/projects";
import { useEffect, useRef, useState } from "react";
import projectsApi from "@/lib/api/handlers/projects";
import {
  ProjectCollaborator,
  ProjectCollaboratorFilters,
  ProjectCollaboratorPayload,
  projectCollaboratorSortKeys,
  ProjectCollaboratorSortKeys,
} from "@/lib/types/api/projects/collaborators";
import { Table, TableRef } from "../Table";
import { useSnackbar } from "@/hooks/useSnackbar";
import TabSelector from "../selectors/TabSelector";
import { ApiModelSearchBox, ApiModelSearchBoxRef } from "../inputs/ApiModelSearchBox";
import usersApi from "@/lib/api/handlers/users";
import { User, UserFilters, UserPayload, UserSortKeys } from "@/lib/types/api/users";

interface Props {
  onClose: () => void;
  project: Project;
}

export const ProjectShareModal: React.FC<Props> = ({
  onClose = () => {},
  project,
}) => {
  const searchBoxRef = useRef<ApiModelSearchBoxRef>(null);
  const tableRef = useRef<TableRef<ProjectCollaborator, ProjectFilters> | null>(null);
  const showSnackbar = useSnackbar();

  const [tab, setTab] = useState<"users" | "organizations">("users");

  const api = projectsApi(project.id).collaborators;

  useEffect(() => {
    console.log('project share modal refreshed')
  }, []);

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
      <ApiModelSearchBox<
        User,
        UserPayload,
        UserFilters,
        UserSortKeys,
        typeof usersApi
      >
        ref={searchBoxRef}
        placeholder="Search for a user by their username, first name, or last name"
        className="w-full mb-3"
        api={usersApi}
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
        handleRowClick={(row) => {
          api
            .create({
              collaborator_id: Number(row.getValue('id')),
              permission: 'view',
            })
            .then((res) => {
              showSnackbar("Successfully added the user as a collaborator.", "success");
              tableRef.current?.refresh();
              searchBoxRef.current?.refresh();
              setTimeout(() => searchBoxRef.current?.setIsFocused(false), 500);
            })
            .catch((err) => {
              showSnackbar("An error occured when adding the user as a collaborator.", "error");
            });
        }}
      />
      <Table<
        ProjectCollaborator,
        ProjectCollaboratorPayload,
        ProjectCollaboratorFilters,
        ProjectCollaboratorSortKeys,
        typeof api
      >
        ref={tableRef}
        api={api}
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
            options: [
              {
                label: "View",
                value: "view",
              },
              {
                label: "Edit",
                value: "code",
              },
              {
                label: "Invite",
                value: "invite",
              },
              {
                label: "Admin",
                value: "admin",
              }
            ],
            style: "w-3 pr-3",
          }
        }}
        sortKeys={projectCollaboratorSortKeys}
        defaultSortField="id"
        defaultSortDirection="desc"
        defaultPageSize={5}
        pageSizeOptions={[3, 5, 10]}
        enableSearch={false}
        rowStyle="py-2"
        noResultsMessage="You have not shared this project with anyone."
        actions={[
          {
            rowIcon: TrashIcon,
            rowIconSize: 24,
            rowIconClicked: (index) => {
              const collaboratorId = tableRef.current?.data[index].collaborator.id;
              if (!collaboratorId) return;
              api(collaboratorId)
                .delete()
                .then((res) => {
                  showSnackbar("Succesfully removed the user from the project!", "success");
                  tableRef.current?.refresh();
                })
                .catch((err) =>
                  showSnackbar("Something went wrong. Please try again.", "error")
                );
            },
            rowIconClassName: "hover:text-red-500 mt-1",
            canUse: () => ["owner", "admin"].includes(project.permission ?? ''),
          },
        ]}
      />
    </Modal>
  );
};