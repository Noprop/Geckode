import { Share1Icon, PersonIcon, BackpackIcon } from "@radix-ui/react-icons";
import { Modal } from "../Modal";
import { Button } from "../Button";
import { InputBox } from "../InputBox";
import { Project } from "@/lib/types/api/projects";
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
import TabSelector from "../TabSelector";

interface Props {
  onClose: () => void;
  project: Project;
}

export const ProjectShareModal: React.FC<Props> = ({
  onClose = () => {},
  project,
}) => {
  const tableRef = useRef<TableRef<ProjectCollaborator> | null>(null);
  const showSnackbar = useSnackbar();

  const [tab, setTab] = useState<"users" | "organizations">("users");
  const [sharedUsers, setSharedUsers] = useState<ProjectCollaborator[]>([]);

  const api = projectsApi(project.id).collaborators;

  useEffect(() => {
    api.list()
      .then(({ results }) => {
        setSharedUsers(results);
      })
      .catch(() => {
        showSnackbar("Something went wrong with loading users. Please try again.", "error");
      });
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
      <InputBox
        placeholder="Search for a user by their username, first name, or last name"
        className="w-full mb-3"
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
        pageSizeOptions={[5, 10, 20]}
        enableSearch={false}
        rowStyle="py-2"
        noResultsMessage="You have not shared this project with anyone."
      />
    </Modal>
  );
};