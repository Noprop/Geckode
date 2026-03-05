'use client';
import TabSystem from '@/components/ui/selectors/TabSystem';
import { Table, TableRef } from '@/components/ui/Table';
import { useSnackbar } from '@/hooks/useSnackbar';
import { authApi } from '@/lib/api/auth';
import { extractAxiosErrMsg } from '@/lib/api/axios';
import projectsApi from '@/lib/api/handlers/projects';
import { OrganizationLite } from '@/lib/types/api/organizations';
import { ListOrganizationInvitation } from '@/lib/types/api/organizations/invitations';
import { ProjectLite } from '@/lib/types/api/projects';
import { ListProjectInvitation } from '@/lib/types/api/projects/invitations';
import { User } from '@/lib/types/api/users';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Check } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

const AccountInvitations = () => {
  const [user, setUser] = useState<User | null>(null);
  const showSnackbar = useSnackbar();
  const [showModal, setShowModal] = useState<null | 'deny'>(null);
  const orgTableRef = useRef<TableRef<ListOrganizationInvitation, undefined> | null>(null);
  const prjTableRef = useRef<TableRef<ListProjectInvitation, undefined> | null>(null);

  const acceptPrjInvite = (invite: ListProjectInvitation | undefined) => {
    if (invite === undefined) return;

    projectsApi(invite.project.id)
      .invitationsApi(invite.id)
      .accept.then(() => {
        showSnackbar(`Successfully joined ${invite.project.name}!`, `success`);

        // remove invite
        const i = user?.project_invitations.indexOf(invite);
        user?.project_invitations.splice(i!, 1);
      })
      .catch((err) => {
        showSnackbar(extractAxiosErrMsg(err, 'Failed to accept invitation!'), 'error');
      });
  };

  const denyPrjInvite = (invite: ListProjectInvitation | undefined) => {
    if (invite === undefined) return;
    projectsApi(invite.project.id)
      .invitationsApi(invite.id)
      .delete()
      .then(() => {
        showSnackbar(`Denied ${invite.project.name}!`, `success`);

        // remove invite
        const i = user?.project_invitations.indexOf(invite);
        user?.project_invitations.splice(i!, 1);
      })
      .catch((err) => {
        showSnackbar(extractAxiosErrMsg(err, 'Failed to deny invitation!'), 'error');
      });
  };

  const acceptOrgInvite = (invite: ListOrganizationInvitation | undefined) => {
    if (invite === undefined) return;

    projectsApi(invite.organization.id)
      .invitationsApi(invite.id)
      .accept.then(() => {
        showSnackbar(`Successfully joined ${invite.organization.name}!`, `success`);

        // remove invite
        const i = user?.organization_invitations.indexOf(invite);
        user?.organization_invitations.splice(i!, 1);
      })
      .catch((err) => {
        showSnackbar(extractAxiosErrMsg(err, 'Failed to accept invitation!'), 'error');
      });
  };

  const denyOrgInvite = (invite: ListOrganizationInvitation | undefined) => {
    if (invite === undefined) return;

    projectsApi(invite.organization.id)
      .invitationsApi(invite.id)
      .delete()
      .then(() => {
        showSnackbar(`Denied ${invite.organization.name}!`, `success`);

        // remove invite
        const i = user?.organization_invitations.indexOf(invite);
        user?.organization_invitations.splice(i!, 1);
      })
      .catch((err) => {
        showSnackbar(extractAxiosErrMsg(err, 'Failed to deny invitation!'), 'error');
      });
  };

  useEffect(() => {
    authApi
      .getUserDetails()
      .then((res) => setUser(res))
      .catch((err) => showSnackbar(extractAxiosErrMsg(err, 'Failed to get user info'), 'error'));
  }, []);

  return (
    <div className='mx-50 my-5'>
      <h1 className='header-1 mt-20 pb-10'>Invitations</h1>
      <TabSystem
        tabs={[
          {
            title: 'Organizations',
            element: (
              <Table<ListOrganizationInvitation, undefined, undefined, undefined, undefined>
                ref={orgTableRef}
                enableSearch={false}
                columns={{
                  id: {
                    key: 'id',
                    hidden: true,
                  },
                  Thumbnail: {
                    key: 'organization',
                    value: (org: OrganizationLite) => org.thumbnail,
                    type: 'thumbnail',
                  },
                  Name: {
                    key: 'organization',
                    value: (org: OrganizationLite) => org.name,
                  },
                  Permission: {
                    key: 'permission',
                  },
                }}
                staticData={user?.organization_invitations}
                actions={[
                  {
                    rowIcon: Check,
                    rowIconSize: 24,
                    rowIconClicked: (index) => {
                      acceptOrgInvite(orgTableRef.current?.data?.[index]);
                    },
                    rowIconClassName: 'hover:text-green-500 mt-1',
                  },
                  {
                    rowIcon: Cross2Icon,
                    rowIconSize: 24,
                    rowIconClicked: (index) => {
                      denyOrgInvite(orgTableRef.current?.data?.[index]);
                    },
                    rowIconClassName: 'hover:text-red-500 mt-1',
                  },
                ]}
              />
            ),
          },

          {
            title: 'Projects',
            element: (
              <Table<ListProjectInvitation, undefined, undefined, undefined, undefined>
                ref={prjTableRef}
                enableSearch={false}
                columns={{
                  id: {
                    key: 'id',
                    hidden: true,
                  },
                  Thumbnail: {
                    key: 'project',
                    value: (prj: ProjectLite) => prj.thumbnail,
                    type: 'thumbnail',
                  },
                  Name: {
                    key: 'project',
                    value: (prj: ProjectLite) => prj.name,
                  },
                  Permission: {
                    key: 'permission',
                  },
                }}
                staticData={user?.project_invitations}
                actions={[
                  {
                    rowIcon: Check,
                    rowIconSize: 24,
                    rowIconClicked: (index) => {
                      acceptPrjInvite(prjTableRef.current?.data?.[index]);
                    },
                    rowIconClassName: 'hover:text-green-500 mt-1',
                  },
                  {
                    rowIcon: Cross2Icon,
                    rowIconSize: 24,
                    rowIconClicked: (index) => {
                      denyPrjInvite(prjTableRef.current?.data?.[index]);
                    },
                    rowIconClassName: 'hover:text-red-500 mt-1',
                  },
                ]}
              />
            ),
          },
        ]}
      />
    </div>
  );
};

export default AccountInvitations;
