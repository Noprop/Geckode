'use client';

import Link from 'next/link';
import { ReactElement } from 'react';

interface Props {
  lhs?: ReactElement;
  middle?: ReactElement;
  rhs?: ReactElement;
}

// universal classes for all header btns
export const headerBtnClasses: string =
  'cursor-pointer flex items-center justify-center w-8 h-8 rounded-md bg-white/15 text-white hover:bg-white/25 transition-colors border border-white/20 shadow-sm';

export default function Header({ lhs, middle, rhs }: Props) {
  return (
    <header className='bg-primary-green flex items-center h-16 px-4 shadow-md'>
      {/* Left section - Logo */}
      <div className='flex items-center basis-1/3'>
        <Link href='/' className='hover:opacity-90 transition-opacity overflow-hidden h-10'>
          <p className='text-3xl'>Geckode</p>
        </Link>

        {/* Project controls section - Scratch style */}
        {lhs}
      </div>

      {/* Center section - Workspace Toggle */}
      <div className='flex items-center basis-1/3 justify-center flex-1'>{middle}</div>

      {/* Right section - Utility actions */}
      <div className='flex items-center basis-1/3 justify-end gap-2'>{rhs}</div>
    </header>
  );
}
