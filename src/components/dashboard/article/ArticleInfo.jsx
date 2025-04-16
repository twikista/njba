import { dateHelperFunction } from '@/lib/helper';

function ArticleInfo({ article, issue }) {
  return (
    <div className='flex gap-4 items-center text-sm text-[#808080]'>
      <span className=''>{`Published: ${dateHelperFunction(
        article?.publishDate,
        'short'
      )}`}</span>

      <span className=''>{`Issue: ${issue?.issueTitle}`}</span>
    </div>
  );
}

export default ArticleInfo;
