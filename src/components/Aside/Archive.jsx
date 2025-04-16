// components/Archive.jsx
import { Suspense } from 'react';
import Link from 'next/link';
import { getArchive } from '@/lib/actions/issues';
import { H3 } from '../shared/headings';

// Skeleton loading component
function ArchiveSkeleton() {
  return (
    <div className='space-y-3'>
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className='relative'>
          <div className='h-5 bg-gray-200 rounded w-40 md:w-48 overflow-hidden'>
            <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white to-transparent'></div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Archive content component
async function ArchiveContent() {
  const archive = await getArchive();

  return (
    <>
      {archive && archive.length ? (
        archive.map((issue) => (
          <article key={issue._id}>
            <Link
              href={`/archive/${issue?.ref}`}
              className='text-blue-500 underline hover:text-blue-700 transition-all duration-300'
            >
              {issue?.issueTitle}
            </Link>
          </article>
        ))
      ) : (
        <p className='text-gray-400'>No items</p>
      )}
    </>
  );
}

// Main Archive component
function Archive() {
  return (
    <div className='space-y-2 h-fit'>
      <H3 className='capitalize text-primary'>Archive</H3>
      <div className='space-y-[5px] flex flex-col items-center md:items-start'>
        <Suspense fallback={<ArchiveSkeleton />}>
          {/* @ts-expect-error Async Server Component */}
          <ArchiveContent />
        </Suspense>
        <Link
          href='/archive'
          className='flex items-center gap-1 mt-4 text-blue-500 hover:text-blue-700 transition-all'
        >
          See more
        </Link>
      </div>
    </div>
  );
}

export default Archive;
