import { useRef } from "react";
import { CheckIcon, MailIcon, XIcon } from "lucide-react";
import { Modal } from "./Modal";
import { Button } from "../Button";
import { Table, type TableRef } from "../Table";
import { useSnackbar } from "@/hooks/useSnackbar";
import usersApi from "@/lib/api/handlers/users";
import { 
  OrganizationInvitationFilters,
  OrganizationInvitationPayload,
  organizationPermissions,
  UserOrganizationInvitationSortKeys,
  userOrganizationInvitationSortKeys,
  type UserOrganizationInvitation
} from "@/lib/types/api/organizations/invitations";
import { useUser } from "@/contexts/UserContext";
import organizationsApi from "@/lib/api/handlers/organizations";

interface InvitationsModalProps {
  onClose: () => void;
}

const InvitationsModal: React.FC<InvitationsModalProps> = ({
  onClose,
}) => {
  const showSnackbar = useSnackbar();
  const user = useUser();
  if (!user) return null;

  const tableRef = useRef<TableRef<UserOrganizationInvitation, any> | null>(null);

  const api = usersApi(user.id).organizationInvitations;

  return (
    <Modal
      title="My Invitations"
      icon={MailIcon}
      actions={
        <Button onClick={onClose} className="btn-neutral">
          Done
        </Button>
      }
    >
      <Table<
        UserOrganizationInvitation,
        OrganizationInvitationPayload,
        OrganizationInvitationFilters,
        UserOrganizationInvitationSortKeys,
        typeof api
      >
        ref={tableRef}
        api={api}
        columns={{
          id: {
            key: "id",
            hidden: true,
          },
          "Organization Avatar": {
            key: ["organization"],
            type: "organization-avatar",
            hideLabel: true,
            style: "w-14",
          },
          Organization: {
            key: "organization",
            type: "organization",
          },
          Inviter: {
            key: "inviter",
            type: "user",
          },
          Permission: {
            key: "permission",
            value: (permission: string) => {
              const match = organizationPermissions.find(
                ([value]) => value === permission,
              );
              return match ? match[1] : permission;
            },
            type: "other",
          },
          "Time Since Invited": {
            key: "invited_at",
            type: "time-since",
          },
        }}
        sortKeys={userOrganizationInvitationSortKeys}
        defaultSortField="invited_at"
        defaultSortDirection="desc"
        noResultsMessage="You have no pending organization invitations."
        actions={[
          {
            rowIcon: CheckIcon,
            rowIconSize: 24,
            rowIconClassName: "text-foreground hover:text-green-600 mt-2",
            rowIconTitle: "Accept invitation",
            rowIconClicked: async (index) => {
              const invitation = tableRef.current?.data[index];
              if (!invitation) return;
              console.log('invitation', invitation);

              try {
                await organizationsApi(invitation.organization.id)
                  .invitationsApi(invitation.id)
                  .accept
                  .create();
                showSnackbar("Invitation accepted.", "success");
                tableRef.current?.refresh();
              } catch {
                showSnackbar("Failed to accept invitation.", "error");
              }
            },
          },
          {
            rowIcon: XIcon,
            rowIconSize: 24,
            rowIconClassName: "text-foreground hover:text-red-600 mt-2",
            rowIconTitle: "Reject invitation",
            rowIconClicked: async (index) => {
              const invitation = tableRef.current?.data[index];
              if (!invitation) return;

              try {
                await organizationsApi(invitation.organization.id)
                  .invitationsApi(invitation.id)
                  .delete();
                showSnackbar("Invitation rejected.", "success");
                tableRef.current?.refresh();
              } catch {
                showSnackbar("Failed to reject invitation.", "error");
              }
            },
          },
        ]}
      />
    </Modal>
  );
};

export default InvitationsModal;