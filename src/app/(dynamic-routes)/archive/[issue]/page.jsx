import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';

import ArticlesInIssue from '@/components/shared/ArticlesInIssue';
import { getIssue, getIssues, getPublishedIssues } from '@/lib/actions/issues';
import { connectDB } from '@/lib/mongoose/config';
import { Article } from '@/lib/mongoose/models/article';
import { dateHelperFunction, formatDate } from '@/lib/helper';
import Main from '@/components/shared/Main';
import { H1 } from '@/components/shared/headings';
import { cache, Suspense } from 'react';

const getArticlesInIssue = cache(async (issue) => {
  try {
    await connectDB();
    const articlesInIssue = await Article.find({
      ref: `${issue}`,
    }).sort({
      startPage: 1,
    });
    return articlesInIssue;
  } catch (error) {
    console.log(error);
  }
});

export async function generateStaticParams() {
  await connectDB();
  const publishedIssues = await getPublishedIssues();
  return publishedIssues?.map((i) => ({
    issue: i.ref,
  }));
}

export async function generateMetadata({ params }) {
  const param = await params;
  const issue = await getIssue(param.issue);
  return {
    title: `MSR ${issue.issueTitle}`,
  };
}

// Issue content component
async function IssueContent({ issue }) {
  const [articlesInIssue, currentIssue] = await Promise.all([
    getArticlesInIssue(issue),
    getIssue(issue),
  ]);

  return (
    <>
      <div className=''>
        <H1 className='mt-5 '>{`MSR - ${currentIssue?.issueTitle}`}</H1>
        <span className='text-[#808080] text-sm'>{`Published: ${formatDate(
          currentIssue.publishDate
        )}`}</span>
      </div>
      <section className='space-y-5'>
        <ArticlesInIssue articlesInIssue={articlesInIssue} />
      </section>
    </>
  );
}

async function IssuePage({ params }) {
  const param = await params;
  const { issue } = param;

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <Main>
        <Suspense fallback={<IssuePageLoader />}>
          <IssueContent issue={issue} />
        </Suspense>
      </Main>
      <Footer />
    </div>
  );
}

// Loader component for just the content area
function IssuePageLoader() {
  return (
    <>
      <div className='animate-pulse'>
        <div className='w-3/4 h-8 mt-5 mb-2 bg-gray-200 rounded-md'></div>
        <div className='w-1/3 h-4 mb-8 bg-gray-200 rounded-md'></div>
      </div>
      <section className='space-y-5'>
        <div className='animate-pulse'>
          {/* Simulate article loading */}
          {[1, 2, 3].map((i) => (
            <div key={i} className='p-4 mb-4 border rounded-lg'>
              <div className='w-3/4 h-6 mb-2 bg-gray-200 rounded-md'></div>
              <div className='w-1/2 h-4 mb-2 bg-gray-200 rounded-md'></div>
              <div className='w-2/3 h-4 bg-gray-200 rounded-md'></div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default IssuePage;
