import DragAndDrop, { DragAndDropRef } from '@/components/DragAndDrop';
import { InputBox, InputBoxRef } from '@/components/ui/inputs/InputBox';
import { useSnackbar } from '@/hooks/useSnackbar';
import organizationsApi from '@/lib/api/handlers/organizations';
import { Organization, OrganizationPayload } from '@/lib/types/api/organizations';
import { User } from '@/lib/types/api/users';
import { useEffect, useRef, useState } from 'react';
import { createSlug } from '../../page';
import { OrgPermissions } from '@/lib/types/api/organizations/invitations';
import { Button } from '@/components/ui/Button';
import { extractAxiosErrMsg } from '@/lib/api/axios';
import { convertFormData } from '@/lib/api/base';

interface Props {
  org: Organization;
  setOrg: React.Dispatch<React.SetStateAction<Organization | undefined>>;
  user: User;
  userPerm: string;
}

export const AboutOrganization = ({ org, setOrg, user, userPerm }: Props) => {
  const snackbar = useSnackbar();
  const orgNameRef = useRef<InputBoxRef | null>(null);
  const orgDescRef = useRef<InputBoxRef | null>(null);
  const permissionDropdownView = useRef<HTMLSelectElement | null>(null);
  const dropboxRef = useRef<DragAndDropRef>(null);
  const removeThumbnailCheckRef = useRef<InputBoxRef>(null);

  const [slug, setSlug] = useState<string>('');

  useEffect(() => {}, []);

  // submit changes
  const updateOrg = () => {
    // fill out update information if filled out
    const payload: Partial<OrganizationPayload> = {};
    if (orgNameRef.current?.inputValue !== '') payload.name = orgNameRef.current?.inputValue;

    if (slug !== '') payload.slug = slug;

    if (orgDescRef.current?.inputValue !== '') payload.description = orgDescRef.current?.inputValue;

    if (dropboxRef.current?.files && dropboxRef.current?.files?.length! > 0)
      payload.thumbnail = dropboxRef.current.files[0];

    // delete thumbnail if checkbox clicked
    // if (removeThumbnailCheckRef.current?.isChecked) payload.thumbnail = null;

    if (permissionDropdownView.current) payload.default_member_permission = permissionDropdownView.current.value;

    org?.id &&
      organizationsApi(org.id)
        .update(convertFormData(payload))
        .then(() => {
          snackbar('Updated Organization!', 'success');
        })
        .catch((err) => {
          snackbar(extractAxiosErrMsg(err, 'Failed to update organization!'), 'error');
        });
  };

  const resetPage = () => {
    orgNameRef.current?.setInputValue('');
    orgDescRef.current?.setInputValue('');
    dropboxRef.current?.setFiles([]);
  };

  return (
    <div className='w-full flex-col'>
      <h1>Organization Title:</h1>
      <InputBox
        ref={orgNameRef}
        placeholder={org?.name ?? ''}
        className='bg-white text-black mb-3 border-0 w-full'
        onChange={(e) => setSlug(createSlug(e.target.value))}
        disabled={userPerm !== 'admin'}
      />
      <p className='mb-6 h-4 text-white'>{slug}</p>
      <h1>Organization Description:</h1>
      <InputBox
        ref={orgDescRef}
        placeholder={org?.description ?? ''}
        className='bg-white text-black mb-3 border-0 w-full'
        disabled={userPerm !== 'admin'}
      />
      <h1>Default Permisson:</h1>
      <select
        ref={permissionDropdownView}
        className='bg-white text-black mb-3 p-2 rounded-md disabled:opacity-50'
        defaultValue={org?.default_member_permission ?? ''}
        disabled={userPerm !== 'admin'}
      >
        {OrgPermissions.map((p) => (
          <option key={p[0]} value={p[0]}>
            {p.join(' - ')}
          </option>
        ))}
      </select>
      <h1>Thumbnail:</h1>
      {org?.thumbnail !== null && (
        <>
          <InputBox type='checkbox' disabled={userPerm !== 'admin'} ref={removeThumbnailCheckRef} />
          <span className='ml-1'>Remove thumbnail?</span>
        </>
      )}
      <DragAndDrop ref={dropboxRef} accept='image/*' disabled={userPerm !== 'admin'} multiple={false} />
      <div className='w-max mt-8 flex'>
        <Button className='bg-primary-green' disabled={userPerm !== 'admin'} onClick={updateOrg}>
          Save Changes
        </Button>
        <Button
          className='bg-light-tertiary dark:bg-dark-tertiary ml-3'
          disabled={userPerm !== 'admin'}
          onClick={resetPage}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
