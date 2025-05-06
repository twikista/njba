import React from 'react';

export default function ArticleStats({ currentArticle }) {
  return (
    <div className='space-y-1'>
      <h2 className='font-semibold flex items-center gap-1'>
        Article Statistics
      </h2>
      <div className='flex justify-between sm:justify-start gap-8 text-sm'>
        <article className='flex flex-col items-center'>
          <span>Downloads</span>
          <span>{currentArticle?.downloads || 0}</span>
        </article>
        <article className='flex flex-col items-center'>
          <span>Article Views</span>
          <span>{currentArticle?.articleViews || 0}</span>
        </article>
        <article className='flex flex-col items-center'>
          <span>Abstract Views</span>
          <span>{currentArticle?.abstractViews || 0}</span>
        </article>
      </div>
    </div>
  );
}
