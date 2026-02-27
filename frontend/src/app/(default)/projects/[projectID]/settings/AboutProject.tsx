import DragAndDrop, { DragAndDropRef } from '@/components/DragAndDrop';
import { InputBox, InputBoxRef } from '@/components/ui/inputs/InputBox';
import { useSnackbar } from '@/hooks/useSnackbar';
import projectsApi from '@/lib/api/handlers/projects';
import { Project, ProjectPayload, projectPermissions } from '@/lib/types/api/projects';
import { User } from '@/lib/types/api/users';
import { useEffect, useRef, useState } from 'react';
import { ProjectPermissions } from '@/lib/types/api/projects';
import { Button } from '@/components/ui/Button';
import { extractAxiosErrMsg } from '@/lib/api/axios';
import { convertFormData } from '@/lib/api/base';

interface Props {
  prj: Project;
  setPrj: React.Dispatch<React.SetStateAction<Project | undefined>>;
  user: User;
  userPerm: ProjectPermissions | 'owner';
}

export const AboutProject = ({ prj, setPrj, user, userPerm }: Props) => {
  const snackbar = useSnackbar();
  const prjNameRef = useRef<InputBoxRef | null>(null);
  const prjDescRef = useRef<InputBoxRef | null>(null);
  const permissionDropdownView = useRef<HTMLSelectElement | null>(null);
  const dropboxRef = useRef<DragAndDropRef>(null);
  const removeThumbnailCheckRef = useRef<InputBoxRef>(null);

  useEffect(() => {}, []);

  // submit changes
  const updatePrj = () => {
    // fill out update information if filled out
    const payload: Partial<ProjectPayload> = {};
    if (prjNameRef.current?.inputValue !== '') payload.name = prjNameRef.current?.inputValue;

    if (prjDescRef.current?.inputValue !== '') payload.description = prjDescRef.current?.inputValue;

    if (dropboxRef.current?.files && dropboxRef.current?.files?.length! > 0)
      payload.thumbnail = dropboxRef.current.files[0];

    // delete thumbnail if checkbox clicked
    // if (removeThumbnailCheckRef.current?.isChecked) payload.thumbnail = null;

    if (permissionDropdownView.current) payload.permission = permissionDropdownView.current.value as ProjectPermissions;

    prj?.id &&
      projectsApi(prj.id)
        .update(convertFormData<Partial<ProjectPayload>>(payload))
        .then((res) => {
          snackbar('Updated Project!', 'success');
          setPrj(res);
        })
        .catch((err) => {
          snackbar(extractAxiosErrMsg(err, 'Failed to update project!'), 'error');
        });
  };

  const resetPage = () => {
    prjNameRef.current?.setInputValue('');
    prjDescRef.current?.setInputValue('');
    dropboxRef.current?.setFiles([]);
  };

  return (
    <div className='w-full flex-col'>
      <h1>Project Title:</h1>
      <InputBox
        disabled={userPerm !== 'admin'}
        ref={prjNameRef}
        placeholder={prj?.name ?? ''}
        className='bg-white text-black mb-3 border-0 w-full'
      />
      <h1>Project Description:</h1>
      <InputBox
        disabled={userPerm !== 'admin'}
        ref={prjDescRef}
        placeholder={prj?.description ?? ''}
        className='bg-white text-black mb-3 border-0 w-full'
      />
      <h1>Default Permisson:</h1>
      <select
        disabled={userPerm !== 'admin'}
        ref={permissionDropdownView}
        className='bg-white text-black mb-3 p-2 rounded-md disabled:opacity-50'
        defaultValue={prj?.permission ?? ''}
      >
        {Object.entries(projectPermissions).map((p) => (
          <option key={p[0]} value={p[0]}>
            {p[0]}
          </option>
        ))}
      </select>
      <h1>Thumbnail:</h1>
      <DragAndDrop ref={dropboxRef} disabled={userPerm !== 'admin'} accept='image/*' multiple={false} />
      {prj?.thumbnail !== null && (
        <>
          <InputBox type='checkbox' disabled={userPerm !== 'admin'} ref={removeThumbnailCheckRef} />
          <span className='ml-1'>Remove thumbnail?</span>
        </>
      )}
      <div className='w-max mt-8 flex'>
        <Button className='bg-primary-green' disabled={userPerm !== 'admin'} onClick={updatePrj}>
          Save Changes
        </Button>
        <Button
          disabled={userPerm !== 'admin'}
          className='bg-light-tertiary dark:bg-dark-tertiary ml-3'
          onClick={resetPage}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
