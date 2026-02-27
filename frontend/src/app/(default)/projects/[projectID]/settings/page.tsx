'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import projectsApi from '@/lib/api/handlers/projects';
import TabSystem from '@/components/ui/selectors/TabSystem';
import { Project, ProjectPermissions } from '@/lib/types/api/projects';
import { authApi } from '@/lib/api/auth';
import { User } from '@/lib/types/api/users';
import { AboutProject } from './AboutProject';
import { ManageCollaborators } from './ManageCollaborators';
import { useSnackbar } from '@/hooks/useSnackbar';
import { extractAxiosErrMsg } from '@/lib/api/axios';
import Image from 'next/image';

const ProjectSettingsPage = () => {
  const prjID = Number(useParams().projectID);
  const [prj, setPrj] = useState<Project>();
  const showSnackbar = useSnackbar();

  const [user, setUser] = useState<User | null>(null);
  const [userPerm, setUserPerm] = useState<ProjectPermissions | 'owner'>('view');

  useEffect(() => {
    // fetch api for prj name
    projectsApi(prjID)
      .get()
      .then((prj) => {
        setPrj(prj);
        authApi
          .getUserDetails()
          .then((user) => {
            setUser(user);
            setUserPerm(prj.permission);
          })
          .catch((err) => showSnackbar(extractAxiosErrMsg(err, 'Failed to get user details.'), 'error'));
      })
      .catch((err) => showSnackbar(extractAxiosErrMsg(err, 'Failed to get project information'), 'error'));
  }, []);

  return (
    <div className='mx-50 my-5'>
      <h1 className='header-1 mt-4'>Settings</h1>
      <div className='flex w-full my-10'>
        {prj?.thumbnail && <img className='rounded-full h-20 w-20 object-cover mr-3' src={prj?.thumbnail} alt='' />}
        <h1 className='header-2 my-auto h-12'>{prj?.name}</h1>
      </div>
      <TabSystem
        tabs={[
          {
            title: 'About Project',
            element: <AboutProject prj={prj!} setPrj={setPrj} user={user!} userPerm={userPerm} />,
          },
          {
            title: 'Manage Collaborators',
            element: <ManageCollaborators prj={prj!} setPrj={setPrj} user={user!} userPerm={userPerm} />,
          },
        ]}
      ></TabSystem>
    </div>
  );
};

export default ProjectSettingsPage;
