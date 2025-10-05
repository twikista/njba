import { dateHelperFunction } from '@/lib/helper';

function ArticleInfo({ article, issue }) {
  console.log('issue', issue);
  const issueDescription =
    article.issue === 'special-issue'
      ? `Issue: Vol. ${article?.volume} Special Issue (${issue?.issueYear})`
      : `Issue: Vol. ${article?.volume} No. ${article?.issue} (${new Date(
          article?.publishDate
        ).getFullYear()})`;
  return (
    <div
      className={`flex text-sm text-[#808080] ${article.issue === 'special-issue' ? ' flex-col md:flex-row gap-1 md:gap-4 md:items-center' : ' gap-4 flex-row items-center '}`}
    >
      <span className=''>{`Published: ${dateHelperFunction(
        article?.publishDate,
        'short'
      )}`}</span>

      <span className=''>{issueDescription}</span>
    </div>
  );
}

export default ArticleInfo;
