'use client';

import DragAndDrop, { DragAndDropRef } from '@/components/DragAndDrop';
import { InputBox, InputBoxRef } from '@/components/ui/inputs/InputBox';
import { useSnackbar } from '@/hooks/useSnackbar';
import { authApi } from '@/lib/api/auth';
import { extractAxiosErrMsg } from '@/lib/api/axios';
import { convertFormData } from '@/lib/api/base';
import usersApi from '@/lib/api/handlers/users';
import { User, UserPayload } from '@/lib/types/api/users';
import { Button } from '@/components/ui/Button';
import React, { useEffect, useRef, useState } from 'react';

// TODO: Make ability to change password!

const AccountSettings = () => {
  const snackbar = useSnackbar();
  const usernameRef = useRef<InputBoxRef | null>(null);
  const firstNameRef = useRef<InputBoxRef | null>(null);
  const lastNameRef = useRef<InputBoxRef | null>(null);
  const dropboxRef = useRef<DragAndDropRef>(null);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    authApi
      .getUserDetails()
      .then((res) => setUser(res))
      .catch((err) => {
        snackbar('Failed to get user! Please try again.', 'error');
      });
  }, []);

  // submit changes
  const updateUser = () => {
    // fill out update information if filled out
    const payload: Partial<UserPayload> = {};
    if (usernameRef.current?.inputValue !== '') payload.username = usernameRef.current?.inputValue;
    if (dropboxRef.current?.files && dropboxRef.current?.files.length > 0)
      payload.avatar = dropboxRef.current?.files[0];

    user &&
      usersApi(user.id)
        .update(convertFormData(payload))
        .then((res) => {
          snackbar('Updated User!', 'success');
          setUser(res);
        })
        .catch((err) => {
          snackbar(extractAxiosErrMsg(err, 'Failed to update user!'), 'error');
        });
  };

  const resetPage = () => {
    usernameRef.current?.setInputValue('');
    dropboxRef.current?.setFiles([]);
  };

  return (
    <div className='mx-50 my-5'>
      <h1 className='header-1 mt-4'>My Account</h1>
      <h1 className='header-2 mt-20 h-12'>{user?.username}</h1>
      <div className='w-full flex-col'>
        <h1>Project Title:</h1>
        <InputBox
          ref={usernameRef}
          placeholder={user?.username ?? ''}
          className='bg-white text-black mb-3 border-0 w-full'
        />
        <h1>First Name:</h1>
        <InputBox
          ref={firstNameRef}
          placeholder={user?.first_name ?? ''}
          className='bg-white text-black mb-3 border-0 w-full'
        />
        <h1>Last Name:</h1>
        <InputBox
          ref={lastNameRef}
          placeholder={user?.last_name ?? ''}
          className='bg-white text-black mb-3 border-0 w-full'
        />
        <h1>Avatar:</h1>
        <DragAndDrop ref={dropboxRef} accept='image/*' multiple={false} />
        <div className='w-max h-10 mt-8 flex'>
          <Button className='bg-primary-green px-2' onClick={updateUser}>
            Save Changes
          </Button>
          <Button className='bg-light-tertiary dark:bg-dark-tertiary ml-3' onClick={resetPage}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
