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
  const [invSearchResults, setInvSearchResults] = useState<User[]>([]);
  const [usersToInvite, setUsersToInvite] = useState<User[]>([]);
  const permissionDropdownView = useRef<HTMLSelectElement | null>(null);

  const [showModal, setShowModal] = useState<"remove" | "invite" | null>(null);

  // searches for users in invite modal with provided search criteria, sets results to invSearchResults
  const searchForUsers = (searchValue: string) => {
    const searchCriteria = searchValue.trim();

    if (searchCriteria === "" || searchCriteria === undefined) {
      setInvSearchResults([]);
      return;
    }

    usersApi.list({ search: searchCriteria }).then((res) => {
      setInvSearchResults(res.results);
    });
  };

  // gets all invites already sent out by organization
  const getCurrentInvites = () => {
    organizationsApi(org.id)
      .invitationsApi.list()
      .then((res) => setOrgInvites(res.results));
  };

  // determines entry properties when listed in the "Invite User" section
  const ListUserInvite = ({ user }: { user: User }): ReactElement => {
    const [status, setStatus] = useState<
      "to-be-invited" | "already-member" | "already-invited" | "standard"
    >("standard");

    useEffect(() => {
      // determine if user is member or owner
      tableRef.current?.data.forEach((orgMember) => {
        if (orgMember.member.id === user.id) {
          setStatus("already-member");
          return;
        }
      });
      if (org.owner.id === user.id) setStatus("already-member");

      // determine if user is already set to be invited
      if (status === "standard") {
        usersToInvite.forEach((tbiUser) => {
          if (tbiUser.id === user.id) {
            setStatus("to-be-invited");
            return;
          }
        });
      }
    }, []);

    // determine if user already has a pending invite
    if (status === "standard") {
      orgInvites.forEach((invitedUser) => {
        if (invitedUser.invitee.id === user.id) {
          setStatus("already-invited");
          return;
        }
      });
    }

    return (
      <li
        className={
          "p-1 my-1 w-full flex rounded-md " +
          (status === "to-be-invited"
            ? "bg-primary-green text-white"
            : status === "already-member" || status === "already-invited"
            ? "bg-gray-500 text-white"
            : "")
        }
      >
        <p>{user.username}</p>
        {status === "standard" ? (
          <button
            className="ml-auto mr-3 rounded-sm h-5 w-5 cursor-pointer border border-light-txt dark:border-dark-txt"
            onClick={() => {
              // add user to usersToInvite
              let us = Object.assign([], usersToInvite);
              us.push(user);
              setUsersToInvite(us);
            }}
          >
            +
          </button>
        ) : status === "to-be-invited" ? (
          <button
            className="ml-auto mr-3 cursor-pointer rounded-sm h-5 w-5 border border-white bg-white text-primary-green"
            onClick={() => {
              // remove user from usersToInvite
              let us = Object.assign([], usersToInvite) as User[];
              for (let i = 0; i < us.length; i++) {
                if (us[i].id === user.id) {
                  us.splice(i, 1);
                  setUsersToInvite(us);
                  return;
                }
              }
            }}
          >
            -
          </button>
        ) : (
          <p className="italic ml-auto mr-3 text-slate-300">
            {" "}
            {status === "already-member" ? "Member" : "Invite sent"}
          </p>
        )}
      </li>
    );
  };

  // invites all users listed in usersToInvite with set permission
  const inviteUsers = () => {
    const perm: string = permissionDropdownView.current?.value as string;
    let errorOccurred = false;

    usersToInvite.forEach((user) => {
      organizationsApi(org.id)
        .invitationsApi.create({
          invitee_id: user.id,
          permission: perm,
        })
        .catch(() => (errorOccurred = true));

      setUsersToInvite([]);
      setInvSearchResults([]);
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
          src={org.owner.avatar ?? "user-icon.png"}
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
                  setUsersToInvite([]);
                  setInvSearchResults([]);
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
            <InputBox
              onChange={(e) => searchForUsers(e.target.value)}
              placeholder="Search username:"
              className="bg-white text-black mb-3 border-0"
            />
            <ul className="mb-3 p-1 rounded-md h-40 border border-white overflow-y-scroll standard-scrollbar bg-light-tertiary dark:bg-dark-tertiary text-light-txt dark:text-dark-txt">
              {invSearchResults.map((user) => (
                <ListUserInvite user={user} key={user.id} />
              ))}
            </ul>

            <p>Permission:</p>
            <select
              ref={permissionDropdownView}
              className="bg-white text-black mb-3 p-2 rounded-md"
            >
              {Object.entries(projectPermissions).map((p) => (
                <option key={p[0]} value={p[0]}>
                  {p.join(" - ")}
                </option>
              ))}
            </select>
          </div>
        </Modal>
      )}
    </>
  );
};
