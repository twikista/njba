import Image from 'next/image';
import Link from 'next/link';
import ccLogo from '@/../public/by.png';
import Authors from './Authors';
import { PDFIcon } from '../icons/icons';
import ArticleInfo from '../dashboard/article/ArticleInfo';
import { Suspense } from 'react';
import { H1, H2 } from './headings';
import APAReference from './ArticleCitation';
import { TbChartBar } from 'react-icons/tb';
import { cn } from '@/lib/utils';
import DownloadPDFButton from './DownloadPDFButton';
import { incrementDownloadCounts } from '@/lib/routes/pdf';
import ArticleStats from './ArticleStats';
import PDFDownloadButton from './PDFDownloadButton';

// Loading component for Authors section
function AuthorsLoading() {
  return (
    <div className='animate-pulse w-full'>
      <div className='h-4 bg-gray-200 rounded w-2/3'></div>
    </div>
  );
}

function ArticleOverview({ currentArticle, currentIssue = false, issue }) {
  const seralizedCurrentArticle = JSON.stringify(currentArticle);
  const parsedCurrentArticle = JSON.parse(seralizedCurrentArticle);
  const joinKeywords = (arr) => {
    return arr?.join(', ') || '';
  };

  const updateDownloadCount = async () => {
    'use server';
    const updatedCount = await incrementDownloadCounts(
      parsedCurrentArticle._id,
      parsedCurrentArticle.ref,
      parsedCurrentArticle.slug
    );
  };

  if (!currentArticle) {
    return (
      <div className='animate-pulse'>
        <div className='h-8 bg-gray-200 rounded w-3/4 mb-4'></div>
        <div className='h-4 bg-gray-200 rounded w-1/2 mb-4'></div>
        <div className='h-12 bg-gray-200 rounded w-full mb-4'></div>
        <div className='h-4 bg-gray-200 rounded w-1/3 mb-8'></div>
        <div className='space-y-2 mb-8'>
          <div className='h-4 bg-gray-200 rounded w-full'></div>
          <div className='h-4 bg-gray-200 rounded w-full'></div>
          <div className='h-4 bg-gray-200 rounded w-5/6'></div>
        </div>
      </div>
    );
  }

  const renderButtons = (currentArticle, currentIssue, variant = 'start') => {
    return (
      <div
        className={cn(
          'flex flex-col gap-2 sm:flex-row sm:gap-4 mb-5 text-sm font-medium',
          variant === 'start' ? 'sm:justify-start' : 'sm:justify-end'
        )}
      >
        <Link
          href={
            currentIssue
              ? `/archive/${currentArticle.ref}/${currentArticle.slug}/view?ref=current`
              : `/archive/${currentArticle.ref}/${currentArticle.slug}/view`
          }
          className='flex w-full text-primary justify-center gap-2 px-3 py-1.5 border md:w-fit rounded-md  text-center border-primary items-center hover:text-white hover:bg-primary transition-all duration-200 ease-in-out'
        >
          <span>Open PDF in Browser</span>
        </Link>
        {/* <DownloadPDFButton
          // updateDownloadCount={updateDownloadCount}
          filePath={currentArticle?.pdfUrl.split('/').at(-1)}
          variant='enhanced'
        /> */}
        <PDFDownloadButton
          fileName={currentArticle?.pdfUrl.split('/').at(-1)}
          variant='enhanced'
        />
      </div>
    );
  };

  return (
    <div className='mt-5'>
      {renderButtons(currentArticle, currentIssue)}
      <H1 className='text-wrap md:text-2xl'>{currentArticle?.title}</H1>
      <ArticleInfo article={currentArticle} issue={issue} />
      <section className='flex flex-col py-2 space-y-3 sm:space-y-0 sm:flex-row'>
        <Suspense fallback={<AuthorsLoading />}>
          <Authors authors={currentArticle?.authors} withAffliation={true} />
        </Suspense>
      </section>
      <section className='space-y-3'>
        <div className='py-2 text-sm'>
          <p>
            <span className='font-semibold'>Keywords:</span>
            <span className='capitalize'>{` ${joinKeywords(
              currentArticle?.keywords
            )}`}</span>
          </p>
        </div>
        {currentArticle?.jelClassification ? (
          <div className='py-2 text-sm'>
            <p>
              <span className='font-semibold'>JEL Classification:</span>
              <span className='capitalize'>{` ${joinKeywords(
                currentArticle?.jelClassification
              )}`}</span>
            </p>
          </div>
        ) : null}
      </section>

      <section className='mt-5 space-y-10 pb-5'>
        <div className='space-y-3'>
          <h4 className='font-bold'>Abstract</h4>
          <p className=' text-black'>{currentArticle?.abstract}</p>
        </div>
        {renderButtons(currentArticle, currentIssue, 'end')}
      </section>
      <section className='mt-10 space-y-10'>
        <div className='space-y-5 rounded-lg'>
          {/* <ArticleStats currentArticle={currentArticle} /> */}
          <APAReference article={currentArticle} issue={issue} />
        </div>

        <div className='space-y-3'>
          <span>
            Copyright &copy; {issue.issueYear} Nigeria Journal of Business
            Administration
          </span>
          <div className='flex flex-col items-start sm:flex-row sm:items-end gap-1'>
            <a
              href='https://creativecommons.org/licenses/by/4.0/'
              target='_blank'
            >
              <Image
                src='/cc.png'
                alt='creative commons logo'
                width={100}
                height={100}
                className='w-16 h-auto'
              />
            </a>
            <div className=''>
              This work is licensed under a &nbsp;
              <a
                href='https://creativecommons.org/licenses/by/4.0/'
                target='_blank'
                className='text-main-blue underline hover:text-hover-blue'
              >
                Creative Commons Attribution 4.0 International License.
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ArticleOverview;
