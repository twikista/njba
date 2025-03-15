import React from 'react';
import DashboardLayout from '@/components/dashboard/layout/DashboardLayout';
import IssueForm from '@/components/forms/issue/IssueForm';
import { getIssue } from '@/lib/actions/issues';

export default async function UpdateIssue({ params }) {
  const param = await params;
  const issue = await getIssue(await param?.issue);
  const initialFormState = {
    issueNumber: issue?.issueNumber,
    issueYear: issue?.issueYear,
    volume: issue?.volume,
    issueType: issue?.issueType,
    issueTheme: issue?.issueTheme,
    id: JSON.stringify(issue?._id),
  };
  return (
    <DashboardLayout>
      <IssueForm initialFormState={initialFormState} />
    </DashboardLayout>
  );
}
