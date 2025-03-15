import React from 'react';
import DashboardLayout from '@/components/dashboard/layout/DashboardLayout';
import IssueForm from '@/components/forms/issue/IssueForm';

export default function NewIssue() {
  const initialFormState = {
    issueNumber: '',
    volume: '',
    issueYear: new Date().getFullYear(),
    issueType: 'regular-issue',
    issueTheme: '',
  };
  return (
    <DashboardLayout>
      <IssueForm initialFormState={initialFormState} />
    </DashboardLayout>
  );
}
