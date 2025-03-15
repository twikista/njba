import React from 'react';
import Link from 'next/link';
import { CgMathPlus } from 'react-icons/cg';
import ResourceFilter from '../../slide';
import DashboardLayout from '../../layout/DashboardLayout';

export default function IssuesEmptyState({ status, user }) {
  return (
    <DashboardLayout>
      <div className='flex flex-row-reverse items-center justify-between pb-3 border-b-2 border-200'>
        {user && (
          <Link
            href='/dashboard/issues/new-issue'
            className='flex gap-1 btn-primary btn '
          >
            <CgMathPlus />
            <span>Add new issue</span>
            {/* <CgMathPlus /> */}
          </Link>
        )}
        <ResourceFilter status={status} />
      </div>
      <section className='flex flex-col'>
        <div className='flex items-center justify-center flex-1 my-24'>
          <p className='text-2xl font-medium text-center text-gray-400'>
            {status == 'published' || status === 'undefined'
              ? 'No Published Issues'
              : 'Oops! No pending pending/unpublished issue'}
          </p>
        </div>
      </section>
    </DashboardLayout>
  );
}
