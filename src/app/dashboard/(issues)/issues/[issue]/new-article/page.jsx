import ArticleForm from '@/components/dashboard/article';
import React, { Suspense } from 'react';
import { getIssue } from '@/lib/actions/issues';
import DashboardLayout from '@/components/dashboard/layout/DashboardLayout';

const initialState = {
  title: '',
  authors: [{ name: '', department: '', institution: '' }],
  volume: '1',
  issue: '1',
  startPage: null,
  endPage: null,
  abstract: '',
  keywords: [],
  jelClassification: [],
  pdfFile: '',
};

export default async function NewArticle({ params }) {
  const param = await params;
  const articleIssue = await getIssue(param.issue);
  const volume = articleIssue?.volume;
  const issue = articleIssue?.issueNumber;
  const publishDate = articleIssue?.publishDate;

  return (
    <DashboardLayout>
      <Suspense fallback={<div>loading...</div>}>
        <ArticleForm
          initialFormState={{ ...initialState, volume, issue }}
          params={{
            ...param,
            published: articleIssue?.published,
            publishDate: publishDate,
          }}
        />
      </Suspense>
    </DashboardLayout>
  );
}
