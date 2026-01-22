import { Button } from "@/components/ui/Button";
import { InputBox } from "@/components/ui/inputs/InputBox";
import { Modal } from "@/components/ui/modals/Modal";
import { Table, TableRef } from "@/components/ui/Table";
import { useSnackbar } from "@/hooks/useSnackbar";
import projectsApi from "@/lib/api/handlers/projects";
import usersApi from "@/lib/api/handlers/users";
import {
  Project,
  ProjectPermissions,
  projectPermissions,
} from "@/lib/types/api/projects";
import { ProjectInvitation } from "@/lib/types/api/projects/invitations";
import {
  ProjectCollaborator,
  ProjectCollaboratorFilters,
  ProjectCollaboratorPayload,
  projectCollaboratorSortKeys,
  ProjectCollaboratorSortKeys,
} from "@/lib/types/api/projects/collaborators";
import { User } from "@/lib/types/api/users";
import { FilePlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { ReactElement, useEffect, useRef, useState } from "react";
import UserSelect, {
  ListUserStatus,
  UserSelectRef,
} from "@/app/(default)/organizations/[organizationID]/settings/UserSelect";

interface Props {
  prj: Project;
  setPrj: React.Dispatch<React.SetStateAction<Project | undefined>>;
  user: User;
}
export const ManageMembers = ({ prj, setPrj, user }: Props) => {
  const snackbar = useSnackbar();
  const prjCollaboratorApi = projectsApi(prj?.id).collaborators;
  const tableRef = useRef<TableRef<
    ProjectCollaborator,
    ProjectCollaboratorFilters
  > | null>(null);

  // inviting members
  const [prjInvites, setPrjInvites] = useState<ProjectInvitation[]>([]);
  const permissionDropdownView = useRef<HTMLSelectElement | null>(null);

  const userInviteRef = useRef<UserSelectRef>(null);

  const [showModal, setShowModal] = useState<"remove" | "invite" | null>(null);

  // gets all invites already sent out by project
  const getCurrentInvites = () => {
    projectsApi(prj.id)
      .invitationsApi.list()
      .then((res) => setPrjInvites(res.results));
  };

  const determineUserStatus = (user: User): ListUserStatus => {
    // determine if user is an orgMember or owner
    if (prj.owner.id === user.id) return "already-member";
    for (var prjMember of tableRef.current?.data!) {
      if (prjMember.collaborator.id === user.id) return "already-member";
    }

    // determine if user is already set to be invited
    for (var tbiUser of userInviteRef.current?.usersSelected!) {
      if (tbiUser.id === user.id) return "selected";
    }

    // determine if user already has a pending invite
    for (var invitedUser of prjInvites) {
      if (invitedUser.invitee.id === user.id) return "already-invited";
    }

    return "standard";
  };

  // invites all users listed in usersToInvite with set permission
  const inviteUsers = () => {
    const perm = permissionDropdownView.current?.value as ProjectPermissions;
    let errorOccurred = false;

    userInviteRef.current?.usersSelected.forEach((user) => {
      projectsApi(prj.id)
        .invitationsApi.create({
          invitee_id: user.id,
          permission: perm,
        })
        .catch(() => (errorOccurred = true));

      setShowModal(null);

      if (!errorOccurred) snackbar("Sent invitations to users!", "success");
      else snackbar("Error occurred when creating invitations!", "error");
    });
  };

  return (
    <>
      <h1 className="header-1">Owner</h1>
      <div className="flex my-3">
        <img
          className="size-10 mr-5 rounded-full"
          src={prj.owner.avatar ?? "/user-icon.png"}
        />
        <span className="my-auto">{prj.owner.username}</span>
      </div>
      <h1 className="header-1 mt-10">Members</h1>
      <Table<
        ProjectCollaborator,
        ProjectCollaboratorPayload,
        ProjectCollaboratorFilters,
        ProjectCollaboratorSortKeys,
        typeof prjCollaboratorApi
      >
        ref={tableRef}
        api={prjCollaboratorApi}
        columns={{
          Avatar: {
            key: ["collaborator", "avatar"],
            type: "thumbnail",
          },
          Username: {
            key: "collaborator",
            type: "user",
          },
          Permission: {
            key: "permission",
          },
        }}
        sortKeys={projectCollaboratorSortKeys}
        //defaultSortField="permission"
        defaultSortDirection="desc"
        actions={[
          {
            rowIcon: TrashIcon,
            rowIconSize: 24,
            rowIconClicked: () => setShowModal("remove"),
            rowIconClassName: "hover:text-red-500 mt-1",
            canUse: (a) => prj.owner.id === user?.id, // WILL NEED TO CHANGE TO PROPER PERMISSIONS!!!
          },
        ]}
        extras={
          <>
            <Button
              onClick={() => {
                setShowModal("invite");
                getCurrentInvites();
              }}
              className="btn-confirm"
            >
              Invite Users
            </Button>
          </>
        }
        rowStyle="py-2"
      />
      {showModal === "invite" && (
        <Modal
          title="Invite Users"
          icon={FilePlusIcon}
          actions={
            <>
              <Button onClick={inviteUsers} className="btn-confirm ml-3">
                Invite
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
          <p>Username:</p>
          <div className="flex flex-col w-90">
            <UserSelect
              ref={userInviteRef}
              determineUserStatus={determineUserStatus}
            />

            <p>Permission:</p>
            <select
              ref={permissionDropdownView}
              className="bg-white text-black mb-3 p-2 rounded-md"
            >
              {Object.entries(projectPermissions).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </Modal>
      )}
    </>
  );
};
