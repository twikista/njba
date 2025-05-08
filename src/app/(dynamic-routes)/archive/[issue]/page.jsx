import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';

import ArticlesInIssue from '@/components/shared/ArticlesInIssue';
import { getIssue, getPublishedIssues } from '@/lib/actions/issues';
import { connectDB } from '@/lib/mongoose/config';
import { Article } from '@/lib/mongoose/models/article';
import { dateHelperFunction, formatDate } from '@/lib/helper';
import Main from '@/components/shared/Main';
import { H1 } from '@/components/shared/headings';
import { cache } from 'react';

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

// export async function generateStaticParams() {
//   const publishedIssues = await getPublishedIssues();
//   return publishedIssues?.map((issue) => issue.ref);
// }

// export async function generateMetadata({ params }) {
//   const param = await params;
//   const issue = await getIssue(param.issue);
//   return {
//     title: `BIJED ${issue.issueTitle}`,
//   };
// }

async function IssuePage({ params }) {
  const param = await params;
  const { issue } = param;
  console.log('param:', param);

  // const articlesInIssue = await getArticlesInIssue(issue)
  const [articlesInIssue, currentIssue] = await Promise.all([
    getArticlesInIssue(issue),
    getIssue(issue),
  ]);

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <Main>
        <div className=''>
          <H1 className='mt-5 '>{`NJBA - ${currentIssue?.issueTitle}`}</H1>
          <span className='text-[#808080] text-sm'>{`Published: ${formatDate(
            currentIssue.publishDate
          )}`}</span>
        </div>
        <section className='space-y-5'>
          <ArticlesInIssue articlesInIssue={articlesInIssue} />
        </section>
      </Main>
      <Footer />
    </div>
  );
}

export default IssuePage;
