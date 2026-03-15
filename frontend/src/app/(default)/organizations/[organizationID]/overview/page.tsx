"use client";
import TabSystem from '@/components/ui/selectors/TabSystem';
import { useSnackbar } from '@/hooks/useSnackbar'
import organizationsApi from '@/lib/api/handlers/organizations';
import { Organization } from '@/lib/types/api/organizations';
import { OrganizationProject, OrganizationProjectFilters, OrganizationProjectPayload, organizationProjectSortKeys, OrganizationProjectSortKeys } from '@/lib/types/api/organizations/projects';
import { User } from '@/lib/types/api/users';
import { Project } from '@/lib/types/api/projects';
import { CalendarIcon, EyeOpenIcon, FaceIcon, PersonIcon } from '@radix-ui/react-icons';
import { Table, TableRef } from '@/components/ui/Table';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'

const Overview = () => {
  const showSnackbar = useSnackbar();
  const router = useRouter();
  const orgId = Number(useParams().organizationID);
  const [org, setOrg] = useState<Organization | null>(null);
  const [err, setErr] = useState<boolean>(false);

  const tableRef = useRef<TableRef<OrganizationProject, OrganizationProjectFilters> | null>(null);


  const orgProjectsApi = organizationsApi(orgId).projects;
  const orgMembersApi = organizationsApi(orgId).members;

  const orgStatsDecalClasses = 'bg-accent-purple rounded-full aspect-square items-center p-0.5 justify-center flex text-white';

  useEffect(() => {
    const fetchData = async () => {
        try {
           setOrg(await organizationsApi(orgId).get());
        } catch { setErr(true); showSnackbar("Couldn't find organization. Please refresh page.", 'error') }
    }

    fetchData();
    
  }, []);


  const ProjectsTab = () => {
    return (
        <div className='w-full mt-10'>
            <Table<OrganizationProject,
                OrganizationProjectPayload,
                OrganizationProjectFilters,
                OrganizationProjectSortKeys,
                typeof orgProjectsApi
                >
                ref={tableRef}
                api={orgProjectsApi}
                columns={{
                    id: {
                    key: 'project',
                    value: (orgProj: Project) => orgProj.id,
                    hidden: true,
                    },
                    Thumbnail: {
                    key: 'project',
                    value: (orgProj: Project) => orgProj.thumbnail,
                    type: 'thumbnail',
                    },
                    Name: {
                    key: 'project',
                    value: (orgProj: Project) => orgProj.name,
                    },
                    Owner: {
                    key: 'project',
                    value: (orgProj: Project) => orgProj.owner,
                    type: 'user',
                    },
                    'Created At': {
                    key: 'project',
                    value: (orgProj: Project) => orgProj.created_at,
                    type: 'datetime',
                    },
                }}
                sortKeys={organizationProjectSortKeys}
                defaultSortDirection='desc'
                handleRowClick={(row) => (window.location.href = `/projects/${tableRef.current?.data[row].project.id}/`)}
                rowStyle='py-2'
                enabledDisplayModes={['grid']}
                defaultDisplayMode='grid'
                gridDetails={(op) => ({
                    title: op.project.name,
                    thumbnail: op.project.thumbnail,
                    details: [
                    {
                        what: 'Created At',
                        label: `${new Date(String(op.project.created_at)).toLocaleString().split(' ')[0]}`,
                        decal: <CalendarIcon />
                    },
                    {
                        what: 'Owner',
                        label: `${op.project.owner.first_name} ${op.project.owner.last_name}`,
                        decal: <FaceIcon />
                    },
                    ]
                })}
                />
            
        </div>
    )
  }

  const MembersTab = () => {
    return (
        <div>

        </div>
    )
  }

  return (
    <div>
      {
        err ? <h1 className='flex w-screen text-center items-center header-1 mt-24 ml-10'>Error Loading. Please refresh page.</h1> 
      : 
        <div className='w-full p-10'>
            <div className='flex items-center h-20 mb-2'>
                {org?.thumbnail && <img src={org?.thumbnail} className='w-20 mr-5 aspect-square rounded-full object-cover'/>}
                <h1 className='font-bold text-3xl'>{org?.name}</h1>
            </div>
            {org?.description && <p className='italic mt-5 mb-5'>{org?.description}</p>}

            <div className='flex items-center h-5 my-10'> 
                <div className='flex mx-auto' title='Members Count'>
                    <div className={orgStatsDecalClasses}>
                        <PersonIcon />
                    </div>
                    <p className='my-auto text-sm ml-1'>{org?.members_count}</p>
                </div>
                <div className='flex mx-auto' title='Created At'>
                    <div className={orgStatsDecalClasses}>
                        <CalendarIcon />
                    </div>
                    <p className='my-auto text-sm ml-1'>{org?.created_at?.toString().split('T')[0]}</p>
                </div>
                <div className='flex mx-auto' title={`Owner (${org?.owner.username})`}>
                    <div className={orgStatsDecalClasses}>
                        <PersonIcon />
                    </div>
                    <p className='my-auto text-sm ml-1'>{`${org?.owner.first_name} ${org?.owner.last_name}`}</p>
                </div>
                <div className='flex mx-auto' title={`Owner (${org?.owner.username})`}>
                    <div className={orgStatsDecalClasses}>
                        <EyeOpenIcon />
                    </div>
                    <p className='my-auto text-sm ml-1'>{org?.is_public ? 'Public' : 'Private'}</p>
                </div>
            </div>
            <div className='flex items-center w-full'>
                <div className='w-[90%] mx-auto'>
                    <TabSystem tabs={[
                        { title: 'Projects', element: <ProjectsTab /> },
                        { title: 'Members', element: <MembersTab /> },
                    ]}/>
                </div>
            </div>
        </div>
      }
    </div>
  )
}

export default Overview
