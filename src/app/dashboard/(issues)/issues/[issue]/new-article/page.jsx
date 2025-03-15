import DashboardLayout from '@/components/Dashboard/layout/DashboardLayout'
import ArticleForm from '../../../../../../../components/Dashboard/forms/add-article'
import React, { Suspense } from 'react'
import { getIssue } from '@/lib/actions/issues'
import DashboardLayout from '@/components/dashboard/layout/DashboardLayout'

const initialState = {
  title: '',
  authors: [{ name: '', department: '', institution: '' }],
  volume: '1',
  issue: '1',
  startPage: null,
  endPage: null,
  abstract: '',
  keywords: [],
  jelClassifications: [],
  pdfFile: '',
}

export default async function AddArticlePage({ params }) {
  const articleIssue = await getIssue(params.issue)
  const volume = articleIssue?.volume
  const issue = articleIssue?.issueNumber
  const publishDate = articleIssue?.publishDate
  console.log(articleIssue)

  return (
    <DashboardLayout>
      <Suspense fallback={<div>loading...</div>}>
        <ArticleForm
          initialValue={{ ...initialState, volume, issue }}
          params={{
            ...params,
            published: articleIssue?.published,
            publishDate: publishDate,
          }}
        />
      </Suspense>
    </DashboardLayout>
  )
}
