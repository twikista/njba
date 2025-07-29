import ArticlesInIssue from '@/components/shared/ArticlesInIssue';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import { H1 } from '@/components/shared/headings';
import Main from '@/components/shared/Main';
import { getArticlesInCurrentIssue } from '@/lib/actions/articles';
import { formatDate } from '@/lib/helper';
import React from 'react';

export default async function page() {
  const response = await getArticlesInCurrentIssue();
  const { currentIssue, articlesInCurrentIssue } = response;
  if (!articlesInCurrentIssue.length) {
    return (
      <div className='flex flex-col min-h-screen'>
        <Header />
        <Main className='h-full gap-4'>
          {/* <H1 className='mt-5'>Current</H1> */}
          <div className='flex items-center justify-center h-full font-medium'>
            <p className='text-neutral-500 md:text-3xl'>
              Current issue will be uploaded soon
            </p>
          </div>
        </Main>
        <Footer />
      </div>
    );
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <Main>
        <div className=''>
          <H1 className='mt-5 '>{`MSR - ${currentIssue?.issueTitle}`}</H1>
          <span className='text-[#808080] text-sm'>{`Published: ${formatDate(
            currentIssue.publishDate
          )}`}</span>
        </div>
        <section className='space-y-5'>
          <ArticlesInIssue
            articlesInIssue={articlesInCurrentIssue}
            path='current'
          />
        </section>
      </Main>
      <Footer />
    </div>
  );
}
