import DashboardLayout from '@/components/dashboard/layout/DashboardLayout';
import React, { Suspense } from 'react';

import { getArticle } from '@/lib/actions/articles';
import EditArticleForm from '@/components/dashboard/article/edit-article';
import ArticleForm from '@/components/dashboard/article';

export default async function EditArticlePage({ params }) {
  const param = await params;
  const article = await getArticle(param);
  const plainArticleObject = JSON.parse(JSON.stringify(article));
  const initialValue = {
    ...plainArticleObject,
    pdfFile: null,
  };

  return (
    <DashboardLayout>
      <Suspense fallback={<div>loading...</div>}>
        <ArticleForm initialFormState={initialValue} params={param} />
      </Suspense>
    </DashboardLayout>
  );
}
