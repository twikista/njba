// components/PDFDownloadButtonAPI.tsx
'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';
import { BsDownload } from 'react-icons/bs';
import { PDFIcon } from '../icons/icons';

export default function PDFDownloadButton({ fileName, variant = 'basic' }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const handleDownload = async () => {
    setIsDownloading(true);

    try {
      const url = `/api/pdf?file=${encodeURIComponent(fileName)}&action=download`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Download failed');
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName || 'document.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download PDF');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className={cn(
        variant === 'basic'
          ? 'flex w-[60pxpx] items-center justify-center text-gray-200 px-2 py-1 rounded-md border border-gray-200 sm:w-[140px] hover:bg-gray-200 hover:text-neutral-700 transition-colors  text-center gap-2'
          : 'flex w-full border-primary text-primary justify-center gap-2 px-3 py-1 border hover:border-lightPrimary md:w-fit rounded-md items-center text-center hover:text-white hover:bg-primary transition-all duration-200 ease-in-out'
      )}
    >
      {isDownloading && (
        <svg className='animate-spin h-4 w-4' viewBox='0 0 24 24'>
          <circle
            className='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='4'
            fill='none'
          />
          <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
          />
        </svg>
      )}
      {variant === 'basic' ? (
        <>
          {' '}
          <BsDownload className='w-4' />
          <span className='hidden sm:block'>
            {isDownloading ? 'Downloading...' : 'Download'}
          </span>
        </>
      ) : (
        <>
          <span>{isDownloading ? 'Downloading...' : 'Download PDF'}</span>
          <PDFIcon
            className={`w-5 ${isDownloading ? 'hidden' : 'inline-block'}`}
          />
        </>
      )}
    </button>
  );
}
