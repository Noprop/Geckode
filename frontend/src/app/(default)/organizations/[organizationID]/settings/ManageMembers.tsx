import DragAndDrop from "@/components/DragAndDrop";
import { Button } from "@/components/ui/Button";
import { InputBox, InputBoxRef } from "@/components/ui/inputs/InputBox";
import { Modal } from "@/components/ui/modals/Modal";
import { Table, TableRef } from "@/components/ui/Table";
import { useSnackbar } from "@/hooks/useSnackbar";
import organizationsApi from "@/lib/api/handlers/organizations";
import usersApi from "@/lib/api/handlers/users";
import { Organization } from "@/lib/types/api/organizations";
import { OrganizationInvitation } from "@/lib/types/api/organizations/invitations";
import {
  OrganizationMember,
  OrganizationMemberFilters,
  OrganizationMemberPayload,
  organizationMemberSortKeys,
  OrganizationMemberSortKeys,
} from "@/lib/types/api/organizations/members";
import { projectPermissions } from "@/lib/types/api/projects";
import { User } from "@/lib/types/api/users";
import { FilePlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { ReactElement, useEffect, useRef, useState } from "react";
import UserSelect, { ListUserStatus, UserSelectRef } from "./UserSelect";

interface Props {
  org: Organization;
  setOrg: React.Dispatch<React.SetStateAction<Organization | undefined>>;
  user: User;
}
export const ManageMembers = ({ org, setOrg, user }: Props) => {
  const snackbar = useSnackbar();
  const orgMemberApi = organizationsApi(org?.id).members;
  const tableRef = useRef<TableRef<
    OrganizationMember,
    OrganizationMemberFilters
  > | null>(null);

  // inviting members
  const [orgInvites, setOrgInvites] = useState<OrganizationInvitation[]>([]);
  const permissionDropdownView = useRef<HTMLSelectElement | null>(null);
  const userInviteRef = useRef<UserSelectRef>(null);

  const [showModal, setShowModal] = useState<"remove" | "invite" | null>(null);

  // gets all invites already sent out by organization
  const getCurrentInvites = () => {
    organizationsApi(org.id)
      .invitationsApi.list()
      .then((res) => setOrgInvites(res.results));
  };

  const determineUserStatus = (user: User): ListUserStatus => {
    // determine if user is an orgMember or owner
    if (org.owner.id === user.id) return "already-member";
    for (var orgMember of tableRef.current?.data!) {
      if (orgMember.member.id === user.id) return "already-member";
    }

    // determine if user is already set to be invited
    for (var tbiUser of userInviteRef.current?.usersSelected!) {
      if (tbiUser.id === user.id) return "selected";
    }

    // determine if user already has a pending invite
    for (var invitedUser of orgInvites) {
      if (invitedUser.invitee.id === user.id) return "already-invited";
    }

    return "standard";
  };

  // invites all users listed in usersToInvite with set permission
  const inviteUsers = () => {
    const perm: string = permissionDropdownView.current?.value as string;
    let errorOccurred = false;

    userInviteRef.current?.usersSelected.forEach((user) => {
      organizationsApi(org.id)
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
          src={org.owner.avatar ?? "/user-icon.png"}
        />
        <span className="my-auto">{org.owner.username}</span>
      </div>
      <h1 className="header-1 mt-10">Members</h1>
      <Table<
        OrganizationMember,
        OrganizationMemberPayload,
        OrganizationMemberFilters,
        OrganizationMemberSortKeys,
        typeof orgMemberApi
      >
        ref={tableRef}
        api={orgMemberApi}
        columns={{
          Avatar: {
            key: ["member", "avatar"],
            type: "thumbnail",
          },
          Username: {
            key: "member",
            type: "user",
          },
          Permission: {
            key: "permission",
          },
        }}
        sortKeys={organizationMemberSortKeys}
        //defaultSortField="permission"
        defaultSortDirection="desc"
        actions={[
          {
            rowIcon: TrashIcon,
            rowIconSize: 24,
            rowIconClicked: () => setShowModal("remove"),
            rowIconClassName: "hover:text-red-500 mt-1",
            canUse: (a) => org.owner.id === user?.id, // WILL NEED TO CHANGE TO PROPER PERMISSIONS!!!
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
