import React from 'react';
import DashboardLayout from '@/components/dashboard/layout/DashboardLayout';
import Link from 'next/link';
import { default as CreateButton } from '@/components/buttons/AddButton';
import ResourceFilter from '@/components/dashboard/slide';
import DeleteButton from '@/components/buttons/DeleteButton';
import EditButton from '@/components/buttons/EditButton';
import {
  deleteIssueWithArticles,
  deleteIssueWithNoArticles,
} from '@/lib/actions/issues';

export default function Issues({ issues, user, status }) {
  return (
    <DashboardLayout>
      <div className='flex flex-row-reverse items-center justify-between pb-3 border-200'>
        <CreateButton href='/dashboard/issues/new-issue' label='Add Issue' />
        <ResourceFilter />
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
              {user.role === 'admin' && (
                <>
                  <th className='sr-only'></th>
                  <th className='sr-only'></th>
                </>
              )}
            </tr>
          </thead>
          <tbody className='text-center bg-white divide-y-2 rounded-sm'>
            {issues.map((issue, index) => (
              <tr className='py-5 text-sm md:text-base' key={issue?._id}>
                <td className='px-4 py-4 text-center border border-solid'>
                  <Link
                    className='text-center hover:text-blue-500 hover:underline font-medium'
                    href={`/dashboard/issues/${issue?.ref}`}
                  >{`NJBA ${issue.issueTitle}`}</Link>
                </td>
                <td className='px-4 py-4 text-center border border-solid'>
                  {issue?.status === 'published' ? (
                    <span className='px-1 py-[5px] space-x-1 text-center w-fit'>
                      Published
                    </span>
                  ) : (
                    <span className='flex items-center px-1 py-1 space-x-1'>
                      Draft
                    </span>
                  )}
                </td>
                <td className='px-4 py-4 text-center border border-solid'>
                  <span>
                    {issue?.published
                      ? new Intl.DateTimeFormat('en-GB').format(
                          issue?.publishDate
                        )
                      : 'N/A'}
                  </span>
                </td>
                {(!issue.published || user.role === 'admin') && (
                  <>
                    <td className='px-4 py-4 text-center'>
                      <EditButton
                        href={`/dashboard/issues/${issue?.ref}/edit`}
                        variant='secondary'
                      />
                    </td>
                    <td className='px-4 py-4 text-center'>
                      <DeleteButton
                        action={
                          issue?.articles.length > 0
                            ? deleteIssueWithArticles
                            : deleteIssueWithNoArticles
                        }
                        id={String(issue?._id)}
                        variant='secondary'
                      />
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
