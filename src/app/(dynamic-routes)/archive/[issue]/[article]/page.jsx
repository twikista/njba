import { getArticlesInIssue } from '@/lib/actions/articles';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import ArticleOverview from '@/components/shared/ArticleOverview';
import { Suspense } from 'react';
import { getArticle } from '@/lib/actions/articles';
import Main from '@/components/shared/Main';
import { connectDB } from '@/lib/mongoose/config';
import { getIssue } from '@/lib/actions/issues';
import { Article } from '@/lib/mongoose/models/article';

async function getAllArticles() {
  await connectDB();
  const articles = await Article.find({ published: true });
  return articles;
}

export async function generateStaticParams() {
  await connectDB();
  const articles = await getAllArticles();
  return articles.map((article) => ({
    issue: article.ref,
    article: article.slug,
  }));
}

export async function generateMetadata({ params }) {
  const param = await params;
  const article = await getArticle(param);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: article.title,

    description: article.abstract?.substring(0, 160),
    keywords: article.keywords?.join(', '),
    other: {
      citation_title: article.title,
      citation_author: article.authors?.map((author) => author.name),
      citation_publication_date: new Date(article.publishDate)
        .toISOString()
        .split('T')[0]
        .replace(/-/g, '/'),
      citation_journal_title: 'Mangement Sciences Review',
      citation_volume: article.volume,
      citation_issue: article.issue,
      citation_first_page: article.startPage,
      citation_last_page: article.endPage,
      citation_pdf_url: `https://www.msreview.com.ng/archive/${article.ref}/${article.slug}/view`,
      citation_abstract: article.abstract,
    },
    openGraph: {
      title: article.title,
      description: article.abstract?.substring(0, 160),
      type: 'article',
      authors: article.authors?.map((author) => author.name),
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
            <div className='w-3/4 h-8 mb-4 bg-gray-200 rounded'></div>
            <div className='w-1/2 h-4 mb-4 bg-gray-200 rounded'></div>
            <div className='w-full h-12 mb-4 bg-gray-200 rounded'></div>
            <div className='w-1/3 h-4 mb-8 bg-gray-200 rounded'></div>
            <div className='mb-8 space-y-2'>
              <div className='w-full h-4 bg-gray-200 rounded'></div>
              <div className='w-full h-4 bg-gray-200 rounded'></div>
              <div className='w-5/6 h-4 bg-gray-200 rounded'></div>
              <div className='w-3/4 h-4 bg-gray-200 rounded'></div>
            </div>
            <div className='flex justify-center'>
              <div className='w-40 h-10 bg-gray-200 rounded'></div>
            </div>
          </div>
        </Main>
      </div>
      <Footer />
    </div>
  );
}

async function ArticleContent({ articleMetaData }) {
  try {
    const [article, issue] = await Promise.all([
      getArticle(articleMetaData),
      getIssue(articleMetaData.issue, { issueTitle: 1, issueYear: 1 }),
    ]);

    if (!article) {
      return (
        <div className='p-6 text-center'>
          <h2 className='mb-2 text-xl font-semibold'>Article Not Found</h2>
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
        <h2 className='mb-2 text-xl font-semibold'>Error Loading Article</h2>
        <p className='text-gray-600'>
          There was a problem loading this article. Please try again later.
        </p>
      </div>
    );
  }
}

async function ArticlePage({ params }) {
  const param = await params;
  console.log('paramparam:', param);
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className='flex items-center justify-center flex-grow w-full h-full'>
        <Main>
          <Suspense fallback={<ArticlePageLoading />}>
            <ArticleContent articleMetaData={param} />
          </Suspense>
        </Main>
      </div>
      <Footer />
    </div>
  );
}

export default ArticlePage;
