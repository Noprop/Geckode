'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import organizationsApi from '@/lib/api/handlers/organizations';
import TabSystem from '@/components/ui/selectors/TabSystem';
import { Organization } from '@/lib/types/api/organizations';
import { authApi } from '@/lib/api/auth';
import { User } from '@/lib/types/api/users';
import { AboutOrganization } from './AboutOrganization';
import { ManageMembers } from './ManageMembers';
import { useSnackbar } from '@/hooks/useSnackbar';
import { extractAxiosErrMsg } from '@/lib/api/axios';

const OrganizationSettingsPage = () => {
  const orgID = Number(useParams().organizationID);
  const [org, setOrg] = useState<Organization>();
  const snackbar = useSnackbar();

  const [user, setUser] = useState<User | null>(null);
  const [userPerm, setUserPerm] = useState<string>('view');

  useEffect(() => {
    // fetch api for org name
    organizationsApi(orgID)
      .get()
      .then((org) => {
        setOrg(org);
        authApi // get user details
          .getUserDetails()
          .then((user) => {
            setUser(user);
            // set user permissions
            if (org?.owner.id === user?.id && org?.owner.id !== undefined) setUserPerm('admin');
            else if (user) {
              organizationsApi(orgID)
                .members.list()
                .then((res) => {
                  for (const mem of res.results) {
                    if (mem.member.id === user.id) {
                      setUserPerm(mem.permission);
                      return;
                    }
                  }
                })
                .catch((err) => snackbar(extractAxiosErrMsg(err, 'Failed to verify user permissions..'), 'error'));
            }
          })
          .catch((err) => snackbar(extractAxiosErrMsg(err, 'Failed to get user details'), 'error'));
      })
      .catch((err) => snackbar(extractAxiosErrMsg(err, 'Failed to get organization details'), 'error'));
  }, []);

  return (
    <div className='mx-50 my-5'>
      <h1 className='header-1 mt-4'>Settings</h1>
      <div className='flex w-full my-10'>
        {org?.thumbnail && <img className='rounded-full h-20 w-20 object-cover mr-3' src={org?.thumbnail} alt='' />}
        <h1 className='header-2 my-auto h-12'>{org?.name}</h1>
      </div>
      <TabSystem
        tabs={[
          {
            title: 'About Organization',
            element: <AboutOrganization org={org!} setOrg={setOrg} user={user!} userPerm={userPerm} />,
          },
          {
            title: 'Manage Members',
            element: <ManageMembers org={org!} setOrg={setOrg} user={user!} userPerm={userPerm} />,
          },
        ]}
      ></TabSystem>
    </div>
  );
};

export default OrganizationSettingsPage;
