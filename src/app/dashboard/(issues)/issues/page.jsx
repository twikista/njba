import React from 'react';
import { auth } from '../../../../../auth';
import { getIssues } from '@/lib/actions/issues';
import Issues from '@/components/dashboard/issues/Issues';
import IssuesEmptyState from '@/components/dashboard/issues/forms/IssuesEmptyState';

export default async function IssuesPage({ searchParams }) {
  console.log(searchParams);
  const { user } = await auth();
  // const user = {
  //   email: 'aaronanama@gmail.com',
  //   firstName: 'Darlington',
  //   lastName: 'Ogbeide',
  //   isAdmin: false,
  //   role: 'admin',
  // }
  const status = String((await searchParams).status);
  console.log('status', status === 'undefined');
  // const issues = status
  //   ? await getIssues(status)
  //   : await getIssues('published');
  const issues = await getIssues(status === 'undefined' ? 'published' : status);

  return (
    <>
      {!issues?.length ? (
        <IssuesEmptyState status={status} user={user} />
      ) : (
        <Issues issues={issues} status={status} user={user} />
      )}
    </>
  );
}
