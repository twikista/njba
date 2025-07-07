import { auth } from '../../../../../../auth';
import IssueEmptyState from '@/components/dashboard/issues/IssueEmptyState';
import IssueContent from '@/components/dashboard/issues/issue';
import { connectDB } from '@/lib/mongoose/config';
import { Issue } from '@/lib/mongoose/models/issue';
import { Article } from '@/lib/mongoose/models/article';
// import { getArticlesInIssue } from '../../../../../../lib/data'

const getArticlesInIssue = async (issueRef) => {
  connectDB();
  const articlesInIssue = await Promise.all([
    Issue.find({
      ref: `${issueRef}`,
    }),
    Article.find({
      ref: `${issueRef}`,
    }).sort({
      startPage: 1,
    }),
  ]);
  return articlesInIssue;
};

async function IssuePage({ params }) {
  const { user } = await auth();

  const { issue: issueRef } = await params;

  const [[issue], articlesInIssue] = await getArticlesInIssue(issueRef);

  const editorPrivilege = issue?.status === 'draft' && user?.role === 'editor';

  const adminPrevilege = user?.role === 'admin';
  const adminRoles = {
    admin: editorPrivilege,
    systemAdmin: adminPrevilege,
  };

  return (
    <>
      {!articlesInIssue.length ? (
        <IssueEmptyState issue={issue} adminRoles={adminRoles} />
      ) : (
        <IssueContent
          user={user}
          articlesInIssue={articlesInIssue}
          issue={issue}
        />
      )}
    </>
  );
}

export default IssuePage;
