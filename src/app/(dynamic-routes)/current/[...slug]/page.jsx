import { getArticlesInIssue } from '@/lib/actions/articles';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import ArticleOverview from '@/components/shared/ArticleOverview';
import { Suspense } from 'react';
import { getArticle } from '@/lib/actions/articles';
import Main from '@/components/shared/Main';
import { connectDB } from '@/lib/mongoose/config';
import { getIssue } from '@/lib/actions/issues';

export async function generateStaticParams({ params }) {
  const param = await params;
  //   await connectDB();
  const articlesInIssue = await getArticlesInIssue(param.issue);
  return articlesInIssue.map((article) => article.ref);
}

export async function generateMetadata({ params }) {
  const param = await params;
  const article = await getArticle(param);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  const description = article.abstract?.substring(0, 160);

  return {
    title: article.title,
    description,
    keywords: article.keywords?.join(', '),
    publishedTime: article.publishedDate,
    openGraph: {
      title: article.title,
      description,
      type: 'article',
      authors: article.authors?.map((author) => author.name) | [],
    },
  };
}

// Loading component
function ArticlePageLoading() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className='flex items-center justify-center flex-grow w-full h-full'>
        <Main>
          <div className='animate-pulse'>
            <div className='h-8 bg-gray-200 rounded w-3/4 mb-4'></div>
            <div className='h-4 bg-gray-200 rounded w-1/2 mb-4'></div>
            <div className='h-12 bg-gray-200 rounded w-full mb-4'></div>
            <div className='h-4 bg-gray-200 rounded w-1/3 mb-8'></div>
            <div className='space-y-2 mb-8'>
              <div className='h-4 bg-gray-200 rounded w-full'></div>
              <div className='h-4 bg-gray-200 rounded w-full'></div>
              <div className='h-4 bg-gray-200 rounded w-5/6'></div>
              <div className='h-4 bg-gray-200 rounded w-3/4'></div>
            </div>
            <div className='flex justify-center'>
              <div className='h-10 bg-gray-200 rounded w-40'></div>
            </div>
          </div>
        </Main>
      </div>
      <Footer />
    </div>
  );
}

async function ArticleContent({ params }) {
  const param = await params;
  const { slug } = param;
  try {
    const [article, issue] = await Promise.all([
      getArticle({ issue: slug[0], article: slug[1] }),
      getIssue(slug[0], { issueTitle: 1, issueYear: 1 }),
    ]);

    if (!article) {
      return (
        <div className='p-6 text-center'>
          <h2 className='text-xl font-semibold mb-2'>Article Not Found</h2>
          <p className='text-gray-600'>
            The article you're looking for could not be found.
          </p>
        </div>
      );
    }

    return <ArticleOverview currentArticle={article} issue={issue} />;
  } catch (error) {
    console.error('Error fetching article:', error);
    return (
      <div className='p-6 text-center'>
        <h2 className='text-xl font-semibold mb-2'>Error Loading Article</h2>
        <p className='text-gray-600'>
          There was a problem loading this article. Please try again later.
        </p>
      </div>
    );
  }
}

async function ArticlePage({ params }) {
  const param = await params;
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className='flex items-center justify-center flex-grow w-full h-full'>
        <Main>
          <Suspense fallback={<ArticlePageLoading />}>
            <ArticleContent params={param} />
          </Suspense>
        </Main>
      </div>
      <Footer />
    </div>
  );
}

export default ArticlePage;
