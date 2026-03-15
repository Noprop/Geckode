'use client';

import projectsApi from '@/lib/api/handlers/projects';
import { Project, ProjectFilters, ProjectSortKeys, ProjectPayload, projectSortKeys } from '@/lib/types/api/projects';
import { useEffect, useRef, useState } from 'react';
import { Table, TableRef } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/modals/Modal';
import { InputBox, InputBoxRef } from '@/components/ui/inputs/InputBox';
import { useSnackbar } from '@/hooks/useSnackbar';
import { convertFormData } from '@/lib/api/base';
import { ThumbnailUpload } from '@/components/ui/ThumbnailUpload';
import { FilePlusIcon, Share1Icon, TrashIcon, PlayIcon, OpenInNewWindowIcon, FaceIcon, PersonIcon } from '@radix-ui/react-icons';
import { ProjectShareModal } from '@/components/ui/modals/ProjectShareModal';
import { SelectionBox } from '@/components/ui/selectors/SelectionBox';
import { useUser } from '@/contexts/UserContext';
import { extractAxiosErrMsg } from '@/lib/api/axios';
import type { AxiosError } from 'axios';
import { SidePanel } from '@/components/ui/SidePanel';
import { ProjectDetailPanel } from '@/components/ui/ProjectDetailPanel';
import { EditableTextField } from '@/components/ui/inputs/EditableTextField';
import { CalendarIcon } from '@radix-ui/react-icons';

const ROW_SINGLE_CLICK_DELAY_MS = 300;

export default function ProjectsPage() {
  const showSnackbar = useSnackbar();
  const user = useUser();

  const tableRef = useRef<TableRef<Project, ProjectFilters> | null>(null);
  const projectNameRef = useRef<InputBoxRef | null>(null);
  const autoProjectOpenRef = useRef<InputBoxRef | null>(null);
  const openPanelTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [showModal, setShowModal] = useState<null | "create" | "delete" | "share">(null);
  const [projectToShare, setProjectToShare] = useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [createThumbnailFile, setCreateThumbnailFile] = useState<File | null>(null);

  const handleRowClick = (id: number) => {
    if (openPanelTimeoutRef.current) clearTimeout(openPanelTimeoutRef.current);
    openPanelTimeoutRef.current = setTimeout(() => {
      openPanelTimeoutRef.current = null;
      setSelectedProject(tableRef.current?.data[id]!);
    }, ROW_SINGLE_CLICK_DELAY_MS);
  };

  const handleRowDoubleClick = (row: number) => {
    if (openPanelTimeoutRef.current) {
      clearTimeout(openPanelTimeoutRef.current);
      openPanelTimeoutRef.current = null;
    }
    window.location.href = `/projects/${tableRef.current?.data[row].id}`;
  };

  useEffect(() => {
    return () => {
      if (openPanelTimeoutRef.current) clearTimeout(openPanelTimeoutRef.current);
    };
  }, []);

  const updateProjectInTable = (updated: Project) => {
    setSelectedProject(updated);
    tableRef.current?.setData((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
  };

  const createProject = () => {
    const payload: ProjectPayload = {
      name: projectNameRef?.current?.inputValue || "",
    };
    if (createThumbnailFile) payload.thumbnail = createThumbnailFile;
    projectsApi
      .create(convertFormData(payload))
      .then((project) => {
        setCreateThumbnailFile(null);
        if (autoProjectOpenRef.current?.isChecked) {
          window.location.href = `/projects/${project.id}`;
        } else {
          tableRef.current?.setData((prev) => [...prev, project]);
          setShowModal(null);
        }
      })
      .catch((err) => showSnackbar(extractAxiosErrMsg(err, 'Failed to create project'), 'error'));
  };

  const deleteProject = () => {
    const project = projectToDelete;
    if (!project?.id) return;

    projectsApi(project.id)
      .delete()
      .then(() => {
        showSnackbar('Succesfully deleted the project!', 'success');
        setShowModal(null);
        setProjectToDelete(null);
        if (selectedProject?.id === project.id) setSelectedProject(null);
        tableRef.current?.setData((prev) => prev.filter((p) => p.id !== project.id));
      })
      .catch((err) => showSnackbar(extractAxiosErrMsg(err, 'Something went wrong. Please try again.'), 'error'));
  };

  return (
    <div className='mx-20 my-5'>
      <div className='flex w-full'>
        <h1 className='header-1'>Projects</h1>
        <div className='flex w-full justify-end'></div>
      </div>

      <Table<Project, ProjectPayload, ProjectFilters, ProjectSortKeys, typeof projectsApi>
        ref={tableRef}
        api={projectsApi}
        columns={{
          id: {
            key: 'id',
            hidden: true,
          },
          Thumbnail: {
            key: 'thumbnail',
            type: 'thumbnail',
            hideLabel: true,
            style: 'w-18',
          },
          Name: {
            key: 'name',
            style: 'min-w-50',
          },
          Owner: {
            key: 'owner',
            type: 'user',
          },
          'Last Updated': {
            key: 'updated_at',
            type: 'time-since',
          },
          Created: {
            key: 'created_at',
            type: 'datetime',
          },
        }}
        sortKeys={projectSortKeys}
        defaultSortField="updated_at"
        defaultSortDirection="desc"
        handleRowClick={handleRowClick}
        handleRowDoubleClick={handleRowDoubleClick}
        actions={[
          {
            rowIcon: OpenInNewWindowIcon,
            rowIconSize: 22,
            rowIconTitle: 'Open project',
            rowIconClicked: (index) => {
              const project = tableRef.current?.data?.[index];
              if (project) window.location.href = `/projects/${project.id}`;
            },
            rowIconClassName: 'hover:text-green-500 mt-1',
          },
          {
            rowIcon: PlayIcon,
            rowIconSize: 24,
            rowIconTitle: 'Play game',
            rowIconClicked: (index) => {
              const project = tableRef.current?.data?.[index];
              const token = project?.default_share_link?.token;
              if (!token) return;
              window.open(`/play/${token}`, '_blank');
            },
            rowIconClassName: 'hover:text-green-500 mt-1',
            canUse: (project) => !!project.default_share_link,
          },
          {
            rowIcon: Share1Icon,
            rowIconSize: 24,
            rowIconTitle: 'Share project',
            rowIconClicked: (index) => {
              const project = tableRef.current?.data?.[index];
              if (project) setProjectToShare(project);
              setShowModal('share');
            },
            rowIconClassName: 'hover:text-green-500 mt-1',
            canUse: (project) => ['owner', 'admin', 'manage', 'invite'].includes(project.permission ?? ''),
          },
          {
            rowIcon: TrashIcon,
            rowIconSize: 24,
            rowIconTitle: 'Delete project',
            rowIconClicked: (index) => {
              const project = tableRef.current?.data?.[index];
              if (project) setProjectToDelete(project);
              setShowModal('delete');
            },
            rowIconClassName: 'hover:text-red-500 mt-1',
            canUse: (project) => project.permission === 'owner',
          },
        ]}
        extras={
          <div className='flex justify-between'>
            <SelectionBox
              className='border border-gray-400/50 rounded-md mr-3'
              options={[
                { value: '', label: 'Owned by anyone' },
                { value: user?.id ?? '', label: 'Owned by me' },
                { value: '0', label: 'Owned by others' },
              ]}
              onChange={(e) => {
                tableRef.current?.setFilters((filters) => ({
                  ...filters,
                  ...{
                    owner: e.target.value ? Number(e.target.value) : undefined,
                  },
                }));
              }}
            />
            <Button onClick={() => setShowModal('create')} className='btn-confirm'>
              Create Project
            </Button>
          </div>
        }
        rowStyle='py-2'
        enabledDisplayModes={['table', 'grid']}
        gridDetails={(prj) => ({
          title: prj.name,
          thumbnail: prj.thumbnail,
          details: [
            {
              what: 'Created At',
              label: `${new Date(String(prj.created_at)).toLocaleString().split(' ')[0]}`,
              decal: <CalendarIcon />
            },
            {
              what: 'Owner',
              label: `${prj.owner.first_name} ${prj.owner.last_name}`,
              decal: <FaceIcon />
            },
          ]
        })}
      />

      {showModal === 'create' ? (
        <Modal
          title='Create Project'
          icon={FilePlusIcon}
          actions={
            <>
              <Button onClick={createProject} className='btn-confirm ml-3'>
                Create
              </Button>
              <Button
                onClick={() => {
                  setShowModal(null);
                  setCreateThumbnailFile(null);
                }}
                className="bg-neutral"
              >
                Cancel
              </Button>
            </>
          }
        >
          <div className='flex flex-col gap-4'>
            <div>
              <label className='mb-1 block text-sm font-medium text-muted-foreground'>Project name</label>
              <InputBox ref={projectNameRef} placeholder='Project name' className='bg-white text-black border-0' />
            </div>
            <ThumbnailUpload onFileSelect={setCreateThumbnailFile} label='Thumbnail' />
            <div className="flex align-center">
              <InputBox ref={autoProjectOpenRef} type='checkbox' defaultChecked={true} className='mr-2' />
              Automatically open the project after creation
            </div>
          </div>
        </Modal>
      ) : showModal === 'delete' && projectToDelete ? (
        <Modal
          className='bg-red-500'
          title='Delete Project'
          subtitle={projectToDelete.name}
          text='Are you sure you would like to delete this project? This is a
                permanent change that cannot be undone.'
          icon={TrashIcon}
          actions={
            <>
              <Button onClick={deleteProject} className='btn-deny ml-3'>
                Delete
              </Button>
              <Button
                onClick={() => {
                  setShowModal(null);
                  setProjectToDelete(null);
                }}
                className='bg-neutral'
              >
                Cancel
              </Button>
            </>
          }
        />
      ) : showModal === 'share' && projectToShare ? (
        <ProjectShareModal
          onClose={() => { 
            setShowModal(null);
            setProjectToShare(null);
          }}
          project={projectToShare}
        />
      ) : null}

      <SidePanel
        open={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        blocking={false}
        title={
          selectedProject ? (
            <EditableTextField
              value={selectedProject.name}
              onSave={(name) => {
                const previousProject = selectedProject;
                updateProjectInTable({ ...selectedProject, name });
                projectsApi(selectedProject.id)
                  .update({ name })
                  .then((updated) => updateProjectInTable(updated))
                  .catch((err) => {
                    updateProjectInTable(previousProject);
                    showSnackbar(extractAxiosErrMsg(err as AxiosError, "Failed to update name. Please try again."), "error");
                  });
              }}
              placeholder="Project name"
              disabled={!["owner", "admin", "manage", "code"].includes(selectedProject.permission ?? "")}
              compact
            />
          ) : undefined
        }
      >
        {selectedProject && (
          <ProjectDetailPanel
            project={selectedProject}
            onDescriptionSave={(description) => {
              const previousProject = selectedProject;
              updateProjectInTable({ ...selectedProject, description });
              projectsApi(selectedProject.id)
                .update({ description })
                .then((updated) => updateProjectInTable(updated))
                .catch((err) => {
                  updateProjectInTable(previousProject);
                  showSnackbar(extractAxiosErrMsg(err as AxiosError, "Failed to update description. Please try again."), "error");
                });
            }}
            onThumbnailChange={(file) => {
              const payload = file
                ? (convertFormData({ thumbnail: file }) as unknown as Partial<ProjectPayload>)
                : { thumbnail: null };
              projectsApi(selectedProject.id)
                .update(payload)
                .then((updated) => updateProjectInTable(updated))
                .catch((err) =>
                  showSnackbar(
                    extractAxiosErrMsg(err as AxiosError, "Failed to update thumbnail. Please try again."),
                    "error"
                  )
                );
            }}
            onOpen={() => (window.location.href = `/projects/${selectedProject.id}`)}
            onShare={() => {
              setProjectToShare(selectedProject);
              setShowModal("share");
            }}
            onDelete={() => {
              setProjectToDelete(selectedProject);
              setShowModal("delete");
            }}
            canShare={true}
            canDelete={selectedProject.permission === "owner"}
          />
        )}
      </SidePanel>
    </div>
  );
}
