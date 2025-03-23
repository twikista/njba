'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { incrementArticleViews } from '@/lib/routes/pdf';

const PDFViewer = dynamic(() => import('@/components/shared/PDFViewer'), {
  ssr: false,
});

export default function ViewArticlePdf({ filePath, params, articleId }) {
  const [viewCountUpdated, setViewCountUpdated] = useState(false);

  // Create a callback function to handle successful PDF load
  const handlePdfLoaded = async () => {
    console.log('PDF loaded');
    if (!viewCountUpdated) {
      // Only increment once per component lifecycle
      const updatedCount = await incrementArticleViews(
        articleId,
        params.issue,
        params.article
      );
      setViewCountUpdated(true);
    }
  };

  return (
    <div className='flex flex-col min-h-screen bg-neutral-600'>
      <PDFViewer
        filePath={filePath}
        params={params}
        onPdfLoaded={handlePdfLoaded}
        articleId={articleId}
      />
    </div>
  );
}
