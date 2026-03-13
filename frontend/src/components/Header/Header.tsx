'use client';

import Link from 'next/link';
import { ReactElement } from 'react';

interface Props {
  lhs?: ReactElement;
  middle?: ReactElement;
  rhs?: ReactElement;
}

export default function Header({ lhs, middle, rhs }: Props) {
  return (
    <header className='bg-primary-green relative flex items-center h-16 px-4 shadow-md'>
      {/* Left section - Logo + project controls */}
      <div className='flex items-center gap-3'>
        <Link href='/' className='hover:opacity-90 transition-opacity overflow-hidden h-10'>
          <p className='text-3xl text-white'>Geckode</p>
        </Link>

        {lhs}
      </div>

      {/* Center section - truly centered over the header */}
      {middle && (
        <div className='pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center'>
          <div className='pointer-events-auto'>{middle}</div>
        </div>
      )}

      {/* Right section - Utility actions, hugging the right edge */}
      <div className='ml-auto flex items-center justify-end gap-2'>{rhs}</div>
    </header>
  );
}
