import Link from 'next/link';
import Authors from './Authors';
import { H3 } from './headings';

function ArticlesInIssue({ articlesInIssue, path = 'archive' }) {
  return (
    <div className='border rounded-lg border-neutral-300 '>
      {articlesInIssue.map((article) => (
        <div
          key={`${article?._id}`}
          className=' p-3 [&:not(:last-child)]:border-b border-neutral-300 '
        >
          <H3 className='text-base font-medium text-main-blue hover:text-hover-blue  hover:underline w-fit'>
            <Link href={`/${path}/${article?.ref}/${article?.slug}`}>
              {article?.title}
            </Link>
          </H3>
          <div className='flex items-center justify-between'>
            <Authors authors={article?.authors} />
            <span className='text-sm text-[#808080] w-fit'>{`${article?.slug}`}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ArticlesInIssue;
