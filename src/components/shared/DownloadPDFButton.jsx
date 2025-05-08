'use client';
import { cn } from '@/lib/utils';
import React from 'react';
import { BsDownload } from 'react-icons/bs';
import { PDFIcon } from '../icons/icons';

export default function DownloadPDFButton({
  // updateDownloadCount,
  filePath,
  variant = 'basic',
}) {
  return (
    <a
      href={filePath}
      // onClick={updateDownloadCount}
      download
      target='_blank'
      rel='noreferrer'
      className={cn(
        variant === 'basic'
          ? 'flex w-[60pxpx] items-center justify-center text-gray-200 px-2 py-1 border border-gray-200 sm:w-[140px] hover:bg-gray-200 hover:text-neutral-700 transition-colors  text-center gap-2'
          : 'flex w-full border-primary text-primary justify-center gap-2 px-3 py-1 border hover:border-lightPrimary md:w-fit rounded-md items-center text-center hover:text-white hover:bg-primary transition-all duration-200 ease-in-out'
      )}
    >
      {variant === 'basic' ? (
        <>
          {' '}
          <BsDownload className='w-4' />
          <span className='hidden sm:block'>Download</span>
        </>
      ) : (
        <>
          <span>Download Paper</span>
          <PDFIcon className='w-5 text-' />
        </>
      )}
    </a>
  );
}
