import React from 'react';
import DashboardLayout from '@/components/dashboard/layout/DashboardLayout';
import ResourceFilter from '@/components/dashboard/slide';

export default function IssuesSkeletonLoader({ status }) {
  return (
    <DashboardLayout>
      <div className='flex flex-row-reverse items-center justify-between pb-3 border-200'>
        <div className='w-32 h-10 bg-gray-300 animate-pulse rounded-lg'></div>
        <ResourceFilter status={status} />
      </div>
      <div className='p-2 bg-secondary rounded-lg md:pt-0 overflow-x-auto'>
        <table className='min-w-full border-collapse'>
          <thead className='rounded-lg'>
            <tr className='text-white'>
              <th className='px-4 pt-4 pb-1 table-fixed min-w-[200px]'>
                Issue
              </th>
              <th className='px-4 pt-4 pb-1 font-medium'>Status</th>
              <th className='px-4 pt-4 pb-1 font-medium'>Publish Date</th>
              <th className='sr-only'></th>
              <th className='sr-only'></th>
            </tr>
          </thead>
          <tbody className='text-center bg-white divide-y-2 rounded-sm'>
            {[...Array(5)].map((_, index) => (
              <tr className='py-5 text-sm md:text-base' key={index}>
                <td className='px-4 py-4 text-center border border-solid'>
                  <div className='w-32 h-4 bg-gray-300 animate-pulse rounded-md mx-auto'></div>
                </td>
                <td className='px-4 py-4 text-center border border-solid'>
                  <div className='w-20 h-4 bg-gray-300 animate-pulse rounded-md mx-auto'></div>
                </td>
                <td className='px-4 py-4 text-center border border-solid'>
                  <div className='w-24 h-4 bg-gray-300 animate-pulse rounded-md mx-auto'></div>
                </td>
                <td className='px-4 py-4 text-center'>
                  <div className='w-6 h-6 bg-gray-300 animate-pulse rounded-full mx-auto'></div>
                </td>
                <td className='px-4 py-4 text-center'>
                  <div className='w-6 h-6 bg-gray-300 animate-pulse rounded-full mx-auto'></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
